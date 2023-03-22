---
layout: post
title: 【PyLSHasH】【Locality Sensitive Hashing】向量相似度高性能检索
categories: 开源
tags:
keywords:
description:
repo_name: PyLSHasH
---

## 项目地址

https://github.com/guofei9987/pyLSHash


## 原理

这样一个任务：
1. 数据库中存了 1亿 个 n 维向量
2. 设计一个系统，使它能够
3. 每次有一个 n 维向量 query 这个系统时，能够给出数据库中与它相似（距离较近）的向量
4. 首先想到的是用暴力遍历，计算 1亿 次距离，然后卡阈值，但这效率极低
5. 引出这里要介绍的一个算法：Locality Sensitive Hashing，它可以很好的解决此问题



算法原理很简单：
1. 随机生成一个矩阵 $K_{m\times n}$，然后求矩阵积 $K_{m\times n} \vec a_{n\times 1}$
2. 把结果离散化，就是 $\vec a$ 的 “指纹”。
    - 这里的离散化就粗暴一些：大于0记为1，否则记为0。指纹长度为 m
3. 因为矩阵是随机生成的，离散化也粗暴，因此可以把以上多做几次，也就是对饮 `num_hashtables` 个矩阵









几何角度理解
- 从几何角度，矩阵积实际上是 m 个向量积。
- 向量积 $\vec k \cdot \vec a_1$ 和 $\vec k \cdot \vec a_2$ 相似，意味着 $\vec a_1, \vec a_2$ 在向量 $\vec k$ 上的投影相似
- 回到矩阵积，m 个投影都相似，也就意味着 $\vec a_1, \vec a_2$ 在 m 个基看来是近似的，也就是在空间上近似
- 极端情况，假设 $K$ 是单位矩阵，那么所谓的 “相似” 指的就是 “在同一象限”



## 参考资料


- [https://github.com/guofei9987/pyLSHash](https://github.com/guofei9987/pyLSHash)https://github.com/guofei9987/pyLSHash
- [https://github.com/kayzhu/LSHash](https://github.com/kayzhu/LSHash)
