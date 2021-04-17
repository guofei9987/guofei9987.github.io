---
layout: post
title: 【Python】collection&itertools
categories:
tags: Python语法
keywords:
description:
order: 1221
---


## collection
*来自[python官网](https://docs.python.org/3.7/library/index.html),仅摘抄自己用的最多的部分*

### Counter

生成
```py
import collections
counter=collections.Counter('aaabbc')
# 返回 Counter({'a': 3, 'b': 3})

collections.Counter({'a':2,'b':1}) # 返回 Counter({'a': 2, 'b': 1})
collections.Counter(a=2, b=1)
```


使用
```python
counter.keys(), counter.values()

counter.most_common(2) # 返回频率最高的n个，例如 [('a', 3), ('b', 2)]

# 访问不存在的元素时，返回0，而不是报错
collections.Counter(a=2, b=1)['c']

# update() 统计数字加进去，而不是覆盖
a = collections.Counter('aab')
a.update({'a': 1})

# subtract() 减，但是允许结果有负号
a.subtract({'a': 5})
```

运算符
```python
collections.Counter('aab') - collections.Counter('abc') # 结果的value中，剔除了0和负数（因此看起来应用范围不是很宽）
collections.Counter('aab') + collections.Counter('abc')
collections.Counter('aab') & collections.Counter('abc') # 共同元素的最小值
collections.Counter('aab') | collections.Counter('abc') # 共同元素的最大值
```

### defaultdict
在 dict 的基础上，复写了一个方法，使得在迭代中，省略赋值这一步
```py
import collections
d=collections.defaultdict(int)
# 与 dict 的区别是，dict 中没有的key 需要重新赋值。这里不需要，而是用 int 赋值过了
for i in range(5):
    d[i]+=i

d=collections.defaultdict(list)
for i in range(5):
    d[i].append(i)
```

### deque
对 `list` 进行了改进，使得在头部和尾部进行 pop 和 append 操作时，都是 O(1) performance.  
对比之下，`list` 进行pop(0) 和 insert(0,value) 都是 O(n) performance.  

```py
import collections

# 新建
deque = collections.deque([1,2,3,4,5]) # collection.deque(<iterable>)

# O(1)算法
deque.append(99)
deque.appendleft(8)
deque.pop()
deque.popleft()

# 其它
d2=deque.copy()
deque.clear()

deque.count(val) # 计算val的数量

deque.extend(d2) # 等价于 deque+d2

```

maxlen 设定最大程度，一旦设定完就不能变了。左添加时，如果超过最大长度，丢弃右边；右添加时，如果超过最大长度，丢弃左边

```python
deque = collections.deque([1, 2, 3, 4, 5], maxlen=3)
```



## 迭代器
### iter
生成一个迭代器，可以用 next 处理这个迭代器。
```python
it = iter((1,2,4))

next(it)
```


### 无穷迭代器
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

### 有限迭代器
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

### 排列组合迭代器

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
https://docs.python.org/3/
