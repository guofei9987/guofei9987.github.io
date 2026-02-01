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




## Source Code

| language | description | links |
|----------|-------------|-------|
| Javascript | [![star_counter](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=star_counter&theme=radical)](https://github.com/guofei9987/star_counter/) | [star_counter](https://github.com/guofei9987/star_counter/) |
| Python | [![github_star_counter](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=github_star_counter&theme=radical)](https://github.com/guofei9987/github_star_counter/) | [github_star_counter](https://github.com/guofei9987/github_star_counter/) |



### How to import


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


