---
layout: post
title: 【Matlab】table运行效率研究
categories: 回收
tags:
keywords:
description:
---

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
