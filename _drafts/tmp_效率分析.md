
需要补充的基础代码

## 二叉搜索树

BST

构建、插入、使用（搜索）

```
二叉排序树的操作主要有：
1.查找：递归查找是否存在key。
2.插入：原树中不存在key，插入key返回true，否则返回false。
3.构造：循环的插入操作。
4.删除：（1）叶子节点：直接删除，不影响原树。
（2）仅仅有左或右子树的节点：节点删除后，将它的左子树或右子树整个移动到删除节点的位置就可以，子承父业。
（3）既有左又有右子树的节点：找到须要删除的节点p的直接前驱或者直接后继s，用s来替换节点p，然后再删除节点s。
```

### 验证BST

https://leetcode.com/explore/learn/card/introduction-to-data-structure-binary-search-tree/140/introduction-to-a-bst/997/

给定一个二叉树，验证其是否为 BST

核心思路：只需要判断 in order 遍历是否递增

```py
def InOrder(root):  # LDR
    return [] if (root is None) else InOrder(root.left) + [root.val] + InOrder(root.right)


class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        in_order=InOrder(root)
        for i in range(len(in_order)-1):
            if in_order[i]>=in_order[i+1]:
                return False
        return True
```


### inorder-successor-in-bst

https://leetcode.com/problems/inorder-successor-in-bst/

最简单的思路：中序遍历，然后一个一个取出来。

```python
class BSTIterator:

    def __init__(self, root: TreeNode):
        q_=self.ldr(root)
        self.q=q_[::-1]


    def ldr(self,root):
        return [] if (root is None) else self.ldr(root.left)+[root.val]+self.ldr(root.right)

    def next(self) -> int:
        return self.q.pop()


    def hasNext(self) -> bool:
        return len(self.q)>0
```


285，510



```python
class BSTIterator(object):

    def __init__(self, root):
        """
        :type root: TreeNode
        """
        self.stack = []
        self.in_order(root)

    def in_order(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self):
        """
        @return the next smallest number
        :rtype: int
        """
        node = self.stack.pop()
        if node.right:
            self.in_order(node.right)

        return node.val


    def hasNext(self):
        """
        @return whether we have a next smallest number
        :rtype: bool
        """
        return bool(self.stack)
```
