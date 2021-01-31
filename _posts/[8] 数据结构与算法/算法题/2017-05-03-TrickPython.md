---
layout: post
title: 【Python】【算法题集1】
categories:
tags: 8-数据结构与算法
keywords:
description:
order: 580
---

- 入门级题目：[【Python】【算法题集1】](http://www.guofei.site/2017/05/03/TrickPython.html)
- 《编程之美》中的题目：[【Python】【算法题集2】](http://www.guofei.site/2017/08/28/someproblems.html)
- LeetCode上的题目：[【Python】【算法题集3】](http://www.guofei.site/2018/07/05/pythonalgorithma.html) 

## 1
问题：从40个数中随机选取30个。要求等概率，无放回抽样  

解答：
```py
import numpy as np
nums=np.random.randint(5,50,size=40)#待选择的array

#算法开始
mask=np.random.rand(40)
for i in mask:
    if sum(mask>i)==30:
        break
nums[mask>i]
```
Python有更好的解决方案：  
```py
import numpy as np
nums=np.random.randint(5,50,size=40)
np.random.shuffle(nums)
nums[:30]
```


如果是有放回抽样：  
```py
import numpy as np
nums=np.random.randint(5,30,size=(40,1))
np.random.choice(nums,30)
```

-----
## 2

问题：list中取数
```
[c1[i] for i in [0,1,3]]#不规律的标号，这样取
```
-----

## 3

问题：在一个较大的list中，找到彼此最接近但不相等的数
很自然的想到遍历
```py
import numpy as np
seq=np.random.rand(10**5)
dd=float('inf')
for x in seq:
    for y in seq:
        if x==y:continue
        d=abs(x-y)
        if d<dd:
            xx,yy,dd=x,y,d
xx,yy
```
显然，这种算法的复杂度为$\Theta(n^2)$，对于大量数据是灾难  

改进：很自然想到sort的算法复杂度为$\Theta(n \lg n)$,先排序，然后只计算临近数，算法复杂度是$\Theta(n \lg n+n)=\Theta(n \lg n)$   
```py
import numpy as np
seq=np.random.rand(10**5)
seq.sort()
dd=float('inf')
for i in range(len(seq)-1):
    x,y=seq[i],seq[i+1]
    if x==y:continue
    d=abs(x-y)
    if d<dd:
        xx,yy,dd=x,y,d
xx,yy
```

## 4
题目：对set进行排序  
```py
unsorted_set={'a':6,'b':3,'c':9,'d':2}
```
解法1：  
```py
unsorted_set={'a':6,'b':3,'c':9,'d':2}
dict1= sorted(a.items(), key=lambda d:d[1], reverse = True)
```

解法2：
```py
unsorted_set={'a':6,'b':3,'c':9,'d':2}
value_key_pairs=[(value,key) for key,value in unsorted_set.items()]
value_key_pairs.sort()
```


额外提一句，想要做频率统计，可以从一开始就不用set，而是把raw data放到DataFrame里，然后这样：
```
df['col1'].value_counts()#对Series计数
```

## 5
问题：原始数据以df=pandas.DataFrame格式存放，5个字段  
找出5个字段中，任意2个字段满足条件的行  

解答：
```
mask=((df.col1>0.5)+(df.col2<0.8)+(df.col3>0.3)+(df.col4>0.3)+(df.col5<0.3)>=2)
df[mask]
```

## 6

问题：两个连续函数func1, func2有若干交点，求交点的近似位置  

解答：也就是两函数差的零点，连续两点变号，再用直线近似  

```py
import numpy as np

def func1(x):
    return 0.6 * x + 0.3


def func2(x):
    return 0.4 * x * x + 0.1 * x + 0.2

x=np.linspace(-3,3,10000)
f1=func1(x)
f2=func2(x)

d=f1-f2
idx=np.where(d[:-1]*d[1:]<=0)[0]
x1,x2=x[idx],x[idx+1]
d1,d2=d[idx],d[idx+1]

-y1*(x2-x1)/(d2-d1)+x1
```

## sort


```py
a=['a','abds','cdd','c']
a.sort(key=lambda x: len(x))
```

## args/kwargs

当你写`func(a,b,c,d=some1,e=some2)`时，实际上执行的是下面的内容:  
```py
a,b,c=args
d=kwargs.get('d',d_default_value)
d=kwargs.get('d',d_default_value)
```

示例：  
```py
def say_hello_then_call(f,*args,**kwargs):
    print('args is',args)
    print('kwargs is',kwargs)
    print('call: ',f)
    return f(*args,**kwargs)
def g(x,y,z=1):
    return 1

say_hello_then_call(g,1,2,z=5)
```
>args是一个tuple  
kwargs是一个dict  


## or
```py
#如果事先不知道'a'是否是空值，这种写法非常简洁
a='a' or None
```

## str综合题目1
已知字符串 a = "aAsmr3idd4bgs7Dlsf9eAF",要求如下  
1.1 请将a字符串的大写改为小写，小写改为大写。  
```py
a.swapcase()
```

1.2 请将a字符串的数字取出，并输出成一个新的字符串。
```py
x=[]
for i in a:
    if i.isdigit():
        x.append(i)
''.join(x)
```
更简洁的表示：
```
''.join([i for i in a if i.isdigit()])
```
1.3 请统计a字符串出现的每个字母的出现次数（忽略大小写，a与A是同一个字母），并输出成一个字典。 例 {'a':4,'b':2}  
```py
x3=dict()

for i in a.upper():
    if not i.isdigit():
        if i in x3:
            x3[i]+=1
        else:x3[i]=1
x3
```
更简洁的表示
```py
dict([(i,a.count(i)) for i in set(a) if not i.isdigit()])
```
1.4 请去除a字符串多次出现的字母，仅留最先出现的一个。例 'abcabb'，经过去除后，输出 'abc'
```py
x4=[]
for i in a.upper():
    if not i.isdigit():
        if not i in x4:
            x4.append(i)
''.join(x4)
```
1.5 请将a字符串反转并输出。例：'abc'的反转是'cba'
1.6 去除a字符串内的数字后，请将该字符串里的单词重新排序（a-z），并且重新输出一个排序后的字符 串。（保留大小写,a与A的顺序关系为：A在a前面。例：AaBb）
```py
x6=[]
for i in a:
    if not i.isdigit():
        x6.append(i)
''.join(sorted(x6))
```
1.7 请判断 'boy'里出现的每一个字母，是否都出现在a字符串里。如果出现，则输出True，否则，则输 出False.
```py
tag=True
for i in 'boy':
    if not i in a:
        tag=False
tag
```
用set更简单
```
set('boy').issubset(set(a))
```

1.9 输出a字符串出现频率最高的字母
```
x3=[(i,a.count(i)) for i in set(a) if not i.isdigit()]
sorted(x3,key=lambda x: x[1],reverse=True)[0]
```


3.一文件的字节数为 102324123499123，请计算该文件按照kb与mb计算得到的大小。

4.已知  a =  [1,2,3,6,8,9,10,14,17],请将该list转换为字符串，例如 '123689101417'.
