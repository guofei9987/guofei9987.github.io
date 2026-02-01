---
layout: reading
title: 读完的书单
permalink: /BookList.html
---

<link rel="stylesheet" href="/c/card.css">
<script src="/c/card-list.js"></script>

📖 读书 {{ site.data.book_list.size }} 本，[读书笔记](https://www.guofei.site/reading.html) {{ site.data.cnt_reading_words.cnt_reading_words_precision }}字

<hr>

<div class="card-wrap">
  <div class="card-grid cols-4">
    {% for book in site.data.book_list %}
    <article class="card-item">
      <div class="card-body">
        <div class="card-title">{{ book.name }}</div>
        <div class="card-subtitle">{{ book.author }} · {{ book.publisher }}</div>
        <div class="card-meta">阅毕：{{ book.finish_date }} | 评分：<span style="color:#d93025; font-weight:700;">{{ book.score }}</span></div>
        {% if book.comments %}
        <div class="card-description">{{ book.comments }}</div>
        <div class="card-links"><a href="https://www.guofei.site/reading.html" title="读书笔记">读书笔记</a></div>
        {% endif %}
      </div>
    </article>
    {% endfor %}
  </div>
</div>
