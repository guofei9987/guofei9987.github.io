---
layout: post
title: 【Python】【面向对象】继承&多态
categories:
tags: Python设计模式
keywords:
description:
order: 1001
---

## 继承
在继承时，  
经典类是深度优先搜索  
新式类是广度优先搜索（新式类继承自object）  


### 经典类
```py
class D():
    def bar(self):
        print('D.bar')

class C(D):
    def bar(self):
        print('C.bar')

class B(D):
    def bar1(self):
        print('B.bar')

class A(B, C):
    def bar(self):
        print('A.bar')

a = A()
# 经典类顶层不继承自任何对象
# 经典类执行方法时，采用深度优先搜索
# 首先去A类中查找，如果A类中没有，则继续去B类中找，如果B类中么有，则继续去D类中找，如果D类中么有，则继续去C类中找，如果还是未找到，则报错
# 所以，查找顺序：A --> B --> D --> C
# 在上述查找bar方法的过程中，一旦找到，则寻找过程立即中断，便不会再继续找了
a.bar()
```


### 新式类

```py
class D(object):
    def bar(self):
        print('D.bar')

class C(D):
    def bar(self):
        print('C.bar')

class B(D):
    def bar1(self):
        print('B.bar')

class A(B, C):
    def bar(self):
        print('A.bar')

a = A()
# 新式类继承自object
# 新式类执行方法时，采用广度优先搜索
# 首先去A类中查找，如果A类中没有，则继续去B类中找，如果B类中么有，则继续去D类中找，如果D类中么有，则继续去C类中找，如果还是未找到，则报错
# 所以，查找顺序：A --> B --> D --> C
# 在上述查找bar方法的过程中，一旦找到，则寻找过程立即中断，便不会再继续找了
a.bar()
```

### 继承中的 `__init__` 方法
子类继承父类时，会覆写父类的方法，也包括 `__init__` 方法。有时候不想要这种效果，想让父类也执行创建，有两种方法解决。
- 未绑定的父类方法
```py
import random
import scipy.stats as stats
class Fish:
    def __init__(self):
        self.position = stats.randint(1, 10).rvs(size=(2,))
    def move(self):
        self.position[0] -= 1
        print('move to {position}'.format(position=self.position))
class Shark(Fish):
    def __init__(self):
        Fish.__init__(self) # 未绑定的父类方法
        self.ishungry = False
shark = Shark()
shark.move()
shark.move()
shark.move()
```
- 使用super函数
```py
import random
import scipy.stats as stats
class Fish:
    def __init__(self):
        self.position = stats.randint(1, 10).rvs(size=(2,))
    def move(self):
        self.position[0] -= 1
        print('move to {position}'.format(position=self.position))
class Shark(Fish):
    def __init__(self):
        super().__init__(self) # super方法，好处是不用一一去找父类的名称，改继承关系很方便
        self.ishungry = False
shark = Shark()
shark.move()
shark.move()
shark.move()
```

### `__new__` 方法
```python
class A:
    def __new__(cls, *args, **kwargs):
        print(cls, args, kwargs)

    def __init__(self, value):
        self.value = value
        print(self)


a = A(1)
# 发现 __init__ 未被调用
```
是 `__new__` 方法调用的 `__init__`
- `__new__` 是一个静态方法
- `__new__` 返回类的对象，然后自动用 `__init__` 初始化。如果没有返回对象，那么 `__init__` 不被调用
- `__init__` 不显示返回（或者只能return None），否则报错
- `__new__` 和 `__init__` 的入参必须一模一样，否则报错


## 多态

Pyhon不支持多态并且也用不到多态，或者说Python天然有多态性。多态的概念是应用于Java和C#这一类强类型语言中，而Python崇尚“鸭子类型”。  

```py
class F1:
    pass

class S1(F1):

    def show(self):
        print('S1.show')

class S2(F1):

    def show(self):
        print('S2.show')



def Func(obj):
    """Func函数需要接收一个F1类型或者F1子类的类型"""
    obj.show()
    #print()

s1_obj = S1()
Func(s1_obj) # 在Func函数中传入S1类的对象 s1_obj，执行 S1 的show方法，结果：S1.show

s2_obj = S2()
Func(s2_obj) # 在Func函数中传入Ss类的对象 ss_obj，执行 Ss 的show方法，结果：S2.show
```
由于在Java或C#中定义函数参数时，必须指定参数的类型  
为了让Func函数既可以执行S1对象的show方法，又可以执行S2对象的show方法，所以，定义了一个S1和S2类的父类  
而实际传入的参数是：S1对象和S2对象  

## 元类

```python
def hello(self):
    self.name = 10
    print("hello world")


Test = type('Test', (object,), {'num': 0,'hello':hello})
# 3个参数，类名，父类名。第三个字典中是类属性、类方式、静态方法
t = Test()
```



## 其它
### self是什么

self 是类的实例

```python
class Test:
    def prt(self):
        print(self)
        print(self.__class__)

t=Test()

print(t)
t.prt()

# 输出是：
# <__main__.Test object at 0x7fa25d134d30>
# <__main__.Test object at 0x7fa25d134d30>
# <class '__main__.Test'>
```

结论：self是类的实例  

继续问：
### 在继承时，self是什么

```python
class Parent:
    def pprt(self):
        print(self)

class Child(Parent):
    def cprt(self):
        print(self)
c = Child()
c.cprt()
c.pprt()
p = Parent()
p.pprt()

# <__main__.Child object at 0x7fa25d1346a0>
# <__main__.Child object at 0x7fa25d1346a0>
# <__main__.Parent object at 0x7fa25d134668>
```
继承时，即使方法是在父类中定义的，self也是这次的实例（或者说，继承时从父类中把方法借过来给自己用）
