---
layout: post
title: 简单的算法题小试.
categories: 
tags: 5经典算法
keywords:
description:
---

阅读本文需要前提知识：  
Python基本语法  

阅读文本的目的：  
本文是一些极其简单的算法题目，你可以想想自己怎么编程实现，对照本文中的一些简单的编程技巧，例如int(a)==a。如果你有更好的实现方法，请点击上面的邮箱符号告诉我。O(∩ _ ∩)O  




## 连续整数和问题

编写一个程序，输入一个数字n，输出n所有的连续整数和，  
例如，输入27，输出：

```py
[2, 3, 4, 5, 6, 7]
[8, 9, 10]
[13, 14]
```

解答

```py
n =27

for j in range(int(n/2)+1):
    list_iter=[]
    sum_iter=0
    while 1:
        if sum_iter>n:break
        if sum_iter==n:print(list_iter)
        list_iter.append(j)
        sum_iter+=j
        j+=1
```

## 求解平方和问题

输入整数N，输出整数a,b，使得$a^2+b^2=N$  

```py
N=100
for a in range(int(N**0.5)+1):
    b=(N-a**2)**0.5
    if int(b)==b:
        print(a,b)
```

## 特殊数遍历

找到这样的4位整数，使得$abcd=(ab+cd)^2$  
其中，$abcd$是4位数，$ab,cd$是2个2位数  


```py
def combine(x, y):
    return 10 * x + y


for a in range(1, 10):
    for b in range(10):
        for c in range(10):
            for d in range(10):
                if combine(combine(combine(a, b), c), d) == (combine(a, b) + combine(c, d)) ** 2:
                    print(combine(combine(combine(a, b), c), d))
```

输出：  
```
2025
3025
9801
```

### 方法2
也可以遍历1000~9999这些数，用整除法提取各个位
```py
for i in range(1000, 10000):
    a = i // 1000
    b = i // 100 - 10 * (i // 1000)
    c = i // 10 - 10 * (i // 100)
    d = i - 10 * (i // 10)
    if i == (a * 10 + b + c * 10 + d) ** 2:
        print(a, b, c, d)
```

### 方法2（改进）

耦合性高点，但代码短，效率高

```py
for i in range(1000, 10000):
    ab = i // 100
    cd = i % 100
    if i == (ab + cd) ** 2:
        print(i)
```

## 角谷猜想（小范围验证）

给定任意一个自然数N，若它是偶数则除以2，若为奇数则乘3加1，若干次后必然得到结果1  

```py
N = 10000

count = 1
while count <= 10000:
    if N == 1:
        print('end with 1, count is {}'.format(count))
        break
    elif N % 2 == 0:
        N = N / 2
    elif N % 2 == 1:
        N = N * 3 + 1
    count += 1
else:#while执行到底，没有被break，执行else内容
    print('out of count')
```

这个代码特色是，有一个循环上限，防止死循环（遇到非角谷数）  
注意while...else...的用法


## 验证四方定理

四方定理是数论中一个已经被证明的定理。  
四方定理的内容：任意一个自然数可以表示为4个整数和的形式：  
$100=6^2+8^2+0^2+0^2, 29=2^2+3^2+4^2+0^2$  

```py
N = 134

is_four_squares = 0
inter_max = int(N ** 0.5) + 1
for a in range(inter_max):
    for b in range(a, inter_max):
        for c in range(b, inter_max):
            for d in range(c, inter_max):
                if N == a ** 2 + b ** 2 + c ** 2 + d ** 2:
                    is_four_squares = 1
                    print(a, b, c, d)
if is_four_squares == 0:
    print('{} is not a for squares!'.format(N))
```

## 寻找同构数

$n^2$的尾部是n，那么n是同构数，例如，$76^2=5776$，76是一个同构数。  

问题：求1000以内所有的同构数。  

```py
for i in range(1001):
    n = 0 # 最大位数
    while i // (10 ** n):  
        n += 1
    if (i ** 2) % (10 ** n) == i:
        print(i)
```

特点是用整除和while求得最大位数，用余数求出尾数。  


## 验证尼科彻斯定理

这是一个已经被证明的定理：任何一个整数的立方，都可以表示为连续奇数之和。  

解答：与上面的 **连续整数和问题** 很像

```py
N = 5

for i in range(N ** 3):
    sum_iter = 0
    list_iter = []
    while 1:
        if sum_iter > N ** 3:
            break
        elif sum_iter == N ** 3:
            print(list_iter)
            break
        list_iter.append(i)
        sum_iter += i
        i += 2
```

## 三重回文数问题

找到11~999之间这样的数字a，使得$a,a^2,a^3$是回文数。  

解答：怎样找到数字的回文数是主要问题。  


这个可以注意一下：
```py
def reverse(num):
    j = 0
    while num:
        temp = num % 10
        j = j * 10 + temp
        num = num // 10
    return j
```

主程序很简单
```py
for i in range(11, 1000):
    if reverse(i) == i:
        if reverse(i ** 2) == i ** 2:
            if reverse(i ** 3) == i ** 3:
                print(i)
```

## 渔夫捕鱼问题

有A,B,C,D,E这5个渔夫抓了一堆鱼，各自睡觉。  
A第一个醒来，把鱼分5份，丢掉一条，拿一份回家了。  
B第二个醒来，同样把鱼分为5份，丢掉一条，拿一份回家。  
C，D，E同样，问一开始有多少条鱼。  


```py
def func(x):
    if (x - 1) % 5 == 0:
        return (x - 1) * 4 / 5, True
    else:
        return 0, False


k = 0
while 1:
    flag = True
    k += 1
    i = k
    j = 0
    while flag and j < 5:
        i, flag = func(i)
        j += 1
    if flag:
        print(k)
        break
```

## 一个字节中有多少个1

问题：给定一个变量a，计算对应的字节中有多少个1  

```py
a = 7
count = 0
for i in range(32):
    if a & (2 ** i):
        count += 1
count
```
