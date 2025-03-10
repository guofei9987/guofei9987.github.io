---
layout: reading_index
title: 读书
permalink: /reading.html
---

 <style>
  .bold-black-text {
      font-weight: bold;
      color: #000;
  }
</style>

读书 <span class="bold-black-text">{{ site.data.book_list.size }}本</span>（<a href="/BookList.html">书单</a>），笔记共 <span class="bold-black-text">{{ site.data.cnt_reading_words.cnt_reading_words_precision }}字</span>


<div id="all_books"></div>

<script>
fetch('/pages/reading.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('all_books');

    data.forEach(item => {
      // 一级导航标题（板块）
      const h3 = document.createElement('h3');
      h3.textContent = item.l1;
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
      item.l2.forEach(subItem => {
        const article = subItem.l3;
        const cnt = subItem.cnt;

        const tr = document.createElement('tr');

        // 第一列：文章链接及字数
        const td1 = document.createElement('td');
        const a1 = document.createElement('a');
        a1.href = `/reading/${article}.html`;
        // 使用 innerHTML 来包含 sup 标签
        a1.innerHTML = `${article}<sup class="wordcnt">${cnt}字</sup>`;
        td1.appendChild(a1);
        tr.appendChild(td1);

        // 第二列：h2标题列表，每个标题生成一个链接
        const td2 = document.createElement('td');
        // 将每个 h2 标题生成链接，使用 encodeURIComponent 编码参数
        const h2Links = subItem.h2.map(h2 => {
          // 可选：将下划线替换为空格显示
          // const displayText = h2.replace('_', ' ');
          // return `<a href="docs/${item.l1}/${article}.md?id=${encodeURIComponent(h2)}">${displayText}</a>`;
          return `<a href="/reading/${article}.html#${encodeURIComponent(h2)}">${h2}</a>`;
        }).join('，');
        td2.innerHTML = h2Links;
        tr.appendChild(td2);

        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      container.appendChild(table);
    });
  })
  .catch(err => console.error('加载 JSON 失败：', err));
</script>
