---
layout: post
title: 经典数据集
categories: 算法
tags: 机器学习
keywords: model evaluation
description:
---

## sklearn中的数据集

```
import sklearn
iris=sklearn.datasets.load_iris()
iris.data,iris.target
```

## statsmodels中的数据集
```py
import statsmodels.api as sm
dat = sm.datasets.get_rdataset("Guerry", "HistData").data
```


## 网络资源
UCI，有很多经典数据：  
http://archive.ics.uci.edu/ml/

sogou数据实验室：  
http://www.sogou.com/labs/resource/list_pingce.php

一个生成table的在线工具（latex，html等等）：  
http://www.tablesgenerator.com/

http://zh.numberempire.com/texequationeditor/equationeditor.php
