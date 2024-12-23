---
layout: post
title: 参数估计
categories:
tags: 0x42_概率论
description:
order: 424
---

## 点估计
### 距估计
1900年 Karl Pearson 提出的一种点估计方法。  

思路就是假设随机样本的k阶距，等于总体的k阶距
### 最大似然估计
1922年 R.A.Fisher 提出的一种参数估计方法

### 评价标准
对一个未知参数$\theta$，可以构造很多个估计量，哪一个最好呢？我们需要一套评价标准

$\hat \theta=\psi(X_1,...,X_n)$
- 无偏性 (bias)，对于有限的样本，估计量所符合的分布之期望等于参数真实值 $E\hat\theta=\theta$
- 有效性(efficiency)，估计值所满足的分布方差越小越好，$Var(\theta_1)\leq Var(\theta_2)$，对一切$\theta$成立，那么$\theta_1$更为有效
    - 均方误意义下的有效性 $E(\hat\theta_1-\theta)^2\leq E(\hat\theta_2-\theta)^2$
- **相合性**(consistency)，当样本数量趋于无穷时，估计量收敛于参数真实值 $\lim\limits_{n\to \infty}P(\mid \hat \theta_n-\theta\mid \geq \varepsilon)=0$


## 区间估计

定义:  
确定两个统计量$\hat\theta_L=\psi_1(X_1,...,X_n), \hat\theta_R=\psi_2(X_1,...,X_n)$，使得：  
$P(\hat\theta_L\leq \theta\leq\hat\theta_R)\geq1-\alpha,\forall \theta \in \Theta$

### 区间估计的例子
下面例子都在正态分布上(只写一个的推导过程)

#### 1. 总体方差已知，均值的区间估计
$(\bar X-z_{1-\alpha/2} \dfrac{\sigma}{\sqrt n},\bar X+z_{1-\alpha/2} \dfrac{\sigma}{\sqrt n})$

推导要点：  
我们想找到连个统计量$\hat u_L=\psi_1(X_1,...,X_n), \hat u_R=\psi_2(X_1,...,X_n)$，  
使得 $P(\hat u_L\leq u \leq \hat u_R)\geq 1-\alpha$  
然后，得到$P(\dfrac{\bar X-\hat u_R}{\sigma/\sqrt n} \leq \dfrac{\bar X- u}{\sigma/\sqrt n} \leq \dfrac{\bar X-\hat u_L}{\sigma/\sqrt n})\geq 1-\alpha$  
再推导一步就得到结果啦。


#### 2. 总体方差未知，均值的区间估计

小样本场合 $(\bar X-t_{1-\alpha/2} \dfrac{\sigma}{\sqrt n},\bar X+t_{1-\alpha/2} \dfrac{\sigma}{\sqrt n})$

大样本场合 $(\bar X-z_{1-\alpha/2} \dfrac{\sigma}{\sqrt n},\bar X+z_{1-\alpha/2} \dfrac{\sigma}{\sqrt n})$

#### 3.两独立总体，均值差的区间估计
方差相等、方差不等

#### 4. 单总体，方差的区间估计

以上都参看 [统计推断](http://www.guofei.site/2017/10/27/hypothesistesting.html)


## 一个关于方差的知识点

样本方差$s^2=\dfrac{(x_i-\bar x)^2}{n-1}$


$S^2=\dfrac{\sum\limits_{i=1}^n(X_i-\bar X)^2}{n-1}$  
$S_n^2=\dfrac{\sum\limits_{i=1}^n(X_i-\bar X)^2}{n}$  

如果总体是正态分布，那么$nS_n^2/\sigma^2 \sim \chi^2(n-1), (n-1)S^2/\sigma^2\sim \chi^2(n-1)$  

$ES^2=\sigma^2$（无偏性）（虽然用定义能证出来，但是用$DX=EX^2-(EX)^2$更轻松证出来）  
但是均方误意义下的有效性，$S_n^2$ 更优


书上还有一个说明，$S_n^2$ 是$\sigma^2$ 的极大似然估计  

另外，注意一下，$S$不是$\sigma$的无偏估计，虽然加上平方就是。
