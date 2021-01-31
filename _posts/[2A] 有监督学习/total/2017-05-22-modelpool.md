---
layout: post
title: 机器学习模型汇总
categories:
tags: 2-1-有监督学习
keywords: model evaluation
description:
order: 200
---

## 分类

### 按照被解释变量分类

<table>
<tr><th>回归问题</th><th>分类问题</th><th><a href='/2017/09/29/cluster.html'>聚类问题</a></th><th>降维问题</th></tr>
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

<a href='/2017/10/21/mlp.html'>神经网络 </a> <br>
<a href='/2017/05/07/LogisticRegression.html'>逻辑回归 </a> <br>
<a href='/2017/10/23/perceptron.html'>感知机 </a> <br>
<a href='/2017/07/18/probit.html'>probit模型 </a> <br>
<a href='/2017/10/24/knn.html'>KNN</a> <br>
判别分析  <br>
<a href='/2017/10/25/naivebayes.html'>朴素贝叶斯</a> <br>
<a href='/2017/09/28/svm.html'>SVM </a>     <br>
<a href='/2017/05/22/DecisionTreeClassifier.html'>决策树</a>    <br>
<a href='/2017/10/06/bagingboosting.html'>bagging</a>  <br>
<a href='/2017/10/06/bagingboosting.html'>boosting</a>  <br>
<a href='/2017/10/20/randomforest.html'>随机森林 </a> <br>
<a href='/2017/11/11/hiddenmarkov.html'>隐马尔科夫模型 </a> <br>
<a href='/2017/11/13/conditionalrandomfield.html'>条件随机场 </a> <br>
</td>
<td>
<a href='/2017/06/09/cluster.html'>K-means</a><br>
<a href='/2017/09/30/hierachicalcluster.html'>系统聚类</a><br>
神经网络<br>
模糊C均值聚类<br>
<a href='/2017/11/28/dbscan.html'>DBSCAN </a> <br>
<a href='/2017/11/10/gmm.html'>高斯混合模型 </a> <br>


</td>



<td>
<a href='/2017/10/12/pca.html'>PCA </a> <br>
<a href='/2017/10/13/factor.html'>FA </a> <br>
<a href='/2017/11/27/ica.html'>ICA </a> <br>
<a href='/2017/11/25/mds.html'>MDS </a> <br>




</td>
</tr>

</table>

[大图](https://www.guofei.site/StatisticsBlog/sklearn_有监督.htm)
<iframe src="https://www.guofei.site/StatisticsBlog/sklearn_有监督.htm" width="100%" height="1000em" marginwidth="10%"></iframe>

[大图](https://www.guofei.site/StatisticsBlog/sklearn_降维.htm)
<iframe src="https://www.guofei.site/StatisticsBlog/sklearn_降维.htm" width="100%" height="1000em" marginwidth="10%"></iframe>

[大图](https://www.guofei.site/StatisticsBlog/sklearn_聚类.htm)
<iframe src="https://www.guofei.site/StatisticsBlog/sklearn_聚类.htm" width="100%" height="1000em" marginwidth="10%"></iframe>

### 按照问题分类

- 有监督学习supervised learning
- 无监督学习unsupervised learning
- 半监督学习semi-supervised learning
- 强化学习reinforcement

#### 有监督学习

input space&output space
: 输入与输出所有可能取值的集合


instance
: 每个具体的输入

feature vector
: 每个instance的表示


sample
: 输入输出对


## 三要素

模型+策略+方法  

### 1. 模型

假设空间通常可以定义为: $$\mathscr{F}=\{ f \mid Y=f(X) \}$$  
通常可以写为$$\mathscr{F}=\{ f \mid Y=f_\theta(X) ,\theta \in R^n\}$$  


假设空间也可以定义为: $$\mathscr{F}=\{ P \mid P(Y\mid X) \}$$  
通常可以写为$$\mathscr{F}=\{ P \mid P_\theta(Y\mid X) , \theta \in R^n \}$$  

### 2. 策略

有了模型的假设空间，这一步需要考虑按什么样的准则学习或选择最优模型。  

#### 2.1 loss function

loss function 又叫做 cost function， 一般形式是$L(Y,f(X))$  

通常有以下几种：  


0-1 loss function
: 定义为$$L(Y,f(X))=\left \{ \begin{array}{} 1, &Y \neq f(X)\\
0,&Y=f(X)
\end{array}\right.$$


quadratic loss function
: 定义为$$L(Y,f(X))=(Y-f(X))^2$$  

absolute loss function
: 定义为$$L(Y,f(X))=\mid Y-f(X) \mid$$

logarithmic loss function
: 定义为$$L(Y,P(Y \mid X))=-\log P(Y \mid X)$$  




我们希望loss function的期望越小越好

$R(f)=E(L(Y,f(X)))=\int_{\mathscr{X \times Y}} L(y,f(x))P(x,y)dx dy$  
称为 **risk function**， 或者 **expected loss**  

当然，$R(f)$不能直接计算，我们使用数据来估计：  
$R_{emp}=1/N \sum L(y_i,f(x_i))$  
称为 **empirical risk** , 或者 **empirical loss**  



MLE(maximum likelihood estimation)就是经验风险最小化的一个例子。  



#### 2.2 结构风险最小化


**结构风险最小化(structural risk minimization,SRM)**  

是为了防止过拟合而提出的策略  

$R_{SRM}=1/N \sum L(y_i,f(x_i))+\lambda J(f)$  

其中$J(f)$是模型的复杂度。  

### 3. 算法

为了得到上面的最小化，用不同的算法找出最优。  
需要考虑算法效率等，有时也会根据需要，发展处独自的最优化算法。  


## 数据
数据的集合叫做 data set，  
每条记录成为一个 instance 或者 sample  
反映对象的每个性质叫做 attribute 或者 feature  
attribute 的取值，称为 attribute value  
属性张成的空间叫做 attribute space、 sample space  


从数据中学的模型的过程称为 learning 或 training  
训练时用的数据称为 training data，其中每个样本称为 training sample  


## 无免费午餐定理
假设样本空间$\mathcal{X}$和假设空间$\mathcal{H}$都是离散的  
$P(h\mid X,\mathscr Z_a)$代表算法$\mathscr Z_a$基于训练集$X$产生假设$h$的概率，  
$f$是真实目标函数，$I(\cdot)$是指示函数，自变量为真时取1，否则取0  

定义“训练集外误差”为$E_{ote}(\mathscr Z_a \mid X,f)=\sum\limits_h \sum\limits_{x\in \mathcal X -X} P(x) I(h(x) \not=f(x))P(h\mid X,\mathscr Z_a)$  


考虑二分类问题$$\mathcal X \to \{ 0,1\}$$,函数空间为$$\{0,1\}^{\mid \mathcal X \mid}$$，对所有可能的f，按照均匀分布对误差求和  
$\sum\limits_f E_{ote}(\mathscr Z_a \mid X,f)=...=2^{\mid \mathcal X \mid -1}\sum\limits_{x\in \mathcal X-X}P(x)$

### 多分类
可以用多个二分类学习方法进行多分类学习，主要有3种策略
1. One vs One (OvO) 按类别进行两两配对，从训练 N(N-1)/2 个分类器，最终结果由投票来获得
2. One vs Rest (OvR) 每个类作为正例，其它类作为反例，训练N个分类器，最终某个数据属于哪一类，取决于N个分类器中，预测正例置信度最大的那个分类器
3. Many vs Many (MvM) 若干类为正例，若干类为反例，OvO 和 OvR 都是 MvM的特殊情况


### 类别不平衡问题
- 降采样（undersampling）:对过多的那一类，进行降采样。  
典型算法是 EasyEnsemble ，这种算法将少的那一类划分为不同的集合，供不同的学习器使用，这样每个分类器类别均衡且整体不丢失信息。
- 升采样（oversampling）：对于过少的那一类，进行复制。典型算法拾 SMOTE ，对少的那一类利用插值来增加数量。
- 阈值移动（threshold-moving），直接用原始数据进行预测，然后执行$\dfrac{y'}{1-y'}=\dfrac{y}{1-y}\dfrac{m^-}{m^+}$



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
