---
layout: post
title: 【Python】【面向对象】类的特殊成员.
categories:
tags: Python语法
keywords:
description:
order: 1103
---




### `__doc__`

表示类的描述信息

```py
class Foo:
    """ 描述类信息，这是用于看片的神奇 """

    def func(self):
        pass

print(Foo.__doc__) #输出：类的描述信息
```

### `__str__`

```py
class Foo:

    def __str__(self):
        return 'wupeiqi'

obj = Foo()
print(obj)
# 输出：wupeiqi
```



### `__module__` 和  `__class__`

`__module__`表示当前操作的对象在那个模块  

`__class__`表示当前操作的对象的类是什么  

### `__init__`

构造方法，通过类创建对象时，自动触发执行。  

### `__del__`
析构方法，当对象在内存中被释放时，自动触发执行。

注：此方法一般无须定义，因为Python是一门高级语言，程序员在使用时无需关心内存的分配和释放，因为此工作都是交给Python解释器来执行，所以，析构函数的调用是由解释器在进行垃圾回收时自动触发执行的。

```py
class Foo:
    def __del__(self):
        print('wtf?')
        pass
```
这么用：
```py
del a#输出wtf?
```

### `__call__`

- `__init__`由创建对象触发  
对象 = 类名()
- `__call__`方法的执行是由对象后加括号触发的  
对象() 或者 类()()

### `__dict__`
类或对象中的所有成员
类：静态字段、方法
对象的成员

### `__getitem__、__setitem__、__delitem__`

用于索引操作，如字典。以上分别表示获取、设置、删除数据

```py
class Foo(object):

    def __getitem__(self, key):
        print( '__getitem__',key)

    def __setitem__(self, key, value):
        print( '__setitem__',key,value)

    def __delitem__(self, key):
        print( '__delitem__',key)

obj = Foo()

result = obj['k1']      # 自动触发执行 __getitem__
obj['k2'] = 'wupeiqi'   # 自动触发执行 __setitem__
del obj['k1']           # 自动触发执行 __delitem__
```


参考文献：
http://python.jobbole.com/82023/  

http://python.jobbole.com/83747/  
