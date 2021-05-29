---
layout: post
title: 【JavaScript】函数、控制语句
categories: 语言
tags:
keywords:
description:
order: 17002
---

## 函数

```JavaScript
function plus1(x) {
    return x + 1;
}
```

### 方法的使用

```JavaScript
var a = [];
a.push(1, 2, 3); //添加新元素
a.reverse();//反转，a变化了
```

### 自定义方法

定义

```JavaScript
points.dist = function () {
    var p1 = this[0];
    var p2 = this[1];
    var a = p2.x - p1.x;
    var b = p2.y - p1.y;
    return Math.sqrt(a * a + b * b);
};

//使用
points.dist();
```

## 控制语句

### if

```JavaScript
function abs(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}
```

### while

```JavaScript
function factorial(n) {
    var product = 1;
    while (n > 1) {
        product *= n;
        n--;
    }
    return product
}
```

Do/While
```JavaScript
do {
    text += "The number is " + i;
    i++;
 }
while (i < 10);
```

### for

```JavaScript
function factorial2(n) {
    var i, product = 1;
    for (i = 2; i <= n; i++) {
        product *= i;
    }
    return product;
}
```

另一种for循环
```JavaScript
var txt = "";
var person = {fname:"Bill", lname:"Gates", age:62};
var x;
for (x in person) {
  txt += person[x] + " ";
}
```

>循环也支持 break/continue 语句


## 面向对象

```JavaScript
function Point(x, y) {//惯例：构造函数均以大写字母开头
    this.x = x;
    this.y = y;
//不需要return
}

//生成对象
var p = new Point(1, 1);

//定义方法
Point.prototype.r = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

//使用方法
p.r()
```

## this
- 在方法中，this 指的是所有者对象。
- 单独的情况下，this 指的是全局对象。
- 在函数中，this 指的是全局对象。
- 在事件中，this 指的是接收事件的元素。


### 方法中的this
```JavaScript
// 创建对象：
var person = {
  firstName: "Bill",
  lastName : "Gates",
  id     : 678,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};

// 显示来自对象的数据：
document.getElementById("demo").innerHTML = person.fullName();
```

### 单独/函数中的 this
```
this
```


### 事件处理程序中的 this
```html
<button onclick="this.style.display='none'">单击来删除我！</button>
```

## let/const
与var类似的用法，功能是把变量的作用域限制于块中，所谓的块是大括号内的内容（var的作用域是全局/函数中）

const的作用域性质类似let，不同点是const不可变，且必须在声明时赋值


## Json
一般的做法是，把JSON当做文本导入，然后用 `JSON.parse()` 转成 JavaScript 对象

```JavaScript
var text = '{"employees":[{"firstName":"Bill","lastName":"Gates" },{"firstName":"Steve","lastName":"Jobs" },{"firstName":"Elon","lastName":"Musk" }]}';

obj = JSON.parse(text);
```

## 参考资料
（收藏）
[位运算符](https://www.w3school.com.cn/js/js_bitwise.asp)   
[event](https://www.w3school.com.cn/jsref/dom_obj_event.asp)         



## 额外
一个跨域问题的解决方案
```JavaScript
var url="https://api.github.com/users/guofei9987/repos?page=1";

a=[]
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    //document.getElementById("demo").innerHTML = myObj.name;
    console.log(myObj);
	a.push(myObj);
  }
};
xmlhttp.open("GET", url, true);// false 会阻塞直到 readyState=4，true（默认）会立即返回并在后台线程中基础处理
xmlhttp.send();
```

### XMLHttpRequest
#### readyState
- 0	Uninitialized	初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。
- 1	Open	open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
- 2	Sent	Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
- 3	Receiving	所有响应头部都已经接收到。响应体开始接收但未完成。
- 4	Loaded	HTTP 响应已经完全接收。


readyState 的值不会递减，除非当一个请求在处理过程中的时候调用了 abort() 或 open() 方法。每次这个属性的值增加的时候，都会触发 onreadystatechange 事件句柄。

#### responseText
目前为止为服务器接收到的响应体（不包括头部），或者如果还没有接收到数据的话，就是空字符串。

如果 readyState 小于 3，这个属性就是一个空字符串。当 readyState 为 3，这个属性返回目前已经接收的响应部分。如果 readyState 为 4，这个属性保存了完整的响应体。

如果响应包含了为响应体指定字符编码的头部，就使用该编码。否则，假定使用 Unicode UTF-8。
