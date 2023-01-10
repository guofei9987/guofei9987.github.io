---
layout: post
title: 【开源】用几个圆圈画任意图
categories: 开源
tags:
keywords:
description:
---


## 源码
[源码](https://github.com/guofei9987/fourier_artist)  
[![Stars](https://img.shields.io/github/stars/guofei9987/fourier_artist.svg?label=Stars&style=social)](https://github.com/guofei9987/fourier_artist/stargazers)


## 原理

先复习一下离散傅立叶变换

如果：  
$\{ f_0,f_1,...f_{N-1}  \}$满足$\sum\limits_{n=0}^{N-1}|f_n|<\infty$


傅里叶变换：
$X(k)=F(f_n)=\sum\limits_{n=0}^{N-1} f_n e^{-i \dfrac{2 \pi k}{N} n}$


傅里叶逆变换：
$f_n=\dfrac{1}{N} \sum\limits_{k=0}^{N-1} X(k) e^{i \dfrac{2 \pi k}{N} n}$


我们观察傅立叶逆变换，可以发现
1. 乘以 $e^{i \dfrac{2 \pi k}{N} n}$，对应的几何意义是逆时针旋转 $i \dfrac{2 \pi k}{N} n$
2. 复数相加对应的几何意义是平移（或者说，是向量和）
3. $\sum\limits_{n=0}^{N-1}$ 累加符号，对应的几何意义就是多个“杆”连接起来。杆的长度为 $X(k)$ 的模，它是个固定值

## 细节

1. 我们可以做个过滤，$X(k)$  比较小的话，可以忽略掉
2. 位于中心的圆其实不会移动
