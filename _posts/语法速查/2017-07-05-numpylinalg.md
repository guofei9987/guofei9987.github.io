---
layout: post
title: 【Python】【numpy】linalg线性代数.
categories:
tags: Python语法
keywords:
description:
---


## 总结

|函数|说明|
|--|--|
|diag|(输入是2维时)对角线(第k个)转1维阵|
|diag|(输入是1维时)一维阵转对角阵|
|dot|矩阵乘法|
|trace|对角线元素和|
|det|对应行列式值|
|eig|特征值和特征向量|
|inv|矩阵的逆|
|pinv|矩阵的Moore-Pwnrose伪逆|
|qr|QR分解|
|svd|SVD分解|  



## 行列式
```
import numpy as np
a=np.random.uniform(0,1,size=(10,10))
b=np.random.uniform(0,1,size=(10,1))
A=np.linalg.det(a)
```

## 矩阵的转置
```
a.T
```
## 矩阵的特征值特征向量
```
eigenvalues,eigenvectors=np.linalg.eig(a)
```
## 矩阵的逆
```
np.linalg.inv(a)
```
## 矩阵的秩
```
np.linalg.matrix_rank(a)
```
## 矩阵的积
```
np.dot(a,b)
```
注意，这里的a,b必须是多维的，否则返回的是內积（对应项相乘）  

## 矩阵的点积
```
a*b
```
