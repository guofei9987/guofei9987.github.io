---
layout: post
title: 【JavaScript】html相关
categories: 前端
tags:
keywords:
description:
---



## JavaScript 代码嵌入html
3种方法:
- head中引用
- head中填入js
- body中填入js


```html
<html>
<head>
    <script src="test.js"></script> <!--引用js代码-->
    <script>
        <!--填入js代码-->
    </script>
</head>

<body>
<script>
    <!--填入js代码-->
</script>
</body>
</html>
```


## demo
### 简洁版
```html
<p id="demo"></p>
```


```JavaScript
<button type="button"
onclick="document.getElementById('demo').innerHTML = Date()">
```


### 复杂版
```html
<!DOCTYPE html>
<html>
<head>
<script>
// 这一段代码可以放到head/引用/body中，都可以调用
function myFunction() {
    document.getElementById("demo").innerHTML = "段落被更改。";
}
</script>
</head>

<body>

<h1>一张网页</h1>
<p id="demo">一个段落</p>
<button type="button" onclick="myFunction()">试一试</button>

</body>
</html>
```


## 几种显示方式
- 使用 window.alert() 写入警告框
- 使用 document.write() 写入 HTML 输出（就是整个页面变了）
- 使用 innerHTML 写入 HTML 元素
- 使用 console.log() 写入浏览器控制台


## html事件




- `onchange`	HTML 元素已被改变
- `onclick`	用户点击了 HTML 元素
- `onmouseover`	用户把鼠标移动到 HTML 元素上
- `onmouseout`	用户把鼠标移开 HTML 元素
- `onkeydown`	用户按下键盘按键
- `onload`	浏览器已经完成页面加载








## File
其实一知半解
```
<input type="file" id="file" accept="image/*">

```

```
window.onload=function(){
  let ofile=document.getElementById("file");
  file.onchange = function () {
    console.log(this.files[0]);
  }
}
```
