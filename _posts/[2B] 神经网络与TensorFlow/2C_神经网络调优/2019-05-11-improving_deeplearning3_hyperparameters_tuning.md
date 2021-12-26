---
layout: post
title: hyperparameters tuning
categories:
tags: 0x23_神经网络与TF
keywords:
description:
order: 452
---

*吴恩达的课程笔记*  

## hpyperparameters
### 试什么
有哪些 hpyerparameters？
```py
learning_rate # 第一重要
beta =0.9
beta1, beta2, epsilon =0.9,0.999,e-8 # 不重要
num_layers # 第二重要
num_hidden_units # 第三重要
learning_rate_decay # 第二重要
mini_batch_size # 保证矢量化运算足够快
```

### 怎样试
**random hyperparameter**，而不是grid  
**Why？** 因为 hyperparameters 的重要性不同，例如，你用6* 6 grid，即使是重要 hpyperhyperparameter 也只试验了6次，但如果用 random hyperparameter ，你就试验了36次。（散点图）

**Coarse to fine** 找到比较优的区间后，可以用更小的范围继续去试。  

### Using an appropriate scale to pick hyperparameters
- 例如，你觉得$\alpha \in [0.0001,1]$,显然，均匀分布是不合适的，可以这样：
```
r=-4*np.random.rand()
alpha=10**r
```
- 例如，你觉得$\beta \in [0.9,0.999]$,显然，均匀分布也是不合适的，可以这样
```
r=-1-2*rand.random.ran()
beta=1-10**r
```

为什么不均匀呢？因为不同区间的敏感度不一样。你可以用beta去想一下，$1/(1-\beta)$代表平滑的滞后阶数，...

### Pandas vs. Caviar
- Pandas 指的是你只训练同一个模型，用人工的方式不断调整 hyperparameters
- Caviar 指的是你同时用很多 hyperparameters 训练不同的模型，从中选一个表现最好的。

## Batch Normalization
### 什么是Batch Normalization
回想我们在 logistics regression 中，对输入X进行 normalization，使得梯度下降时偏长的等高线变圆。  

这里的 Batch Normal 指的是 对一层的 $Z$，做类似这样的操作$(z-u)/\sqrt{\sigma^2+\varepsilon}$，其中$u$按照$1/m\sum_{i=1}^m$来计算（也就是样本维度的均值）方差也一样。  

完整版是这样的：
- $u=1/m\sum\limits_i z^{(i)}$
- $\sigma^2=1/m\sum\limits_i(z_i-u)^2$
- $z_{norm}^{(i)}=\dfrac{z^{(i)}-u}{\sqrt{\sigma^2+\varepsilon}}$  
- $\tilde z^{(i)}=\gamma z_{norm}^{(i)}+\beta$（这里的$\gamma,\beta$是 learnable parameters）
- 用$\tilde z$传入activation function，然后进入下一层

### 如何训练Batch Normalization
需要训练的变量:
$w^{[l]}, b^{[l]}_{n^{[l]}\times 1}, \beta^{[l]}_{n^{[l]}\times 1},  \gamma^{[l]}_{n^{[l]}\times 1}$
- 其中 $b^{[l]}_{n^{[l]}\times 1}$是多余的，设为0即可
- 同样用 gradient descent/momentum/RMSprop/Adam 法训练
- 对每个 mini-batch 进行训练（用各自mini-batch的均值和方差）

### why？
- 加快训练（类似logistics regression 时，对输入值做的 normalization）
- 在deep nerual network 中，对前面层的 weights 变化更鲁棒。
- has a slight regularization effect
    - each mini-batch is scaled by the mean/var computed on just that mini-batch
    - add some noise （similar to dropout）

### batch norm at test time
对于test set ，没有$u,\sigma$
- 用之前计算的 $u,\sigma$ 的移动平均值，作为 test 阶段使用 $u,\sigma$
- $z_{norm}^{(i)}=\dfrac{z^{(i)}-u}{\sqrt{\sigma^2+\varepsilon}}$
- $\tilde z^{[i]}=\gamma z_{norm}^{(i)}+\beta$

## softmax
$a^{[L]}=\dfrac{e^{z^{[L]}}}{\sum e^{z^{[L]}}}$  

back propagation 中$\dfrac{\partial J}{\partial z^{[L]}}=dz^{L}=\hat y-y$  
（$dz^{[L]},\hat y,y$大小都是$C \times 1,n^{[L]}=C$,）  
