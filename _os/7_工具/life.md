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

    /* 进度条 */
    .progress-bar {
        width: 400px;
        height: 20px;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 10px;
        overflow: hidden;
    }

    .progress-bar-inner {
        height: 100%;
        background-color: #4CAF50;
    }
</style>


<div id="past_text"></div>
<br>
<!-- 今日剩余 -->
<div class="progress-bar" id="today-bar">
    <div class="progress-bar-inner" id="today-bar-inner"></div>
</div>

<h3>我的此生</h3>
<!-- 人生格子 -->
<table id="myTable">
    <tbody></tbody>
</table>


<table>
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
            newCell.style.backgroundColor = "#D2B48C";
        } else if (newCellIdx == currentCellIdx) {
            nowCell = newCell; // 记录下来，在下面的函数中使其闪烁
        } else if (newCellIdx <= 65 * 5) {
            newCell.style.backgroundColor = "#4CAF50"
        } else {
            newCell.style.backgroundColor = "#C0C0C0"
        }
        // newCell.innerHTML = newCellIdx;
    }

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

// 人生格子用的闪烁效果
let flag = 0;
function lifeBlink() {
    // 当前对应的格子要闪烁
    if (flag == 0) {
        nowCell.style.backgroundColor = "#D2B48C";
        flag = 1;
    } else {
        nowCell.style.backgroundColor = "#4CAF50";
        flag = 0;
    }
}

setInterval(myTick, 50);
setInterval(lifeBlink, 300);
</script>