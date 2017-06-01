---
layout: post
title: 【语法速查】【Python】yield.
categories: Geek
tags: 语法速查
keywords:
description:
---

先看一个案例
```py
def g():
    yield 1
g_obj=g()
next(g_obj)#返回1
next(g_obj)#报错
```


n=yield m

ch=chain(f1,f2)
