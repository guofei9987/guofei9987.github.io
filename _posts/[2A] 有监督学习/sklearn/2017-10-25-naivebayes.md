---
layout: post
title: 【Naive Bayes】理论与实现
categories:
tags: 2-1-有监督学习
keywords:
description:
order: 226
---



## 简介

*Naive Bayes Classifier与Bayesian estimation是不同的概念*

朴素贝叶斯分类器(Naive Bayes Classifier,或 NBC)发源于古典数学理论，有着坚实的数学基础，以及稳定的分类效率。同时，NBC模型所需估计的参数很少，对缺失数据不太敏感，算法也比较简单。理论上，NBC模型与其他分类方法相比具有最小的误差率。但是实际上并非总是如此，这是因为NBC模型 **假设属性之间相互独立** ，这个假设在实际应用中往往是不成立的，这给NBC模型的正确分类带来了一定影响[^wangxiaochuan]。

### 优点

1. 朴素贝叶斯模型发源于古典数学理论，有着坚实的数学基础，以及稳定的分类效率。
2.  NBC模型所需估计的参数很少，对缺失数据不太敏感，算法也比较简单。

### 缺点

1. NBC模型假设属性之间相互独立，这个假设在实际应用中往往是不成立的（可以考虑降维、变量筛选、或用聚类算法先将相关性较大的属性聚类）。在属性个数比较多或者属性之间相关性较大时，NBC模型的分类效率比不上决策树模型。而在属性相关性较小时，NBC模型的性能最为良好。
2. 需要知道先验概率。
3. 分类决策存在错误率

## 推导

模型推导过程如下[^lihang]

### 变量
feature vector: $x\in \mathcal X$  
也写成: $(x^{(1)},x^{(2)},..., x^{(n)}) \in (\mathcal {X^{(1)},X^{(2)},...,X^{(n)}})$  
target: $$y\in  \mathcal Y = \{ c_1, c_2,... , c_K\}$$  


### 模型
选择0-1损失函数$$L(Y,f(X))=\left \{ \begin{array}{} 1, &Y \neq f(X)\\
0,&Y=f(X)
\end{array}\right.$$  

风险函数为$R(f)=E(L(Y,f(X)))=\sum\limits_{k-1}^K L(c_k,y)P(c_k \mid X=x)$  

风险函数最小：
$\arg\min\limits_{y \in \mathcal Y} \sum\limits_{k-1}^K L(c_k,y)P(c_k \mid X=x)$  
$=\arg\min\limits_{y \in \mathcal Y} \sum\limits_{k-1}^K P(y \neq c_k \mid X=x)$  
$=\arg\min\limits_{y \in \mathcal Y} 1- \sum\limits_{k-1}^K P(y=c_k \mid X=x)$  
$=\arg\max\limits_{y \in \mathcal Y} \sum\limits_{k-1}^K P(y=c_k \mid X=x)$  

也就是说， **风险函数最小等价于后验概率最大** 。  

### 算法  

$P(Y=c_k \mid X=x)=\dfrac{P(X=x\mid Y=c_k)P(Y=c_k)}{P(X=x)}=\dfrac{P(X_1=x_1,X_2=x_2,...X_n=x_n\mid Y=c_k)P(Y=c_k)}{P(X=x)}$  


k取不同的值的时候，找到上式取最大时的k，可以判断为新样本所属的第k类  
分母不变，所以只计算比较分子$P(X_1=x_1,X_2=x_2,...X_n=x_n\mid Y=c_k)P(Y=c_k)$  


如果Y可能取值是K个，$x^{(i)}$可能取值有$S^{(i)}$个，那么参数个数为$K\prod S^{(i)}$  
这个数字太大， **附加假设** ：**属性之间相互独立** 。也就是$X^{(1)},X^{(2)},..., X^{(n)}$ **相互独立**。  
参数个数变成$K\sum S^{(i)}$  

附加独立性假设后，分子简化为：  
$P(X_1=x_1,X_2=x_2,...X_n=x_n\mid Y=c_k)P(Y=c_k)=P(Y=c_k)\prod\limits_{i=1}^n P(X_i=x_i \mid Y=c_k)$  

$k = \arg \max\limits_{k} P(Y=c_k) \prod\limits_{i=1}^n P(X_i=x_i \mid Y=c_k)$  
k就是预测新样本所在的类。  


## Python实现


朴素贝叶斯的三个常用模型：高斯、多项式、伯努利[^2]  


### 载入数据
```py
from sklearn import datasets
dataset = datasets.load_iris()
```

### 模型训练

#### 1. 高斯
[官方网站](http://scikit-learn.org/stable/modules/generated/sklearn.naive_bayes.GaussianNB.html)  
有些特征可能是连续型变量，直接转化为离散变量不够细腻。高斯模型假设这些一个特征的所有属于某个类别的观测值符合高斯分布  
特征的条件概率满足高斯分布：  
$P(X^{(j)}\mid y=c_k)=\dfrac{1}{\sqrt {2\pi \sigma_k^2}} \exp (-\dfrac{(X^{(j)}-u_k)^2}{2\sigma_k^2})$  
```py
from sklearn.naive_bayes import GaussianNB
gnb = GaussianNB(priors=[0.1, 0.5, 0.4])
gnb.fit(dataset.data, dataset.target)
```
>GaussianNB(priors=[0.1, 0.5, 0.4])  


只有一个输入参数priors,表示先验概率，也可以省略。  

#### 2. 多项式
[官方网站](http://scikit-learn.org/stable/modules/generated/sklearn.naive_bayes.MultinomialNB.html)  
该模型常用于文本分类，特征是单词，值是单词的出现次数  
$P(X^{(j)}\mid y=c_k)=\dfrac{N_{kj}+\alpha}{N_k+\alpha n}$  
```py
mnb = MultinomialNB(alpha=1,fit_prior=False,class_prior=[0.3,0.3,0.4]) # fit_prior=True表示从样本计算先验分布，class_prior表示先验分布
```

#### 3. 伯努利
[官方网站](http://scikit-learn.org/stable/modules/generated/sklearn.naive_bayes.BernoulliNB.html)  
适用于离散特征的情况  
假定特征服从二项分布：  
$P(X^{(j)}\mid y=c_k)=pX^{(j)}+(1-p)(1-X^{(j)})$  

```py
from sklearn.naive_bayes import BernoulliNB
bnb=BernoulliNB(alpha=1)
bnb.fit(dataset.data, dataset.target)
```
>BernoulliNB(alpha=1.0, binarize=0.0, class_prior=None, fit_prior=True)

### 模型


```py
gnb.score(dataset.data,dataset.target)
gnb.priors
gnb.predict(dataset.data)
gnb.predict_proba(dataset.data)
```






## 参考资料
[^lihang]: [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)  
[^wangxiaochuan]: [王小川授课内容](https://weibo.com/hgsz2003)  
[^2]: http://blog.csdn.net/abcd1f2/article/details/51249702
