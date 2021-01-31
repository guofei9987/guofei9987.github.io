---
layout: post
title: 【Python】设计模式
categories:
tags: Python设计模式
keywords:
description:
order: 1004
---

设计模式是开发者和架构师的宝贵经验，是具有泛用性的方法论。


## 单例模式
是什么？确保类有且只有一个对象

用途：  
数据库、打印机、导入库等只要一个实例的场景
缺点：  
1. 对象可能在某个地方被误改，但开发人员并不知道
2. 可能会提高耦合性（类似全局变量）

### 实现
```py
class A(object):
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(A, cls).__new__(cls)
        return cls.instance


obj1 = A()
obj2 = A()
obj1 is obj2 # 返回 True
```
有点儿难理解，分析如下：
- 创建对象时，先调用`__new__`，由 `__new__` 调用 `__init__`. 所以一般建对象时，不写 `__new__`.


升级用法是 **懒汉实例化**（有空再补）


## 工厂模式

### 简单工厂模式

```python
class Animal:
    def do_say(self):
        pass


class Dog(Animal):
    def do_say(self):
        print('Bhow Bhow!!')


class Cat(Animal):
    def do_say(self):
        print('Meow Meow!!')


class ForestFactory(object):
    def make_sound(self, object_type):
        return eval(object_type)().do_say()


ff = ForestFactory()
ff.make_sound('Cat')
ff.make_sound('Dog')
```
解析：
- 用`Animal` 接口，创建两种产品 `Cat` 和 `Dog`
- `ForestFactory` 是一个工厂，运行时创建适当的 `Animal` 实例，并输出正确的声音

工厂模式的好处：松耦合，客户端不需要考虑传递哪些参数，或实例化哪些类


## 代理模式
```python
class You:
    def __init__(self):
        print('You:: Lets buy the shirt')
        self.debitCard = DebitCard()
        self.isPurchased = None

    def make_payment(self):
        self.isPurchased = self.debitCard.do_pay()
        if self.isPurchased:
            print('You:: Wow! The shirt is mine')
        else:
            print('You:: I should earn more :(')


class Payment:
    def do_pay(self):
        pass


class Bank(Payment):
    def __init__(self):
        self.card = None
        self.acount = None

    def __getAccount(self):
        self.acount = self.card
        return self.acount

    def __hasFunds(self):
        print('Bank:: Checking if Account', self.__getAccount(), 'has enough funds')
        return True

    def setCard(self, card):
        self.card = card

    def do_pay(self):
        if self.__hasFunds():
            print('Bank:: Paying the merchant')
            return True
        else:
            print('Bank:: Sorry, not enough funds!')
            return False


class DebitCard(Payment):
    def __init__(self):
        self.bank = Bank()

    def do_pay(self):
        card = input('Proxy:: Input your Card Number')
        self.bank.setCard(card)
        return self.bank.do_pay()


you = You()
you.make_payment()
```
解释
- `Payment` 是一个抽象基类，代表一个接口
- `Bank` 类是一个真实主题
- `DebitCard` 是真实主题 `Bank` 的代理


代理模式的优点
- 可以缓存笨重的对象（或需要反复访问的对象），提高性能
- 提供对真实主题的访问授权（权限合适的情况下）
- 便于网络连接、远程服务器之类的


## 观察者模式

```python
class Subject:
    def __init__(self):
        self.__observers = []

    def register(self, observers):
        self.__observers.append(observers)

    def notifyAll(self, *arg, **kwargs):
        for observer in self.__observers:
            observer.notify(self, *arg, **kwargs)


class Observer1:
    def __init__(self, subject):
        subject.register(self)

    def notify(self, subject, *args, **kwargs):
        print(self, 'got', args, kwargs, 'from', subject)


class Observer2:
    def __init__(self, subject):
        subject.register(self)

    def notify(self, subject, *args, **kwargs):
        print(self, 'got', args, kwargs, 'from', subject)


subject = Subject()
observer1 = Observer1(subject)
observer2 = Observer2(subject)

subject.notifyAll('notification', k=5)
```

优点：松耦合
- 使得测试、维护更简单
- 分解
- 主题对观察者有一个特定的接口。不需要了解特定的观察者类
- 可以随时增、删任意观察者
- 观察者与主题没有绑定在一起。观察者可以在其他地方重复使用


## 命令模式
示例代码有点儿复杂，以后整理完再写

## 模版方法--封装算法

```python
from abc import ABCMeta, abstractmethod


class Trip(metaclass=ABCMeta):
    @abstractmethod
    def setTransport(self):
        pass

    @abstractmethod
    def day1(self):
        pass

    @abstractmethod
    def day2(self):
        pass

    @abstractmethod
    def day3(self):
        pass

    @abstractmethod
    def returnHome(self):
        pass

    def itinerary(self):
        self.setTransport()
        self.day1()
        self.day2()
        self.day3()
        self.returnHome()


class BeijingTrip(Trip):
    def setTransport(self):
        print('坐高铁到北京')

    def day1(self):
        print('去南锣鼓巷')

    def day2(self):
        print('去香山游玩')

    def day3(self):
        print('去爬长城')

    def returnHome(self):
        print('坐高铁回家')


class ShanghaiTrip(Trip):
    def setTransport(self):
        print('坐飞机去上海')

    def day1(self):
        print('去迪士尼')

    def day2(self):
        print('去东方明珠')

    def day3(self):
        print('去南京路')

    def returnHome(self):
        print('坐飞机回家')


class TravelAgency:
    def arrange_trip(self):
        choice = input('北京 or 上海?')
        if choice == '北京':
            self.trip = BeijingTrip()
        if choice == '上海':
            self.trip = ShanghaiTrip()
        self.trip.itinerary()


TravelAgency().arrange_trip()
```

## 状态设计模式
```python
from abc import ABCMeta, abstractmethod


class State(metaclass=ABCMeta):
    @abstractmethod
    def Handle(self):
        pass


class ConcreteStateA(State):
    def Handle(self):
        print('ConcreteStateA')


class ConcreteStateB(State):
    def Handle(self):
        print('ConcreteStateB')


class Context(State):
    def __init__(self):
        self.state = None

    def getState(self):
        return self.state

    def setState(self, state):
        self.state = state

    def Handle(self):
        self.state.Handle()


context = Context()
stateA = ConcreteStateA()
stateB = ConcreteStateB()

context.setState(stateA)
context.Handle()
```
优点：
- 规避if-else, switch-case
- 容易添加状态

缺点
- 类爆炸。当情况越来越多，类也就是越来越多

## 反模式
不良设计。
- 不动性。应用程序非常难以重用
- 刚性。任何小的改动都会导致其他部分很多改动
- 脆弱性。任何小的更改都可能导致整个系统崩溃
- 粘滞性。架构层面的更改非常困难，因此修改必须由开发人员在代码或环境本身中进行。


### 软件开发反模式
原因
- 开发人员的想法随着开发过程的推进而变化
- 用例随着客户的反馈而更改
- 最初设计的数据结构随着功能方便的考虑而变换

分类
- 意大利面条式代码
- 金锤：任何问题使用同一个解决方案
    - 不了解技术的高层或技术领袖
    - 锤子多次验证有效，但这次不同
    - 公司被金锤绑架，已经投资了大量资源。员工已经使用顺手。
- 熔岩流。大量的死代码，人们害怕一旦对其进行修改，就会破坏其他东西。久而久之，这段代码就固定下来，像熔岩凝固一样。
    - 大量试错代码
    - 一人编写的代码，未经过代码审查，随意地移交
- 复制黏贴
    - 急功近利

### 软件架构中的反模式

重新发明轮子

供应商套牢

...

## 参考资料

【印】Chetan Giridhar:《Python 设计模式》, 中国工信出版集团
