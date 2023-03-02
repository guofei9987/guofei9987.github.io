https://leetcode.com/problems/perfect-squares/discuss/71512/Static-DP-C++-12-ms-Python-172-ms-Ruby-384-ms  
DP方法，难以理解

clone graph， 使用stack完成  
https://leetcode.com/problems/clone-graph/discuss/152225/Simple-Python-DFS


Python DP
https://leetcode.com/problems/target-sum/discuss/97343/Python-DP


bucket是什么鬼
https://leetcode.com/problems/contains-duplicate-iii/discuss/61731/O(n)-Python-using-buckets-with-explanation-10-lines.










## 看懂了的1

https://leetcode.com/submissions/detail/166648239/

又一次用加减法的奇技淫巧
```py
class Solution:
    def singleNumber(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        setOfNum = set(nums)
        expectedSum = sum(setOfNum)*3
        difference = expectedSum - sum(nums)
        return difference//2
```


https://leetcode.com/problems/isomorphic-strings/discuss/57941/Python-different-solutions-(dictionary-etc).

### 1
https://leetcode.com/problems/longest-palindrome/discuss/89587/What-are-the-odds-(Python-and-C++)
也可以算是奇技淫巧了
## 2

https://leetcode.com/explore/learn/card/hash-table/185/hash_table_design_the_key/1127

一个使用把node转化为 str ，进而可以 hash 的思路
```py
class Solution(object):
    def findDuplicateSubtrees(self, root):
        """
        :type root: TreeNode
        :rtype: List[TreeNode]
        """
        def trv(root):
            if not root: return "null"
            struct = "%s,%s,%s" % (str(root.val), trv(root.left), trv(root.right))
            nodes[struct].append(root)
            return struct

        nodes = collections.defaultdict(list)
        trv(root)
        return [nodes[struct][0] for struct in nodes if len(nodes[struct]) > 1]
```

## 3
https://leetcode.com/problems/4sum-ii/description/

O(n^4)问题，用O(n^2)来解决
```py
def fourSumCount(self, A, B, C, D):
    AB = collections.Counter(a+b for a in A for b in B)
    return sum(AB[-c-d] for c in C for d in D)
```
### 3-2
O(n^3)问题
https://leetcode.com/problems/number-of-boomerangs/description/

### 4
https://leetcode.com/problems/rotate-string/description/
解法可以算是天才了
```py
def rotateString(self, A, B):        
    return len(A) == len(B) and B in A + A
```

## Trie
A Trie is a special form of a Nary tree


## Binary Tree
从前序+中序，构建一棵树，可以背下来了
https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/

也是可以背下来的东西  
找到共同的祖先节点
https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/discuss/65225/4-lines-C%25252B%25252BJavaPythonRuby/163571
```py
def lowestCommonAncestor(self, root, p, q):
    """
    :type root: TreeNode
    :type p: TreeNode
    :type q: TreeNode
    :rtype: TreeNode
    """
    if root in (None, p, q): return root
    left, right = (self.lowestCommonAncestor(kid, p, q)
                   for kid in (root.left, root.right))
    return root if left and right else left or right
```

再理解理解
https://leetcode.com/problems/trim-a-binary-search-tree/description/

levelorder的几种写法（虽然我觉得已经背下来的那个解法最好）
https://leetcode.com/problems/binary-tree-level-order-traversal-ii/discuss/34978/Python-solutions-(dfs-recursively-dfs+stack-bfs+queue).

https://leetcode.com/problems/merge-two-sorted-lists/description/
## IsLand专题
主要看一看一种能少写很多代码的思路
https://leetcode.com/problems/max-area-of-island/description/
```py
class Solution:
    def dfs(self,i,j):
        if (0<=i<self.row) and (0<= j<self.col) and(self.grid[i][j]==1):
            self.grid[i][j]=-1
            return 1+self.dfs(i-1,j)+self.dfs(i+1,j)+self.dfs(i,j-1)+self.dfs(i,j+1)
        return 0
    def maxAreaOfIsland(self, grid):
        """
        :type grid: List[List[int]]
        :rtype: int
        """
        self.grid=grid
        self.row,self.col=len(grid),len(grid[0])
        area=[self.dfs(i,j) for i in range(self.row) for j in range(self.col)]
        return max(area) if area else 0
```

## 奇技淫巧
https://leetcode.com/problems/poor-pigs/description/

https://leetcode.com/problems/rectangle-overlap/description/



https://leetcode.com/problems/longest-common-prefix/discuss/6918/Short-Python-Solution
https://leetcode.com/problems/longest-common-prefix/discuss/6911/Simple-Python-solution
