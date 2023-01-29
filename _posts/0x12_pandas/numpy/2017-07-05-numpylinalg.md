---
layout: post
title: 【numpy】linalg线性代数
categories:
tags: 0x12_Pandas与numpy
keywords:
description:
order: 1101
---


## 总结

|函数|说明|
|--|--|
|diag|(输入是2维时)对角线(第k个)转1维阵|
|diag|(输入是1维时)一维阵转对角阵|
|dot|矩阵乘法|
|matrix_power(arr1, n)|n次方，n是正/负/零整数|  
|trace|对角线元素和|
|det|对应行列式值|
|eig|特征值和特征向量|
|inv|矩阵的逆|
|pinv|矩阵的Moore-Pwnrose伪逆|
|qr|QR分解|
|svd|SVD分解|  



## 矩阵运算
```py

import numpy as np

arr1 = np.random.uniform(0, 1, size=(3, 3))
arr2 = np.random.uniform(0, 1, size=(10, 1))

# 矩阵对应的行列式的值
A = np.linalg.det(arr1)

# 矩阵的转置
arr1.T

# 矩阵的逆
np.linalg.inv(arr1)

# 矩阵乘法
np.dot(arr1, arr2)
# 注意，这里的a,b必须是多维的，否则返回的是內积（对应项相乘）  
# python 3.5 以上也可以这样写：
arr1 @ arr2


# 矩阵的点积
a * b

# 矩阵的次方
np.linalg.matrix_power(arr1, n=3)
# n是正/负/零整数

# 矩阵的特征值特征向量
eigenvalues, eigenvectors = np.linalg.eig(arr1)

# 矩阵的秩
np.linalg.matrix_rank(a)
```




## 数据清洗
```py
np.where
np.argwhere(name_data) # 矩阵中，非零元素的坐标
```
