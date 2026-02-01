---
layout: reading
title: 读完的书单
permalink: /books.html
---

<link rel="stylesheet" href="/c/card.css">
<script src="/c/card-list.js"></script>

📖 读书 {{ site.data.book_list.size }} 本，[读书笔记](https://www.guofei.site/reading.html) {{ site.data.cnt_reading_words.cnt_reading_words_precision }}字

<hr>

<div class="card-wrap">
  <div class="card-topbar">
    <div class="card-filter" id="book-filter">
      <span class="card-chip active" data-cat="all">全部 <span class="num">0</span></span>
      <span class="card-chip heart" data-cat="❤❤❤❤❤">❤❤❤❤❤<span class="num">0</span></span>
      <span class="card-chip heart" data-cat="❤❤❤❤">❤❤❤❤<span class="num">0</span></span>
      <span class="card-chip heart" data-cat="❤❤❤">❤❤❤<span class="num">0</span></span>
      <span class="card-chip heart" data-cat="❤❤">❤❤<span class="num">0</span></span>
      <span class="card-chip heart" data-cat="❤">❤<span class="num">0</span></span>
    </div>
    <div class="card-count" id="book-count">共 0 本 | 当前筛选 0 本</div>
  </div>

  <div class="card-grid cols-4" id="book-grid">
    {% for book in site.data.book_list %}
    {% assign score = book.score %}
    <article class="card-item book-item" data-cat="{{ score }}">
      <div class="card-body">
        <div class="card-title">{{ book.name }}</div>
        <div class="card-subtitle">{{ book.author }} · {{ book.publisher }}</div>
        <div class="card-meta">阅毕：{{ book.finish_date }} | 评分：<span class="heart">{{ book.score }}</span></div>
        {% if book.comments %}
        <div class="card-description">{{ book.comments }}</div>
        <div class="card-links"><a href="https://www.guofei.site/reading.html" title="读书笔记">读书笔记</a></div>
        {% endif %}
      </div>
    </article>
    {% endfor %}
  </div>
</div>

<script>
cardList.bindFilter({
  filterSel: '#book-filter .card-chip',
  gridSel: '#book-grid',
  itemCls: '.book-item',
  countSel: '#book-count',
  countText: (t,v)=>`共 ${t} 本 | 当前筛选 ${v} 本`,
  hashPrefix: '#book-'
});
</script>
