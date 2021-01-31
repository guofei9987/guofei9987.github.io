---
layout: post
title: 【算法题】马踏棋盘问题.
categories: 趣文
tags: 
keywords:
description:
---
## 问题

国际象棋为8*8的方格棋盘，现在将“马”放到任意方格中，按照马的规则移动，实现：
1. 马遵守国际象棋规则
2. 马走遍所有格子
3. 不重复走格子
4. 马不能跳出棋盘

## 分析

递归

## 代码
```py
def isonboard(pointx, pointy):  # 判断点是否在棋盘上
    if -1 < pointx < 8:
        if -1 < pointy < 8:
            return True
    return False


def move(move_history):
    if len(move_history) >= 64:  # 64
        print(move_history)
        return
    else:
        pointx, pointy = move_history[-1]

        # 8种可能走法
        next_point_list = [[pointx - 1, pointy - 2], [pointx - 2, pointy - 1], [pointx - 2, pointy + 1],
                           [pointx - 1, pointy + 2], [pointx + 1, pointy - 2], [pointx + 2, pointy - 1],
                           [pointx + 2, pointy - 1], [pointx + 1, pointy - 2]]
        for next_point in next_point_list:
            if not next_point in move_history:  # 没走过
                if isonboard(next_point[0], next_point[1]):  # 在棋盘上
                    move(move_history + [next_point])  # 走这一步棋,并进入下一深度搜索


move_history = [[3, 3]]
print(move(move_history))

```

算法效率很低，有更好的实现方法吗？
