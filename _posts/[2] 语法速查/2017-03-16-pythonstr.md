---
layout: post
title: 【Python】【str】字符串.
categories:
tags: Python语法
keywords:
description:
---




## 转义字符

```python
print("\"大家好\"")
#\\表示一个斜杠\
#\n表示换行
```

引号可以嵌套
```python
c2 = 'It is a "dog"!'
c2= "It's a dog!"
```

三引号：
```python
c1="""he
she
my
you are
hello"""
```

字符串前面加r，使转移符\ 失效
```python
r"hello boy\nhello boy"
```

## 索引
```
x="hello"
x[-1]
x[::-2]
```
## +与*
- 加法操作连接字符串
- 乘法操作重复连接字符串


## 字符串方法

```python
len('abc')

'aaabc'.count('aa')
'aaabc'.endswith('bc'),'aaabc'.startswith('bc')  #bool类型,是否以指定字符串开头/结尾
'aaabc'.index('bc')  #找到则返回序号，找不到则引发ValueError
'aaabc'.find('bc')  #找到则返回序号，找不到则返回-1
'aaabc'.replace('bc','x')  #替换指定字符
'aaabc'.upper(),'aaabC'.lower()  #转大写/转小写
'aaabc'.capitalize()  #首字母大写

','.join(list('abc'))
'a,b,c'.split(',')
'  \n a,b, c '.strip()   #去两边的空格与换行,strip,lstrip,rstrip
'abc'.ljust(5) , 'abc'.rjust(5)#填充空格


for <var> in <string>

len()  返回字符串的长度
str()  返回数字对应的字符串

```

## format()方法

```python
x="{1}{2}:计算机的CPU占用了{0}%。"
print(x.format(10,"2016-12-31","python"))
```
注1：{}中的数字代表序号，序号可以省略
注2：用两个大括号来print大括号  
注3：槽的高级使用方式： <序号>：<填充><对齐><宽度>，<精度><类型>
- <填充>:用于填充的字符
- <对齐>：<左对齐,>右对齐, ^居中对齐
- <宽度>：数字，实际值宽度不够则填充，实际值宽度太宽则用实际的
- ，：千分位的都好
- <精度>：浮点小数部分的精度，字符串最大输出长度
- <类型>:整数类型b,c,d,o,x,X 浮点类型e,E,f,%
1. b:二进制，c:整数对应的unicode字符，d:整数十进制，o八进制，x小写十六进制，X大写十六进制
2. e:小写的科学计数法，E:大写科学计数法，f浮点形式，%浮点数的百分形式




几个案例：
```py
string.upper().find("HI")
string.split()#按空格分割,返回<list>
string.split("a")#按a分割,返回<list>
string.replace("o","a")#把string中的o替换成a
```

## enumerate迭代器
```python
String1 ='hello world'
for index,letter in enumerate(String1):
    print(index,letter)
for i in enumerate(String1)
    print(i)#i是tuple类型
```
此外，enumerate也可以用于list

## string模块
```python
import string  #string模块，处理字符比较方便
string.punctuation
string.digits
string.whitespace
```

返回的是：
```
'!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'
'0123456789'
' \t\n\r\x0b\x0c'
```

## regex正则表达式

```py
import re
regex=re.compile('\s+')
```
