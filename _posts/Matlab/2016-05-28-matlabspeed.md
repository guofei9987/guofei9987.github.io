---
layout: post
title: 【Matlab】【合集】运行效率研究
categories: Geek
tags: Matlab
keywords:
description:
---

*此博客中的内容由本人(guofei)发表于新浪博客，2017年7月1日迁移到个人博客*  

用Matlab做好模型后，在部署时，要深刻思考代码运行效率问题。  
这里写上一些提高代码运行效率的技巧或思路  

## 1次方的形式
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
