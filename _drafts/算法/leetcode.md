

---------------------------

```
class Solution(object):
    def isMatch(self, text, pattern):
        memo = {}
        def dp(i, j):
            print(memo)
            if (i, j) not in memo:
                if j == len(pattern):
                    ans = i == len(text)
                else:
                    first_match = i < len(text) and pattern[j] in {text[i], '.'}
                    if j+1 < len(pattern) and pattern[j+1] == '*':
                        ans = dp(i, j+2) or first_match and dp(i+1, j)
                    else:
                        ans = first_match and dp(i+1, j+1)

                memo[i, j] = ans
            return memo[i, j]

        return dp(0, 0)

```

----------------------------

## 趣题
### 浇水
https://leetcode.com/problems/container-with-most-water/

Brute Force 可以做，但考虑一些循环不需要做。。。

### 下雨

https://leetcode.com/problems/trapping-rain-water/submissions/

难度升级款，想出来后就很容易
```
class Solution:
    def trap(self, height: list) -> int:
        if not height:
            return 0
        max_height=max(height)
        len_height=len(height)
        cum_max_left=[0]*len_height
        cum_max_right=[0]*len_height
        max_left,max_right=0,0
        for i in range(len_height):
            max_left=max(max_left,height[i])
            cum_max_left[i]=max_left
            j=len_height-i-1
            max_right=max(max_right,height[j])
            cum_max_right[j]=max_right
        total_area=0
        for i in range(len_height):
            total_area+=(min(cum_max_left[i],cum_max_right[i])-height[i])
        return total_area
```


衍生两道题

https://leetcode.com/problems/product-of-array-except-self/

这个题，第一思路就是乘起来，然后除以各自的项。缺点是题目不让用除法，况且对0的处理略繁琐  
也可以参照上面下雨那题的思路  
```
class Solution:
    def productExceptSelf(self, nums):
        prod_left_list=nums.copy()
        prod_right_list=nums.copy()
        prod_left,prod_right=1,1
        len_nums=len(nums)
        for idx in range(len_nums):
            prod_left_list[idx]=prod_left
            prod_left*=nums[idx]
            j=len_nums-idx-1
            prod_right_list[j]=prod_right
            prod_right*=nums[j]
        return [prod_left_list[i]*prod_right_list[i] for i in range(len_nums)]
```
时间和空间消耗和除法解法相似。再改进就是，其实不需要right这个list。不过这样可读性差点儿。

衍生题目：https://leetcode.com/problems/maximum-product-subarray/
有点难想到，太漂亮了
```python
class Solution:
    def maxProduct(self, nums) -> int:
        imax=imin=r=nums[0]
        for i in nums[1:]:
            if i<0:
                imax,imin=imin,imax
            imax=max(i,imax*i)
            imin=min(i,imin*i)
            r=max(r,imax)
        return r
```

还有个漂亮的解
https://leetcode.com/problems/maximum-product-subarray/discuss/183483/In-Python-it-can-be-more-concise-PythonC%2B%2BJava
```Python
def maxProduct(self, A):
    B = A[::-1]
    for i in range(1, len(A)):
        A[i] *= A[i - 1] or 1
        B[i] *= B[i - 1] or 1
    return max(A + B)
```




这个题有3个衍生题目
https://leetcode.com/problems/maximum-subarray/
这是个经典题目，找到一个漂亮的答案 https://leetcode.com/problems/maximum-subarray/discuss/20396/Easy-Python-Way
```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        for i in range(1, len(nums)):
            if nums[i-1] > 0:
                nums[i] += nums[i-1]
        return max(nums)
```

衍生题目
https://leetcode.com/problems/longest-turbulent-subarray/


https://leetcode.com/problems/subarray-product-less-than-k/


https://leetcode.com/problems/trapping-rain-water-ii/

##递归
https://leetcode.com/problems/house-robber/

我写的递归，超时，但这个就好用，有空要研究一下递归和这种写法的转化关系，以及为啥递归会超时
```
class Solution:
    def rob(self, nums):
        last, now = 0, 0
        for i in nums: last, now = now, max(last + i, now)
        return now
```





---------------------------

```
class Solution(object):
    def isMatch(self, text, pattern):
        memo = {}
        def dp(i, j):
            print(memo)
            if (i, j) not in memo:
                if j == len(pattern):
                    ans = i == len(text)
                else:
                    first_match = i < len(text) and pattern[j] in {text[i], '.'}
                    if j+1 < len(pattern) and pattern[j+1] == '*':
                        ans = dp(i, j+2) or first_match and dp(i+1, j)
                    else:
                        ans = first_match and dp(i+1, j+1)

                memo[i, j] = ans
            return memo[i, j]

        return dp(0, 0)

```
