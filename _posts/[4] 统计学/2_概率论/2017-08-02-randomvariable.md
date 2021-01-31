---
layout: post
title: 概率测度简介
categories:
tags: 4-2-概率论
keywords:
description:
order: 450
---

本文介绍的概念：  
样本，样本空间  
事件  
全集  
概率测度  
概率空间,完备的概率空间  


## 样本，事件

**样本空间**(sample space)  
这里暂时不给出精确定义，而是给出描述：  
样本空间是所有样本点的集合

**事件**(event)  
是样本空间的一个子集  

## 全集


**全集**  (complete collection)  
给定样本空间S，一个事件的集合$$\epsilon=\{A\mid A \subset S\}$$称为`全集`，如果：  
1. $\emptyset ,S \subset \epsilon$
2. $\forall A \in S,\bar A \in \epsilon$
3. $A_j \in \epsilon \Longrightarrow \bigcup_j A_j \in S$  


举例来说，一枚硬币抛10次，  
样本空间中有$2^{10}$个样本。  
全集中有$2^{2^{10}}$个事件。  




## 概率测度
给定一个`样本空间`S，一个事件的`全集`$$\epsilon=\{A\mid A \subset S\}$$,  
**概率测度** (probability measure)是这样一种映射$Pr:\epsilon \to [0,1]$,并且满足以下特征  
1. $Pr(S)=1$
2. 如果$A\in \epsilon$,那么$Pr(A) \geq 0,Pr(\bar A)=1-Pr(A)$
3. 如果对于$j=1,2,3,..., A_j\in \epsilon$是`互斥事件`(mutually exclusive events)，即$\forall j \neq k,A_j \cap A_k =\emptyset$ , 那么$Pr(\bigcup_j A_j)=\sum Pr(A_j)$   

$(S,\epsilon,Pr)$叫做 **概率空间** （probability space）  

**零事件**  如果$Pr(A)=0$,那么事件$A \in \epsilon$在Pr下是一个 **零事件** (null event)  

**完备的测度空间** 如果A是一个`零事件`，且$\forall A' \subset A \ni A' \in \varepsilon$,那么$(S,\varepsilon,Pr)$称为`完备概率空间`


**随机变量**：
随机变量是一种函数$X:S\to R$
