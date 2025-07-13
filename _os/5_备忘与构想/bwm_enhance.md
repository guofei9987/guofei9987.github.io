---
layout: open_source
title: 【改进】blind_watermark
categories: 开源
tag: 备忘与构想
order: 209
repo_name: blind_watermark
---


## 1. 性能方面
### svd性能

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


代码
```

'''
待替换：

def block_add_wm_slow(self, arg):
        block, shuffler, i = arg
        # dct->(flatten->加密->逆flatten)->svd->打水印->逆svd->(flatten->解密->逆flatten)->逆dct
        wm_1 = self.wm_bit[i % self.wm_size]
        block_dct = dct(block)

        # 加密（打乱顺序）
        block_dct_shuffled = block_dct.flatten()[shuffler].reshape(self.block_shape)
        u, s, v = svd(block_dct_shuffled)
        s[0] = (s[0] // self.d1 + 1 / 4 + 1 / 2 * wm_1) * self.d1
        if self.d2:
            s[1] = (s[1] // self.d2 + 1 / 4 + 1 / 2 * wm_1) * self.d2

        block_dct_flatten = np.dot(u, np.dot(np.diag(s), v)).flatten()
        block_dct_flatten[shuffler] = block_dct_flatten.copy()
        return idct(block_dct_flatten.reshape(self.block_shape))
'''

import numpy as np
from numpy.linalg import svd

d1 = 36


def algo_old(block_dct_shuffled, wm_1):
    u, s, v = svd(block_dct_shuffled)

    s[0] = (s[0] // d1 + 1 / 4 + 1 / 2 * wm_1) * d1
    return np.dot(u, np.dot(np.diag(s), v))


# %%


from numba import jit

# 精度
precision = 1e-8


@jit(nopython=True)
def get_eig(A):
    # 精度
    x = np.random.rand(4, 1)
    y_norm_old = 0

    for i in range(20):
        y = A @ x
        y_norm = np.linalg.norm(y)
        x = y / y_norm

        if -precision < y_norm - y_norm_old < precision:
            # 特征值，特征向量
            return (x.T @ A @ x)[0, 0], x

        y_norm_old = y_norm

    return (x.T @ A @ x)[0, 0], x


@jit(nopython=True)
def block_add_wm3(A, wm_1):
    lam, u1 = get_eig(A @ A.T)
    lam = np.sqrt(lam)

    v1 = A.T @ u1
    v1 = v1 / np.linalg.norm(v1)

    add = (lam // d1 + 1 / 4 + 1 / 2 * wm_1) * d1 - lam
    return A + (u1 @ v1.T) * add


block_dct_shuffled = np.random.rand(4, 4) * 255

wm_1 = 0
res1 = block_add_wm3(block_dct_shuffled, wm_1)
res2 = algo_old(block_dct_shuffled, wm_1)

assert (np.abs(res1 - res2)).max() < 1e-6

import datetime

num = 10000
A_ = np.random.rand(4, 4) * 255
A = np.sqrt(A_ @ A_.T)

start_time = datetime.datetime.now()
for i in range(num):
    block_add_wm3(block_dct_shuffled, wm_1)
print(datetime.datetime.now() - start_time)

start_time = datetime.datetime.now()
for i in range(num):
    algo_old(block_dct_shuffled, wm_1)
print(datetime.datetime.now() - start_time)

```


## 2. 对截图的优化

（牵涉较多）

截图（裁剪+缩放）后，现在需要原图来计算其原本的位置和大小。希望改进算法后，不需要原图。
1. 推导公式发现， dct+svd，可以简化为 svd（如果不考虑shuffle的话）
2. svd 性能太低，如果用解析解 4x4 对应的是 4次方程，也不简单。可以考虑用 3x3
3. 可以不用 svd，因为 dct 本身倾向于就把低频部分放到左上角。而 4x4 这么小的分快一般就是低频为主。经过实验室可行的。试了一下，相当于原像素点加上 `k * ones`，本质上就是一种可用于照片的 LSB



## 3. 加入水印清晰度指标

1. 水印清晰度。指的是所有方块清晰度的平均值
2. 水印一致性。指的是重复的水印（以及纠错码）的一致性



## 4. 加入 ECC

待加入，比较方便

