---
layout: post
title: 【论文笔记】Visualizing and understanding CNN
categories:
tags: 0x00_读论文
keywords:
description:
order: 6
---


- **Visualizing and understanding convolutional networks** (2014), M. Zeiler and R. Fergus [[pdf]](http://arxiv.org/pdf/1311.2901)
- 镜像地址 [pdf](https://github.com/guofei9987/pictures_for_blog/tree/master/papers)

## abstract&introduction
最近人们发现，CNN的效果很好，但没人知道：
- 为什么表现好
- 如何提升效果

这篇论文就是要解决这个问题。并提出了一些创新的可视化方法。

## 做法
这篇文章用的是这种CNN：ReLU、带max pooling、（有时）有正则化。

（原文不够详细，我又查了其它资料）
### deconvnet
#### 1. Unpooling

pooling是不可逆的，因此需要一定的期缴来处理。在做pooling时，额外记最大的坐标，然后unpooling的过程中，把相应坐标填进去，其余格子置为0

下面这个示意图是在其他地方找的:

![visualizing_and_understanding1](/pictures_for_blog/papers/Understanding_Generalization_Transfer/visualizing_and_understanding1.png)

#### 2. Rectification

因为用的激活函数是ReLu，因此反激活过程也是ReLu

#### 3. Filtering

反卷积




### 训练
用的是 ImageNet 2012，细节就不摘抄了。

### 可视化
用前面写的 deconvnet，对某个激活值，不是给出最大的图片，而是给出top9
