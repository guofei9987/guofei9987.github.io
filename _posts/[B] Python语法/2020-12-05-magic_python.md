---
layout: post
title: 【Python】magic黑魔法
categories:
tags: 0xb0_Python语法
keywords:
description:
order: 1301
---

## Python效率研究

```python
import numpy as np
import datetime

a = np.arange(20)
b = list(range(20))
num = 10000
start_time = datetime.datetime.now()
for i in range(num):
    for i in range(10):
        i in a

print(datetime.datetime.now() - start_time)

num = 10000
start_time = datetime.datetime.now()
for i in range(num):
    for i in range(10):
        i in b

print(datetime.datetime.now() - start_time)
```

打印结果：

>0:00:01.026981
0:00:00.044941

结论：i in array 的性能消耗大概是 i in list 的20倍



## 冷知识
### 可直接运行的 zip 包
正常人认为 Python 包的格式是 egg 或者 whl，但也可以是 zip

我们的 python 包如下：（两个文件都放到 `magic` 文件夹中）
`calc.py`:
```python
def my_func():
    print('测试函数')
    return 1
```
`__main__.py`:
```Python
import calc
calc.my_func()
```

命令行：
```sh
# 打包
python -m zipfile -c demo.zip magic/*

# 使用（会运行__main__.py 文件）
python demo.zip
```


### 用户无感知的小整数池

为避免整数频繁申请和销毁内存空间，Python 定义了一个小整数池 [-5, 256] 这些整数对象是提前建立好的，不会被垃圾回收

```
>>> b = -6
>>> a is b
False

>>> a = 256
>>> b = 256
>>> a is b
True

>>> a = 257
>>> b = 257
>>> a is b
False

>>> a = 257; b = 257
>>> a is b
True
```

### 神奇的 intern 机制
Python解释器中使用了 intern（字符串驻留）的技术来提高字符串效率

```
>>> s1="hello"
>>> s2="hello"
>>> s1 is s2
True

# 如果有空格，默认不启用intern机制
>>> s1="hell o"
>>> s2="hell o"
>>> s1 is s2
False

# 如果一个字符串长度超过20个字符，不启动intern机制
>>> s1 = "a" * 20
>>> s2 = "a" * 20
>>> s1 is s2
True

>>> s1 = "a" * 21
>>> s2 = "a" * 21
>>> s1 is s2
False

>>> s1 = "ab" * 10
>>> s2 = "ab" * 10
>>> s1 is s2
True

>>> s1 = "ab" * 11
>>> s2 = "ab" * 11
>>> s1 is s2
False
```

### 上下文管理器

```
import contextlib

@contextlib.contextmanager
def runtime(value):
    time.sleep(1)
    print("start: a = " + str(value))
    yield
    print("end: a = " + str(value))


a = 0
while True:
    a+=1
    with runtime(a):
        if a % 2 == 0:
            break
```

当 a = 2 时执行了 break ，此时的并不会直接跳出循环，依然要运行上下文管理器


### 如何快速搭建 HTTP 服务器
以index为首页：
```
python3 -m http.server 8888
```

快速生成 HTTP 帮助文档：  
`python -m pydoc -p 5200`

构建一个漫画网站
`import antigravity`

### 包撞到指定的python版本
```
# 在 python2 中安装
$ python -m pip install requests

# 在 python3 中安装
$ python3 -m pip install requests

# 在 python3.8 中安装
$ python3.8 -m pip install requests

# 在 python3.9 中安装
$ python3.9 -m pip install requests
```

### 快速美化 JSON 字符串
```
echo '{"name": "MING"}' | python -m json.tool
```

## 连接列表
```
a = [1, 2, 3]
b = [5, 6, 7]

[*a, *b]
```

合并字典
```python
a = {'a': 1, 'b': 2}
b = {'c': 5, 'd': 6, 'b': 3}

{**a, **b}

# python 3.9 有了新操作
a | b
```

### 条件语句的7种写法
```python
age = 20

# 第一种
msg = ''
if age > 18:
    msg = '成年'
else:
    msg = '未成年'

# 第二种
msg = '成年' if age > 18 else '未成年'

# 第三种
msg = age > 18 and '成年' or '未成年'

# 第四种
msg = ('未成年', '成年')[age > 18]

# 第五种
msg = {True: "成年", False: "未成年"}[age > 18]
```

## 清理函数

可以注册一个函数，当代码运行结束/代码崩溃时，执行这个函数

```python
import atexit


@atexit.register
def clean():
    print('代码结束，运行清理任务')


def main():
    1 / 0


main()
```

试试从命令行执行这段代码，发现尽管程序崩溃，崩溃后还是执行了 `clean` 函数

还有另一种写法，个人感觉更好，因为能传入参数

```python
import atexit


def clean(input1, input2):
    print(f'代码结束，运行清理任务: {input1}, {input2}')


atexit.register(clean, 'input1', 'input2')
```

另外注意：
- 如果程序是被你没有处理过的系统信号杀死的，那么注册的函数无法正常执行。
- 如果发生了严重的 Python 内部错误，你注册的函数无法正常执行。
- 如果你手动调用了 `os._exit()`，你注册的函数无法正常执行。


## 打印代码

你想打印某个函数的源代码，用这个：

```python
import pandas as pd
import inspect

inspect.getsource(pd.read_csv)  # 打印 pd.read_csv 的源代码
```


## 判断是函数还是方法


```python
from types import FunctionType, MethodType

func.__class__ is FunctionType
func.__class__ is MethodType
```


## Linux 打印

```python
import sys

def clear_traces(): # 清除一行
    sys.__stdout__.write('\033[2K\r')


def hide_cursor(): # 隐藏光标
    sys.__stdout__.write('\033[?25l')


def show_cursor(): # 显示光标
    sys.__stdout__.write('\033[?25h')


def go_up(n=20): # 光标向上移动 n 行
    up_command = '\033[{}A'.format(n)
    print(up_command)


def flush():
    sys.__stdout__.flush()

```

## 一些基础知识

内置函数
```python
help()
dir()
vars() # obj.__dict__
type()
id()
```

内置函数
```python
abs(-9)
bool(-1) # True
divmod(9,4)
max(1,2,3)
max([1,2,3])
min(1,2,3)
sum(1,2,3)
pow(2,10)
all([1,2,3,0])
any([1,0,0,0])
```


反射
```python
tmp = 'numpy'
tmp = 'math'

model = __import__(tmp)
print(model.sin)
```

反射2
```python
module_name = 'numpy'
func_name = 'sin'
module = __import__('numpy')
func = getattr(module, func_name)
```

作为对比，还有
```python
eval('8*8')

import ast

ast.literal_eval('(8,8)')
```


## 字典转对象

```python
class Dict(dict):
    __setattr__ = dict.__setitem__
    __getattr__ = dict.__getitem__
```

用法：
```python
d1 = {'a': 1, 'b': 2}
d2 = Dict(d1)

d2.a
d2.b = 3
```

## 关于极大/极小运算

1
```py
np.log(np.exp(1000))
# 返回 inf，而不是 1000
```

2、小数字
```py
eps = np.finfo(float).eps
0 == eps / 10  # False
0 == eps / 1000000  # False

0 == 1 + eps / 10 - 1  # True
0 == 1 + eps - 1  # False

0.1 == (0.1 + eps / 100)  # True
0.1 == (0.1 + eps / 10)  # False
```


3 大数字
```py
(1.0 * 10 ** 120) == (1.0 * 10 ** 120 + 1 * 10 ** 102)  # True
(10 ** 120) == (10 ** 120 + 10 ** 102)  # False
(10 ** 120) == (10 ** 120 + 1)  # False
```


## 关于引用的奇怪知识

```py
a = [[1,2,3]]*4
a[0][0] = 5 # 结果所有子序列都被改了
```

## 参考资料

https://github.com/iswbm/magic-python
