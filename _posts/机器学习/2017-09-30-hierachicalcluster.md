---
layout: post
title: 层次聚类理论偏.
categories: 算法
tags: 机器学习
keywords:
description:
---

## 说明

层次聚类，**hierarchical clustering** (also called **hierarchical cluster analysis** or **HCA** )

层次聚类可以划分为两类：  
1. agglomerative Hierarchical clustering(AHC)自底向上，这里主要写的是这种方法  
2. divisive Hierarchical clustering 自顶向下，一开始所有数据为一类，每次把一个类分开，因为把类分开算法较为复杂，所以这种方法关注度不高，


## AHC基本思想
step1：先让各个样本各自成一类，  
step2：距离最近的两类合并成一个新类  
step3：反复执行step2  
step4：根据需要，或根据距离临界值（阈值）确定分类数和分类结果  

## 特点
计算量巨大，例如，100个样本点，第一轮要计算$C_{100}^2$次，第二轮$C_{99}^2$次（如果第1轮的没出现2个相等的最小距离）
