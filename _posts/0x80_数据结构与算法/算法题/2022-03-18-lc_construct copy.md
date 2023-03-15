---
layout: post
title: 【LeetCode】构造数据结构类的题目
categories: 刷题
tags:
description:
order: 595
---


[https://leetcode.cn/problem-list/vFlcuMxc](https://leetcode.cn/problem-list/vFlcuMxc)



### 232. Implement Queue using Stacks

用 stack 来构建 Queue

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