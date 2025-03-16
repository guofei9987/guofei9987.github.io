---
layout: reading
title: 读完的书单
permalink: /BookList.html
---

📖 读书 {{ site.data.book_list.size }} 本，[读书笔记](https://www.guofei.site/reading.html) {{ site.data.cnt_reading_words.cnt_reading_words_precision }}字

<br>
<hr>
<br>

{% for book in site.data.book_list %}
  
<div class="book_list">
  <table>
  <caption>{{ book.name }}</caption>
    <tbody>
      <tr>
        <td style="width:70px;">阅毕时间</td>
        <td style="width:120px;">{{ book.finish_date }}</td>
        <td style="width:70px;">我的打分</td>
        <td style="width:120px;"><font color="red">{{ book.score }}</font></td>
      </tr>
      <tr>
        <td>出版商</td>
        <td>{{ book.publisher }}</td>
        <td>作者</td>
        <td>{{ book.author }}</td>
      </tr>
      <tr>
        <td>读书笔记</td>
        <td colspan="3"><a href="https://www.guofei.site/reading.html" title="https://www.guofei.site/reading.html">点击查看</a></td>
      </tr>
      <tr>
        <td>简评</td>
        <td colspan="3">{{ book.comments }}</td>
      </tr>
    </tbody>
  </table>
</div>
{% endfor %}
