---
layout: open_source
title: 焦虑放大器
categories: 开源
tag: tools
order: 701
---



<style>
    #myTable {
        border-collapse: collapse;
    }

    #myTable td {
        width: 20px;
        height: 20px;
        border: 1px solid #fff;
    }

    #myTable td.past {
        background-color:#D2B48C
    }

    #myTable td.future {
        background-color:#4CAF50
    }

    #myTable td.old {
        background-color:#C0C0C0
    }


    @keyframes smooth-blink {
      0%, 100% { background-color: #D2B48C; }
      50% { background-color: #4CAF50; }
    }

    #myTable td.now {
    animation: smooth-blink 500ms linear infinite;
    }

    #explain td{
        border: 1px solid #fff;
    }
    

    /* 进度条 */
    .progress-bar {
        width: 400px;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 10px;
        overflow: hidden;
        background-color: #4CAF50;
    }

    .progress-bar-inner {
        height: 100%;
        background-color: #D2B48C;
    }

    .bar1{
        height: 25px;
    }

    .bar2{
        height: 75px;
    }



    /* 新增样式 */
#life-bar {
    position: relative;
    display: flex;
    align-items: center;
}

.time-stats {
    position: absolute;
    width: 200px;
    padding: 0 10px;
    font-size: 12px;
    line-height: 1.3;
}

.left-stats {
    text-align: left;
    left: 0;
}

.right-stats {
    text-align: right;
    right: 0;
}
</style>

<div id="past_text"></div>
<br/>


<!-- 今日剩余 -->
<div class="progress-bar bar1" id="today-bar">
    <div class="progress-bar-inner" id="today-bar-inner"></div>
</div>

<br/>
<br/>
<br/>

<div class="progress-bar bar2" id="life-bar">
    <div class="time-stats left-stats"></div>
    <div class="progress-bar-inner" id="life-bar-inner"></div>
    <div class="time-stats right-stats"></div>
</div>






<table id="myTable">
    <caption>人生格子</caption>
    <tbody></tbody>
</table>

<table id="explain">
    <caption>说明</caption>
    <tbody>
        <tr>
            <td style="background-color:#D2B48C;width: 25px;height: 25px;"></td>
            <td>已经过了的时间</td>
        </tr>
        <tr>
            <td style="background-color:#4CAF50;width: 25px;height: 25px;"></td>
            <td>65岁之前的余生</td>
        </tr>
        <tr>
            <td style="background-color:#C0C0C0;width: 25px;height: 25px;"></td>
            <td>65岁之后的余生</td>
        </tr>
    </tbody>
</table>

<script>
const birthDay = new Date("1988-02-16");
const life_span = 80;

const endDay = new Date(birthDay.getFullYear() + life_span, birthDay.getMonth(), birthDay.getDate());
var currentDate = new Date();
// 过去了多久（单位：秒）
var pastSeconds = (currentDate.getTime() - birthDay.getTime()) / 1000;


// 80年，分为 20列，20行。每个格子代表0.2年
let num_cols = 20;
let num_rows = 20;

// 当前时间对应的格子序号
currentCellIdx = Math.floor(pastSeconds / 3600 / 24 / 365 / (life_span / num_cols / num_rows));

var table = document.getElementById("myTable");
const nowCelll = null;
for (var i = 0; i < num_rows; i++) {
    var newRow = table.insertRow();  // 插入一行
    // 在新行中插入单元格
    for (var j = 0; j < num_cols; j++) {
        var newCell = newRow.insertCell();
        // 当前格子序号
        let newCellIdx = i * num_cols + j;
        if (newCellIdx < currentCellIdx) {
            newCell.classList.add("past");
        } else if (newCellIdx == currentCellIdx) {
            newCell.classList.add("now");
        } else if (newCellIdx <= 65 * 5) {
            newCell.classList.add("future");
        } else {
            newCell.classList.add("old");
        }
    }
}


function tickDay(){
    // 今日进度条
    var now = new Date();
    // var startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    var percentLeft = (now - startOfDay) / (24 * 60 * 60 * 1000) * 100;
    var progressBar = document.getElementById("today-bar-inner");
    progressBar.style.width = percentLeft + "%";
    progressBar.innerText = "今日已用" + percentLeft.toFixed(4) + '%';
}


function tickLife() {
    const leftStats = document.querySelector('.left-stats');
    const rightStats = document.querySelector('.right-stats');
    
    // 计算时间差
    var currentDate = new Date();
    var daysPassed = (currentDate - birthDay) / (1000 * 3600 * 24);
    var daysRemaining = (endDay - currentDate) / (1000 * 3600 * 24);


    // 左边4行：已过去的时间
    leftStats.innerHTML = `
        时光已去：<br>
        ${(daysPassed / 365).toFixed(8)} 年<br>
        ${(daysPassed / 12).toFixed(8)} 月<br>
        ${daysPassed.toFixed(8)} 天<br>`;

    // 右边4行：剩余时间
    rightStats.innerHTML = `
        余生还剩：<br>
        ${(daysRemaining / 365).toFixed(8)} 年<br>
        ${(daysRemaining / 12).toFixed(8)} 月<br>
        ${daysRemaining.toFixed(8)} 天<br>`;

    // 进度条
    var percentLeft = daysPassed / (daysPassed + daysRemaining) * 100;
    var progressBar = document.getElementById("life-bar-inner");
    progressBar.style.width = percentLeft + "%";
}


function myTick() {
    var past_text = document.getElementById("past_text");

    var currentDate = new Date();
    var daysPast_ = (currentDate - birthDay) / (1000 * 3600 * 24);
    var daysFuture_ = (endDay - currentDate) / (1000 * 3600 * 24);


    past_text.innerHTML =
        "时光已去： " + (daysPast_ / 365).toFixed(8) + " 年/"
        + (daysPast_ / 12).toFixed(8) + " 月/"
        + daysPast_.toFixed(8) + " 天"
        + "<br>"
        + "余生还剩： " + (daysFuture_ / 365).toFixed(8) + " 年/"
        + (daysFuture_ / 12).toFixed(8) + " 月/"
        + daysFuture_.toFixed(8) + " 天"
        + "<br>";

    // 今日进度条
    var startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    var percentLeft = (currentDate - startOfDay) / (24 * 60 * 60 * 1000) * 100;
    var progressBar = document.getElementById("today-bar-inner");
    progressBar.style.width = percentLeft + "%";
    progressBar.innerText = "今日已用" + percentLeft.toFixed(4) + '%';
}


setInterval(tickLife, 50);
setInterval(tickDay, 50);


</script>