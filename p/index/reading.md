---
layout: page
title: 读书
permalink: /reading.html
---

<div id="sidebar_type" class="reading"></div>
<br>
<object data="/trophy.svg" style="width: 100%;max-width: 550px;"></object>
<br>

<style>
.bold-black-text {
    font-weight: bold;
    color: #000;
}
</style>




<!-- ✅ 随机文章模块开始 -->
<link rel="stylesheet" href="/c/choose_one/choose_one.css">

<div class="random-container">
  <button class="random-btn" onclick="rollDiceAndRandom()">🎲</button>
  <div id="randomResult">随机文章加载中...</div>
</div>

<script src="/c/choose_one/choose_one.js"></script>
<!-- ✅ 随机文章模块结束 -->


读书 <span class="bold-black-text">{{ site.data.book_list.size }}本</span>（<a href="/books.html">书单</a>），笔记共 <span class="bold-black-text">{{ site.data.cnt_reading_words.cnt_reading_words_precision }}字</span>


<div id="all_books"></div>

<script>
window.addEventListener('sidebarDataLoaded', function() {
  const container = document.getElementById('all_books');
  const type = window.guofei.sidebarType;
  const data = window.guofei.sidebarData;
  container.innerHTML = '';

  data.forEach(item => {
      const [l1, l2List] = item; // 解构一级分类名和二级列表

      // 一级导航标题（板块）
      const h3 = document.createElement('h3');
      h3.textContent = l1;
      container.appendChild(h3);

      // 创建表格
      const table = document.createElement('table');
      table.innerHTML = `
        <thead>
          <tr>
            <th>板块</th>
            <th>条目</th>
          </tr>
        </thead>
      `;
      const tbody = document.createElement('tbody');

      // 遍历二级数据，每个子项对应一行
      l2List.forEach(subItem => {
        const [l3, cnt, h2List] = subItem; // 解构二级类名、字数、三级标题列表

        const tr = document.createElement('tr');

        // 第一列：文章链接及字数
        const td1 = document.createElement('td');
        const a1 = document.createElement('a');
        a1.href = `/reading/${l3}.html`;
        // 使用 innerHTML 来包含 sup 标签
        a1.innerHTML = `${l3}<sup class="wordcnt">${cnt}字</sup>`;
        td1.appendChild(a1);
        tr.appendChild(td1);

        // 第二列：h2标题列表，每个标题生成一个链接
        const td2 = document.createElement('td');
        // 将每个 h2 标题生成链接，使用 encodeURIComponent 编码参数
        const h2Links = (h2List || []).map(h2 => {
          return `<a href="/reading/${l3}.html#${encodeURIComponent(h2)}">${h2}</a>`;
        }).join('，');
        td2.innerHTML = h2Links;
        tr.appendChild(td2);

        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      container.appendChild(table);
    });
});

</script>
