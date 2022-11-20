---
layout: post
title: 【Python】【面向对象】字段&方法
categories:
tags: 0xd0_设计模式
keywords:
description:
order: 1002
---

## 字段
### 普通字段&静态字段
字段包括：普通字段和静态字段，他们在定义和使用中有所区别，而最本质的区别是内存中保存的位置不同，

- 普通字段属于对象
- 静态字段属于类

```py
class Province:

    # 静态字段
    country='中国'

    def __init__(self, name):

        # 普通字段
        self.name = name

# 直接访问普通字段
obj = Province('河北省')
print(obj.name)

# 静态字段属于类
Province.country
obj.country # 静态字段也可以通过对象来访问
obj.country='美国' # 会创建一个新指针，因此只影响obj,不影响Province
obj2=Province()
Province.country='德国' # obj2.country会变，而obj.country不会变，因为obj已经指向一个新变量了
```

![pythonoop1.jpg](/pictures_for_blog/postimg2/pythonoop1.jpg)  

- 静态字段在内存中只保存一份
- 普通字段在每个对象中都要保存一份

### 公有字段&私有字段

```py
class C:
    PublicStatic = "公有静态字段"
    __PrivateStatic = "私有静态字段"

    def __init__(self):
        self.PublicDynamic = "公有动态字段"
        self.__PrivateDynamic = "私有动态字段"

    def func(self):
        print(self.PublicStatic)
        print(self.__PrivateStatic)
        print(self.PublicDynamic)
        print(self.__PrivateDynamic)


class D(C):

    def show(self):
        print(self.PublicStatic)
        # print(self.__PrivateStatic)  # 报错，子类不能访问父类的私有字段
        print(self.PublicDynamic)
        # print(self.__PrivateDynamic)  # 报错，之类不能访问父类的私有字段


C.PublicStatic  # 类可以访问公有字段
# C.__PrivateStatic  # 报错，只有类内可以访问私有字段，
# C.PublicDynamic  # 报错，动态字段属于对象，而不是类

obj = C()
obj.func()  # 类内部可以访问
obj.PublicStatic  # 静态字段属于类，对象也可以访问
obj.PublicDynamic  # 动态字段属于对象，对象可以访问，但类不能
# obj.__PrivateStatic  # 报错，只有类内可以访问
# obj.__PrivateDynamic  # 报错，只有类内可以访问

obj_son = D()
obj_son.show()  # 派生类中可以访问
obj_son.func()
```

知识
- 只有类内才能访问私有字段和私有方法
- 子类、类外部都不能访问私有方法
- 如果想要强制访问私有字段，可以通过 【对象._类名__私有字段明 】强制访问（如：`obj._C__foo`），但非常不建议这么干。


## 方法
### 类方法和静态方法

- 普通方法：由对象调用；至少一个self参数；执行普通方法时，自动将调用该方法的对象赋值给self；
- 类方法：由类调用； 至少一个cls参数；执行类方法时，自动将调用该方法的类复制给cls；
- 静态方法：由类调用；无默认参数；

后两种用法，见于下面的注释

```py
class Foo:
    def __init__(self, name):
        self.name = name

    def ord_func(self):
        """ 定义普通方法，至少有一个self参数 """
        print('普通方法')

    @classmethod
    def class_func(cls):
        """ 定义类方法，至少有一个cls参数
        另外，如果被继承，那么传入的cls是子类
        配合类的静态字段，可以做一些奇技淫巧
        """
        print('类方法', cls)

    @staticmethod
    def static_func():
        """ 定义静态方法 ，无默认参数
        很多时候，静态方法与独立的一个函数没什么区别
        静态方法常常用来把代码组织起来，提高可读性、可维护性
        """
        print('静态方法')


f = Foo('abc')

# 调用普通方法
f.ord_func()

# 调用类方法
Foo.class_func() # 打印了 <Foo>
f.class_func() # 打印了 <Foo>

# 调用静态方法
Foo.static_func()
f.static_func()
```

## 动态面向对象

元类

```python
def hello(self):
    self.name = 10
    print("hello world")


Test = type('Test', (object,), {'num': 0,'hello':hello})
# 3个参数，类名，父类名。第三个字典中是类属性、类方式、静态方法
t = Test()
```


namedtuple：快速生成简单的类

```python
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y', 'z'])  
lst = [Point(1.5, 2, 3.0), Point(-0.3, -1.0, 2.1), Point(1.3, 2.8, -2.5)]
print(lst[0].y - lst[1].y)

# 可以用 len, count, index 之类的类似list的方法
```

### 动态修改属性


```python
class Student():
    def __init__(self, num_id, name):
        self.num_id = num_id
        self.name = name


tom = Student(1, 'Tom')

# 删除
delattr(tom, 'num_id')
# 判断
hasattr(tom, 'num_id')
# 获取属性
getattr(tom, 'name')
# 修改属性
setattr(tom, 'num_id_new', 3)
```

### 动态地添加方法

```python
# operator_wapper 是一个普通的函数，在类里面这么写，可以把普通函数做成一个类方法
def operator_wapper(*wrapper_args):
    return operator(*(wrapper_args + args), **kwargs)
setattr(self, operator_name, types.MethodType(operator_wapper, self))
```

直接等号，缺点是不能传入self
```python
def my_func1():
    print('my_func1')


class FOO(object):
    def func1(self):
        print(self)


foo = FOO()
foo.func1 = my_func1
```

类中间等号，需要传入self
```python
def my_func1(self):
    print('my_func1', self)


class FOO(object):
    func1 = my_func1


foo = FOO()
foo.func1()
```

## 描述符

对于属性
```python
class FOO:
    a = 1

    def __init__(self):
        self.b = 2


FOO.__dict__  # 所有属性，包括a不包括b

foo = FOO()
foo.__dict__  # 包括b，不包括a

```
用点的时候，先从实例中找，如果找不到会从类属性中找。换句话说，操作符 `.` 封装了两种不同属性进行查找的细节。








## 装饰器型属性

```py
# ############### 定义 ###############
class Goods(object):

    @property
    def price(self):
        print ('@property')

    @price.setter
    def price(self, value):
        print('@price.setter')

    @price.deleter
    def price(self):
        print('@price.deleter')

# ############### 调用 ###############
obj = Goods()

obj.price          # 会执行 @property 修饰的 price 方法，并获取此方法的返回值

obj.price = 123    # 会执行 @price.setter 修饰的 price 方法，并将  123 赋值给方法的入参

del obj.price      # 会执行 @price.deleter 修饰的 price 方法
```

用途：
- 可以用来做 只读/只写特性
- 旧版本的经典类和新式类功能有区别，新版本已经无区别。

另一种写法（不推荐）

```py
class Foo:

    def get_bar(self):
        return 'wupeiqi'

    # *必须两个参数
    def set_bar(self, value):
        return 'set value'+value

    def del_bar(self):
        return 'wupeiqi'

    BAR = property(get_bar, set_bar,del_bar,'description...')
    #第一个参数是方法名，调用 对象.属性 时自动触发执行方法
    #第二个参数是方法名，调用 对象.属性 ＝ XXX 时自动触发执行方法
    #第三个参数是方法名，调用 del 对象.属性 时自动触发执行方法
    #第四个参数是字符串，调用 对象.属性.__doc__ ，此参数是该属性的描述信息

obj = Foo()

obj.BAR              # 自动调用第一个参数中定义的方法：get_bar
obj.BAR = "alex"     # 自动调用第二个参数中定义的方法：set_bar方法，并将“alex”当作参数传入
del Foo.BAR          # 自动调用第三个参数中定义的方法：del_bar方法
obj.BAR.__doc__      # 自动获取第四个参数中设置的值：description...
```

## 修饰器
```python
class Foo:
    def __get__(self,instance,owner):
        print("触发 Foo.__get__",instance,owner)
        return instance.__dict__['x']
    def __set__(self,instance,value):
        print("触发 Foo.__set__ ",instance, value)
        instance.__dict__['x'] = value
    def __delete__(self,instance):
        print("触发 Foo.__delete__ ",instance)

class Bar:
    x = Foo() # 描述符,对x对象属性的调用去找Foo对象
    def __init__(self,n):
        self.x = n

b1 = Bar(10) # 首先触发Bar的__init__函数。然后 self.x = n 触发Foo的x方法,触发Foo的set方法
print(b1.__dict__) # {'x': 10}
print(Bar.__dict__) # 类的字段，没有 {'x': 10}
b1.x = 11111111 # 触发 Foo.__set__
b1.x   # 触发 Foo.__get__
del b1.x # 触发 Foo.__delete__
```

## 参考文献

http://python.jobbole.com/82023/  

http://python.jobbole.com/83747/
