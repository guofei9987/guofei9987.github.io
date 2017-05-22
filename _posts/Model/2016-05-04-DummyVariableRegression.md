---
layout: post
title: 虚拟变量回归
categories: 模型
tags: 统计模型
keywords: model evaluation
description:
---

虚拟变量回归，又叫做哑变量回归（Dummy Variable Regression Models）  

## 虚拟变量

又叫做哑变量，Dummy Variable  
指的是取值0或1的变量，用来代表类别  
一个分类量有k个类别时，需要引入k-1个虚拟变量  


例如：  
大学有4个年级这样构造：    
$Y=a_0+a_1D_1+a_2D_2+a_3D_3+a_4X+\epsilon$  
其中，$D_1$=1是大一，否则为0.  
$D_2$代表大二，否则为0.  
$D_3$代表大三，否则为0.  

### 注意1
为什么必须用0,1变量，而不能用0,1,2,3表示多个类？   
如果用0,1,2,3 那么就只能以连续变量理解这个变量，既有大小又有刻度  

### 注意2
为什么一个分类量有k个类别时，引入k-1个Dummy Variables， 而不是k个？  
如果引入k个Dummy Variables, 将会有完全的多重共线性
$D_1+D_2+D_3+D_4=1$

## 加法模型

$Y=a_1+a_2D_1+a_3D_2+bX+u$


### 模型解释
例如，Y代表啤酒销售量，X代表收入。  
$D_1=1$代表夏季，0代表冬季  
$D_2=1$代表城市，0代表农村  

模型是这样的：  
![QQ截图20170522095008](http://i.imgur.com/82Ol9E1.png)

其特点是斜率不变  

### 加法模型的变种
引入交互作用  
$Y=a_1+a_2D_1+a_3D_2+a_4D_1D_2+bX+u$  

## 乘法模型
$Y=a_1+a_2D+b_1X+b_2DX+u$

特点是截距斜率都变化  

![QQ截图20170522100233](http://i.imgur.com/WCIfU6N.png)

### 乘法模型的变种
$Y=a_1+b_1X+b_2DX+u$

![QQ截图20170522100243](http://i.imgur.com/wYpnflg.png)

## 分段模型

$Y=a_0+b_1X+b_2(X-X^* )D+u$
其中,  
$$D=\left \{ \begin{array}{ccc}
1&X>=X*\\
0&X<X^*
\end{array}\right.$$

图像是一个折线（两条共点的线段）

## 其它虚拟变量回归模型

### Dummy Dependent Variables

dependent Variables是dummy，而independent是quantitative Variables。  
这实际上是分类模型，有大量的classifier模型可以用，例如决策树模型，SVM等等  

用OLS做这个模型，被称为`Linear probability model`
Linear probability model有诸多缺点，wikipedia总结的很好：  
>Some problems are inherent in the LPM model:
1. The regression line will not be a well-fitted one and hence measures of significance, such as R2, will not be reliable.
2. Models that are analyzed using the LPM approach will have heteroscedastic disturbances.
3. The error term will have a non-normal distribution.
4. The LPM may give predicted values of the dependent variable that are greater than 1 or less than 0. This will be difficult to interpret as the predicted values are intended to be probabilities, which must lie between 0 and 1.
5. There might exist a non-linear relationship between the variables of the LPM model, in which case, the linear regression will not fit the data accurately.

所以尽量不要用这个模型。  
为了规避这些缺点，使用logit regression,见于我的另一篇文章[逻辑回归](http://www.guofei.site/2017/05/07/LogisticRegression.html)
