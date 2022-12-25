---
layout: post
title: 【Matlab工具箱】REF径向基网络
categories: 趣文
tags: 
keywords:
description:
---

```
%RBF神经网络,径向基网络
%%
%生成数据
clear;clc;close;
p=-1:0.001:5;
a=sin(p);
plot(p,a);
%%
%训练
eg=1e-3;%误差
sc=100;%步数
net=newrb(p,a,eg,sc);
Y=sim(net,p);

plot(p,a,'*')
hold on
plot(p,Y)
hold off
title('目标向量和输出向量')


```
