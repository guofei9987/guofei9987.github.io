---
layout: post
title: 【Decision Tree】理论与实现
categories:
tags: 2有监督学习
keywords: Decision Tree Classifier
description:
---


## 简介
决策树是一种强大的`有监督`数据挖掘技术，它能应用范围非常广，而且产生的模型`具有可解释性`，而且可以用来`筛选变量`。[^wangxiaochuan]


决策树的特点：
- 每个节点两个走向
- 每个节点1个变量
- 变量可以重复使用



优点：  
- 易于理解和解释，人们都有能力理解决策树所表达的意义  
例如，收集专家的历史数据，用决策树可以总结出他的经验。  
例如，拿到别人的交易清单，可以模拟出这个交易员  
- 和其它模型相比，数据的预处理往往是不必要的。例如，不需要归一化，也不用填充空值
- 可以同时处理分类变量和连续变量。其它模型很多要求数据类型单一
- 白盒模型，可以轻松推出逻辑表达式
- 计算量少，大量数据可也以快速得出良好结果  
- 可以对有许多属性的数据集构造决策树。（有变量筛选功能）
- 决策树可很好地扩展到大型数据库中，同时它的大小独立于数据库的大小。


缺点：  
- 样本各类别数量不同时，结果更偏向于类别多的。
（除了朴素贝叶斯之外的大多数模型都存在这个问题）
- 过拟合
- 忽略自变量之间的相关性（因为每个节点只能选取1个feature）

用途：  
- 既可以做分类，也可以做回归
- 有监督
- 也可以用于变量筛选





## 理论推导

Quinlan在1986年提出ID3,1993年提出C4.5  
Breiman在1984年提出CART算法



### 定义
决策树是由node和directed edge组成  
其中node有两种：   
- internal node表示一个特征或属性  
- leaf node 表示一个类  


决策树有一个重要性质：互斥且完备。意思是每个case都被一条路径覆盖，并且只被一条路径覆盖  

### 输入数据
给定的数据是$D=\{(x_1,y_1),(x_2,y_2),...(x_N,y_N) \}$  
其中，  
$x_i=(x_i^{(1)},x_i^{(2)},...,x_i^{(n)})$是一个样本,有n个维度  
$y_i \in \{ 1,2,...K \} $类标记  
N是样本容量  

### 模型[^lihang]

问题是找出$P(Y \mid X)$，X是表示特征的随机变量，Y是表示类的随机变量     
lost function是正则化极大似然函数     
遍历是一个NP完全问题，因此改用启发式方法近似求解   

要理解决策树算法，必须先理解2个方面的知识：  
其一是： `信息熵`和`信息益增`，  
其二是： `树结构`和`递归`  

关于信息熵，信息益增，见于我写的一篇博客<a href='/2017/05/23/entropy.html'>信息熵</a>

关于树结构，见于我写的另一篇博客<a href='/2017/05/18/algorithm2.html'>Graph&Tree</a>



### ID3(算法)

*注：很多材料给出的算法包含很多步，这里把一些不会分开的步放到了一起，看起来比较简洁*

输入：训练数据集D，特征集A，阈值$\epsilon$    
输出：决策树T   

ID3递归算法：  
step1：对于当前要计算的节点，找到`信息益增`最大的Feature，记为$A_g$    
step2：如果信息益增小于$\epsilon$，生成节点，把实例数最大的类作为这个节点的类，递归结束    
step3：否则，用$A_g$中的每一个可能值$\alpha_i$构建下多个子节点，递归转到每一个子节点。

### C4.5

C4.5是ID3的改进，在ID3的基础上增加一个步骤：剪枝。

#### part1，用信息增益率生成树

算法：
第一步与ID3算法类似，只有一个区别：  
用`信息增益率`来选择属性,而不是`信息益增`  

信息益增率定义为$g_R(D,A)=\dfrac{g(D,A)}{H(D)}$
（详见相关博客<a href='/2017/05/23/entropy.html#title3'>信息熵</a>）  

step1：对于当前要计算的节点，找到`信息益增率`最大的Feature，记为$A_g$    
step2：如果信息益率增小于$\epsilon$，生成节点，把实例数最大的类作为这个节点的类，节点变成叶节点，递归结束    
step3：否则，用$A_g$中的每一个可能值$\alpha_i$构建下多个子节点，递归转到每一个子节点。    

#### part2，剪枝(pruning)
引入cost function   
$C_\alpha(T)=\sum\limits_{t=1}^{\mid T \mid} N_t H_t(T)+\alpha \mid T \mid$    
where,  
$\mid T\mid$是叶节点个数     
对于T的第t个叶节点，该叶节点有$N_t$个样本，其中第k类样本个数为$N_{tk}$    
$\alpha$控制模型复杂度    
这个cost function等价于正则化的极大似然估计   

<br>

剪枝算法：    
输入：part1产生的整个树T，参数$\alpha$      
输出：修建后的子数$T_\alpha$    
方法：
1. 扫描叶节点，$T_A$是修剪后的叶节点，如果$C_\alpha(T_A) \leq C_\alpha(T)$，那么剪枝
2. $T=T_A$,继续上一步，直到所有节点都不再能修剪为止

<br>

C4.5的特点：
1. 能够完成对连续属性的离散化处理；
2. 能够对不完整数据进行处理。
3. 其缺点是：在构造树的过程中，需要对数据集进行多次的顺序扫描和排序，因而导致算法的低效。
4. C4.5只适合于能够驻留于内存的数据集，当训练集大得无法在内存容纳时程序无法运行。
5. 生成是局部选择，剪枝是全局选择  


### CART
特点：
- 二叉树，左支代表是，右支代表否
- 既可以用于分类，也可以用于回归

#### 最小二乘回归树生成算法  
这个算法的整体架构与C4.5,ID3类似，不同的是找Feature的方法不一样，并因此导致分类方法也有所调整    

先看一个节点的计算方法。假设找到第j个Feature(无论连续还是离散)，并且找到一个值s作为切分点（splitting Point），那么可以立即切分成两个区域：  
$$R_1(j,s)=\{ x \mid x^{j} \leq s \}$$  
$$R_2(j,s)=\{ x \mid x^{j} > s \}$$


求解:  
$$\min\limits_{j,s}\bigg[\min\limits_{c_1}\sum\limits_{x_1 \in R_1(j,s)}(y_i-c_1)^2+\min\limits_{c_2}\sum\limits_{x_2 \in R_2(j,s)}(y_i-c_2)^2\bigg]$$  

#### CART生成算法
引入一个概念，`gini index`  
$Gini(X)=\sum_{k=1}^K p_k(1-p_k)$   
这个概念与entropy有很大的相似度，也有类似的一组概念   
`特征A下，集合D的gini index`定义为：    
$Gini(D,A)=\dfrac{\mid D_1 \mid}{\mid D\mid}Gini(D_1)+\dfrac{\mid D_2 \mid}{\mid D\mid }Gini(D_2)$（与conditonal entropy相似的概念）    
where,  
$D_1,D_2$是被$A=\alpha$分割后的集合

算法流程与前面的ID3,,C4.5基本一致，不同的是，要选择Feature，分割$A=\alpha$，使得Gini 最小（对比ID3的信息益增最大等价于条件信息熵最小）  

方法：  
step1：对于当前要计算的节点，找到`gini index`最小的Feature和划分$A=\alpha$      
step2：如果样本数量小于阈值，或者`gini index`小于阈值$\epsilon$，生成节点，把实例数最大的类作为这个节点的类，节点变为叶节点，递归结束    
step3：否则，构建子节点，递归转到每一个子节点。     

#### CART剪枝算法

与C4.5类似，引入loss function    
$C_\alpha(T)=C(T)+\alpha\mid T\mid$    
step1: 改变$\alpha$，例如,排序的$0,\alpha_1,\alpha_2,...,+\infty$可以得到一组子树:$$\{ T_0,T_1,...T_n \}$$。    
找到这组子树的算法的复杂度并不高，这是因为剪掉每个节点损失的函数值可以一次性计算出来$$g(t)=\dfrac{C(t)-C(T_t)}{\mid T_t \mid -1}$$    
step2: 用交叉比较的方法找到$T_0,T_1,...T_n$中最优的。     




---

## python实现：

### 环境准备

用Python的sklearn做模型。    
sklearn的一个缺点：`pruning not currently supported`。只实现了pre-pruning   


1. 安装graphviz   
conda install graphviz

2. 安装软件graphviz，官网：  
http://www.graphviz.org/Download.php

### 代码

#### step1：做出模型
```py
from sklearn import datasets
dataset=datasets.load_iris()

from sklearn import tree
clf=tree.DecisionTreeClassifier()
clf=clf.fit(dataset.data,dataset.target)
```

#### step2：把规则输出

```py
tree.export_graphviz(clf,out_file="tree.doc"  )#输出到doc
```

#### step3：规则可视化

```py
import graphviz
import os
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz2.38/bin/'
dot_data = tree.export_graphviz(clf, out_file=None,feature_names=dataset.feature_names,  class_names=dataset.target_names,filled=True, rounded=True,special_characters=True)#参数是配置颜色等
graph = graphviz.Source(dot_data)
graph.view('hehe.pdf')
graph.save('abc.pdf')
graph#在jupyter中有用
```

结果：  
<img src='http://www.guofei.site/public/postimg/decisiontree1.png'>

预测  
```py
clf.predict(train_data)#判断数据属于哪个类别
clf.predict_proba(train_data)#判断属于各个类别的概率
clf.feature_importances_#变量重要性指标，各个属性的gini系数归一化后的值
#例如，print(pd.DataFrame(list(zip(data.columns,clf.feature_importances_))))
```

## 用CART拟合的例子
由于使用的是gini idex生成决策树，因此y可以是连续变量，所以可以做拟合。  
先用模拟法生成数据  
```py
import numpy as np
from sklearn.tree import DecisionTreeRegressor

x=np.linspace(0,10,90)
x.shape=-1,1
y=np.sin(x)+np.random.normal(size=x.shape)*0.5
```
模型的输入是一维的连续变量  
<img src='http://www.guofei.site/public/postimg/decisiontree2.png'>


下面是拟合并作图
```py
clf=DecisionTreeRegressor(max_depth=4)
clf.fit(x,y)
ynew=clf.predict(x)

import matplotlib.pyplot as plt
plt.plot(x,y,'.')

plt.show()

plt.plot(x,y,'.')
plt.plot(x,ynew)
plt.show()
```

<img src='http://www.guofei.site/public/postimg/decisiontree3.png'>



## 后注（备用）
### DecisionTreeClassifier的参数

#### Parameters

```
criterion : string, optional (default="gini")
    The function to measure the quality of a split. Supported criteria are
    "gini" for the Gini impurity and "entropy" for the information gain.

splitter : string, optional (default="best")
    The strategy used to choose the split at each node. Supported
    strategies are "best" to choose the best split and "random" to choose
    the best random split.

max_depth : int or None, optional (default=None)
    The maximum depth of the tree. If None, then nodes are expanded until
    all leaves are pure or until all leaves contain less than
    min_samples_split samples.

min_samples_split : int, float, optional (default=2)
    The minimum number of samples required to split an internal node:

    - If int, then consider `min_samples_split` as the minimum number.
    - If float, then `min_samples_split` is a percentage and
      `ceil(min_samples_split * n_samples)` are the minimum
      number of samples for each split.

    .. versionchanged:: 0.18
       Added float values for percentages.

min_samples_leaf : int, float, optional (default=1)
    The minimum number of samples required to be at a leaf node:

    - If int, then consider `min_samples_leaf` as the minimum number.
    - If float, then `min_samples_leaf` is a percentage and
      `ceil(min_samples_leaf * n_samples)` are the minimum
      number of samples for each node.

    .. versionchanged:: 0.18
       Added float values for percentages.

min_weight_fraction_leaf : float, optional (default=0.)
    The minimum weighted fraction of the sum total of weights (of all
    the input samples) required to be at a leaf node. Samples have
    equal weight when sample_weight is not provided.

max_features : int, float, string or None, optional (default=None)
    The number of features to consider when looking for the best split:

        - If int, then consider `max_features` features at each split.
        - If float, then `max_features` is a percentage and
          `int(max_features * n_features)` features are considered at each
          split.
        - If "auto", then `max_features=sqrt(n_features)`.
        - If "sqrt", then `max_features=sqrt(n_features)`.
        - If "log2", then `max_features=log2(n_features)`.
        - If None, then `max_features=n_features`.

    Note: the search for a split does not stop until at least one
    valid partition of the node samples is found, even if it requires to
    effectively inspect more than ``max_features`` features.

random_state : int, RandomState instance or None, optional (default=None)
    If int, random_state is the seed used by the random number generator;
    If RandomState instance, random_state is the random number generator;
    If None, the random number generator is the RandomState instance used
    by `np.random`.

max_leaf_nodes : int or None, optional (default=None)
    Grow a tree with ``max_leaf_nodes`` in best-first fashion.
    Best nodes are defined as relative reduction in impurity.
    If None then unlimited number of leaf nodes.

min_impurity_decrease : float, optional (default=0.)
    A node will be split if this split induces a decrease of the impurity
    greater than or equal to this value.

    The weighted impurity decrease equation is the following::

        N_t / N * (impurity - N_t_R / N_t * right_impurity
                            - N_t_L / N_t * left_impurity)

    where ``N`` is the total number of samples, ``N_t`` is the number of
    samples at the current node, ``N_t_L`` is the number of samples in the
    left child, and ``N_t_R`` is the number of samples in the right child.

    ``N``, ``N_t``, ``N_t_R`` and ``N_t_L`` all refer to the weighted sum,
    if ``sample_weight`` is passed.

    .. versionadded:: 0.19

min_impurity_split : float,
    Threshold for early stopping in tree growth. A node will split
    if its impurity is above the threshold, otherwise it is a leaf.

    .. deprecated:: 0.19
       ``min_impurity_split`` has been deprecated in favor of
       ``min_impurity_decrease`` in 0.19 and will be removed in 0.21.
       Use ``min_impurity_decrease`` instead.

class_weight : dict, list of dicts, "balanced" or None, default=None
    Weights associated with classes in the form ``{class_label: weight}``.
    If not given, all classes are supposed to have weight one. For
    multi-output problems, a list of dicts can be provided in the same
    order as the columns of y.

    Note that for multioutput (including multilabel) weights should be
    defined for each class of every column in its own dict. For example,
    for four-class multilabel classification weights should be
    [{0: 1, 1: 1}, {0: 1, 1: 5}, {0: 1, 1: 1}, {0: 1, 1: 1}] instead of
    [{1:1}, {2:5}, {3:1}, {4:1}].

    The "balanced" mode uses the values of y to automatically adjust
    weights inversely proportional to class frequencies in the input data
    as ``n_samples / (n_classes * np.bincount(y))``

    For multi-output, the weights of each column of y will be multiplied.

    Note that these weights will be multiplied with sample_weight (passed
    through the fit method) if sample_weight is specified.

presort : bool, optional (default=False)
    Whether to presort the data to speed up the finding of best splits in
    fitting. For the default settings of a decision tree on large
    datasets, setting this to true may slow down the training process.
    When using either a smaller dataset or a restricted depth, this may
    speed up the training.
```
#### Attributes
```
classes_ : array of shape = [n_classes] or a list of such arrays
    The classes labels (single output problem),
    or a list of arrays of class labels (multi-output problem).

feature_importances_ : array of shape = [n_features]
    The feature importances. The higher, the more important the
    feature. The importance of a feature is computed as the (normalized)
    total reduction of the criterion brought by that feature.  It is also
    known as the Gini importance [4]_.

max_features_ : int,
    The inferred value of max_features.

n_classes_ : int or list
    The number of classes (for single output problems),
    or a list containing the number of classes for each
    output (for multi-output problems).

n_features_ : int
    The number of features when ``fit`` is performed.

n_outputs_ : int
    The number of outputs when ``fit`` is performed.

tree_ : Tree object
    The underlying Tree object.
```

### 可视化输入方法（备用）
为了可视化输出，还需要进行下面的配置：

1. 安装pydotplus：  
https://github.com/carlos-jenkins/pydotplus
2. 安装graphviz   
conda install graphviz

3. 安装软件graphviz，官网：  
http://www.graphviz.org/Download.php

4. 加入环境变量：
```py
import os
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz2.38/bin/'
```

备用方法1：转化为决策图，输出到pdf
```py
import pydotplus
import os
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz2.38/bin/'
dot_data = tree.export_graphviz(clf, out_file=None)
graph = pydotplus.graph_from_dot_data(dot_data)
graph.write_pdf("iris.pdf")
```

备用方法2  
```py
from IPython.display import Image  
dot_data = tree.export_graphviz(clf, out_file=None,feature_names=iris.feature_names,  class_names=iris.target_names,filled=True, rounded=True,special_characters=True)  
graph = pydotplus.graph_from_dot_data(dot_data)  
Image(graph.create_png())  
```

## 参考文献

[^wangxiaochuan]: [王小川授课内容](https://weibo.com/hgsz2003)  
[^lihang]: [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)
