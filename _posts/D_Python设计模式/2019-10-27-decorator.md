---
layout: post
title: 【decorator】装饰器
categories:
tags: 设计模式
keywords:
description:
order: 1004
---

## 实现

### 普通的装饰器

定义一个装饰器
```python
def logger(func):
    def wrapper(*args, **kwargs):
        print('我准备开始执行：{} 函数了:'.format(func.__name__))

        # 真正执行的是这行。
        res = func(*args, **kwargs)

        print('我执行完啦。')
        return res

    return wrapper
```

使用装饰器
```python
@logger
def add(x, y):
    print('{} + {} = {}'.format(x, y, x + y))
    return x + y

add(1, 2)
```

装饰器是一种让代码简洁的方案，上面这个代码实际上等价于下面这个
```python
def add(x, y):
    print('{} + {} = {}'.format(x, y, x + y))


logger(add)(1, 2)
```



改进：
```python
import functools


def logger(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print('我准备开始执行：{} 函数了:'.format(func.__name__))

        # 真正执行的是这行。
        func(*args, **kwargs)

        print('我执行完啦。')

    return wrapper


@logger
def add(x, y):
    print('{} + {} = {}'.format(x, y, x + y))


add(1, 2)
```


- `@functools.wraps(func)`。它能把原函数的元信息拷贝到装饰器里面的 func 函数中。函数的元信息包括docstring、name、参数列表等等。
- 如果删掉，会发现 `add.__name__` 的名字变成了 `wrapper`



### 带参数的装饰器

```python
def say_hello(contry):
    def deco(func):
        def wrapper(*args, **kwargs):
            if contry == "china":
                print("你好!")
            elif contry == "america":
                print('hello.')
            else:
                return

            # 真正执行函数的地方
            func(*args, **kwargs)

        return wrapper

    return deco


# 小明，中国人
@say_hello("china")
def xiaoming():
    pass


# jack，美国人
@say_hello("america")
def jack():
    pass
```


functools.wraps 同上
```python
import functools


def say_hello(contry):
    def deco(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            if contry == "china":
                print("你好!")
            elif contry == "america":
                print('hello.')
            else:
                return

            # 真正执行函数的地方
            func(*args, **kwargs)

        return wrapper

    return deco


# 小明，中国人
@say_hello("china")
def xiaoming():
    pass


# jack，美国人
@say_hello("america")
def jack():
    pass

```


### 普通的类装饰器

```python
class logger(object):
    def __init__(self, func):
        # 这个方法用来接收被装饰的函数
        self.func = func

    def __call__(self, *args, **kwargs):
        # 用来实现装饰逻辑
        print("[INFO]: the function {func}() is running..." \
              .format(func=self.func.__name__))
        return self.func(*args, **kwargs)


@logger
def say(something):
    print("say {}!".format(something))


say("hello")
```

### 带参数的类装饰器
```python
class logger(object):
    def __init__(self, level='INFO'):
        self.level = level

    def __call__(self, func):  # 接受函数
        def wrapper(*args, **kwargs):
            print("[{level}]: the function {func}() is running..." \
                  .format(level=self.level, func=func.__name__))
            func(*args, **kwargs)

        return wrapper


@logger(level='WARNING')
def say(something):
    print("say {}!".format(something))


say("hello")
```

更多内容：http://magic.iswbm.com/zh/latest/c03/c03_10.html



## 应用

### 1
我们要做一个 fibonacci 计算函数，自然想到用递归
```python
def fibonacci(n):
    if n < 0:
        raise ValueError('n>=0')
    return n if n in (0, 1) else fibonacci(n - 1) + fibonacci(n - 2)
```
你会发现这里有大量重复计算，导致计算效率极低。自然想到改进，把已经计算好的函数值记录下来
```python
known = {0: 0, 1: 1}
def fibonacci2(n):
    if n in known:
        return known[0]
    else:
        res = fibonacci2(n - 1) + fibonacci2(n - 2)
        known[n] = res
    return res
```
实验发现，这个速度快了很多。新问题，如果你想写一个包，里面有不同的递归算法（帕斯卡三角等），这样写会让代码一团乱麻，因为每个方法你都要定义一个known。






### 2
能显示运行时间的装饰器


```python
import time


def timer(func):
    def d_func(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(end_time - start_time)
        return result

    return d_func


@timer
def myfunc(a):
    time.sleep(2)
    print(a)


myfunc(3)
```


## 附：scipy的做法
来源：
```python
from scipy import optimize
optimize.fmin
```
解释一下，ncalls是一个计数器，记录函数被调用的次数
```python
def wrap_function(function, args):
    ncalls = [0]
    if function is None:
        return ncalls, None

    def function_wrapper(*wrapper_args):
        ncalls[0] += 1
        return function(*(wrapper_args + args))

    return ncalls, function_wrapper
```

## 参考资料

【印】Chetan Giridhar:《Python 设计模式》, 中国工信出版集团
