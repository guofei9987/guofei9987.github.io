---
layout: post
title: 【算法题】破碎的砝码.
categories: 趣文
tags:
keywords:
description:
---

## 问题

（出自法国数学家梅齐亚克《数字组合游戏》）  
>有一个质量40磅的砝码，摔成4块，每块质量都是正整数，并且每块砝码质量各不相同。  
这4个砝码可以称量1~40磅的任意质量（整数磅）  
求：4个砝码的重量  

## 分析

函数1：给定质量，判断能否称量  
函数2：循环调用函数1，判断4个给定砝码能否称量1~40磅  
函数3：循环调用函数2，遍历砝码的所有可能组合  

## 代码实现

```py
def weightable(a, b, c, d, thing):
    for a_index in [-1, 1, 0]:
        for b_index in [-1, 1, 0]:
            for c_index in [-1, 1, 0]:
                for d_index in [-1, 1, 0]:
                    if a * a_index + b * b_index + c * c_index + d * d_index == thing:
                        return True
    return False

def weightall(a,b,c,d):
    for i in range(1,41):
        if weightable(a,b,c,d,i):
            continue
        else:
            return False
    return True

for a in range(1, 38):
    for b in range(a, 38):
        for c in range(b, 38):
            d = 40 - a - b - c
            if d>c:
                if weightall(a,b,c,d):
                    print(a,b,c,d)
```
output：

```
1 3 9 27
```
Wall time: 36.1 ms  
算法效率很高，但for循环有点多，你有没有更好的方法呢？  
