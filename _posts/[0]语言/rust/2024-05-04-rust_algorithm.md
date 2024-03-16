---
layout: post
title: 【Rust8】算法
categories: 语言
tags:
keywords:
description:
order: 11207
---



## LinkedLists

```Rust
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode {
            next: None,
            val,
        }
    }
}


#[derive(Clone, Debug)]
pub struct LinkedList {
    pub head: Option<Box<ListNode>>,
}


impl LinkedList {
    pub fn new() -> Self {
        LinkedList { head: None }
    }

    // curr: &mut ListNode
    pub fn from_list(nums: &[i32]) -> Self {
        let mut dummy = Box::new(ListNode::new(0));
        let mut curr = dummy.as_mut();
        for &num in nums {
            curr.next = Some(Box::new(ListNode::new(num)));
            curr = curr.next.as_mut().unwrap();
        }

        LinkedList { head: Some(dummy) }
    }

    pub fn to_list(&self) -> Vec<i32> {
        let mut res = vec![];
        let mut curr = self.head.as_ref().unwrap().as_ref();
        while let Some(next_curr) = curr.next.as_ref() {
            res.push(next_curr.val);
            curr = next_curr;
        }
        res
    }

    pub fn insert(&mut self, idx: usize, val: i32) {
        let mut new_node = Box::new(ListNode::new(val));
        let mut curr = self.head.as_mut().unwrap().as_mut();
        for _ in 0..idx {
            curr = curr.next.as_mut().unwrap();
        }
        new_node.next = curr.next.take();

        curr.next = Some(new_node);
    }

    pub fn get(&self, idx: usize) -> i32 {
        let mut curr = self.head.as_ref().unwrap().as_ref();
        for _ in 0..idx {
            curr = curr.next.as_ref().unwrap();
        }
        curr.val
    }

    pub fn add_at_head(&mut self, val: i32) {
        let mut new_node = Box::new(ListNode::new(val));
        let mut curr = self.head.as_mut().unwrap().as_mut();
        new_node.next = curr.next.take();
        curr.next = Some(new_node)
    }

    pub fn append(&mut self, val: i32) {
        let mut curr = self.head.as_mut().unwrap().as_mut();
        // while let Some(next_curr) = curr.next.as_mut() {
        //     curr = next_curr;
        // }
        // curr.next = Some(Box::new(ListNode::new(val)));

        loop {
            if curr.next.is_some() {
                curr = curr.next.as_mut().unwrap();
            } else {
                curr.next = Some(Box::new(ListNode::new(val)));
                return;
            }
        }
    }
}


fn main() {
    let mut lst1 = LinkedList::from_list(&vec![1, 2, 3, 4, 5]);
    println!("{:?}", lst1.to_list());

    lst1.insert(2, 9);
    println!("{:?}", lst1.to_list());

    lst1.insert(0, 90);
    println!("{:?}", lst1.to_list());

    for idx in 0..5 {
        println!("{idx},{:?}", lst1.get(idx));
    }

    lst1.append(88);
    println!("{:?}", lst1.to_list());
}


```


这里是另一种写法，用的是 `curr: &mut Option<Box<ListNode>>`，但似乎没什么优势？

```Rust
impl LinkedList {
    // curr: &mut Option<Box<ListNode>>
    // 优点是可以使用 *curr = Some(new_node); 但似乎代码会变复杂？
    pub fn from_list2(nums: &[i32]) -> Self {
        let mut dummy = Some(Box::new(ListNode::new(0)));
        let mut curr = &mut dummy;
        for &num in nums {
            curr = &mut curr.as_mut().unwrap().next;
            *curr = Some(Box::new(ListNode::new(num)));
        }
        LinkedList { head: dummy }
    }

    pub fn to_list2(&self) -> Vec<i32> {
        let mut res = vec![];
        let mut curr = &self.head;
        curr = &curr.as_ref().unwrap().next;
        while let Some(ref next_node) = curr {
            res.push(next_node.val);
            curr = &next_node.next;
        }
        res
    }

    pub fn insert2(&mut self, idx: usize, val: i32) {
        let mut new_node = Box::new(ListNode::new(val));
        let mut curr = &mut self.head;
        for _ in 0..idx {
            curr = &mut curr.as_mut().unwrap().next;
        }
        new_node.next = curr.as_mut().unwrap().next.take();
        curr.as_mut().unwrap().next = Some(new_node);
        // *curr = Some(new_node);
    }

    pub fn get2(&self, idx: usize) -> i32 {
        let mut curr = &self.head;
        for _ in 0..idx {
            curr = &curr.as_ref().unwrap().next;
        }
        curr.as_ref().unwrap().val
    }


    pub fn add_at_head2(&mut self, val: i32) {
        let mut new_node = Box::new(ListNode::new(val));
        new_node.next = self.head.as_mut().unwrap().next.take();
        self.head = Some(new_node);
    }

    pub fn append2(&mut self, val: i32) {
        let new_node = Box::new(ListNode::new(val));
        let mut current = &mut self.head;
        // current: &mut Option<Box<ListNode>>
        while let Some(ref mut next_node) = current {
            current = &mut next_node.next;
        }
        *current = Some(new_node);
    }
}


#[test]
fn main2() {
    let mut lst1 = LinkedList::from_list2(&vec![1, 2, 3, 4, 5]);
    println!("{:?}", lst1.to_list());

    lst1.insert2(2, 9);
    println!("{:?}", lst1.to_list2());

    lst1.insert2(0, 90);
    println!("{:?}", lst1.to_list2());

    for idx in 0..5 {
        println!("{idx},{:?}", lst1.get(idx));
    }

    lst1.append(88);
    println!("{:?}", lst1.to_list2());
}
```
