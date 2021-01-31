
## 并行化
经过比较，使用如下技术进行多线程
```
from multiprocessing.dummy import Pool
self.pool = Pool(n)
```

具体来说，我们对3个算子进行并行化操作:
```
def crossover_pmx_paral(self):
    '''
    Executes a partially matched crossover (PMX) on Chrom.
    For more details see [Goldberg1985]_.

    :param self:
    :return:

    .. [Goldberg1985] Goldberg and Lingel, "Alleles, loci, and the traveling
   salesman problem", 1985.
    '''
    Chrom, size_pop, len_chrom = self.Chrom, self.size_pop, self.len_chrom

    def crossover_pmx_ind(i):
        Chrom1, Chrom2 = self.Chrom[i], self.Chrom[i + 1]
        n1, n2 = np.random.randint(0, self.len_chrom, 2)
        if n1 > n2:
            n1, n2 = n2, n1
        # crossover at the point n1 to n2
        for j in range(n1, n2):
            x = np.argwhere(Chrom1 == Chrom2[j])
            y = np.argwhere(Chrom2 == Chrom1[j])
            Chrom1[j], Chrom2[j] = Chrom2[j], Chrom1[j]
            Chrom1[x], Chrom2[y] = Chrom2[y], Chrom1[x]
        self.Chrom[i], self.Chrom[i + 1] = Chrom1, Chrom2

    self.pool.map(crossover_pmx_ind, range(0, size_pop, 2))


def mutation_TSP_paral(self):
    def mutation_TSP_ind(i):
        for j in range(self.n_dim):
            if np.random.rand() < self.prob_mut:
                n = np.random.randint(0, self.len_chrom, 1)
                self.Chrom[i, j], self.Chrom[i, n] = self.Chrom[i, n], self.Chrom[i, j]

    self.pool.map(mutation_TSP_ind, range(self.size_pop))
    return self.Chrom


def x2y(self):
    '''
    calculate Y for every X
    :return:
    '''
    self.Y = np.array(self.pool.map(self.func,self.X))
    # self.Y = np.array([self.func(x) for x in self.X])
    return self.Y

```
做遍历操作
```
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sko.demo_func import function_for_TSP

num_points, points_coordinate, distance_matrix, cal_total_distance = function_for_TSP(num_points=20)

# %% do GA
import datetime
from sko.GA import GA_TSP
from sko.GA_p import GA_TSP as GA_TSP_p
from sko.GA_p import crossover_pmx_paral, mutation_TSP_paral

time_recoder = dict()
ga_tsp = GA_TSP(func=cal_total_distance, n_dim=num_points, size_pop=300, max_iter=800, Pm=0.3)
start = datetime.datetime.now()
best_points, best_distance = ga_tsp.run()
end = datetime.datetime.now()
time_recoder[-1] = (end - start).microseconds

for i in range(1, 10):
    print(i)
    ga_tsp_p = GA_TSP_p(func=cal_total_distance, n_dim=num_points, size_pop=300, max_iter=800, Pm=0.3)
    ga_tsp_p.register('crossover', crossover_pmx_paral). \
        register('mutation', mutation_TSP_paral)
    start = datetime.datetime.now()
    best_points, best_distance = ga_tsp_p.run(i)
    end = datetime.datetime.now()
    time_recoder[i] = (end - start).microseconds
```

结果：
{-1: 488314,
 1: 426028,
 2: 828696,
 3: 778978,
 4: 704495,
 5: 232801,
 6: 972598,
 7: 515899,
 8: 335410,
 9: 145259}

 {-1: 60692,
  1: 1052,
  2: 826881,
  3: 172545,
  4: 232862,
  5: 546818,
  6: 276927,
  7: 786702,
  8: 260860,
  9: 598577}


 注：
 - 单位是microseconds
 - -1指的是不进行并行化



## 矢量化
作为Matlab出身的人，必然想要借助 `numpy` 的矢量化计算特点来加快计算速度。
### 针对0/1
#### mutation
做一个mask，是一个与 `Chrom` 大小一致的0/1矩阵，如果值为0，那么对应位置进行变异（0变1或1变0）  
自然想到用整除2的方式进行  

```python
def mutation(self):
    # mutation of 0/1 type chromosome
    mask = (np.random.rand(self.size_pop, self.len_chrom) < self.prob_mut) * 1
    self.Chrom = (mask + self.Chrom) % 2
    return self.Chrom
```
用pycharm的profile功能试了一下，效果良好

再次改进。我还嫌求余数这一步速度慢，画一个真值表

|A|mask：是否变异|A变异后|
|--|--|--|
|1|0|1|
|0|0|0|
|1|1|0|
|0|1|1|

发现这就是一个异或
```python
def mutation2(self):
    mask = (np.random.rand(self.size_pop, self.len_chrom) < self.prob_mut)
    self.Chrom ^= mask
    return self.Chrom
```
测试发现运行速度在上面的基础上快了1~3倍。

#### crossover
同样思路，试试crossover.
- mask同样，1表示对应点交叉，0表示对应点不交叉


做一个真值表，总共8种可能，发现其中只有2种可能基因有变化（等位基因一样时，交叉后的结果与交叉前一样）

|A基因|B基因|是否交叉|交叉后的A基因|交叉后的B基因|
|--|--|--|--|--|
|1|0|1|0|1|
|0|1|1|1|0|

可以用 `异或` 和 `且` 来表示是否变化的表达式: `mask = (A^B)&C`，然后可以计算了`A^=mask, B^=mask`

代码实现
```
def crossover_2point_bit(self):
    Chrom, size_pop, len_chrom = self.Chrom, self.size_pop, self.len_chrom
    Chrom1, Chrom2 = Chrom[::2], Chrom[1::2]
    mask = np.zeros(shape=(int(size_pop / 2),len_chrom),dtype=int)
    for i in range(int(size_pop / 2)):
        n1, n2 = np.random.randint(0, self.len_chrom, 2)
        if n1 > n2:
            n1, n2 = n2, n1
        mask[i, n1:n2] = 1
    mask2 = (Chrom1 ^ Chrom2) & mask
    Chrom1^=mask2
    Chrom2^=mask2
    Chrom[::2], Chrom[1::2]=Chrom1,Chrom2
    self.Chrom=Chrom
    return self.Chrom
```
用pycharm的profile功能试了一下，crossover_2point和crossover_2point_bit的耗时占比分别是53.7和37.6，并且这个数字比较稳定。说明效率有所提升


### selection_tournament
实战发现，selection_tournament 往往是最耗时的，几乎占用一半时间，因此需要优化
```python
def selection_tournament_faster(self, tourn_size=3):
    '''
    Select the best individual among *tournsize* randomly chosen
    Same with `selection_tournament` but much faster using numpy
    individuals,
    :param self:
    :param tourn_size:
    :return:
    '''
    aspirants_idx = np.random.randint(self.size_pop, size=(self.size_pop, tourn_size))
    aspirants_values = self.FitV[aspirants_idx]
    winner = aspirants_values.argmax(axis=1)  # winner index in every team
    sel_index = [aspirants_idx[i, j] for i, j in enumerate(winner)]
    self.Chrom = self.Chrom[sel_index, :]
    return self.Chrom
```

发现own time 和time 都降为原来的10%~15%
