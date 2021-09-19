---
layout: post
title: 【离散数学2】集合与函数
categories:
tags: 5-9-应用数学
keywords:
description:
order: 5902
---


## 集合的基本概念

一些基本的概念、定理就不多写了：
- **集合**
- **集合的相等**
- **子集**
- **全集**
- **集合的交、并、补、差**


**集合运算的分配律**
- $A\cap (B \cup C) = (A\cap B)\cup (A\cap C)$
- $A\cup (B \cap C) = (A\cup B) \cap (A\cup C)$



### 序偶

序偶是有序的元素，例如 $<a,b>$

**【定义】三元组：** $<a,b,c> = <\lt a,b>,c>$  
（需要注意，$<\lt a,b>,c> \neq <a,<b,c\gt >$）  


**【定义】四元组：** $<a,b,c,d> = <<a,b,c>,d>$


借助序偶的概念，可以引入笛卡尔积、关系等概念。

### 笛卡尔积

借用二元组，可以引入笛卡尔积的概念：  
**【定义】笛卡尔积：** A,B 是两个集合，A和B的笛卡尔积定义为 $$A\times B=\{<x,y>\mid (x\in A)\land (y\in B) \}$$



注意序偶不具有可交换性：
- $A\times B \neq B\times A$
- $(A\times B)\times C \neq A \times (B\times C)$

运算律很容易证明：
- $A\times (B\cup C) = (A\times B)\cup (A\times C)$
- $A\times (B\cap C) = (A\times B)\cap (A\times C)$
- $(A\cup B)\times C = (A\times C) \cup (B\times C)$
- $(A\cap B)\times C = (A\times C) \cap (B\times C)$


**定理1：** 若 $C\neq \varnothing$，那么
$A\subseteq B$  
$\Leftrightarrow (A\times C \subseteq B\times C)$  
$\Leftrightarrow (C\times A \subseteq C\times B)$

证明过程用到这个：$(<x,y>\in A\times B) \Leftrightarrow ((x\in A)\land(y\in B))$


**定理2：** 若 A, B, C, D 都是非空集合，那么 $A\times B \subseteq C\times D$ 的充要条件是 $A\subseteq C, B\subseteq D$


### 关系

从日常的直观上看，关系可以用序偶来表示，例如“3小于5”可以看出一个二元序偶，“点a在b和c之间”可以看出一个三元序偶。

**【定义】关系：** 是任一序偶的集合。

例如，实数中的关系大于号 $\gt$ 定义为一个序偶集合：\{ $ <x,y> \mid x,y$ 是实数且 x大于y \}


**【定义】前域、值域：** 令 R 是一个
- 前域是所有 x 组成的集合，用符号表示 $$\mathrm{dom} R=\{ x \mid (\exists y)(<x,y>\in R)$$
- 值域是所有 y 组成的集合，用符号表示 $$\mathrm{ran} R=\{ y \mid (\exists x)(<x,y>\in R)$$

**【定义】恒等关系：** $$I_x=\{<x,x>\mid x\in X\}$$，称为 $I_X$ 是 X 上的恒等关系。

**定理** ：如果 Z 和 S 都是从集合 X 到集合 Y 的关系。那么Z和S的并、交、补、差也是从集合 X 到集合 Y 的关系


### 关系的性质

前面写了，关系是任一序偶的集合。如果 $<x,y> \in R$，我们把它记为 $xRy$

下面有一些定义：
- **【定义】R是自反：** $(\forall x)(x\in X \to xRx)$。例如，实数上的 $\leq$ 是自反的，平面上的三角形全等关系是自反的。
- **【定义】R是对称的：** $(\forall x)(\forall y)(x\in X \land y \in X \land xRy \to yRx)$。通俗地说，也就是如果 $xRy$ 那么 $yRx$。例如，平面上的三角形相似关系的对称的。
- **【定义】R是传递的：** $(\forall x)(\forall y)(\forall z)(x\in X \land y\in X \land z\in X \land xRy \to xRz)$。例如，实数上的 $\leq, \lt, =$ 这些关系都是传递的
- **【定义】反对称的：** 如果 $xRy,yRx$，那么 $x=y$


**【定义】复合关系：** 设 R 是 X 到 Y 的关系，S 是 Y 到 Z 的关系，那么 $R\circ S$ 叫做 R 和 R 的复合关系，其定义为 $$R\circ S = \{ <x,z> \mid x\in X \land z\in Z \land (\exists y)(y\in Y \land <x,y>\in R \land <y,z>\in S)\}$$。

复合关系的一些性质：  
关系可以用矩阵来表示，例如，从集合 X 到集合 Y 的关系 R，有：
$$u_{ij}=\left \{ \begin{array}{ll}
1,& <x_i,y_j> \in R\\
0,& <x_i,y_j> \not\in R\\
\end{array}\right.$$

集合 Y 到集合 Z 的关系 S 同样对应一个矩阵
$$v_{jk}=\left \{ \begin{array}{ll}
1,& <y_j,z_k> \in S\\
0,& <x_i,z_k> \not\in S\\
\end{array}\right.
$$

那么，$R\circ S$ 对应的矩阵，类似 R 和 S 的“矩阵积”，$w_{ik} = \lor_{j=1}^n(u_{ij} \land v_{jk})$，其中$\land, \lor$ 分别代表“逻辑乘”和“逻辑加”



**【定义】逆关系：** $$R^c=\{<y,x>\mid <x,y>\in R\}$$

**定理1：** 若 $R_1, R_2$ 都是 A 到 B 的关系
- $(R^c)^c=R$
- $(R_1\cup R_2)^c = R_1^c \cup R_2^c$
- $(R_1 \cap R_2)^c = R_1^c \cap R_2^c$
- $(A\times B)^c = (B\times A)^c$，其实笛卡尔积可以看成关系的“全集”
- $(\bar R)^c=\bar{R^c}$
- $(R_1-R_2)^c = R_1^c - R_2^c$

**定理2：** $(T\circ S)^c = S^c \circ T^c$


### 集合的划分和覆盖

**【定义】集合的划分：** 给定一个集合 A，找到集合 $$S=\{S_1, S_2,...,S_m\}$$，使得 $S_i\subseteq A$ 并且 $S_i\not=\varnothing$ 并且 $\bigcup\limits_{i=1}^mS_i=A$，那么集合 S 称为 A 的覆盖

**【定义】集合的划分：** 上述条件外，另外附加条件 $S_i\cap S_j = \varnothing (i\not=j)$，那么集合 S 称为 A 的划分


### 等价关系和等价类

**【定义】等价关系：**：如果一个关系 R 是自反的、对称的、传递的，那么 R 称为等价关系。

例如， $$R=\{<x,y> \mid x \equiv y(\mod k)\}$$ 就是一个等价关系（证明一下）

**【定义】等价类：** R 是 A 上的等价关系，定义等价类为 $$[a]_R = \{ x \mid x\in A, aRx \}$$


**【定理】：**（我是这么通俗理解的，等价类就是“一堆”相互等价的元素放到一起，集合 A 就被划分成了“若干堆”）
- **【定理】：**：R 是 A 上的等价关系，那么 $[a_R]=[b_R]$ 当且仅当 $aRb$
- **【定理】：**：R 是 A 上的等价关系，R 确定了 A 的一个划分（做为等价类）
- **【定理】：**：集合 A 上的一个划分，确定了一个等价关系


### 相容关系

**【定义】相容关系：** 如果一个关系 r 是自反的、对称的，那么 r 称为相容。

例如，A 是某个单词的集合 ，关系 r 定义为 “x,y 有相同的字母”。这就是个相容关系。

相容关系还可以有2种表示：
1. 矩阵可以表示关系。相容关系对应的矩阵特点是：主对角线都是1，对称矩阵
2. 无向图也可以表示。1）因为每个点（A中的元素）都有自反性，可以把自己指向自己的箭头省略掉。2）因为对称性，所以用一个无向图表示即可。

还有2个定义，不写严格的定义了，按照“无向图表示”来通俗的说明一下：
1. **【定义】相容类：** $C\subseteq A$，并且 $\forall x,y \in C \to xRy$，C叫做一个相容类。从无向图的角度理解，就是这样的一个子图：两两之间有连线。
2. **【定义】最大相容类：** 如果某个相容类还有子图，那么这个子图也是相容类。由此定义最大相容类：不被任何其它相容类真包含的相容类。

**定理**。如果存在相容类，必然存在最大相容类。


### 偏序关系

**【定义】偏序关系：** 如果一个关系是自反的、反对称的、传递的，这个关系叫做偏序关系。

例如，小于等于关系就是偏序关系。

**【定义】盖住：** R 是一个偏序关系，xRy，并且不存在另一个z，满足 $xRz\land zRy$，叫做 y 盖住了 x
- 定义 $$\mathrm{COV} R = \{ <x,y> \mid y$$ 盖住 x \}，
- $\mathrm{COV} R$ 是唯一的
- $\mathrm{COV} R$ 对应的图，叫做 **哈斯图**


**【定义】链：**  R 是 A 上的偏序关系，如果 A 的某个子集 $S\subseteq A$，有 $\forall x, y \in S \to xRy$，称为 S 是链。

**【定义】全序集合：** R 是 A 上的偏序关系，如果 A 本身是一个链，那么叫做 A 是全序集合（也叫做线序集合）


R 是 A 上的偏序关系，$B\subseteq A, b\in B$. 对于集合 B，我们给出类似 “极大值、极小值、最大值、最小值、上界、下界” 等一系列的概念。
- **【定义】极大元：** 不存在这样的 $x\in B, x\not=b$，使得 $bRx$，那么称为 b 是 B 的极大元。通俗地说，找不到比 b “更大”的了。B 的极大元可能有多个。
- **【定义】极小元：** 不存在这样的 $x\in B, x\not=b$，使得 $xRb$，那么称为 b 是 B 的极小元。同样，极小元可能有多个
- **【定义】最大值：** $\forall x\in B, xRb$，称为 b 是 B 的最大元。最大元有可能不存在。
- **【定义】最小值：** 同上
  - **【定理】：** 最大元如果存在，则唯一
- **【定义】上界：** $a\in A, \forall x \in B$，都有 $xRa$，那么称为 a 是 B 的上界。显然上界也是不唯一的。所有上界组成的集合，其最小值（上面定义过最小值）叫做 **上确界**  


**【定义】良序：** R 是 A 上的偏序关系，如果 A 的任意非空子集都存在最小元，那么 A 是良序的。

**定理：**： 如果 A 是良序的，那么 A 是全序的。

**定理：**： 如果 A 是全序的，且 A 有限，那么 A 是良序的。  
（如果 A 无限，结论未必成立，例如 实数集 $(0,1]$ 本身没有最小值）


## 函数


函数是一种关系，并且对于每一个 $x\in X$ 有唯一的 $y \in Y$ 使得 $<x,y>\in f$


然后是一些基本概念（不多写）**单射**、**满射**、**复合函数**、**逆函数**


### 特征函数和模糊子集

**【定义】特征函数：** $$\psi_A(x)=\left \{ \begin{array}{ll}
1&x\in A\\
0&o/w
\end{array}\right.$$，这个函数就定义为 集合 A 的特征函数。

特征函数有一些性质：
- $\psi_A(x)\equiv 0 \Leftrightarrow A=\varnothing $
- $\psi_A(x) \leq \psi_B(x) \Leftrightarrow A\subseteq B$
- $\psi_A(x) = \psi_B(x) \Leftrightarrow A = B$
- $\psi_{A\cap B}(x) = \psi_A(x) \psi_B(x)$
- $\psi_{A\cup B}(x) = \psi_A(x) + \psi_B(x) -\psi_{A\cap B}(x)$
- $\psi_{\sim A}(x) = 1-\psi_A(x)$
- $\psi_{A-B} = \psi_A(x) - \psi_{A\cap B}(x)$

根据这些定理，可以推导出集合运算定律，例如分配律等。

利用特征函数，可以推广出模糊子集的概念：$\mu = \phi_A(x)(0\leq \mu \leq 1)$ 对应一个模糊子集 A

这个 $\phi_A(x)$ 也称为 **隶属度函数**


### 可数集

**【定义】等势：** 如果 集合 A 的元素和集合 B 中的元素一一对应，那么称为 A 与 B 等势。记为 $A \sim B$

**【定理】：** 等势是一种等价关系

（既然是等价关系，就存在等价类）

**【定义】可数集：** 与自然数集等势的任意集合叫做可数集。

**定理1：** A 是可数集的充要条件是可以排列成 $$A=\{a_1, a_2, ..., a_n,...\}$$ 的形式

**定理2：** 任一无限集，必含有可数子集

**定理3：** 任一无限集，必与其某个真子集等势

**定理4：** 一个可数集，其任一无限子集都是可数的

**定理5：** 可数个两两不相交的可数集的并集，仍然是可数集

**定理6：** 设自然数集是 N，那么 $N\times N$ 是可数集  
证明提要：构建 $f:N\times N \to N$，如下：  
$f(m,n) = 1/2 (m+n)(m+n+1)+m$  
然后可证 f 是双射

**定理7：** 有理数集是可数集。  
证明提要：有理数集可以映射到 $$S = \{ <m, n> \mid m\in N, n\in N $$ 并且 m, n 互素 \}，显然 S 是 $N \times N$ 的子集，并且 S 无限。

**定理8：** 实数集 R 是不可数的。  
用反证法证明：假设R是可数的，并且列出来如下：  
$$\begin{array}{l}
s_1 = 0.a_{11}a_{12}...a_{1n}...\\
s_2 = 0.a_{21}a_{22}...a_{2n}...\\
...\\
s_m = 0.a_{m1}a_{m2}...a_{mn}...\\
...
\end{array}$$

进而构造一个实数 $r=0.b_1b_2...$ 使得 $$b_j=\left\{\begin{array}{ll}
1,&a_{jj}\not=1\\
2,&a_{jj} = 1
\end{array}\right.$$  
这个数字不在上面列出的数字中，也就是 $r\not \in S$，产生矛盾。




## 参考文献

《离散数学》上海科学技术出版社，左孝凌
