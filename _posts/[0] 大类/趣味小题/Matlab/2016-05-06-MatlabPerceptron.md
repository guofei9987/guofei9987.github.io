---
layout: post
title: 【Matlab】自编代码实现感知机
categories: 趣文
tags: 
keywords:
description:
---

不用工具箱，只用基本语言从0实现感知机Perceptron。  
手动实现代码比仅仅看懂理论，理解要深刻很多。    
下面放上代码，大家看看也没坏处   

```Matlab
%不用工具箱
%感知机
clear;clc;close
m=100;
p0=random('unif',-1,1,2,m);
t=(2*p0(1,:)+p0(2,:))<0.25;

eta=0.1
w0=[1,1];b0=[1];%初始化

w=[b0,w0];
p=[ones(1,m);p0];

plot(p0(1,t),p0(2,t),'.')
hold on
plot(p0(1,~t),p0(2,~t),'o')

plot_point_1=[-(w(1)+w(3))/w(2),1];
plot_point_2=[-(w(1)-w(3))/w(2),-1];
h=plot([plot_point_1(1),plot_point_2(1)],[plot_point_1(2),plot_point_2(2)]);
%%
k=0
while k<30
    for i=1:m
        y=(w*p(:,i)>=0);
        e=t(1,i)-y;
        w=w+eta*e*p(:,i)';
        %缺点是eta不递减

        plot_point_1=[-(w(1)+w(3))/w(2),1];
        plot_point_2=[-(w(1)-w(3))/w(2),-1];


        set(h,'xdata',[plot_point_1(1),plot_point_2(1)])
        set(h,'ydata',[plot_point_1(2),plot_point_2(2)])
        title(num2str(i))
        drawnow
        pause(0.1)
    end

    %下面是算法停止条件
    if k==30%条件1：超过最大迭代次数
        break
    end
    %条件2：误差已经很小
    %条件3：权重变化已经很小
    k=k+1;
end
```
