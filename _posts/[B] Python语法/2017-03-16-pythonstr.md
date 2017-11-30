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
'abc'.ljust(5) , 'abc'.rjust(5)  #填充空格使其达到指定长度


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
    print(i) #i是tuple类型
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
step1：编译一个可重用的regex对象
```py
import re
regex=re.compile('\s+')
```
step2：使用

```py
text='a\n b \t  c'
regex.split(text) #返回list

regex.findall(text) #返回list
regex.finditer(text)  #迭代器
```

### 正则表达式的写法
# 关于expression:
1.  句点符号  
 '.' ——匹配任意一个（只有一个）字符（包括空格）。

2. 方括号符号
 '[oum]' ——找到方括号中的任意一个即是匹配
^表示取反
c[aeiou]+t + 表示多次重复

3.  方括号中的连接符
 '[c1-c2]' ——匹配从字符c1开始到字符c2结束的字母序列（按字母表中的顺序）中的任意一个。

4. 转义符  
```
\n ——特殊字符，为了防止混淆
\.
\^
\xN或\x{N} 匹配八进制数值为N的字符
\oN或\o{N} 匹配十六进制数值为N的字符
\a Alarm(beep)
\b Backspace
\t 水平Tab
\n New line
\v 垂直Tab
\f 换页符
\r 回车符
\e Escape
\c 某些在正则表达式中有语法功能或特殊意义的字符c，要用\c来匹配，例如句号
```
5. 范围表达式
```
  \w,\s和\d——范围表达式

\w 相当于[a-zA-Z0-9_];
\W相当于[^a-zA-Z0-9_]；

\s 相当于[\t\f\n\r]；
\S相当于[^\t\f\n\r]；

\d 相当于[0-9]；
\D相当于[^0-9]。

\oN or \o{N}\  ASCII码表
\xN or \x{N}
```
6. 量词
```
(expr)*-----匹配任意多个(或0个)字符
(expr)?-----0或1次
(expr)+-----1次以上
(expr){m,n}-----m次以上，n次以下
(expr){m,}-------m次以上
(expr){n}---------n次
```
