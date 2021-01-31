---
layout: post
title: 【Complex Analysis0】基本概念
categories:
tags: 5-3-复分析与积分变换
keywords:
description:
order: 92500
---

## 一些性质
$Re(z)=\dfrac{z+\bar z}{2},Im(z)=\dfrac{z-\bar z}{2}$  
幅角$\arg z$有无穷多个，主值$-\pi<Arg z\leq \pi$  

指数表达式$\rho e^{i\theta}=\rho(\cos \theta+i\sin\theta)$  


$z*\rho e^{i\theta}$   
实际上是拉伸了 $\rho$ ,然后旋转了 $\theta$  


**TH**  
两个复数的积的模等于模的积，两个复数积的幅角等于幅角的和  
$|x+y|\leq|x|+|y|$  


argument 的性质:
- $\arg(\bar z)=-\arg z$
- $\arg(1/z)=-\arg z$
- $\arg(z_1z_2)=\arg z_1 \arg z_2$

## Topology in the Plane
### 平面点集
邻域
:    $\mid z-z_0\mid<\delta$的z的集合叫做$z_0$的邻域

内点
:    $z_0\in E,z_0$的某个邻域是$E$的子集，那么$z_0$是$E$的 **内点**  

边界点
:    $z_0$的任意邻域内既有属于E的点，也有不属于E的点，称$x_0$是E的 **边界点**

边界
:    全部 **边界点** 的集合  

开集
:    如果$E$的每一个点都是内点，那么称E为 **开集**  

闭集
:    一个集合包含所有边界点，叫做闭集。

连通的
:    如果E内任意两点，都可以用折线连接起来，且折线上的点都属于E，那么称E为 **连通的**

开区域
:    连通的开集称为 **开区域**

闭区域
:    开区域与其边界的并集，称为 **闭区域**  


*closure* of E is $\bar E=E\cup \partial E$  
*interior* of E $E^o$ 表示E所有的内点  

connected(连通的，上面给出一个定义了，这里还有一个等价定义)
:    Two sets $X, Y \in \mathbb C$ are separated if there are disjoint open set $U, V$ so that $X \subset U$ and $Y \subset V$. A set W in $\mathbb C$ is connected if it is impossible to find two separated non-empty sets whose union equals W.



### 直线方程

- $z_1\cdot\bar z_2=z_2\cdot\bar z_1=x_1\cdot x_2+y_1\cdot y_2$
 这是一种內积的表示形式

-  $real(B*\bar z)=-C/2$
 其中B是法向量，C是某一个实数 $-\frac{C}{2|B|}$是O点到直线的距离

- $\overline Bz+B\overline z+C=0$
（等价写法）

### 圆的方程
- $|z-z_0|=R$
其中R是半径， $z_0$ 是圆心

- $Az\overline z+\overline B z+B \overline z +C=0$  
其中，A, C是实数  
其中-B/A是圆心，$B \overline B-C$ 是半径。
若A=0变成直线。  





## 初等函数的描述
这一部分是学完整个复变函数课程后，做的总结。对常见的初等函数性质进行一些描述，涉及到
- 多项式函数$f(z)=a_nz^n+...+a_1 z+z_0$
- 分式多项式函数$f(z)=p_1(z)/p_2(z)$
- 分式线性映射$f(z)=(az+b)/(cz+d)$，虽然另一篇博客专门详细分析这个函数，但这里再次总结一下
- 三角函数 $\sin, \cos$
- 指数函数$e^{z}$
- 对数函数$Log z$

### 1. 微分
- $(z^n)'=nz^{n-1}$
- $\sin'=\cos, \cos'=-\sin$
- $(e^{az})'=ae^{az}$
- $(Log z)'=1/z, z\in \mathbb C\setminus (-\infty,0]$，这个区间需要注意，造成对数函数的性质有些特殊

微分形式与 real function 一致，所以积分大致也相似，就不写了。

### 2. 解析带来的性质
- 解析函数在C上无界，并且f的这个无穷远在z的无穷远处，除非是常数函数
- 解析函数在区间C内的模的最值$\max f(z)$在边界上
- 任意阶导数都解析
- C上的解析函数，一定在一四象限（右半边）有值，除非是常数函数
- 导数非0的区域，有包角性。

### 3. 形状（重点）

- 二次多项式。
    - 前面提过，二次多项式一定可以经过线性映射，转化为$z^2+c$的形式。函数图像就是成倍旋转和缩放后，平移c。
    - Julia set. 多次自我迭代，有些区域缩到0，有些放大到无穷，边界会有些奇妙的特征。有时是分析曲线，有时是漂亮的曲线。
- 分式线性映射。
    - 保圆性。（如果把直线看成无穷大的圆）
    - 任意三点到任意三点的映射存在、唯一
- 指数函数。
    - 把C映射到$C\setminus 0$
    - 沿着i轴有周期性，周期为$2i\pi$
    - 把矩形映射到扇环
- 对数函数
    - 把扇环映射到矩形
- $\sin z=\sin (u+iv)=\dfrac{e^\theta-e^{-\theta}}{-2i}$（还没找到太好的骨架）
    - 周期为$2\pi$
    - 把实数轴映射到[-1,1]
    - 把复数轴映射到复数轴，而且上下颠倒
    - 实在不好描述

写个可视化的代码，自己去试试吧
```py
z=(np.linspace(-np.pi/2,np.pi/2,30).reshape(1,-1)+1j*np.linspace(-1,2,30).reshape(-1,1)).reshape(-1,1)
f_z=np.sin(z)

fig,ax=plt.subplots(1,2)
ax[0].plot(z.real,z.imag,'.')
ax[1].plot(f_z.real,f_z.imag,'.')
```

## 参考资料
coursera:[Introduction to Complex Analysis](https://www.coursera.org/learn/complex-analysis/)  
李红：《复变函数与积分变换》高等教育出版社  
“十五”国家规划教材《复变函数与积分变换》高等教育出版社  
钟玉泉：《复变函数论》高等教育出版社  
