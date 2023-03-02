---
layout: post
title: 【LeetCode】并查集
categories: 刷题
tags:
description:
order: 595
visible: 
---


## 128. Longest Consecutive Sequence

思路，
- num和num-1是同一类
- 并查集
- 这个并查集是映射到range(n)上的，不知道有无改进空间

```py
class UnionFind:
    def __init__(self, n: int):
        self.n = n  # 元素的个数
        self.cnt = n  # 类的个数
        self.parent = list(range(n))
        self.depth = [1] * n  # 树的深度

    def find(self, x: int) -> int:
        if x != self.parent[x]:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            # x,y 原本就是1类
            return False
        if self.depth[root_x] > self.depth[root_y]:
            root_x, root_y = root_y, root_x
        self.parent[root_x] = root_y
        self.depth[root_y] += self.depth[root_x]
        self.cnt -= 1
        return True

    def is_connected(self, x: int, y: int) -> bool:
        return self.find(x) == self.find(y)



class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if not nums:
            return 0

        nums = set(nums)
        nums_dict = dict(zip(nums, range(len(nums))))

        union_find = UnionFind(len(nums))

        for num in nums_dict:
            if num - 1 in nums:
                union_find.union(nums_dict[num - 1], nums_dict[num])

        return max(union_find.depth)
```


### 547. Number of Provinces

```python
class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))

    def find(self, idx: int) -> int:
        if idx != self.parent[idx]:
            self.parent[idx] = self.find(self.parent[idx])
        return self.parent[idx]

    def union(self, idx1: int, idx2: int):
        self.parent[self.find(idx1)] = self.find(idx2)

    def is_connected(self, idx1: int, idx2: int) -> bool:
        return self.find(idx1) == self.find(idx2)


class Solution:
    def findCircleNum(self, isConnected) -> int:
        union_find = UnionFind(len(isConnected))
        for row in range(len(isConnected)):
            for col in range(len(isConnected[0])):
                if isConnected[row][col]:
                    union_find.union(row, col)

        return sum(i == union_find.parent[i] for i in range(len(isConnected)))
```

## 没用到并查集的

### 130. Surrounded Regions

```
class Solution:
    def solve(self, board) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        h, w = len(board), len(board[0])
        not_surrounded = set()

        def dfs(row, col):
            if row >= h or row < 0 or col >= w or col < 0:
                return

            if (row, col) in not_surrounded:
                return

            if board[row][col] == 'O':
                not_surrounded.add((row, col))
                for diff_i, diff_j in ((-1, 0), (1, 0), (0, 1), (0, -1)):
                    dfs(row + diff_i, col + diff_j)

        for i in range(h):
            dfs(i, 0)
            dfs(i, w - 1)
        for j in range(w):
            dfs(0, j)
            dfs(h - 1, j)

        for row in range(h):
            for col in range(w):
                if board[row][col] == 'O':
                    if (row, col) not in not_surrounded:
                        board[row][col] = 'X'
```


### 200. Number of Islands

```
class Solution:
    def numIslands(self, grid) -> int:

        h, w = len(grid), len(grid[0])

        def flip(row, col):
            if 0 <= row < h and 0 <= col < w and grid[row][col] == '1':
                grid[row][col] = '0'
                for diff_i, diff_j in ((-1, 0), (0, -1), (1, 0), (0, 1)):
                    flip(row + diff_i, col + diff_j)

        res = 0
        for row in range(h):
            for col in range(w):
                if grid[row][col] == '1':
                    res += 1
                    flip(row, col)
        return res

```

### 695. Max Area of Island

dfs

```
class Solution:
    def maxAreaOfIsland(self, grid) -> int:
        h, w = len(grid), len(grid[0])

        def dfs(row, col):
            if not (0 <= row < h and 0 <= col < w):
                return
            if grid[row][col] == 0:
                return

            grid[row][col] = 0
            area[0] += 1

            for diff_i, diff_j in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                dfs(row + diff_i, col + diff_j)

        res = 0
        for i in range(h):
            for j in range(w):
                area = [0]
                dfs(i, j)
                res = max(res, area[0])

        return res
```
