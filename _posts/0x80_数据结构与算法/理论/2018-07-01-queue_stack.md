---
layout: post
title: 【数据结构2】Queue、Stack、heapq
categories:
tags: 0x80_数据结构与算法
keywords:
description:
order: 521
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

### 队列：C

不同的实现
- 链表
- 两个 stack 可以构造一个 queue：https://leetcode.cn/problems/implement-stack-using-queues/
- 循环array可以构造一个 queue：https://github.com/guofei9987/c-algorithm/tree/master/DynamicArray

### 队列

以下是队列的不同实现
- Queue：借用 deque（底层是循环 array），是效率最高的了
- Queue1：用 list 实现队列
- Queue2：用 list 实现队列，并且每次take都清除多余
- Queue3：用链表
- Queue4：用 list 实现队列，并且当多余信息过多时清除多余
- Queue5: 用两个 stack 可以模拟一个 queue，效率仅比 deque 慢一点点


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
class Queue4(object):
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


from collections import deque

# 双 stack 可以实现一个 queue
class Queue5:
    def __init__(self):
        self.stack1 = list()
        self.stack2 = list()

    def push(self, val):
        self.stack1.append(val)

    def take(self):
        if not self.stack2:
            self.stack2 = self.stack1[::-1]
            self.stack1 = list()
        return self.stack2.pop()


# 使用 deque （循环array），最快的方案
class Queue(object):
    def __init__(self):
        self.q = deque()

    def push(self, term):
        self.q.append(term)

    def take(self):
        return self.q.popleft()
```

性能测试：
```py
import datetime

Classes = [Queue1, Queue2, Queue3, Queue4, Queue5, Queue]


def test_time(q_class):
    num = 100
    start_time = datetime.datetime.now()
    for i in range(num):
        queue = q_class()

        for i in range(10000):
            queue.push(i)

        for i in range(10000):
            queue.take()

    print(datetime.datetime.now() - start_time)


for q_class in Classes:
    test_time(q_class)
```

```
0:00:00.327828
0:00:11.765587
0:00:00.814363
0:00:00.459293
0:00:00.262654
0:00:00.238956
```


## Circular Queue
用list来模拟Cirular Queue
```py
num_list[i%len_list]
```

## 优先队列

这样的队列：每个项目对应一个优先度，出列顺序按照优先度来排。
- 常用于计算机进程分配、医院急救队列
- 一般用二叉堆来实现，二叉堆见于另一篇文章。


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
