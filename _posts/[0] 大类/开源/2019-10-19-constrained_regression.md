---
layout: post
title: 【轮子】带约束的岭回归
categories: 开源
tags:
keywords:
description:
---





## 前言
### 1. 为何是岭回归
实战中，有可能碰见这种情况，几个数据特征是相关的。如果不使用二阶惩罚项，小属性趋势容易“叠加”到大属性上，从而小属性完全失效。  
例如，要做一个手机的价格的预测模型，CPU和内存很可能是高度相关的。普通的线性回归容易把价格“归类”到某一个属性上。  

### 2. 为何带约束

实战中，往往碰到这种情况，数据中的长尾属性很多。例如，某些属性是稀有属性，涉及到的记录数比较少。  
尽管总的数据量很大，但稀有属性的数据量却可能不大。  
因此需要人为给定一些排序（所谓的先验专家知识）

### 3. 与其他模型的对比
- 线性模型：训练集上优秀，测试集上极差，因为过拟合现象。
- Lasso：训练集测试集均好于此模型，但一方面对稀有属性过拟合，另一方面不符合业务认知。

## 造轮子

带约束的岭回归

$C=\mid\mid Xw-y\mid\mid_2^2+\alpha \mid\mid w\mid\mid_2^2$  
s.t.$w\in \Sigma$  


下面把这个最优化问题转化为二次规划问题
### 1. 损失函数部分
损失函数是 $J=(\hat Y-Y)^T(\hat Y-Y)+\alpha w^Tw$

先看第一项：
$(\hat Y-Y)^T(\hat Y-Y)$
$=\hat Y^T \hat Y-\hat Y^TY-Y^T\hat Y+Y^TY$（矩阵乘积结合律）
$=\hat Y^T \hat Y-\hat Y^TY-\hat Y^T Y+Y^TY$（因为是1*1矩阵，所以可以随意转置）
$=\hat Y^T \hat Y-2 Y^T \hat Y+Y^TY$

再看第二项：
$\alpha w^Tw=\alpha w^T I w$（其中$I$表示单位矩阵：对角线全为1的对角阵）

两项相加，并且考虑到 $Y^TY$ 是常数，在最优化中不考虑。  
$J=\hat Y^T \hat Y-2 Y^T \hat Y+\alpha w^T I w$
$=w^TX^TXw-2Y^TXw+\alpha w^T Iw$
$=w^T(X^TX+\alpha I)w -2 (Y^TX)w$
$=2[0.5w^T(X^TX+\alpha I)w -(Y^TX)w]$（这就化为了二次规划的标准形式）


令$p=X^TX+\alpha I,q^T=-Y^Tx$,
得到二次型的标准形式：
$\min\limits_w (1/2)w^T p w+q^Tw$

### 2. 约束部分
约束部分就按照标准形式写就行了，不需要公式转化。

### 3. 代码
```py
alpha=0.1 # l2范数前面的系数。
from cvxopt import matrix, solvers
X, y = matrix(X), matrix(y)

# 最优化目标部分：
I = matrix(np.eye(num_features))
P = X.T * X + alpha * I
q = (-1.0 * y.T * X).T # 因为标准型输入的是q.T，所以还需要一次转置

# 约束部分：(Gw<h)
G = matrix(g).T # 注意一下，这里的g是list，需要转置。如果g是np.array，就不需要。
h = matrix([-0.01] * G.size[0])  # 这里按照类似“小于即可”，“小0.01”等实际需求去自定义
# A,b 等号约束同理

sv = solvers.qp(p, q, G, h)
sv['x'] # 解出系数
```
