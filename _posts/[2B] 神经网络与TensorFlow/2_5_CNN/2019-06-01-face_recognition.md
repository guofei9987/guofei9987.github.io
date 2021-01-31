---
layout: post
title: 【CNN】face recognition
categories:
tags: 2-5-CV
keywords:
description:
order: 280
---

## 分类
- verification（1:1）
- recognition（1：K）

## 难点：**One Shot Learning**
1. 训练集极小（数据库里每人只有1张照片）
2. 有新人加入数据库后，output layer就要多一个维度


解决： learning a "similarity" function  
Siamese network
- 预测阶段：两张照片，用同一个CNN，生成两个(n,1)向量。然后判断向量的距离，较近是同一个人，较远是不同人
- 训练阶段：如果是不同人，使距离大；如果是同一人，希望距离小


Triplet Loss
- 定义 Anchor 是一张照片，Positive 是同一人的另一张照片，Negative 是不同人的照片
- 我们希望 $\mid\mid f(A)-f(P)\mid\mid^2 \leq \mid\mid f(A)-f(N)\mid\mid^2$
- 也就是 $\mid\mid f(A)-f(P)\mid\mid^2 - \mid\mid f(A)-f(N)\mid\mid^2 +\alpha \leq 0$ 加入 $\alpha$是为了防止神经网络的输出恒为0
- loss function $L(A,P,N)=\max(\mid\mid f(A)-f(P)\mid\mid^2 - \mid\mid f(A)-f(N)\mid\mid^2 +\alpha,0)$
- cost function $J=\sum L(A,P,N)$
- 如果 A, P, N 随机选择，那么$\mid\mid f(A)-f(P)\mid\mid^2 - \mid\mid f(A)-f(N)\mid\mid^2 +\alpha \leq 0$很容易满足，所以选择的时候应当优先用不满足的。（郭飞：我理解这也是用 $\max(d1-d2+\alpha,0)$，而不是直接用$d1-d2$去训练的原因。因为已经合适的triplet，强行输入也没有梯度）
- 用batch learning


## 另一种算法

![1](/pictures_for_blog/deep_learning/face.png)
