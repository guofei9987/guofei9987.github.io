---
layout: post
title: 递归.
categories: 
tags: 5经典算法
keywords:
description:
---

## 算法流程

用递归生成树结构的一般方法：（我总结的）  
（Matlab）  
```matlab
function myfun(i,A)
    if iscorrect(i,A)
        for i=ii
            myfun(i,A)
    elseif 到了树终点
        statement
    else
        donothing
    end
end
```

改进：

```matlab
function myfun(i,A)
    if iscorrect(i,A)
        for i=ii
            myfun(i,A)
    elseif 到了树终点
        statement
    else
        donothing
    end
end
```
例子：

## 四皇后问题
问题描述：  
如何在N×N的棋盘上放N个皇后，使得：  
1. 不能有两个皇后出现在一条横线上
2. 不能有两个皇后出现在一条竖线上
3. 不能有连个皇后出现在一条斜线上


(下面的代码还有改进的空间)
```py
import numpy as np


def iscorrect(i, j, M):
    m, n = M.shape
    if any(M[i, :]): return False
    if any(M[:, j]): return False
    if any(np.diag(M, j - i)): return False
    if any(np.diag(np.fliplr(M), n - 1 - j - i)): return False
    return True


m = 4
n = 4
M = np.zeros(shape=(m, n))


def queen(k, m, M):
    for l in range(k+1,m*m):
        i=l%m
        j=l//m
        if iscorrect(i,j,M):
            M[i,j]=1
            queen(l,m,M)
            M[i,j]=0
    if M.sum()==4:
        print(M)


queen(-1,m, M)

```



[逻辑教授三学生问题](http://www.guofei.site/2017/08/07/intersting2.html)  


## 整数划分问题

定义整数的一个 **划分** :  
$n=n_1+n_2+...+n_k, (n_1 \geq n_2 \geq n_3...  \geq n_k \geq  1)$  
例如，6=2+1+1+1+1是一个划分。  

**问题** 写一段程序，输入任意正整数，输出这个正整数有多少划分。  

**分析**   
设$P(n,m)$表示正整数m的所有的划分中，不大于m的划分个数。  
例如，$P(6,1)=1$，因为6=1+1+1+1+1+1  

可以建立以下的递推关系：  


1. $P(n,1)=1$
2. $P(n,m)=P(n,n), m> n$
3. $P(n,n)=P(n,n-1)+1$
4. $P(n,m)=P(n,m-1)+P(n-m,m)$


下面很容易了：

```py
def P(n,m):
    if m==1:return 1
    elif m>n:return P(n,n)
    elif m==n:return P(n,n-1)+1
    elif m<n:return P(n,m-1)+P(n-m,m)

print(P(6,6))
```

## 上楼梯问题
已知楼梯有20阶台阶，上楼可以一步1阶，也可以一步2阶，计算有多少种上楼的方法

```py
c = [0]


def stepproblem(step, totalstep):
    totalstep = totalstep + step  # 这一个节点所要做的操作
    if totalstep > 20:  # 不符合要求的叶
        return 0
    if totalstep == 20:  # 符合要求的叶
        c[0] = c[0] + 1  # 利用list共享内存的特性
        return 1
    if totalstep < 20:  # 节点
        stepproblem(1, totalstep)
        stepproblem(2, totalstep)


stepproblem(0, 0)
print(c)
```

## 全排列问题
A是一个list，生成A的所有排列

```py
n = 5
A = list(range(n))


def makelist(A, B):  # B是选出来的序列，A是还没用到的数

    if len(A) == 0:  # 叶
        print(B)
    else:  # 结
        for i in A:
            A_copy = A.copy()
            B_copy = B.copy()
            A_copy.remove(i)
            B_copy.append(i)
            makelist(A_copy, B_copy)


B = []
makelist(A, B)

```
### 幻方问题
幻方是这样一种方阵，每一行、每一列以及两个对角线之和均相等  
用全排列问题给出的方法进行全排列，然后给出幻方  

```py
import numpy as np


def ismagic(M):
    M = np.array(M)
    m, n = M.shape
    temp_sum = M[0].sum()
    for i in range(1, m):  # 列
        if not M[i].sum() == temp_sum:
            return False
    for i in range(n):
        if not M[:, i].sum() == temp_sum:
            return False
    if not np.trace(M) == temp_sum:
        return False
    M_c = np.fliplr(M)
    if not np.trace(M_c) == temp_sum:
        return False
    return True


def list2sqrt(M):
    M = np.array(M)
    m, = M.shape
    M.shape = m ** 0.5, m ** 0.5
    return M


def makelist(A, B):  # B是选出来的序列，A是还没用到的数

    if len(A) == 0:  # 叶
        M = list2sqrt(B)
        if ismagic(M):
            print(M)
    else:  # 结
        for i in A:
            A_copy = A.copy()
            B_copy = B.copy()
            A_copy.remove(i)
            B_copy.append(i)
            makelist(A_copy, B_copy)


B = []
n = 9
A = list(range(1, n + 1))
makelist(A, B)
```

## 递归法求幂

计算$m^n$时，把m连乘n次，这种算法效率是很低的，注意到以下迭代关系：  

$$m^n= \left \{ \begin{array}{ccc}
1&n=0\\
m&n=1\\
m^k * m^k&n=2k\\
m*m^k&n=2k+1
\end{array}\right.$$  

立即得出结果：  
```py
def power_func(m, n):
    if n == 0:
        return 1
    elif n == 1:
        return m
    elif n % 2 == 0:
        return power_func(m, n / 2) * 2
    elif n % 2 == 1:
        return m * power_func(m, n - 1)
```

## 汉诺塔问题

经典问题，不描述。  

首先，确定这是一个递归问题，（要思考一番）  
其次，确定这个递归问题如何表示（要思考更长）  

```py
def move(n, x, y, z):  # 将n个盘子从x移动到z
    if n == 1:
        print('{} to {}'.format(x, z))
    else:
        move(n - 1, x, z, y)
        print('{} to {}'.format(x, z))
        move(n-1,y,x,z)

move(3,'A','B','C')
```
