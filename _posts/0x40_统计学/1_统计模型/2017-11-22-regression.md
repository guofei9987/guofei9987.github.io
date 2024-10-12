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
|连续|ttest<br>ANOVA<br>logit|OLS回归|协方差分析ANCOVA|




## 一元线性模型

### 模型和假设


**模型**：$Y_i=\beta_0 + \beta_1 X_i +\varepsilon_i$  



| **假设** | **数学描述** |
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


| 检验对象 | H0 | 构建随机变量 | 拒绝域 <br>落在拒绝域上，代表方程显著 |
|---------|----|-------------|-------|
| **拟合优度 R2** <br> 取值为0到1 <br> 模型能解释多少的 Y 变异 <br><br> 如果值为 0.8，说明模型能解释 80% 的变异<br>剩下的 20% 是其它因素+随机误差 <br><br>一元回归中$R^2=r^2$ 相关系数的平方 <br> 多元回归通常用用 *Adjusted R2* |  |$R^2=\dfrac{SSR}{SST}$||
| **方程显著性**-相关系数 <br> 对一元回归：等同于系数显著性检验 | $\rho=0$ | $t=\dfrac{r\sqrt{n-2}}{\sqrt{1-r^2}} \sim t(n-2)$ |$\mid t \mid > t_{\alpha/2}$|
| **方程显著性**-F检验 <br> 对一元回归，由 F(1,n-2)=t(n-2)，得出结论：其等同于系数显著性检验 | $\beta_1=\beta_2=...=\beta_k=0$ <br> 也就是所有的自变量对因变量的影响都是 0 | $F=\dfrac{SSR/k}{SSE/(n-k-1)} \sim F(k,n-k-1)$ <br> 对于一元回归 $F\sim F(1,n-2)$ | $F>F_{1-\alpha}(1,n-2)$ |
| **系数显著性** <br> 等价于相关系数检验 | $\beta_1=0$ | $t=\dfrac{\hat \beta_1}{s_{\hat\beta_1}}\sim t(n-2)$ <br> 其中$s_{\hat\beta_1}=\sqrt{\dfrac{\hat\sigma^2}{l_{xx}}},\hat\sigma^2=\dfrac{\sum\limits_{i=1}^n (y_i-\hat y_i)^2}{n-2}$|
|**残差**-看残差图-经验判断 ||| 残差应当：<br>1、服从正态分布<br>2、均值为0<br>3、与x无关<br>4、无自相关性<br>5、等方差 |
|**残差**-自相关性-DW检验 || $DW = \dfrac{\sum\limits_{i=2}^n (e_i - e_{i-1})^2}{\sum\limits_{i=1}^n e_i^2}$ <br>其中，$e_i$ 是 $\varepsilon_i$ 的估计| d≈2 说明没有自相关性 <br> 0~2 说明有正自相关性，<br> 2～4 说明有负相关性 |
|**残差**-其它方法 <br> | 对残差做 [统计推断](https://www.guofei.site/2017/10/27/hypothesistesting.html) <br>例如 SW、JB、KS |


### y的区间估计

（根据正态分布的加法）  
对 $x=x_0$ 处做预测 $\hat y_0=\beta_1 x_0 +\beta_0\sim N(\beta_1 x_0+\beta_0,(\dfrac{1}{n}+\dfrac{(x_0-\bar x)^2}{l_{xx}})\sigma^2)$  
得到区间估计$(\hat y-t_{1-\alpha/2}(n-2) s_{\hat y},\hat y+t_{1-\alpha/2}(n-2) s_{\hat y})$  
其中，$s_{\hat y}=\sqrt{(\dfrac{1}{n}+\dfrac{(x_0-\bar x)^2}{l_{xx}})\hat\sigma^2},\hat\sigma^2=\dfrac{\sum\limits_{i=1}^n (y_i-\hat y_i)^2}{n-2}$


## 多元回归模型

### 多元回归模型定义
**模型形式1**:

$$\left( \begin{array}{c}
Y_1\\
Y_2\\
\vdots\\
Y_n
\end{array}\right)
= \left[ \begin{array}{cccc}
1 & X_{21} & X_{31} & \dots & X_{k1}\\
1 & X_{22} & X_{32} & \dots & X_{k2}\\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & X_{2n} & X_{3n} & \dots & X_{kn}
\end{array}\right ]
\left( \begin{array}{c}
\beta_0\\
\beta_1\\
\vdots\\
\beta_k
\end{array}\right)
+\left( \begin{array}{c}
u_1\\
u_2\\
\vdots\\
u_n
\end{array}\right)
$$


**模型形式2**：$Y=X\beta+U$

**模型形式3**： $Y=X\hat\beta+e$，以及 $\hat Y=X\hat \beta$


**假设**


| **假设** | **数学描述** |
|--|--|
| 1、**0均值假设** | $$E(U)=\left[ \begin{array}{l} 0\\ 0\\ ... \\ 0\\ \end{array}\right]$$|
| 2、**同方差且无自相关** | $$\left [ \begin{array}{lll} \sigma^2 & 0 & ... & 0\\ 0 & \sigma^2 & ... & 0\\...\\0 & 0 & ... & \sigma^2 \end{array}\right ]$$|
| 3、**随机扰动项与解释变量不相关** |$\text{Cov}(X_{ji}, u_i) = 0 \quad (j=2,3,\dots,k; \, i=1,2,\dots,n)$|
| 4、**无多重共线性** | $Rank(X)=k$<br>此时有结论 $Rank(X'X)=k$，进而 $X'X$ 可逆 |
| 5、**正态性假定** |$u_i \overset{\text{i.i.d.}}{\sim} N(0,\sigma^2)$|


**一些性质**
1. 线性变换 $\hat\beta=(X'X)^{(-1)}X'y$
2. 无偏估计 $E\hat\beta=\beta$
3. 方差 $D\hat\beta=\sigma^2(X'X)^{(-1)}$
4. 如果 $y\sim N(X\beta,\sigma^2I)$，那么 $\hat\beta\sim N(\beta,\sigma^2(X'X)^{(-1)})$，并且 $SSE/ \sigma^2=\chi^2(n-k-1)$

### 多元回归的检验-基础检验


$\sum (Y_i - \bar{Y})^2 = \sum (\hat{Y}_i - \bar{Y})^2 + \sum (Y_i - \hat{Y}_i)^2$  
因此：SST = SSR + SSE   
其中，(n - 1) = (k - 1) + (n - k),其中 k 代表 $\beta$ 数量，也是维度加 1


| 检验对象 | H0 | 构建随机变量 | 检验标准 |
|--------|----|------------|------|
| **拟合优度检验**-R2 | | $R^2=\dfrac{SSR}{SST}$ |取值为 $[0,1]$，越接近1越好<br>R2与F检验等价，关系为 $F = \dfrac{n - k}{k - 1} \cdot \dfrac{R^2}{1 - R^2}$<br>缺点是变量个数增加这个值也增加，没有横向可比性 |
| **拟合优度检验**-修正R2 || $\bar{R}^2 = 1 - (1 - R^2) \dfrac{n - 1}{n - k}$ |检验标准同上，这个指标考虑了变量个数|
| **拟合优度检验**-偏R2 ||$R^2_{y\{1;2,\dots,p\}} = \dfrac{SSE(x_2, \dots, x_p) - SSE(x_1, \dots, x_p)}{SSE(x_2, \dots, x_p)}$|新增一个变量（$X_1$）后，模型解释能力的提升。如果值很大，说明$X_1$对模型贡献显著 |
| **系数显著性检验**-t检验 ||||
| **方程显著性检验**-F检验 | $\beta_1=\beta_2=...=\beta_k=0$ |$F=\dfrac{SSR/k}{SSE/(n-k-1)} \sim F(k,n-k-1)$|越大越好<br> $F>F_{1-\alpha}(1,n-2)$|
| **滞后阶**-赤池信息准则 |||越小越好|
| **残差**-自相关Q检验 ||Ljung-Box Q|无自相关性|
| **残差**-自相关LM检验 ||Breush-Godfrey Lagrange Multiplier|残差序列直到P阶不存在自相关|
| **残差**-正态性检验 ||Histogram-Normality Test|残差服从正态分布 |
| **残差**-异方差检验 |||如果出现异方差，就要用加权最小二乘法修正|

### 多重共线性

**多重共线性的后果**：
- 后果（如果完全共线）
    1. 参数的估计值不确定
    2. 参数估计值的方差无限大
- 后果（如果不完全共线）
    1. 参数估计值的方差与协方差增大
    2. 参数区间估计时，置信区间变大
    3. 对系数进行t检验时，由于方差变大，会使得t值变小，从而使得本应否定“系数为0”的原假设被错误的接受
    4. R^2很高，F检验的显著性也很高，参数的t检验却不通过。



**多重共线性的检验**
- VIF：接近1说明共线性很弱，超过10说明共线性严重
- 特征根判定法：有特征根接近0，说明存在多重共线性

**多重共线性的解决方法**
1. **剔除变量法**（简单粗暴）
2. **增加样本容量**（很多时候多重共线性是因为样本量太小）
3. **变换模型形式**（用一阶差分回归，diff）
4. **逐步回归法**（下面详细写）
5. **岭回归法**（是一种有偏估计）
6. **主成分法**。先用主成分分析降维，然后做多元回归。
7. **偏最小二乘法**


#### 逐步回归

1. step1：对每一个解释变量和被解释变量做回归，作为贡献大小的排序依据
2. step2：逐个引入新变量
    if 引入后改进了R^2和F检验，且其它解释变量的t检验显著，保留该变量
    elseif 引入后不改进R^2和F检验，且其它解释变量的t检验显著，认为是多余的
    elseif 引入后不改进R^2和F检验，且其它解释变量的t检验变得不显著，认为有严重的多重共线性


step2 又有一些不同的方法
1. **前进法** 每次增加一个feature进入模型，按照F检验的显著性作为评判指标
2. **后退法** 每次剔除一个最不重要的feature，仍然是F检验作为指标
3. **逐步法** 每引入一个feature，对已经进入模型的feature组个检验，直到最后。（有可能产生死循环，所以进入和剔除时对显著性水平的要求不同，从而防止死循环）

### 异方差

**异方差的定义**: 误差项的方差是变化的（与解释变量有关），不满足模型的同方差假设。

**异方差的原因**
1. 被略去的变量与当前变量有关系	
2. 测量误差变化。 例如，生产规模越大，测量出来的误差越大
3. 本身就是这样。 例如，高收入和低收入的消费偏离程度不一样

**异方差的后果**
1. OLS仍然有无偏性
2. 参数OLS估计的方差不再最小
3. t统计量和F统计量不再服从t分布和F分布

**异方差的检验**
1. 看残差图
2. **Goldfeld-Quandt检验**
    - 前提：1、只适用于大样本。2、除同方差假定外，其它假定都成立
    - 步骤：
```
1、按Xi大小排序
2、剔除中间C个，剩下分为2部分
3、H0:两部分方差相等
4、构造F统计量
5、判断
```
3. **White检验**
    - 步骤
```
1、计算残差
2、回归rstool(X,残差,全交叉)
3、计算统计量nR^2
4、H0：步骤2的回归系数全为0(常项除外)
5、H0成立时，nR^2 服从卡方分布，如果它太大，则拒绝 H0 认为存在异方差
```
4. **ARCH检验**，步骤
    - 构建 ARCH 模型 $\sigma_t^2 = a_0+a_1\sigma_{t-1}^2+...+a_p\sigma_{t-p}^2+v_t$
    - $H0:a_1=a_2=...=a_p=0$
    - H0成立时，$(n-p)R^2 \sim \chi^2(p)$，如果它的值太大，则拒绝 H0，认为存在异方差
5. **Glejser检验**，思路：取残差绝对值，对X回归，判断系数是否为0


**异方差的解决**，有3种方法
1. **自变量对数变换**。这种方法最简单，它假定异方差来自变量的值的变化，所以加上个对数后，方差就稳定了
2. **加权最小二乘法** $OLS=\sum w_i(y_i-f(x_i))^2$，其中，$w_i=\dfrac{1}{x_i^2}$
3. **方差齐性变换**，先计算异方差表达式，然后替换新模型
    1. 计算异方差表达式，$Y_i=\beta_1+\beta_2X_i+u_i$, $Var(u_i)=\sigma^2f(X_i)$
    2. 替换新模型 $\dfrac{Y_i}{\sqrt{f(X_i)}}=\dfrac{\beta_1}{\sqrt{f(X_i)}} + \beta_2\dfrac{X_i}{\sqrt{f(X_i)}}+\dfrac{u_i}{\sqrt{f(X_i)}}$




### 自相关

**自相关的定义**：$u_i$ 与 $u_j$ 相关

**自相关的原因**
1. 经济系统的惯性
2. 经济活动的滞后效应。某一变量对另一变量的影响会延续若干期
3. 数据预处理造成的相关。修正、内插、平滑处理
4. 蛛网现象
5. 略去了重要变量

**自相关的后果**
1. 低估参数估计值的方差
2. 高估t统计量，从而夸大显著性
3. 预测值的置信区间不可靠


**自相关的检验**
1. 看图
2. **DW检验**，下面详细写
3. Breusch-Godfrey检验（**LM检验**），下面详细写

**DW检验**
- 前提
    1. 解释变量 X 非随机
    2. $u_t=\rho u_{t-1}+v_t$
    3. 解释变量中不包含滞后的被解释变量。也就是说，不应出现这种情况：$Y_t=\beta_1+\beta_2X_t+\beta_3Y_{t-1}+u_t$
    4. 截距项部位0
    5. 数据序列无缺啥
- 方法步骤，
    1. 构建 DW 统计量：$DW = \dfrac{\sum\limits_{i=2}^n (e_i - e_{i-1})^2}{\sum\limits_{i=1}^n e_i^2}$
    2. ≈2 说明没有自相关性， 0~2 说明有正自相关性， 2～4 说明有负相关性

**Breusch-Godfrey检验（LM检验）**步骤
1. 模型
   - 设回归模型为：$Y = X\beta + U$
   - 其中，误差项为：$u_t = \rho_1 u_{t-1} + \rho_2 u_{t-2} + \dots + \rho_p u_{t-p} + \epsilon_t$

2. $H_0: \rho_1 = \rho_2 = \dots = \rho_p = 0$，即假设不存在自相关
3. 求残差 $e_t$
4. 辅助回归：$e_t = \alpha_1 + \alpha_2 X_{2t} + \alpha_3 X_{3t} + \dots + \alpha_k X_{kt} + \hat{\rho}_1 e_{t-1} + \hat{\rho}_2 e_{t-2} + \dots + \hat{\rho}_p e_{t-p} + v_t$  
5. 计算LM统计量 $LM = T \times R^2 \sim \chi^2(p)$，其中，$T$为样本量，$R^2$为辅助回归的决定系数。
6. 决策。如果 $LM$ 值过大，则拒绝 $H_0$，表明存在自相关。


**自相关的解决**
1. 广义最小二乘法GLS
2. 广义差分法
3. 德宾两步法
4. 迭代法

**迭代法解决自相关问题**
- 给定模型：$$\begin{cases} y_t = \beta_0 + \beta_1 x_t + \varepsilon_t \\
\varepsilon_t = \rho \varepsilon_{t-1} + u_t \end{cases}$$
- 根据误差项自相关的假设，将方程重新表示为：$ y_t - \rho y_{t-1} = \beta_0 (1 - \rho) + \beta_1 (x_t - \rho x_{t-1}) + u_t$
- 其中：
    - $y_t$ 和 $y_{t-1}$ 为被解释变量及其滞后项，
    - $x_t$ 和 $x_{t-1}$ 为解释变量及其滞后项，
    - $\rho$ 为自相关系数，$u_t$ 为白噪声误差项。



### 内生变量

**内生变量的定义**：$Cov(u_i,x_i)\not=0$


**内生变量的j解决方法**
1. 二阶段最小二乘法。寻找一组工具变量，使得工具变量与解释变量高度相关，与误差无关
2. TSLS
    - 第一步是用解释变量对工具变量进行最小二乘法估计
    - 第二步是用解释变量的拟合值对原模型进行最小二乘估计




### RESET检验（regresion error specification test）
检验思路:
- 得到了一个回归模型，想检验这个原始的回归模型是否遗漏了重要自变量
- 问题是不知道遗漏了哪个变量，因此“虚构一些”额外的变量
- 加上虚构变量后，重新做 OLS，然后构造假设检验，H0 假设是“虚构变量的系数为0”，如果检验后拒绝了这个假设，说明原始模型可能遗漏了重要变量


步骤：
1. 原始 OLS：$Y_i=\beta_0+\beta_1 X_{1}+...+\beta_k X_k+u_i$
2. 获取新的“虚构变量”，例如 $\hat Y^2, \hat Y^3$
2. 再次 OLS：$Y_i=\beta_0+\beta_1 X_{1}+...+\beta_k X_k+\delta_1 \hat Y^2 + \delta_2 \hat Y^3 +u_i$
3. 假设检验，构造 $H0: \delta_i=0$
4. 构建F统计量 $F=\dfrac{(SSR_R-SSR_{UR})/q}{SSR_{UR}/(n-k-q-1)}$
    - 这里 q=2
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




## 参考资料
[^lihang]: [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)  
[^wangxiaochuan]: [王小川授课内容](https://weibo.com/hgsz2003)  
[^EM]: 我的另一篇博客[EM算法理论篇](http://www.guofei.site/2017/11/09/em.html)  
[^AppliedRegression]: 《应用回归分析》，人民大学出版社  
