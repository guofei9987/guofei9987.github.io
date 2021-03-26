
## 前言

- 多线程。（python 提供了2个多线程接口 `thread` 提供底层接口。`threading`提供高等级接口。）
    - 一个进程中启动多个线程
    - 一般来说使用多线程可以达到并行的目的，
    - 但由于Python中使用了全局解释锁GIL的概念，导致Python中的多线程并不是真并行，而是“交替执行” 。所以 Python 多线程适合IO密集型任务，而不适合计算密集型任务。
    - 甚至在多核CPU上用多线程执行计算密集任务，由于 GIL 的存在，会导致多核争抢1个GIL，让任务比普通的更慢。
- 多进程（Python 提供 `mutliprocess` 作为多进程接口。）
  - 由于Python中GIL的原因，对于计算密集型任务，Python下比较好的并行方式是使用多进程，这样可以非常有效的使用CPU资源。
  - 同一时间执行的进程数量取决你电脑的CPU核心数。


测试函数：
```python
import time
import datetime
import os
from multiprocessing.dummy import Pool as ThreadPool
from multiprocessing import Pool
import numpy as np

print(__name__, os.getpid())


def costly_task(inputs):
    task_num, task_type = inputs
    # task_mode can be 'io_costly', 'cpu_costly'
    ppid = os.getppid()
    pid = os.getpid()
    start_time = datetime.datetime.now().strftime('%S.%f')
    if task_type == 'io_costly':
        time.sleep(1)
        task_res = 0
    else:
        n = 500000
        step1 = [np.log(i + 1) for i in range(n)] + [np.power(i, 1.1) for i in range(n)]
        task_res = sum(step1)
    end_time = datetime.datetime.now().strftime('%S.%f')
    # print(
    #     'task_num={task_num}, task_type={task_type}, __name__={__name__}, pid={pid}, ppid ={ppid}, start_time={start_time}, end_time={end_time}\n'.
    #         format(task_num=task_num, task_type=task_type, __name__=__name__, pid=pid, ppid=ppid, start_time=start_time,
    #                end_time=end_time))


    return task_res


if __name__ == '__main__':
    for task_type in ('io_costly', 'cpu_costly'):
        start = datetime.datetime.now()
        list(map(costly_task, [[i, task_type] for i in range(10)]))
        print(task_type, ', 普通任务', datetime.datetime.now() - start)

        start = datetime.datetime.now()
        pool = ThreadPool()  # ThreadPool(4), 不指定进程数，则使用全部线程
        pool.map(costly_task, [[i, task_type] for i in range(10)])  # 返回list，就是结果
        print(task_type, ', 多线程', datetime.datetime.now() - start)

        start = datetime.datetime.now()
        pool = Pool()
        pool.map(costly_task, [[i, task_type] for i in range(10)])  # 返回list，就是结果
        print(task_type, ', 多进程', datetime.datetime.now() - start)
```
输出：
>io_costly , 普通任务 0:00:10.077721  
io_costly , 多线程 0:00:03.075839  
io_costly , 多进程 0:00:04.180210  
cpu_costly , 普通任务 0:00:39.668068  
cpu_costly , 多线程 0:00:43.041522  
cpu_costly , 多进程 0:00:25.812865  


输出符合预期。

### 代码解释
```python
from multiprocessing.dummy import Pool as ThreadPool
from multiprocessing import Pool

pool = ThreadPool(processes=4) # 这个是多线程
pool =Pool(processes=4) # 这个是多进程

# 然后两个 pool 都有以下方法（都很有用）：
pool.map(func1, range(5)) # 返回list，就是结果
pool.imap(func1, range(10)) # 返回 generator
pool.imap_unordered(func1, range(10)) # 返回generator，并且不要求按顺序
```


显示可用的cpu数量
```python
import multiprocessing as mp

mp.cpu_count()
```


## 另外

以下实现并不能实现并且耗时差不多（很多博客有误导）
```python

a=[func1(i) for i in range(5)]


b=list(map(func1,range(5)))


c=[]
for i in range(5):
    c.append(func1(i))
```



### 其它

启动一个子进程
```python
from multiprocessing import Process

p = Process(target=func1, args=('test',))
print(os.getpid()) # 获取主进程的号码
p.start() # 启动子进程
p.join() # 等待到进程结束
```

批量启动子进程
```python
from multiprocessing import Pool

print('Parent process %s.' % os.getpid())
p = Pool(4)
results=[p.apply_async(func1, args=(i,)) for i in range(5)]

p.close()
p.join()
```

apply_async
```python
def func(x1, x2):
    time.sleep(1)
    return x1 + x2 + 1


results = [pool.apply_async(func, args=(x1, x2)) for (x1, x2) in np.random.rand(100, 2)] # 这一步不实际运行
results = [p.get() for p in results]
```






进一步阅读：
多线程：https://zhuanlan.zhihu.com/p/90180209  
多进程：https://zhuanlan.zhihu.com/p/93305921  




另一个并行工具
mpi4py，基于MPI-1/MPI-2



## subprocess
用来并行启动外部进程  

参见[subprocess](https://www.guofei.site/2018/06/05/sysos.html#subprocess)
