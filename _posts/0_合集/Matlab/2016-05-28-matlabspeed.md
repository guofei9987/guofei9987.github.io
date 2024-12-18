---
layout: post
title: 【Matlab】运行效率研究
categories: Matlab
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



## table运行效率研究

**此部分内容已过时，因为用table做数据清洗，无论如何也比不上Python来的有效率**





Matlab新增了一个table对象，可以让我们非常直观地管理数据。然而，对于大量数据处理的场景来说，效率仍然是第一位要考虑的。  
本文的目的是测试table的效率  
老规矩，先上代码：  
```
%table
function test_tic_toc()
x=8;
y=9;
in_put=random('unid',9,x,y);
add_put=random('unid',9,x,1);

in_table=array2table(in_put);
in_cell=mat2cell(in_put,ones(x,1),ones(y,1));
add_cell=mat2cell(add_put,ones(x,1),1);
add_table=array2table(add_put);
n=10000
tic
for i=1:n
    test_table(in_table,add_table);
end
toc

tic
for i=1:n
    test_mat(in_put,add_put);
end
toc
tic
for i=1:n
   test_mat(in_cell,add_cell);

end
toc
end
function T=test_table(T,y)
[T,y];

end
function T=test_mat(T,y)
[T,y];
end
function T=test_cell(T,y)
[T,y];
end
```
计时刨除了赋值环节，只关注列合并运算  
T.y=y;的情况:  
>Elapsed time is 2.597898 seconds.  
Elapsed time is 0.031021 seconds.  
Elapsed time is 0.052530 seconds.  

如此慢的原因可能是因为有赋值环节

[T,y];的情况:  
>Elapsed time is 1.218450 seconds.  
Elapsed time is 0.034376 seconds.  
Elapsed time is 0.067499 seconds.  

快了一倍，但比起mat和cell，还是效率低下

-----------------------------------------------------------------------------------------
以上实验似乎证明table并不实用。然而考虑实际应用场景，加大输入数据的行数，再做实验  
修改代码：  

```
x=80000;
n=100
[T,y];%连接方法
```

>Elapsed time is 0.019447 seconds.  
Elapsed time is 0.333143 seconds.  
Elapsed time is 4.205813 seconds.  

在数据的行数为80000时，table效率极高，**竟然远远超过了matrix** ！  
与此同时，cell的表现极为糟糕  
得出结论：  
1. 从列合并的实验看，table非常适合大规模数据运算，甚至比matrix还要快很多  
2. table不适合循环。Matlab的循环一直不是强项，但某一版本开始对matrix和cell的循环进行了优化，猜测对table还是有优化的潜力的，期待Mathworks公司发力。
3. 不过没关系，table的使用场景不太会有大量循环，并且按行处理数据可以用cellfun解决。  
综上，无论是效率还是程序可读性上，table都是非常优秀的对象，注意使用中要避开一些坑。  



## 一些题目
问题：从40个数中随机选取30个。要求等概率，无放回抽样  
[Python版本](http://www.guofei.site/2017/05/03/TrickPython.html#title0)
解答：
```py
nums=random('unid',50,1,40);
mask=random('unif',0,1,1,40);
for i=1:40
    if sum(mask>mask(i))==30
        break   
    end
end
nums(mask>mask(i))
```
