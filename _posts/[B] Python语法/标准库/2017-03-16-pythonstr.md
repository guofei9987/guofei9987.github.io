---
layout: post
title: 【string】字符串&正则
categories:
tags: Python语法
keywords:
description:
order: 1203
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
'aaabc'.find('bc')  #找到则返回第一个的序号，找不到则返回-1，'aaabc'.find('a',1)数字表示从第几个开始找
'aaabc'.replace('bc','x')  #替换指定字符

'aaabc'.upper(),'aaabC'.lower()  #转大写/转小写
a.swapcase() # 返回一个字符串，大写转为小写，同时小写转为大写
'aaabc'.capitalize()  # 返回首字母大写的字符串

','.join(list('abc'))  #前面的字符也可以为空，这时相当于对字符串做加号
'a,b,c'.split(',')    #按','分割，并返回<list>。如果后面的参数为空，按照空格分割

'  \n a,b, c '.strip()   #去两边的空格与换行,strip,lstrip,rstrip
'abc! '.strip('a') #去掉指定字符

'abc'.ljust(5) , 'abc'.rjust(5) ,'abc'.center(10)  # 填充空格使其达到指定长度
'123'.isdecimal(); '123'.isnumeric();'123'.isdigit()
'ab'.islower();'ab'.isupper()

for <var> in <string>

len()  返回字符串的长度
str()  返回数字对应的字符串

```

### string内容判断
```python
isprintable # 含\t,\n 时为 False，否则为 True. 另外空格是 True
isspace # 纯\t,\n,空格，或者他们的组合，为 True. 如果混进了字母等，就是 False
islower, isupper # 先剔除\t,\n,空格,数字，然后如果全是小写/大写，返回True。如果剔除空格后没了，返回False
istitle # 先用\t,\n,空格,标点分割，剔除数字，得到单词。如果每个单词的首字母为大写，并且其余字母为小写，则返回True

isidentifier # 是否可以作为Python的变量名，不多说

isalpha # 全字母返回True。如果出现标点、数字、空格，都返回False。另外，中文返回True

isalnum # 如果 string 至少有一个字符并且所有字符都是字母或数字则返回 True,否则返回 False.如果出现标点、空格等，都返回 False


isdigit # 如果字符串只包含数字则返回 True 否则返回 False。有小数点也返回 False。有空格也返回False
isnumeric # 似乎同上
```


## 格式化方法
### format()方法

```python
'进程{1}占用了CPU {0} 秒。'.format(0.05,10)
```
槽的高级使用方式： <序号>：<填充><对齐><宽度> <精度><类型>
- 关于序号
```python
# 可以指定名字
'进程{thread}占用了CPU {time} 秒。'.format(thread=0.05,time=10)
# 可以用序号
'进程{1}占用了CPU {0} 秒。'.format(0.05,10)
# 可以用字典
'进程{thread}占用了CPU {time} 秒。'.format(**{'thread':10,'time':0.05})
# 可以用list
'进程{0[0]}占用了CPU {0[1]} 秒。'.format([10,0.05])
```
- 填充
  - <填充>:用于填充的字符，省略代表填充空格
  - <对齐>：<左对齐,>右对齐, ^居中对齐
  - <宽度>：数字，实际值宽度不够则填充，实际值宽度太宽则用实际的
- 精度1:，：千分位的逗号，`{:,}` 以逗号分割的数字个数
- 精度2:数字+字母
  - <精度>：浮点小数部分的精度，字符串最大输出长度
  - <类型>:整数类型b,c,d,o,x,X 浮点类型e,E,f,%
  - `{:.2f}`  浮点
  - `{:+.2f}` 带符号浮点
  - `{:.0f}` 取整
  - 或者百分比 `'{:.2%}'.format(0.3)`
  - 或者科学计数法 `'{:.2e},{:.2E}'.format(3,30)` （两个区别是E大写或小写）
  - 或者进制转换
  ```python
  '{:b},{:d},{:o},{:x},{:#x},{:#X}'.format(*([11]*6))
  # >> '1011,11,13,b,0xb,0XB'
  # 分别是二进制、十进制、八进制、十六进制
  ```
  - 或者ascii码 `'{:c}'.format(65)` 返回 `A`



### %
```py
"%(date)s %(name)s:计算机的CPU占用了%(data)s 。"%{'data':'10','date':"2016-12-31",'name':"python"}
```


几个案例：
```py
string.upper().find("HI")
string.split()#按空格分割,返回<list>
string.split("a")#按a分割,返回<list>
string.replace("o","a")#把string中的o替换成a
```

### join
```py
','.join(list('abc'))
```





## 编码问题
```py
str(1)#数字转字符
int('1')#字符转数字
int('51',base=14)#指定进制字符转十进制
ord("A")#字符转ascii码
chr(97)#ascii码转字符
```

### encode & decode
```py
s="中文字符串" # Python3 默认的字符串是 utf-8 格式
bs=s.encode("utf-8") # utf-8 转为 byte 格式
bs.decode("utf-8") # byte 格式 转为 utf-8

# 除此之外，还有 "utf-8", "utf-16", "ascii", "ISO-8859-1" 等格式
# byte 格式，print出来类似 b'\xe4\xbd\xa0\xe5\xa5\xbd\xe5\x90\x97\xef\xbc\x8c123 hello' 这样，这是utf-8的样子
# 假如是这样的 '%u8a84%u12bc' 这是 unicode 编码，每段4位16进制数对应ascii码，例如 chr(int('12cd', base=16))
```
- ascii码 7个二进制位
- Unicode 每个字符2个字节（4位16进制）
- UTF-8：可变长度的unicode，英文对应单字节，中文对应3字节

在计算机内存中，统一使用Unicode编码，当需要保存到硬盘或者需要传输的时候，就转换为UTF-8编码。

### 转二进制

```python
s = '这是一个字符串'
s_bin = [bin(ord(c))[2:] for c in s]  # 字符串转二进制
[chr(int(b, 2)) for b in s_bin]  # 转回来
```

压缩+转十六进制
```python
encrypt_str = zlib.compress(ori_str.encode('utf-8')).hex() # 压缩+转16进制
zlib.decompress(bytes.fromhex(''.join(encrypt_split))).decode('utf-8') # 16进制转字符串+解压缩
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
regex=re.compile('\s+') # 返回一个regex对象
```
step2：使用regex对象

```py
text='a\n b \t  c'
regex.split(text) # 返回list，regex是 split 的间隔，regex对应的内容以空字符串 '' 的形式也放在 list 中

regex.findall(text) # 返回 list
regex.finditer(text) # 迭代器,存放的是 <SRE_Match object>
m = regex.match(text) # 从起始位置匹配，匹配成功返回 返回<SRE_Match object>，如果匹配不成功，返回None
regex.fullmatch(text) # 精确全文匹配，匹配成功返回 返回<SRE_Match object>，如果匹配不成功，返回None
m = regex.search(text) # 扫描并返回第一个成功的匹配，返回同上

regex.sub(replace_char, sentence, count=2) # 把 sentence 前2个符合的语句，替换成replace_char
regex.subn(replace_char, sentence, count=2) # 返回2个元素的元组：tuple(替换后的字符串, 实际替换了几个)

# sub 可以后接 lambda
regex = re.compile('[0-9]+')
regex.sub(lambda m: str(int(m.group(0))+1), '12ab21a12', 6)
# 这里的 m 是 regex.match 的返回值
```

step3：使用'SRE_Match'对象


### 正则表达式的写法
```py
m.start() # 返回起始位置
m.end() # 返回结束位置(不包含该位置的字符).

m.span() # 相当于 tuple(m.start(), m.end())



m.group() # 返回匹配的完整字符串。可以接收多个参数，⽤用于返回指定序号的分组。例如 m.group(1),m.group(0,2)
# start,end,span 都可以接受参数，意义同上


groups() # 只获取组内的信息，需要配合正则表达式有括号。例子：
regex1 = re.compile('(\d+)\w*(\d+)')
m1 = regex1.search('123asda1234')
print(m1.group())  # 返回：123asda1234
print(m1.groups())  # 返回：('123', '4')


groupdict() # 返回命名分组信息
```


1.  句点符号：通配符
```
'.' # 如果句号没在[]中出现，表示匹配任意一个（只有一个）字符（包括空格，但除去换行符）。
```
2. 方括号符号
```  
 '[oum]' ——找到方括号中的任意一个即是匹配  
^表示取反，例如[^abc]表示除了a,b,c之外的所有字符  
+ 表示多次重复c[aeiou]+t  
```
3.  范围表达式
```python
'[c1-c2]' # 匹配从字符c1开始到字符c2结束的字母序列（按字母表中的顺序）中的任意一个。 例如，[a-zA-Z]表示英文字母，[0-9]表示任意数字  
'\w' # 相当于[a-zA-Z0-9_]
'\W' # 相当于[^a-zA-Z0-9_]
'\s' # 相当于[\t\f\n\r]
'\S' # 相当于[^\t\f\n\r]
'\d' # 相当于[0-9]
'\D' # 相当于[^0-9]
'.' # 匹配任意字符，不能匹配 \n
'[\w@\.\s]' # 可以混合使用，此案例下， \w, \s, @,. 这4种混合都可以匹配到。注意：点是特殊字符，需要转义
```
4. 转义符  
```python
'[?*+]' # 如果出现在中括号中，加不加转义符号都可以，这个例子就是匹配问号、星号、加号
'\$' # 转义前用来匹配 \n,\r 换行标志
'\(\)' # 转义前标记子表达式的开始和结束位置
'\[\]' # 转义前标记中括号表达式
'\* \+ \?' # 转义前是数量表达式
'\.' # 转义前是匹配\n之外的任意单字符
'\\\\' # 转义前是转义符号，注意需要4条斜杠
'\^'
'\|' # 转义前代表或者
'\n' ——特殊字符，为了防止混淆
'\xN或\x{N}' 匹配八进制数值为N的字符
'\oN或\o{N}' 匹配十六进制数值为N的字符
'\a' Alarm(beep)
'\b' Backspace
'\t' 水平Tab
'\n' New line
'\v' 垂直Tab
'\f' 换页符
'\r' 回车符
'\e' Escape
'\c' 某些在正则表达式中有语法功能或特殊意义的字符c，例如句号
```
5. 范围表达式  
```
\oN or \o{N}\  ASCII码表
\xN or \x{N}
'[\u4e00-\u9fa5]' # 全部中文
'[。；，：“”（）、？《》]' # 中文标点
```
6. 量词  
```python
(expr)* # 匹配任意多个(或0个)字符
(expr)? # 0或1次
(expr)+ # 1次以上
(expr){m,n} # m次以上，n次以下（含m, n）。例如ab{1,3}c,可以匹配abc,abbc,abbbc
(expr){m,} # m次以上
(expr){n} # n次
```
6. **?** 比较`(X)`和`(?:X)`，前者是捕获分组，后者不捕获，在 groups 中有体现。
```python
re.search('(?:a)(b)(c)', "abcdef").groups() # 返回捕获的 ('b', 'c')
re.search('(a)(b)(c)', "abcdef").groups() # 返回捕获的  ('a', 'b', 'c')
# 扩展阅读：
'exp1(?=exp2)' # 前瞻：捕获exp2前面的exp1
'(?<=exp2)exp1' # 后顾：捕获exp2后面的exp1
'exp1(?!exp2)' # 负前瞻：捕获后面不是exp2的exp1
'(?<!exp2)exp1' # 负后顾：捕获前面不是exp2的exp1
re.search('(a)(?=b)', "abcdef").groups() # 返回  ('a',)
re.search('(?<=a)(b)', "abcdef").groups() # 返回 ('b',)
re.search('(\d+)(?!bc)', '0bc3bb').groups() # 返回 ('3',)，而不匹配 0
re.search('(?<!0)([a-zA-Z]+)', '0bc3bb').groups() # 返回 ('c',)。解释：第一个符合的序列是 'bc'，捕获c
```



## 参考文献
https://docs.python.org/3/
