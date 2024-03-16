---
layout: post
title: 【纠错码】理论和Rust实现
categories:
tags: 0x58_密码学
keywords:
description:
order: 59003
---

 

前一篇文章介绍了 Reed-Solomon 做擦除码，它允许丢失 $n-k$ 个位置，并还原出原始信息。（**original view**）  
用 Reed-Solomon 做 ECC(Error correction capabilities)，可以纠错 $(n-k)/2$ 个，或者纠删 $n-k$ 个。（**BCH view**）
- ECC can correct up to (n-k)/2 errors, or n-k erasures, or any combinations of erasures/errors


原理

算法规格选取
1. 有的实现是按照幂升序来写的，有的按照降序来写，两种都可以，但不能混用。**本文统一用降序**
2. 生成多项式（下面会解释）为 $g(x) = (x-\alpha^i)(x-\alpha^{i+1})...(x-\alpha^{i+n-k-1})$，
    - i 决定了第一个根，可以是 1 或者 0 。在 CD/QR/DVB-T 中，i = 0，**本文统一用i = 0**
    - $\alpha$ 是本源元，**本文统一取 2**
    - 按照上面的取值，$g(x)  = (x-\alpha^0)(x-\alpha^1)...(x-\alpha^{n-k-1}) = x^{n-k} + g_1 x^{n-k-1} + ... + g_{n-k+1}x + g_{n-k}$




## encode 


超参数：
- 信息 message 有 k 个，$\mathbf m = [m_0, m_1, ..., m_k]$
- 校验位 parity 有 l 个，（因此 encode 后的信息长度为 n = l + k）

列出多项式：
- 根据 message 的 k 个字节列出： $p(x) = m_0 x^{k-1} + m_1 x^{k-1} + ... + m_{k-2} x + m_{k-1}$
- 生成多项式为 $g(x) = (x-2^0)(x-2^1)...(x-2^{l-1}) = g_0 x^l +g_1 x^{l-1} + ... + g_{l}$，可以计算得到

显然， $p(x) x^l = m_0 x^{k+l-1} + m_1 x^{k+l-2}+...+ m_{k-1} x^l$

然后使用多项式的除法计算 $r(x) = (p(x)x^l) \mathrm {mod} g(x)$ 
- 因为 $g(x)$ 的最高次幂为 l，所以 $r(x)$ 最高次幂小于等于 l-1，记为 $r(x) = r_0 x^{l-1} + r_1 x^{l-2} + ... + r_{l-1}$  

它们合并起来 $s(x) =  p(x) x^l - r(x) = (m_0 x^{k+l-1} + m_1 x^{k+l-2}+...+ m_{k-1} x^l) - (r_0 x^{l-1} + r_1 x^{l-2} + ... + r_{l-1})$  
由于在 Galois Filed 有 $0 - l = 0 + l$，因此上式还等于 $s(x) = m_0 x^{k+l-1} + m_1 x^{k+l-2}+...+ m_{k-1} x^l + r_0 x^{l-1} + r_1 x^{l-2} + ... + r_{l-1}$

上面这个多项式的系数就是 encode 后结果 $[m_0, m_1, ... , m_{k-1}, r_0, r_1, ..., r_{l-1}]$


一些定理：
1. 因为  $r(x) = (p(x) x^{n-k}) \mathrm {mod} g(x)$，并且 $s(x) =  (p(x) x^{n-k}) - r(x)$，就有结论：$s(x) \mathrm{mod} g(x) = 0$
2. encode 后结果 ($s(x)$ 的系数)，就是原始数据+校验位


## decode 

encode 简单，但 decode 复杂很多，包括几个算法：
1. syndromes：判断是否有错误 `Si = syndromes(recv)`
    - `Si` 为 syndromes polynomial（症状多项式）的系数
    - 其根为$a^j$，也就是说， $syn(a^j) = 0$
2. Berlekamp-Massey： `Lambda = BerlekampMassey(Si)`，
    - 得到的 `Lambda` 就是错误定位多项式（error locator polynomial）的系数
    - 算法迭代 n-k 次
3. ChienSearch：`Xi = ChienSearch(Lambda)`
    - error locator：用来定位错误的位置，`Xi` 就是错误的位置
    - error locations Xi, roots of Lambda: 通过快速求根来定位错误 
4. error magnitudes Yi（Forney algorithm）：用来计算错误的幅度 `Yi = ForneyAlgo(Xi, Si)`，复杂度 $O(n^2)$
5. error corrector：计算错误 `error = BuildFrom(Xi, Yi)`，进而获得纠错后的内容：`corrected = recv - error`



假设传输过程中发生错误，接收到了 $y(x) = s(x) + e(x)$，其中 $e(x)$ 叫做 **错误多项式**。

$e(x) = e_0 x^{n-1} + ... + e_{n-1}$，系数非 0 表示对应的位置的有错误，假设有 v 个错误（也就是 $e(x)$ 有 v 个非零系数），则要求：
1. 如果不知道哪些位错误，则 $v\leq (n-k)/2$ 
2. 如果知道哪些位错误则 $v \leq n-k$ ，如果达不到要求，就不能纠错。
3. 如果有些知道，有些不知道，则数量是以上的组合
 
如果我们计算得到 $e(x)$，那么可以轻松得到原始数据 $y(x) = r(x) - e(x)$ 


### syndrome

从上面的推导知道，$s(x) \mathrm{mod} g(x) = 0$，并且 $g(x)$ 的根为 $(a^0, a^1,..., a^{n-k})$，所以 $g(x)$ 的根也是 $s(x)$ 的根  

因此，$y(a^j) = s(a^j) + e(a^j) = 0 + e(a^j), 0 \leq j \leq l - 1$ 共得到 l 个数

```rust
// 前面写了，本文都用 fcr = 0
fn syndrome(r: Polynomial, l: usize, fcr: u8) -> Vec<u8> {
    (0..l).iter().map(|j| r.eval(gf8.exp2(j + fcr))).collect::<Vec<u8>>()
}
```

假如我们知道哪些数据出错了，问题和方法都变成纠错码：
- 也就是知道 $e(x) = e_0 x^{n-1} + ... + e_{n-1}$ 的哪些系数非零
- 把 $x = a^j, y = y(a^j)$ 代入 $e(x)$，得到 l 个方程。
- 也就是说，只要出错的数据小于等于l个，并且知道它们的位置，就可以解 l 个方程，得到 l 个 $e(x)$ 的系数，从而得到$e(x)$，进而还原出 $s(x)$
- 这需要解一个线性方程组，复杂度为 $O(n^3)$
- 如果引入错误定位多项式，复杂度可以减少为 $O(n^2)$

### Forney

引入多项式 Error locator polynomial $\Lambda (x) = \prod\limits_{i=1}^{v}(1-xX_i) = 1 + \lambda_1 x^1 +\lambda_2 x^2 + ... + \lambda_v x^v = 1 + \sum\limits_{i=1}^v \lambda_i x^i$，
- 它满足 $\Lambda(X_i^{-1})=0$，其中 $X_i$ 是错误发生的位置，我们的目标就是求出它，不过在 forney 这个步骤中，我们假设已经求出它了

引入多项式 Error evaluator polynomial $\Omega(x) = S(x) \Lambda(x) \mathrm{mod} x^{n-k}$  
- 其中，$S(x)$ 是上面计算的 syndrome polynomial $S(x) = S_0 +S_1 x^1 + S_2 x^2 +...+ S_{n-k-1} n^{n-k-1}$
- 取模操作$\mathrm{mod} x^{n-k}$，相当于取出低于 $n-k$ 阶的那些系数

计算可得 $y_i = -\dfrac{X_i^{1-j_0} \Omega(X_i^{-1})}{\Lambda'(X_i^{-1})}$
- 其中 $j_0$ 是前面写的第一个根，前面写了本文里面统一取0
- 一阶导数 $\Lambda'(X_i^{-1}) =\sum\limits_{i=1}^v i \cdot \lambda_i x^{i-1}$ 
- $i \cdot \lambda_i$ 不是有限域上的乘法，而是连加，因此如果 $i \cdot \lambda_i = \lambda_i \ \mathrm{if}\ i \ \mathrm{is \ odd, else \ 0}$  


### Berlekamp-Massey

此算法的目的是找到错误定位多项式 Error locator polynomial

它是一个迭代算法
