---
layout: post
title: 【CRF】理论篇.
categories:
tags: 有监督学习
keywords:
description:
---


*阅读本文前，请先保证已经了解[马尔科夫过程](http://www.guofei.site/2017/07/09/markov.html)、[graph](http://www.guofei.site/2017/05/18/algorithm2.html)*  

## 模型介绍
条件随机场(conditional random field， CRF)[^zhihu]  
### 与其他模型的关系
每一个HMM模型都等价于某个CRF[^1]  

![1d3f9cefc0de33cfebe71bbc237ccc6b_r](https://i.imgur.com/VBinUny.jpg)  


概率图分为两类：  
1. 有向图。（贝叶斯网络，信念网络）[^2]
2. 无向图。（马尔科夫随机场，马尔科夫网络）  


### 基础定义

概率图模型(probabilistic graphical model)用graph表示概率分布。[^lihang]  
在无向图$G=(V,E)$上，每个节点$v\in V$对应一个随机变量$Y_v$，每个边$e\in E$对应随机变量之间的关系。  


进而定义三个概念：
1. 成对马尔科夫性(pairwise Markov property)
2. 局部马尔科夫性(local Markov property)
3. 全局马尔可夫性(global Markov property)


成对马尔科夫性
: $u,v$是无向图G上任意两个不相邻的结点，其它所有结点是O.$P(Y_u,Y_v\mid Y_O)=P(Y_u\mid Y_O)P(Y_v\mid Y_O)$  


局部马尔可夫性
: $v$是G上一个结点，$W$是与$v$相连的所有结点，$O$是$v,W$外的所有结点。$P(Y_v,Y_O\mid Y_W)=P(Y_v\mid Y_W)P(Y_O\mid Y_W)$  


全局马尔可夫性
: $A,B,C\subset V$是点集，A,B被C分开。$P(Y_A,Y_B\mid Y_C)=P(Y_A\mid Y_C)P(Y_B\mid Y_C)$  


实际上，成对马尔科夫性、局部马尔可夫性、全局马尔可夫性是等价的。  


一个**概率图模型** ，如果满足马尔可夫性（成对、局部、全局），叫做 **概率无向图模型（probability undirected graphical model）**，或者 **马尔科夫随机场（Markov random field）**  


### 因子分解


C是无向图G的子图，如果C是完全图，叫做一个 **团(clique)**。  
如果一个团不能再加入任何一个结点，叫做 **最大团（maximal clique）**  


给定概率无向图模型，可以分解成所有 **最大团** C的乘机形式，也就是说$P(Y)=\dfrac{1}{Z}\prod\limits_C \Psi_C(Y_C)$,  
其中，Z是规范化因子$Z=\sum\limits_Y\prod\limits_C\Psi_C(Y_C)$  
其中，$\Psi(Y_C)$称为势函数，势函数是严格正函数。  
（通常，可以这么定义$\Psi_C(Y_C)=\exp(-E(Y_C))$）  


Hammersley-Clifford定理：对于任意概率无向图，都可以做上述因子分解。  



## 参考资料
[^lihang]: [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)  
[^wangxiaochuan]: [王小川授课内容](https://weibo.com/hgsz2003)  
[^EM]: 我的另一篇博客[EM算法理论篇](http://www.guofei.site/2017/11/09/em.html)
[^zhihu]: https://www.zhihu.com/question/35866596
[^1]: http://blog.csdn.net/a819825294/article/details/53893231
[^2]: http://www.jianshu.com/p/55755fc649b1
