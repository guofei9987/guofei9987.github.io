---
layout: post
title: 【离散数学1】数理逻辑
categories:
tags: 0x59_应用数学
keywords:
description:
order: 5901
---

## 命题逻辑

**命题的定义**

**联结词**
- 与、或、非 ：$\land, \lor, \lnot$  
- 条件：若 P 则 Q， $P\to Q$，
    - 它的真值情况等价于 $\lnot P \lor Q$
    - 除非 P，否则 Q。写为 $\lnot P \to Q$
- 双条件：P 当且仅当 Q， $P \leftrightarrows	Q$，它的真值情况等价于 $(P\land Q)\lor(\lnot P \land \lnot Q)$

## 运算律

1. 对合律。$\lnot \lnot P \Leftrightarrow	P$
2. 幂等律。
    - $P\land P  \Leftrightarrow	P$
    - $P\lor P  \Leftrightarrow	P$
3. 交换律
    - $P\land Q  \Leftrightarrow	Q\land P$
    - $P\lor Q  \Leftrightarrow	Q\lor P$
4. 结合律
    - $(P\lor Q)\lor R \Leftrightarrow P\lor (Q\lor R)$
    - $(P\land Q)\land R \Leftrightarrow P\land (Q\land R)$
5. **分配律**
    - $P\lor (Q\land R) \Leftrightarrow (P\lor Q)\land (P \lor R)$
    - $P\land (Q\lor R) \Leftrightarrow (P\land Q)\lor (P \land R)$
6. 吸收律
    - $P\lor(P\land Q) \Leftrightarrow P$
    - $P\land(P\lor Q) \Leftrightarrow P$
7. **德摩根律**
    - $\lnot(P\lor Q) \Leftrightarrow \lnot P \land \lnot Q$
    - $\lnot(P\land Q) \Leftrightarrow \lnot P \lor \lnot Q$
8. 同一律和零律
    - $P\lor F \Leftrightarrow P$
    - $P\land F \Leftrightarrow P$
    - $P\land F \Leftrightarrow F$
    - $P\lor T \Leftrightarrow T$
9. 否定律
    - $P\lor \lnot P \Leftrightarrow T$
    - $P\land \lnot P \Leftrightarrow F$



## 对偶


命题的运算符还有很多


实际上，无论什么样的命题运算符组成的命题，都可以用 $\lnot, \lor$ 表示，也可以用 $\lnot, \land$ 表示
- 例如，$P\land Q  \Leftrightarrow \lnot (\lnot P \lor \lnot Q)$


定义 **对偶式**：某个命题公式中，1）把 $\land$ 变成 $\lor$ 2）把
$\lor$ 变成 $\land $ 3）T 与 F 也互换，所得 $A^\star$ 称为 A 的对偶式

定理1: $A$ 也是 $A^\star$ 的对偶式

定理2：$\lnot A(P_1, P_2, ..., P_n) \Leftrightarrow A^\star (\lnot P_1, \lnot P_2,..., \lnot P_n,)$

定理3：若 $P \Leftrightarrow Q$，那么 $P^\star \Leftrightarrow Q^\star$


## 布尔合取和布尔析取

定义 **布尔合取** n个命题变元（或其非）的合取式，称为布尔合取。
- 例如，$P_1, P_2$ 的布尔合取有4个： $P_1 \land P_2, \lnot P_1 \land P_2, P_1 \land \lnot P_2,\lnot P_1 \land \lnot  P_2$
- n个命题变元有 $2^n$ 个布尔合取

**布尔合取** 的性质
1. $P_n$ 的真值情况有 $2^n$ 种，其中对于任意布尔合取 m，只有 1 种组合下A 为 T，其它 $2^n-1$ 种组合都为 F
2. 任意两个不同的布尔合取 $m_1, m_2$，其合取永假 $m_1 \land m_2 \Leftrightarrow F$
3. 全体布尔合取的析取永为真 $m_1\lor m_2 \lor ... \lor m_{2^n} \Leftrightarrow T$


对于某一个命题 A，如果它表示为若干个布尔合取的析取 $m_{k_1} \lor m_{k_2} \lor ... \lor m_{k_m}$，叫做 **主析取范式**


（有点像n维坐标系中的基）


类似的，可以定义 **布尔析取**，进而也有3个类似的性质，也有 **主合取范式**


## 谓词逻辑

- “b 是 A” 记为 $A(a)$ 称为 一元谓词
- “a小于b” 这种记为 $B(a,b)$ 称为 二元谓词
- 以此类推

谓词不是命题，把具体的客体 a,b 填进去后才是命题

日常用于还有一些“所有的”、“存在一些”这样的表达，
- 所有的、任何的、每个、对任意一个。“所有的人都是要呼吸的”。M(x):x是人，H(x)：x要呼吸。命题就记为 $(\forall x)(M(x)\to H(x))$
- 存在一些、至少有一个、对于一些。“有些人早饭吃面包”。M(x):x是人，H(x)：x早饭吃面包。命题就记为 $(\exists x)(M(x)\to H(x))$

变元数量
- $(\forall A)P(x,y,z)$ 是一个二元谓词
- $(\exists y)(\forall A)P(x,y,z)$ 是一元谓词
- 零元谓词是命题


### 谓词的否定

- $\lnot (\forall x) P(x) \Leftrightarrow (\exists x) \lnot P(x)$  
- $\lnot (\exists x)P(x) \Leftrightarrow (\forall x) \lnot P(x)$


证明1：  
$\lnot (\forall x)A(x)$  
$\Leftrightarrow \lnot(A(a_1\land A(a_2) \land...\land A(a_n))$  
$\Leftrightarrow (\lnot A(a_1)\land...\land \lnot A(a_n))$  
$\Leftrightarrow (\exists x) \lnot A(x)$


证明2：  
$\lnot (\exists)A(x)$  
$\Leftrightarrow \lnot (A(a_1)\lor A(a_2) \lor ... \lor A(a_n))$  
$\Leftrightarrow (\lnot A(a_1)) \land ...\land (\lnot A(a_n))$  
$\Leftrightarrow (\forall x) \lnot A(x)$


### 量词的“分配律”

类似的方法可以证明：

- $(\forall x) (A(x)\land B(x)) \Leftrightarrow (\forall x)A(x) \land (\forall x)B(x)$
- $(\forall x) (A(x)\lor B(x)) \Leftarrow (\forall x)A(x) \lor (\forall x)B(x)$（单向的被蕴含关系，不是双向的，翻过来不成立）
- $(\exists x)(A(x)\lor B(x)) \Leftrightarrow (\exists x)A(x) \lor (\exists x)B(x) $
- $(\exists x)(A(x)\land B(x)) \Rightarrow (\exists x) A(x) \land (\exists x)B(x)$（蕴含关系）


第2条的一个现实例子：“一班学生全都聪明或努力”不能推导出 “（一班学生全都聪明）或者（一班学生全都努力）”，但反过来可以推导出。

上面的2、4是单向的蕴含关系，如果其中一个是命题，就是双向的等价关系了:
- $(\forall x) (A(x)\land B) \Leftrightarrow (\forall x)A(x) \land B$
- $(\forall x) (A(x)\lor B) \Leftrightarrow (\forall A(x)) \lor B$
- $(\exists x)(A(x)\lor B) \Leftrightarrow (\exists x)A(x) \lor (\exists x)B $
- $(\exists x)(A(x)\land B) \Rightarrow (\exists x) A(x) \land B$

另外，还有带 $\to$ 的表达式也有对应的一堆运算律，可以从上面的运算律中轻松推导出来，就不多写了。



### 多量词的“连用”

一些等价关系：
- $(\forall x)(\forall y)A(x,y) \Leftrightarrow (\forall y)(\forall x)A(x,y)$
- $(\exists x)(\exists y)A(x,y) \Leftrightarrow (\exists y)(\exists x)A(x,y)$


一些蕴含关系：
- $(\forall x)(\forall y)A(x,y) \Rightarrow (\exists x)(\forall y)A(x,y)$
- $(\exists x)(\forall y) A(x,y) \Rightarrow (\forall y)(\exists x) A(x,y)$
- $(\forall x)(\exists y)A(x,y) \Rightarrow (\exists x)(\exists y)A(x,y)$

以上也是用前面的方法可以证明，不多写。下面用一个例子做说明。


A(x,y) 表示 x 和 y 同姓。x是甲村的人，y是乙村的人。
- $(\forall x)(\forall y)A(x,y)$ 就表示甲村所有人于乙村所有人都同姓
- $(\exists x)(\forall y)A(x,y)$ 甲村存在一个人，乙村所有人都跟他同姓
- $(\forall x)(\exist y)A(x,y)$ 对于甲村每一个人，乙村存在一个人都与他同姓。

### 前束范式

**【定义】前束范式**：形如这样的形式，叫做前束范式：$(\square v_1)(\square v_2)...(\square v_n) A$

**【定理】** 任意一个谓词公式，都和一个前束范式等价。





## 参考文献

《离散数学》上海科学技术出版社，左孝凌
