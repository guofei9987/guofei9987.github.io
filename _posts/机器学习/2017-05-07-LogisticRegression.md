---
layout: post
title: 【逻辑回归】理论与实现
categories: 模型
tags: 机器学习
keywords: model evaluation
description:
---
logistics regression是一种典型的分类模型  

 logistic regression, logit regression, logit model这三个模型本质和用法几乎完全相同，因此这里不加区分

## logistic distribution

### 定义
CDF满足这个的随机变量叫做logistic distribution  
 $F(x; \mu, s) = \dfrac{1}{1+e^{-(x-\mu)/s}}$

### 性质
不难推导出PDF：  
$f(x; \mu,s) = \dfrac {e^{-(x-\mu)/s}} {s (1+e^{-(x-\mu)/s})^2}$

## logistic regression

### 模型
$P(Y=1 \mid x)=\dfrac{\exp(wx)}{1+\exp(wx)}$  

$P(Y=0 \mid x)=\dfrac{1}{1+\exp(wx)}$  

### 策略

求参数的方法，就是经典的 **MLE** (极大似然估计)方法。  
先求似然函数，  
$l(w;x)=\prod \limits_{i=1}^N [P(Y=1|x)]^{y_i} [P(Y=0|x)]^{1-y_i}$  
取对数后求$argmax \ln l(w)$   
这是一个 **凸函数** ，（凸函数的知识参见我的另一篇博文<a href='/2017/06/09/optimization.html'>最优化方法理论篇</a>）  
由于是一个凸函数，可以用导数值为0确定最大值点，还可以用梯度下降法迭代求解最大值点。  

推导似然函数：  
令$L(w;x)=\ln l(w;x)$
$L(w;x)=\sum \limits_{i=1}^N (y_i w x_i - \ln (1+e^{wx_i}))$  

w和x都是向量。下面研究向量的第j个分量   
偏导数为：  

$\dfrac{\partial L(w;x)}{\partial w_j} = \sum \limits_{i=1}^N (y_i x_{ij} - \dfrac{e^{wx_i}x_{ij}}{1+e^{wx_i}}) =  \sum \limits_{i=1}^N (y_i - \dfrac{e^{w x_i}}{1+e^{wx_i}})x_{ij}$  

- 令导数为0，遗憾的是无法求出解析解。
- 因此用用梯度法可以求解

## Python实现（sklearn）

用到sklearn中的两个模型
[RandomizedLogisticRegression](http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.RandomizedLogisticRegression.html)用来筛选变量  
[LogisticRegression](http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html)用来做逻辑回归  

step1:用RandomizedLogisticRegression筛选有效变量  
```py
from sklearn.linear_model import LogisticRegression as LR
from sklearn.linear_model import RandomizedLogisticRegression as RLR
rlr = RLR() #建立随机逻辑回归模型，用于筛选变量
rlr.fit(x, y) #训练模型
rlr.get_support() #获取特征筛选结果，也可以通过.scores_方法获取各个特征的分数
print('通过随机逻辑回归模型筛选特征结束。')
print('有效特征为：%s' % ','.join(x.columns[rlr.get_support()]))
```

step2：用LogisticRegression做逻辑回归
```
x_new = x[x.columns[rlr.get_support()]].as_matrix() #筛选好特征
lr = LR() #建立逻辑回归模型
lr.fit(x_new, y) #用筛选后的特征数据来训练模型
print('逻辑回归模型训练结束。')
print('模型的平均正确率为：%s' % lr.score(x_new, y)) #给出模型的平均正确率，本例为81.4%
```
