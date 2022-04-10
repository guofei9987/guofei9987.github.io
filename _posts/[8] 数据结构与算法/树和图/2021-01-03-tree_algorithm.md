---
layout: post
title: 【数据结构5】Tree实现
categories:
tags: 0x80_数据结构与算法
keywords:
description:
order: 572
---

## 二叉树的数据结构

### 顺序存储结构


用一个 list 存放二叉树的每一个结点  


[heapq](http://www.guofei.site/2017/09/11/heapq.html)就是以这种方式存储二叉树的  




- 稀疏型顺序存储：二叉树的空节点也占一个位置，空节点的两个孩子（虽然实际不存在）也各自占一个位置
  - 所以顺序表的第i个元素，其孩子节点序号必是 2 * i + 1, 2 * i + 2
- 紧凑型顺序存储：空节点占一个位置，但空节点的孩子不再占位置.
  - 优点是节省空间，尤其是有很多空节点的二叉树。


### 链式存储

```py
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
```

left 和 right 都是指针，指向下一个节点  

### 仿真指针


维护下面的这个表：  

|data|leftChild|rightChild|
|--|--|--|
|0|1|2|
|1|3|-1（表示指向空指针）|
|...|...|...|







## 二叉树的实现

### 生成二叉树

```py
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

    def __repr__(self):
        return 'Node val = {}'.format(str(self.val))


class BuildTree:
    # 稀疏型顺序存储：二叉树的空节点也占一个位置，空节点的两个孩子（虽然实际不存在）也各自占一个位置
    # 所以顺序表的第i个元素，其孩子节点序号必是 2 * i + 1, 2 * i + 2
    # 紧凑型顺序存储：空节点占一个位置，但空节点的孩子不再占位置
    def list2tree1_1(self, list_num, i=0):
        # 稀疏型顺序结构建树，递归法
        if i >= len(list_num):
            return None
        treenode = TreeNode(list_num[i])
        treenode.left = self.list2tree1_1(list_num, 2 * i + 1)
        treenode.right = self.list2tree1_1(list_num, 2 * i + 2)
        return treenode

    def list2tree1_2(self, nums):
        # 稀疏型顺序存储建图，迭代法
        if not nums:
            return None
        nodes = [None if val is None else TreeNode(val) for val in nums]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids: node.left = kids.pop()
                if kids: node.right = kids.pop()
            else:
                if kids:
                    kids.pop()
                if kids:
                    kids.pop()
        return root

    def list2tree2_2(self, nums):
        # 紧凑型顺序结构建树，迭代法
        if not nums:
            return None
        nodes = [None if val is None else TreeNode(val) for val in nums]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids: node.left = kids.pop()
                if kids: node.right = kids.pop()
        return root

    def deserialize(self, string):
        # LeetCode官方版本
        # https://leetcode.com/problems/recover-binary-search-tree/discuss/32539/Tree-Deserializer-and-Visualizer-for-Python
        # deserialize('[2,1,3,0,7,9,1,2,null,1,0,null,null,8,8,null,null,null,null,7]')
        # 这里是 deserialize 和 serialize 的案例
        # https://leetcode.com/explore/learn/card/data-structure-tree/133/conclusion/995/discuss
        if string == '{}':
            return None
        nodes = [None if val == 'null' else TreeNode(int(val)) for val in string.strip('[]{}').split(',')]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids: node.left = kids.pop()
                if kids: node.right = kids.pop()
        return root
```


### x序 + x序 = 二叉树



给定一个x序遍历不能唯一决定一个二叉树。  
但x序 + x序可以唯一确定一个二叉树。  

https://leetcode.com/explore/learn/card/data-structure-tree/133/conclusion/942/

```py
class BuildTree:
    def build_tree_from_ldr_lrd(self, inorder, postorder):
        """
        https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
        已知中序+后序结果，确定这棵树，前提是list中没有重复的数字
        :type inorder: List[int]
        :type postorder: List[int]
        :rtype: TreeNode
        """
        if not inorder or not postorder:
            return None
        root = TreeNode(postorder.pop())
        inorder_index = inorder.index(root.val)

        root.right = self.build_tree_from_ldr_lrd(inorder[inorder_index + 1:], postorder)
        root.left = self.build_tree_from_ldr_lrd(inorder[:inorder_index], postorder)

        return root

    def build_tree_from_dlr_ldr(self, preorder, inorder):
        """
        https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
        前序+中序确定一棵树，前提是list中没有重复的数字
        TODO: pop(0)效率很低，看看怎么解决
        :type preorder: List[int]
        :type inorder: List[int]
        :rtype: TreeNode
        """
        if not preorder or not inorder:
            return None
        root = TreeNode(preorder.pop(0))
        inorder_index = inorder.index(root.val)

        root.left = self.build_tree_from_dlr_ldr(preorder, inorder[:inorder_index])
        root.right = self.build_tree_from_dlr_ldr(preorder, inorder[inorder_index + 1:])
        return root

    preIndex, posIndex = 0, 0
    def constructFromPrePost(self, pre, post):
      """
      pre+post 确定一个树
      https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/
      """
        root = TreeNode(pre[self.preIndex])
        self.preIndex += 1
        if (root.val != post[self.posIndex]):
            root.left = self.constructFromPrePost(pre, post)
        if (root.val != post[self.posIndex]):
            root.right = self.constructFromPrePost(pre, post)
        self.posIndex += 1
        return root
```


额外：
- 知道深度，https://leetcode-cn.com/problems/recover-a-tree-from-preorder-traversal/
- 确定知道是BST， https://leetcode-cn.com/problems/construct-binary-search-tree-from-preorder-traversal/


### 打印输出二叉树

```python
class Draw:
    def print_tree(self, root, total_width=36):
        q, ret, level = [root], '', 0
        while any(q):
            nodes = [str(node.val) if node else ' ' for node in q]
            col_width = int(total_width / len(nodes))
            nodes = [node_name.center(col_width, ' ') for node_name in nodes]
            ret += (''.join(nodes) + '\n')
            q = [child for node in q for child in [node.left if node else None, node.right if node else None]]
            level += 1
        return ret

    def print_tree_horizontal(self, root, i=0):
        '''
        打印二叉树，凹入表示法，相当于把树旋转90度看。算法原理根据 RDL
        '''
        tree_str = ''
        if root.right:
            tree_str += self.print_tree_horizontal(root.right, i + 1)
        if root.val:
            tree_str += ('    ' * i + '-' * 3 + str(root.val) + '\n')
        if root.left:
            tree_str += self.print_tree_horizontal(root.left, i + 1)
        return tree_str

    def drawtree(self, root):
        # 用 turtle 画 Tree
        def height(root):
            return 1 + max(height(root.left), height(root.right)) if root else -1

        def jumpto(x, y):
            t.penup()
            t.goto(x, y)
            t.pendown()

        def draw(node, x, y, dx):
            if node:
                t.goto(x, y)
                jumpto(x, y - 20)
                t.write(node.val, align='center', font=('Arial', 12, 'normal'))
                draw(node.left, x - dx, y - 60, dx / 2)
                jumpto(x, y - 20)
                draw(node.right, x + dx, y - 60, dx / 2)

        import turtle
        t = turtle.Turtle()
        t.speed(0)
        turtle.delay(0)
        h = height(root)
        jumpto(0, 30 * h)
        draw(root, 0, 30 * h, 40 * h)
        t.hideturtle()
        turtle.mainloop()
```


使用：
```python
build_tree = BuildTree()
travel = Travel()
draw = Draw()

# %%
nums = [2, 1, 3, 0, 7, 9, 1, 2, None, 1, 0, None, None, 8, 8, None, None, None, None, 7]
root = build_tree.list2tree2_2(nums)

bfs_res1 = travel.level_order(root)
bfs_res2 = travel.level_order2(root)
# draw = Draw()
# draw.drawtree(a)

# %%
draw1 = draw.print_tree(root)
print(draw1)

# %%
draw2 = draw.print_tree_horizontal(root)
print(draw2)

# %%
draw3 = draw.drawtree(root)
```

## 二叉树遍历


规定 D,L,R 分别代表“访问根节点”, “访问根节点的左子树”, “访问根节点的右子树”，这样便有6中遍历方式：  
LDR,DLR,LRD,RDL,DRL,RLD  
因为先遍历左子树和先遍历右子树的算法很相似，所以下面实现这几种遍历方式：  
前序遍历(DLR)，中序遍历(LDR)，后序遍历(LRD)  



以下代码包括
- 二叉树上的 DFS
  - 前序遍历
  - 中序遍历
  - 后序遍历
- 查找路径

```py
class Travel:

  def ldr(self, root):  # InOrder
      res = []

      def _ldr(node):
          if node:
              _ldr(node.left)
              res.append(node.val)
              _ldr(node.right)

      _ldr(root)
      return res

  def dlr(self, root):  # PreOrder
      res = []

      def _dlr(node):
          if node:
              res.append(node.val)
              _dlr(node.left)
              _dlr(node.right)

      _dlr(root)
      return res

  def lrd(self, root):  # PostOrder
      res = []

      def _lrd(node):
          if node:
              _lrd(node.left)
              _lrd(node.right)
              res.append(node.val)

      _lrd(root)
      return res


    # one liner 很多时候效率更高，但可修改性差一点儿
    # 注意，三个 DFS 算法中，空节点处理为[],而不是[None]
    # 有些场景还是需要空节点返回[None]的，灵活去改动
    def ldr(self, root):  # Inorder
        return [] if (root is None) else self.ldr(root.left) + [root.val] + self.ldr(root.right)

    def dlr(self, root):  # PreOrder
        return [] if (root is None) else [root.val] + self.dlr(root.left) + self.dlr(root.right)

    def lrd(self, root):  # PostOrder
        return [] if (root is None) else self.lrd(root.left) + self.lrd(root.right) + [root.val]

    def level_order(self, root):
        # BFS, tree转稀疏型顺序存储。
        q, ret = [root], []
        while any(q):
            ret.extend([node.val if node else None for node in q])
            q = [child for node in q for child in [node.left if node else None, node.right if node else None]]
        return ret

    def level_order2(self, root):
        # BFS, tree转紧凑型顺序存储。
        q, ret = [root], []
        while any(q):
            ret.extend([node.val if node else None for node in q])
            q = [child for node in q if node for child in [node.left, node.right]]
        # 结尾的 None 无意义，清除掉
        while ret[-1] is None:
            ret.pop()
        return ret

    def level_order3(self, root):
        """
        队列实现，待整理，这个返回值是有结构的list，其实 level_order2 也可以轻松改造
        https://leetcode.com/problems/binary-tree-level-order-traversal/description/
        :type root: TreeNode
        :rtype: List[List[int]]
        """
        if root is None:
            return []
        import collections
        level = 0
        deque = collections.deque([(root,0)])
        output=[]
        while deque:
            tmp_root,level = deque.popleft()
            if tmp_root.left: deque.append((tmp_root.left,level+1))
            if tmp_root.right: deque.append((tmp_root.right,level+1))
            if len(output)<=level:
                output.append([tmp_root.val])
            else:
                output[level].append(tmp_root.val)
        return output


    def level_order_nary(self, root):
        # 针对N-ary Tree的方法，非常漂亮，前面几个 level_order 都是参考这个
        # https://leetcode.com/problems/n-ary-tree-level-order-traversal/description/
        q, ret = [root], []
        while any(q):
            ret.append([node.val for node in q])
            q = [child for node in q for child in node.children if child]
        return ret

    def find_track(self, num, root, track_str=''):
        '''
        二叉树搜索
        '''
        track_str = track_str + str(root.val)
        if root.val == num:
            return track_str
        if root.left is not None:
            self.find_track(num, root.left, track_str + ' ->left-> ')
        if root.right is not None:
            self.find_track(num, root.right, track_str + ' ->right-> ')
```



迭代法则各不相同：
- 迭代法（ldr）
```python
def ldr(root: Optional[TreeNode]) -> List[int]:
    stack = []
    ans = []
    node = root
    while stack or node:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        ans.append(node.val)
        node = node.right
    return ans
```
- 迭代法（dlr）
```python
def dlr(root):
    stack, res = [root], list()
    while stack:
        pointer = stack.pop()  # 栈尾取一个
        res.append(pointer.val)  # 做一定的处理，加入结果
        if pointer.right:
            stack.append(pointer.right)  # 压入右子节点
        if pointer.left:
            stack.append(pointer.left)  # 压入左子节点
    return res
```
- （TODO: 迭代法 LRD）


### 二叉树上递归的一般方法

https://leetcode.com/explore/learn/card/data-structure-tree/17/solve-problems-recursively/534/

有 top-down，bottom-up 两种方案，标准化流程分别是：

```python
1. return specific value for null node
2. update the answer if needed                      // answer <-- params
3. left_ans = top_down(root.left, left_params)      // left_params <-- root.val, params
4. right_ans = top_down(root.right, right_params)   // right_params <-- root.val, params
5. return the answer if needed                      // answer <-- left_ans, right_ans
```

以及
```python
1. return specific value for null node
2. left_ans = bottom_up(root.left)      // call function recursively for left child
3. right_ans = bottom_up(root.right)    // call function recursively for right child
4. return answers                       // answer <-- left_ans, right_ans, root.val
```

例如，寻找最大深度 https://leetcode.com/explore/learn/card/data-structure-tree/17/solve-problems-recursively/535/
```python
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        left_ans=self.maxDepth(root.left)
        right_ans=self.maxDepth(root.right)
        return max(left_ans,right_ans)+1
```






## BST 二叉搜索树

性质
- 查、插入、删除都是 O(h) 复杂度。
- inorder 的结果是生序的

定义：
- `Binary Search Tree`(BST) is a special form of a binary tree.  
- The value in each node must be greater than (or equal to) any values in its left subtree
- but less than (or equal to) any values in its right subtree


### BST 的基本操作


```py
class BST
    def sorted2BST(self, nums):
        """
        从一个sorted list生成平衡的BST
        https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/
        :type nums: List[int]
        :rtype: TreeNode
        """
        if not nums:
            return None
        mid = len(nums) // 2
        return TreeNode(val=nums[mid], left=self.sorted2BST(nums[:mid]), right=self.sorted2BST(nums[mid + 1:]))

    def isValidBST(self, root):
        # 判断是否是BST，返回 True/False
        inorder = self.inorder(root)
        return inorder == list(sorted(set(inorder)))

    def searchBST(self, root, val):
        # 搜索 BST，如果val在 BST中，返回对应节点，否则返回None
        if root and val < root.val:
            return self.searchBST(root.left, val)
        elif root and val > root.val:
            return self.searchBST(root.right, val)
        return root

    def insertIntoBST(self, root, val):
        """
        把值 val 插入到BST中
        :type root: TreeNode
        :type val: int
        :rtype: TreeNode
        """
        if root is None:
            return TreeNode(val)
        if root.val < val:
            root.right = self.insertIntoBST(root.right, val)
        elif root.val > val:
            root.left = self.insertIntoBST(root.left, val)
        return root

    def deleteNode(self, root, key):
        """
        删除节点的方式有很多种：左子节点提升，右子节点提升，下面这个思路是把右子树的最左左叶节点作为替换被删节点的值
        :type root: TreeNode
        :type key: int
        :rtype: TreeNode
        """
        if not root:
            return root
        if root.val > key:
            root.left = self.deleteNode(root.left, key)
        elif root.val < key:
            root.right = self.deleteNode(root.right, key)
        else:
            if not root.right:
                return root.left
            if not root.left:
                return root.right
            else:
                tmp, mini = root.right, root.right.val
                while tmp.left:
                    tmp, mini = tmp.left, tmp.left.val
                root.val = mini
                root.right = self.deleteNode(root.right, root.val)
        return root


```


其它做法

```py
# https://leetcode-cn.com/problems/validate-binary-search-tree/
class Solution:
    int_min=-2 ** 32
    int_max=2 ** 32
    def isValidBST(self, root: TreeNode) -> bool:
        res = [True]

        def dfs(node, parent_min, parent_max):
            if res[0] is False:
                return

            if node is None:
                return

            if not parent_min < node.val < parent_max:
                res[0] = False
                return

            dfs(node.left, parent_min, node.val)
            dfs(node.right, node.val, parent_max)

        dfs(root, self.int_min, self.int_max)
        return res[0]

```



### BST 的 iterator 化


设计一个Binary Search Tree Iterator  
并定义next()和hasNext()方法，并且有 O(1) time 和 O(h) memory  
```py
class BSTIterator(object):
    def __init__(self, root):
        """
        :type root: TreeNode
        """
        self.stack=[]
        while root:
            self.stack.append(root)
            root=root.left

    def hasNext(self):
        """
        :rtype: bool
        """
        return len(self.stack)>0

    def next(self):
        """
        :rtype: int
        """
        node=self.stack.pop()
        x=node.right
        while x:
            self.stack.append(x)
            x=x.left
        return node.val

# Your BSTIterator will be called like this:
# i, v = BSTIterator(root), []
# while i.hasNext(): v.append(i.next())
```

### 查BST

（其实就是递归了）
- https://leetcode-cn.com/leetbook/read/introduction-to-data-structure-binary-search-tree/xpsqtv/
- 还没没梳理最佳代码实现

递归法
```python
class Solution:
    def searchBST(self, root: TreeNode, val: int) -> TreeNode:
        if root is None:
            return None

        if root.val==val:
            return root
        elif root.val>val:
            return self.searchBST(root.left,val)
        else:
            return self.searchBST(root.right,val)
```

迭代法
```py
class Solution:
    def searchBST(self, root: TreeNode, val: int) -> TreeNode:
        if root is None:
            return None

        curr=root
        while curr is not None:
            if curr.val==val:
                return curr
            elif curr.val>val:
                curr=curr.left
            else:
                curr=curr.right
```


### 插入BST

- 要求是插入一个节点，同时保持仍然是一个BST
- 方法有很多，甚至插入后的二叉树都可能不一样，这里写一种最简单的经典方法：找叶节点，在叶节点上添加新节点
- https://leetcode-cn.com/leetbook/read/introduction-to-data-structure-binary-search-tree/xp1llt/
- (没梳理最佳)

```python
class Solution:
    def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
        if root is None:
            return TreeNode(val)

        self.insert(root,val)
        return root



    def insert(self,node,val):        
        if node.val<val:
            if node.right is None:
                node.right=TreeNode(val)
            else:
                self.insert(node.right,val)
        if node.val>val:
            if node.left is None:
                node.left=TreeNode(val)
            else:
                self.insert(node.left,val)
```


迭代法
```python
class Solution:
    def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
        new_node=TreeNode(val)
        if root is None:
            return new_node
        curr=root
        while curr is not None:
            # 注意这个思路，用来找上一层
            back_level=curr
            if curr.val>val:
                curr=curr.left
            else:
                curr=curr.right

        if back_level.val>val:
            back_level.left=new_node
        else:
            back_level.right=new_node
        return root
```

删
- 一样的思路
- https://leetcode-cn.com/leetbook/read/introduction-to-data-structure-binary-search-tree/xpyd7r/

```python
class Solution:

    def get_next(self,node):
        while node.left:
            node=node.left
        return node

    def deleteNode(self, root: TreeNode, key: int) -> TreeNode:
        if root is None:
            return root

        if root.val>key:
            root.left=self.deleteNode(root.left,key)
        elif root.val<key:
            root.right=self.deleteNode(root.right,key)
        else:
            if root.left is None:
                return root.right
            elif root.right is None:
                return root.left
            else:
                node=self.get_next(root.right)
                node.left = root.left
                root = root.right
                return root

        return root
```


### 实用方法
https://leetcode.com/problems/trim-a-binary-search-tree/description/
```py
class Solution(object):
    def trimBST(self, root, L, R):
        """
        :type root: TreeNode
        :type L: int
        :type R: int
        :rtype: TreeNode
        """
        if not root:
            return None
        if root.val < L:
            return self.trimBST(root.right, L, R)
        if root.val > R:
            return self.trimBST(root.left, L, R)
        root.left = self.trimBST(root.left, L, R)
        root.right = self.trimBST(root.right, L, R)
        return root
```





## 其它应用举例

### Recursive
"Top-down" Solution
```py
1. return specific value for null node
2. update the answer if needed                      // anwer <-- params
3. left_ans = top_down(root.left, left_params)      // left_params <-- root.val, params
4. right_ans = top_down(root.right, right_params)   // right_params <-- root.val, params
5. return the answer if needed                      // answer <-- left_ans, right_ans
```
"Bottom-up" Solution
```py
1. return specific value for null node
2. left_ans = bottom_up(root.left)          // call function recursively for left child
3. right_ans = bottom_up(root.right)        // call function recursively for right child
4. return answers                           // answer <-- left_ans, right_ans, root.val
```

对于 “max-depth” 问题，具体解法如下：
```py
1. return if root is null
2. if root is a leaf node:
3.      answer = max(answer, depth)         // update the answer if needed
4. maximum_depth(root.left, depth + 1)      // call the function recursively for left child
5. maximum_depth(root.right, depth + 1)     // call the function recursively for right child

1. return 0 if root is null                 // return 0 for null node
2. left_depth = maximum_depth(root.left)
3. right_depth = maximum_depth(root.right)
4. return max(left_depth, right_depth) + 1  // return depth of the subtree rooted at root


class Solution:
    def maxDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        return 0 if root is None else max(self.maxDepth(root.left),self.maxDepth(root.right))+1
```

### BST





### 1
https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/  
https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/  
（两个题对应同一个解法，解题思路就是用队列进行LevelOrder遍历）  

```py
class Solution:
    # @param root, a tree link node
    # @return nothing
    def connect(self, root):
        if not root:return
        import collections
        deque = collections.deque([(root, 0)])
        output = dict()
        while deque:
            tmp_root, level = deque.popleft()
            if tmp_root.left: deque.append((tmp_root.left, level + 1))
            if tmp_root.right: deque.append((tmp_root.right, level + 1))
            if level in output:
                output[level].next = tmp_root
            output[level] = tmp_root
```


### mergeTrees
```py
# merge
# Given two binary trees and imagine that when you put one of them to cover the other,
# some nodes of the two trees are overlapped while the others are not.
# merge them into a new binary tree.
# The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node.
# Otherwise, the NOT null node will be used as the node of new tree.
#
# Example :
# Input:
# 	Tree 1                     Tree 2
#           1                         2
#          / \                       / \
#         3   2                     1   3
#        /                           \   \
#       5                             4   7
# Output:
# Merged tree:
# 	     3
# 	    / \
# 	   4   5
# 	  / \   \
# 	 5   4   7

def mergeTrees(t1, t2):
    """
    :type t1: TreeNode
    :type t2: TreeNode
    :rtype: TreeNode
    """
    if (t1.val is not None) and (t2.val is not None):
        root = TreeNode(t1.val + t2.val)
        root.left = mergeTrees(t1.left, t2.left)
        root.right = mergeTrees(t1.right, t2.right)
        return root
    else:
        return t1 or t2

t1=list2tree(i=1,list_num=[1,2,3,4,None,None,5])
t2=list2tree(i=1,list_num=[2,9,None,None,3,None,None])

a=mergeTrees(t1, t2)
```


## 其它
```py
# 先子节点，后兄弟节点”的表示法
class Tree:
    def __init__(self, kids, next=None):
        self.kids = self.val = kids
        self.next = next
```
