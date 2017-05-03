---
layout: post
title: 各类范数
category: 科研
tags: Math
keywords: 向量范数，矩阵范数
description: 
---

###向量范数
![vector_norms](/public/img/posts/vector_norms.JPG)


###矩阵范数
![matrix_norms](/public/img/posts/matrix_norms.JPG)


###矩阵乘积的迹
![trace](/public/img/posts/trace.JPG)

###特殊范数
- 矩阵W的L2-1范数：
![2_1norm](/public/img/posts/2_1norm.png)

###TV范数
||L(x)||_1。 其中L是差分算子，x是某种数字信号，在一维情况下，如下所示：

||L(x)||_1 = |x2-x1| + |x3-x2| + |x4-x3| + ……

加TV范数的目的是为了使求得的去噪信号仍然具有分段连续的性质。因为差值的1范数说明差值稀疏，从而说明求得的信号分段连续。
