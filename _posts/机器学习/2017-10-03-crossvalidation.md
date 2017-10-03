---
layout: post
title: 【交叉验证】介绍
categories: 算法
tags: 机器学习
keywords: model evaluation
description:
---

## 简介
交叉验证(Cross-validation)用于建模时，不同种类模型的横向比较。  
交叉验证是一种分割数据的方法，涉及到训练集（train set），评估集（valid set），测试集（test set）  

## 思路

### 最常用的80/20法
数据集中，选取80%作为train set，剩下20%作为test set  

为什么需要划分两个集合呢？如果所有数据放模型里，出现过拟合你也无法发现。  

缺点：  

1. 如果数据做了train set，就不能做 test set了，浪费了20%的数据
2. 有可能某一条数据包含信息很多，但被划分到了test set  
举例来说，做有监督学习时，某数据集100条数据，y值90条是1,10条是0，那么有可能10条全部进入test set，当然不能得出正确结果。

解决方法：
1. 每类数据做80/20， 这在SVM的[一个案例](http://www.guofei.site/2017/09/28/svm.html#title12)中有用到
2. 留1法（下面）

### 留1法

假设有n条数据，那么：  
step1：选取n-1条作为train set，剩下1条作为test set  
step2：做n次模型，这样可以保证每个数据都作为test set和train set  

缺点：
1. 虽然保证每个数据都作为test set和train set，但是需要运行n次模型，当n较大时，计算量几乎无法实现。  

### 交叉验证

step1:把data set 分为5份：1,2,3,4,5  
step2:每份分别作为test set，运行5次模型  

（这个也叫5倍交叉验证法）  

## 结果判断

留1法有n个模型，n个结果。5倍交叉验证有5个模型5个结果。  

step1：多种模型横向比较时，取误差平均值。看哪个模型的平均误差小  
step2：选定模型后，在5个模型中选一个误差最小的  

**理论上，5倍交叉沿着法的误差均值，一般比80/20法大很多。**   


## 代码实现

```py
train_data,test_data,train_target,test_target=cross_validation.train_test_split(data,target,test_size=0.4,train_size=0.6,random_state=12345)#划分训练集和测试集
```

(下个版本会删掉这个方法,用sklearn.model_selection 代替)
