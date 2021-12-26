---
layout: post
title: 【论文笔记】Deep neural networks are easily fooled
categories:
tags: 0x00_读论文
keywords:
description:
order: 2
---



- **Deep neural networks are easily fooled: High confidence predictions for unrecognizable images** (2015), A. Nguyen et al. [[pdf]](http://arxiv.org/pdf/1412.1897)
- 镜像地址 [pdf](https://github.com/guofei9987/pictures_for_blog/tree/master/papers)

## abstract&introduction
DNN识别图片，已经达到 near-human-level，我们想知道算法与人脑的区别。  
观察到这些现象：
- 一副狮子图片，稍加变化，就会被识别成其它东西。这个变化对人类来说微乎其微。
- 有时候，会把一些对人类无意义的图片，识别成某些类，with 99.99% confidence(叫做 fooling images)（论文给出了一些图片例子，可以看一眼）
- 把 fooling examples 作为新标签去训练，得到的新DNN，同样无法避免 fooling example 的现象。

## Methods
主要选用 AlexNet 做实验。此外还用 LeNet 做了验证。

生成新图片（novel images）的算法是 evolutionary algorithms (EAs)
Traditional EAs 在单目标或少数目标优化中表现良好。我们用一套洗算法， the multi-dimensional archive of phenotypic elites MAP-Elites

### MAP-Elites
MAP-Elites 的特点，按原文说是：  
MAP-Elites works by keeping the best individual found so far for each objective.  
（我理解这应该是选择算子的特点）

fitness：把image放入DNN，if the image generates a higher prediction score for any class than has been seen before, the newly generated individual becomes the champion in the archive for that class.  
（这个在细节上可以有多个理解，就不翻译了）

作者提供了两种encoding技术（用基因表示图片的技术）

#### 1. direct encoding
例如MNIST用28×28的灰度整数，ImageNet用256×256的三色整数（H.S.V）.每个位置的变异率是10%，每1000代变异率减半。用polynomial mutation operator（这个不太明白）with a fixed mutation strength of 15.

#### 2. indirect encoding
处理regular images，这种编码的特点是进行了一些压缩，所以某一基因，可能对应图片上的多个部分。  

具体的，用了一种叫做 compositional pattern-producing network (CPPN) 的方法。


（其实CPPN这一块没看太明白，回头多看几遍再来补）


## result
### 泛化性
用了两种情况
1. DNNA和DNNB have identical architecture，但初始化不一样。
2. DNNA和DNNB have different architecture，但使用同样的训练集。


有些图片会在DNNA上得到高分，但在DNNB上没有得高分。

### 用 fooling image 作为标签训练新模型
新模型有n+1个label，训练完后，发现新模型自己也有 fooling image

### 梯度上升法

第三种找到 fooling image 的方法。
