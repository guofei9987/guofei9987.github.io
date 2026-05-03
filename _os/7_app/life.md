---
layout: app
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
        position: relative;
    }

    #myTable td.past {
        background-color:#D2B48C;
    }

    #myTable td.future {
        background-color:#4CAF50;
    }

    #myTable td.old {
        background-color:#C0C0C0;
    }

    #myTable td.now {
        animation: smooth-blink 500ms linear infinite;
    }

    #myTable td.event::after {
        content: attr(data-label);
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        font-size: 10px;
        padding: 2px 5px;
        border-radius: 3px;
        white-space: nowrap;
    }

    @keyframes smooth-blink {
        0%, 100% { background-color: #D2B48C; }
        50% { background-color: #4CAF50; }
    }

    #explain td{
        border: 1px solid #fff;
    }

    .progress-bar {
        width: 400px;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 10px;
        overflow: hidden;
        background-color: #4CAF50;
        position: relative;
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

<br/>

<!-- 今日剩余 -->
<div class="progress-bar bar1" id="today-bar">
    <div class="progress-bar-inner" id="today-bar-inner"></div>
</div>


<br/><br/><br/>

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
const num_cols = 20;
const num_rows = 20;
const table = document.getElementById("myTable");
const currentDate = new Date();
const pastSeconds = (currentDate.getTime() - birthDay.getTime()) / 1000;
const currentCellIdx = Math.floor(pastSeconds / 3600 / 24 / 365 / (life_span / num_cols / num_rows));

// 人生关键节点（按0.2年一个格子）
const events = {
    [Math.floor((18 / 80) * 400)]: "🎓18岁",
    [Math.floor((27 / 80) * 400)]: "👶工作-中体彩",
    [Math.floor((30 / 80) * 400)]: "💼工作-京东",
    [Math.floor((32.2 / 80) * 400)]: "🔥工作-蚂蚁"
};

for (let i = 0; i < num_rows; i++) {
    const newRow = table.insertRow();
    for (let j = 0; j < num_cols; j++) {
        const newCell = newRow.insertCell();
        const newCellIdx = i * num_cols + j;

        if (newCellIdx < currentCellIdx) {
            newCell.classList.add("past");
        } else if (newCellIdx === currentCellIdx) {
            newCell.classList.add("now");
        } else if (newCellIdx <= 65 * 5) {
            newCell.classList.add("future");
        } else {
            newCell.classList.add("old");
        }

        if (events[newCellIdx]) {
            newCell.classList.add("event");
            newCell.setAttribute("data-label", events[newCellIdx]);
        }
    }
}

function tickDay(){
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const percentLeft = (now - startOfDay) / (24 * 60 * 60 * 1000) * 100;
    const progressBar = document.getElementById("today-bar-inner");
    progressBar.style.width = percentLeft + "%";
    progressBar.innerText = "今日已用" + percentLeft.toFixed(4) + '%';
}

function tickLife() {
    const leftStats = document.querySelector('.left-stats');
    const rightStats = document.querySelector('.right-stats');
    const currentDate = new Date();
    const daysPassed = (currentDate - birthDay) / (1000 * 3600 * 24);
    const daysRemaining = (endDay - currentDate) / (1000 * 3600 * 24);

    leftStats.innerHTML = `时光已去：<br>${(daysPassed / 365).toFixed(8)} 年<br>${(daysPassed / 12).toFixed(8)} 月<br>${daysPassed.toFixed(8)} 天<br>`;
    rightStats.innerHTML = `余生还剩：<br>${(daysRemaining / 365).toFixed(8)} 年<br>${(daysRemaining / 12).toFixed(8)} 月<br>${daysRemaining.toFixed(8)} 天<br>`;

    const percentLeft = daysPassed / (daysPassed + daysRemaining) * 100;
    const progressBar = document.getElementById("life-bar-inner");
    progressBar.style.width = percentLeft + "%";
}

setInterval(tickLife, 50);
setInterval(tickDay, 50);
</script>