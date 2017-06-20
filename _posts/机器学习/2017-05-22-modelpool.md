---
layout: post
title: 机器学习模型汇总
categories: 模型
tags: 机器学习
keywords: model evaluation
description:
---
<table>
<tr><th>回归问题</th><th>分类问题</th><th>聚类问题</th></tr>
<tr>

<td>
多元线性回归<br>
多元非线性回归<br>
广义线性回归<br>
神经网络<br>
<a href='/2017/06/06/scipyleastsq.html.html'>曲线拟合</a><br>
<a href='/2017/05/22/DecisionTreeClassifier.html'>决策树(也可以做回归)</a>  
</td>

<td>
神经网络  <br>
<a href='/2017/05/07/LogisticRegression.html'>逻辑回归 </a> <br>
判别分析  <br>
朴素贝叶斯<br>
SVM      <br>
<a href='/2017/05/22/DecisionTreeClassifier.html'>决策树</a>    <br>
组合算法  <br>

</td>
<td>
<a href='/2017/06/09/cluster.html'>K-means</a><br>
系统聚类<br>
神经网络<br>
模糊C均值聚类<br>
高斯混合模型<br>

</td>

</tr>




</table>



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
- 1982
  - Hopfield
   - 引入含有对称突触连接的反馈网络，为大量的物理学家进入神经网络铺平道路，第一次清楚阐述了如何在动态的稳定网络中存储信息
  - 1983模拟退火算法    
- 1986
    - Hitton等证明了，误差反向传播可以有效解决多层网络中隐藏层的学习问题，证明了Minsky对多层神经元不存在有效学习方法的断言并不正确。
- 1988
 - Linsker   RBF    径向基网络
- 1990s    Vapnik    SVM    以一种自然方式包含了VC维数。
    - 起因是神经网络的非凸性（有多个稳态，Hopfield是比较成功的尝试）、非线性、动态性、非局部性
- Hinton深度学习算法，把神经网络带入了一个新时代。  
