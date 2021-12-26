---
layout: post
title: 【论文笔记】Distilling the Knowledge in a Neural Network
categories:
tags: 0x00_读论文
keywords:
description:
order: 1
---



- Distilling the knowledge in a neural network (2015), G. Hinton et al. [pdf](https://arxiv.org/pdf/1503.02531.pdf)
- 镜像地址 [pdf](/pictures_for_blog/papers/Understanding_Generalization_Transfer/Distilling%20the%20Knowledge%20in%20a%20Neural%20Network.pdf)

## abstract&introduction

ensemble 方法确实不错，但太消耗算力。这里提出一种 Distilling the Knowledge 的方法，使训练快速、并行。


我们可以训练一个笨重的（cumbersome）模型，然后用 Distilling the Knowledge  的方法，最终在部署阶段部署一个轻量的模型。

在很多个class的多分类模型中，有些class的概率很低，但objective function仍然要计算他们。

## 模型

先用 cumbersome model 拟合，得到softmax层，  
$p_i=\dfrac{\exp(v_i/T)}{\sum\exp(v_i/T)}$
这一步与我们一般的理解一样。

下一步做distillation，就是把上一步的$p_i$作为y，因为这一步和上一步都用交叉熵作为cost function，我们得到
$\dfrac{\partial C}{\partial z_i}=\dfrac{1}{T}(q_i-p_i)=\dfrac{1}{T}(\dfrac{\exp(z_i/T)}{\sum_j\exp(z_j/T)}-\dfrac{\exp(v_i/T)}{\sum\exp(v_j/T)})$

### 近似

当T足够大时，

$\dfrac{\partial C}{\partial z_i}\approx \dfrac{1}{T}(\dfrac{1+z_i/T}{N+\sum_j z_j/T}-\dfrac{1+v_i/T}{N+\sum_j v_j/T})$

在假设logits 是 zero-meaned  
$\dfrac{\partial C}{\partial z_i}\approx \dfrac{1}{NT^2}(z_i-v_i)$

## 实验
使用了 MNIST，speech recognition 做了实验，效果良好。

## 我的理解
模型描述起来其实简答，但要理解为什么work，就要费一定的功夫了。  

### 关于 T（temperature）
写了个代码去模拟

```python
import numpy as np
import matplotlib.pyplot as plt

z=np.random.rand(5,1)*20
T=np.arange(1,10).reshape(1,9)

tmp=np.exp(z/T)
p=tmp/tmp.sum(axis=0)

plt.plot(p.T)
plt.show()
```
![](/pictures_for_blog/papers/distillation.png)

### 关于为什么work
下面是我的粗浅理解。

可以看成是一种 data augmentation，举例来说，你某次训练的标签是 [BMW, 卡车, 猫]，对应的label是[1,0,0]，用大模型生成的是[0.9,0.099,0.001]，得到了类与类之间的相似性，或者说更多的信息（使用小网络时，减少了信息丢失）。

然后 temperature 这个 trick可以让这个信息更明显。


