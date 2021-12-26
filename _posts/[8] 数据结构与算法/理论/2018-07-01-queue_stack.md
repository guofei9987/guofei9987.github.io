---
layout: post
title: 【堆、栈、队列】Queue & Stack & heapq
categories:
tags: 0x80_数据结构与算法
keywords:
description:
order: 502
---


## 主要内容
- stack
- queue：一种 first-in-first-out (FIFO) 算法
- 优先队列、优先堆：Last-in-first-out Data Structure（先进先出表）
- 多级反馈队列

## 栈和队列
我们知道，list天然地适合做 Stack，即尾部入，尾部出。  
我们又知道 list 删除头部的元素是极为低效的，解决方法是很简单，只要增加一个指向头部的指针即可。  

TODO：这里还需要补充


### 栈

用 list 实现栈
```py
class Stack(list):
    def push(self, term):
        self.append(term)

    def take(self):
        return self.pop()
```


### 队列

用 list 实现队列
- 缺点：内存会一直增加

```py
# 缺点：内存会一直增加
class Queue1(list):
    def __init__(self):
        super(Queue1, self).__init__()
        self.head_idx = -1

    def push(self, term):
        self.append(term)

    def take(self):
        self.head_idx += 1
        return self[self.head_idx]


# 缺点：虽然内存控制住了，但是 take 操作耗时加倍
class Queue2(object):
    def __init__(self):
        self.q = list()

    def push(self, term):
        self.q.append(term)

    def take(self):
        self.q = self.q[1:]


# 用链表做，效率和 2 一样
class Node(object):
    def __init__(self, val):
        self.val = val
        self.next = None


class Queue3(object):
    def __init__(self):
        self.head = Node(None)
        self.tail = self.head

    def push(self, term):
        node_new = Node(term)
        self.tail.next = node_new
        self.tail = node_new

    def take(self):
        res = self.head.next
        self.head.next = res.next
        return res

# 当已经出列的元素多余100个时，重整list，这应该是比较均衡的方案了
class Queue(object):
    def __init__(self):
        self.q = list()
        self.head_idx = -1

    def push(self, term):
        self.q.append(term)

    def take(self):
      # 这里还可以根据列表大小和实际功能，做动态更改，而不是固定100
        if self.head_idx == 100:
            self.q = self.q[101:]
            self.head_idx = -1
        self.head_idx += 1
        return self.q[self.head_idx]
```

某测试数据伤的耗时：
```
0:00:02.868541
0:00:06.369444
0:00:06.533770
0:00:03.142483
```



## Circular Queue
用list来模拟Cirular Queue
```py
num_list[i%len_list]
```

## 优先队列

这样的队列：每个项目对应一个优先度，出列顺序按照优先度来排。
- 常用于计算机进程分配、医院急救队列
- ？好像用二叉堆是最优的

## 二叉堆

[扩展阅读](https://mp.weixin.qq.com/s/TKRtF2dAtH7VuNs-FC4awA)

二叉堆是一种特殊的堆。具有如下的特性：
1. 具有完全二叉树的特性。
2. 堆中的任何一个父节点的值都大于等于它左右孩子节点的值，或者都小于等于它左右孩子节点的值。借此，又可以把二叉堆分成两类：
    1. 最大堆：父节点的值大于等于左右孩子节点的值。
    2. 最小堆：父节点的值小于等于左右孩子节点的值。

**二叉树往往用一维链表来实现，二叉堆却可以用顺序表来实现。** 这是因为，根据完全二叉树的特点，假如一个节点的下标为n,则可以求得它左孩子的下标为：2n+1；右孩子下标为：2n+2


下面看看二叉堆的三个基本操作（以最小堆为例）：
1. 插入一个节点。
2. 删除一个节点。
3. 构建一个二叉堆。

插入一个节点的算法流程如下：
1. 把新节点放到二叉堆的末尾
2. 调整二叉堆，使其满足二叉堆的性质。调整策略：让新插入的节点与它的父节点进行比较，如果新节点小于父节点，则让新节点 **上浮**（上浮换句话说，是和父节点交换位置），不断上浮，直到新节点不小于父节点。

删除一个节点的算法流程如下：
1. 把跟节点删掉，把二叉堆末尾拿出来，放到跟节点位置
2. 调整二叉堆，使其满足二叉堆的性质。调整策略是，跟节点与孩子节点比较，不断 **下沉**

构建一个二叉堆的算法流程如下：
1. 首先是面临一个无序的完全二叉树
2. 从最下方开始，遍历每一个节点，使其 **下沉**。（当然，叶节点不能下沉，也就无需遍历了）



TODO，这里需要添加一个Python实现，另外，还有一个Python库已经有了，如下：


heapq是一种特殊的二叉树，这种二叉树中，任何父节点都不大于子节点。  
也就是说，heap[k] <= heap[2*k+1] and heap[k] <= heap[2*k+2] for all k  


### heapq  
heapq 模块提供堆算法，[官方文档](https://docs.python.org/3.5/library/heapq.html?highlight=heapq)

```py
import heapq
heap=[] # 创建一个空的 heap
heapq.heapify(<list>) # 把list转化为 heapq，时间复杂度为O(n)

heapq.heappush(heap, item) # 插入一个新值
heapq.heappop(heap) # 返回并删除最小的值（也就是树最顶端的值）

heapq.heappushpop(heap, item)
# 相当于做这个(但速度更快)：
# heapq.heappush(heap,item);heapq.pop()
heapq.heapreplace(heap, item)
# 相当于做这个(但速度更快)：
# heapq.pop();heapq.heappush(heap,item)
```



### 应用
```py
[heapq.pop(heap) for i in range(len(heap))] # 等价于 sorted

heap=[]
for i in [4,3,2,5,6]:
    heapq.heappush(heap,[1,i]) # 注意到list和str也可以比大小，所以 item 可以是 list, str
```


### show_tree
（这个函数来自网络）  
这个是自编函数，功能是打印heap  
可以输入list，也可以输入heap  
```py
import math
from io import StringIO


def show_tree(tree, total_width=36, fill=' '):
    output = StringIO()
    last_row = -1
    for i, n in enumerate(tree):
        if i:
            row = int(math.floor(math.log(i + 1, 2)))
        else:
            row = 0
        if row != last_row:
            output.write('\n')
        columns = 2 ** row
        col_width = int(math.floor((total_width * 1.0) / columns))
        output.write(str(n).center(col_width, fill))
        last_row = row
    print(output.getvalue())
    print('-' * total_width)
    print
    return
```

#### 应用示例1:show_tree
（输入可以是list，也可以是heap）  
```py
data = range(1, 8)
print('data: ', data)
show_tree(data)
```

output
```
data:  range(1, 8)

                 1                  
        2                 3         
    4        5        6        7    
------------------------------------
```

#### 应用示例2：heapify

heapify可以在线性时间内进行排序  
需要注意，直接改输入的list，而不是return一个list  

```py
import random
import heapq
heap = random.sample(range(1, 8), 7)
heapq.heapify(heap)
show_tree(heap)
```

output  
```

                 7                  
        3                 5         
    1        2        4        6    
------------------------------------

                 1                  
        2                 4         
    3        7        5        6    
------------------------------------
```

#### 应用示例3：heappush

下面展示多次heappush的过程：  

```py
import math
from io import StringIO


def show_tree(tree, total_width=36, fill=' '):
    output = StringIO()
    last_row = -1
    for i, n in enumerate(tree):
        if i:
            row = int(math.floor(math.log(i + 1, 2)))
        else:
            row = 0
        if row != last_row:
            output.write('\n')
        columns = 2 ** row
        col_width = int(math.floor((total_width * 1.0) / columns))
        output.write(str(n).center(col_width, fill))
        last_row = row
    print(output.getvalue())
    print('-' * total_width)
    print
    return

import heapq
import random

heap = []
data = random.sample(range(1, 8), 7)
print('data:', data)
for i in data:
    heapq.heappush(heap, i)
    show_tree(heap)
```

output：  

```
data: [1, 4, 7, 6, 2, 5, 3]

                 1                  
------------------------------------

                 1                  
        4         
------------------------------------

                 1                  
        4                 7         
------------------------------------

                 1                  
        4                 7         
    6    
------------------------------------

                 1                  
        2                 7         
    6        4    
------------------------------------

                 1                  
        2                 5         
    6        4        7    
------------------------------------

                 1                  
        2                 3         
    6        4        7        5    
------------------------------------
```

#### 应用示例4：heappop

```py
import math
from io import StringIO


def show_tree(tree, total_width=36, fill=' '):
    output = StringIO()
    last_row = -1
    for i, n in enumerate(tree):
        if i:
            row = int(math.floor(math.log(i + 1, 2)))
        else:
            row = 0
        if row != last_row:
            output.write('\n')
        columns = 2 ** row
        col_width = int(math.floor((total_width * 1.0) / columns))
        output.write(str(n).center(col_width, fill))
        last_row = row
    print(output.getvalue())
    print('-' * total_width)
    print
    return

import heapq
import random

data = random.sample(range(1, 8), 7)
print ('data: ', data)
heapq.heapify(data)
show_tree(data)

heap = []
while data:
    i = heapq.heappop(data)
    print('pop %3d:' % i)
    show_tree(data)
    heap.append(i)
print('heap: ', heap)
```




## 应用

### queue 案例1
queue的一种典型应用场景是Breadth-first Search (BFS)

### queue 案例2
题目灵感来自[LeetCode题目](https://leetcode.com/problems/baseball-game/discuss/119575/Python-4-liner),我给出的解答见于[这里](https://github.com/guofei9987/leetcode_python/blob/master/%5B682%5D%5BBaseball%20Game%5D%5BEasy%5D.py)  

例子：
```python
input_queue=[1,2,3,4,5]    
stack=[2,1]
pointer=0
for i in input_queue:
    stack.append(i)
    # 后两行是先出的功能：
    stack_out=stack[pointer]
    pointer+=1

# 事实上，因为可以使用stack[-1],stack[-2]这些命令，所以 pointer 这个变量往往不必定义
# 会有内存浪费，定期清理即可，参考代码： stack=stack[pointer:]
```






### 案例1
深度优先搜索 Depth-First Search (DFS)
## 案例
[200. Number of Islands](https://leetcode.com/problems/number-of-islands/description/)  
