---
layout: post
title: 【数据结构5】Binary Search
categories:
tags: 0x80_数据结构与算法
keywords:
description:
order: 551
---

## 我总结的一般写法
```py
class Solution:
    def search(self, nums, target):
        # step1:定义初始搜索范围
        left,right=0,len(nums)-1
        if left==right:return None # step1.1 增加鲁棒性，也就是一开始即达到结束条件。需不需要视 step4是否容易写而定
        # step2：定义结束时的搜索范围，一般为left==right，但某些问题未必
        while left<right:
            mid=(left+right)//2
            if nums[mid]<target: # step2.5：必须把所有的if考虑到，否则有可能死循环
                left=mid+1
            elif nums[mid]>target:
                right=mid-1
            elif nums[mid]==target: # step3：搜索时遇到解，便直接返回。如果是复杂形式，注意index out of range
                return mid
        # step4:搜索结束后的小区域的情况判断。这里小区域范围为1，且必为解，因此无需多做处理。
        # 一般情况下，应当处理这个小区域
        mid=left # 为了可读性（代码表示的统一性）。注意决不能直接使用之前的mid，因为那个赋值是否运行是不一定的
        # if nums[left]==target: # 一般情况下，与while循环中的return出口条件一致
        #     return mid
        # else:return -1
        return -1
```

## LeetCode上的写法
### 第一种
```py
def binarySearch(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: int
    """
    if len(nums) == 0:
        return -1

    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    # End Condition: left > right
    return -1
```

- Initial Condition: `left = 0, right = length-1`
- Termination: `left > right`
- Searching Left: `right = mid-1`
- Searching Right: `left = mid+1`


### 第二种
- Initial Condition: `left = 0, right = length`
- Termination: `left == right`
- Searching Left: `right = mid`
- Searching Right: `left = mid+1`



### 第三种

- Initial Condition: `left = 0, right = length-1`
- Termination: `left + 1 == right`
- Searching Left: `right = mid`
- Searching Right: `left = mid`
