---
layout: post
title: 【编程技巧】Matlab
categories: Geek
tags: Matlab
keywords:
description:
---
## 1
问题：从40个数中随机选取30个。要求等概率，无放回抽样  
[Python版本](http://www.guofei.site/2017/05/03/TrickPython.html#title0)
解答：
```
nums=random('unid',50,1,40);
mask=random('unif',0,1,1,40);
for i=1:40
    if sum(mask>mask(i))==30
        break   
    end
end
nums(mask>mask(i))
```
