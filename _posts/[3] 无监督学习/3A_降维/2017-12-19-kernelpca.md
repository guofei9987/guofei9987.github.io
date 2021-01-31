---
layout: post
title: 【KernelPCA】理论与实现
categories:
tags: 3-1-降维
keywords:
description:
order: 321
---


## 简介
PCA从高维空间向低维空间的映射是线性的。  
有些问题需要非线性映射才能找到合适的低维空间来降维。  
KernelPCA是PCA的推广，用到了Kernel 技巧。  

[官网](http://scikit-learn.org/stable/modules/generated/sklearn.decomposition.KernelPCA.html)  


## 参数
### Kernel
- 'linear': $K(\vec x,\vec z)=\vec x  \vec z$  
- 'poly': $K(\vec x,\vec z)=(\gamma(\vec x  \vec z+1)+r)^p$  
$\gamma$由gamma参数确定，p由degree参数确定，r由coef0参数确定  
- 'rbf': $K(\vec x,\vec z)=\exp (-\gamma \mid\mid\vec x  - \vec z\mid\mid^2)$  
$\gamma$由gamma参数确定  
- 'sigmoid': $K(\vec x,\vec z)=\tanh (\vec x  \vec z)$  
$\gamma$由gamma参数确定，r由coef0参数确定  
- 'precomputed'



<iframe src="https://www.guofei.site/StatisticsBlog/KernelPCA.html" width="100%" height="1600em" marginwidth="10%"></iframe>
