---
layout: post
title: 【spark】工程实践
categories:
tags: 1-1-算法平台
keywords:
description:
order: 159
---

## spark 脚本提交工具
实现功能：
1. **submit时传入参数** 用[sys.argv](http://www.guofei.site/2018/06/05/sysos.html#title1)来读取submit时附加的参数  
2. **脚本中调用别的包**
3. 串行和并行提交重跑，基本不用改代码
4. 提交的spark脚本全部运行完毕后，打印每个脚本的返回码、运行时间、运行开始时间、运行结束时间
5. 如果有脚本运行失败，退出时返回错误码

### 1. 被提交脚本
重点看一下传入参数的设计
app_1_2_1.py（被提交的spark脚本）:
```py
# coding=utf-8

from pyspark.sql import SparkSession
import os
import sys
import numpy as np

# 读取入参
arrs = sys.argv
cal_dt_str = eval(arrs[1])['cal_dt_str']
spark = SparkSession.builder.appName("app_name_"+cal_dt_str).enableHiveSupport().getOrCreate()

# %% 下面放你的代码
df = spark.createDataFrame([[cal_dt_str, np.random.randint(5)]], schema=['dt', 'rand_num'])
df.write.mode('overwrite').format('orc').partitionBy('dt').saveAsTable('app.app_test_guofei8')
spark.sql("ALTER TABLE app.app_test_guofei9987 SET TBLPROPERTIES ('author' = 'guofei9987')")
```

### 2. 串行提交
```py
command1 = '''
spark-submit   --master yarn \
      --deploy-mode {deploymode} \
      --driver-memory 6g \
      --executor-memory 10g \
      --num-executors 400 \
      --executor-cores 6 \
      --py-files ../your_py_files.zip \
      {pyfile} "{arrs}"
'''
# --master:
#      spark://host:port  独立集群作为集群url
#      yarn     yarn作为集群
#      local    本地模式
#      local[N] 本地模式，n个核心
#      local[*] 本地模式，最大核心

# --deploy-mode:
#     client本地，cluster集群

# --executor-memory 执行器的内存
# --driver-memory 驱动器的内存


import os
import datetime

cal_dt_str = (datetime.datetime.now() - datetime.timedelta(days=1)).strftime('%Y-%m-%d')
# cal_dt_str='2019-05-05'
print('开始计算' + cal_dt_str + '的数据')

input_file = [
    {'deploymode': 'cluster', 'pyfile': 'app_1_1.py', 'arrs': {'cal_dt_str': cal_dt_str}},
]


def func_run(args):
    start_time = datetime.datetime.now()
    code = os.system(command1.format(**args))
    end_time = datetime.datetime.now()
    return args['pyfile'], code, (end_time - start_time).seconds, \
           start_time.strftime('%Y-%m-%d %H:%M:%S'), end_time.strftime('%Y-%m-%d %H:%M:%S')


result_code_list = [func_run(args=args) for args in input_file]

for i in result_code_list: print(i)
# for i in result_code_list:
#     if i[1] != 0:
#         raise error
```

### 3. 并行提交

```py
# !/usr/bin/python
# coding=utf-8
# 并行回溯历史数据
import os
import datetime
import subprocess
import time

right_dt = datetime.datetime(year=2019, month=7, day=31)
left_dt = datetime.datetime(year=2019, month=7, day=1)
pyfile = 'app_1_1.py' # 你的待提交代码
step = -1  # 运行间隔
job_num = 5 # 同时提交这么多个

# 先把待提交的参数算出来
one_day = datetime.timedelta(days=1)
cal_dt_str_list = [(left_dt + i * one_day).strftime('%Y-%m-%d') for i in range((right_dt - left_dt).days + 1)][::step]
input_arr_list = [{'deploymode': 'client', 'pyfile': pyfile, 'arrs': {'cal_dt_str': cal_dt_str}}
                  for cal_dt_str in cal_dt_str_list
                  ]

command1 = '''
spark-submit   --master yarn \
      --deploy-mode {deploymode} \
      --driver-memory 6g \
      --executor-memory 10g \
      --num-executors 400 \
      --executor-cores 6 \
      --py-files ../core_code.zip \
      {pyfile} "{arrs}"
'''


from IPython.display import clear_output # 这个是在jupter中显示方便


def paral_submit(input_arr_list, job_num=10):
    # log是运行完的，subjob 是正在运行的，input_arr_list 是待运行的
    log, subjob = [], dict()
    while len(input_arr_list) > 0 or len(subjob) > 0:
        if len(subjob) < job_num and len(input_arr_list) > 0:
            input_arr = input_arr_list[0]
            cal_dt_str = input_arr['arrs']['cal_dt_str']
            subjob[cal_dt_str] = subprocess.Popen(command1.format(**input_arr), shell=True)
            input_arr_list = input_arr_list[1:]
        subjob_status = [[cal_dt_str, subjob[cal_dt_str].poll()] for cal_dt_str in subjob]
        subjob_status_finished = [[cal_dt_str, status] for cal_dt_str, status in subjob_status if status is not None]
        for i, j in subjob_status_finished:
            subjob.pop(i)
        log.extend(subjob_status_finished)  # 完成的 job 加入log
        time.sleep(1)  # 每秒检测一次
        clear_output() # jupyter 中显示方便，每次抹除
        print('finished:', log)
        print('running:', subjob.keys())
        print('not running:', [i['arrs']['cal_dt_str'] for i in input_arr_list])
        time.sleep(1)  # 每秒检测一次
    print('并行模块执行完毕，返回码如下:', log)
    return log, [i for i in log if i[1] != 0]


paral_submit(input_arr_list,job_num=10)
```

## 代码定时备份到git
```py
import os
import subprocess
import time
import datetime
from IPython.display import clear_output


def upload(dir_name):
    '''
    上传git
    '''
    os.chdir(dir_name)
    command_list = ['git add -A', 'git commit -m "update"', 'git push']
    status_list = [subprocess.check_output(command, shell=True).decode('utf-8') for command in command_list]
    return [datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')] + status_list


def make_log(dir_name):
    '''
    上传信息保存到txt中
    '''
    git_upload_log = upload(dir_name)
    git_print_log = '\n\n' + '-' * 10 + '\n' + '\n'.join(git_upload_log)
    with open(dir_name + '/update_log.txt', 'a') as f:
        f.writelines(git_print_log)
    return git_print_log

# 调试
# dir_name='/home/guofei8/project'
# git_print_log=make_log(dir_name)
# print(git_print_log)

# 定时运行
dir_name = '/home/guofei/project'
for i in range(100):
    clear_output()
    git_print_log = make_log(dir_name)
    print(git_print_log)
    time.sleep(60 * 60 * 24)
```

## 文件树
不算太美观，但是代码够短、实用
```py
import os
def my_listdir(level, path, tree):
    for i in os.listdir(path):
        tree.append('│    ' * level + '├───' + i)
        if os.path.isdir(path + i):
            my_listdir(level + 1, path + i + os.sep, tree)


path = '/work/project'
tree = [os.path.split(path)[-1]]
my_listdir(0, path + os.sep, tree)
print('\n'.join(tree))
```

轻量的优点就是改动方便，例如，我不想显示 '.ipynb_checkpoints','.git' 这两类文件夹下的文件，就可以这么改：
```py
import os
def my_listdir(level, path, tree):
    for i in os.listdir(path):
        if i in ['.ipynb_checkpoints', '.git']:
            continue
        tree.append('│    ' * level + '├───' + i)
        if os.path.isdir(path + i):
            my_listdir(level + 1, path + i + os.sep, tree)


path = '/work/project'
tree = ['project']
my_listdir(0, path + os.sep, tree)
print('\n'.join(tree))
```

## 批量处理hive表
```py
import subprocess

tables_all=subprocess.check_output('''
hive -e 'use app;show tables'
''',shell=True).decode('utf-8').split('\n')

table_guofei=[table for table in tables_all if table.find('guofei')>=0]
```

```py
for table in table_guofei:
    drop_code=subprocess.check_output('''
    hive -e 'drop table app.{table}'
    '''.format(table=table),shell=True)
    print(drop_code,table)
```

## 串行循环
调研数据时，往往需要循环写表。
```python
import datetime
right_dt = datetime.datetime(year=2019, month=8, day=1)
left_dt = datetime.datetime(year=2019, month=2, day=1)
pyfile = 'long_1.py'
step = 1  # 运行间隔
job_num = 1
IsFirstLoop=True
oneday=datetime.timedelta(days=1)
# paral_run.paral_submit(left_dt=left_dt, right_dt=right_dt, pyfile=pyfile, step=step, job_num=job_num)

cal_dt = left_dt if step > 0 else right_dt
while True:
    if cal_dt>right_dt or cal_dt<left_dt:break
    cal_dt_str=cal_dt.strftime('%Y-%m-%d')
    submit(cal_dt_str,spark,IsFirstLoop)
    print(cal_dt_str+' done@'+datetime.datetime.now().strftime('%H:%M:%S')+',  ')
    IsFirstLoop=False
    cal_dt+=step*oneday

print('All done!')
```

你的脚本
```python
def submit(cal_dt_str, spark, IsFirstLoop):
    if IsFirstLoop:
        write_mode='overwrite'
    else:
        write_mode='append'

    # 这里是你的脚本
    # 然后写表：
    df.write.mode(write_mode).format('orc').partitionBy('dt').saveAsTable('app.app_guofei8_test')
    if IsFirstLoop:
        spark.sql("ALTER TABLE app.app_guofei8_test_data_0909 SET TBLPROPERTIES ('author' = 'guofei8')")
```
