
### 包
两个函数：  
V2E是给定顶点坐标，求欧氏距离  
plot_G是给定顶点坐标，画图  


下面这段代码保存为graph_plotter.py
```py
import matplotlib.pyplot as plt
import numpy as np


def V2E(V, E_noweight=None):
    # 输入顶点坐标，输出各边长度
    # V:dict,表示顶点最表
    # E:True&False构成的矩阵，表示这些点之间是否有线连接
    # E：权值矩阵，表示边的长度，inf表示不连接
    # 如果E_noweight=None，按照全连接图来处理
    n = len(V)
    if E_noweight is None:
        E_noweight = np.ones(shape=(n, n))
    E = np.empty(shape=(n, n))
    for i in V:
        for j in V:
            if E_noweight[i, j]:  # =True
                E[i, j] = np.linalg.norm(V[i] - V[j], ord=2)
            else:
                E[i, j] = np.inf  # =False
    return E


def plot_G(V, E_noweight):
    for i in V:
        plt.plot(V[i][0], V[i][1], 'o')
    for i in V:
        for j in V:
            if E_noweight[i, j] > 0:
                if not E_noweight[i, j] is np.inf:
                    temp = list(zip(V[i], V[j]))
                    plt.plot(temp[0], temp[1])
    plt.show()


if __name__ == '__main__':
    from scipy.stats import uniform

    V_name = range(5)
    rv = uniform(loc=0, scale=1)
    V = {i: rv.rvs(size=2) for i in V_name}
    n = len(V)
    E_noweight = rv.rvs(size=(n, n)) > 0.8 #对于无向图来说，这应该是个对称阵，这里省略了
    print(E_noweight)
    print(V2E(V, E_noweight))
    plot_G(V, E_noweight)

```


### 调用
```py
import graph_plotter

from scipy.stats import uniform

V_name = range(5)
rv = uniform(loc=0, scale=1)
V = {i: rv.rvs(size=2) for i in V_name}
n = len(V)
E_noweight = rv.rvs(size=(n, n)) > 0.8 #对于无向图来说，这应该是个对称阵，这里懒得改了，你按有向图来理解也没毛病
print(E_noweight)
print(graph_plotter.V2E(V, E_noweight))
graph_plotter.plot_G(V, E_noweight)

```

## dict表示法下，无权图转加权图

### 源数据
```py
a, b, c, d, e, f, g, h = range(8)
G = {
    a: {b, c, d, e, f},
    b: {c, e},
    c: {d},
    d: {e},
    e: {f},
    f: {c, g, h},
    g: {f, h},
    h: {f, g}
}
from scipy.stats import uniform

rv = uniform(loc=0, scale=1)
V = {i: rv.rvs(size=2) for i in range(8)}
```


### 做法
```py
import numpy as np
{u:{v:np.linalg.norm(V[u]-V[v],ord=2) for v in G[u]} for u in G}
```
