---
layout: post
title: 什么是 P, NP, NP-complete, NP-hard
category: 科研
tags: Math
keywords: 概念，NPhard
description: 
---

###相关概念
NP-hard（non-deterministic polynomial-time hard）

1. P：能在多项式时间内解决
2. NP：不能在多项式时间内解决或不确定能不能在多项式时间内解决，但一旦你找到一个解，只需要多项式时间去验证这个解是正确的
3. NP-hard：如果一个问题是NP-hard，意味着可以将任意NP问题化约到这个问题。如果可以解这个问题，那么可以轻松地解任意NP问题。
4. NPC：NP完全问题，所有NP问题在多项式时间内都能化约（Reducibility）到某一NP问题，这一NP问题就是NPC问题，即解决了此NPC问题，所有NP问题也都解决了。

###资料原文
These refer to how long it takes a program to run.  Problems in class P can be solved with algorithms that run in **polynomial time**.

Say you have an algorithm that finds the smallest integer in an array.  One way to do this is by iterating over all the integers of the array and keeping track of the smallest number you've seen up to that point.  Every time you look at an element, you compare it to the current minimum, and if it's smaller, you update the minimum.

How long does this take?  Let's say there are n elements in the array.  For every element the algorithm has to perform a constant number of operations.  Therefore we can say that the algorithm runs in O(n) time, or that the runtime is a linear function of how many elements are in the array.  So this algorithm runs in **linear time**.

You can also have algorithms that run in **quadratic time** (O(n^2)), **exponential time** (O(2^n)), or even **logarithmic time** (O(log n)).  Binary search (on a balanced tree) runs in logarithmic time because the height of the binary search tree is a logarithmic function of the number of elements in the tree.

If the running time is some polynomial function of the size of the input, for instance if the algorithm runs in linear time or quadratic time or cubic time, then we say the algorithm runs in **polynomial time** and the problem it solves is in class **P**.

###**NP**
Now there are a lot of programs that don't (necessarily) run in polynomial time on a regular computer, but do run in polynomial time on a nondeterministic Turing machine.  These programs solve problems in **NP**, which stands for **nondeterministic polynomial time**.  A nondeterministic Turing machine can do everything a regular computer can and more. This means all problems in P are also in NP.

An equivalent way to define NP is by pointing to the problems that can be verified in polynomial time.  This means there is not necessarily a polynomial-time way to find a solution, but once you have a solution it only takes polynomial time to verify that it is correct.

Some people think P = NP, which means any problem that can be verified in polynomial time can also be solved in polynomial time and vice versa.  If they could prove this, it would revolutionize computer science because people would be able to construct faster algorithms for a lot of important problems.

###**NP-hard**
What does NP-hard mean?  A lot of times you can solve a problem by reducing it to a different problem.  I can reduce Problem B to Problem A if, given a solution to Problem A, I can easily construct a solution to Problem B.  (In this case, "easily" means "in polynomial time.")

If a problem is **NP-hard**, this means I can reduce any problem in NP to that problem.  This means if I can solve that problem, I can easily solve any problem in NP.  If we could solve an NP-hard problem in polynomial time, this would prove P = NP.

###**NP-complete**
A problem is **NP-complete** if the problem is both

- NP-hard, and
- in NP.

###参考资料
【1】[What are P, NP, NP-complete, and NP-hard?](http://www.quora.com/What-are-P-NP-NP-complete-and-NP-hard)



