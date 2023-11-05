---
layout: post
title: 【JavaScript】全笔记
categories: 语言
tags:
keywords:
description:
permalink: /:title:output_ext
order: 17002
---

## 入门
- 浏览器 ctrl+shift+J 用来打开控制台
- JavaScript 区分大小写，但html不区分大小写
- JavaScript会忽略空格和换行。所以可以随意使用空格和换行，来提高代码的可读性。


使用node.js：
```bash
node my.js
npm install <模块名>
npm install -g <模块名> # 全局安装
npm uninstall <模块名>
npm run <脚本名> # 运行脚本， package.json 中定义脚本
```



```JavaScript
console.log(); //用来向控制台输出消息
alert(); //弹出对话框

// 双斜杠表示注释
/*
或者用斜杠星+星斜杠做多行注释
*/
```





## 常见数据结构
### primitive type
#### 数字


```JavaScript
var x; // 加 var 是局部变量
x = 0; // 不加 var 是全局变量
x = 0.01;//不区分整数和浮点数，都是浮点数
x = 0xff; //0x或0X开头，是十六进制
x = 012; //0开头，是八进制。但有些版本不支持八进制
x = 3.12e10 //科学计数法
```

数学运算
```JavaScript
Math.pow(2,5);

Math.round(0.6);
Math.ceil(0.6);
Math.floor(0.6);

Math.abs(-3);

Math.max(1,2,3);
Math.min(1,2,3);

Math.random();

Math.PI
Math.E

Math.sin(1) //cos, sinh等一系列都有

Math.log(10)//自然对数
Math.log10(10)
Math.log2(10)
Math.exp(3)

Math.sqrt(64)

Math.E
Math.PI
```
- overflow 会返回一个 Infinity或-Infinity
- underflow 会返回负0
- 除0按overflow处理。但0除0返回NaN
- 二进制浮点表示，会有一些偏差，例如`0.3-0.2==0.2-0.1` 是false

#### 日期
```javascript
// 新建日期的n个方法
var then = new Date(2017,0,1); //月份从0开始
var later = new Date(2017,0,1,17,10,30);
var now = new Date(); // 现在
//Date以毫秒计，以1970 年 1 月 1 日为0毫秒：
var d = new Date(-100000000000);
//字符串日期：
var d = new Date("December 25, 2019 12:46:00");

// 一些方法：
var elapsed = now - then; //以毫秒计算的时间差

later.getFullYear();//年 yyyy
later.getMonth();//月 0-11
later.getDate();//日 1-31
later.getDay();//星期几，0代表星期日
later.getHours();//时0-23
getMinutes();//分0-59
getSeconds();//秒0-59
getMilliseconds()//毫秒0-999
getTime();// 1970 年 1 月 1 日以来的毫秒数
//! 以上get全都有对应的set，表示设定时间


later.getUTCDate();//基于时区，还有Month，Hour等，不重复写了
```


#### 字符串

JavaScript 没有 char 的概念

```JavaScript
x = 'Java';
x = "script"; //单引号或双引号都是字符串


x.length


x.charAt(0); // 第0位
x.charAt(x.length - 1); //最后一位

//切片：含头不含尾
x.substring(1, 3)
x.slice(1, 3)
x.slice(-3) //后3个

//查找
x.indexOf('o') //首次出现位置
x.lastIndexOf('o') //最后一次出现位置
x.indexOf('o', 5) // 5号位置之后，第一次出现的位置
x.lastIndexOf('o', 5) // 从5号位置往前搜索，第一次出现的位置
// search()和indexOf()是相等的，但search()还可以用于正则表达式

//
x.split(' ')

//修改，x本身不会变
x.replace('h', 'H')
x.toUpperCase();
x.trim(); //删除两端的空白符

x.charCodeAt(0) //0号位置的unicode编码
```


#### 布尔类型

```JavaScript
x = true;
x = false;

//会自动把这些转换成false：
//undefined, null, 0, -0, NaN, ""
// 其它都转为true
```

#### 格式转换
显示转换
```JavaScript
Number('2'); // 返回2
String(false);//=>"false"
Boolean([]);//=>true
Object(3);
```
自动转换
```JavaScript
1+''; // 转为字符
'1'+0; //转为字符
!!'a'; // 返回 true
```

高级数字转字符
```JavaScript
var n=17;
n.toString(3);//3进制字符串
n.toString(5);//5进制字符串

n.toFixed(3);//保留3位小数
n.toExponential(2);//科学计数法，小数点前有1位，小数点后有2位
n.toPrecision(4);//总共有4位，如果转不了，就用科学计数法
```

高级字符转数字
```JavaScript
//1. 忽略前面的空格，忽略后面无效的字符。但如果前面的字符无效，就返回NaN
parseInt('   -123.22个');//=>-123
parseFloat('     -123.22个');//=>-123.22

//2. parseInt 可以自动识别0x为16进制，也可以指定进制
parseInt('0x33');//自动识别进制
parseInt('33',4); //指定进制
```







### 字典object

```JavaScript
//对象是名-值对的集合
//如何定义：
var book = {topic: "JavaScript", fat: true}

//如何使用：
book.topic;
book["fat"];

//添加新属性
book.author = "Franky";
book["contents"] = {};
```



### 数组array
arra y是一种特殊的 object，定义了一些专有方法
```JavaScript
var arr = [2, 3, 5, 7];
var arr = Array(1,2,3,4);

arr.length;


arr[0];//取数
arr.slice(1,3); // 切片，含头不含尾

arr[4] = 9; //增加一个元素
arr[4] = 11; //改变 一个元素

arr[5] = [1, 2, 3]; // array 可以嵌套一个对象
```


增、删
```JavaScript
arr.push(13, 19);//末尾插入13，19，然后返回 arr.length
arr.pop();//返回最后一个元素，并删除

arr.unshift(1, 2);//开头插入1，2，然后返回 arr.length
arr.shift();//返回第一个元素，并删除

arr.splice(index=1,0,'content');  //在某个位置插入，这里的0代表意义比较复杂。


delete arr[0];//这样删除会留下一个洞，这跟python不一样
[1, 2, 3].concat([4, 5, 6], [7, 8, 9]); //不会修改原数组

```

排序、翻转
```JavaScript
arr.join("*")//相当于python的'*'.join(x)


var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();
fruits.reverse();

//js的排序是按照字符串排序（即使是数字）
//这样写可以按照数值排序
lst.sort(function(a, b){return a - b})
//随机排序
lst.sort(function(a, b){return 0.5 - Math.random()});
```



## 运算符
### 基本运算符
```JavaScript
3 + 2;
3 - 2;
3 * 2;
3 / 2;
3 % 2; //余数

"3" + "2";//=>"32" 字符串拼接
```

```JavaScript
var count = 0;
count++;
count--;
count += 2;
count -= 2;
count *= 3;
```


### 逻辑运算符
```JavaScript
var x = 2, y = 3;
x == y;
x != y;
x < y;
x <= y;
x > y;
x >= y;
```

字符串也可以比较，跟Python一样

与或非
```JavaScript
(x == 2) && (y == 3) //与
(x == 2) || (y == 3) //或
!(x == y) //非
```

### 位运算符
```JavaScript
& //AND
| //OR
^ //XOR
~ //NOT
<< //左移位
>> //有符号右移位（左边推入最左边的拷贝）
>>>//零填充右移位（左边推入零）
```

[位运算符](https://www.w3school.com.cn/js/js_bitwise.asp)


### 正则表达式
https://www.w3school.com.cn/js/js_regexp.asp





## 函数

```JavaScript
function plus1(x) {
    return x + 1;
}
```

### 函数的入参
函数的输入很灵活，可以定义一个输入，但实际传入两个参数
```JavaScript
function myFunction(name) {
  var arg=arguments[1]; // 这个函数可以有多个输入
  console.log(name,arg);
}

myFunction(1,2)
```

### 局部变量和全局变量

加 var 是局部变量，不加 var 是全局变量，例子：

```javascript
name = '1';

function myFun1() {
    var name = '2';
    console.log(name);
}

function myFun2() {
    console.log(name);
}

myFun1();
myFun2();
```
上面代码打印出来是2，1



```javascript
name = '1';

function myFun1() {
    name = '2';
    console.log(name);
}

function myFun2() {
    console.log(name);
}

myFun1();
myFun2();
```
上面代码打印出来 2，2


因为容易弄混，定了以下规范：
1. 尽量都加上var，用局部变量
2. 对于用全局变量的情况，可以用 `window.name ="123"` 代替（实际效果一模一样）
3. （另外）每个语句末尾要加分号（虽然不加分号也能运行），压缩的时候防止错误。


### let/const
与var类似的用法，功能是把变量的作用域限制于块中，所谓的块是大括号内的内容（var的作用域是全局/函数中）

const的作用域性质类似let，不同点是const不可变，且必须在声明时赋值




### 匿名函数

```javascript
(function () {
    console.log('Hello')
})()
```

匿名函数也可以传入参数
```javascript
(function (inp) {
    console.log(inp)
})('Hello')
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
var arr = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

另一种for循环
```JavaScript
var person = {fname: "Bill", lname: "Gates", age: 62};
for (var x in person) {
    console.log(x);
    console.log(person[x]);
}


var arr = [4, 3, 2];
for (var x in arr) {
    console.log(x);
}
// 循环的也是 key，这段代码打印 0，1，2
```

>循环也支持 break/continue 语句


## 面向对象

```JavaScript
function Point(x, y) {//惯例：构造函数均以大写字母开头
    this.x = x;
    this.y = y;
    //不需要return

    // 定义类方法：
    this.get_add = function (z) {
        return this.x + this.y + z;
    };
}


//生成对象
var p = new Point(1, 1);

p.get_add(3);
```

增加类方法1：（直接对类增加方法）
```JavaScript
Point.prototype.r = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

//使用方法
p.r()
```


增加类方法2:（对对象增加方法）
```JavaScript
var points = [{x:0,y:0},{x:1,y:1}]

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

## Post

```javascript
var url = 'https://www.guofei.site/app/some_api'
var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var response = xhr.responseText; // 返回的值（字符串）
        var response = JSON.parse(xhr.responseText); // 返回的格式如果是 json，可以解析 
        var content = response.key1; // 取出其某一个值
        console.log(content)
    }
};

// 请求时的 Post 值
postData = "key1=" + encodeURIComponent("value1") + "&key2=" + encodeURIComponent("value2");
xhr.send(postData);
```


## Json
把JSON当做文本导入，然后用 `JSON.parse()` 转成 JavaScript 对象

```JavaScript
var text = '{"employees":[{"firstName":"Bill","lastName":"Gates" },{"firstName":"Steve","lastName":"Jobs" },{"firstName":"Elon","lastName":"Musk" }]}';

obj = JSON.parse(text);
```

读取网页上的json
```javascript
fetch('https://www.guofei.site/pages/achievement.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    showData(data);
  })
  .catch(error => console.error(error));

function showData(data){
for(let key in data){
	console.log('key='+data[key]+ ' val='+data[key])
	}
}
```



