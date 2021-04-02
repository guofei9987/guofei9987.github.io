---
layout: post
title: 【multiprocessing】多线程&多进程实现并行
categories:
tags: Python语法
keywords:
description:
order: 1011
---

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

（多进程在windows下，如果不加 `if __name__ == '__main__':`，会进入无限递归然后报错，阅读较多文章后觉得这个无法解决，考虑用 sys.platform == 'win32' 判断一下转多线程）

（Python 3.8 也不支持，但是加一行即可 `multiprocessing.set_start_method('spawn')` ）
- `spawn`: default on windows，父进程开启一个新进程，新进程只继承父进程 run() 方法相关的必须资源
- `fork`: available on unix, default on unix. 使用 os.fork() 来 fork
- `forkserver`: 同上，但更安全。



### 代码解释
```python
from multiprocessing.dummy import Pool as ThreadPool
from multiprocessing import Pool

pool = ThreadPool(processes=4) # 这个是多线程
pool = Pool(processes=4) # 这个是多进程

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


## numba 专题

numba为什么能加速？

python编译过程有4步
1. 词法分析：检查关键字是否正确
2. 语法分析：检查语法是否正确
3. 生成字节码：生成就是pyc文件。解释器的类型有cpython、IPython、PyPy、Jython、IronPython。
4. 执行。常见的cpython解释器是用c语言的方式来解释字节码的，而numba则是使用LLVM编译技术来解释字节码的。LLVM是一个编译器，它采用代码的特殊中​​间表示（IR）并将其编译为本机（机器）代码。编译过程涉及许多额外的传递，其中LLVM编译器可以优化IR。LLVM工具链非常擅长优化IR，因此它不仅可以编译Numba的代码，还可以优化它。


```
import numpy as np
from numba import jit

a = np.arange(1, 10 ** 7)
b = np.arange(-10 ** 7, -1)


@jit(nopython=True)
def sum_sequence(a, b):
    result = np.zeros_like(a)
    for i in range(len(a)):
        result[i] = a[i] - b[i]
    return result
```

```
import dis
dis.dis(sum_sequence)
```


Numba有两种模式：nopython和object。前者不使用Python运行时并生成没有Python依赖的本机代码。本机代码是静态类型的，运行速度非常快。而对象模式使用Python对象和Python C API，而这通常不会显着提高速度。在这两种情况下，Python代码都是使用LLVM编译的。


Numba的优点：
- 便于使用
- 自动并行化
- 支持numpy操作和对象
- 支持调用GPU

Numba的缺点：
- debug非常麻烦
- 无法在nopython模式下与Python及其模块进行交互，numba目前在nopython模式下支持python模块有限，比如pandas是不支持的，但是不支持意味着无法加速并不意味着不能运行。
- 对python中的类class支持有限



测试代码：

```python
import numpy as np
import datetime


def sum_array1(arr):
    length, height = arr.shape
    sum_res = 0
    for i in range(length):
        for j in range(height):
            sum_res += arr[i, j]

    return sum_res


start_time = datetime.datetime.now()
for i in range(500):
    arr = np.random.random((500, 500))
    sum_array1(arr)
print('普通：', datetime.datetime.now() - start_time)


# %%
def sum_array2(arr):
    return arr.sum()


start_time = datetime.datetime.now()
for i in range(500):
    arr = np.random.random((500, 500))
    sum_array2(arr)
print('numpy 计算：', datetime.datetime.now() - start_time)

# %%
from numba import jit


@jit
def sum_array3(arr):
    length, height = arr.shape
    sum_res = 0
    for i in range(length):
        for j in range(height):
            sum_res += arr[i, j]

    return sum_res


start_time = datetime.datetime.now()
for i in range(500):
    arr = np.random.random((500, 500))
    sum_array3(arr)
print('numba 加速', datetime.datetime.now() - start_time)


# %%

@jit(nopython=True)
def sum_array4(arr):
    length, height = arr.shape
    sum_res = 0
    for i in range(length):
        for j in range(height):
            sum_res += arr[i, j]

    return sum_res


start_time = datetime.datetime.now()
for i in range(500):
    arr = np.random.random((500, 500))
    sum_array4(arr)
print('numba 加速，nopython=True', datetime.datetime.now() - start_time)
```

结果：  
>普通： 0:00:30.612512
numpy 计算： 0:00:00.665852
numba 加速 0:00:00.917495
numba 加速，nopython=True 0:00:00.798196


numba 快了几十倍。任务正好是 numpy 擅长的，所以 numpy 最快，加上 `nopython=True` 后更快。

官方建议使用 `nopython=True`，这样的话，遇到不能加速的函数会直接报错，让你知道。


一些辅助测试的方法:
```python
# numba 可以根据上下文推测数据类型，把推测的数据类型显示出来：
sum_array4.inspect_types()

# 测试每行代码的效率
import cProfile
cProfile.run('sum_array4(150)')
```
