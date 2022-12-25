---
layout: post
title: 【Matlab工具箱】BP神经网络
categories: 趣文
tags: 
keywords:
description:
---

Matlab自带的神经网络工具箱非常好用。  
BP神经网络自动整合了验证集等防止过拟合，运算效率也很高  
完整代码如下：  

```
%BP神经网络通用代码
%%
%源数据
clear;clc;close
P=[-1 -1 2 2 ;0 5 0 5 ];
t=[-1 -1 1 1];
%%
%生成
net=newff(minmax(P),[3,1],{'tansig','purelin'},'traingd');
%输入参数：样本P范围，[各层神经网络数目]，{各层传递函数},'训练函数'
%训练函数：
%traingd------梯度下降法，7个参数
%traindm------有动量梯度下降法，附加1个参数mc(动量因子，默认0.9)
%traingda------有自适应lr的梯度下降法，附加3个参数lr_inc(学习率增长比,默认1.05),lr_dec(学习率下降比，默认0.7),max_perf_inc(表现函数增加最大比,默认1.04)
%traindx------梯度下降法,有动量,有lr，附加traindm和trainda的4个参数
%trainrp------弹性梯度下降法，可以消除输入数值很小或很大时的误差，附加4个参数delt_inc(权值变化增加量，默认1.2),delt_dec(权值变化减小量，默认0.5),delt0(权值变化初始量，默认0.07),deltamax(权值变化最大值，默认50.0)
%共轭梯度法：占用空间小，附加训练参数searchFcn，缺少训练参数lr
%共轭梯度法：traincgf--Fletcher--Reeves
%共轭梯度法：traincgp--Polak--Ribiere
%共轭梯度法：traincgb--Powell--Beale
%量化共轭梯度法：trainscg，比其他共轭梯度法更节省时间，附加两个参数sigma(因二次求导对全值调整的影响参数，默认5.0e-7),lambda(Hessian阵不确定性调整参数，默认5.0e-7)
%trainbfg--BFGS拟牛顿法，收敛速度快，需要内存多，适合小型网络，参数同共轭梯度法
%trainoss：一步正割的BP训练法，解决BFGS内存问题，参数同共轭梯度法
%train--Levenberg-Marquardt，用于内存充足的中小型网络

net=init(net)

net.trainparam.epochs=300;%最大训练次数
net.trainparam.lr=0.05;%学习率，默认0.01
net.trainparam.show=50;%显示训练过程，默认25，nan表示不显示
net.trainparam.goal=1e-5;%要求精度,默认0

[net,tr]=train(net,P,t)
a=sim(net,P)
```
