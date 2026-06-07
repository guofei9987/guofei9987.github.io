---
layout: post
title: 【Python】【面向对象】继承&多态
categories:
tags: 0xd0_设计模式
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

### 引用父类方法
子类继承父类时，会覆写父类的方法，有时候还想调用父类的方法（例如，使用 `__init__` 方法时，想让父类的 `__init__` 方法先运行一次），有两种方法：


父类
```python
import random


# 父类
class Fish:
    def __init__(self, name='Fish'):
        self.name = name
        self.position = random.randint(-100, 100)

    def move(self):
        self.position += random.randint(-5, 5)
        print(f'{self.name} move to {self.position}')


# 方法1：指定父类 Fish
class Shark(Fish):
    def __init__(self):
        Fish.__init__(self, 'Shark')
        self.hungry = False


shark = Shark()
shark.move()
shark.move()
shark.move()


# 方法2：使用 super，好处是不用一一去找父类的名称，改继承关系很方便
class Shark2(Fish):
    def __init__(self):
        super().__init__(name='shark')
        self.hungry = False


shark2 = Shark2()
shark2.move()
shark2.move()
shark2.move()
```


两个方法的区别
- 使用 `Fish.__init__`，被多次继承的公共父类会被执行多次。
- 使用 `super()`，公共父类仅被执行一次



### `__new__` 方法
```python
class A:
    def __new__(cls, *args, **kwargs):
        print("call __new__:")
        print(cls, args, kwargs)

    def __init__(self, x):
        self.x = x
        print("call __init__:")
        print(self)


a = A(1)
# 发现 __init__ 未被调用
```
是 `__new__` 方法调用的 `__init__`
- `__new__` 是一个静态方法
- `__new__` 返回类的对象，然后自动用 `__init__` 初始化。如果没有返回对象，那么 `__init__` 不被调用
- `__init__` 不显示返回（或者只能return None），否则报错
- `__new__` 和 `__init__` 的入参必须一模一样，否则报错


一般这样写：
```python
class A:
    def __new__(cls, *args, **kwargs):
        print("call __new__:")
        print(cls, args, kwargs)
        return super().__new__(cls)

    def __init__(self, x):
        self.x = x
        print("call __init__:")
        print(self)

a = A(10)
```


## 多态

Pyhon不支持多态并且也用不到多态，或者说Python天然有多态性。多态的概念是应用于Java和C#这一类强类型语言中，而Python崇尚“鸭子类型”。  

```py
from abc import ABC, abstractmethod


class Payment(ABC):
    @abstractmethod
    def pay(self, money):
        pass


class WeChatPay(Payment):
    def pay(self, money):
        print(f"微信支付 {money} 元")


class BankCard(Payment):
    def pay(self, money):
        print(f"银行卡支付 {money} 元")


def checkout(pay_obj, money):
    pay_obj.pay(money)


checkout(WeChatPay(), 100)
checkout(BankCard(), 200)
```


## issubclass和isinstance

issubclass：检查一个类是否是另一个类的子类
```py
issubclass(SubCls, Cls)
# 1. 一个类是其自身的子类
# 2. Cls 可以是tuple of class，任意为 True 就返回 True
# 3. 父类和祖先都返回 True
```

isinstance：检查一个对象是否是一个类的实例
```py
isinstance(obj, cls)
# 1. cls 是父类或祖先，都返回True
# 2. cls 可以是tuple of class，任意为True就返回True
```


## 其它
### self是什么

self 是类的实例

```python
class Test:
    def prt(self):
        print(self)
        print(self.__class__)

t = Test()

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
