---
layout: post
title: 【Python标准库】itertools
categories:
tags: Python语法
keywords:
description:
order: 1230
---

## iter
生成一个迭代器，可以用 next 处理这个迭代器。
```python
it = iter((1,2,4))

next(it)
```


## 无穷迭代器
```py
itertools.count(start,[step])
# 返回 start,start+step,start_2*step ,...
# 相当于 while True: print(res);res+=step

itertools.cycle('ABCD')
# 返回 A,B,C,D,A,B,C,D,...无限循环
# 相当于 while True: print(input_iterable[i % len(input_iterable)])

itertools.repeat(elem,n)
# elem重复n次.相当于 elem, elem, elem,...
```

## 有限迭代器
```py
itertools.accumulate([1,2,3])
# 相当于 for i in cunsum([1,2,3])

itertools.chain([p1,p2,...,pn],[q1,q2,...,qm])
# 相当于 for i in [p1,p2,...,pn]:dosomething;for j in [q1,q2,...,qm]: dosomething
itertools.chain.from_iterable([iter1,iter2,...,itern])
# 功能相似，但入参不仅仅是list，也可以是其它 iterable

itertools.compress('abcdef',[0,1,0,1])
# 挑选合适的元素，例如，这里就是b,d

itertools.groupby([1,2,3,1])
# 每个元素是 (元素, 迭代器)

itertools.starmap(func,seq)
# starmap(pow, [(2,5), (3,2), (10,3)]) --> 32 9 1000
```

## 排列组合迭代器

```py
itertools.product([1,2,3,4],repeat=2)
# 相当于有放回抽样repeat次，返回 len^repeat 个结果
# 进一步，可以指定多个数列，product('ab', range(3),repeat=2)

itertools.permutations([1,2,3,4],r=2)
# 所有的排列 ,有 $A_{len}^r$ 种结果

itertools.combinations([5,2,3,4],r=2)
# 所有的组合，有 $C_(len)^r$ 种结果
```


```py
from scipy.special import comb, perm
perm(3, 2)
comb(3, 2)
```

## 参考文献
https://docs.python.org/3/library/itertools.html  
https://docs.python.org/3/  
