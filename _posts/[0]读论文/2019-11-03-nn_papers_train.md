---
layout: post
title: 【论文笔记】Optimization/Training Techniques
categories:
tags: 0x00_读论文
keywords:
description:
order: 2
---


## 1. Improving neural networks by preventing co-adaptation of feature detectors

小数据用在大规模神经网络上的时候会有 overfiting  
不过这个问题可以这样解决：每个训练样本随机忽略掉一半特征。这可以防止复杂的 co-adaptations，使每个神经元都要学习有用的特征。

dropout 可以看作是多个模型做平均。而用标准的方法做模型平均消耗很多计算资源。

Dropout 还可以看成是 Bayesian model averaging 的一种实现。Bayesian model averaging 的典型实现是 Markov chain Monte Carlo。Dropout 的优点是，在测试阶段全部通过就行了，无需对独立模型做平均。

Dropout 可以看成bagging，区别是bagging的众多模型是一次训练出来的。

Dropout的极端情况是 naive bayes，朴素贝叶斯的每个特征都是独自训练的。

Dropout 机理还可以类比“进化历史上性别的产生”，大量 co-adapted genes 在 robust 方面不如多替代的方式。另外，还降低了这种可能性：环境小变化导致适应性大降（这对应机器学习中的 overfitting）

## Dropout: A simple way to prevent neural networks from overfitting

- **Dropout: A simple way to prevent neural networks from overfitting** (2014), N. Srivastava et al. [[pdf]](http://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf)
- **Batch normalization: Accelerating deep network training by reducing internal covariate shift** (2015), S. Loffe and C. Szegedy [[pdf]](http://arxiv.org/pdf/1502.03167)
