---
layout: post
title: 【随机森林】理论介绍
categories: 算法
tags: 机器学习
keywords: model evaluation
description:
---


Leo Breiman和Adele Cutler发展出推论出随机森林的算法。这个方法则是结合 Breimans 的 "Bootstrap aggregating" 想法和 Ho 的"random subspace method"" 以建造决策树的集合。  

随机森林是一类专门为决策树分类器设计的组合方法，它组合多棵决策树作出的预测，其中每棵树都是基于随机向量的一个独立集合的值产生的（随机森林采用一个固定的概率分布来产生随机向量。）  

## 算法流程

step1：利用Bootstrap方法重采样，随机产生T个训练集$S_1,S_2,...S_T$  
step2：利用每个训练集，生成对应的决策树$C_1,C_2,...C_T$.  
在每个分支节点上选择属性前，从M个属性中随机选取m个属性作为当前节点的分裂属性集，并且选择这m个属性中最好的分裂方式进行分裂（整个森林生长过程中，m值维持不变）  
step3：每棵树都完整生长，不剪枝  
step4：对于要预测的新数据，由T个决策树投票决定。  

## 代码实现

```py
from sklearn import datasets
dataset=datasets.load_iris()

from sklearn import ensemble
clf=ensemble.RandomForestClassifier()
clf.fit(dataset.data,dataset.target)
clf.predict(dataset.data)#判断数据属于哪个类别
```


```py
clf.score(dataset.data,dataset.target)#准确率
```
