---
layout: post
title: 【Python】基本数据类型
categories:
tags: Python语法
keywords:
description:
order: 1201
---

## 数字类型  
- int
- long
- float
- bool
- complex


### 整数类型
整数类型没有取值范围的限制
- pow(x,y)
- 0x或0X开头表示16进制
- 0b或0B开头表示2进制
- 0o或0O表示8进制


```py
str(1) #数字转字符
int('1') #字符转数字 int
float(x) #转换成一个浮点数
complex(x) #转换成复数
```

进制转换
```py
int('51',base=14) #把base进制表示字符串，转为十进制
bin(x)   #把整数x变成二进制的字符串
oct(x)   #把整数x变成八进制表示的字符串
hex(x)   #把整数x变成十六进制表示的字符串
ord("A") #字符转ascii码
chr(97)  #ascii码转字符
```

四舍五入
```py
round(x) # 返回 int
round(x,0) #截取相应的位数，返回float
math.trunc#  向0取整
math.ceil
math.floor
```


### 浮点类型
带小数点或小数的数字
- 精度有限制
float信息：
```python
import sys
sys.float_info
```

### 复数类型
虚数部分用j或J表示，例如：  
```python
12.3+4j,
z=1.23e-4+5.6e+89j
z.real   z.imag    
```


转化：
```python
int(a) # 直接去掉小数部分
float(a) # a不能是复数
complex(a)
```
type(x) 返回类型

## tuple

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
x=1,2,3 # 不加括号也能生成 tuple
x=1, # 包含一个元素的 tuple
```
### 方法
```python
x+y
3*x
x[::2]
```
### 特性
```python
y=[5,6,7]
x=(1,2,y)
x[2][0]=1000
y[1]=800
```

## list

### 方法
(与string类似)

```python
x+y#连接起来
int*x #重复n次
len(x)
x[::2]
for i in x
exp in x#返回逻辑值，判断exp是否在x中

# 取出 list 中的元素
lst = [1, 2, 3, 4, 5]
a, *b, c = lst
*a, b = lst
a, *b = lst
```

### 切片
- 索引从0开始计数，
- -1是末尾，-2是倒数第二个
```py
helloString='hello world'
helloString[1:3]
helloString[4:] # 4到末尾
helloString[:-2]
helloString[::2] # 按照步长取字符
helloString[::-1]
```

以下几个方法，直接改变list，而是不返回list
```py
<list>.append(x)   # 把x作为一个元素放到<list>的末尾
<list>.extend(c)   # 把c中的元素添加到list中，c是集合、list、tuple等
<list>.insert(i,x) # 在i位置插入x

del x[1]           # 直接删除
del x[::-2]
<list>.remove(x)  # 删除list中第一次出现的元素x，如果没找到会抛出异常
<list>.pop(i)     # 返回list中第i个元素，并从list中删除，如果不给参数，指的是最后一个


<list>.sort()     # 排序，返回none
#b=['123','2','33']
#b.sort(key=int,reverse=False)

<list>.reverse()  # 元素反转,返回none
<list>.index(x)   # 返回第一次出现x的索引位置
<list>.count(x)   # 返回x在列表中的数量
```

### enumerate迭代器
```python
String1 ='hello world'
for index,letter in enumerate(String1):
    print(index,letter)
for i in enumerate(String1)
    print(i) # i是tuple类型
```
此外，enumerate也可以用于list

### zip/unzip


```py
a=[1,2,3]
b=list('abc')
list(zip(a,b))
dict(zip(a,b))
# a, b的长度可以不一样，这样就是取最短的
```


unzip:  
```py
a=[(1, 'a'), (2, 'b'), (3, 'c')]
list(zip(*a))
```






### range
```py
range(start, stop, step)
```
## dict

- Python对存储顺序进行了优化
- list的key是数字，dict的key可以是任何类型的不可变对象（例如，数字、字符、元组）
- dict排列无序，list有序
- 值可以是任何类型
- 命名空间是通过字典来实现的

### 创建
```python
# 构造方法1:
d={"key1":"value1","key2":"value2"}

# 构造方法2：
d = dict()
d = dict(key1=value1, key2=value2) # key的名字不用是字符串
d = dict([('name','tom'), ('age',22)])

# 构造方法3：
keys = ['name','age']
values = ['tom', 22]
d = dict(zip(keys,values))
```

### 修改

```python
d["key3"] = 5 # 新增一对key-value，如果有key那么是修改
d.update(<dict>) # 新增key-value，如果key已经存在则修改

del(d["key3"]) # 删除一对key-value
d.clear() #清空dict
d.pop('key1') # 返回key1对应的value，并且从d中删除key1。不存在则报错
d.pop('key1','not exist') # 不存在则返回'not exist', 而不是报错

d.popitem() # 返回一对 key-value，并将其从字典移除

d.clear() # 清除字典，返回 None


```

### 遍历

```python
for key in my_dict:print(key) #key是str
for key in my_dict.keys():print(key) #key是str, my_dict.keys()是<dict_keys>类
for value in my_dict.values():print(value) #value是各自的类，my_dict.values是<dict_name>类
for k in my_dict.items():print(k) #k是tuple,里面放着一对key-value;my_dict.items()是<dict_items>类
for key,value in my_dict.items():print(key,value)
```

### 查询
```py
<dict>.keys() # 返回所有key
<dict>.values() # 返回所有value
<dict>.items() # 返回key-value
<dict>.get(key) # key对应的value，不存在返回 None，而不是报错
<dict>.get(key,val) # 不存在则返回 val，而不是报错
```


### 取值

```python
x['bill'] # 取值
len(x); # 求长度
'bill' in x; #返回 Ture or False

dict1= sorted(word_dict.items(), key=lambda d:d[1], reverse = True)
```


## set

集合是可变的

### 集合运算

```python
z1=x.intersection(y) # 交
z2=y.union(x) # 并
z3=y.difference(x) # 差

a.issebset(b) # a是否是b的子集
a.issuperset(b)

a.isdisjoint(b) # 是否有交集
```
或者：
```python
a & b  # 交
a | b  # 并
a - b  # 差
a ^ b  # 补 =x|y-x&y

a == b  # 相等
a > b  # 真超集
a >= b  # 超集
a < b  # 真子集
a <= b  # 真超集
```

此外，还支持update类操作，例如：
```python
a -= b
a ^= b
```


### 方法

```py
a.add(9) # 添加一个元素
a.update([1,2,3,4]) #把iterable object中的元素作为元素

a.remove(4) #删除一个元素，不存在则报错
```
## 互转
x可以是tuple，list，set：
```py
tuple(x)
list(x)
set(x)
```

## 关于引用

一些“特性”

### 1
```py
sum([0.1 for i in range(10)])==1
```

out:False

### 2效率
与set/dict相比，list擅长内存使用和迭代，不擅长成员检测$(\Theta (lg n))$   
list:指定位置修改是$\Theta(1)$   
链表：指定位置修改$\Theta(n)$,因为需要遍历，平均遍历半个数据量  
list：交换操作是$\Theta(1)$（知道两个元素位置的话）
list：插入和删除$\Theta(n)$     
链表：插入和删除$\Theta(1)$



### 3递归引用

```py
p = [1, 2, 3]  
p.append(p)
p in p
```

结果是 True

### 4循环引用

```py
a = [1, 2]
b = [3, 4]  
a.append(b)  
b.append(a)  
a in b,b in a
```

结果是(True, True)

### 5
```py
a = [1,2,3]
b = a[:]
c=a
del a
```
b的值是什么。为什么呢？


## 参考文献
https://docs.python.org/3/
