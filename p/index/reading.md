---
layout: page
title: 读书
permalink: /reading.html
---

<div id="sidebar_type" class="reading"></div>
<br>
<object data="/pages/trophy.svg" style="width: 100%;max-width: 550px;"></object>
<br>

<style>
.bold-black-text {
    font-weight: bold;
    color: #000;
}
</style>

读书 <span class="bold-black-text">{{ site.data.book_list.size }}本</span>（<a href="/BookList.html">书单</a>），笔记共 <span class="bold-black-text">{{ site.data.cnt_reading_words.cnt_reading_words_precision }}字</span>



<!-- ✅ 随机文章模块开始 -->
<style>
.random-container {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f9f9f9;
  padding: 10px 14px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.random-btn {
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2em;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.random-btn:hover {
  background-color: #005fa3;
}

.random-btn.spin {
  animation: spin 0.6s linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(720deg); }
}

#randomResult a {
  color: #007acc;
  text-decoration: none;
  font-weight: 500;
}

#randomResult a:hover {
  text-decoration: underline;
}
</style>

<div class="random-container">
  <button class="random-btn" onclick="rollDiceAndRandom()">🎲</button>
  <div id="randomResult">随机文章加载中...</div>
</div>


<script>
function rollDiceAndRandom() {
  const btn = document.querySelector('.random-btn');
  btn.classList.add('spin');

  // 移除动画 class 以便下次点击可重新触发
  btn.addEventListener('animationend', () => {
    btn.classList.remove('spin');
  }, { once: true });

  // 触发 random
  window.dispatchEvent(new Event('sidebarDataLoaded'));
}

window.addEventListener('sidebarDataLoaded', function() {
  const type = window.guofei.sidebarType;
  const data = window.guofei.sidebarData;
  let posts = [];

  if (type === 'reading') {
    data.forEach(cat => {
      if (cat.l2 && Array.isArray(cat.l2)) {
        posts = posts.concat(cat.l2);
      }
    });
  } else {
    data.forEach(cat => {
      if (cat.posts && Array.isArray(cat.posts)) {
        posts = posts.concat(cat.posts);
      }
    });
  }

  if (posts.length === 0) {
    document.getElementById('randomResult').textContent = '未找到文章';
    return;
  }

  const post = posts[Math.floor(Math.random() * posts.length)];
  let title = '';
  let link = '';

  if (type === 'reading') {
    title = post.l3.replace('.md', '');
    link = '/reading/' + title + '.html';
    if (post.h2 && post.h2.length > 0) {
      const randomH2 = post.h2[Math.floor(Math.random() * post.h2.length)];
      title += ' #' + randomH2;
      link += '#' + encodeURIComponent(randomH2);
    }
  } else {
    title = post.title || '无标题';
    link = post.url || '#';
  }

  document.getElementById('randomResult').innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
});
</script>

<!-- ✅ 随机文章模块结束 -->



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
