---
layout: post
title: 【Python】magic黑魔法
categories: 刷题
tags:
description:
order: 1301
---

## 二进制相关

基础的：
- 0/1取反 `~x`
- 超过8位的置0 `x & 0x1ff`
- `x & (−x) = x & (~x + 1)`，保留最低的1，其余位置置0。这是因为负号以补码的形式存储
- `digit = bin(x).count("0") - 1` ???用来计算最低位的1在第几位
- `x & (x - 1) = x ^ (x & (-x))` 可以把最右边的1变成0，可以以此来枚举下一个 1
    - 用途1：判断n是否是2的某个次幂。如果是，那么二进制只有一个1，因此只需要看 `n & (n-1)` 是否为0
    - 用途2：判断n对应的二进制有几个1。只需要一个wihle循环做 `n & (n - 1)`
- `n//2, n//4, n//8` 这种可以替换成 `n>>1, n>>2, n>>3`. 虽然大部分编译器会自动帮你这么优化，但是给面试官的印象好一些
- 奇偶判断，与其 `n%2`，不如 `n&1`


### 异或操作

异或有以下特点：
1. 一个数和自己异或，得到0 ：`n & n = 0`
2. 任何数字和 0 做异或，得到自己： `n & 0 = n`
3. 支持交换律和结合律 `x^(y^z) = (x^y)^z`


应用举例1（136. Single Number）:一个数组，只有1个数出现1次，其它都出现2次，找到这个数。  
利用以上特点，全部求异或就可以得到结果，时间复杂度 O(n)，空间复杂度 O(1)  
如果是常规思维，时间复杂度是 O(n) 空间复杂度是 O(n)


应用举例2:交换两个数。  

```
x = x ^ y
y = x ^ y
x = x ^ y
```

应用举例3，m的n次方。如果我们使用  
```py
res = 1
for i in range(n):
    res *= m
```
复杂度是n

举例来说，n=13，则n对应的二进制是1101，那么原式等价于  
$n^{1101}=n^{0001}*n^{0100}*n^{1000}$

于是给出代码：

```py
res, tmp = 1, m
while n != 0:
    if n & 1 == 1:
        res *= tmp
    tmp *= tmp
    n = n >> 1
```

复杂度是logn，本质上是利用2次方去算4次方，4次方去算8次方。


应用举例4：找出不大于N的最大2的幂指数

立即可以想出一个logn复杂度的算法
```py
while res * 2 <= n:
    res *= 2
```

然而，结合上面关于二次幂的分析，N对应的二进制，只要保留最高位的1，就是要的结果，就有这个算法：
step1:把n最高位1的右边全变成1  
step2:n右移1位，然后加1，得到结果  

上面的step1比较难，具体做法是 n 右移，然后与n本身求或，反复多次。写出代码：

```py
n |= n >> 1
n |= n >> 2
n |= n >> 4
n |= n >> 8 # n是16位
n = (n + 1) >> 1
```






#### 充分利用数组下标

有限个元素的计数问题，可以把数组的位置和元素做一一对应，数组的值是计数。

例如，给定一串字符串，统计每个字母的出现次数，可以建立一个长度是26的数组，遍历一次得到计数。


题目：有0-20之间的整数，共100万个，请把排序后的结果打印出来。  

```python
import numpy as np
nums = np.random.randint(0, 20, 2000)

res = [0] * 20
for num in nums:
    res[num] += 1

for num, cnts in enumerate(nums):
    for cnt in range(cnts):
        print(num)

```


## 一些方便的方法

### groupby

```py
a = [{'date': '2019-12-15', 'weather': 'cloud'},
 {'date': '2019-12-13', 'weather': 'sunny'},
 {'date': '2019-12-14', 'weather': 'cloud'}]
from operator import itemgetter
from itertools import groupby

# 要点1：除了用 lambda 之外，还可以用 itemgetter，
a.sort(key=itemgetter('weather'))

# 要点2：groupby 操作
# 必须先排序，否则不相邻的不会分为一组
for k, items in groupby(a, key=itemgetter('weather')):
     print(k)
     for i in items:
         print(i)
```


其实list也可以这么做：
```python
a = [[1, 2, 'tom'], [8, 9, 'tony'], [3, 4, 'tom']]
a.sort(key=itemgetter(2)) # 必须
for k, items in groupby(a, key=itemgetter(2)):
    print(k)
    for i in items:
        print(i)
```

chain：兼顾内存效率优雅
```python
from itertools import chain
a = [1,3,5,0]
b = (2,4,6)

for i in chain(a,b):
  print(i)
```

## 一些比较骚的代码

求更长的列表
```py
def max_length(*arg):
    return max(*arg, key=lambda lst: len(lst))


longest_lst = max_length([1, 2, 3], [4, 5, 6, 7], [8])
```

求众数
```py
lst = [1, 3, 3, 2, 1, 1, 2]
max(lst, default=None, key=lambda v: lst.count(v))
```


返回字典d前n个最大值对应的键

```py
from heapq import nlargest
def topn_dict(d, n):
    return nlargest(n, d, key=lambda k: d[k])
```


两个字符串含有相同字母，但排序不同，简称：互为变位词

```py
from collections import Counter

Counter(str1) == Counter(str2)
```

## Python效率研究

### 避免全局变量

定义在全局范围内的代码运行速度会比定义在函数中的慢不少。  
把代码放入到函数中，通常可带来 15% - 30% 的速度提升。


不推荐：
```py
size = 10000
for x in range(size):
    for y in range(size):
        z = math.sqrt(x) + math.sqrt(y)
```

推荐：
```py
def main():
    size = 10000
    for x in range(size):
        for y in range(size):
            z = math.sqrt(x) + math.sqrt(y)
main()
```


### 避免用点

每次使用.（属性访问操作符时）会触发特定的方法，如__getattribute__()和__getattr__()，这些方法会进行字典操作，因此会带来额外的时间开销
·
```py

import math
import datetime

# 不推荐
def main1(size):
    y = []
    for x in range(size):
        y.append(math.sqrt(x))


# 推荐
def main2(size):
    y = []
    # 1. import 的包赋值给一个变量，也可以 from math import sqrt
    sqrt = math.sqrt
    # 2. 对象的方法也可以用赋值来加速
    append = y.append

    for x in range(size):
        append(sqrt(x))


```

>0:00:00.001974
0:00:00.000895


### 利用if条件的短路特性

if 条件的短路特性是指对if a and b这样的语句， 当a为False时将直接返回，不再计算b；对于if a or b这样的语句，当a为True时将直接返回，不再计算b。因此， 为了节约运行时间，对于or语句，应该将值为True可能性比较高的变量写在or前，而and应该推后。



### i in array
```python
import numpy as np
import datetime

a = np.arange(20)
b = list(range(20))
num = 10000
start_time = datetime.datetime.now()
for i in range(num):
    for i in range(10):
        i in a

print(datetime.datetime.now() - start_time)

num = 10000
start_time = datetime.datetime.now()
for i in range(num):
    for i in range(10):
        i in b

print(datetime.datetime.now() - start_time)
```

打印结果：

>0:00:01.026981
0:00:00.044941

结论：i in array 的性能消耗大概是 i in list 的20倍



## 魔法功能
### 可直接运行的 zip 包
正常人认为 Python 包的格式是 egg 或者 whl，但也可以是 zip

我们的 python 包如下：（两个文件都放到 `magic` 文件夹中）
`calc.py`:
```python
def my_func():
    print('测试函数')
    return 1
```
`__main__.py`:
```Python
import calc
calc.my_func()
```

命令行：
```sh
# 打包
python -m zipfile -c demo.zip magic/*

# 使用（会运行__main__.py 文件）
python demo.zip
```


### 用户无感知的小整数池

为避免整数频繁申请和销毁内存空间，Python 定义了一个小整数池 [-5, 256] 这些整数对象是提前建立好的，不会被垃圾回收

```
>>> b = -6
>>> a is b
False

>>> a = 256
>>> b = 256
>>> a is b
True

>>> a = 257
>>> b = 257
>>> a is b
False

>>> a = 257; b = 257
>>> a is b
True
```

### 神奇的 intern 机制
Python解释器中使用了 intern（字符串驻留）的技术来提高字符串效率

```
>>> s1="hello"
>>> s2="hello"
>>> s1 is s2
True

# 如果有空格，默认不启用intern机制
>>> s1="hell o"
>>> s2="hell o"
>>> s1 is s2
False

# 如果一个字符串长度超过20个字符，不启动intern机制
>>> s1 = "a" * 20
>>> s2 = "a" * 20
>>> s1 is s2
True

>>> s1 = "a" * 21
>>> s2 = "a" * 21
>>> s1 is s2
False

>>> s1 = "ab" * 10
>>> s2 = "ab" * 10
>>> s1 is s2
True

>>> s1 = "ab" * 11
>>> s2 = "ab" * 11
>>> s1 is s2
False
```

### 上下文管理器

```
import contextlib

@contextlib.contextmanager
def runtime(value):
    time.sleep(1)
    print("start: a = " + str(value))
    yield
    print("end: a = " + str(value))


a = 0
while True:
    a+=1
    with runtime(a):
        if a % 2 == 0:
            break
```

当 a = 2 时执行了 break ，此时的并不会直接跳出循环，依然要运行上下文管理器


### 如何快速搭建 HTTP 服务器
以index为首页：
```
python3 -m http.server 8888
```

快速生成 HTTP 帮助文档：  
`python -m pydoc -p 5200`

构建一个漫画网站
`import antigravity`

### 包装到指定的python版本
```
# 在 python2 中安装
$ python -m pip install requests

# 在 python3 中安装
$ python3 -m pip install requests

# 在 python3.8 中安装
$ python3.8 -m pip install requests

# 在 python3.9 中安装
$ python3.9 -m pip install requests
```

### 快速美化 JSON 字符串
```
echo '{"name": "MING"}' | python -m json.tool
```

### 获取本机IP

```
import socket

# 本地IP
localIP = socket.gethostbyname(socket.gethostname())
# 公网IP
requests.post("https://www.ip138.com/")
```


### 通过文件头查看文件类型


```python
# -*- coding:utf-8 -*-
import struct

type_dict = {
    '424D': 'bmp',
    'FFD8FF': 'jpg',
    '2E524D46': 'rm',
    '4D546864': 'mid',
    '89504E47': 'png',
    '47494638': 'gif',
    '49492A00': 'tif',
    '41433130': 'dwg（CAD）',
    '38425053': 'psd（Adobe Photoshop）',
    'FF575043': 'wpd',
    'AC9EBD8F': 'qdf',
    'E3828596': 'pwl',
    '504B0304': 'zip',
    '52617221': 'rar',
    '57415645': 'wav',
    '41564920': 'avi',
    '2E7261FD': 'ram',
    '000001BA': 'mpg',
    '000001B3': 'mpg',
    '6D6F6F76': 'mov',
    '7B5C727466': 'rtf',
    '3C3F786D6C': 'xml',
    '68746D6C3E': 'html',
    'D0CF11E0': 'doc/xls',
    '255044462D312E': 'pdf',
    'CFAD12FEC5FD746F': 'dbx（Outlook Express）',
    '2142444E': 'pst（Outlook）',
    '3026B2758E66CF11': 'asf',
    '5374616E64617264204A': 'mdb（MS Access）',
    '252150532D41646F6265': 'ps/eps',
    '44656C69766572792D646174653A': 'eml'
}
max_len = len(max(type_dict, key=len)) // 2


def get_filetype(filename):
    # 读取二进制文件开头一定的长度
    with open(filename, 'rb') as f:
        byte = f.read(max_len)
    # 解析为元组
    byte_list = struct.unpack('B' * max_len, byte)
    # 转为16进制
    code = ''.join([('%X' % each).zfill(2) for each in byte_list])
    # 根据标识符筛选判断文件格式
    result = list(filter(lambda x: code.startswith(x), type_dict))
    if result:
        return type_dict[result[0]]
    else:
        return 'unknown'


if __name__ == '__main__':
    p = 'filename.pdf'
    print(get_filetype(p))
```

### 返回一个汉字的首字母

```
def get_first_letter(char):
    char = char.encode('GBK')

    if char < b"\xb0\xa1" or char > b"\xd7\xf9":
        return ""

    if char < b"\xb0\xc4":
        return "a"

    if char < b"\xb2\xc0":
        return "b"

    if char < b"\xb4\xed":
        return "c"

    if char < b"\xb6\xe9":
        return "d"

    if char < b"\xb7\xa1":
        return "e"

    if char < b"\xb8\xc0":
        return "f"

    if char < b"\xb9\xfd":
        return "g"

    if char < b"\xbb\xf6":
        return "h"

    if char < b"\xbf\xa5":
        return "j"

    if char < b"\xc0\xab":
        return "k"

    if char < b"\xc2\xe7":
        return "l"

    if char < b"\xc4\xc2":
        return "m"

    if char < b"\xc5\xb5":
        return "n"

    if char < b"\xc5\xbd":
        return "o"

    if char < b"\xc6\xd9":
        return "p"

    if char < b"\xc8\xba":
        return "q"

    if char < b"\xc8\xf5":
        return "r"

    if char < b"\xcb\xf9":
        return "s"

    if char < b"\xcd\xd9":
        return "t"

    if char < b"\xce\xf3":
        return "w"

    if char < b"\xd1\x88":
        return "x"

    if char < b"\xd4\xd0":
        return "y"

    if char < b"\xd7\xf9":
        return "z"
```




## 连接列表
```
a = [1, 2, 3]
b = [5, 6, 7]

[*a, *b]
```

合并字典
```python
a = {'a': 1, 'b': 2}
b = {'c': 5, 'd': 6, 'b': 3}

{**a, **b}

# python 3.9 有了新操作
a | b
```

### 条件语句的7种写法
```python
age = 20

# 第一种
msg = ''
if age > 18:
    msg = '成年'
else:
    msg = '未成年'

# 第二种
msg = '成年' if age > 18 else '未成年'

# 第三种
msg = age > 18 and '成年' or '未成年'

# 第四种
msg = ('未成年', '成年')[age > 18]

# 第五种
msg = {True: "成年", False: "未成年"}[age > 18]
```

## clean()

可以注册一个函数，当代码运行结束/代码崩溃时，执行这个函数

```python
import atexit


@atexit.register
def clean():
    print('代码结束，运行清理任务')


def main():
    1 / 0


main()
```

试试从命令行执行这段代码，发现尽管程序崩溃，崩溃后还是执行了 `clean` 函数

还有另一种写法，个人感觉更好，因为能传入参数

```python
import atexit


def clean(input1, input2):
    print(f'代码结束，运行清理任务: {input1}, {input2}')


atexit.register(clean, 'input1', 'input2')
```

另外注意：
- 如果程序是被你没有处理过的系统信号杀死的，那么注册的函数无法正常执行。
- 如果发生了严重的 Python 内部错误，你注册的函数无法正常执行。
- 如果你手动调用了 `os._exit()`，你注册的函数无法正常执行。


## 打印代码

你想打印某个函数的源代码，用这个：

```python
import pandas as pd
import inspect

inspect.getsource(pd.read_csv)  # 打印 pd.read_csv 的源代码

# 显示函数名等信息
pd.read_csv.__code__
```


## 判断是函数还是方法


```python
from types import FunctionType, MethodType

func.__class__ is FunctionType
func.__class__ is MethodType
```


## Linux 打印多彩字

```python
import sys

def clear_traces(): # 清除一行
    # 直接用 print 也可以
    sys.__stdout__.write('\033[2K\r')


def hide_cursor(): # 隐藏光标
    sys.__stdout__.write('\033[?25l')


def show_cursor(): # 显示光标
    sys.__stdout__.write('\033[?25h')


def go_up(n=20): # 光标向上移动 n 行
    up_command = '\033[{}A'.format(n)
    print(up_command)


def flush():
    sys.__stdout__.flush()


# 打印多色字体
# "格式为 \033[{字体}{字色}{背景色} 文字部分 \033[0m"
# 字体: 0（默认）、1（高亮）、22（非粗体）、4（下划线）、24（非下划线）、 5（闪烁）、25（非闪烁）、7（反显）、27（非反显）
# 字色: 30（黑色）、31（红色）、32（绿色）、 33（黄色）、34（蓝色）、35（洋 红）、36（青色）、37（白色）
# 背景色: 40（黑色）、41（红色）、42（绿色）、 43（黄色）、44（蓝色）、45（洋 红）、46（青色）、47（白色）

# 例子
print("\033[4;31;47m 下划线、红字、白底\033[0m")
print("\033[1;33m 高亮、黄字\033[0m")
print("\033[5;41m 闪烁、红底\033[0m")

```

## 一些基础知识

内置函数
```python
help()
dir()
vars() # obj.__dict__
type()
id()
```




反射
```python

model = __import__('numpy')
print(model.sin)
```

反射2
```python
module_name = 'numpy'
func_name = 'sin'
module = __import__('numpy')
func = getattr(module, func_name)
```

作为对比，还有
```python
eval('8*8')

import ast

ast.literal_eval('(8,8)')
```


## 字典转对象

```python
class Dict(dict):
    __setattr__ = dict.__setitem__
    __getattr__ = dict.__getitem__
```

用法：
```python
d1 = {'a': 1, 'b': 2}
d2 = Dict(d1)

d2.a
d2.b = 3
```

## 关于极大/极小运算

1
```py
np.log(np.exp(1000))
# 返回 inf，而不是 1000
```

2、小数字
```py
eps = np.finfo(float).eps
0 == eps / 10  # False
0 == eps / 1000000  # False

0 == 1 + eps / 10 - 1  # True
0 == 1 + eps - 1  # False

0.1 == (0.1 + eps / 100)  # True
0.1 == (0.1 + eps / 10)  # False
```


3 大数字
```py
(1.0 * 10 ** 120) == (1.0 * 10 ** 120 + 1 * 10 ** 102)  # True
(10 ** 120) == (10 ** 120 + 10 ** 102)  # False
(10 ** 120) == (10 ** 120 + 1)  # False
```


## 关于引用的奇怪知识

```py
a = [[1,2,3]]*4
a[0][0] = 5 # 结果所有子序列都被改了
```

## 关于 lazy 的特性

```python
def create_multipliers():
    return [lambda x: i * x for i in range(5)]


for multiplier in create_multipliers():
    print(multiplier(2))

# 看起来会打印 0,2,4,6,8
# 实际上打印 8,8,8,8,8,
# 由于Python中的“后期绑定”行为——闭包中用到的变量只有在函数被调用的时候才会被赋值。所以，在上面的代码中，任何时候，当返回的函数被调用时，Python会在该函数被调用时的作用域中查找 i 对应的值（这时，循环已经结束，所以 i 被赋上了最终的值——4
```




## 参考资料

https://github.com/iswbm/magic-python
