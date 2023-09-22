---
layout: post
title: 【Rust4】trait
categories: 语言
tags:
keywords:
description:
order: 11204
---



## 面向对象

参考 https://rustwiki.org/zh-CN/book/ch10-02-traits.html

```Rust
use std::time::SystemTime;

pub trait MyTrait {
    // 1. 这个相当于抽象方法，继承的时候必须实现出来
    fn my_func1(&self) -> String;
    // 2. 下面这个是具体的方法，继承的时候无需再实现一遍
    fn my_func2(&self) -> String {
        format!("Running my func2 in Mytrait")
    }
}

// 第一个类，继承 MyTrait
pub struct MyClass1 {
    pub data1: String,
    pub data2: String,
}

impl MyTrait for MyClass1 {
    fn my_func1(&self) -> String {
        format!("Running my_func1 in Myclass1")
    }
}

// 第二个类，继承 MyTrait
pub struct MyClass2 {
    pub data3: String,
}

impl MyTrait for MyClass2 {
    fn my_func1(&self) -> String {
        format!("Running my_func1 in {}", self.data3)
    }
}

// 3. 如何用 MyTrait 作为类型。如何返回一个 MyTrait 类型
pub fn usage1(obj1: &impl MyTrait, obj2: &impl MyTrait) -> impl MyTrait {
    println!("input {},{} and  as MyTrait in usage", obj1.my_func1(), obj2.my_func1());
    return MyClass2 { data3: String::from("class3") };
}


// 4. 上面是个语法糖，下面这个是原始写法。注：严格限制每个 T 必须是同一个 Class
pub fn usage2<T: MyTrait, U: MyTrait>(obj1: &T, obj2: &U) {
    println!("input {},{} and  as MyTrait", obj1.my_func1(), obj2.my_func1());
    // return MyClass2 {};
}

// 5. 可以多个 trait，这个表示inp必须实现2个trait才可以
// pub fn usage3<T: MyTrait1 + MyTrait2>(inp: T) {}

// 6. where 语句更好看一些
// pub fn usage3<T, U>(t: T, u: U) -> i32
//     where T: MyTrait1 + MyTrait2,
//           U: MyTrait3
// { 1 }

fn main() {
    let obj1 = MyClass1 {
        data1: String::from("my class1"),
        data2: String::from("data2"),
    };

    // 对应1，重写抽象方法
    println!("{}", obj1.my_func1());
    // 对应2，重写具体方法
    println!("{}", obj1.my_func2());


    // 对应3，MyTrait 类型作为函数的输入/输出
    let obj2 = MyClass2 { data3: String::from("my class2") };
    let obj3 = usage1(&obj1, &obj2);
    println!("obj3: {}", obj3.my_func1());

    // 对应4
    usage2(&obj1, &obj2);
}
```






知识点
- 不能为别的crate添加 trait，例如，不能给 Vec 添加一个方法/添加一个 Display trait

## trait 作为参数

？？？trait 作为参数，trait作为返回值



##  常见 trait

- 实现 `std::io::Write` 的值可以执行写字节操作；
- 实现 `std::iter::Iterator` 的值可以产生值的序列；
- 实现 `std::clone::Clone` 的值可以在内存中克隆自身；
- 实现 `std::fmt::Debug` 的值可以使用 `println!()` 的 `{:?}` 格式说明符打印出来。


例子
- `std::fs::File` 实现了 `Write` 特型，可以将字节写入本地文件。`std::net::TcpStream` 则是将字节写入网络连接。`Vec<u8>` 同样实现了 `Write`。在字节向量上每次调用 `.write()`，都可以在向量末尾追加一些数据。
- `Range<i32>` 实现了 `Iterator` 特型，与切片、散列表等相关的其他爹大气类型也实现了这个特型。
- 除了 `TcpStream` 这种不仅仅表示内存中数据的类型外，大多数标准库类型都实现了 `Clone` 特型。
- 大多数标准库都支持 `Debug` 特型。
- `Clone` 和 `Iterator` 方法，默认一直在作用域中。其它需要导入


## 泛型

```
fn run_query<M: Mapper + Serialize, R: Reducer + Serialize>(data: &DataSet, map: M, reduce: R) -> Results { ... }
```


## 可以给已有的类增加特型

```
trait MyTrait {
    fn is_a_to_t(&self) -> bool;
}

impl MyTrait for char {
    fn is_a_to_t(&self) -> bool {
        if *self >= 'a' && *self <= 't' {
            return true;
        }
        false
    }
}

fn main() {
    let a = 'c';
    println!("{}", a.is_a_to_t());
}
```

## 子 trait

```
// 使用 MyTrait2 的 类，还必须实现 MyTrait 里面的方法
pub trait MyTrait2: MyTrait {
    fn my_fun3(&self) -> String;
}
```

## Iterator

实现 `for i in obj` 的功能

下面这个例子，可以让每个i是一个字符串格式的数字

```Rust
use std::fmt::format;
use std::iter::Iterator;

struct MyClass {
    data: Vec<i32>,
    idx: usize,
}

impl Iterator for MyClass {
    // 下面这两个是必须的
    type Item = String;// 类型声明

    fn next(&mut self) -> Option<Self::Item> {
        if self.idx < self.data.len() {
            self.idx += 1;
            return Some(format!("iter to {}\n", self.data[self.idx - 1]));
        }
        None
    }

//     以及其它一些方法
}


fn main() {
    let a = MyClass { data: vec![1, 2, 3, 4, 5], idx: 0 };
    for x in a {
        print!("{}", x); // x 是 String
    }
}
```


## 操作符重载

|        类别        |            特型              |                 操作符              |
|:------------------:|:--------------------------------:|:--------------------------:|
| 一元操作符         | `std::ops::Neg` <br> `std::ops::Not` | `-x` <br> `!x` |
| 算术操作符         | `std::ops::Add` <br> `std::ops::Sub` <br> `std::ops::Mul` <br> `std::ops::Div` <br> `std::ops::Rem` | `x + y` <br> `x - y` <br> `x * y` <br> `x / y` <br> `x % y`  |
| 位操作符           | `std::ops::BitAnd` <br> `std::ops::BitOr` <br>`std::ops::BitXor` <br> `std::ops::Shl`<br> `std::ops::Shr`  | `x & y` <br> `x | y` <br> `x ^ y` <br> `x << y` <br> `x >> y` |
| 算术赋值操作符 | `std::ops::AddAssign` <br> `std::ops::SubAssign` <br> `std::ops::MulAssign` <br> `std::ops::DivAssign` <br> `std::ops::RemAssign` | `x += y` <br> `x -= y` <br> `x *= y` <br> `x /= y` <br> `x %= y`  |
| 位赋值操作符   | `std::ops::BitAndAssign` <br> `std::ops::BitOrAssign` <br> `std::ops::BitXorAssing` <br> `std::ops::ShlAssign` <br> `std::ops::ShrAssign` | `x &= y` <br> 其它 |
| 比较               | `std::cmp::PartialEq` <br>` std::cmp::PartialOrd` | `x == y`、`x != y` 分别对应 `eq(), ne()` <br> `x < y`、`x <= y`、`x > y`、`x >= y` |
| 索引               | `std::ops::Index` <br> `std::ops::IndexMut`  | `x[y]`、`&x[y]` <br> `x[y] = z`、`&mut x[y]`  |



举例


```Rust
// 代码效果：自定义 -obj 是个什么逻辑
struct MyClass {
    data: Vec<i32>,
}

impl std::ops::Neg for MyClass {
    type Output = MyClass;

    fn neg(self) -> Self::Output {
        let mut data2 = self.data.clone();
        data2.reverse();
        MyClass { data: data2 }
    }
}


fn main() {
    let obj = MyClass { data: vec![1, 2, 3] };
    let obj2 = -obj;
    println!("{:?}", obj2.data);
    // [3, 2, 1]
}
```


参考：https://blog.csdn.net/feiyanaffection/article/details/125574733


## 常用 trait


|         特型        |                                   简介                                   |
|:-------------------:|:------------------------------------------------------------------------:|
| Drop                | 解构函数。清除值时 Rust 自动运行的清除代码                               |
| Sized               | 标记特型，针对编译时可以知道大小的类型（而不是像切片那样动态大小的类型） |
| Clone               | Clone                                                 |
| Copy                | 位 Copy       |
| Deref 与 DerefMut   | 智能指针类型的特型                                                       |
| Default             | 针对有合理 “默认值” 的类型                                               |
| AsRef 与 AsMut      | 转换特型，借用某种类型的引用                                             |
| Borrow 与 BorrowMut | 转换特型，类似 AsRef 与 AsMut，但额外保证一致的散列、顺序和相等          |
| From 与 Into        | 转换特型，将某种类型的值转换为另一种类型                                 |
| ToOwned             | 转换特型，将引用转换为所有值                                             |


说明
- `Drop` 和 `Copy` 只能有一个
- ??? https://blog.csdn.net/feiyanaffection/article/details/125574787/

Copy 和 Clone
- Copy 给编译器用，规定了一个对象使用 Copy 而不是 Move
- Clone 给程序员用，可以自己定义其行为
- 常见的数字类型、bool类型、共享借用指针&，都是具有 Copy 属性的类型。而 Box、Vec、可写借用指针&mut 等类型都是不具备 Copy 属性的类型。
- 对于数组类型，如果它内部的元素类型是Copy，那么这个数组也是Copy类型。
- 对于tuple类型，如果它的每一个元素都是Copy类型，那么这个tuple会自动实现Copy trait。
- 对于struct和enum类型，不会自动实现Copy trait。而且只有当struct和enum内部每个元素都是Copy类型的时候，编译器才允许我们针对此类型实现Copy trait。


### deref

```Rust
use std::ops::Deref;


struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;

    // *obj 返回的值
    fn deref(&self) -> &T {
        &self.0
    }
}


fn main() {
    let x = MyBox::new(3);
    assert_eq!(3, *x);
}
```

### Drop

```Rust
struct MyStruct {
    data: String,
}

impl Drop for MyStruct {
    fn drop(&mut self) {
        println!("Dropped MyStruct with data {}", self.data);
    }
}

// 1. 可以手动drop，触发 drop 方法
let c = MyStruct { data: String::from("data3") };
drop(c);

let a = MyStruct { data: String::from("data1") };
let b = MyStruct { data: String::from("data2") };
// 程序块末尾会先Drop2后Drop1
```



### derive：快速的操作符重载


```Rust
#[derive(Debug, PartialEq)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };
    println!("Rect is {:?}", rect);
    // 下面这个格式更好看
    println!("Rect is {:#?}", rect);

    // PartialEq 实现的功能
    println!("{}", rect == Rectangle { width: 20, height: 40 })
}
```
结果：

```
Rect is Rectangle { width: 30, height: 50 }
Rect is Rectangle {
    width: 30,
    height: 50,
}
false
```


- Debug
- Eq, PartialEq, Ord, PartialOrd
- Clone
- Copy
- Hash，从 &T 计算哈希值（hash）
- Default, 创建数据类型的一个空实例。





## 匿名函数

```Rust
let func = |num: i32| -> i32{
    println!("{}", num);
    return num + 5;
};

// 也可以省略类型，会自动推导类型
let func2 = |num| { num + 1 };
```

更多：https://weread.qq.com/web/reader/d733256071eeeed9d7322fd
