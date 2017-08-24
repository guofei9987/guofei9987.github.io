---
layout: post
title: 算法1：复杂度.
categories: 算法
tags: 经典算法
keywords:
description:
---

用递归生成树结构的一般方法：（我总结的）  
（Matlab）  
```matlab
function myfun(i,A)
    if iscorrect(i,A)
        for i=ii
            myfun(i,A)
    elseif 到了树终点
        statement
    else
        donothing
    end
end
```
