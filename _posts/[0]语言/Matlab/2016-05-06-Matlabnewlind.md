---
layout: post
title: 【Matlab工具箱】线性神经网络
categories: 趣文
tags: 
keywords:
description:
---

## 生成
newlind：生成线性层，并运算  

```
net=newlind(P,T,Pi)
```

可以直接sim(net,new_x)出结果

### newlin

newlin：生成线性层，但不运算  
```Matlab
net=newlin(P,T,ID,LR)
```
其中P，T分别是典型的输入向量和输出向量  
ID：输入延迟  
LR：学习率  
权值函数：dotprod  
网络输入函数：netsum  
传输函数：purelin（简单的线性变换）  

LMS学习函数：learnwh，  
```Matlab
[dW,LS]=learnwh(W,P,Z,N,A,T,E,gW,gA,D,LP,LS)
%核心函数是：
de=lr*e*p'
```
最大学习率：maxlinlr
```Matlab
lr=maxlinlr(P)
%核心函数是：
lr=0.9999/max(eig(P*P'));
```
### train
```
net=train(net,P,T)
```

## 下面是一段完整的程序

```
%线性网络通用程序
clear;clc;close;
time=0:0.01:10;
T=sin(time*2*pi);
Q=length(T);
P=zeros(5,Q);
P(1,2:Q)=T(1,1:(Q-1));
P(2,3:Q)=T(1,1:(Q-2));
P(3,4:Q)=T(1,1:(Q-3));
P(4,5:Q)=T(1,1:(Q-4));
P(5,6:Q)=T(1,1:(Q-5));
plot(time,T)
xlabel('时间')
ylabel('目标信号')
%%
%生成和训练
net=newlind(P,T);%生成线性网络
a=sim(net,P);%网络测试
figure(2)
subplot(1,2,1)
plot(time,a,time,T,'k:')
title('输出信号和目标信号')
%%
%评价
e=T-a;
subplot(1,2,2)
plot(time,e)
title('误差曲线')
```
