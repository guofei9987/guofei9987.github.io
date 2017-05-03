---
layout: post
title: 大数据机器学习初探---南大李武军
category: 科研
tags: Math Optimization MachineLearning
keywords: 组会
description: 
---

每周的组会大概会持续2小时。如果是主讲，就需要花更多的时间去准备报告内容。之前，组会开完我就不管了，缺乏总结思考。而这样子的话实质上意义就不大了，没有内化为自己的知识，也没有什么critical thinking。从现在开始，记录每一次组会的思考。

常言道：亡羊补牢，为时未晚。T.T

###Outline
- Learning to Hash
- Distributed Learning
- Stochastic Learning

有一个形象的比喻是这样说的，大数据是金矿，云计算是采矿技术，大数据机器学习是冶金技术。

大数据机器学习面临的挑战，一是存储，而是计算速度，三是网络。

哈希学习，在内存、硬盘、cpu、通信上有优势；
分布式学习在内存、硬盘、cpu上有优势，但会增加通信成本；随机学习在内存、硬盘、cpu方面有优势。


###Learning to Hash
主讲人：大师兄

最近邻搜索在大数据背景下，会出现维数灾难，存储成本也高，查询速度也慢。解决方法之一是保相似性哈希，可以降低维数并减少存储成本。通常用海明距离（hamming distance）来表征哈希值之间的差异。哈希方案也具有较快的查询速度，通常具有常数或者次线性的搜索时间复杂度；即使是穷举搜索也可以被接受，因为海明距离计算起来是很快的。

哈希函数学习的两个阶段：

1. Projection Stage（dimension reduction）
2. Quantization Stage

贡献：

- Isotropic Hash

思想：学习一个正交阵（幻灯片21页），其目的是让大于某一阈值的feature的重要程度是一样的。

- Supervised Hashing with Latent Factor Models
- Supervised Multimodal Hashing with SCM
- Multiple-Bit Quantization



###Distributed Learning
主讲人：我

主要内容：

1. 文章：Coupled Group Lasso for Web-Scale CTR Prediction
2. 文章：Distributed Power-Law Graph Computing

####文章1
为了解决在线广告的CTR（click through rate）预测，即当某广告展示给某用户时，它被该用户点击的概率，通常的方法是LR（logistic regression），即逻辑回归。但LR的一个短板是，因其是线性的，所以无法将用户与广告之间某些微妙的非线性关系纳入。注意LR中，正则项若为2范数平方，称为标准逻辑回归；正则项若为1范数，问题通常被叫做Lasso。所以需要一种新的方法。

这里的贡献是：

1. CGL的似然定义中，可以纳入用户与广告之间的某些非线性关系的考量。
2. 正则项改为参数的2-1范数，目的是是用户特征向量参数W、广告特征向量参数V中更多的行为0，行为0说明该行对应的feature没作用，即达到删除冗余feature的作用。

分布式实现。这个算法具有较好的扩展性，一个master，若干slave，类似于并行计算，从而实现分布式。

####文章2
GP（graph partitioning）图分割的方法有两种：边分割；点分割。点分割在分布式计算中的通信成本会比图分割小，原因在于在不同的machine上，点分割只需保留点的copy，而边分割需要同时保留点与边的copy。

切割degree大的点，即邻居多的点可以降低通信成本。




###Stochastic Learning
主讲人：浩锋

思想：在需要用到所有节点上的信息时，通信代价往往很大，这时可以随机的选取某一个节点上的信息（比如梯度）作为替代品。



###资料
【1】[幻灯片](http://cs.nju.edu.cn/lwj/slides/BigLearning.pdf)

【2】[Coupled Group Lasso for
Web-Scale CTR Prediction in Display Advertising](http://jmlr.csail.mit.edu/proceedings/papers/v32/yan14.pdf)

【3】[Distributed Power-law Graph Computing:
Theoretical and Empirical Analysis](http://papers.nips.cc/paper/5396-distributed-power-law-graph-computing-theoretical-and-empirical-analysis.pdf)



