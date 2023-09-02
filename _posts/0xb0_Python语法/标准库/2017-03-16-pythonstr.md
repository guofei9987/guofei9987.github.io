---
layout: post
title: 【string】字符串&正则
categories:
tags: 0xb0_Python语法
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
s1 = u'Hello, 你好！'  # unicode 编码。等价于u省略掉 s1 = 'Hello, 你好！'

s2 = r'hello\n你\好！'  # 斜杠 \ 不再是转义符，而是斜杠本身

s3 = b'Hello, \xe4\xbd\xa0\xe5\xa5\xbd\xef\xbc\x81'  # bytes 类型，显示出来时英文正常，中文变成 \x 开头.
s3.decode('utf-8')  # 转 str 类型
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

'123'.isdecimal() # 如果字符串只包含数字则返回 True 否则返回 False。有小数点也返回 False。有空格也返回False
'²'.isnumeric();'⅓'.isdigit()
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

### 字符串转 byte 类型（encode & decode）
```py
s = "中文字符串hello"  # 默认是 utf-8 格式
bs = s.encode(encoding="utf-8", errors='strict')  # utf-8 转为 byte 格式
bs.decode(encoding="utf-8", errors='strict')  # byte 格式 转为 utf-8


# encoding 可以是 "utf-8", "utf-16", "ascii", "ISO-8859-1" 等格式
# errors 默认是 'strict'，代表编码错误抛出错误。'replace' 代表错误的位置换成问号。'ignore' 代表错误的位置跳过去

# 返回byte 格式，print出来类似 b'\xe4\xbd\xa0\xe5\xa5\xbd\xe5\x90\x97\xef\xbc\x8c123 hello' 这样，这是utf-8的样子
# 假如是这样的 '%u8a84%u12bc' 这是 unicode 编码，每段4位16进制数对应ascii码，例如 chr(int('12cd', base=16))

# byte格式转16进制:
s_hex = bs.hex()

# byte转2进制
s_bin = bin(int(s_hex, 16))
```
- ascii码 7个二进制位
- Unicode 每个字符2个字节（4位16进制）
- UTF-8：可变长度的unicode，英文对应单字节，中文对应3字节

在计算机内存中，统一使用Unicode编码，当需要保存到硬盘或者需要传输的时候，就转换为UTF-8编码。


bytes 和 int 类型互相转换

```python
a = 255000
b = a.to_bytes(length=4, byteorder='big')
# length 指定输出为多少个字节
# byteorder 可以是 big 或者 small

int.from_bytes(b, byteorder='big')
```



### 转二进制、十六进制

```python
s = '这是一个字符串'

# 字符串转十六进制
s_hex = s.encode('utf-8').hex()
# >'e8bf99e698afe4b880e4b8aae5ad97e7aca6e4b8b2'
# 十六进制转字符串
bytes.fromhex(s_hex).decode('utf-8')
# >'这是一个字符串'

# 转2进制
s_bin = bin(int(s.encode('utf-8').hex(), base=16))[2:]
# 开头的0会被略去，某些其操作导致错位而出错，用这个补救：
s_bin = (8 - len(s_bin) % 8) * '0' + s_bin
s_out = bytes.fromhex(hex(int(s_bin, base=2))[2:]).decode('utf-8', errors='replace')
```



都需要先把字符串转成 `bytes` 类型，然后转二进制或者转回来

字符串列表转n进制：  
字符--`ord`-->10进制整型--`bin/hex`-->2/10进制文本


```python
s = '这是一个字符串'

# 字符串转10进制列表
s_dec = [ord(c) for c in s]

# 字符串转2进制列表(不带 0x )
s_bin = [bin(ord(c))[2:] for c in s]  # 字符串转二进制

# 字符串转16进制列表
[hex(ord(c)) for c in s]
```



**用 for 循环，原理清晰**

不推荐(不encode的话，遍历的是字符，汉字对应3个字节)
```python
s = '你tst1'
# 字符串转10进制列表
s_dec = [ord(c) for c in s]
# 字符串转16进制列表
[hex(ord(c)) for c in s]
# 字符串转2进制列表(不带 0x )
s_bin = [bin(ord(c))[2:] for c in s]  # 字符串转二进制，!开头的0会被忽略
```


2:所以一定要encode
```python
list(s.encode('utf-8'))  # [228, 189, 160, 116, 115, 116, 49]

[bin(i) for i in s.encode('utf-8')]  # 得到二进制list，但是长短不齐，['0b11100100', '0b1101']
[format(i, 'b') for i in s.encode('utf-8')]  # 同上 ['11100100', '1101']

s_bin = [format(i, '08b') for i in s.encode('utf-8')]  # 8位2进制格式
s_out = b''.join([struct.pack('>B', int(i, base=2)) for i in s_bin])

s_bin = ''.join(s_bin)
s_out = b''.join([struct.pack('>B', int(s_bin[i * 8:i * 8 + 8], base=2)) for i in range(len(s_bin) // 8)])


# %% 或者不用struct，而是用bytes

a = [int(i, base=2) for i in s_bin]

bytearray(a).decode('utf-8')  # bytearray 是可变类型
bytes(a).decode('utf-8')  # 是不可变类型
```



3借助numpy

```python
import struct
import numpy as np

s = '你tst1'

# 转二进制
seq = np.array(list(s.encode('utf-8')), dtype=np.uint8)
content_bits = np.unpackbits(seq)
# 或者：np.unpackbits(np.frombuffer(s.encode('utf=8'), dtype='>B'))

# 二进制转字符串
nums = np.packbits(content_bits)
content_decode = b''.join([struct.pack('>B', n) for n in nums])

content_decode.decode('utf-8')
```



### 字符串压缩

压缩+转十六进制
```python
import zlib
import sys

s = '''
zlib.compress 可以压缩字符串。
它输入 byte 类型，输出也是 byte 类型。

有些系统（例如某些数据库） 不支持 byte 类型，所以往往把压缩后的  byte 类型转为十六进制；
后果是有可能转为十六进制后的文本反而变大。

zlib 对于有很多重复/空格的字符串效果很好，例如：
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
'''

# 压缩
zlib_str = zlib.compress(s.encode('utf-8'))
# 转回
s_new = zlib.decompress(zlib_str).decode('utf-8')

# 压缩 + 转16进制
hex_str = zlib.compress(s.encode('utf-8')).hex()
# 转回
s_new2 = zlib.decompress(bytes.fromhex(hex_str)).decode('utf-8')

print("原始字符串大小 = ", sys.getsizeof(s))
print("压缩后的字符串大小 = ", sys.getsizeof(zlib_str))
print("压缩+转十六进制后的大小 = ", sys.getsizeof(hex_str))
```

>原始字符串大小 =  1042  
压缩后的字符串大小 =  320  
压缩+转十六进制后的大小 =  623

### 判断编码类型

```python
# !pip install chardet
import chardet
chardet.detect(b'\xc8\xcb\xc9\xfa\xbf\xe0\xb6\xcc\xa3\xac\xce\xd2\xd3\xc3Python')
# {'encoding': 'GB2312', 'confidence': 0.99, 'language': 'Chinese'}
```

## enumerate迭代器
```python
str1 ='hello world'
for index,letter in enumerate(str1):
    print(index,letter)
for i in enumerate(str1)
    print(i) #i是tuple类型

# 1. 可用于可迭代对象
# 2. enumerate(str1, start=2) 可以指定从第几个开始
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

regex.findall(text) # 返回 list，等价于 [m.groups() for m in regex1.finditer(text)]
regex.finditer(text) # 迭代器,存放的是 <SRE_Match object>
m = regex.match(text) # 从起始位置匹配，匹配成功返回 返回<SRE_Match object>，如果匹配不成功，返回None
m = regex.fullmatch(text) # 整文匹配，匹配成功返回 返回<SRE_Match object>，如果匹配不成功，返回None
m = regex.search(text) # 扫描并返回第一个成功的匹配，返回同上

regex.sub(replace_char, sentence, count=2) # 把 sentence 前2个符合的语句，替换成replace_char
regex.subn(replace_char, sentence, count=2) # 返回2个元素的元组：tuple(替换后的字符串, 实际替换了几个)

# sub 可以后接 lambda
regex = re.compile('[0-9]+')
regex.sub(lambda m: str(int(m.group(0))+1), '12ab21a12', 6)
# 这里的 m 是 regex.match 的返回值
```

step3：使用'SRE_Match'对象


```py
m.start() # 返回起始位置
m.end() # 返回结束位置(不包含该位置的字符).

m.span() # 相当于 tuple(m.start(), m.end())



m.group() # 返回匹配的完整字符串。
# 可以接收多个参数，⽤用于返回指定序号的分组。例如 m.group(1) 返回第1各 ,m.group(0,2) 返回 0，2 这两个。
groups() # 只获取组内的信息，必须分组运算符
# (另外一提，findall 配合分组运算符的时候，也是只返回分组内的内容)

# 例子：
regex1 = re.compile('(?:hello)(\d+)world(\d+)')
m1 = regex1.search('hello123world4')

# 返回整体匹配，包括：加括号部分+不加括号的部分+不捕获
print(m1.group())  # 等价于 m1.group(0)
# 返回：hello123world4

# 返回第i个分组（i>=1）
print(m1.group(1))
# 返回：123

# 返回所有的分组
print(m1.groups())  # 返回：('123', '4')


m1.groupdict() # 返回命名分组信息
```

### 分组运算符

基础用法
```python

regex = re.compile('(\w+) had a ((\w+) \w+)')
text = 'I had a nice day，I had a nice day'
regex.findall(text)
# [('I', 'nice day', 'nice'), ('I', 'nice day', 'nice')]
# 每个括号里面都匹配出来。整体没加括号，所以不匹配

[m.group(0) for m in regex.finditer(text)]
# 等价于 [m.group() for m in regex.finditer(text)]
# ['I had a nice day', 'I had a nice day']
# 0 指的是把整体匹配出来

# 分别把括号里面的内容匹配出来
[m.group(1) for m in regex.finditer(text)]
# ['I', 'I']
[m.group(2) for m in regex.finditer(text)]
# ['nice day', 'nice day']
[m.group(3) for m in regex.finditer(text)]
# ['nice', 'nice']


[m.groups() for m in regex.finditer(text)]
# 与 group 的区别
# 括号里面的全部匹配出来，而不是
# [('I', 'nice day', 'nice'), ('I', 'nice day', 'nice')]
```


分组替换
```python
# 可以用 \+数字来指定序号，序号从1开始
regex1 = re.compile(r'I have a (\w+) and a (\w+)')
replace_str = r'There is \2 and \1, Good!'
sentence = 'I have a book and a pen. You May use those.'
regex1.sub(replace_str, sentence)
# 上面的语句返回 'There is pen and book, Good!. You May use those.'
# 解释：
# step1：按照正则，从 sentence 中提取 1: book, 2: pen
# step2：分别填入 replace_str 中的 \2 \1


# 一个sub的实用案例：
regex1 = re.compile(r'min=(\w{2}), hour=(\w{2})')
regex1.sub(r'\2:\1', 'Now time is min=15, hour=20')
# 返回：'Now time is 20:15'
```


分组的引用：在同一个正则里面，引用其它分组
```python
# 可以用 \+数字来指定序号，序号从1开始
regex1 = re.compile(r'(\w+) is (\1)')
regex1.findall('one is one, two is two, one is two')

[m.group(0) for m in regex1.finditer('one is one, two is two, one is two')]
# ['one is one', 'two is two']
# 意味着 one is two 不会被匹配出来


# 另外，分组引用符也可以外加括号变成分组：
#
re.compile(r'(\w+) is (\1)')
```

### 正则表达式的写法

1.  范围表达式
```python
'[oum]'  # 找到方括号中的任意一个即是匹配  
'[^oum]' # ^表示对整个中括号取反，这个例子表示除了 o, u, m 之外的所有字符  
'[c1-c2]' # 匹配从字符c1开始到字符c2结束的字母序列（按字母表中的顺序）中的任意一个。 例如，[a-zA-Z]表示英文字母，[0-9]表示任意数字  
'\w' # 相当于[a-zA-Z0-9_]
'\W' # 相当于[^a-zA-Z0-9_]
'\s' # 相当于[\t\f\n\r]
'\S' # 相当于[^\t\f\n\r]
'\d' # 相当于[0-9]
'\D' # 相当于[^0-9]
'.' # 匹配任意字符，包括空格，但不能匹配 \n
'[\u4e00-\u9fa5]' # 全部中文
'[\uFF00-\uFFFF]' # 全角符号（包括全角字母数字）
'[\u0000-\u00FF]' # 半角符号
'[\w@\.\s]' # 可以混合使用，此案例下， \w, \s, @,. 这4种混合都可以匹配到。注意：点是特殊字符，需要转义
```
2. 量词  
```python
(expr)* # 匹配任意多个(或0个)字符
(expr)? # 0或1次
(expr)+ # 1次以上
(expr){m,n} # m次以上，n次以下（含m, n）。例如ab{1,3}c,可以匹配abc,abbc,abbbc
(expr){m,} # m次以上
(expr){n} # n次
```
3. 转义符  
```python
'[?*+()]' # 如果出现在中括号中，加不加转义符号都可以，这个例子就是匹配问号、星号、加号、括号
'\$' # 转义前用来匹配 \n,\r 换行标志
'\(\)' # 转义前标记子表达式的开始和结束位置
'\[\]' # 转义前标记中括号表达式
'\* \+ \?' # 转义前是数量表达式
'\.' # 转义前是匹配\n之外的任意单字符
'\\\\' # 转义前是转义符号，注意需要4条斜杠
'\^'
'\|' # 转义前代表或者
'\n' ——特殊字符，为了防止混淆
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
2. 特殊的
```python
'\oN' or '\o{N}\' # ASCII码表
'\xN' or '\x{N}' # 匹配八进制数值为N的字符
'\oN' or '\o{N}' # 匹配十六进制数值为N的字符
'[。；，：“”（）、？《》]' # 一些中文标点
```
7. **?** 比较`(X)`和`(?:X)`，前者是捕获分组，后者不捕获，在 groups 中有体现。
```python
re.search('(?:a)(b)(c)', "abcdef").groups() # 返回捕获的 ('b', 'c')
re.search('(a)(b)(c)', "abcdef").groups() # 返回捕获的  ('a', 'b', 'c')
# 扩展阅读：
'(?<name>exp)' # 捕获的分组命名为 name
'(?#这是一段注释)' # 不起任何作用
'exp1(?=exp2)' # 前瞻：捕获exp2前面的exp1
'(?<=exp2)exp1' # 后顾：捕获exp2后面的exp1
'exp1(?!exp2)' # 负前瞻：捕获后面不是exp2的exp1
'(?<!exp2)exp1' # 负后顾：捕获前面不是exp2的exp1
re.search('(a)(?=b)', "abcdef").groups() # 返回  ('a',)
re.search('(?<=a)(b)', "abcdef").groups() # 返回 ('b',)
re.search('(\d+)(?!bc)', '0bc3bb').groups() # 返回 ('3',)，而不匹配 0
re.search('(?<!0)([a-zA-Z]+)', '0bc3bb').groups() # 返回 ('c',)。解释：第一个符合的序列是 'bc'，捕获c
```
8. 懒惰匹配：默认会做最长匹配，如果末尾加上 `?` 做最短匹配
```python
'".*?"' # 这个匹配 '"3"45"' 会得到 '"3"'，而'".*"'会得到 '"3"45"'
'\d{4,5}?' # 等价于 '\d{4}'
```
9. 选择匹配
```python
red|blue|以及red||blue以及|red|blue都表示匹配red或者blue或者一个空字符串
a|b|c与[abc]相同
```
10. 特殊位置符号。
```python
# 1. 单词分隔符`\b`
# 是“想象中的”一个长度为0的空字符串。单词之间、单词与非单词之间都有单词分隔符、首位也有单词分隔符：
# 算的：空格和大部分标点符号。但下划线不算
# 不算的：紧挨着的字母、数字、汉字。
'\b'  # 匹配 'hello' # 得到 2 个空字符串，匹配 'he()llo' 得到4各空字符串
'\b\w{3}\b' # 可以匹配长度为3的单词。
# 2. 位置符号 '^' 表示字符串的开头，'$'表示字符串的末尾
'^as' # 表示匹配开头的 as，例如 'asas' 自会匹配到第一个as。另外，如果开头是 \n，就不认了。
'as$' # 同样道理，匹配末尾的 as。不同的是，允许末尾有一个 \n。
'^$' # 因此这个表示空行
```



### 正则案例

- 非零开头的最多带两位小数的数字 `'[1-9][0-9]*(.[0-9]{1,2})+'`
- 正数、负数、和小数：`'(\-|\+)?\d+(\.\d+)?'`
- Email：`'\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*'`
- 手机号码：`'(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}'`






一个高难度例子：递归匹配（见下面的链接）


## 参考文献

- https://docs.python.org/3/
- [50分钟正则](https://github.com/EZLippi/practical-programming-books/blob/master/src/30-minutes-to-learn-regex.md)
- [30分组正则](https://deerchao.cn/tutorials/regex/regex.htm)
