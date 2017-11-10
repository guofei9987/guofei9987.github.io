---
layout: post
title: 【HMM】理论篇.
categories:
tags: 机器学习
keywords:
description:
---


*阅读本文前，请先保证已经了解[马尔科夫过程](http://www.guofei.site/2017/07/09/markov.html)*  

## 模型介绍


隐马尔可夫过程(HMM, Hidden Markov Model)用于描述由隐藏的马尔可夫链生成贯彻序列的过程  


隐藏的马尔科夫链随机生成序列，称为 **状态序列(state sequence)**  
每个状态生成一个观测，观测组成的的序列，称为 **observation sequence**  


### 变量定义
Q是所有隐藏状态的集合，V是所有可能地观测的集合  
$$Q=\{ q_1,q_2,...q_N\}, V=\{v_1,v_2,...v_M\}$$  
N是所有可能地状态数，M是所有可能地观测数  
$A_{N\times N}$是状态转移矩阵，$B_{N\times M}$是从状态生成观测的概率矩阵。  


一个隐马尔可夫模型$\lambda =(A,B,\pi) $  



## 参考资料
[^lihang]: [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)  
[^wangxiaochuan]: [王小川授课内容](https://weibo.com/hgsz2003)  
[^EM]: 我的另一篇博客[EM算法理论篇](http://www.guofei.site/2017/11/09/em.html)
