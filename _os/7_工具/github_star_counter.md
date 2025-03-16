---
layout: open_source
title: github star数量统计
categories: 开源
tag: tools
order: 710
repo_name: star_counter
---


一个统计某个账号下 github 的 star 数量的在线小应用。  

## 试试吧：
输入账号，然后点击`Calculate` 按钮  


<style>
  .blinking {
    animation: blinker 1s linear infinite;
  }

  @keyframes blinker {
    50% { opacity: 0.3; }
  }
</style>

<script src="https://www.guofei.site/star_counter/star_counter.js"></script>


<script>
    function func_1() {
        const output = document.getElementById("star_counter");
        output.classList.add("blinking");
        output.innerHTML = '🌀 Loading...';

        github_id = document.getElementById("user").value;

        setTimeout(() => {
            const result = cal_github_star(github_id);
            output.classList.remove("blinking");
            document.getElementById("star_counter").innerHTML = result;
        }, 100);

    }
</script>


Input github id: <input name="user" value="guofei9987" type="text" id="user">
<input name="Button" type="button" value="Calculate" onClick="func_1()">

<p id="star_counter"></p>




## 源码


### star_counter（Javascript）

[![stars](https://img.shields.io/github/stars/guofei9987/star_counter.svg?style=social)](https://github.com/guofei9987/star_counter/)
[![fork](https://img.shields.io/github/forks/guofei9987/star_counter?style=social)](https://github.com/guofei9987/star_counter/fork)



### github_star_counter（Python）



[![stars](https://img.shields.io/github/stars/guofei9987/github_star_counter.svg?style=social)](https://github.com/guofei9987/github_star_counter/)
[![fork](https://img.shields.io/github/forks/guofei9987/github_star_counter?style=social)](https://github.com/guofei9987/github_star_counter/fork)


**Source code:** [https://github.com/guofei9987/github_star_counter](https://github.com/guofei9987/github_star_counter)


### 极简 demo

极简 demo：[https://www.guofei.site/star_counter/main.html](https://www.guofei.site/star_counter/main.html)

## 如何部署到你的网站
把这个copy到你的网页里
```html
<script src="http://www.guofei.site/star_counter/star_counter.js"></script> <!--引用js代码-->
<script>
    function func_1() {
        document.getElementById("star_counter").innerHTML = 'If not print for seconds, please refresh';
        github_id = document.getElementById("user").value;
        document.getElementById("star_counter").innerHTML = cal_github_star(github_id);
    }
</script>


Input github id: <input name="user" value="guofei9987" type="text" id="user">
<input name="Button" type="button" value="Calculate" onClick="func_1()">

<p id="star_counter"></p>
```


