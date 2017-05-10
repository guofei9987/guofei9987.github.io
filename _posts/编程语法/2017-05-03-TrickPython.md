---
layout: post
title: 【编程技巧】Python
categories: Geek
tags: 语法速查
keywords:
description:
---

## 1
问题：从40个数中，随机选取30个

答案：
```
for i=1:40
    if sum(Y_chrom_log_temp>=Y_chrom_log_temp(i))==30
        Y_chrom_log=Y_chrom_log_temp>=Y_chrom_log_temp(i);
        i
        break
    end
end
```

-----
## 2

问题：list中不规则取数
```
[c1[i] for i in [0,1,3]]#不规律的标号，这样取
```
-----
