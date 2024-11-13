---
layout: post
title: 常见概率分布
categories:
tags: 0x42_概率论
keywords:
description:
order: 421
---

## 离散分布

|名称|概率分布与特征|性质|
|--|--|--|
|0-1分布 <br> Bernoulli distribution|||||
|二项分布 <br> Binomial distribution <br> $X \sim b(n,p)$|$P(X=k)=\dbinom{n}{k}p^k(1-p)^{n-k}$ <br>  $EX=np$ <br> $DX=np(1-p)$|可加性：$b(n_1,p)+b(n_2,p)=b(n_1+n_2,p)$ <br> 0-1分布是一种特殊的二项分布 <br> 二项分布是n个独立同分布的0-1分布的加和|
|负二项分布(帕斯卡分布)|$P(X=x,r,p)=\dbinom{x-1}{r-1}p^r(1-p)^{x-r}$<br>$x \in [r,r+1,r+2,...,\infty]$ | 如果r=1，就是几何分布 <br> 对于一系列独立同分布的实验，每次实验成功概率为p，实验直到r次成功为止，总实验次数的概率分布。|
|泊松分布 <br> $X\sim \pi(\lambda)$|$P(X=k)=\dfrac{\lambda^k e^{-\lambda}}{k!}$<br>$(k=0,1,2,...)$ <br> $EX=\lambda$ <br> $DX=\lambda$ | 可加性：$\pi(\lambda_1)+\pi(\lambda_2)=\pi(\lambda_1+\lambda_2)$ <br> <br> 泊松分布有广泛的应用，<br>某一服务设施一定时间内到达的人数<br>电话交换机接到的呼叫次数<br>汽车站台的后可人数<br>机器出现的故障数<br>自然灾害发生的次数<br>一块产品上的缺陷数<br>显微镜下单位分区内的细菌数<br>某放射性物质单位时间发射的粒子数|


## 常用连续分布

|名称|表示|概率分布与特征|性质|
|--|--|--|--|
| **均匀分布** |$U(a,b)$|$f(x) = 1/(b - a), \quad x \in [a, b]$ <br> $E(X) = (a+b)/2$ <br> $D(X) = (b - a)^2/12$||
| **指数分布** ||$$f(x)=\left \{ \begin{array}{ccc}\lambda e^{-\lambda x}&x>0 \\0&o/w\end{array}\right.$$ <br> $EX=1/\lambda$  <br> $DX=1/\lambda^2$|**无记忆性** <br>$$P(x>s+t \mid x>s )=P(x>t)$$<br>$$s,t>=0$$|
| **正态分布** |$N(\mu,\sigma^2)$|$f(x)=\dfrac{1}{\sqrt{2\pi}\sigma}e^{-\dfrac{(x-\mu)^2}{2 \sigma^2}}$ <br> $EX=\mu$<br>$DX=\sigma^2$ | **可加性**：<br> 如果 $X_i \overset{\text{i.i.d.}}{\sim} N(\mu_i,\sigma_i^2)$<br>那么:<br>$\sum X_i \sim N(\sum\mu_i,\sum\sigma_i^2)$ <br><br>如果同时满足以下两条：  <br>$X_i \overset{\text{i.i.d.}}{\sim} N(\mu,\sigma^2)$ <br>$S^2=\dfrac{1}{n-1}\sum(X_i - \bar X)^2$  <br>那么，有以下结论：  <br>1、$\bar X \sim N(u,\dfrac{\sigma^2}{n})$  <br>2、$\dfrac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$  <br>3、$ES^2=\sigma^2$  <br>4、$\bar X, S^2$相互独立  <br>5、$\dfrac{\bar X-\mu}{S/\sqrt{n}} \sim t(n-1)$|






## 多元正态分布
$f(x_1,x_2,...x_p)=\dfrac{1}{(2\pi)^{p/2} \mid \Sigma \mid ^{1/2}} exp[-\dfrac{1}{2} (x-u)'\Sigma^{-1}(x-u)]$
where,  
- u是p阶向量
- $\Sigma$是p阶正定矩阵


叫做X服从p元正态分布， 记为$X \sim N_p(u,\Sigma)$

### 多元正态分布的性质
如果$X=(X_1,X2,...X_p) \sim N_p(u,\Sigma)$  
### 性质1：均值和方差
$EX=u$  
$Var(X)=\Sigma$  


当$\mid\Sigma \mid =0 $,不存在密度函数。 当然可以给出一些形式上的表达式，使得可以统一处理。  


### 性质2：独立性
如果$\Sigma$是对角阵，那么$X_1,X_2,...,X_p$相互独立  


### 性质3：分块矩阵
做如下拆分：  
$$X=\left [\begin{array}{ccc}X^{(1\sim q)}\\ X^{(q+1 \sim p)} \end{array}\right],
u=\left [\begin{array}{ccc}u^{(1\sim q)}\\ u^{(q+1 \sim p)} \end{array}\right],
\Sigma=\left [\begin{array}{ccc}\Sigma_{11}&\Sigma_{12}\\ \Sigma_{21}&\Sigma_{22} \end{array}\right]$$,  
那么：
$X^{(1\sim q)}\sim N_q(u^{1\sim q},\Sigma_{11}), X^{(q+1 \sim p)} \sim N_q(u^{q+1\sim p},\Sigma_{22})$  


需要指出：
- 多元正态分布的任何边缘分布都是正态分布，反之不真。  
- $\Sigma_{12}=0$表示独立，所以多元正态分布拆分后不相关则独立  
- 两个正态分布不相关，不一定独立。只有是多元正态分布时，不相关才推出独立。  


### 性质4：线性组合
如果$A_{s\times p},d_{s\times 1}$都是常数矩阵，  
那么$AX+d\sim N_s(Au+d,A\Sigma A')$  

## 正态分布的乘法
*参见[Products and Convolutions of Gaussian Probability
Density Functions](http://www.tina-vision.net/docs/memos/2003-003.pdf)*  
### 正态分布乘法的定义
*注意区别于随机变量的乘法*  
正态分布的乘法定义为概率密度函数相乘，然后乘以归一化系数使积分仍然是1.  


已知$N(u_i,\Sigma_i),i=1,...n$，对应的的概率密度函数是$f_i(x)=\dfrac{1}{(2\pi)^{p/2} \mid \Sigma_i \mid ^{1/2}} exp[-\dfrac{1}{2} (x-u_i)'\Sigma_i^{-1}(x-u_i)]$  
1. $\prod_{i=1}^n N(u_i,\Sigma_i)$仍然是一个正态分布
2. 新正态分布的方差满足$\dfrac{1}{\Sigma}=\sum \dfrac{1}{\Sigma_i}$  
3. 新正态分布的均值满足$\dfrac{u}{\Sigma}=\sum\dfrac{u_i}{\Sigma_i}$


## 高级连续分布
### 引入Gamma Function
$\Gamma(\alpha)=\int_0^{+\infty} x^{\alpha-1}e^{-x}dx$

### Gamma Function的性质
$\Gamma(1)=1,\Gamma(0.5)=\sqrt{(\pi)}$  
$\Gamma(\alpha+1)=\alpha\Gamma(\alpha)$  
$\int_0^{-\infty}x^{\alpha-1}e^{-x}=\Gamma(\alpha)/\lambda^\alpha$  



|名字|表示|分布|特征|性质|
|---|----|----|----|---|
|卡方分布|$\chi^2(n)$|$\sum (N(0,1)^2)$|$E\chi^2=n$<br>$DX=2n$|
|t 分布|$t(n)$|$t=\dfrac{N}{\sqrt{\chi^2/n}}$|$Et=0$ <br> $Dt=\dfrac{n}{n-2}$||
|F分布|$F(n_1,n_2)$|$F=\dfrac{\chi^2(n_1)/n_1}{\chi^2(n_2)/n_2}$|$EF=\dfrac{n_2}{n_2-2}$ <br> $DF=\dfrac{2n_2^2(n_1+n_2-2)}{n_1(n_2-2)(n_2-4)}$ (n_2>4)|F分布与t分布有关 $(t(n))^2=F(1,n)$|
|Gamma distribution||$$f(x)=\left \{ \begin{array}{ccc}\dfrac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x}&x \geq 0\\0&others \end{array}\right.$$|$EX=\dfrac{\alpha}{\lambda}$ $DX=\dfrac{\alpha}{\lambda^2}$|指数分布 $Ga(1,\lambda)=exp(\lambda)$<br>$Ga(n/2,1/2)=\chi^2(n)$|
|Beta distribution||$f=\dfrac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)+\Gamma(\beta)}x^{\alpha-1}(1-x)^{\beta-1}$|$EX^k=\dfrac{\Gamma(\alpha+k)\Gamma(\alpha+\beta)}{\Gamma(\alpha)+\Gamma(\alpha+\beta+k)}$  <br> $EX=\dfrac{\alpha}{\alpha+\beta}$ <br> $DX=\dfrac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$|某些机器学习模型中，先验分布定为beta distribution|
|Fisher Z||$f=\dfrac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}\dfrac{x^{a-1}}{(1+x)^{a+b}}$|$EX^k=\dfrac{(a+k-1)(a+k-2)...a}{(b-1)(b-2)...(b-k)}$ (k<b) <br>$EX=\dfrac{a}{b-1}$ (b>1) <br> $DX=\dfrac{a(a+b-1)}{(b-1)^2(b-2)}$ (b>2)|$\dfrac{n_2}{n_1}Z(n_1/2,n_2/2)=F(n_1,n_2)$|
|The exponential family||$P(y;\eta)=b(y)exp(\eta^T T(y)-a(\eta))$||以下都是exponential family:<br> Bernoulli distribution <br>Binomial distribution <br> poisson distribution <br> normal distribution|

## 参考文献
[Products and Convolutions of Gaussian Probability
Density Functions](http://www.tina-vision.net/docs/memos/2003-003.pdf)  
