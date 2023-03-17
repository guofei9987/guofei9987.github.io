---
layout: post
title: 【LeetCode】构造数据结构类的题目
categories: 刷题
tags:
description:
order: 595
---


[https://leetcode.cn/problem-list/vFlcuMxc](https://leetcode.cn/problem-list/vFlcuMxc)


## 线性表相关





### 实现stack

https://leetcode.cn/problems/implement-stack-using-queues/submissions/

题目要求用 queue 实现 stack，但你可以测试普通的stack

```c
// 没有动态扩张容量，用 array 做的 stack
typedef struct {
    int *p_arr;
    int idx;
} MyStack;


MyStack *myStackCreate() {
    MyStack *obj = malloc(sizeof(MyStack));
    obj->p_arr = malloc(sizeof(int) * 100);
    obj->idx = 0; // 始终指向栈顶再往上一格的的空位置
    return obj;
}

void myStackPush(MyStack *obj, int x) {
    obj->p_arr[obj->idx++]=x;
}

int myStackPop(MyStack *obj) {
    return obj->p_arr[--obj->idx];
}

int myStackTop(MyStack *obj) {
    return obj->p_arr[obj->idx-1];
}

bool myStackEmpty(MyStack *obj) {
    return obj->idx==0;
}

void myStackFree(MyStack *obj) {
    free(obj->p_arr);
    free(obj);
}
```

方案2:用Recurrent Array 做 stack
https://github.com/guofei9987/c-algorithm


方案3:两个queue 做stack。
- 方法和 双 stack 做queue 一样
- 不去实现了，意义不大




### 实现 queue

https://leetcode.cn/problems/implement-queue-using-stacks/
```c
typedef struct {
    int *a;
    int *b;
    int size_a;
    int size_b;
} MyQueue;


MyQueue *myQueueCreate() {
    MyQueue *obj = malloc(sizeof(MyQueue));
    obj->a = malloc(100 * sizeof(int));
    obj->b = malloc(100 * sizeof(int));
    obj->size_a = 0;
    obj->size_b = 0;
    return obj;
}

void myQueuePush(MyQueue *obj, int x) {
    obj->a[obj->size_a] = x;
    obj->size_a += 1;
}

void repack(MyQueue *obj) {

    for (int i = obj->size_a - 1; i >= 0; i--) {
        obj->b[obj->size_a - i - 1] = obj->a[i];
    }
    obj->size_b = obj->size_a;
    obj->size_a = 0;

}


int myQueuePop(MyQueue *obj) {
    if (obj->size_b == 0) {
        repack(obj);
    }
    obj->size_b -= 1;
    return obj->b[obj->size_b];
}

int myQueuePeek(MyQueue *obj) {
    if (obj->size_b == 0) {
        repack(obj);
    }
    return obj->b[obj->size_b - 1];


}

bool myQueueEmpty(MyQueue *obj) {
    return obj->size_a == 0 && obj->size_b == 0;
}

void myQueueFree(MyQueue *obj) {
    free(obj->a);
    free(obj->b);
    free(obj);
}
```



方法2: Recurrent Array


https://github.com/guofei9987/c-algorithm









方法3:用 stack 来构建 Queue

```
typedef struct {
    int *a;
    int *b;
    int size_a;
    int size_b;
} MyQueue;


MyQueue *myQueueCreate() {
    MyQueue *obj = malloc(sizeof(MyQueue));
    obj->a = malloc(100 * sizeof(int));
    obj->b = malloc(100 * sizeof(int));
    obj->size_a = 0;
    obj->size_b = 0;
    return obj;
}

void myQueuePush(MyQueue *obj, int x) {
    obj->a[obj->size_a] = x;
    obj->size_a += 1;
}

void repack(MyQueue *obj) {

    for (int i = obj->size_a - 1; i >= 0; i--) {
        obj->b[obj->size_a - i - 1] = obj->a[i];
    }
    obj->size_b = obj->size_a;
    obj->size_a = 0;

}


int myQueuePop(MyQueue *obj) {
    if (obj->size_b == 0) {
        repack(obj);
    }
    obj->size_b -= 1;
    return obj->b[obj->size_b];
}

int myQueuePeek(MyQueue *obj) {
    if (obj->size_b == 0) {
        repack(obj);
    }
    return obj->b[obj->size_b - 1];


}

bool myQueueEmpty(MyQueue *obj) {
    return obj->size_a == 0 && obj->size_b == 0;
}

void myQueueFree(MyQueue *obj) {
    free(obj->a);
    free(obj->b);
    free(obj);
}
```

## LinkedList
https://leetcode.cn/problems/design-linked-list/




## 前缀树（待做）

https://leetcode.cn/problems/implement-trie-prefix-tree/