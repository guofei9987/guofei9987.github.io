---
layout: post
title: 【回归分析】理论与实现
categories:
tags: 0x41_统计模型
keywords:
description:
order: 408
---


|X\ Y|分类|连续|分类+连续|
|--|--|--|--|
|分类|列联表分析<br>LR|LR|LR|
|连续|ttest<br>ANOVA|OLS回归|协方差分析ANCOVA|


## 线性回归
大图见于<a href='https://www.guofei.site/StatisticsBlog/regression.htm' target="HypothesisTesting">这里</a>  


<!-- <iframe src="https://www.guofei.site/StatisticsBlog/regression.htm" width="100%" height="3600em" marginwidth="10%"></iframe> -->

大图见于<a href='https://www.guofei.site/StatisticsBlog/regression.htm' target="HypothesisTesting">这里</a>  

## 一元线性模型

### 模型和假设


**模型**：$Y_i=\beta_0 + \beta_1 X_i +\varepsilon_i$  



| **假设** | 数学描述 |
|--|--|
|1、 **零均值假定** | $E(\varepsilon_i\mid X_i)=0$
|2、 **同方差假定** | $var(\varepsilon_i\mid X_i)=E(\varepsilon_i-E(\varepsilon_i\mid X_i))=E(\varepsilon_i^2)=\sigma^2$
|3、 **无自相关假定** | $cov(\varepsilon_i,\varepsilon_j)=E(\varepsilon_i \varepsilon_j)=0  \quad \text{for } i \neq j$
|4、 **解释变量与随机扰动不相关** | $cov(\varepsilon_i ,X_i)=E[\varepsilon_i -E\varepsilon_i][\varepsilon_j-E\varepsilon_j]=0$
|5、 **正态性假定** |$\varepsilon_i \overset{\text{i.i.d.}}{\sim} N(0, \sigma^2)$


### 一元回归模型的推导


为简化记号，记：  
- $l_{xy}=\sum\limits_{i=1}^n (x_i-\bar x)(y_i-\bar y)=\sum\limits_{i=1}^n x_i y_i-n\bar x\bar y$
- $l_{xx}=\sum\limits_{i=1}^n(x_i-\bar x)^2=\sum\limits_{i=1}^n x_i^2 -n\bar x^2$
- $l_{yy}=\sum\limits_{i=1}^n(y_i-\bar y)^2=\sum\limits_{i=1}^n y_i^2-n\bar y^2$


另一套简化记法
- $SST=\sum\limits_{i=1}^n(y_i-\bar y)^2=l_{yy}$，表示总变异量
- $SSR=\sum\limits_{i=1}^n(\hat y_i-\bar y)^2=\dfrac{l_{xy}^2}{l_{xx}}$，表示可以被模型解释的变异量
- $SSE=\sum\limits_{i=1}^n(y_i-\hat y_i)^2=l_{yy}-\dfrac{l_{xy}^2}{l_{xx}}$，表示没有被模型解释的变异量


结论：  
1. $SST=SSR+SSE$  
2. 构造 F 分布 $F=\dfrac{SSR/1}{SSE/(n-2)}$
3. 相关系数$r^2=\dfrac{l_{xy}^2}{l_{xx}l_{yy}}=\dfrac{SSR}{SST}$，对于一元回归来说，拟合优度等于相关系数 $R^2=r^2$
4. 拟合优度 $R^2$ ，取值为0到1，是说明能解释多少的因变量变异。例如 值为 0.8，说明 80% 的变异可以由模型解释，剩下的 20% 是随机误差+模型外的其它因素。
    - 由于多元变量的自变量数量影响，因此通常用 Adjusted R2




对于一元线性回归模型:  
$$\left \{ \begin{array}{l}
y_i=\beta_0+\beta_1 x_i+\varepsilon_i\\
\varepsilon_i \overset{\text{i.i.d.}} \sim N(0,\sigma^2)
\end{array}\right.
$$


用最小二乘法得到：  
$\hat\beta_1=\dfrac{l_{xy}}{l_{xx}}$  
$\hat\beta_0=\bar y -\hat\beta_1\bar x$  


可以证明：  
- $\hat\beta_1\sim N(\beta_1,\dfrac{\sigma^2}{l_{xx}})$，（但是方差未知，因此对其检验要用t检验）  
- $\hat\beta_0 \sim  N(\beta_0, (\dfrac{1}{n} + \dfrac{\bar x^2}{l_{xx}}) \sigma^2)$  
- $Cov(\hat\beta_0,\hat\beta_1)=-\dfrac{\bar x}{l_{xx}}\sigma^2$  

### 一元回归的检验


| 检验对象 | H0 | 构建随机变量  | 拒绝域 <br>落在拒绝域上，代表方程显著 |
|---------|----|-------------|-------|
| **拟合优度 R2** <br> 取值为0到1 <br> 是说明能解释多少的因变量变异 <br> 例如 值为 0.8，说明 80% 的变异可以由模型解释，剩下的 20% 是随机误差+模型外的其它因素。<br>一元回归中$R^2=r^2$ 相关系数的平方 <br> 多元回归通常用用 *Adjusted R2* |  |$R^2=\dfrac{SSR}{SST}$||
| **方程显著性**-相关系数 <br> 对于一元回归等同于系数显著性检验 | $\rho=0$ | $t=\dfrac{r\sqrt{n-2}}{\sqrt{1-r^2}} \sim t(n-2)$ |$\mid t \mid > t_{\alpha/2}$|
| **方程显著性**-F检验 <br> 对于一元回归，由于分布 F(1,n-2)=t(n-2)，因此也等同于系数显著性检验 | $\beta_1=\beta_2=...=\beta_k=0$ <br> 也就是所有的自变量对因变量的影响都是 0 | $F=\dfrac{SSR/k}{SSE/(n-k-1)} \sim F(k,n-k-1)$ <br> 对于一元回归 $F\sim F(1,n-2)$ | $F>F_{1-\alpha}(1,n-2)$ |
| **系数显著性** <br> 等价于相关系数检验 | $\beta_1=0$ | $t=\dfrac{\hat \beta_1}{s_{\hat\beta_1}}\sim t(n-2)$ <br> 其中$s_{\hat\beta_1}=\sqrt{\dfrac{\hat\sigma^2}{l_{xx}}},\hat\sigma^2=\dfrac{\sum\limits_{i=1}^n (y_i-\hat y_i)^2}{n-2}$|
|**残差**||看残差图|
|**残差**-自相关性-DW检验|| $DW = \frac{\sum_{i=2}^n (e_i - e_{i-1})^2}{\sum_{i=1}^n e_i^2}$ | d≈2 说明没有自相关性 <br> 0~2 说明有正自相关性，<br> 2～4 说明有负相关性 |




$t=\dfrac{\hat \beta_1}{\sigma/\sqrt{\sum(x_i-\bar x)^2}} \sim t(n-2)$





#### 参数的区间估计
(上面的结论用于显著性检验，下面以$\beta_1$为例)
$H_0:\beta_1=0,H_1:\beta_1 \not=0$  
根据上面的推导，$\hat\beta_1\sim N(\beta_1,\dfrac{\sigma^2}{l_{xx}})$，  
其中$\sigma^2$未知，所以构造t统计量  
$t=\dfrac{\hat \beta_1}{s_{\hat\beta_1}}\sim t(n-2)$   
其中，$s_{\hat\beta_1}=\sqrt{\dfrac{\hat\sigma^2}{l_{xx}}},\hat\sigma^2=\dfrac{\sum\limits_{i=1}^n (y_i-\hat y_i)^2}{n-2}$  


#### y的区间估计
（上面三条结论也可以用来求出预测值的置信区间）  
（根据正态分布的加法）  
对 $x=x_0$ 处做预测 $\hat y_0=\beta_1 x_0 +\beta_0\sim N(\beta_1 x_0+\beta_0,(\dfrac{1}{n}+\dfrac{(x_0-\bar x)^2}{l_{xx}})\sigma^2)$  
得到区间估计$(\hat y-t_{1-\alpha/2}(n-2) s_{\hat y},\hat y+t_{1-\alpha/2}(n-2) s_{\hat y})$  
其中，$s_{\hat y}=\sqrt{\dfrac{(x_0-\bar x)^2}{l_{xx}})\hat\sigma^2},\hat\sigma^2=\dfrac{\sum\limits_{i=1}^n (y_i-\hat y_i)^2}{n-2}$







## 多元回归模型

### 多元回归模型定义
**模型形式1**:

$$\left ( \begin{array}{lll}
Y_1\\
Y_2\\
...\\
Y_n
\end{array}\right)
= \left [ \begin{array}{lll}
1 & X_{21} & X_{31} & ... & X_{k1}\\
1 & X_{22} & X_{32} & ... & X_{k2}\\
...
1 & X_{2n} & X_{3n} & ... & X_{kn} \end{array}\right ]
\left( \begin{array}{lll}
\beta_1\\
\beta_2\\
...\\
\beta_n
\end{array}\right)
+\left( \begin{array}{lll}
u_1\\
u_2\\
...\\
u_n
\end{array}\right)
$$


**模型形式2**：$Y=X\beta+U$

**模型形式3**： $Y=X\hat\beta+e$，以及 $\hat Y=X\hat \beta$




### RESET检验（regresion error specification test）
检验思路:
- 如果残差中包含被遗漏变量，那么把此变量引入模型，并检验其参数是否显著
- 问题是不知道遗漏了哪个变量，因此“虚构一个”
- “虚构的变量”用 Y 的估计值 $\hat Y$ 的若干次幂


步骤：
1. OLS：$Y_i=\beta_0+\beta_1 X_{1}+...+\beta_k X_k+u_i$
2. 再次OLS：$Y_i=\beta_0+\beta_1 X_{1}+...+\beta_k X_k+\delta_1+u_i$
3. 假设检验，构造 $H0: \delta_i=0$
4. 构建F统计量
5. 判断。F较大时拒绝原假设，认为存在设定误差







## 正则化方法
- 岭回归
- lasso
- 弹性网络

## Python实现


大图见于<a href='https://www.guofei.site/StatisticsBlog/回归分析.html' target="HypothesisTesting">这里</a>  


<iframe src="https://www.guofei.site/StatisticsBlog/回归分析.html" width="100%" height="3600em" marginwidth="10%"></iframe>

大图见于<a href='https://www.guofei.site/StatisticsBlog/回归分析.html' target="HypothesisTesting">这里</a>  

### AIC
模型的似然函数为$L(\theta, x)$,其中$\theta$的维度为p，那么[^AppliedRegression]:  
$AIC=-2\ln L(\theta,x)+2p$  


把AIC用于回归，等价于$AIC=n \ln (SSE)+2p$


### 逐步回归

#### 1. 前进法
每次增加一个feature进入模型，按照F检验的显著性作为评判指标
#### 2. 后退法
每次剔除一个最不重要的feature，仍然是F检验作为指标
#### 3. 逐步法
每引入一个feature，对已经进入模型的feature组个检验，直到最后。  
有可能产生死循环，所以进入和剔除时对显著性水平的要求不同，从而防止死循环。  


## 参考资料
[^lihang]: [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)  
[^wangxiaochuan]: [王小川授课内容](https://weibo.com/hgsz2003)  
[^EM]: 我的另一篇博客[EM算法理论篇](http://www.guofei.site/2017/11/09/em.html)  
[^AppliedRegression]: 《应用回归分析》，人民大学出版社  
