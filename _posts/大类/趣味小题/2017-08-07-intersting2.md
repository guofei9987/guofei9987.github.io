---
layout: post
title: 【趣味小题】逻辑教授三学生问题
categories: 趣文
tags:
keywords:
description:
---

### 题目是这样的

>一个教授逻辑学的教授，有三个学生，而且三个学生均非常聪明！  
一天教授给他们出了一个题，教授在每个人脑门上贴了一张纸条并告诉他们，每个人的纸条上都写了一个正整数，且某两个数的和等于第三个！（每个人可以看见另两个数，但看不见自己的）  
教授问第一个学生：你能猜出自己的数吗？回答：不能  
问第二个，不能  
第三个，不能  
再问第一个，不能  
第二个，不能  
第三个：我猜出来了，是144！  
教授很满意的笑了。  
请问您能猜出另外两个人的数吗？  

### 问题分析

这个问题的关键在于这么几点：  
1. 想让第一个人猜出来只能是这种情况：  
(?,x,x).因为题目限定了正整数，也就排除了0=x-x，只能是?=x+x，这就猜出自己的数字了。  
2. 想让第n个人猜出来，隐含这几个条件：
    1. 前面的人猜不出来，也就是排除前n-1个人猜出来的可能性
    2. 第n个人猜出来

通过上面的分析，发现可以使用递归解决这个问题。  


### 代码

考虑到只有6回合，为了可读性高，把递归式分开写成6个函数。  

网友可以想想如何写成一个递归函数。（可读性会变差，但代码会很短）

```py
def round11(x, y, z):
    prob_count = 2  # 这一次能猜出多少种可能性
    if y == z:
        prob_count = 1
    return prob_count


def round12(x, y, z):
    prob_count = 2
    if x == z:
        prob_count = 1  # 能猜出来
    elif round11(x, abs(x - z), z) == 1:  # 上一个人能猜出来
        prob_count = 1  # 这个人当然也能猜出来
    elif round11(x, x + z, z) == 1:
        prob_count = 1
    return prob_count


def round13(x, y, z):
    prob_count = 2
    if x == y:
        prob_count = 1
    elif round12(x, y, abs(x - y)) == 1:
        prob_count = 1
    elif round12(x, y, x + y) == 1:
        prob_count = 1
    return prob_count


def round21(x, y, z):
    prob_count = 2
    if y == z:
        prob_count = 1
    elif round13(abs(y - z), y, z) == 1:
        prob_count = 1
    elif round13(y + z, y, z) == 1:
        prob_count = 1
    return prob_count


def round22(x, y, z):
    prob_count = 2
    if x == z:
        prob_count = 1
    elif round21(x, abs(x - z), z) == 1:
        prob_count = 1
    elif round21(x, x + z, z) == 1:
        prob_count = 1
    return prob_count


def round23(x, y, z):
    prob_count = 2
    if x == y:
        prob_count = 1
    elif round22(x, y, abs(x - y)) == 1:
        prob_count = 1
    elif round22(x, y, x + y) == 1:
        prob_count = 1
    return prob_count


import numpy as np

for i in np.arange(1, 144):
    # 按照这种方式遍历：x=i,y=144-i,z=144
    if round23(i, 144 - i, 144) == 1:
        if round22(i, 144 - i, 144) == 2:
            print(i)

```

output:

```
32
36
54
64
108
```

所以这个问题有5个解：
```
(32,112,144)
(36,108,144)
(54,90,144)
(64,80,144)
(108,36,144)

```
