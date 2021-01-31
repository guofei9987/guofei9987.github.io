---
layout: post
title: Optimization Algorithms of Deep Learning
categories:
tags: 2-3-神经网络与TF
keywords:
description:
order: 451
---
*吴恩达的课程笔记*  

## mini-batch
batch：每次迭代放入全量数据  
mini-batch：每次迭代放入一组数据  

记号：  
对于第t个mini-batch，这么记$X^{\{ t \}},Y^{\{ t \}}$  
（我们用$x^{(i)}$表示第i个sample，用$Z^{[l]}$表示第l个layer）  
“1 epoch”：pass through training set

**Why**  

如果 mini-batch size=1，叫做 stochastic gradient descent. 缺点是不能矢量化运算，实际训练速度也慢。  
mini-batch 设定为合理值，既可以享受矢量化计算的速度，而且每次更新参数也不用很久。  

choosing mini-batch size：
- if small training set，use batch gradient decent
- if big training set，use 64/128/256/512/1024. Make sure mini-batch fit in cpu/gpu memory

## Exponentially weighted averages
 exponentially weighted moving averages:  
 原序列是$\theta_t$,新序列是$v_t=\beta v_{t-1}+(1-\beta)\theta_t, (v_0=0)$  
分析上面的序列，发现：
1. $v$反映的是过去$1/(1-\beta)$期内的平均。  
2. 每期只需要1份内存进行存储，而不是$1/(1-\beta)$份
3. 因为$v_0=0$导致的不准，可以用$\dfrac{v_t}{1-\beta^t}$进行调整

应用：**gradient descent with momentum**  
compute dw,db on current mini-batch  
$v_{dw}=\beta v_{dw}+(1-\beta)dw$  
$v_{db}=\beta v_{db}+(1-\beta)db$  

$w-=\alpha v_{dw},b-=\alpha v_{db}$

超参数$\beta$：0.8~0.999都可以，默认0.9

## RMSprop

$S_{dw}=\beta S_{dw}+(1-\beta)dw\odot dw$  
$S_{db}=\beta S_{db}+(1-\beta)db\odot db$  

$w:=w-\alpha\dfrac{dw}{\sqrt{S_{dw}}}$  
$b:=b-\alpha\dfrac{db}{\sqrt{S_{db}}}$  

效果：梯度很大的变量，变化稍微一点。梯度很小的变量，变化稍微大一点。如此，你可以使用更大的 learning rate

## Adam optimization algorithm
*Adam stands for Adaptive Moment Estimation*  
During the history of deep learning, many optimization algorithms works well in a few problems, but not general.  
Adam is one of rare algorithms that has really stood up.  

**Adam = Momentum + RMSProp**  
- momentum $v_{dw}=\beta_1 v_{dw}+(1-\beta_1)dw, v_{db}=\beta_1 v_{db}+(1-\beta_1)db$
- RMSprop $S_{dw}=\beta_2 S_{dw}+(1-\beta_2)dw\odot dw, S_{db}=\beta_2 S_{db}+(1-\beta_2)db$
- 解决初始值为0引发的问题：$v$

完整版如下：  
$$\begin{cases}
v_{dW^{[l]}} = \beta_1 v_{dW^{[l]}} + (1 - \beta_1) \frac{\partial \mathcal{J} }{ \partial W^{[l]} } \\
v^{corrected}_{dW^{[l]}} = \frac{v_{dW^{[l]}}}{1 - (\beta_1)^t} \\
s_{dW^{[l]}} = \beta_2 s_{dW^{[l]}} + (1 - \beta_2) (\frac{\partial \mathcal{J} }{\partial W^{[l]} })^2 \\
s^{corrected}_{dW^{[l]}} = \frac{s_{dW^{[l]}}}{1 - (\beta_2)^t} \\
W^{[l]} = W^{[l]} - \alpha \frac{v^{corrected}_{dW^{[l]}}}{\sqrt{s^{corrected}_{dW^{[l]}}} + \varepsilon}
\end{cases}$$


参数设置
- $alpha$ needs to be tune
- $\beta_1$ 0.9
- $\beta_2$ 0.999
- $\varepsilon:10^{-8}$


## Learning rate decay
$\alpha=\dfrac{1}{DecayRate*EpochNum}\alpha_0$  

还有一些其它形式：指数、阶梯、幂函数等，甚至还可以手动。

## The problem of local optima
虽然自然的理解是，陷入梯度为0的点就是陷入局部最优点，但更多的情况是（尤其是维度很高的情况下，如果陷入无法优化的点，这个点是局部最优点的概率极小）：
- 陷入到 saddle point
- plateaus

（自己画个图看看就懂了）
