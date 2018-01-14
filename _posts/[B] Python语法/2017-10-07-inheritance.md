---
layout: post
title: 【Python】【面向对象】继承&多态.
categories:
tags: Python语法
keywords:
description:
order: 1101
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
# 执行bar方法时
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
# 执行bar方法时
# 首先去A类中查找，如果A类中没有，则继续去B类中找，如果B类中么有，则继续去D类中找，如果D类中么有，则继续去C类中找，如果还是未找到，则报错
# 所以，查找顺序：A --> B --> D --> C
# 在上述查找bar方法的过程中，一旦找到，则寻找过程立即中断，便不会再继续找了
a.bar()
```

## 多态

Pyhon不支持多态并且也用不到多态，多态的概念是应用于Java和C#这一类强类型语言中，而Python崇尚“鸭子类型”。  

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



参考文献：
http://python.jobbole.com/82023/  

http://python.jobbole.com/83747/  
