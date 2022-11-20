---
layout: post
title: 【线性最优化】理论篇
categories:
tags: 0x56_最优化
keywords:
description:
order: 7005
---

## 定义问题
线性规划（Liner Programing）的标准型（Canonical form）：  
$\min z=\sum\limits_{j=1}^n c_j x_j$  
s.t.  
$$\left \{ \begin{array}{ccc}
\sum\limits_{j=1}^na_{ij}x_j=b_i,&i=1,2,...m\\
x_j\geq 0&j=1,2,...n
\end{array}\right.$$

把各种形式转化为标准型的方法：
1. 若问题是求目标函数的最大值，$\max z$,那么，  
令$f=-z$转化为最小值  
2. 若不等式约束条件中出现$\sum\limits_{j=1}^na_{ij}x_j \leq b_i$,  
引入 **松弛变量** $x'_ i$，用两个约束式子替代：  
$$\left \{ \begin{array}{ccc}
\sum\limits_{j=1}^na_{ij}x_j +x_i' = b_i\\
x_i' \geq 0
\end{array}\right.$$
3. 若约束条件中出现$\sum\limits_{j=1}^na_{ij}x_j \geq b_i$,  
引入 **剩余变量** $x'_ i$，用两个约束式子替代：  
$$\left \{ \begin{array}{ccc}
\sum\limits_{j=1}^na_{ij}x_j - x_i' = b_i\\
x_i' \geq 0
\end{array}\right.$$
4. 如果约束条件中出现$x_j \geq h_j$,  
引入新变量$y_j=x_j-h_j$,用这个约束式子替代：  
$y_j \geq 0$  
5. 如果变量$x_j$的范围没有限制，那么  
引入$y_j',y_j''$,用$x_j=y_j'-y_j''$替代原式，  
约束条件变为:  
$$\left \{ \begin{array}{ccc}
y_j' \geq 0\\
y_j'' \geq 0
\end{array}\right.$$


## 单纯形法
一种对矩阵做变换的方法  
单纯形方法的目标是把原问题变换成
$$\left( \begin{array}{cc}A&B\\
C^T&O
\end{array}\right)$$  

其特征为(1,2,3条用线性变换可以达成)
1. 中心部位有单位子块
2. 右列元素非负
3. 单位子块对应底行元素为0
4. 底行其它元素非负




可以进行这样的变换
1. 底线以上的部分进行行交换
2. 底线以上的部分乘以非零常数
3. 底线以上的行加到另一行
4. 底线以上的行乘以常数后加到底线




## 大M法
单纯形法的改进
## 对偶单纯形法

## 对偶问题
原问题：
$\min z=c^Tx$  
s.t. $Ax\geq b$  
$x\geq 0$  


对应的对偶问题时  
$\max v=b^Ty$  
s.t. $A^Ty\leq c$  
$y\geq 0$  

### 对偶的性质
TH1：  
**对偶问题的对偶问题是原问题**


TH2：（弱对偶定理）  
x是原问题的可行解，y是对偶问题的可行解，那么  
$z=c^Tx\geq v=y^Tb$  


## 更一般的对偶问题
原问题是

$$\begin{array}{lcl}
\min f(x)\\
s.t.\\
\left \{ \begin{array}{rcl}
g_i(x) \ge 0 \\
h_j(x)=0   \\
x \in D
\end{array} \right.
\end{array} $$  
对应的对偶问题:  
$$\begin{array}{ll}
\max \theta(w,v)\\
s.t.\\
\left \{ \begin{array}{l}
w \ge 0 \\
\theta(w,v)=\inf \{ f(x) - \sum w_ig_i -\sum v_i h_j\}   \\
\end{array}\right.
\end{array} $$



---------------
## 参考文献
施光燕：《最优化方法》，高等教育出版社  
龚纯：《Matlab最优化计算》，电子工业出版社  
David R. Anderson ：《数据、模型与决策--管理科学篇》，机械工业出版社  
