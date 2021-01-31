---
layout: post
title: 【算法题】24点问题.
categories: 趣文
tags:
keywords:
description:
---

## 问题

给定4个整数，进行加减乘除四则运算后结果可能为24，输出所有这样的运算方法，要求：  
- 运算式中的数字不改变顺序
- 可以任意加括号，以改变运算有限顺序  

例如：  
```
4*((5-6)+7)=24
4*(5-(6-7))=24
```

## 分析  

1. 考虑4种运算的实现方法(不考虑括号)  
a?b?c?d  
用一个函数cal(a,b,op)来表示a?b  
2. 考虑括号的实现方法(不考虑运算符)  
总共有5种情况  
（代码里把5种情况一一列出来，有点丑，似乎可以用二叉树做，但没有思路。如果你有好的做法，请告诉我）  

## 代码实现

```py
def cal(a, b, op):
    if op == '+':
        return a + b
    elif op == '-':
        return a - b
    elif op == '*':
        return a * b
    elif op == '/':
        return a / b


def cal_mod1(a, b, c, d, op1, op2, op3):
    temp1 = cal(a, b, op1)
    temp2 = cal(temp1, c, op2)
    temp3 = cal(temp2, d, op3)
    return temp3


def cal_mod2(a, b, c, d, op1, op2, op3):
    temp1 = cal(a, b, op1)
    temp2 = cal(c, d, op3)
    temp3 = cal(temp1, temp2, op2)
    return temp3


def cal_mod3(a, b, c, d, op1, op2, op3):
    temp1 = cal(b, c, op2)
    temp2 = cal(a, temp1, op1)
    temp3 = cal(temp2, d, op3)
    return temp3


def cal_mod4(a, b, c, d, op1, op2, op3):
    temp1 = cal(b, c, op2)
    temp2 = cal(temp1, d, op3)
    temp3 = cal(a, temp2, op1)
    return temp3


def cal_mod5(a, b, c, d, op1, op2, op3):
    temp1 = cal(c, d, op3)
    temp2 = cal(b, temp1, op2)
    temp3 = cal(a, temp2, op1)
    return temp3


def cal_problem(a, b, c, d):
    for op1 in list('+-*/'):
        for op2 in list('+-*/'):
            for op3 in list('+-*/'):
                if cal_mod1(a, b, c, d, op1, op2, op3) == 24:
                    print('(({}{}{}){}{}){}{}=24'.format(a, op1, b, op2, c, op3, d))
                if cal_mod2(a, b, c, d, op1, op2, op3) == 24:
                    print('({}{}{}){}({}{}{})=24'.format(a, op1, b, op2, c, op3, d))
                if cal_mod3(a, b, c, d, op1, op2, op3) == 24:
                    print('({}{}({}{}{})){}{}=24'.format(a, op1, b, op2, c, op3, d))
                if cal_mod4(a, b, c, d, op1, op2, op3) == 24:
                    print('{}{}(({}{}{}){}{})=24'.format(a, op1, b, op2, c, op3, d))
                if cal_mod5(a, b, c, d, op1, op2, op3) == 24:
                    print('{}{}({}{}({}{}{}))'.format(a, op1, b, op2, c, op3, d))


cal_problem(4, 5, 6, 7)
cal_problem(5, 4, 3, 8)
```

output：  
```py
4*((5-6)+7)=24
4*(5-(6-7))=24
((5+4)/3)*8=24
(5+4)/(3/8)=24
((5-4)*3)*8=24
(5-4)*(3*8)=24
```

5种情况一一列出来，有点丑，你有没有更好的实现方法呢？  
