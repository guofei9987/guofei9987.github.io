---
layout: post
title: 【with】上下文管理器
categories:
tags: Python设计模式
keywords:
description:
order: 1004
---


## 进阶示例
```python
class Resource():
    def __init__(self, filename=''):
        print('初始化 context manager')
        self.filename = filename

    def __enter__(self):
        print('获取资源的逻辑, filename = {}'.format(self.filename))
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f'''关闭资源的逻辑，
        异常类型 = {exc_type}, 异常值 = {exc_val}, 异常的错误栈信息 = {exc_tb}
        如果主代码没有异常，三个参数都是 None
        ''')
        # return True，就相当于告诉Python解释器，主逻辑的异常我们已经捕获了，不需要再往外抛了
        # 如果 主逻辑本身就没有抛出异常，无论return True/False，都不会抛出异常
        return True

    def operate(self):
        print('执行某个操作，就是一个普通的方法')


# 可以同时 with 多个
with Resource('file1') as res1, Resource('file2') as res2:
    res1.operate()
    res2.operate()
```



使用上下文管理器有三个好处：
- 提高代码的复用率；
- 提高代码的优雅度；
- 提高代码的可读性；



## 一个简单的上下文管理器

```python
class Resource():
    def __enter__(self):
        print('===connect to resource===')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('===close resource connection===')

    def operate(self):
        print('===in operation===')


with Resource() as res:
    res.operate()
```

运行结果：
```
===connect to resource===
===in operation===
===close resource connection===
```

上下文管理器的优点：处理异常时，通常使用 `try...except...`，这会造成主代码中有大量的异常处理，很大影响可读性。  
例如：
```python
class Resource():
    def __enter__(self):
        print('===connect to resource===')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('===close resource connection===')
        return True

    def operate(self):
        1/0

with Resource() as res:
    res.operate()
```

这个代码就不会报错，而是由 `__exit__` 捕获异常，由你自己决定如何处理。
- return：如果返回 True，就相当于告诉 Python解释器，这个异常我们已经捕获了，不需要再往外抛了
- exc_type：异常类型
- exc_val：异常值
- exc_tb：异常的错误栈信息
- 如果主代码没有异常，这三个参数都是 None


另外，上下文解释器也可以不是类，可以是函数，见于 [文档](http://magic.iswbm.com/zh/latest/c04/c04_01.html#what-context-manager)。





## 参考资料
http://magic.iswbm.com/zh/latest/c04/c04_01.html#what-context-manager
