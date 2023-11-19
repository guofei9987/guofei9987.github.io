---
layout: post
title: 【数据结构7】【Python】Tree
categories:
tags: 0x80_数据结构与算法
keywords:
description:
order: 572
---

## 二叉树的数据结构

### 结构化存储


维护下面的这个表：  

|data|leftChild|rightChild|
|--|--|--|
|0|1|2|
|1|3|-1（表示指向空指针）|
|...|...|...|




### 链式存储

```py
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
```

left 和 right 都是指针，指向下一个节点



### 顺序存储


用一个 list 存放二叉树的每一个结点  


[heapq](http://www.guofei.site/2017/09/11/heapq.html)就是以这种方式存储二叉树的  




- 稀疏型顺序存储：二叉树的空节点也占一个位置，空节点的两个孩子（虽然实际不存在）也各自占一个位置
  - 所以顺序表的第i个元素，其孩子节点序号必是 2 * i + 1, 2 * i + 2
- 紧凑型顺序存储：空节点占一个位置，但空节点的孩子不再占位置.
  - 优点是节省空间，尤其是有很多空节点的二叉树。


其本质上是BFS（Level order）的结果


## 二叉树的实现


```py
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

    def __repr__(self):
        return 'Node val = {}'.format(str(self.val))
```


### 二叉树序列化

二叉树的 level order 以及 x序遍历不能唯一确定一个树，
- 但是如果允许把空节点反应在在遍历结果中，就可以唯一确定一个树。（已验证 level order，dlr；可以用这个方法判断相等子树）
- 如果同时有两种遍历结果，也可以唯一确定一个树
- 序列化的测试（题目是BST，但可以当成一般二叉树）： https://leetcode-cn.com/problems/serialize-and-deserialize-bst/submissions/


level order 的思路：
- 紧凑型顺序存储：空节点占一个位置，但空节点的孩子不再占位置
    - 优点是节省空间，多数场合使用这种
- 稀疏型顺序存储：空节点占一个位置，空节点的两个孩子（虽然实际不存在）也各自占一个位置
    - 优点是对应关系明确，第i个元素的子节点序号必是 2 * i + 1, 2 * i + 2；某些场景下也很有用


```py
'''
紧凑型顺序存储
参考资料： https://leetcode.com/explore/learn/card/data-structure-tree/133/conclusion/995/discuss
测试： https://leetcode-cn.com/problems/serialize-and-deserialize-bst/submissions/
'''
class Codec:
    def serialize(self, root: TreeNode) -> str:
        queue = [root]
        res = []
        while queue:
            new_queue = []
            for node in queue:
                res.append(node)
                if node is not None:
                    new_queue.append(node.left)
                    new_queue.append(node.right)
            queue = new_queue
        return ','.join([str(node.val) if node else '#' for node in res])

    def deserialize(self, data: str) -> TreeNode:
        nodes = [None if val == '#' else TreeNode(int(val)) for val in data.split(',')]
        queue = nodes[::-1]
        root = queue.pop()
        for node in nodes:
            if node:
                if queue: node.left = queue.pop()
                if queue: node.right = queue.pop()
        return root
```



稀疏型(反序列化的代码可以按照上面的例子新写，但是较大的树会超时)

```python
class BuildTree:
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
```




### 二叉树遍历


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
# DFS用递归实现更可维护，但也可以用 stack 实现
# BFS用队列实现更可维护，但也可以用递归
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


one liner 实现（不推荐，很多时候运行效率更高，但很难修改）
```python
# one liner
# 注意，三个 DFS 算法中，空节点处理为[],而不是[None]
# 有些场景还是需要空节点返回[None]的，灵活去改动
class Travel:
    def ldr(self, root):  # Inorder
        return [] if (root is None) else self.ldr(root.left) + [root.val] + self.ldr(root.right)

    def dlr(self, root):  # PreOrder
        return [] if (root is None) else [root.val] + self.dlr(root.left) + self.dlr(root.right)

    def lrd(self, root):  # PostOrder
        return [] if (root is None) else self.lrd(root.left) + self.lrd(root.right) + [root.val]


    '''
    一个漂亮的序列化实现
    '''
    def dlr2(self,node):
        if node is None:
            return '#'
        return '{},{},{}'.format(node.val,self.dlr2(node.left),self.dlr2(node.right))
```


迭代法实现
- 迭代法（ldr）
```python
# LDR：
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

# DLR：
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

# TODO: 迭代法 LRD
```


#### 二叉树上递归的一般方法

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






## BST 二叉搜索树

[拓展阅读](https://mp.weixin.qq.com/s/dYP5-fM22BgM3viWg4V44A)

二叉查找树，是一种特殊的二叉树，满足：
1. 若它的左子树不为空，则左子树上所有的节点值都小于它的根节点值。
2. 若它的右子树不为空，则右子树上所有的节点值均大于它的根节点值。
3. 它的左右子树也分别可以充当为二叉查找树。



重要性质
- 查、插入、删除都是 O(h) 复杂度。
- 中序遍历（ldr，inorder)是生序的

定义：
- `Binary Search Tree`(BST) 是一种二叉树，并且满足：
1. 若它的左子树不为空，则左子树上所有的节点值都小于它的根节点值。
2. 若它的右子树不为空，则右子树上所有的节点值均大于它的根节点值。
3. 它的左右子树也分别可以充当为二叉查找树。

（英文定义）
- Binary Search Tree(BST) is a special form of a binary tree.
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

## 二叉堆

[扩展阅读](https://mp.weixin.qq.com/s/TKRtF2dAtH7VuNs-FC4awA)



分为 **最大堆** 和 **最小堆**

**定义**
- 是一种满二叉树
- （最小堆）：任何一个父节点的值都小于等于左右孩子节点的值。最大堆相反


**性质**
- 因为一定是满二叉树，因此 **二叉堆往往用顺序表来实现**
- 节点 k 的孩子节点为 2k+1，2k+2

**算法：插入一个节点** O(logn)
1. 把新节点放到二叉堆的末尾
2. 调整位置，变成二叉堆。不断比较它和父节点的大小，更小则与父节点交换位置（**上浮**）

**算法：删除一个节点** O(logn)
1. 删除根节点（之后返回它），并且把末尾放到根节点的位置（以下称为tmp）
2. 不断比较tmp和子节点，并与最小的交换（**下沉**）。

**算法：构建二叉堆**，复杂度看似 O(nlogn)，实际上可以证明是 O(n)
1. 面临一个无序的满二叉树
1. 从最后一个非叶子节点（curr）向前遍历
    - 遍历每一个节点，使其 **下沉** （在 while 循环里面下沉到底）
    - 当然，叶节点不能下沉，也就无需遍历了，所以实际上是从最后一个非叶子节点向前遍历的。



用途
- heap queue algorithm, also known as the priority queue algorithm，优先队列



### Python 实现

实战中直接用 heapq 实现，这里用 Python 实现其原理

算法技巧
- k的孩子节点是 2k+1，2k+2；因此 n 的父节点是 `(n-1)//2`
- 上浮/下沉时，其实不用每次循环都交换值，只需要单向赋值，然后在循环结束后把tmp赋值


```py
def up_adjust(arr):
    tmp = arr[-1]
    child_idx, parent_idx = len(arr) - 1, (len(arr) - 1 - 1) // 2

    while child_idx > 0 and tmp < arr[parent_idx]:
        arr[child_idx] = arr[parent_idx]
        child_idx, parent_idx = parent_idx, (parent_idx - 1) // 2
    arr[child_idx] = tmp


def down_adjust(parent_idx, length, arr):
    tmp = arr[parent_idx]
    child_idx = 2 * parent_idx + 1
    while child_idx < length:
        # 如果有右孩子，并且右孩子更小，则定位到右孩子
        if child_idx + 1 < length and arr[child_idx + 1] < arr[child_idx]:
            child_idx += 1

        # 如果已达到目的，则跳出
        if tmp <= arr[child_idx]:
            break

        arr[parent_idx] = arr[child_idx]
        parent_idx, child_idx = child_idx, 2 * child_idx + 1

    arr[parent_idx] = tmp


def build_heap(arr):
    for i in range((len(arr) - 1 - 1) // 2, -1, -1):
        down_adjust(i, len(arr), arr)


def pop_top(arr):
    if len(arr) == 1:
        return arr.pop()
    tmp = arr[0]
    arr[0] = arr.pop()
    down_adjust(parent_idx=0, length=len(arr), arr=arr)
    return tmp


class PriorityQueue:
    def __init__(self, arr):
        self.arr = arr

    def heapify(self):
        build_heap(self.arr)

    def heappop(self):
        return pop_top(self.arr)

    def heappush(self, val):
        self.arr.append(val)
        up_adjust(self.arr)

    def to_array(self):
        res = []
        while self.arr:
            res.append(self.heappop())
        return res


# %% 测试核心算法
arr = [1, 3, 2, 6, 5, 7, 8, 9, 0]
up_adjust(arr)
print(arr)

arr = [9, 3, 2, 6, 5, 7, 8]
down_adjust(parent_idx=0, length=len(arr), arr=arr)
print(arr)

arr = [7, 1, 3, 10, 5, 2, 8, 9, 6]
build_heap(arr)
print(arr)

# %%测试优先队列
arr = [9, 3, 2, 6, 5, 7, 8]
priority = PriorityQueue(arr)
priority.heapify()

priority.to_array()
```


### heapq  
heapq 模块提供堆算法，[官方文档](https://docs.python.org/3.5/library/heapq.html?highlight=heapq)

```py
import heapq

heap = [6, 5, 3, 1, 2, 0]
heapq.heapify(heap) # 把 heap 变为 heapq 格式的 list，时间复杂度为O(n)，直接修改 heap

heapq.heappush(heap, item) # 插入一个新值，直接修改 heap
heapq.heappop(heap) # 返回并删除最小的值（也就是树最顶端的值）

heapq.heappushpop(heap, item)
# 相当于heappush+heappop(但速度更快)
heapq.heapreplace(heap, item)
# 相当于heappop+相当于heappush(但速度更快)


heapq.nlargest(n=3, iterable=heap)
# 返回一个 list，从大到小排序，长度最多为 n，如果不够就能返回多少返回多少
heapq.nsmallest(n=3, iterable=heap)
# 返回一个 list，从小到大排序，长度最多为 n，如果不够就能返回多少返回多少
```



应用

```py
[heapq.heappop(heap) for i in range(len(heap))] # 等价于 sorted

heap=[]
for i in [4,3,2,5,6]:
    heapq.heappush(heap,[1,i]) # 注意到list和str也可以比大小，所以 item 可以是 list, str
```


### show_tree

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
```


heapify可以在线性时间内进行排序  

```py
import random
import heapq

heap = list(range(1, 8))
random.shuffle(heap)
show_tree(heap)

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


下面展示多次heappush的过程：  

```py
import heapq
import random

heap = []
data = list(range(1, 8))
random.shuffle(data)
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


逐步 heappop

```py
import heapq
import random

data = list(range(1, 8))
random.shuffle(heap)
print('data: ', heap)
heapq.heapify(heap)
show_tree(heap)

res = []
while data:
    i = heapq.heappop(data)
    print('pop %3d:' % i)
    show_tree(data)
    res.append(i)
print('heap: ', res)
```




## Trie


https://leetcode.com/problems/implement-trie-prefix-tree/

我的版本（持续改进）：

```py
class TrieNode:
    def __init__(self):
        self.children = dict()
        self.is_word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_word = True

    def search(self, word: str) -> bool:
        curr, idx = self.root, 0
        while curr.children.values() and idx < len(word):
            if word[idx] in curr.children:
                curr = curr.children[word[idx]]
            else:
                return False
            idx += 1

        if idx < len(word):
            return False
        return curr.is_word  # idx==len(word)

    def startsWith(self, prefix: str) -> bool:
        curr, idx = self.root, 0
        while curr.children.values() and idx < len(prefix):
            if prefix[idx] in curr.children:
                curr = curr.children[prefix[idx]]
            else:
                return False
            idx += 1

        if idx < len(prefix):
            return False
        return True
```




```py
import collections


class TrieNode:
    def __init__(self):
        # 如果字符是有限的，这里可以用 list 来存储，然后使用 char - 'a' 来索引。
        # list 存储因为不需要做 Hash，因此更快，但内存消耗更大。
        # 这里使用 HashMap 来实现的
        self.children = collections.defaultdict(TrieNode)
        self.is_word = False


class Trie:

    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            curr = curr.children[char]
        curr.is_word = True

    def remove(self, word: str) -> bool:
      # 删除前，需要用 match 查询是否存在此 word 
        raise PermissionError("从 trie 删除 keyword，还没有实现")

    def get_keywords(self):
        # 获取 keyword
        res = []

        def dfs(node, word):
            if node.is_word:
                res.append(word)

            for char in node.children:
                dfs(node.children[char], word + char)

        dfs(self.root, '')
        return res

    # 精确全文匹配
    def match(self, word: str) -> bool:
        curr = self.root
        for char in word:
            curr = curr.children.get(char)
            if curr is None:
                return False
        return curr.is_word

    def starts_with(self, prefix: str) -> bool:
        # 判断：prefix 是某个 keyword 的开头
        curr = self.root
        for char in prefix:
            curr = curr.children.get(char)
            if curr is None:
                return False
        return True

    def match_start(self, sentence) -> bool:
        # 判断：sentence 的开头是否是某个 keyword
        curr = self.root
        for char in sentence:
            if char not in curr.children:
                return False
            curr = curr.children.get(char)
            if curr.is_word:
                return True
        return False  # 理论上不会执行


trie = Trie()
trie.insert("apple")

assert trie.match("apple")
assert not trie.match("app")

assert trie.starts_with("app")
assert not trie.match_start("app is good")

trie.insert("app")
assert trie.match("app")

trie.get_keywords()
```




set 嵌套的方式：时间和空间性能更好
```py
class Trie:

    def __init__(self):
        self.root = {}

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            node = node.setdefault(char, {})
        node['-'] = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node:
                return False
            node = node[char]
        return '-' in node

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node:
                return False
            node = node[char]
        return True

    def in_start(self, sentence):
        node = self.root
        for char in sentence:
            if char not in node:
                return False
            node = node[char]
            if '-' in node:
                return True
        return True

```

### 压缩字典树

compressed trie

把相邻具有唯一子节点的节点合并的优化技术，可以减少节点数量，从而降低内存访问和索引计算的开销

举例来说，关键词为:"hell, hello, hellish"  
那么，"hell" 就可以合并，"ish" 也可以合并。节点就从 8 个减少为 3 个




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
