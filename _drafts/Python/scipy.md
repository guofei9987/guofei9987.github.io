## 常数

### 常数1

```py
from scipy import constants
constants.c#真空光速
constants.h#普朗克常亮
```

### 常数2

```py
constants.physical_constants
#是一个dict，value3个值分别是值、单位、误差
#例如：
constants.physical_constants["electron mass"]
```

### 常数3：单位转换
```py
constants.mile
constants.inch
constants.gram
```

## special：常用函数

```
from scipy import special
special.gamma(4)
special.gamma(1+1j)
special.gammaln(1000)
```

## optimize(优化)

### leastsq
[leastsq做最小二乘估计](
http://www.guofei.site/2017/06/06/leastsq.html)

### 最小值
optimize模块还有许多求最值的算法：
- fmin
- fmin_powell
- fmin_cg
- fmin_bfgs

http://www.guofei.site/2017/06/06/fmin.html

### fsolve求方程的解
如果要求解方程：  
$$\left \{ \begin{array}{ccc}
f1(u1,u2,u3)=0\\
f2(u1,u2,u3)=0\\
f3(u1,u2,u3)=0
\end{array}\right.$$

那么func这么定义：  
```py
def func(x):
  u1,u2,u3=x
  return [f1(u1,u2,u3),f2(u1,u2,u3),f3(u1,u2,u3)]
```

#### 代码案例1：

```
import scipy.optimize as opt
import numpy as np
def f(x):
    x0,x1,x2=x
    return np.array([5*x1+3,4*x0*x0-2*np.sin(x1*x2),x1*x2-1.5])

result=opt.fsolve(f,[1,1,1])
print(result)
print(f(result))
```

#### 代码案例2：  

如果给了Jacobian矩阵，那么迭代速度更快  
Jacobian矩阵的定义是：
$$\left [ \begin{array}{ccc}
\frac{\partial f1}{\partial u1}&\frac{\partial f1}{\partial u2}&\frac{\partial f1}{\partial u2}\\ \\
\frac{\partial f2}{\partial u1}&\frac{\partial f2}{\partial u2}&\frac{\partial f2}{\partial u2}\\ \\
\frac{\partial f3}{\partial u1}&\frac{\partial f3}{\partial u2}&\frac{\partial f3}{\partial u2}
\end{array} \right ] $$

```
import scipy.optimize as opt
import numpy as np
def obj_func(x):
    x0,x1,x2=x
    return [5*x1+3,4*x0*x0-2*np.sin(x1*x2),x1*x2-1.5]

def jacobian(x):
    x0, x1, x2 = x
    return [
        [0,5,0],
        [8*x0,-2*x2*np.cos(x1*x2),-2*x1*np.cos(x1*x2)],
        [0,x2,x1]
    ]
result=opt.fsolve(obj_func,[1,1,1],fprime=jacobian)
print(result)
print(obj_func(result))
```
