---
layout: post
title: 【JavaScript】结合html
categories: 语言
tags:
keywords:
description:
order: 17001
---



## 导入 JavaScript 代码
3种方法:
- 引用js文件
- html中直接写js代码（位置可以是 head/body）


```html
<html>
<head>
    <!-- 方法1:引用js文件 -->
    <script src="test.js"></script> 
    <script>
        <!-- 方法2:head 中写 js 代码 -->
    </script>
</head>

<body>
<script>
    <!-- 方法3: body 中写 js 代码-->
</script>
</body>
</html>
```



## 按钮控制

简洁版
```html
<button type="button"
onclick="document.getElementById('demo_id').innerHTML = Date()">按钮</button>
<p id="demo_id"></p>
```

<button type="button"
onclick="document.getElementById('demo_id').innerHTML = Date()">按钮</button>
<p id="demo_id"></p>



复杂版
```html
<script>
  function myFunction() {
      document.getElementById("demo_id2").innerHTML = "段落被更改。";
  }
</script>

<button type="button" onclick="myFunction()">试一试</button>
<p id="demo_id2">一个段落</p>
```


<script>
  function myFunction() {
      document.getElementById("demo_id2").innerHTML = "段落被更改。";
  }
</script>

<button type="button" onclick="myFunction()">试一试</button>
<p id="demo_id2">一个段落</p>



## 几个常用函数

```javascript
window.alert() // 弹窗
console.log() // 写入浏览器控制台
document.write() // 写入 HTML 输出（就是整个页面变了）
```

改变标签的各种属性：

```javascript
var obj = document.getElementById('id1');

obj.innerText = '你好'; // 对应的html是：改变标签中间的值，例如 <p>你好</p> 中的你好
obj.innerHTML = '你好'; // 与 innerText 的区别是这个还支持 html

obj.className = 'hide'; // 用来改变标签的 class

obj.setAttribute(key,val); // 例如，obj.setAttribute('style','color:red;')
obj.getAttribute(key); //

obj.style; // 是一个对象，用来读写各种属性，例如 : obj.style.color = 'blue'， 等价于 obj.setAttribute('style',val)
```


定时函数：
```javascript
window.setInterval("alert()",2000); // 每2000毫秒执行一次
window.clearInterval();

window.setTimeout("alert()",2000); // 2000毫秒后触发一次
window.clearTimeout(obj); // 如果还没触发就执行了这个，就不再触发
```



表单相关
```JavaScript
document.getElementById('form_id').submit()
```



## html事件

- `onchange`	HTML 元素已被改变
- `onclick`	用户点击了 HTML 元素
- `onmouseover`	用户把鼠标移动到 HTML 元素上
- `onmouseout`	用户把鼠标移开 HTML 元素
- `onkeydown`	用户按下键盘按键
- `onload`	浏览器已经完成页面加载

更多事件 [参考](https://www.runoob.com/jsref/dom-obj-event.html)

[event](https://www.w3school.com.cn/jsref/dom_obj_event.asp)         





## DOM编程

```html
<p id="demo_id1">一个段落</p>

<script>
// 下面定义一个 a 标签
var tag=document.createElement('a');
tag.href='http://www.guofei.site';
tag.innerText='点我';

var id1=document.getElementById('demo_id1');
id1.appendChild(tag); // 	添加为它的子标签
</script>
```

另一种方式
```html
<p id="demo_id1">一个段落</p>

<script>
// 另一种方式定义标签
var tag = "<a href='http://www.guofei.site'>点我</a>";
// 另一种方式定义把标签添加进去
document.getElementById('demo_id1').innerHTML = tag;
</script>
```


## 案例

### 案例：更改内容

用上面的说明，可以实现下面的功能：


<script>
  function myFunction1() {
      document.getElementById("demo_id3").innerHTML = "段落被更改。";
  }

	function myFunction2() {
			document.getElementById("demo_id3").innerHTML = "鼠标移过来试一试";
	}
</script>

<p id="demo_id3" onmouseover="myFunction1()" onmouseout="myFunction2()">鼠标移过来试一试</p>



### 案例：隐藏和显示

用按钮控制是否显示某个元素

```html
<style>
    .show {
        display: block;
    }

    .hide {
        display: none;
    }

</style>


<p id="id1" class="show">一个段落</p>


<script>
    function myFun1() {
        id1 = document.getElementById('id1');
        if (id1.className === 'hide') {
            id1.className = 'show';
        } else {
            id1.className = 'hide'
        }
    }
</script>


<button type="button" onclick="myFun1()">试一试</button>
```


<style>
    .show {
        display: block;
    }

    .hide {
        display: none;
    }

</style>
<p id="id1" class="show">一个段落</p>
<script>
    function myFun1() {
        id1 = document.getElementById('id1');
        if (id1.className === 'hide') {
            id1.className = 'show';
        } else {
            id1.className = 'hide'
        }
    }
</script>
<button type="button" onclick="myFun1()">试一试</button>


### 案例：进度条
画一个进度条，每0.5秒进度条前进一些。


```html
<div style="width: 500px;border: solid red;">
    <div id="progress" style="width: 10%;background-color: red;">进度</div>
</div>

<button type="button" onclick="myFun5()">开启进度条</button>
<button type="button" onclick="myFun5_2()">重置</button>

<script>

    var prog_tag = document.getElementById('progress');
    var progress = 10;

    function myFun5_1() {
        progress += 2;
        if (progress > 100) {
            window.clearInterval(interval);
        } else {
            prog_tag.style.width = progress + "%";
            prog_tag.innerText = progress + '%';
        }

    }

    function myFun5_2() {
        progress = 0;
        prog_tag.style.width = progress + "%";
        prog_tag.innerText = progress + '%';
    }

    function myFun5() {
        interval = window.setInterval('myFun5_1()', 100);
    }
</script>
```

<div style="width: 500px;border: solid red;">
    <div id="progress" style="width: 10%;background-color: red;">进度</div>
</div>

<button type="button" onclick="myFun5()">开启进度条</button>
<button type="button" onclick="myFun5_2()">重置</button>

<script>

    var prog_tag = document.getElementById('progress');
    var progress = 10;

    function myFun5_1() {
        progress += 2;
        if (progress > 100) {
            window.clearInterval(interval);
        } else {
            prog_tag.style.width = progress + "%";
            prog_tag.innerText = progress + '%';
        }

    }

    function myFun5_2() {
        progress = 0;
        prog_tag.style.width = progress + "%";
        prog_tag.innerText = progress + '%';
    }

    function myFun5() {
        interval = window.setInterval('myFun5_1()', 100);
    }
</script>

### 案例：跑马灯

每次把第一个字符移动到最后

```html
<div id="id4">学习代码真的很好玩。</div>

<script>
    function myFun4() {
        var id4 = document.getElementById('id4');
        var text = id4.innerText
        id4.innerText = text.slice(1,) + text.slice(0, 1)
    }

    window.setInterval('myFun4()', 500);
</script>
```

<div id="id4">学习代码真的很好玩。</div>

<script>
    function myFun4() {
        var id4 = document.getElementById('id4');
        var text = id4.innerText
        id4.innerText = text.slice(1,) + text.slice(0, 1)
    }

    window.setInterval('myFun4()', 500);
</script>

## 其它

### 全屏


```html
<style>
  #fulldiv {
    background: #fff;
    width: 100%;
    text-align: center;
    height: 100%;
  }
</style>


<b>指定区域全屏测试</b>
<button id="btn">全屏按钮</button>
<div id="fulldiv">
  <b>这里是全屏显示的内容</b>
</div>

<script>
  var fullscreen = false;
  let btn = document.getElementById('btn');
  let fullarea = document.getElementById('fulldiv')
  btn.addEventListener('click',function(){
    if (fullscreen) {    // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {    // 进入全屏
      if (fullarea.requestFullscreen) {
        fullarea.requestFullscreen();
      } else if (fullarea.webkitRequestFullScreen) {
        fullarea.webkitRequestFullScreen();
      } else if (fullarea.mozRequestFullScreen) {
        fullarea.mozRequestFullScreen();
      } else if (fullarea.msRequestFullscreen) {
        // IE11
        fullarea.msRequestFullscreen();
      }
    }
    fullscreen = !fullscreen;
  })
</script>
```


<style>
  #fulldiv {
    background: #fff;
    width: 100%;
    text-align: center;
    height: 100%;
  }
</style>


<b>指定区域全屏测试</b>
<button id="btn">全屏按钮</button>
<div id="fulldiv">
  <b>这里是全屏显示的内容</b>
</div>

<script>
  var fullscreen = false;
  let btn = document.getElementById('btn');
  let fullarea = document.getElementById('fulldiv')
  btn.addEventListener('click',function(){
    if (fullscreen) {    // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {    // 进入全屏
      if (fullarea.requestFullscreen) {
        fullarea.requestFullscreen();
      } else if (fullarea.webkitRequestFullScreen) {
        fullarea.webkitRequestFullScreen();
      } else if (fullarea.mozRequestFullScreen) {
        fullarea.mozRequestFullScreen();
      } else if (fullarea.msRequestFullscreen) {
        // IE11
        fullarea.msRequestFullscreen();
      }
    }
    fullscreen = !fullscreen;
  })
</script>


### file


上传一个文件给 JavaScript 处理：

```html
<input type="file" id="file" accept="image/*">


window.onload=function(){
  let ofile=document.getElementById("file");
  file.onchange = function () {
    console.log(this.files[0]);
  }
}
```
