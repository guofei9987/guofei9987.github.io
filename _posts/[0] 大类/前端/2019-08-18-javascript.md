---
layout: post
title: 【JavaScript】基本数据结构
categories: 前端
tags:
keywords:
description:
---

## 入门
- 浏览器 ctrl+shift+J 用来打开控制台
- JavaScript 区分大小写，但html不区分大小写。html的标签名和属性名用大写或小写，但JavaScript必须用小写。
- JavaScript会忽略空格和换行。所以可以随意使用空格和换行，来提高代码的可读性。



```JavaScript
console.log(); //用来向控制台输出消息
alert(); //弹出对话框

/*
双斜杠表示注释
或者用斜杠星+星斜杠做多行注释
*/
```





## 常见数据结构
### primitive type
#### 数字


```JavaScript
//变量通过var来声明
var x;
x = 0;
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
var then = new Date(2017,0,1); //月份从0开始
var later = new Date(2017,0,1,17,10,30);
var now = new Date();

var elapsed = now - then; //以毫秒计算的时间差

//新建：数值日期
//Date以毫秒计，以1970 年 1 月 1 日为0毫秒
var d = new Date(-100000000000);

//字符串日期
d = new Date("December 25, 2019 12:46:00");


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

```JavaScript



```



#### 字符串

- 没有单个char
- 长度表示有多少个十六位值，而不是字符个数

```JavaScript
x = 'Java';
x = "script"; //单引号或双引号都是字符串
```


```JavaScript
x = "hello, world!"

x.length


x.charAt(0);
x.charAt(x.length-1);

//切片：含头不含尾
x.substring(1,3)
x.slice(1,3)
x.slice(-3) //后3个

//查找
x.indexOf('o') //首次出现位置
x.lastIndexOf('o') //最后一次出现位置
x.indexOf('o',5) // 5号位置之后，第一次出现的位置
x.lastIndexOf('o',5) // 从5号位置往前搜索，第一次出现的位置
// search()和indexOf()是相等的，但search()还可以用于正则表达式

//
x.split(' ')

//修改，x本身不会变
x.replace('h','H')
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

x = null;
x = undefined;
```

#### 格式转换
显示转换
```JavaScript
Number('2');
String(false);//=>"false"
Boolean([]);//=>true
Object(3);
```
自动转换
```JavaScript
1+'';
'1'+0;
!!'a';
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







### object type

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



### 数组
array，一种特殊的object，定义了一些专有方法
```JavaScript
var x=[2,3,5,7];
x[0];//取数


prime.length;

x[4]=9; //增加一个元素
x[4]=11; //改变 一个元素
```


数组和对象可以相互嵌套


增、删
```JavaScript
x.push(13,19);
x.pop();//返回最后一个元素，并删除

x.unshift(1,2);
x.shift();//返回第一个元素，并删除

delete fruits[0]//这样删除会留下一个洞，这跟python不一样

[1,2,3].concat([4,5,6],[7,8,9]); //不会修改原数组

x.join(" * ")//相当于python的'*'.join(x)
```

排序、翻转
```JavaScript
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

### 正则表达式
https://www.w3school.com.cn/js/js_regexp.asp
