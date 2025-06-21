---
layout: post_pure
title: 📢 小郭微博
permalink: /microblog.html
---


<style>
body {max-width: 800px; margin: auto; padding: 20px; }
.entry { border-bottom: 1px solid #eee; padding: 10px 0; opacity: 0; transform: translateY(10px); transition: opacity 0.5s ease, transform 0.5s ease; }
.entry.show { opacity: 1; transform: translateY(0); }
.time { color: #888; font-size: 16px; margin-bottom: 5px; }
.content { font-size: 20px; font-weight: 500; line-height: 1.4; }
#loadMore { display: block; margin: 20px auto; padding: 10px 20px; font-size: 16px; border: none; border-radius: 5px; background-color: #f0f0f0; cursor: pointer; transition: background-color 0.3s ease; }
#loadMore:hover { background-color: #ddd; }
#loadMore:disabled { background-color: #eee; color: #888; cursor: default; }
</style>




<div id="entries"></div>
<button id="loadMore">查看更多</button>
<script>
const entriesContainer = document.getElementById('entries');
const loadMoreBtn = document.getElementById('loadMore');

let pageSize = 30;
let loadCount = 0;
let dataPrimary = [];
let dataSecondary = [];
let index = 0;
let secondaryLoaded = false;

async function loadJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('无法加载数据');
    return await response.json();
}

async function init() {
    // 加载首屏 json
    dataPrimary = await loadJson('/pages/weibo/part1.json');
    renderEntries();

    // 预加载第二个 json
    loadJson('/pages/weibo/part2.json').then(data => {
    dataSecondary = data;
    secondaryLoaded = true;
    }).catch(() => console.log('未加载 part2.json'));
}

function renderEntries() {
    let count = 0;
    while (index < dataPrimary.length && count < pageSize) {
    const entry = dataPrimary[index];
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `<div class="time">${entry.time}</div><div class="content">${entry.content}</div>`;
    entriesContainer.appendChild(div);
    setTimeout(() => div.classList.add('show'), 10);
    index++;
    count++;
    }
    if (index >= dataPrimary.length && dataSecondary.length > 0) {
    // 切换到 secondary data
    dataPrimary = dataSecondary;
    index = 0;
    dataSecondary = [];
    } else if (index >= dataPrimary.length && !secondaryLoaded) {
    loadMoreBtn.textContent = '没有更多了';
    loadMoreBtn.disabled = true;
    }
}

loadMoreBtn.addEventListener('click', async () => {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = '加载中...';
    await new Promise(r => setTimeout(r, 300));
    renderEntries();
    loadMoreBtn.disabled = false;
    loadCount++;
    pageSize = loadCount >= 2 ? 100 : 30;
    if (index >= dataPrimary.length && dataSecondary.length === 0) {
    loadMoreBtn.textContent = '没有更多了';
    loadMoreBtn.disabled = true;
    } else {
    loadMoreBtn.textContent = '查看更多';
    }
});

init();
</script>