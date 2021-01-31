## 常数

### 常数1

```py
from scipy import constants
constants.c #真空光速
constants.h #普朗克常亮
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

### fsolve解方程



## interpolate插值
interp1d

```py
import numpy as np
from scipy import interpolate
import pylab as pl

x=np.linspace(0,10,11)
y=np.sin(x)

xnew=np.linspace(0,10,101)

pl.plot(x,y,'ro')
list1=['linear','nearest']
list2=[0,1,2,3]
for kind in list1:
    print(kind)
    f=interpolate.interp1d(x,y,kind=kind)
    #f是一个函数，用这个函数就可以找插值点的函数值了：
    ynew=f(xnew)
    pl.plot(xnew,ynew,label=kind)

pl.legend(loc='lower right')
pl.show()
```
