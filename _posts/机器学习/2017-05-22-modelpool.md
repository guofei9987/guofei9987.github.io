---
layout: post
title: 机器学习模型汇总
categories: 算法
tags: 机器学习
keywords: model evaluation
description:
---
<table>
<tr><th>回归问题</th><th>分类问题</th><th><a href='/2017/09/29/cluster.html'>聚类问题</a></th></tr>
<tr>

<td>
多元线性回归<br>
多元非线性回归<br>
广义线性回归<br>
神经网络<br>
<a href='/2017/06/06/scipyleastsq.html'>曲线拟合</a><br>
<a href='/2017/05/22/DecisionTreeClassifier.html'>决策树(也可以做回归)</a>  
</td>

<td>
神经网络  <br>
<a href='/2017/05/07/LogisticRegression.html'>逻辑回归 </a> <br>
判别分析  <br>
朴素贝叶斯<br>
<a href='/2017/09/28/svm.html'>SVM </a>     <br>
<a href='/2017/05/22/DecisionTreeClassifier.html'>决策树</a>    <br>
<a href='/2017/10/06/bagingboosting.html'>组合算法</a>  <br>

</td>
<td>
<a href='/2017/06/09/cluster.html'>K-means</a><br>
<a href='/2017/09/30/hierachicalcluster.html'>系统聚类</a><br>
神经网络<br>
模糊C均值聚类<br>
高斯混合模型<br>

</td>

</tr>




</table>




### 神经网络的缺点：  
网络结构选择、过学习、欠学习以及局部最小值问题

### 聚类的特点

- 对象：静态数据； 
- 过程：以某种方式分组； 
- 结果：同一集合中的元素相异度尽可能小，不同集合中的元素相异度尽可能大； 
- 特点：集合特点在划分之前不给定，无监督学习。



在许多时候分类条件不满足，尤其是处理海量数据时，如果通过预处理使数据满足分类算法的要求，代价巨大，应考虑聚类算法



## 神经网络是一组模型

<table>
<tr><th>回归问题</th><th>分类问题</th><th>聚类问题</th></tr>
<tr>

<td>
BP<br>
RBF<br>
ELMAN<br>
...<br>

</td>

<td>
BP <br>
PNN（概率神经网络） <br>
... <br>

</td>
<td>
SOM(自组织映射)<br>
...<br>
</td>

</tr>


</table>

### 神经网络的发展历史

- 1949  
    - Hebb  
    - 《The Organization of Behavior》  
    - （人脑）学习假说：两个神经元之间的重复激活，将使其连接权值得到加强  
- 1952  
    - Ashby  
- 1957  
    - Rosenblatt  
    - Perception，感知机收敛定理  
    - Widrow-Hoff法则：最小均方误差原理（LMS）  
- 1969  
    - Minsky&Papert  
        - 《Perception》  
        - 从数学上证明了感知机处理能力有限，无法解决异或；多层感知机无法克服这种局限性。神经网络淡出人类视线  
- 1972  
    - Teuvo&James
        - 用于记忆的神经网络
    - Amari  
        - 神经元附加模型  
   - Wilson&Cowan  
        - （数学）兴奋和抑制模型神经元空间局部化的群体动力学耦合非线性微分方程
- 1977
  - Anderson Silverstein
   - 盒中脑（BSB）模型
- 1980
    - Grosserg
        - ART理论：包括自下而上的认知层和自上而下的生成层
- 1981
    - Kohen：自组织神经网络
- 1982
    - Hopfield
    - 引入含有对称突触连接的反馈网络，为大量的物理学家进入神经网络铺平道路，第一次清楚阐述了如何在动态的稳定网络中存储信息
    - 让人们重新认识了神经网络，掀起神经网络研究的热潮
    - 1983模拟退火算法    
- 1986
    - Hitton等证明了，误差反向传播可以有效解决多层网络中隐藏层的学习问题，证明了Minsky对多层神经元不存在有效学习方法的断言并不正确。
    - BP
- 1988
    - Linsker   RBF    径向基网络
- 1990s    
    - Vapnik    
        - SVM    以一种自然方式包含了VC维数。
    - 起因是神经网络的以下特性：
        - 非凸性（有多个稳态，Hopfield是比较成功的尝试）
        - 非线性（线性不可分割问题，RBF解决）
        - 动态性（算法需要有自学习、自组织、自适应能力。神经网络源于大量训练数据，通过权重调整使网络学习出数据内在规律，迭代式基本算法框架）
        - 非局部性（系统的行为不取决于单个神经网络的特征，而是由神经元之间的相互作用、相互连接所决定的）
- 2006
    - Hinton深度学习算法，把神经网络带入了一个新时代。  
