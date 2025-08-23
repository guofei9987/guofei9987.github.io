---
layout: post
title: 【半监督学习】理论与实现
categories:
tags: 0x21_有监督学习
keywords: model evaluation
description:
order: 204
---

## 介绍
有时候，我们的数据是这样的：l个样本是 labeled 的，u个样本是 unlabeled，并且$l\ll u$，我们希望把u个样本也用起来。  

- **主动学习（active learning）**：先在$D_l$上训练一个模型，然后用这个模型挑选$D_u$上一个对模型改善最有帮助的样本，获取其label。这种方法优点是大幅降低标记成本。缺点是引入专家，通过外部交互来获取额外信息。
- **半监督学习（semi-supervised learning）**：不依赖外界交互，但也是用 unlabeled sample 的方法。现实中往往获取标签是昂贵的，而获取数据是廉价的，如医学影像等。


半监督学习又分两类：
- **pure semi-supervised learning** 假定 unlabeled sample 不是待预测的样本。
- **transductive learning（直推学习）** 假定 unlabeled sample 是待预测的样本


## 生成式模型
假设所有数据都是由同一个潜在模型“生成”的。高斯混合模型、朴素贝叶斯等算法都可以推广为生成式模型。

## 半监督SVM
**Semi-Supervised Support Vector Machine（半监督支持向量机）** 思路是找到这样的超平面：
1. 能将两类 labeled sample 分开
2. 穿过数据低密度区域，**“低密度分割”（low-density separation）**


### 模型
最著名的是 **TSVM（Transductive Support Vector Machine）** (针对二分类的半监督SVM方法)  
思路是对所有的 unlabeled sample 进行各种可能的标记指派（label assignment，也就是尝试对每个 unlabeled sample 作为正例或反例），然后在所有这些结果中找到间隔最大化的超平面。  

数学表示：  
给定$$D_l=\{ (x_1,y_1),(x_2,y_2),...,(x_k,y_k)\},$$  
$\min\limits_{w,b,\hat y,\xi} \dfrac{1}{2}\lVert w \rVert _2^2 + C_l\sum\limits_{i \in labeled}\xi_i+C_u\sum\limits_{i \in unlabeled}\xi_i$  
s.t.  
$y_i(w^Tx_i+b)\geq 1-\xi_i,i \in labeled$  
$\hat y_i(w^Tx_i+b)\geq1-\xi_i,i \in unlabeled$  
$\xi_i\geq,i\in labeled \cup unlabeled$  


### 算法
直接解上面这个最优化有些困难，用迭代方法来解。

## 图半监督学习
思路是把数据集映射成一个图，然后用图的分割算法。

step1：把数据集映射成一个图。其中给每个样本是一个节点，边的权重可以用样本间的相似度来体现，例如，$W_{ij}=\exp(\dfrac{-\lVert x_i-x_j \rVert _2^2}{2\sigma^2}),i\not=j$  
step2：使用LP算法，以$W_{ij}$为概率执行标签传播，并保持 labeled data 的标签不变。  
step3：重复执行step2，直到满足停止条件。

### 算法改进（效率上）
转移概率为$$\left [\begin{array}{lll}
P_{ll}&P_{lu}\\
P_{ul}&P_{uu}
\end{array}\right]$$

其中，$P_{ll},Y_l$都是事先已知的，  
算法就是 $f_u\leftarrow P_{uu}f_u+p_{ul}Y_l$  
然后上面这个迭代式还能求出解析解。$f_u=(I-P_{uu})^{-1}P_{ul}f_l$  

### 图半监督学习的实现
生成数据
```py
from sklearn import datasets
import scipy.stats as stats
import matplotlib.pyplot as plt

data,label=datasets.make_circles(n_samples=300,noise=0.1,factor=0.5)
unlabeled_idx=stats.uniform().rvs(size=len(label))

label[unlabeled_idx>0.3]=-1

data1=data[label==1]
data2=data[label==0]
data3=data[label==-1]
plt.plot(data1[:,0],data1[:,1],'.r',label='case1')
plt.plot(data2[:,0],data2[:,1],'.b',label='case2')
plt.plot(data3[:,0],data3[:,1],'.g',label='unlabeled')
plt.legend()
plt.show()
```
训练模型
```py
from sklearn.semi_supervised import LabelSpreading
label_prop_model = LabelSpreading()
label_prop_model.fit(data, label)
Y_predict=label_prop_model.predict(data)
```
结果可视化
```py
data1=data[Y_predict==1]
data2=data[Y_predict==0]
plt.plot(data1[:,0],data1[:,1],'.r',label='case1')
plt.plot(data2[:,0],data2[:,1],'.b',label='case2')
plt.legend()
plt.show()
```



## 基于分歧的方法
一个数据对象同时拥有多个 attribute set，每个attribute set 构成一个 view. 例如，要做电影分类，那么图像和声音就是两个 view  

协同训练的思路是这样的：对第一个 view 建立一个分类器，然后把最有把握的未标记数据赋予未标记，让第二个分类器去学习。然后第二个分类器做同样的操作。这个“互相学习、共同进步”  

理论显示，**如果两个试图充分且条件独立，那么用未标记数据通过协同训练可以将弱分类器的泛化性能提升到任意高**。进一步，协同训练无须多视图。

## 参考资料

周志华：《机器学习》
