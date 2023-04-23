---
layout: post
title: 【改进】blind_watermark
categories: 开源
tags: 0x58_密码学
keywords:
description:
repo_name: blind_watermark
---


## svd性能

使用 `profile` 发现，程序运行过程中 `np.svd` 占用80% 的耗时，因此需要改进。



SVD 数学描述：$A_{m\times n}=U_{m\times m}S_{m\times n}V_{n\times n}^T$
- 其中,U,V是正交矩阵，$UU^T=E, VV^T=E$
- S是对角矩阵

### 第一次提升性能

blind_watermark 的一些特点，使得这个步骤有一定的性能提升空间
- A是确定的 4x4 的矩阵
- 最终需要的不是 svd 分解后的 3 个矩阵，而是改变 最大特征值之后的乘积

$AA^T=(USV)(USV)^T=USVV^TS^TU^T=US^2U^T$  
$A^TA=VS^2V^T$  

要的最终结果是
$$A_2=U(S+
[\begin{array}{c}
    x&0&0&0\\ 0&0&0&0 \\0&0&0&0 \\ 0&0&0&0 \\
    \end{array}]
    )V=A+U
[\begin{array}{c}
    x&0&0&0\\ 0&0&0&0 \\0&0&0&0 \\ 0&0&0&0 \\
    \end{array}]
    V$$
$$=A+[u_1u_2u_3u_4][\begin{array}{c}
    x&0&0&0\\ 0&0&0&0 \\0&0&0&0 \\ 0&0&0&0 \\
    \end{array}][\begin{array}{c}
    v_1^T\\ v_2^T \\ v_3^T \\ v_4^T \\
    \end{array}]
=A+u_1xv_1^T
$$

因此只需要求解最大特征值，以及最大特征值对应的特征向量

另一篇博客，写了如何用迭代法求解最大特征值，以及最大特征值对应的特征向量。

【代码】

结果：
- 平均需要5次迭代，每次迭代计算1次矩阵积
- 实际性能：（试验1万次），单次耗时为 `np.svd` 的 30%
- 但是为了替代 svd，需要调用2次求特征值，算上计算 $AA^T,A^TA$的消耗，耗时并没有降低。尽管绝对的计算量低很多。
- 这是因为 python 脚本比不上深度调优的 `np.svd`
- 下面进一步优化，只需要计算1次特征值，另一个特征向量用一个矩阵积得到

### 进一步优化

注意到 $AA^T,A^TA$ 都是实对称矩阵，而且特征值一定一模一样。以此为入手点，继续优化。

假设
- $AA^T$对应的最大特征值 $\lambda$，特征向量 $u_1$
- $A^TA$对应的最大特征值一定也是 $\lambda$，特征向量 $v_1$

推导：
- 特征值的定义：$A^TAv_1=\lambda v1$
- 左乘 A：$AA^TAv_1=\lambda A v_1$
- 也就是 $AA^T(Av_1) =\lambda (A v_1)$
- 得到 $Av_1=u_1$（然后还要对 $u_1$ 做个单位化）

上面的算式有一项 $u_1xv_1^T$ 实际上就是 $x u_1 v_1^T = x A v_1 v_1^T$ （还要乘以单位化的系数）  
颠倒过来推导，也可以得到 $u_1u_1^T A$
