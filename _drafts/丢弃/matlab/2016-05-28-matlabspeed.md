---
layout: post
title: 【丢弃】【Matlab】运行效率研究
categories:
tags:
keywords:
description:
---

*此博客中的内容由本人(guofei)发表于新浪博客，2017年7月1日迁移到个人博客*  

用Matlab做好模型后，在部署时，要深刻思考代码运行效率问题。  
这里写上一些提高代码运行效率的技巧或思路  

## 1. 高次方运行效率研究
```
%非嵌套
tic
for i=1:10000
    p=2*2.^3+3*2^2+1.5*2+1;

end
toc
%嵌套
tic
for i=1:10000
    p=(((2*2+3)*2)+1.5)*2+1;
end
toc
```
以上两段程序，从形式看起来上1比2简洁，感觉会高效一些，然而事实相反：  
>Elapsed time is 0.001703 seconds.  
Elapsed time is 0.000143 seconds.  
Elapsed time is 0.001707 seconds.  
Elapsed time is 0.000144 seconds.  
Elapsed time is 0.002026 seconds.  
Elapsed time is 0.000163 seconds.  
Elapsed time is 0.001864 seconds.  
Elapsed time is 0.000161 seconds.  
Elapsed time is 0.001945 seconds.  
Elapsed time is 0.000163 seconds.  
Elapsed time is 0.002042 seconds.  
Elapsed time is 0.000166 seconds.  
Elapsed time is 0.001810 seconds.  
Elapsed time is 0.000145 seconds.  
Elapsed time is 0.002178 seconds.  
Elapsed time is 0.000162 seconds.  


看来多用嵌套，少用高次方这种高级运算确实会提高效率


## 2. 随机数产生的效率比较

在量化交易里，运算速度直接决定交易的结果好坏。  
用matlab生成随机数，方法多种多样  
unifrnd生成连续随机数，rand * k有同样效果  
unidrnd生成离散随机数,ceil（rand * k）有同样的效果  

下面比较一下运行效率：  

```
k=1:10;

tic
for i=k
x1=unifrnd(0,100,1000,1000);
end
toc

tic
for i=k
x2=unidrnd(100,1000,1000);
end
toc

tic
for i=k
x3=rand(1000,1000)*100;
end
toc

tic
for i=k
x4=ceil(rand(1000,1000)*100);
end
toc
```
运行结果：  


>Elapsed time is 0.273217 seconds.  
Elapsed time is 0.211033 seconds.  
Elapsed time is 0.168255 seconds.  
Elapsed time is 0.194122 seconds.  

再次运行：

>Elapsed time is 0.230651 seconds.  
Elapsed time is 0.201707 seconds.  
Elapsed time is 0.152219 seconds.  
Elapsed time is 0.196154 seconds.  

再次运行：

>Elapsed time is 0.252402 seconds.  
Elapsed time is 0.196528 seconds.  
Elapsed time is 0.147061 seconds.  
Elapsed time is 0.193649 seconds.  

再次运行：

>Elapsed time is 0.227293 seconds.  
Elapsed time is 0.192890 seconds.  
Elapsed time is 0.148696 seconds.  
Elapsed time is 0.195020 seconds.  


可以看出，专门命令的效率还不如用rand搭建的效率。
所以不需要记那么多代码了，直接用rand代替吧。

当然normrnd能够缩减代码长度。

## 3.size与length
```
a=rand(100,100);
tic
for i=1:10000
    k=0;
    k=size(a,1);

end
toc
tic
for i=1:10000
    k=0;
    k=length(a);
end
toc
```


运行后

运行一次：
>Elapsed time is 0.086217 seconds.  
Elapsed time is 0.000335 seconds.  

运行一次：
>Elapsed time is 0.075945 seconds.  
Elapsed time is 0.000201 seconds.  

运行一次：
>Elapsed time is 0.074647 seconds.  
Elapsed time is 0.000174 seconds.  

运行一次：
>Elapsed time is 0.072377 seconds.  
Elapsed time is 0.000167 seconds.  

运行一次：
>Elapsed time is 0.055643 seconds.  
Elapsed time is 0.000341 seconds.  

运行一次：
>Elapsed time is 0.073277 seconds.  
Elapsed time is 0.000134 seconds.  

运行一次：
>Elapsed time is 0.038882 seconds.  
Elapsed time is 0.000141 seconds.  

可见，length的效率远远高于size
但是size更加灵活多用途，所以实际使用中要灵活选取。
