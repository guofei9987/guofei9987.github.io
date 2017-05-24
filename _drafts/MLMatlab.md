---
layout: post
title: 【Matlab】机器学习代码速查
categories: 模型
tags: Matlab
keywords:
description:
---


## 决策树

```
clear;clc;close all
load fisheriris;
X=meas;Y=species;
Mdl=fitctree(X,Y,'MaxNumSplits',8,'CrossVal','on');
view(Mdl.Trained{1},'Mode','graph');
```



【鼠标流】Matlab一键生成22个模型的方法：  
APPS-->Classification Fitting-->New Session-->Start Session
