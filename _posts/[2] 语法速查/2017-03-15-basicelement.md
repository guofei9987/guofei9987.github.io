---
layout: post
title: 【Python】基本数据类型.
categories:
tags: Python语法
keywords:
description:
---

## 数字类型  
- int
- long
- float
- bool
- complex

八进制前面加0
十六进制前面加0x
### 整数类型（没有取值范围的限制）
- pow(x,y)
- 0x或0X开头表示16进制
- 0b或0B开头表示2进制
- 0o或0O表示8进制

### 浮点类型
带小数点或小数的数字
- 精度有限制
float信息：
```python
import sys
sys.float_info
```
？？？ 不清楚具体的信息，搜一下
### 复数类型
虚数部分用j或J表示，例如：  
```python
12.3+4j,
z=1.23e-4+5.6e+89j
z.real   z.imag    
```
#### 整数->小数->复数
转化：
```python
- int()(直接去掉小数部分)
- float()（不能是复数）
- complex()
```
type(x) 返回类型


#### 运算符

```python
x+y x-y x*y x/y  
x//y  不大于x/y的最大整数（负数也是）  
x%y  余数  
abs(x)  绝对值
divmod(x,y) 实际是(x//y,x%y)
x**y   pow(x,y)
```







## 元组类型（tuple）

### 特点
- 元组中的元素可以是不同类型的
```python
t3=123,456,("hello","中国")
```
- tuple定义之后，其中的元素不能更改，也不能删除
- 如果tuple中有个list，这个list可以更改
### 生成
```python
x=(1,2,3)
x=1,2,3#不加括号也能生成tuple
x=1,#包含一个元素
```
### 方法
```python
x+y
3*x
x[::2]
```
### 特性：
```python
y=[5,6,7]
x=(1,2,y)
x[2][0]=1000
y[1]=800
```

## 列表（list）

### 方法(与string类似)

```python
x+y#连接起来
int*x #重复n次
len(x)
x[::2]
for i in x
exp in x#返回逻辑值，判断exp是否在x中
```

#### 用索引取数据
- 索引从0开始计数，
- -1是末尾，-2是倒数第二个
```
helloString='hello world'
helloString[1:3]
helloString[4:]%4到末尾
helloString[:-2]
helloString[::2]#按照步长取字符
helloString[::-1]
```

以下几个方法，直接改变list，而是不返回list
```
<list>.append(x)#把x作为一个元素放到<list>的末尾
<list>.sort()#排序
<lsit>.reverse()#元素反转
<list>.index(x)#返回第一次出现x的索引位置
<list>.insert(i,x)#在i位置插入x
<list>.count(x)#返回x在列表中的数量
<list>.remove(x)#删除list中第一次出现的元素x
<list>.pop(i)#返回list中第i个元素，并从list中删除
<list>.extend(c)#把c中的元素添加到list中，c是集合、list、tuple等
```

### enumerate迭代器
```python
String1 ='hello world'
for index,letter in enumerate(String1):
    print(index,letter)
for i in enumerate(String1)
    print(i)#i是tuple类型
```
此外，enumerate也可以用于list


## dict

- Python对存储顺序进行了优化
- list的key是数字，dict的key可以是任何类型的不可变对象（例如，数字、字符、元组）
- dict排列无序，list有序
- 值可以是任何类型
- 命名空间是通过字典来实现的

### 构造方法
```python
p={"key1":"value1","key2":"value2"}#构造方法1

#构造方法2：
d = dict()
d = dict(key1=value1, key2=value2)#key的名字不用试字符串
d = dict([('name','tom'), ('age',22)])#这种比较好

#构造方法3：
keys = ['name','age']
values = ['tom', 22]
d = dict(zip(keys,values))
```

### 修改

```python
d["key3"]=5#新增一对key-value，如果有key那么是修改
del(d["key3"])#删除一对key-value
```

### 遍历

```python
for key in my_dict:print(key)#key是str
for key in my_dict.keys():print(key)#key是str, my_dict.keys()是<dict_keys>类
for value in my_dict.values():print(value)#value是各自的类，my_dict.values是<dict_name>类
for k in my_dict.items():print(k)#k是tuple,里面放着一对key-value;my_dict.items()是<dict_items>类
for key,value in my_dict.items():print(key,value)
```
### 操作符
```
-
<
>
<=
>=
==
!=
and
or
not
```
### 方法
```
<dict>.keys()#返回所有key
<dict>.values()#返回所有value
<dict>.items()#返回key-value
<dict>.clear()#清除字典，返回none
<dict>.get(key)#key对应的value
<dict>.pop(key)#返回key对应的value，并从dict中删除
<dict>.update(<dict>)#返回none，两个dict加一起
```
### 取值


运算符
```python
取值：x['bill'];
求长度：len(x);
逻辑判断：'bill' in x;#返回ture
逻辑判断：'11' in x;#返回false
```

字典方法（在3.4和2.7版本中有所不同）
```python
item()# 转为dict_items
keys()#转为dict_keys
copy()#拷贝
```



## set

集合是可变的

### 构造


### 方法

```python
z1=x.intersection(y);#交
z2=y.union(x);#并
z3=y.difference(x);#差
```
或者：
```python
x&y#交
x|y#并
x-y#差
```

### 互转
x可以是tuple，list，set：
```
tuple(x)
list(x)
set(x)
```
