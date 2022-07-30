---
layout: post
title: 【论文笔记】
categories:
tags: 0x00_读论文
keywords:
description:
order: 3
---



- **How transferable are features in deep neural networks?** (2014), J. Yosinski et al. [[pdf]](http://papers.nips.cc/paper/5347-how-transferable-are-features-in-deep-neural-networks.pdf)
- 镜像地址 [pdf](https://github.com/guofei9987/pictures_for_blog/tree/master/papers)

## abstract&introduction

很多做图像 DNN 都有这么一个特点：第一层很像 Gabor filters and color blobs

Transferability 受两种 issue 的负面影响
- 做一个任务的网络，用到另一个任务上，而两个任务目的有差别
- 优化困难。


很多做图像 DNN 都有这么一个特点：第一层很像 Gabor filters and color blobs。这些DNN如此相似，以至于如果看到不相似的，人们第一怀疑是不是参数给错了，或者代码bug了。  
而且这一现象普遍存在与不同的 datasets，training objectives，甚至是不同的网络：(supervised image classification, unsupervised density learning, unsuperived learning of sparse represetations)。

除此之外，网络的最后一层显然没有这个现象，比如做分类，最后一层是softmax层，那么每一个 output 对应一个你事先规定好的label。  
我们把有这个现象叫做 **general**，例如前面提到的神经网络第一层。没有这个现象叫做 **specific**，例如前面提到的神经网络最后一层。  

自然想要提出几个问题：
- general 和 specific 的程度如何量化（quantify）
- transition 是在一层出现的，还是在多层出现的（Does the transition occur suddenly at a single layer, or is it spread out over several layers?）
- transition 在哪里出现：第一层附近，中间，还是最后几层？

对这些问题的研究，有助于 transfer learning 的研究。

### transfer learning
文章第二页介绍了 transfer learning 的做法，不多说。注意两个叫法：先训练的数据集叫做 base dataset，后训练的数据集叫做 target dataset

显然，如果target datasets 的数量远少于 base datasets ，transfer learning 是一个很好用的手段，且能防止过拟合。

transfer learning 可以这样：
保留前n层，后面的层可以重新设计（也可以用base network的），然后后面的层初始化，然后
- 一起训练（fine-tuned ）。
- 前n层不参与训练（frozen）

使用哪一种方法取决于 target datasets 的大小和前n层的参数的个数。
- 如果 target datasets 太小，前n层参数太多，用 fine-tune 可能导致 overfitting  
- 如果 target datasets 较大，前n层参数不多，用 fine-tune 可以提升表现。
- 当然，如果 target datasets 很大，你也用不着 transfer learning 了，直接训练一个新模型也可以。

## Generality vs. Specificity Measured as Transfer Performance
ImageNet有1000个class，随机分成2组，各500个class，分别训练两个8层CNN  
起名叫 baseA, baseB  
n从1到7，构造如下的网络：（下面以n=3为例）
- B3B。取 baseB 的前3层，frozen 的方式做 transfer learning，训练用B组数据（控制组）
- A3B。取 baseA 的前3层，frozen 的方式做 transfer learning，训练用B组数据。如果A3B的表现和baseB一样良好，那么有理由相信，前三层是 general 的（至少对于B组数据是的）。

论文作者又做了下面这些实验
- n从1到7
- A，B两组颠倒过来再做一套
- 不用 frozen 的方式，二用 fine-tuned（得到的网络起名为B3B+, A3B+）

下面是论文里的图，表示的就是上面写的这个，还是挺一目了然的。  
![](/pictures_for_blog/papers/transferable-features.png)  


## 结果分析

![](/pictures_for_blog/papers/transferable-features2.png)  

1. baseB 的 top-1 error 是比1000个class的网络低的，这是因为只有500个class
2. 看BnB。当n为1,2 的时候，performance都和baseB一致，但3,4,5,6 的 performance 会变差。文章给出的解释是 fragile co-adapted features，feature 之间复杂的交互作用，不能仅靠后面的层来学习。（features that interact with each other in a complex or fragile way such that this co-adaptation could not be relearned by the upper layers alone.）这个我也是想了一会儿才理解，例如，baseB 本来后面的层学习到了一些比较奇怪的 feature 组合方法，但做BnB的时候，初始化没了，前n层又是固定的，所以学不出来了。  
后面6,7层，performance 又变好了，这是因为结构简单了（一两层的神经网络），奇怪的 feature 组合方式也能学出来。
3. BnB+ 作为 control ，证明 fine-tuned 的 performance 和 baseB 一样。
4. AnB 1,2,3的 performance 稍有下降，4~7下降比较厉害，有上面对BnB的分析，我们知道原因有两个：the drop from lost co-adaptation and the drop from features that are less and less general. On layers 3, 4, and 5, the first effect dominates, whereas on layers 6 and 7 the first effect diminishes and the specificity of representation dominates the drop in performance.
5. AnB+ 的情况让人惊讶。
    - 以前觉得原因是规避了小数据上的过拟合，但这个结果显示，即使是大数据，表现也会变好。
    - 这一结果的原因，也不能归结于训练次数的增多，因为 BnB+ 的训练次数也同样增多了，但结果并没有变好。
    - 一个合理的解释是，baseA的学习结果还逗留在神经网络中，提升了泛化性。（原文the effects of having seen the base dataset still linger, boosting generalization performance. It is surprising that this effect lingers through so much retraining.）

### 换一下数据集看看
![](/pictures_for_blog/papers/transferable-features3.png)

左上角的图，A，B这两个数据集不再随机分割，而是分为man-made/natural ，标签数量是449对551。然后话AnB和BnA图


右上角的图，是为了对2004和2009年两个大神的结论做进一步研究。当时的结论是，random convolutional filters, rectification, pooling, and local normalization 的组合，也能 work。  
这里看到n=1,2 时，表现下降，并在n=3时表现变成0
