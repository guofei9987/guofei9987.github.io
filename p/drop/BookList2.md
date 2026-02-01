---
layout: reading
title: 读完的书单
permalink: /books.html
---

<link rel="stylesheet" href="/c/book_list.css">

📖 读书 {{ site.data.book_list.size }} 本，[读书笔记](https://www.guofei.site/reading.html) {{ site.data.cnt_reading_words.cnt_reading_words_precision }}字

<hr>

{% for book in site.data.book_list %}
  
<div class="book_list">
  <table>
  <caption>{{ book.name }}</caption>
    <tbody>
      <tr>
        <td class="book-list__label">阅毕时间</td>
        <td class="book-list__value">{{ book.finish_date }}</td>
        <td class="book-list__label">我的打分</td>
        <td class="book-list__value"><span class="book-list__score">{{ book.score }}</span></td>
      </tr>
      <tr>
        <td class="book-list__label">出版商</td>
        <td class="book-list__value">{{ book.publisher }}</td>
        <td class="book-list__label">作者</td>
        <td class="book-list__value">{{ book.author }}</td>
      </tr>
      <tr>
        <td class="book-list__label">读书笔记</td>
        <td class="book-list__link" colspan="3"><a href="https://www.guofei.site/reading.html" title="https://www.guofei.site/reading.html">点击查看</a></td>
      </tr>
      <tr>
        <td class="book-list__label">简评</td>
        <td class="book-list__comment" colspan="3">{{ book.comments }}</td>
      </tr>
    </tbody>
  </table>
</div>
{% endfor %}
