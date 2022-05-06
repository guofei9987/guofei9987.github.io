---
layout: post
title: 【LeetCode】树遍历
categories:
tags: 0x81_刷题
keywords:
description:
order: 595
visible: n
---

## 主要题目


主要题解
1. 用dfs（例如 dlr，ldr，lrd等）、bfs（queue，level order 等）可以解决大部分问题了
2. 寻找重复（定义为结构相同，值也相等），虽然也可以用上面的方法，但是先序列化，再操作，性能（因为可以使用KMP）和可扩展性都更好。
    - 注意这种情况： `12,1` 和 `2,1` 在字符串匹配中会被匹配上，实际上不是
    - 主要题目：572. Subtree of Another Tree（官方题解用DLR加上空节点来唯一表示一个树）；
    - 652. Find Duplicate Subtrees（官方题解用的下面这个）

两种序列化的方案：
```py
# 第一种略慢，但是从公式抄过来的
def get_str(root):
    dlr_list=[]
    def dlr(node):
        # 与一般的 dlr不同，空节点也带进去
        dlr_list.append(str(node.val) if node else '#')
        if node is not None:
            dlr(node.left)
            dlr(node.right)

    dlr(root)
    return ','.join(dlr_list)

# 652题用这个效率更高
def get_str(node):
    if node is None:
        return '#'
    return "{},{},{}".format(node.val, get_str(node.left), get_str(node.right))
```


基础的遍历题目
94. Binary Tree Inorder Traversal
144. Binary Tree Preorder Traversal

难一些的遍历题目
105. Construct Binary Tree from Preorder and Inorder Traversal
106. Construct Binary Tree from Inorder and Postorder Traversal
889. Construct Binary Tree from Preorder and Postorder Traversal


剑指 Offer II 053. 二叉搜索树中的中序后继






## 二叉树相关

### 经典题



#### 331. Verify Preorder Serialization of a Binary Tree

（想不出来，但是很绝的）答案：https://leetcode-cn.com/problems/verify-preorder-serialization-of-a-binary-tree/solution/pai-an-jiao-jue-de-liang-chong-jie-fa-zh-66nt/

```py
class Solution:
    def isValidSerialization(self, preorder: str) -> bool:
        stack=[]
        for node in preorder.split(','):
            stack.append(node)
            while len(stack)>=3 and stack[-1]==stack[-2]=='#' and stack[-3]!='#':
                stack.pop(),stack.pop(),stack.pop()
                stack.append('#')
        return len(stack)==1 and stack[0]=='#'
```



### 337. House Robber III

```py
class Solution:
    def rob(self, root: TreeNode) -> int:

        cache=dict()
        def dfs(node,rob):
            if node is None:
                return 0
            if (node,rob) in cache:
                return cache[(node,rob)]
            if rob:
                # node 节点被抢了，两个子节点不能抢
                res=dfs(node.left,False)+dfs(node.right,False)+node.val
                cache[(node,rob)]=res
                return res
            else:
                # node 节点没被抢，那么子节点可抢可不抢
                res= max(dfs(node.left,False),dfs(node.left,True))+max(dfs(node.right,False),dfs(node.right,True))
                cache[(node,rob)]=res
                return res

        return max(dfs(root,True),dfs(root,False))
```



#### 652. Find Duplicate Subtrees

思路：
1. 把所有 nodes 提取出来放到一起。改进：按照val放到dict中，因为val不同必然不在同一个组
2. 对dict每一组做遍历，找到相同结构
3. 判断相同结构是用递归来做。

上面会超时

思路：序列化


```py
class Solution:
    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:
        cache=dict()
        res=[]
        def dlr(node):
            if node is None:
                return '#'
            node_str='{},{},{}'.format(node.val,dlr(node.left),dlr(node.right))

            if node_str not in cache:
                cache[node_str]=1
            else:
                cache[node_str]+=1

            if cache[node_str]==2:
                res.append(node)
            return node_str

        dlr(root)
        return res
```


### 相关题
### 257. Binary Tree Paths




```
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        res=[]
        def dfs(node,data):
            if node is None:
                return
            if node.left is None and node.right is None:
                res.append('->'.join(data))
                return
            if node.left is not None:
                dfs(node.left,data+[str(node.left.val)])
            if node.right is not None:
                dfs(node.right,data+[str(node.right.val)])

        dfs(root,[str(root.val)])
        return res
```


### 404. Sum of Left Leaves

```
class Solution:
    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:
        res=[0]
        def dfs(node):
            if node is None:
                return

            if node.left is not None and node.left.left is None and node.left.right is None:
                res[0]+=node.left.val

            dfs(node.left)
            dfs(node.right)

        dfs(root)
        return res[0]
```


### 437. Path Sum III

思路：
1. 先遍历，把所有节点列出来。每个节点上做加和算法。
1. 卧槽，节点还有负的，不能把 target<0 过滤掉
2. 卧槽x2，路径到某一点成立，往后延长若干可能也成立


```
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        if not root:
            return 0
        all_nodes=[]
        queue=[root]
        while queue:
            all_nodes.extend(queue)
            new_queue=[]
            for node in queue:
                if node.left is not None:
                    new_queue.append(node.left)
                if node.right is not None:
                    new_queue.append(node.right)
            queue=new_queue

        res=[0]
        def get_path_sum(node,target):
            if node is None:
                return
            if node.val==target:
                res[0]+=1
            get_path_sum(node.left,target-node.val)
            get_path_sum(node.right,target-node.val)

        for node in all_nodes:
            get_path_sum(node,targetSum)

        return res[0]
```


### 501. Find Mode in Binary Search Tree

dlr+暴力遍历

！！！这是一般二叉树的解法，BST是否有更优化的解法呢？

```
import collections
class Solution:
    def findMode(self, root: TreeNode) -> List[int]:
        dlr_res=[]
        def dlr(node):
            if node:
                dlr_res.append(node.val)
                dlr(node.left)
                dlr(node.right)

        dlr(root)

        counter=collections.Counter(dlr_res)
        cnt=counter.most_common(1)[0][1]
        return [i for i,j in counter.items() if j==cnt]
```


### 513. Find Bottom Left Tree Value

```
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        queue=[root]
        while queue:
            last_queue=queue
            new_queue=[]
            for node in queue:
                if node.left:
                    new_queue.append(node.left)
                if node.right:
                    new_queue.append(node.right)
            queue=new_queue
        return last_queue[0].val
```

### 508. Most Frequent Subtree Sum

简单套公式

```
class Solution:
    def findFrequentTreeSum(self, root: TreeNode) -> List[int]:

        cache=dict()
        def dfs(node):
            if node is None:
                return 0
            tmp=dfs(node.left)+dfs(node.right)+node.val
            cache[node]=tmp
            return tmp

        dfs(root)
        counter = collections.Counter(cache.values())
        cnt = counter.most_common(1)[0][1]
        return [i for i, j in counter.items() if j == cnt]
```

### 530. Minimum Absolute Difference in BST
简单的遍历

```python
class Solution:
    def getMinimumDifference(self, root: TreeNode) -> int:
        dlr_res=[]
        def dlr(node):
            if node:
                dlr(node.left)
                dlr_res.append(node.val)
                dlr(node.right)

        dlr(root)
        for idx in range(len(dlr_res)-1):
            dlr_res[idx]=dlr_res[idx+1]-dlr_res[idx]

        return min(dlr_res)
```


### 543. Diameter of Binary Tree

```
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:

        def dfs(node):
            if node is None:
                return [0,0]

            node.val=[max(dfs(node.left))+1,max(dfs(node.right))+1]
            return node.val

        dfs(root)

        res=[0]
        # print(root)
        def dfs2(node):
            if node is None:
                return

            print(node.val)
            res[0]=max(res[0],node.val[0]+node.val[1])
            dfs2(node.left)
            dfs2(node.right)

        dfs2(root)
        return res[0]-2
```


### 543. Diameter of Binary Tree


思路：把左深度和右深度记录下来。然后遍历


```py
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:

        def dfs(node):
            if node is None:
                return [0,0]

            node.val=[max(dfs(node.left))+1,max(dfs(node.right))+1]
            return node.val

        dfs(root)

        res=[0]
        # print(root)
        def dfs2(node):
            if node is None:
                return

            print(node.val)
            res[0]=max(res[0],node.val[0]+node.val[1])
            dfs2(node.left)
            dfs2(node.right)

        dfs2(root)
        return res[0]-2
```

### 572. Subtree of Another Tree


```py
# dfs方法，不推荐
class Solution:
    def isSubtree(self, root: TreeNode, subRoot: TreeNode) -> bool:

        def is_equal(root1,root2):
            cache=[True]
            def is_equal_dfs(node1,node2):
                if cache[0] is False:
                    return
                if (node1 is None)^(node2 is None):
                    cache[0]=False
                    return
                if node1 is None and node2 is None:
                    return
                if node1.val!=node2.val:
                    cache[0]=False
                    return
                is_equal_dfs(node1.left,node2.left)
                is_equal_dfs(node1.right,node2.right)

            is_equal_dfs(root1,root2)
            return cache[0]


        cache=[False]
        def dfs(node):
            if node is None:
                return
            if cache[0]:
                return
            if is_equal(node , subRoot):
                cache[0]=True
                return
            dfs(node.left)
            dfs(node.right)

        dfs(root)
        return cache[0]
```



序列化方法，推荐
```py
class Solution:
    def isSubtree(self, root: TreeNode, subRoot: TreeNode) -> bool:

        def get_str(root):
            dlr_list=[]
            def dlr(node):
                dlr_list.append(str(node.val) if node else '#')
                if node is not None:
                    dlr(node.left)
                    dlr(node.right)

            dlr(root)
            return ','.join(dlr_list)

        sub1=get_str(root)
        sub2=get_str(subRoot)
        # 防止 '12,1' 和 '2,1' 被误匹配到的情况
        idx=sub1.find(sub2)
        return (idx>0 and sub1[idx-1]==',') or idx==0
```

自底向上序列化+kmp
```py
class Solution:
    def isSubtree(self, root: TreeNode, subRoot: TreeNode) -> bool:
        def get_str(node):
            if node is None:
                return '#'
            return "{},{},{}".format(node.val, get_str(node.left), get_str(node.right))

        sub1=get_str(root)
        sub2=get_str(subRoot)
        idx=sub1.find(sub2)
        return (idx>0 and sub1[idx-1]==',') or idx==0
```



### 606. Construct String from Binary Tree


```
class Solution:
    def tree2str(self, root: Optional[TreeNode]) -> str:

        def dfs(node):
            if node is None:
                return ''
            res=str(node.val)

            if node.left is None and node.right is None:
                return res
            if node.left:
                res+='({})'.format(dfs(node.left))
            else:
                res+='()'
            if node.right:
                res+='({})'.format(dfs(node.right))
            return res

        return dfs(root)
```


### 617. Merge Two Binary Trees

```
class Solution:
    def mergeTrees(self, root1: TreeNode, root2: TreeNode) -> TreeNode:
        def dfs(node1,node2):
            if node1 is None and node2 is None:
                return None
            elif node1 is None and node2 is not None:
                return node2
            elif node1 is not None and node2 is None:
                return node1
            else:
                node1.val=node1.val+node2.val
                node1.left=dfs(node1.left,node2.left)
                node1.right=dfs(node1.right,node2.right)
                return node1
        return dfs(root1,root2)
```            



### 653. Two Sum IV - Input is a BST

```
class Solution:
    def findTarget(self, root: Optional[TreeNode], k: int) -> bool:

        dlr_res=[]
        def dlr(node):
            if node:
                dlr_res.append(node.val)
                dlr(node.left)
                dlr(node.right)

        dlr(root)

        cache=set()
        for val in dlr_res:
            if val in cache:
                return True
            else:
                cache.add(k-val)

        return False
```

### 655. Print Binary Tree

机械的按照题目要求做就行了

```
class Solution:
    def printTree(self, root: TreeNode) -> List[List[str]]:
        def get_level(node):
            if node is None:
                return 0
            return max(get_level(node.left),get_level(node.right))+1

        height=get_level(root)

        res=[[""]*((1<<height) -1) for i in range(height)]

        queue={root:(0,(len(res[0])-1)//2)}
        while queue:
            new_queue=dict()
            for node,(r,c) in queue.items():
                res[r][c]=str(node.val)
                if node.left:
                    new_queue[node.left]=(r+1,c-(1<<(height-r-2)))
                if node.right:
                    new_queue[node.right]=(r+1,c+(1<<(height-r-2)))
            queue=new_queue

        return res
```


### 662. Maximum Width of Binary Tree

思路：
1. 第一想到套公式用 level order，但是超时
2. 调试发现，None来自中间那些不可删除的空节点，想到合并这些空节点，用 int 表示其数量


```
class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        res=0
        queue=[root]
        while queue:
            # print([node if isinstance(node,int) else 'n' for node in queue])

            # 剔除无效的头和尾，并且合并中间
            queue_format=[]
            for node in queue:
                if not queue_format:
                    if isinstance(node,int):
                        continue
                    else:
                        queue_format.append(node)
                else:
                    if isinstance(node,int):
                        if isinstance(queue_format[-1],int):
                            queue_format[-1]+=node
                        else:
                            queue_format.append(node)
                    else:
                        queue_format.append(node)

            if queue_format and isinstance(queue[-1],int):
                queue_format.pop()
            queue=queue_format

            res=max(res,sum(i if isinstance(i,int) else 1 for i in queue))

            new_queue=list()
            for node in queue:
                if isinstance(node,int):
                    new_queue.append(node*2)
                else:
                    new_queue.append(1 if node.left is None else node.left)
                    new_queue.append(1 if node.right is None else node.right)
            queue=new_queue

        return res
```


### 669. Trim a Binary Search Tree

这个递归写的我好累。。。


```
class Solution:
    def trimBST(self, root: Optional[TreeNode], low: int, high: int) -> Optional[TreeNode]:
        def dfs(node):
            if node is None:
                return

            node_old=None
            while node is not None:
                if node.val<low:
                    node=node.right
                elif node.val>high:
                    node=node.left

                # 迭代后不再变化，则跳出
                if node_old is not node:
                    node_old=node
                else:
                    break

            if node is None:
                return

            node.left=dfs(node.left)
            node.right=dfs(node.right)
            return node

        return dfs(root)
```


一开始是这么写的，但怎样都写不对，又写一遍对了

```py
class Solution:
    def trimBST(self, root: Optional[TreeNode], low: int, high: int) -> Optional[TreeNode]:
        def dfs(node):
            if node is None:
                return
            if node.val<low:
                return dfs(node.right)
            if node.val>high:
                return dfs(node.left)

            node.left=dfs(node.left)
            node.right=dfs(node.right)
            return node

        return dfs(root)
```


### 671. Second Minimum Node In a Binary Tree

思路：
1. 简单的level order，但是必须剪枝
2. 某一个level，大于 res，其子节点也不可能是结果，剪掉


```
class Solution:
    def findSecondMinimumValue(self, root: TreeNode) -> int:

        queue=[root]
        res_1=root.val
        res_2=(1<<31)
        while queue:
            queue.sort(key=lambda node:node.val)
            for node in queue:
                if node.val>res_1:
                    res_2=min(res_2,node.val)
            queue=[node for node in queue if node.val<=res_2]        
            new_queue=list()
            for node in queue:
                if node.left is not None:
                    new_queue.append(node.left)
                if node.right is not None:
                    new_queue.append(node.right)
            queue=new_queue

        if res_2==(1<<31):
            return -1
        else:
            return res_2
```


### 687. Longest Univalue Path

思路：
1. 一次遍历估计搞不定，例如 '1,1,1,1,1' 这种左子树的结果不能用在父树上
2. 两次遍历，第一次求单链上的最大深度，第二次求结果



```
class Solution:
    def longestUnivaluePath(self, root: TreeNode) -> int:
        if not root:
            return 0
        def dfs(node):
            if node is None:
                return None

            if node.left:
                dfs(node.left)

            if node.right:
                dfs(node.right)

            depth_left=depth_right=1
            if node.left and node.left.val==node.val:
                depth_left+=node.left.depth
            if node.right and node.right.val==node.val:
                depth_right+=node.right.depth
            node.depth=max(depth_left,depth_right)

        dfs(root)

        # print(root.left.depth)
        # print(root.right.depth)

        res=[0]
        def dfs2(node):
            if node is None:
                return

            path_len=1
            if node.left and node.left.val==node.val:
                path_len+=node.left.depth
            if node.right and node.right.val==node.val:
                path_len+=node.right.depth

            res[0]=max(res[0],path_len)

            if node.left:
                dfs2(node.left)
            if node.right:
                dfs2(node.right)

        dfs2(root)
        return res[0]-1
```


### 814. Binary Tree Pruning

```
class Solution:
    def pruneTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:

        def dfs(node):
            if not node:
                return None

            if not dfs(node.left):
                node.left=None
            if not dfs(node.right):
                node.right=None

            if node.left or node.right or node.val==1:
                return True

        dfs(root)

        if root.left is None and root.right is None and root.val==0:
            return None
        return root
```

### 863. All Nodes Distance K in Binary Tree

这个递归写的我好累！

思路：
1. 实现一个函数，找k层子节点。用level order，套公式
2. 用 top_bottom 方法，找到 target node，同时记录它所有父节点序列
3. 在父节点序列上遍历
4. 遍历过程中，记得把遍历过的删掉。防止出现回路（回路不符合要求）


```py
class Solution:
    def distanceK(self, root: TreeNode, target: TreeNode, k: int) -> List[int]:

        def get_k_children(root,k):
            if k<0:
                return []
            if not root:
                return []
            queue=[root]
            for i in range(k):
                new_queue=[]
                for node in queue:
                    if node.left:
                        new_queue.append(node.left)
                    if node.right:
                        new_queue.append(node.right)
                queue=new_queue
            return [i.val for i in queue]


        parents=[]
        def top_bottom(node,nodes):
            if node is None:
                return
            if parents:
                return
            top_bottom(node.left,nodes+[node])
            top_bottom(node.right,nodes+[node])

            if node is target:
                parents.extend(nodes+[node])

        top_bottom(root,[])

        res=[]
        while k>=0 and parents:
            target_node=parents.pop()
            res.extend(get_k_children(target_node,k))
            # 算完之后删掉
            if parents:
                upper_node=parents[-1]
                if upper_node.left is target_node:
                    upper_node.left=None
                if upper_node.right is target_node:
                    upper_node.right=None

            k-=1


        return res

```


## BST 相关

### BST 经典题
#### 230. Kth Smallest Element in a BST

标准的inorder，不多写，还有个骚操作 yield


```
class Solution:
    def kthSmallest(self, root, k):
        def gen(r):
            if r is not None:
                yield from gen(r.left)
                yield r.val
                yield from gen(r.right)

        it = gen(root)
        for _ in range(k):
            res = next(it)
        return res
```


#### 235. Lowest Common Ancestor of a Binary Search Tree

```
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        res=[None]
        def dfs(node):
            if res[0] is not None:
                return
            if node.val>p.val and node.val>q.val:
                dfs(node.left)
                return
            if node.val<p.val and node.val<q.val:
                dfs(node.right)
                return
            res[0]=node

        dfs(root)
        return res[0]
```

#### 236. Lowest Common Ancestor of a Binary Tree


思路: 寻找路径1，路径2，然后一个for循环。

```
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        paths=[None,None]
        def dfs(node,path):
            if node is None:
                return
            if paths[0] is not None and paths[1] is not None:
                return
            if node is p:
                paths[0]=path+[node]
            if node is q:
                paths[1]=path+[node]
            dfs(node.left,path+[node])
            dfs(node.right,path+[node])

        dfs(root,[])
        # print([i.val for i in paths[0]])
        # print([i.val for i in paths[1]])

        idx=0
        while 1:
            if idx>=len(paths[0]) or idx>=len(paths[1]) or paths[0][idx] is not paths[1][idx]:
                return paths[0][idx-1]
            idx+=1
```



### BST 相关题

#### 538. Convert BST to Greater Tree
```
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        ldr_res=[]
        def ldr(node):
            if node:
                ldr(node.left)
                ldr_res.append(node)
                ldr(node.right)

        ldr(root)
        cum_sum=0
        for idx in range(len(ldr_res)-2,-1,-1):
            ldr_res[idx].val=ldr_res[idx].val+ldr_res[idx+1].val
        return root
```
