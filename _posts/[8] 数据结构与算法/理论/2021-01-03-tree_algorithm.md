---
layout: post
title: 【数据结构5】Tree实现
categories:
tags: 8-数据结构与算法
keywords:
description:
order: 505
---
## 定义二叉树

这里除了定义二叉树外，还实现了以下功能：
- 顺序表到二叉树的相互变化
- 二叉树上的 DFS
  - 前序遍历
  - 中序遍历
  - 后序遍历
- 查找路径
- 可视化




```py
# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

    def __repr__(self):
        return 'Node val = {}'.format(str(self.val))


class Transform:
    # 稀疏型顺序存储：二叉树的空节点也占一个位置，空节点的两个孩子（虽然实际不存在）也占一个位置
    # 所以顺序表的第i个元素，其孩子节点序号必是 2 * i + 1, 2 * i + 2
    # 紧凑型顺序存储：空节点占一个位置，但空节点的孩子不再占位置
    def list2tree1_1(self, list_num, i=0):
        # 顺序结构转稀疏型顺序存储，递归法
        if i >= len(list_num):
            return None
        treenode = TreeNode(list_num[i])
        treenode.left = self.list2tree1_1(list_num, 2 * i + 1)
        treenode.right = self.list2tree1_1(list_num, 2 * i + 2)
        return treenode

    def list2tree1_2(self):
        # 顺序结构转稀疏型顺序存储，迭代法
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
        # 顺序结构转紧凑顺序存储，迭代法
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


class Travel:
    # 注意，三个 DFS 算法中，空节点处理为[],而不是[None]
    # 有些场景还是需要空节点返回[None]的，灵活去改动
    def InOrder(self, root):  # LDR
        return [] if (root is None) else self.InOrder(root.left) + [root.val] + self.InOrder(root.right)

    def PreOrder(self, root):  # DLR
        return [] if (root is None) else [root.val] + self.PreOrder(root.left) + self.PreOrder(root.right)

    def PostOrder(self, root):  # LRD
        return [] if (root is None) else self.PostOrder(root.left) + self.PostOrder(root.right) + [root.val]

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


# %%
transform = Transform()
travel = Travel()
draw = Draw()

# %%
nums = [2, 1, 3, 0, 7, 9, 1, 2, None, 1, 0, None, None, 8, 8, None, None, None, None, 7]
root = transform.list2tree2_2(nums)

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

额外的，深度优先搜索（遍历版，使用 stack ）：
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
（TODO: 但是LDR还没想好，LRD之后实现一下）

### 基础算法2

```py

class OtherAlgorithm:
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
