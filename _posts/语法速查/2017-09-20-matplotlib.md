---
layout: post
title: 【Python】【matplotlib】绘图
categories: Geek
tags: 语法速查
keywords:
description:
---





## 示例


```py
import matplotlib.pyplot as plt
import numpy as np
x=np.linspace(0,6,1000)
y=np.sin(x)
z=np.cos(x**2)
plt.plot(x,y,label="$sin(x)$",color='red',linewidth=2)
#label 可以用LaTeX
plt.plot(x,z,'b--',label='$cos(x^2)$')

plt.xlabel('Time(s)')
plt.ylabel('Volt')
plt.title('Pyplot')
plt.ylim(-1.2,1.2)
plt.legend()

plt.show()
```

*linestyle&marker可以搭配使用，例如'.-'，例如'+--'*  


## matplotlib.rcParams
*<class 'matplotlib.RcParams'> ， 可以按照dict理解*   
存放了基本配置，这里拣选一部分进行说明：  

|变量|意义|
|--|--|
|savefig.dpi|点击工具栏里save进行保存时的dpi|
|savefig.directory|点击工具栏里save进行保存时的默认目录|






## 多图表&多子图

- plt.figure(1)可以转换当前的画布
- plt.sca(ax1)转换到指定的axes


```py
# 一个案例
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 10)

plt.figure(1)
ax1_211 = plt.subplot(221)
ax1_212 = plt.subplot(223)
ax1_122 = plt.subplot(122)

plt.figure(2)
ax2_211 = plt.subplot(211)
ax2_212 = plt.subplot(212)

plt.sca(ax1_211)
plt.plot(x, np.sin(x))
plt.sca(ax1_212)
plt.plot(x, np.cos(x))
plt.sca(ax1_122)
plt.plot(x, x)

plt.sca(ax2_211)
plt.plot(x, x)
plt.plot(x, -x)
plt.sca(ax2_212)
plt.plot(x, np.sin(x))

plt.show()
```












































































## 保存

```py
plt.savefig('test.png',dpi=120)
```
