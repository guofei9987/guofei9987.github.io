---
layout: post
title: Python特性研究.
categories: Geek
tags: 面向对象Python
keywords:
description:
---

### 1
```py
sum([0.1 for i in range(10)])==1
```

out:False

### 2
与set/dict相比，list擅长内存使用和迭代，不擅长成员检测$(\Theta (lg n))$   
list:指定位置修改是$\Theta(1)$   
链表：指定位置修改$\Theta(n)$,因为需要遍历，平均遍历半个数据量  
list：交换操作是$\Theta(1)$（知道两个元素位置的话）
list：插入和删除$\Theta(n)$     
链表：插入和删除$\Theta(1)$



## 7递归引用

```py
p = [1, 2, 3]  
p.append(p)
p in p
```

结果是 True

## 8循环引用

```
a = [1, 2]
b = [3, 4]  
a.append(b)  
b.append(a)  
a in b,b in a
```

结果是(True, True)
