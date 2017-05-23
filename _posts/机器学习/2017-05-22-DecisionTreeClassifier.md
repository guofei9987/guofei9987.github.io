---
layout: post
title: 决策树
categories: 模型
tags: 机器学习
keywords: Decision Tree Classifier
description:
---
决策树是一种强大的`有监督`数据挖掘技术，它能应用范围非常广，而且产生的模型`具有可解释性`，而且可以用来`筛选变量`。


决策树的特点：
- 每个节点两个走向
- 每个节点1个变量
- 变量可以重复使用



优点：  
- 易于理解和解释，人们都有能力理解决策树所表达的意义  
例如，收集专家的历史数据，用决策树可以总结出他的经验。  
例如，拿到别人的交易清单，可以模拟出这个交易员  
- 和其它模型相比，数据的预处理往往是不必要的。例如，不需要归一化
- 可以同时处理分类变量和连续变量。其它模型很多要求数据类型单一
- 白盒模型，可以轻松推出逻辑表达式
- 计算量少，大量数据可也以快速得出良好结果  

缺点：  
- 样本各类别数量不同时，结果更偏向于类别多的。
（除了朴素贝叶斯之外的大多数模型都存在这个问题）
- 过拟合
- 忽略自变量之间的相关性







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
$y_i \in {1,2,...K}$类标记  
N是样本容量  
### 模型
问题是找出$P(Y \mid X)$，X是表示特征的随机变量，Y是表示类的随机变量     
lost function是正则化极大似然函数     
遍历是一个NP完全问题，因此改用启发式方法近似求解   

要理解决策树算法，必须先理解2个方面的知识：信息熵和信息益增，树结构和递归  
关于信息熵，信息益增，见于我写的另一篇博客<a href='/2017/05/23/entropy.html'>信息熵</a>

### ID3(算法)
输入：训练数据集D，特征集A，阈值$\epsilon$    
输出：决策树T   

ID3递归算法：
step1：对于当前要计算的节点，找到`信息益增`最大的Feature，记为$A_g$    
step2：如果信息益增小于$\epsilon$，生成节点，把实例数最大的类作为这个节点的类，递归结束    
step3：否则，用$A_g$中的每一个可能值$\alpha_i$构建下多个子节点，递归转到每一个子节点。

### C4.5

C4.5是ID3的改进




#### step1，用信息增益率生成树

用`信息增益率`来选择属性,而不是`信息益增`

$g_R(D,A)=\dfrac{g(D,A)}{H(D)}$

其它与ID3递归算法类似


#### step2，剪枝(pruning)
引入cost function   
$C_\alpha(T)=\sum\limits_{t=1}^{\mid T \mid} N_t H_t(T)+\alpha \mid T \mid$    
where,  
$\mid T\mid$是叶节点个数     
对于T的第t个叶节点，该叶节点有$N_t$个样本，其中第k类样本个数为$N_{tk}$    
$\alpha$控制模型复杂度    

这个cost function等价于正则化的极大似然估计（不知道为什么）

剪枝算法：    
输入：step1产生的整个树T，参数$\alpha$
输出：修建后的子数$T_\alpha$
方法：
1. 扫描叶节点，$T_A$是修剪后的叶节点，如果$C_\alpha(T_A) \leq C_\alpha(T)$，那么剪枝
2. $T=T_A$,继续上一步，直到所有节点都不再能修剪为止


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

最小二乘回归树生成算法：  
这个算法的整体架构与C4.5,ID3类似，不同的是找Feature的方法不一样，并因此导致分类方法也有所调整    

先看一个节点的计算方法。假设找到第j个Feature(无论连续还是离散)，并且找到一个值s作为切分点（splitting Point），那么可以立即切分成两个区域：  
$R_1(j,s)=\{ x \mid x^{j} \leq s \}$  
$R_2(j,s)=\{ x \mid x^{j} > s \}$


求解:  
$\min\limits_{j,s}[\min\limits_{c_1}\sum\limits_{x_1 \in R_1(j,s)}(y_i-c_1)^2+\min\limits_{c_2}\sum\limits_{x_2 \in R_2(j,s)}(y_i-c_2)^2]$  



---

## python实现：

### 环境准备

用Python的sklearn做模型。为了可视化输出，进行下面的配置：

1. 安装pydotplus：  
https://github.com/carlos-jenkins/pydotplus
2. 安装graphviz（好像不必要）    
conda install graphviz

3. 安装软件graphviz，官网：  
http://www.graphviz.org/Download.php

4. 加入环境变量：
```py
import os
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz2.38/bin/'
```

### 代码
```py
from sklearn.datasets import load_iris
from sklearn import tree
iris = load_iris()
clf = tree.DecisionTreeClassifier()
clf = clf.fit(iris.data, iris.target)
```

输出
```py
tree.export_graphviz(clf,out_file="tree.doc"  )#输出到doc
```

转化为决策图，输出到pdf
```py
import pydotplus
import os
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz2.38/bin/'
dot_data = tree.export_graphviz(clf, out_file=None)
graph = pydotplus.graph_from_dot_data(dot_data)
graph.write_pdf("iris.pdf")
```

把决策图画出来
```py
from IPython.display import Image  
dot_data = tree.export_graphviz(clf, out_file=None,
                         feature_names=iris.feature_names,  
                         class_names=iris.target_names,  
                         filled=True, rounded=True,  
                         special_characters=True)  
graph = pydotplus.graph_from_dot_data(dot_data)  
Image(graph.create_png())  
```
