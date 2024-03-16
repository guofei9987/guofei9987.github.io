---
layout: post
title: 【擦除码】理论和实现
categories:
tags: 0x58_密码学
keywords:
description:
order: 59003
---

相关文章：
- [擦除码](https://www.guofei.site/2024/01/20/reed_solomon.html)
- [纠错码](https://www.guofei.site/2024/01/21/reed_solomon2.html)


## 介绍


| 算法 | 校验位大小 | 特点 | 功能 |
|--|--|--|--|
| 奇偶校验码（Parity Code） | 1个 | 算法最简单 | 只能检测奇数个位的错误，无法纠错。方法：在数据后添加一个校验位，使二进制位1的个数为奇数（或偶数） |
| 汉明码（Hamming Code） | 1个 | 算法简单 | 检测并修正单个位错误；检测双位错误，但不能修正 |
| 里德-所罗门码（Reed-Solomon Code） | 多个（取决于配置） | 强大的纠错能力，广泛用于CD和DVD、无线通信和卫星通信 | 纠正多个错误。特别擅长突发错误（就是错误集中在较小的区域） |
| 循环冗余校验（Cyclic Redundancy Check, CRC） | 多个（取决于CRC多项式长度） | 检测随机改变 | 检测数据传输或存储中的错误 |
| 卷积码（Convolutional Code） | 取决于码率和约束长度 | 用于无线通信 | 错误校正用于连续位流 |
| 涡轮码（Turbo Code） | 取决于码率和内部组件 | 高效率 | 广泛应用于深空通信和移动通信 |
| LDPC码（Low-Density Parity-Check Code） | 多个（取决于配置） | 接近香农极限 | 广泛用于高速数据传输和数据广播，如蓝光、Wi-Fi |
| BCH码（Bose-Chaudhuri-Hocquenghem Code） | 多个（取决于配置） | 多位错误修正 | 适用于控制系统和卫星通信 |
| 极化码（Polar Code） | 取决于码率和长度 | 接近香农极限 | 5G通信标准的控制信道编码 |
| 字符校验和（Checksum） | 可变 | 简单检测 | 检测数据包或文件的完整性 |





Reed-Solomon 有 2 个分类
- Erasure 擦除码。
    - 功能：若干数据丢失。或者若干数据错误，但知道是哪些数据错误（其实是一回事） 
    - 原始数据 k 组，加上校验码后为 n 组，传输过程中有丢失，只需要剩下的任意 k 组，就可以还原出结果
    - 应用：传输、存储等可能会丢数据的场景
    - 应用2:秘密分享，把一个秘密分享给 n 个人，要求任意 k 个人在场时能够获取秘密。
- BCH 纠错码（Error Correction Code）
    - 功能：若干数据错误，但不知道具体哪些数据错误。或者有的知道有的不知道。
    - 应用：QR码、信息传输



## checksum 实现

把所有的字节做异或，得到的结果是校验位。
- 如果数据是类似 `Vec<i32>`，也可以使用加法而不是异或


```rust
pub struct CheckSum {}

impl CheckSum {
    pub fn new() -> Self { Self {} }

    pub fn encode(&self, msg: &[u8]) -> Vec<u8> {
        let mut res = Vec::with_capacity(msg.len() + 1);
        res.extend_from_slice(msg);
        res.push(get_checksum(msg));
        res
    }

    pub fn check(&self, msg_with_checksum: &[u8]) -> bool {
        get_checksum(&msg_with_checksum[..msg_with_checksum.len() - 1]) == msg_with_checksum[msg_with_checksum.len() - 1]
    }
}


fn get_checksum(msg: &[u8]) -> u8 {
    msg.iter().fold(0, |acc, &x| acc ^ x)
}


#[cfg(test)]
mod tests {
    use crate::CheckSum;

    #[test]
    fn test_checksum() {
        let check_sum = CheckSum::new();
        let msg = b"12323".to_vec();
        let mut msg_with_checksum = check_sum.encode(&msg);
        assert!(check_sum.check(&msg_with_checksum));
        msg_with_checksum[2] = 93;
        assert!(!check_sum.check(&msg_with_checksum));
    }
}
```

进一步，我们还希望定位到哪个数字有错
- 把数字写成 nxm 的矩阵，然后对每行每列做 checksum



## 玩具级实现：多项式编码



玩具版原理：
- 3个点可以确定一条抛物线
- 再取 2 个点，总共 5 个点
- 任意丢失5个点中的 2 个点，剩余的 3 个点就可以还原整个抛物线，从而还原出全部 5 个点 



假设要传输的是 k 个数字 $d_i$，加上校验码后为 n 个数字 $c_i$
1. 可以确定一个 k - 1 次的多项式 $f(x) = d_0 + d_1 x + d_2 x^2 + ... + d_{k-1} x^{k-1}$ 
2. 用 n 个数字代入上面的多项式，可以得到 n 对坐标：$(0, c_0), (1, c_1), ..., (n, c_n)$
3. 传输 $c_0, c_1, ... ,c_n$ ，如果发生数据丢失，只剩下 k 个数据，仍然可以还原得到多项式，从而得到原始数据

用矩阵表示上面的过程（假设 $k=6, n=9$）

$$
\left ( \begin{array}{l}
    c_0\\
    c_1\\
    c_2\\
    c_3\\
    c_4\\
    c_5\\
    c_6\\
    c_7\\
    c_8
\end{array}  \right )= 
\left ( \begin{array}{l}
    1 & 0^1  & 0^2 & 0^3 & 0^4 & 0^5 \\ 
    1 & 1^1  & 1^2 & 1^3 & 1^4 & 1^5 \\ 
    1 & 2^1  & 2^2 & 2^3 & 2^4 & 2^5 \\ 
    1 & 3^1  & 3^2 & 3^3 & 3^4 & 3^5 \\ 
    1 & 4^1  & 4^2 & 4^3 & 4^4 & 4^5 \\ 
    1 & 5^1  & 5^2 & 5^3 & 5^4 & 5^5 \\ 
    1 & 6^1  & 6^2 & 6^3 & 6^4 & 6^5 \\ 
    1 & 7^1  & 7^2 & 7^3 & 7^4 & 7^5 \\ 
    1 & 8^1  & 8^2 & 8^3 & 8^4 & 8^5 \\ 
\end{array}\right) 
\left ( \begin{array}{l}
    d_0\\
    d_1\\
    d_2\\
    d_3\\
    d_4\\
    d_5
\end{array}  \right )
$$


### 玩具版 python 实现

下面的代码，假设原始数据是 6 个(d)，传输 9 个数据(c)，传输过程中丢失了 3 个数据

```python
import numpy as np

k = 6  # 6个原始数据
n = 9  # 加上校验码共 9 个数据

d = np.array([1, 4, 6, 3, 2, 2]).reshape(-1, 1)
print("原始数据", d.flatten())
V = np.vander(np.arange(n), N=k, increasing=True)


def encode(d, k, n):
    c = V @ d
    return c


c = encode(d, k, n)
print("带校验码的数据:", c.flatten())

# 假设丢了3个：序号 [0, 4, 8] 对应的数据丢失
loss_idx = [0, 4, 8]
c[loss_idx, :] = -1

print("传输后丢失：", c.flatten())


def reconstruct(c, k, n):
    valid_idx = [i for i in range(n) if i not in loss_idx]
    c1 = c[valid_idx, :]
    V1 = V[valid_idx, :]
    d_recover = np.linalg.solve(V1, c1.flatten())
    return d_recover


d_recover = reconstruct(c, k, n)

print("擦除码还原后的数据：", d_recover)
```

运行结果：
```
原始数据 [1 4 6 3 2 2]
带校验码的数据: [    1    18   153   796  2865  8046 19033 39768 75681]
传输后丢失： [   -1    18   153   796    -1  8046 19033 39768    -1]
擦除码还原后的数据： [1. 4. 6. 3. 2. 2.]
```

## 工业级实现：Reed-Solomon

实际应用中，还需要解决如下问题
1. 如何保证丢失数据后，使用任意 k 个数据都能获取原始数据。这等价于：保证任选 k 个方程组，都会有解，并且有唯一解。这需要保证矩阵满秩，比如上面选取取自增自然数对应的 Vandermonde 矩阵。
2. 编码后不希望获得大整数，解码后不希望获得浮点数。
    - 编码前、编码后，都希望都是字节（也就是范围是 0-255 之间的整数），这就需要用到 Finite Field(也就是 Galois  Filed)
3. 如果数据没有丢失，如何跳过计算复杂度较高的解码步骤
    - 最理想的办法：原始数据 d(k个)，与编码后的数据 c（n个）的前 k 个，完全一样。这样如果前 k 个不丢失，那么就直接是原始数据了。

1960 年提出的 Reed-Solomon 编码可以解决以上问题

##  引入知识1：伽罗瓦域

Galois Field 也称为有限域，有 p^n 个元素的 Galois Field 记作 ( GF(p^n) )    

（相关知识，参见 [群、环、域](https://www.guofei.site/2021/08/21/algebra_system.html)）


假设这个域是定义在 uint8 上的，也就是 GF(2^8) 它有一些性质：
- $x \oplus y = x - y = x \mathrm {XOR} y$，因此满足了加法的交换律和结合律
- $x \oplus x = 0$，也就是每个元素都有对应的加法逆元
- $x \otimes y = \exp [\log[x] + \log[y]]$



Reed-Solomon 算法中，超参数可以这样选取：
- primitive element（本原元）取 $\alpha=2$，
- irreducible polynomial（不可约等多项式）取 0x11d（也就是 $x^8+x^4+x^3+x+1$，当 x=2时的值）

在这个定义下有这些性质
- $x \otimes 2 = (x<<1)\mathrm {XOR} ((x \& 0x80)?0x1d:0)$
- $x^0 = 1$
- 用上面两个可以计算出所有的 $2^k$，计算得知 $2^0 = 2^{255} = 1$，因此 $2^k$ 是周期函数，进而可以实现计算出一个 exp 表，用于快速做 exp 计算.
- 经过计算 $2^k (k=0,1,...,254)$ 对应的 255个数字，正好也是 1-255 这 255 个数字
- 因此，还可以用对应关系计算出一个 log 表，用于快速计算。做 log 计算

使用以上方法，可以保证乘法运算和加法运算封闭在 u8 范围内，从而矩阵积的结果在 u8 范围内。这就解决了上面提出的一个问题：编码后不希望出现大整数，而是在 u8 范围内；解码时不希望出现浮点数，也是在 u8 范围内。
- vandermonde 矩阵可以有多种类型，因此 Reed-Solomon 算法可能有很多种。
- 选取 vandermonde 矩阵，是因为它是线性无关的



## 引入知识2：系统码

接上面，引入伽罗瓦域后，可以保证运算之后的结果封闭在 u8 范围内。本部分解决之前提出的另一个问题：想办法把编码后的数据的前 k 行，与原始数据一样。

上面的想法用符号表示是：


$$
\left ( \begin{array}{l}
    d_0\\
    d_1\\
    d_2\\
    d_3\\
    d_4\\
    d_5\\
    c_6\\
    c_7\\
    c_8
\end{array}  \right )= 
\left ( \begin{array}{l}
    1 & 0  & 0 & 0 & 0 & 0 \\ 
    0 & 1  & 0 & 0 & 0 & 0 \\ 
    0 & 0  & 1 & 0 & 0 & 0 \\ 
    0 & 0  & 0 & 1 & 0 & 0 \\ 
    0 & 0  & 0 & 0 & 1 & 0 \\ 
    0 & 0  & 0 & 0 & 0 & 1 \\ 
    g_{00} & g_{01}  & g_{02} & g_{03} & g_{04} & g_{05} \\ 
    g_{10} & g_{11}  & g_{12} & g_{13} & g_{14} & g_{15} \\ 
    g_{20} & g_{21}  & g_{22} & g_{23} & g_{24} & g_{25}
\end{array}\right) 
\left ( \begin{array}{l}
    d_0\\
    d_1\\
    d_2\\
    d_3\\
    d_4\\
    d_5
\end{array}  \right )
$$

用分块矩阵表示：

$$
\left [ \begin{array}{l}
    d\\
    c
\end{array}  \right ]= 
\left [ \begin{array}{l}
   I_k \\
   G
\end{array}\right] 
d
$$


也就是 $c=G\cdot d$，传输过程中传的就是 $[d\mid c]$


问题变成了这个：  
如果寻找一个矩阵 $A_{n\times k}$，其任意 k 行是线性无关的，并且其上部是单位矩阵。  
我们的思路是从上面的 Vandermonde 矩阵开始构造，因为 Vandermonde 矩阵本身满足“任意 k 行线性无关”，

根据线性代数知识，以下方法是等价的
- 办法1: $A_{n\times k}=V_{n\times k} \cdot V_{k\times k}^{-1}$
- 办法2:做增广矩阵，用高斯消元，求矩阵的逆
- 办法3:初等列变换。（我的代码里面这么做）
- 办法4:vandermonde 矩阵特殊，有特殊的求逆的方法，复杂度为 $O(n^2)$（一般矩阵求逆复杂度为 $O(n^3)$）





## encode

有了以上两个理论推导，encode 算法就很容易写了
1. 写一套 Galois Field 的计算规则
2. 在这个域上生成一个 $n\times k$ 的 vandermonde 矩阵
3. 使用高斯消元法（初等列变换），把 vandermonde 矩阵上部变成单位矩阵，从而得到 一个 $k\times k$ 的单位矩阵，以及下部的矩阵 $G_{(n-k)\times k}$，用矩阵表示（下面的箭头表示初等列变换）：  
$$
\left ( \begin{array}{l}
    1 & 0^1  & 0^2 & 0^3 & 0^4 & 0^5 \\ 
    1 & 1^1  & 1^2 & 1^3 & 1^4 & 1^5 \\ 
    1 & 2^1  & 2^2 & 2^3 & 2^4 & 2^5 \\ 
    1 & 3^1  & 3^2 & 3^3 & 3^4 & 3^5 \\ 
    1 & 4^1  & 4^2 & 4^3 & 4^4 & 4^5 \\ 
    1 & 5^1  & 5^2 & 5^3 & 5^4 & 5^5 \\ 
    1 & 6^1  & 6^2 & 6^3 & 6^4 & 6^5 \\ 
    1 & 7^1  & 7^2 & 7^3 & 7^4 & 7^5 \\ 
    1 & 8^1  & 8^2 & 8^3 & 8^4 & 8^5 \\ 
\end{array}\right) 
\Rightarrow
\left ( \begin{array}{l}
    1 & 0  & 0 & 0 & 0 & 0 \\ 
    0 & 1  & 0 & 0 & 0 & 0 \\ 
    0 & 0  & 1 & 0 & 0 & 0 \\ 
    0 & 0  & 0 & 1 & 0 & 0 \\ 
    0 & 0  & 0 & 0 & 1 & 0 \\ 
    0 & 0  & 0 & 0 & 0 & 1 \\ 
    g_{00} & g_{01}  & g_{02} & g_{03} & g_{04} & g_{05} \\ 
    g_{10} & g_{11}  & g_{12} & g_{13} & g_{14} & g_{15} \\ 
    g_{20} & g_{21}  & g_{22} & g_{23} & g_{24} & g_{25}
\end{array}\right) 
$$
4. encode 算法：用矩阵点积得到 $c=G\cdot m$，用矩阵表示：  
$$
\left ( \begin{array}{l}
    c_6\\
    c_7\\
    c_8
\end{array}  \right )= 
\left ( \begin{array}{l}
    g_{00} & g_{01}  & g_{02} & g_{03} & g_{04} & g_{05} \\ 
    g_{10} & g_{11}  & g_{12} & g_{13} & g_{14} & g_{15} \\ 
    g_{20} & g_{21}  & g_{22} & g_{23} & g_{24} & g_{25}
\end{array}\right) 
\left ( \begin{array}{l}
    d_0\\
    d_1\\
    d_2\\
    d_3\\
    d_4\\
    d_5
\end{array}  \right )
$$

5. 返回 $[d\mid c]$


## decode

如果数据区域没有丢失，那么就不需要计算，直接返回。  
如果数据区域丢失，列算式：  



假设丢失了3个： $d_2, d_3, c_7$，那么：

$$
\left ( \begin{array}{l}
    d_0\\
    d_1\\
    ??\\
    ??\\
    d_4\\
    d_5\\
    c_6\\
    ??\\
    c_8
\end{array}  \right )= 
\left ( \begin{array}{l}
    1 & 0  & 0 & 0 & 0 & 0 \\ 
    0 & 1  & 0 & 0 & 0 & 0 \\ 
    0 & 0  & 1 & 0 & 0 & 0 \\ 
    0 & 0  & 0 & 1 & 0 & 0 \\ 
    0 & 0  & 0 & 0 & 1 & 0 \\ 
    0 & 0  & 0 & 0 & 0 & 1 \\ 
    g_{00} & g_{01}  & g_{02} & g_{03} & g_{04} & g_{05} \\ 
    g_{10} & g_{11}  & g_{12} & g_{13} & g_{14} & g_{15} \\ 
    g_{20} & g_{21}  & g_{22} & g_{23} & g_{24} & g_{25}
\end{array}\right) 
\left ( \begin{array}{l}
    d_0\\
    d_1\\
    d_2\\
    d_3\\
    d_4\\
    d_5
\end{array}  \right )
$$



根据矩阵积计算的性质，可以把未知的行删掉，得到：


$$
\left ( \begin{array}{l}
    d_0\\
    d_1\\
    d_4\\
    d_5\\
    c_6\\
    c_8
\end{array}  \right )= 
\left ( \begin{array}{l}
    1 & 0  & 0 & 0 & 0 & 0 \\ 
    0 & 1  & 0 & 0 & 0 & 0 \\ 
    0 & 0  & 0 & 0 & 1 & 0 \\ 
    0 & 0  & 0 & 0 & 0 & 1 \\ 
    g_{00} & g_{01}  & g_{02} & g_{03} & g_{04} & g_{05} \\ 
    g_{20} & g_{21}  & g_{22} & g_{23} & g_{24} & g_{25}
\end{array}\right) 
\left ( \begin{array}{l}
    d_0\\
    d_1\\
    d_2\\
    d_3\\
    d_4\\
    d_5
\end{array}  \right )
$$

从而计算出结果：



$$
\left ( \begin{array}{l}
    d_0\\
    d_1\\
    d_2\\
    d_3\\
    d_4\\
    d_5
\end{array}  \right ) =
\left ( \begin{array}{l}
    1 & 0  & 0 & 0 & 0 & 0 \\ 
    0 & 1  & 0 & 0 & 0 & 0 \\ 
    0 & 0  & 0 & 0 & 1 & 0 \\ 
    0 & 0  & 0 & 0 & 0 & 1 \\ 
    g_{00} & g_{01}  & g_{02} & g_{03} & g_{04} & g_{05} \\ 
    g_{20} & g_{21}  & g_{22} & g_{23} & g_{24} & g_{25}
\end{array}\right) ^{-1}
\left ( \begin{array}{l}
    d_0\\
    d_1\\
    d_4\\
    d_5\\
    c_6\\
    c_8
\end{array}  \right )
$$


如何计算上面矩阵的逆呢？  
- 根据前面的推导，矩阵 V 任选 k 行必然是线性无关的，因此上面的矩阵（记为 $B $）也必然有逆矩阵
- 对增广矩阵 $[B\mid I]$ 做初等行变换，得到 $[I \mid B^{-1}]$


然后是 decode 过程：
- $d=B^{-1} m'$


## block

以上已经实现了擦除码，但还不能在工业界落地。这是因为实际上的数据量较大。因此需要做一个小设计


举例来说我们要对一个字符串 `"github.com/guofei9987"` 做编码（假设这个字符串很长），那么我们这样编码（下面选取列数为4，实际上可以任意选取）（不够的补0）

$$
M=
\left ( \begin{array}{l}
    'g' & 'i'  & 't' & 'h'\\
    'u' & 'b'  & '.' & 'c'\\
    'o' & 'm'  & '/' & 'g'\\
    'u' & 'o'  & 'f' & 'e'\\
    'i' & '9'  & '9' & '8'\\
    '7' & 0  & 0 & 0\\
\end{array}\right)
$$

#### encode 阶段：

$$
\left ( \begin{array}{l}
    c_{00} & c_{01}  & c_{02} & c_{03} \\ 
    c_{10} & c_{11}  & c_{12} & c_{13} \\ 
    c_{20} & c_{21}  & c_{22} & c_{23}
\end{array}  \right )= 
\left ( \begin{array}{l}
    g_{00} & g_{01}  & g_{02} & g_{03} & g_{04} & g_{05} \\ 
    g_{10} & g_{11}  & g_{12} & g_{13} & g_{14} & g_{15} \\ 
    g_{20} & g_{21}  & g_{22} & g_{23} & g_{24} & g_{25}
\end{array}\right)
\left ( \begin{array}{l}
    'g' & 'i'  & 't' & 'h'\\
    'u' & 'b'  & '.' & 'c'\\
    'o' & 'm'  & '/' & 'g'\\
    'u' & 'o'  & 'f' & 'e'\\
    'i' & '9'  & '9' & '8'\\
    '7' & '0'  & '0' & '0'
\end{array}\right)
$$

最终获得带擦除码的数据：

$$
\left ( \begin{array}{l}
    'g' & 'i'  & 't' & 'h'\\
    'u' & 'b'  & '.' & 'c'\\
    'o' & 'm'  & '/' & 'g'\\
    'u' & 'o'  & 'f' & 'e'\\
    'i' & '9'  & '9' & '8'\\
    '7' & '0'  & '0' & '0'\\
    c_{00} & c_{01}  & c_{02} & c_{03} \\ 
    c_{10} & c_{11}  & c_{12} & c_{13} \\ 
    c_{20} & c_{21}  & c_{22} & c_{23}
\end{array}  \right )
$$


#### decode 阶段


参考上面的 decode 部分，同样写成矩阵形式，同样假设 2、3、7 行丢失

$$
\left ( \begin{array}{l}
    d_{00} & d_{01}  & d_{02} & d_{03} & d_{04} \\ 
    d_{10} & d_{11}  & d_{12} & d_{13} & d_{14} \\ 
    d_{20} & d_{21}  & d_{22} & d_{23} & d_{24} \\ 
    d_{30} & d_{31}  & d_{32} & d_{33} & d_{34} \\ 
    d_{40} & d_{41}  & d_{42} & d_{43} & d_{44} \\ 
    d_{50} & d_{51}  & d_{52} & d_{53} & d_{54}
\end{array}  \right ) =
\left ( \begin{array}{l}
    1 & 0  & 0 & 0 & 0 & 0 \\ 
    0 & 1  & 0 & 0 & 0 & 0 \\ 
    0 & 0  & 0 & 0 & 1 & 0 \\ 
    0 & 0  & 0 & 0 & 0 & 1 \\ 
    g_{00} & g_{01}  & g_{02} & g_{03} & g_{04} & g_{05} \\ 
    g_{20} & g_{21}  & g_{22} & g_{23} & g_{24} & g_{25}
\end{array}\right) ^{-1}
\left ( \begin{array}{l}
    d_{00} & d_{01}  & d_{02} & d_{03} & d_{04} \\ 
    d_{10} & d_{11}  & d_{12} & d_{13} & d_{14} \\ 
    d_{40} & d_{41}  & d_{42} & d_{43} & d_{44} \\ 
    d_{50} & d_{51}  & d_{52} & d_{53} & d_{54} \\ 
    c_{00} & c_{01}  & c_{02} & c_{03} & c_{04} \\ 
    c_{20} & c_{21}  & c_{22} & c_{23} & c_{24} \\ 
\end{array}  \right )
$$






## 参考文献

https://www.bilibili.com/video/BV1CC4y1S7CL  
https://github.com/chenshuo/notes  