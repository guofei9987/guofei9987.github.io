---
layout: post
title: 【Python】【面向对象】类的特殊成员
categories:
tags: Python设计模式
keywords:
description:
order: 1003
---


## 1. `__init__`

构造方法，通过类创建对象时，自动触发执行。  
必须返回None（不写return）  

`__init__` 不是构造对象第一个执行的方法，`__new__` 才是

## 2. 文档相关
### `__doc__`

表示类的描述信息

```py
class Foo:
    """ 描述类信息，会被 __doc__ 打印出来 """
    def func(self):
        pass

print(Foo.__doc__)  # 输出： 描述类信息，会被 __doc__ 打印出来
```

### `__str__`与`__repr__`

```py
class Foo:
    def __repr__(self):
        return 'repr method'


obj = Foo()
print(obj)
obj
# 输出：repr method

# __str__ 只重构与print相关的，会覆盖__repr__中的print功能
# __repr__ 既重构与print相关的，也重构与直接输出相关的
```



## 3. 属性访问
```py
__getattr__(self,name) # 定义用户试图获取一个不存在的属性时的行为
__getattribute__(self,name) # 定义该类的属性被访问时的行为
__setattr__(self,name,value) # 定义当一个属性被设置时的行为
__delattr__(self,name)  # 定义当一个属性被删除时的行为
```
注意，覆写后要使用super()类来执行原本操作，否则会陷入无限递归

## 4. 重载运算符号

### 算术运算符


|方法|解释|
|--|--|
`__add__(self,other)`| 定义加法`+`
`__sub__(self,other)`| 定义减法`-`
`__mul__(self,other)`| 定义乘法`*`
`__truediv__(self,other)`| 定义除法`/`
`__floordiv__(self,other)`| 定义整除`//`
`__mod__(self,other)`| 定义取模`%`
`__divmode__(self,other)`| 定义`divmode`
`__pow__(self,other)`| 定义乘方`power`或`**`
`__lshift__(self,other)`| 定义按位左移`<<`
`__rshift__(self,other)`| 定义按位右移`>>`
`__and__(self,other)`| 定义按位与`&`
`__or__(self,other)`| 定义按位或`|`
`__xor__(self,other)`| 定义按位异或`^`
`__eq__(self, other)`|`==`



```py
class New_int(int):
    def __add__(self, other):
        return int.__sub__(self,other) # 别用 self +/- other ， 否则无限递归
    def __sub__(self, other):
        return int.__add__(self,other)


a=New_int(5)
a+3
```

### 反运算
被操作的对象放到后面，还有一堆重载方法：
```py
# 左操作数不支持相应操作时被调用，例如 1+<New_int> 这种写法
__radd__, __rsub__ , __rmul__ , __rturediv__ ,
__rfloordiv__ , __rmod__ , __rdivmod__ , __rpow__ ,
__rlshift__ , __rrshift__ , __rxor__ , __ror__
```

### 增量运算


|方法|解释|
|--|--|
`__iadd__(self,other)`| 定义加法`+=`
`__isub__(self,other)`| 定义减法`-=`
`__imul__(self,other)`| 定义乘法`*=`
`__itruediv__(self,other)`| 定义除法`/=`
`__ifloordiv__(self,other)`| 定义整除`//=`
`__imod__(self,other)`| 定义取模`%=`
`__ipow__(self,other)`| 定义乘方`power`或`**=`
`__ilshift__(self,other)`| 定义按位左移`<<=`
`__irshift__(self,other)`| 定义按位右移`>>=`
`__iand__(self,other)`| 定义按位与`&`
`__ior__(self,other)`| 定义按位或`|`
`__ixor__(self,other)`| 定义按位异或`^`


### 一元操作符


|方法|解释|
|--|--|
`__neg__(self)`| 定义负数`-x`
`__pos__(self)`| 定义正数`+x`
`__abs__(self)`| 定义绝对值`abs()`
`__invert__(self)`| 定义求反`~x`


### 类型转换


|方法|解释|
|--|--|
`__complex__(self)`| 定义`complex()`
`__int__(self)`| 定义`int()`
`__float__(self)`| 定义`float()`
`__round__(self)`| 定义求反`round()`

## 5. 容器类型


```py
class Foo(object):

    def __getitem__(self, key):
        # 执行类似 obj[key] 的操作
        print('__getitem__', key)

    def __setitem__(self, key, value):
        # 执行类似 obj[key]=value 的操作
        print('__setitem__', key, value)

    def __delitem__(self, key):
        # 执行类似 del obj[key] 的操作
        print('__delitem__', key)

    def __len__(self):
        # 执行类似 len(obj) 的操作
        print('__len__')
        return 1  # 必须返回一个 integer ，否则报错

    def __iter__(self):
        # 执行迭代器操作
        print('__iter__')

    def __reversed__(self):
        # 执行 reversed() 操作
        print('__reversed__')

    def __contains__(self, item):
        # 执行 item in obj 和 item not in obj 操作
        print('__contains__')
        return 1  # 最后的 return 会被强制变成 bool 类型


obj = Foo()

result = obj['k1']     # 触发执行 __getitem__
obj['k2'] = 'wupeiqi'  # 触发执行 __setitem__
del obj['k1']          # 触发执行 __delitem__
len(obj)               # 触发执行 __len__
reversed(obj)          # 触发执行 __reversed__
1 in obj               # 触发执行 __contains__
```



## 6. 迭代器
迭代器的用法
```py
it=iter([1,2,3])
next(it)
next(it)
next(it)
next(it) # 迭代到头会报一个 StopIteration 错误
```

*for 语句也是调用上面两个方法来实现的*  

```py
class Fibs:
    def __init__(self):
        self.a = 0
        self.b = 1

    def __iter__(self):
        return self

    def __next__(self):
        self.a, self.b = self.b, self.a + self.b
        if self.a > 100: raise StopIteration
        return self.a


fibs = Fibs()

for i in fibs:
    print(i)
```

## 7. 生成器
生成器的知识与类没太大关系，但比迭代器还要强大，因此放这里。  
利用生成器，可以实现 **协同程序**  
所谓协同程序就是可以运行的独立函数调用，函数可以暂停或者挂起，并在需要的时候从程序离开的地方继续或者重新开始。  



```py
def myGen():
    print('生成器被执行！')
    yield 1
    yield 2
```
使用方法1
```py
myG = myGen()
next(myG)
next(myG)
next(myG)  # 迭代到头后，会报一个 StopIteration 错误（同iter）
```
使用方法2
```py
myG = myGen()
for i in myG:
    print(i)
```


案例：斐波那契数列
```py
def fibs():
    a, b = 0, 1
    while b < 100:
        yield b
        a, b = b, a + b


for i in fibs():
    print(i)

[i for i in fibs()]
```









## 其它
### `__dict__`
返回所有属性组成的dict  
类或对象中的所有成员  
类：静态字段、方法  
对象的成员  


### `__module__` 和  `__class__`

`__module__`表示当前操作的对象在那个模块  

`__class__`表示当前操作的对象的类是什么  



### `__del__`
析构方法，当对象在内存中被释放时，自动触发执行。  

注:
1. 此方法一般无须定义，因为Python是一门高级语言，程序员在使用时无需关心内存的分配和释放，因为此工作都是交给Python解释器来执行，所以，析构函数的调用是由解释器在进行垃圾回收时自动触发执行的。  
2. 并不是说 `del object` 时都会执行，而是当引用数量为0，才会启用垃圾回收机制，并调用 `__del__` 方法


```py
class Foo:
    def __del__(self):
        print('wtf?')
        pass # 虽然这里没写如何del，但仍然从内存中删除
```
这么用：
```py
a = Foo()
b = a
del b # 不会触发 __del__ 因为引用数量不为0
del a # 触发 __del__，输出 "wtf?"，虽然 __del__ 方法没有指明如何删除，但仍然会从内存中删除
```

### `__call__`

- `__init__`由创建对象触发  
对象 = 类名()
- `__call__`方法的执行是由对象后加括号触发的  
对象() 或者 类()()







参考文献：  
http://python.jobbole.com/82023/  

http://python.jobbole.com/83747/  
