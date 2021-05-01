---
layout: post
title: Practical aspects of DNN
categories:
tags: 2-3-神经网络与TF
keywords:
description:
order: 450
---
*吴恩达的课程笔记*  

## train/dev/test

dev又称为 development set, hold-out cross-validation set

- 分割问题  
以前在小数据上的分割： 70/30, 60/20/20  
big data: dev/test 占比可以很小，just big enough for you to evaluat。（例如，你有一百万数据，只需要一万数据来做dev/test即可）
- Mismatched train/test distribution  
有时候，你的training set 来自某个来源和dev/test 来自另一个来源。  
**Makesure dev and test come from same distribution**
- Not having a test set might be okay. (Only dev set.)


## Bias/Variance

- high variance : train set 上表现良好，dev set 上表现不佳（例如，train/dev 上的error 是1%/11%）
- high bias ： 在training set 上表现也不佳 (例如，train/dev 上的error 是15%/16%)
- 也可能出现 high bias & variance. 或者 low bias & variance

解决：
- high bias?
    - big network
    - train longer
- high variance?
    - Biger train set
        - 获取更多的真实数据。往往是最有效的方法，但成本巨大
        - 数据增强。在现有数据基础上，生成一些假象的数据。例如在做图像的时候，对图像做旋转、剪切，大大增加了数据量。
    - regularization
- trade-off between bias & variance
- early stopping。一般会同时影响 train/dev 的表现，所以不会多用。
    - validation：一种 early stopping。如果发现在 validation datasets 上误差连续上升，就停止迭代。



## Regularization

在 logistic regression 中  
$J(w,b)=\dfrac{1}{m}\sum\limits_{i=1}^m\mathcal L(\hat y^{(i)},y^{(i)})+\dfrac{\lambda}{2m}\mid\mid w\mid\mid_2^2$  
- 为什么不加b？因为b只有1个维度，影响很小，可加可不加，为了简便就省了。
- L1-regularization (w will be sparse), L2-regularization
- $\lambda$ 值取决于 trade-off between bias & variance


在 neural network 中
$J(w,b)=\dfrac{1}{m}\sum\limits_{i=1}^m\mathcal L(\hat y^{(i)},y^{(i)})+\dfrac{\lambda}{2m}\sum\limits_{l=1}^L\mid\mid W\mid\mid_F^2$  
- 不是 “L2 norm”，而是“Frobenius norm”，因为里面是矩阵，但意思差不多
- 对back propagation 的影响：$dW^{[l]}=dW^{[l]}_{old}+\dfrac{\lambda}{m}W^{[l]}$. Weight decay: $W^{[l]}:=W^{[l]}-\alpha dW^{[l]}=(1-\dfrac{\lambda}{m}W^{[l]})-\alpha dW^{[l]}_{old}$  


**Why** ?  
其实看过的另一本书里也回答过。  
- 想象极端情况，W接近0，多层神经网络的表现接近1层（logistics regression）
- w接近0，使得激活函数局部更接近线性。




### L1, L2 更多解释


$C=C_0+\dfrac{\lambda}{2n}\sum w^2$（其中n是数据集的大小）  
偏导数就变成这种形式：  
1. $\dfrac{\partial C}{\partial w}=\dfrac{\partial C_0}{\partial w}+\dfrac{\lambda}{n}w$
2. $\dfrac{\partial C}{\partial b}=\dfrac{\partial C_0}{\partial b}$


训练算法变成这样：
1. $w\to w-\eta\dfrac{\partial C_0}{\partial b}-\dfrac{\eta\lambda}{n}w$
2. $b\to b-\eta\dfrac{\partial C_0}{\partial b}$


对于L1正则化，$\dfrac{\partial C}{\partial w}=\dfrac{\partial C_0}{\partial w}+\dfrac{\lambda}{n}  \mathcal{N}w$


以下引用 [Michael Nielsen](http://michaelnielsen.org/) 的说法  
规范化能够减轻过拟合，但背后的原因还不得而知。通常认为是因为小的权重意味着更低的复杂性。  
例如，一个线性模型和一个9阶多项式都可以回归一组点，有两种可能：
1. 9次多项式是正确的
2. 线性模型是正确的，噪音是因为存在测量误差


科学中，很难说明哪种原则正确，“奥卡姆剃刀”也不是一个一般的科学原理。例如，爱因斯坦的理论更能预测天体的微小偏差，但复杂很多。  
归根结底，你可以把规范化看成某种整合的技术，尽管其效果不错，但我们并没有一套完整的理解，仅仅当作不完备的启发规则或经验。规范化是一种帮助神经网络泛化的魔法，但不会带来原理上理解的指导。



### Dropout

Dropout Regularization  


随机、临时关闭某些神经元。在预测阶段，全部神经元激活，为了补偿这个，把权重按比例缩小。  
Dropout 类似于某种 Bagging，含有某种投票机制。但又有显著的区别：
- Bagging 每个模型是独立的，而 Dropout 是共享参数的。
- Dropout 并不显式训练每个模型，如果按照 Bagging 的做法，对应排列组合到海量的子模型


```py
# 对 l=3 进行dropout 操作
keep_prob=0.8

# forward propagation
d3=np.random.rand(a3.shape[0],a3.shape[1])<keep_prob
a3=a3*d3 # element product
a3/=keep_prob # 保证z的期望不变 “Inverted dropout technique”

# back propagation
da3=da3*d3
da3/=keep_prob
```
- test 阶段不Dropout
- 画loss图所用的数据不Dropout

**Why** ？  
- Cannot rely on any one feature, so have to spread out weights. 实际上产生的是缩小weight的作用，也就是 regularization 的效果
- 用实际上更小的 neural network 来实现 regularizing effect.  

Dropout 和 Bagging 比较
- 以 Bagging 的角度理解 Dropout，可以把 Dropout 当成很多子模型（子网络）。例如，有 n 个隐含层的2层神经网络，Dropout 就相当于 $2^n$ 个子模型的组合
- Dropout 的子模型都是共享的，Bagging 的模型都是独立的
- Dropout 的大部分子模型未能显式训练，因为在宇宙时间内都未必能采样到所有的子网络。
- Bagging 的最终结果由子模型的投票给出（算术平均）


### Other regularization methods
- 用更多数据效果会更好，但是获得新数据很贵，对图像来说，可以这么做：反转、随机缩放、轻微旋转、扭曲
- early stopping. 实际上也是在W太大之前停止迭代，缺点是不太以$J$为优化目标。你可以用L2 regularization，然后就可以多迭代了。


## Normalizing inputs
$\dfrac{x-u}{\sigma^2}$  

**Why** ？
（我觉得更好的解释是，如果不做标准化，且数据分布差异大，那么实际上相当于初始化的权重偏差特别大，需要迭代相当多次才行，而这是浪费）

## Vanishing / Exploding gradients

## Weight Initialization
$Z=W_{1\times n}X+b$，上面的经验中，不能让Z太大，这就要求W要随着n变小。  
可以在初始化时，使$\mathrm{var} w=1/n$  
- ReLU：$\mathrm{var} w=2/n$
- tanh：$1/n$更好或者$2/(n^{[l-1]}+n^{[l]})$


## Gradient checking
积分的数值求法:
- $f'(\theta)=\dfrac{f(\theta+\varepsilon)-f(\theta-\varepsilon)}{2\varepsilon}+O(\varepsilon^2)$  
- $f'(\theta)=\dfrac{f(\theta+\varepsilon)-f(\theta)}{\varepsilon}+O(\varepsilon)$  

Gradient checking可以用来找程序里面的bug  
step1：reshape and concate $W^{[i]},b^{[i]},\forall i$ into $\theta$  
step2: reshape and concate $dW^{[i]},db^{[i]},\forall i$ into $d\theta$  
step3： for each i:$d\theta_{approx}[i]=\dfrac{J(\theta_1,\theta_2,...,theta_i+\varepsilon,...)-J(\theta_1,\theta_2,...,theta_i-\varepsilon,...)}{2\varepsilon}$  
step4: check $d\theta_{approx}==d\theta$。use $\dfrac{\mid\mid d\theta_{approx}-\theta\mid\mid_2}{\mid\mid d\theta_{approx} \mid\mid_2+\mid\mid\theta\mid\mid_2}$  
（当$\varepsilon=10^{-7}$，上值为$10^{-7}$就还不错，如果是$10^{-3}$就可能有问题了）  

notes
- only debug，not train
- remember regularization
- Does not work with dropout
- Rarely, dw is correct when w is close to 0, so train for a while before do gradient check.  


--------------------------

## Underfitting
- model is not powerful enough
- over-regularized
- simply not been trained long enough

## 权重初始化
### 1/n
举例说明，某个3层神经元，输入层有1000个神经元，其中500个输出1,500个输出0  
用$N(0,1)$初始化隐含层的 weight 和 bias  
那么，对于某个隐含层的神经元，其输入是$\sum w_i^{l-1} v_i^{l-1}+b \sim N(0,501)$  
这是一个非常宽的正态分布，导致其值较大和较小的概率都不低，这样会导致训练缓慢。  


可以用$w\sim N(0,1/n),b\sim N(0,1)$来初始化 weight 和 bias，这样某个隐含层的输入是$\sum w_i^{l-1} v_i^{l-1}+b \sim N(0,1.5)$  


实际上，两种方案训练很多次，准确率趋向于一致

### 非0
初始化时，不能用全0初始化，因为这样的话，每一层内部的神经元都一样，无论迭代多少次，值也都一样，也就失去了神经网络的意义。  

实际上，可以设定w=0.01*np.random.randn,b=0  
当然，w不能太大，容易落在sigmoid函数的尾部，导致迭代很慢。  

## batch_size
理论上，只要权重更新足够频繁，就可以训练到最优，这样看来在线学习（batch_size=1）似乎更好。  
但是，
1. 神经网络每 batch_size 个样本，更新一次权重。在线学习更新太过频繁。
2. 现有的硬件支持矩阵运算，所以 batch_size 不为1时，每多一个样本，花费时间并不太增多。
3. batch_size 是一个相对独立的超参数（独立于网络整体架构之外）


## momentum
用 Hessian 矩阵做最优化有巨大的优势，关于 Hessian 矩阵，出门左转[非线性无约束最优化-牛顿法](http://www.guofei.site/2018/05/26/nonlinearprogramming.html#title6)  
问题是 Hessian 矩阵太大了，加入有n个权重，Hessian矩阵就是$n\times n$大小的  
作为改进，使用 momentum  


momentum 从物理中引入了两个概念，
1. 速度，梯度类似力，只改变加速度
2. 摩擦力，用来逐步减少速度


$v\to v'=\mu v-\eta \nabla C$  
$w\to w'=w+v'$  
$1-\mu$是摩擦力，$0\leq\mu\leq1$  


其它最优化算法：共和梯度法、BFGS方法(limited memory BFGS,L-BFGS)


## 正则化

正则化的目的是减少泛化误差，而不是减少训练误差。

### 数据增强

### 噪声鲁棒性
- 向输入层注入噪声。噪声幅度被细心调整后，非常高效。
- 向隐含层注入噪声。Dropout 是一种做法
- 把噪声驾到权重。主要用于RNN。一定程度上等同于传统的正则化方法。
- 向输出注入噪声。输出不再是0-1标签数据，而是类似 1-e, e/(k-1) 的形式。这样在softmax中，0标签对应的项也参与梯度运算。

### 多任务学习
多任务学习可以额外提高泛化能力。

具体做法是，在神经网络前面的层共享，后面的层各自对应一个任务。

### early stopping
有这种现象：随着训练进行，训练集上的误差继续降低，验证集上的误差反而开始上升。这也是一种正则化方法，一种高效的方法。

在某些情况下，early stopping 几乎等价于L2正则化。
