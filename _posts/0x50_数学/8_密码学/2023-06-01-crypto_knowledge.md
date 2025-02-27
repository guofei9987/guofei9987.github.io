---
layout: post
title: 【密码学】知识体系_进行中
categories:
tags: 0x58_密码学
keywords:
description:
order: 59003
---

相关书目：
《深入浅出密码学》

## 0 一些概念

密码编码学（Cryptography）
- 明文（plaintext）和 秘文（ciphertext）
- 加密（encrypt）和 解密（decrypt）

分类
- 对称加密算法
    - 流密码（Stream Ciphers）：加密后的每个位，只取决于明文对应位和密钥。性能高。依赖一个伪随机数生成器。
    - 分组密码（Block Ciphers）：分组内的每个位，都对结果有影响
        - DES：早期的，已不够安全
        - AES：目前广泛使用
- 非对称密码
    - RSA：基于整数分解
    - DSA：基于离散对数问题
    - ECC：基于椭圆曲线
    - NTRU：基于格理论，抗量子
    - Rainbow：基于多变量多项式，用于数字签名






密码分析学，是破解密码的研究，是对密码攻击
- 经典密码分析（Classical Cryptanalysis）
    - 数学分析法：发现加密方法内部结构的分析攻击
    - 暴力破解：测试所有可能的密钥进行破解
- 实施攻击(ImplementationAttack)
    - 从旁道分析，如：测量处理私钥的处理器的功耗、电磁辐射、算法运行时的行为。前提是攻击者可以物理访问密码体制。
- 社会工程攻击。行贿、勒素、跟踪或侦探

密码分析面临的情况
- 仅知密文攻击（Ciphertext - only attack）。仅能获取到一些密文，尝试推导出明文或者密钥
- 已知明文攻击（Known - plaintext attack）。除了拥有一定数量的密文外，还知道与之对应的明文。
- 选择明文攻击（Chosen - plaintext attack）。可以任意选择明文，并获取对应的秘文
- 密文攻击（Chosen - ciphertext attack）。攻击者可以选择特定的密文，并获取这些密文对应的明文



**Kerckhoffs 原则：一个密码系统安全，不依赖算法的保密性，只依赖密钥的保密性。**
- 否则一旦算法泄漏（很容易），整个密码系统就完蛋
- 公开算法，使得其受到广泛审查
- 公开算法，使公众可以信任它，而不是依赖测试机构的权威


密码协议：利用密码学实现安全通信的一系列规则和步骤。例如 SSL、SSH、OAuth


密码安全
- **无条件安全**：在攻击者拥有无限计算资源的情况下，一个密码体制也是安全的，叫做 无条件安全。
- **计算安全**：为了破解一个密码体制，最好的已知算法至少需要 t 个操作，叫做计算安全
    - 破解所需时间超过信息本身的有效期，或者破解的成本高于信息本身的价值
    - 存在问题：如 RSA 基于大整数因式分解，尽管因式分解算法是已知的，但我们不知道是否存在更好的因式分解算法。


## 数学基础


mod 与整数环

这个的系统组成一个环：
- $Z=\{0,1,2,...,m-1\}$
- 定义两个运算符 $+, \cdot$
    - $a+b\equiv c \mod m$
    - $a\cdot b \equiv d \mod m$


性质
- 未必存在逆元（逆元定义为 $a\cdot a^{-1} \equiv 1 \mod m$）
- 当且仅当 $\gcd(a,m)=1$ 才存在逆元


## 一些不安全的密码

### 替换密码

算法：
1. 维护一个字母对字母的一一映射表（就是密钥）
2. 按照密钥做映射即可

攻击：
1. 表面上上不同的组合有 $26!$ 种，需要暴力遍历几百年
2. 实际上有一些高效的攻击手段
    - 字母的频率是稳定的。在密文种也如此，统计秘文中的字母频率可以大致推断是什么字母
    - 类似的，连续秘文也是可以统计，例如英语中，U总是跟着Q
    - 如果发现了空格，可以找到高频短单词，例如 THE、AND


**凯撒密码** 是一种最简单的替换密码，它把字母表向后移动 k 位，末尾放开头

### 移位密码

移位密码用环的语言表示：
- 加密：$y\equiv x + k \mod 26$
- 解密：$x\equiv y - k \mod 26$

移位密码的评价：
- 移位密码的密钥只有 26 种，因此非常不安全。
- 它是替换密码的一种，可以使用字母频率分析法攻击它

仿射密码，在移位密码的基础上做一些改变
- 加密：$y \equiv a \cdot x + b \mod 26$
- 解密：$x \equiv a^{-1} \cdot (y - b) \mod 26$
- 密钥：$k = (a, b)$ ，其中 $gcd(a, 26)=1$

仿射密码的评价：
- a 可能取值为 1，3，5，7，9，11，15，17，19，21，23，25
- b 可能取值为 26 个
- 因此密钥空间为 12x26 = 312 ，也是非常不安全


## 流式密码

明文、密文、密钥由单独的位组成，即 $x_i, y_i, s_i \in \{ 0, 1 \}$
- **加密**：$y_i = x_i + s_i \mod 2$
- **解密**：$x_i = y_i + s_i \mod 2$

特点：
- 加密函数和解密函数是同一个函数
- 计算性能高，只需要一个 XOR 操作
- 密码序列是一串随机数，由随机数生成器生成，但是比普通的随机数生成器要求不可预测（也就是根据已生成的随机数，不能预测未来的随机数）。


### 一次一密 OTP


无条件安全的密码体制很难设计。 **OTP 就是 无条件安全的**。

OTP 算法：
1. 使用真随机数生成器，生成密钥序列 $\{ s_i \}$
2. 只有合法的接受方才知道密钥序列
3. 每个密钥序列位 $\{ s_i \}$ 只使用一次
    - **加密**：$y_i = x_i + s_i \mod 2$
    - **解密**：$x_i = y_i + s_i \mod 2$

据传言，在冷战期间白宫和克里姆林宫之间的红色电话就是使用 OTP 加密的。但没有大规模使用，说明它有缺陷
1. 真随机数设备有些成本
2. Alice 必须把 $\{ s_i \}$ 安全的传递到 Bob，比如写入到 CD，让一位特工做信使
3. $\{ s_i \}$ 用完后，还需要再次传递






### 基于移位寄存器的序列密码

接上文 OTP，想到用伪随机数生成器代替真随机数生成器，来生成 $\{ s_i \}$，这样密钥就是 seed，但这个想法是 **不可行的**，接受如下：
- 随机数生成器基于线性同余发生器：$S_0 = seed, S_{i+1}\equiv A S_i + B \mod m$
- 加密方式同 OTP 
    - **加密**：$y_i = x_i + s_i \mod 2$
    - **解密**：$x_i = y_i + s_i \mod 2$

为什么这个方案是不可行的呢？  
- 如果攻击者 Oscar 猜出部分明文（比如文件头信息更容易猜），那么立即结合密文可以计算出 $\{ s_i \}$
- 然后解方程 $S_2 \equiv A S_1 + B \mod m; S_3 \equiv A S_2 + B \mod m$，即可得到 $A,B$
- 根据 $\gcd(S_1-S_2,m)$ 取值，可以有多解或唯一解。然后根据其它分片可以唯一得到密钥

实际上相当多的伪随机数生成器都不是密码学安全的，我们需要专门设计伪随机数生成器：例如 **线性移位寄存器（LFSR）**
- 许多序列密钥是利用 LFSR 来实现的，例如 A5/1
- 构建方法很多，这里只介绍一种


LFSR 是用一个电路实现的，这个电路中有 m 个触发器，

例如，m =3 的情况下，LFSR 用数学描述是：
- 初始化 $s_0,s_1,s_2$
- $s_{i+3} \equiv s_{i+1} + s_i \mod 2$

性质：
- 当然，它是一个周期序列
- 它的周期是多少取决于 m 和初始化的值。一个 m 位的 LFSR，有 $2^m-1$ 种非零状态，因此它最大可能的周期为 $2^m-1$


如何攻击？
- 只要 Oscar 知道度为 m 的 LFSR 的 2m 个输出位，就可以列方程来解出参数
- 可以得到 m 个线性等式进而用高斯消元法来计算参数
- 然而，它并没有丧失所有密码属性。有不少序列密码都是使用多个LFSR 的组合构建强壮的密码体制。

**Trivium**  是一个较新的序列密码，它的密钥长度为 80 位。Trivium 基于三个移位寄存器的组合。然后在得到每个寄存器的输出时使用了非线性组件。


总体来说，许多序列密码的安全性都是未知的，而且很多已经被破解了。


## 分组密码

强加密算法一般基于两种本原操作
- 混淆（Confusion）：使密钥和密文尽可能模糊
- 扩散（Diffusion）：一个明文符号影响多个密文符号

### DES

- 对称密码
- 迭代算法，每个分组加密16轮

### AES

- 分组长度 128，密钥长度 128/192/256
- 设计简单、代码紧凑、运行速度快
- 可以在8位CPU上运行，需要4k存储空间

## 非对称密码

对称密码的缺点
- 密钥分发：需要一个安全渠道分发密钥
- 没有不可否认性：只要知道密钥，就可以加密和解密
- 用户增多时，密钥数量膨胀。n个用户互相通信，需要两两密钥，就是 n(n-1)/2 个密钥。非对称密码需要 2n 个密钥（每人公私各1个）

用法
- 加密：A 把 公钥给B，B 用这个公钥加密。C 即使获得公钥，也无法解密。
- 签名



### RSA 理论



RSA 的加密和解密过程
- 公钥为 (E, N)，私钥为 (D, N)
- 假设明文为数字 x
- 公钥加密 $y = (x^E)%N$
- 私钥解密 $x1 = (y^D)%N$
- 公钥解密 $y = (x^E)%N$
- 私钥加密 $x1 = (y^D)%N$

示意代码如下：
```py
# 私钥是 (E, N)，公钥为 (D, N)
# 可以私钥加密、公钥解密。也可以公钥解密、私钥加密
E = 3
N = 33
D = 7


# 工具：字符串转array
def str2arr(text):
    return [ord(i) - ord('A') for i in text]


# 工具：array转字符串
def arr2str(arr):
    return ''.join(chr(i + ord('A')) for i in arr)


# 私钥加密/解密
def encryption(x):
    return (x ** E) % N


# 公钥解密/加密
def decryption(y):
    return (y ** D) % N


text = 'HELLO'
cipher_arr = [encryption(x) for x in str2arr(text)]
ciphertext = arr2str(cipher_arr)
print('私钥加密后：', ciphertext)

decrypted_arr = [decryption(y) for y in str2arr(ciphertext)]
print('公钥解密后：', arr2str(decrypted_arr))
```


如何选择 E，D？
- 任意取两个大素数，例如 `p=3;q=11`
- `N=p*q=33`
- 欧拉函数 `T=(p-1)(q-1)=2*10=20`
- 随机选择公钥 E，使其满足：1）E为素数 2）`1<E<T` 3）E 不是 T 的因子。这里选择 E=3
- 选择私钥 D，使其满足 `(DE)%T == 1` （欧几里得算法）





## 网络空间安全
网络空间已经逐步发展成为继陆、海、空、天之后的第五大战略空间


### 黑客攻击原理和技术

一些基本概念
- 肉鸡、木马、网页木马、挂码、后门、弱口令
- Rootkit：隐藏行踪保留root权限的工具
- IPC$：是为了进程间通信而开放的命名管道，可以通过验证用户名和密码获得相应的权限，在远程管理计算机和查看计算机的共享资源时使用。
- 默认共享：Windows开启共享服务后，因为加了 `$` 符号隐藏托手图标
- WebShell就是以asp、php、jsp或者cgi等网页文件形式存在的一种命令执行环境，也可以将其称作一种网页后门。
- 溢出
- 注入，例如 SQL 注入。
- 注入点
- 3389肉鸡：3389端口是终端服务的端口号
- 4899肉鸡：4899端口是Radmin用的端口，Radmin是知名远程控制软件
- 免杀：通过加壳、加密、修改特征码、加花指令等技术来修改程序，使其逃过杀毒软件的查杀。
- 加壳：利用特殊的算法，将EXE/DLL的编码进行改变（比如压缩、加密），以缩小文件体积、加密程序编码、躲过杀毒软件查杀。较常用的壳有UPX、ASPack、PePack、PECompact、UPack、免疫007、木马彩衣，等等。
- 花指令：几句汇编指令，让汇编语句进行一些跳转，使得杀毒软件不能正常判断出病毒文件的构造。

### 物理安全

机房、工区准入机制。

防火防盗