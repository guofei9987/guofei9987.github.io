---
layout: post
title: 【强化学习】简介
categories:
tags: 0x33_图模型
keywords:
description:
order: 350
---

## 简介

强化学习对应一个四元组$<X,A,P,R>$,  
其中，
- X是环境状态集  
- A是机器的动作集
- $P:X\times A\times X \to R$指定了状态转移概率
- $R:X\times A\times X \to R$指定了奖赏

## K-摇臂赌博机问题

探索与利用是矛盾的，有些算法来折中这个矛盾

### epsilon-贪心法
每次以$\epsilon$概率去探索其他摇臂，以$1-\epsilon$概率去摇当前最好的摇臂。  
$\epsilon$可以随着次数而减少。  

### softmax法
选择概率这样计算：
$P(k)=\dfrac{\exp(Q_k)}{\sum\limits_k \exp(Q_k)}$

## 参考资料
周志华《机器学习》
