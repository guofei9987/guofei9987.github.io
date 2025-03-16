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


<script src="https://www.guofei.site/star_counter/star_counter.js"></script>


<script>
    function func_1() {
        document.getElementById("star_counter").innerHTML = 'Loading...';
        github_id = document.getElementById("user").value;

        setTimeout(() => {
            const result = cal_github_star(github_id);
            document.getElementById("star_counter").innerHTML = result;
        }, 100);
    }
</script>


Input github id: <input name="user" value="guofei9987" type="text" id="user">
<input name="Button" type="button" value="Calculate" onClick="func_1()">

<p id="star_counter"></p>






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

[源代码地址](https://github.com/guofei9987/star_counter)，star一下，我就很开心啦  


其它：https://www.guofei.site/2019/08/31/github_star_counter.html （已无用）