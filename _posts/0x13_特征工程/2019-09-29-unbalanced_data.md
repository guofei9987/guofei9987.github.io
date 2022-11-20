---
layout: post
title: Unbalanced Data
categories:
tags: 0x13_特征工程
keywords:
description:
order: 100
---

背景就不说了，数据不均衡是常态，做分类模型时不得不认真处理。  
基本上有这几个策略：
1. 增加数据。很多其它问题也都能用这个方法解决，但成本太高，不多提了。
2. Oversampling，有很多变种
3. Undersampling，也有很多变种
4. 划分训练集
5. 算法层面
    - 改变 cost function. sklearn 很多方法可以输入 weights 参数，实际上就是改变 cost function，让稀有类的权重增加。
    - 使用可以处理不平衡问题的模型，如 朴素贝叶斯。有材料说 决策树 也可以？我表示怀疑，回头试试。
    - 吴恩达的神经网络课程上讲过一个方法。对于可以重复训练的模型，把多数类分割成多个部分，每部分都和稀有类结合起来去训练模型。
    - 【TODO: 这一部分以后补充，因为很有用且重要】考虑不同误分类情况代价的差异性对算法进行优化，主要是基于代价敏感学习算法(Cost-Sensitive Learning)，代表的算法有adacost；
    - 不平衡数据集的问题考虑为一分类（One Class Learning）或者异常检测（Novelty Detection）问题，代表的算法有One-class SVM。 `sklearn.svm.OneClassSVM`


## 2. over sampling
https://github.com/scikit-learn-contrib/imbalanced-learn  
https://pypi.org/project/imbalanced-learn/

### 数据准备
```python
from sklearn.datasets import make_classification
from collections import Counter

X, y = make_classification(n_samples=100, weights=[0.2, 0.8])
```

### RandomOverSampler
简单的复制
```python
from imblearn import over_sampling
osamp = over_sampling.RandomOverSampler(random_state=0)
X_resampled, y_resampled = osamp.fit_sample(X, y)
Counter(y_resampled)
```

- 优点：简单
- 缺点：小众样本复制多份，一个点会在高维空间中反复出现。导致过拟合，或者运气好就能分对很多点，否则分错很多点。

### SMOTE
```python
from imblearn import over_sampling
osamp = over_sampling.SMOTE(kind='regular',k_neighbors=2)
X_resampled, y_resampled = osamp.fit_sample(X, y)
Counter(y_resampled)
```
随机选取少数类的样本，在该样本与最邻近的样本的连线上随机取点，生成无重复的新的稀有类样本。

- kind='regular'
- kind='borderline1', kind='borderline2'关注在最优化决策函数边界的一些危险样本
- kind='svm' 使用支持向量机分类器产生支持向量然后再生成新的少数类样本。


缺点：
- 增加了类之间重叠的可能性（由于对每个少数类样本都生成新样本，因此容易发生生成样本重叠(Overlapping)的问题），
- 生成一些没有提供有益信息的样本。


### ADASYN

关注的是在那些基于KNN分类器被错误分类的原始样本附近生成新的少数类样本

```python
from imblearn import over_sampling
osamp = over_sampling.ADASYN()
X_resampled, y_resampled = osamp.fit_sample(X, y)
Counter(y_resampled)
```

## 3. under sampling

```python
usap = under_sampling.RandomUnderSampler()
X_resampled, y_resampled = usap.fit_sample(X, y)
Counter(y_resampled)
```
功能挺多，`replacement = True` 有放回抽样，结果会有重复，默认 `replacement = False`

- 启发式规则做降采样  `under_sampling.NearMiss(version=1)` version = 1, 2, 3 有3种启发式规则
- 用近邻算法进行降采样 `under_sampling.EditedNearestNeighbours()` 绝大多数(kind_sel='mode')或者全部(kind_sel='all')的近邻样本都属于同一个类，这些样本会被保留在数据集中
- 在EditedNearestNeighbours基础上, 延伸出了RepeatedEditedNearestNeighbours算法和ALLKNN算法，前者重复基础的EditedNearestNeighbours算法多次，后者在进行每次迭代的时候，最近邻的数量都在增加。
- `under_sampling.ClusterCentroids()` 不是从原始数据集中直接抽取数据，每一个类别的样本都会用K-Means算法的中心点来进行合成。

## over Sampling + under sampling



## 参考资料
https://www.cnblogs.com/kamekin/p/9824294.html
https://www.jianshu.com/p/2149d94963cc  
https://github.com/scikit-learn-contrib/imbalanced-learn
