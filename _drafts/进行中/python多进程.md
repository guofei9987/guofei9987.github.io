改名：多进程&多线程


测试函数：
```python
import time
import datetime
import os


def func1(name):
    pid = os.getpid()
    start_time = datetime.datetime.now().strftime('%S.%f')
    time.sleep(1)
    end_time = datetime.datetime.now().strftime('%S.%f')
    print('task_name={name}, pid={pid}, start_time={start_time}, end_time={end_time}'.
          format(name=name, pid=pid, start_time=start_time, end_time=end_time))
    return name


func1(1)
```

## 不能并行的实现
```python

a=[func1(i) for i in range(5)]


b=list(map(func1,range(5)))


c=[]
for i in range(5):
    c.append(func1(i))
```

发现
- 消耗的时间差不多
- map并没有实现并行（很多博客有误导）


## multiprocessing
multiprocessing 多进程，可以充分利用多核做计算


测试函数还用上面那个

### 启动一个子进程
```python
from multiprocessing import Process

p = Process(target=func1, args=('test',))
print(os.getpid()) # 获取主进程的号码
p.start() # 启动子进程
p.join() # 等待到进程结束
```

### 批量启动子进程
```python
from multiprocessing import Pool

print('Parent process %s.' % os.getpid())
p = Pool(4)
results=[p.apply_async(func1, args=(i,)) for i in range(5)]

p.close()
p.join()
```


### 最佳实践
```python
from multiprocessing import Pool
from multiprocessing.dummy import Pool as ThreadPool

pool = ThreadPool()  # ThreadPool(4), 不指定进程数，则使用全部线程

pool.map(func1, range(5)) # 返回list，就是结果

pool.imap(func1, range(10)) # 返回 generator

pool.imap_unordered(func1, range(10)) # 返回generator，并且不要求按顺序
```

显示可用的cpu数量
```python
import multiprocessing as mp

mp.cpu_count()
```

### apply_async


```python
def func(x1, x2):
    time.sleep(1)
    return x1 + x2 + 1


results = [pool.apply_async(func, args=(x1, x2)) for (x1, x2) in np.random.rand(100, 2)] # 这一步不实际运行
results = [p.get() for p in results]
```



## threading
一个进程可以有多个线程。线程是操作系统直接支持的执行单元，并且Python的线程是真正的Posix Thread，而不是模拟出来的线程。


进一步阅读：
多线程：https://zhuanlan.zhihu.com/p/90180209  
多进程：https://zhuanlan.zhihu.com/p/93305921  




另一个并行工具
mpi4py，基于MPI-1/MPI-2


## 实战
在实数优化问题上，差别不是很大。可能是因为循环内部的运算较为简单，不足以抵消多线程带来的不良后果。


```
import multiprocessing as mp
```

## subprocess
并行启动外部进程  

参见[subprocess](https://www.guofei.site/2018/06/05/sysos.html#subprocess)
