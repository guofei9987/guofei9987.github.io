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
