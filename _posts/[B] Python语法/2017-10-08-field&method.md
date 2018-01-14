---
layout: post
title: 【Python】【面向对象】字段&方法.
categories:
tags: Python语法
keywords:
description:
order: 1102
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
obj.country#静态字段也可以通过对象来访问
```

<img src='http://www.guofei.site/public/postimg2/pythonoop1.jpg'>  

- 静态字段在内存中只保存一份
- 普通字段在每个对象中都要保存一份

### 公有字段&私有字段

```py
class C:

    PublicStatic = "公有静态字段"
    __PrivateStatic = "私有静态字段"
    def __init__(self):
        self.PublicDynamic="公有动态字段"
        self.__PrivateDynamic="私有动态字段"

    def func(self):
        print(self.PublicStatic)
        print(self.__PrivateStatic)
        print(self.PublicDynamic)
        print(self.__PrivateDynamic)

class D(C):

    def show(self):
        print(self.PublicStatic)
        #print(self.__PrivateStatic)#报错，子类不能访问父类的私有字段
        print(self.PublicDynamic)
        #print(self.__PrivateDynamic)报错，

#C.PublicStatic         # 类访问
#C.__PrivateStatic#报错，只有类内可以访问
#C.PublicDynamic

#obj = C()
#obj.func()     # 类内部可以访问
#obj.PublicStatic#报错，动态字段不属于类
#obj.__PrivateStatic#报错，只有类内可以访问
#obj.PublicDynamic
#obj.__PrivateDynamic#报错，只有类内可以访问

obj_son = D()
obj_son.show() # 派生类中可以访问
#obj

```

**ps：如果想要强制访问私有字段，可以通过 【对象._类名__私有字段明 】访问（如：obj._C__foo），不建议强制访问私有成员。**  



## 方法

- 普通方法：由对象调用；至少一个self参数；执行普通方法时，自动将调用该方法的对象赋值给self；
- 类方法：由类调用； 至少一个cls参数；执行类方法时，自动将调用该方法的类复制给cls；
- 静态方法：由类调用；无默认参数；

```py
class Foo:

    def __init__(self, name):
        self.name = name

    def ord_func(self):
        """ 定义普通方法，至少有一个self参数 """

        # print self.name
        print( '普通方法')

    @classmethod
    def class_func(cls):
        """ 定义类方法，至少有一个cls参数 """

        print ('类方法')

    @staticmethod
    def static_func():
        """ 定义静态方法 ，无默认参数"""

        print( '静态方法')

# 调用普通方法
f = Foo('abc')
f.ord_func()

# 调用类方法
Foo.class_func()

# 调用静态方法
Foo.static_func()
```

### 属性

### 经典类-装饰器型属性
```py
# ############### 定义 ###############
class Foo:

    def func(self):
        pass

    # 定义属性
    @property
    def prop(self):
      """ 仅有一个参数self """
        pass
# ############### 调用 ###############
foo_obj = Foo()

foo_obj.func()
foo_obj.prop   
""" 调用时，无需括号 """
```

### 新式类-装饰器型属性

新式类有3种装饰器

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

obj.price          # 自动执行 @property 修饰的 price 方法，并获取方法的返回值

obj.price = 123    # 自动执行 @price.setter 修饰的 price 方法，并将  123 赋值给方法的参数

del obj.price      # 自动执行 @price.deleter 修饰的 price 方法
```

### 静态字段型属性

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


## 参考文献

http://python.jobbole.com/82023/  

http://python.jobbole.com/83747/
