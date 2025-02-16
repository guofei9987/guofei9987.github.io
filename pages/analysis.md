---
layout: page
title: 分析
---




- 🔭 [技术博客](https://www.guofei.site/) 累积 {{ site.posts.size }} 篇
- 📖 读书 {{ site.data.book_list.size }} 本，[读书笔记](https://www.guofei.site/reading/#/) {{ site.data.cnt_reading_words.cnt_reading_words }}
- {{site.data.achievement}}


<object data="https://www.guofei.site/pages/trophy.svg"></object>



[![Star History Chart](https://api.star-history.com/svg?repos=guofei9987/blind_watermark,guofei9987/scikit-opt,guofei9987/text_blind_watermark&type=Date)](https://star-history.com/#guofei9987/blind_watermark&guofei9987/scikit-opt&guofei9987/text_blind_watermark&Date)



------------------

<table>
<tr>
  <th>Project 数量 {{ site.data.data_github.repo_list.size }} </th>
  <th>fork</th>
  <th>Star {{ site.data.data_github.star_cnt }}</th>
  <th>Fork {{ site.data.data_github.fork_cnt }}</th>
  <th>open issues</th>
  <th>language</th>
  <th>description</th>
</tr>

{% for repo in site.data.data_github.repo_list  %}
<tr>
  <td><a href="{{ repo.url }}">{{ repo.name }}</a></td>
  <td>{{ repo.is_fork }}</td>
  <td>☆{{ repo.star_cnt }}</td>
  <td><img alt="fork:" src="https://www.guofei.site/public/logo/fork.svg">{{ repo.fork_cnt }}</td>
  <td>{{ repo.open_issues_count }}</td>
  <td>{{repo.language}}</td>

  <td>{{ repo.description }}</td>
</tr>
{% endfor %}
</table>



-------------------


网站 api：
- https://www.guofei.site/pages/achievement.json
- https://www.guofei.site/pages/book_list.json
- https://www.guofei.site/pages/cnt_github_repo.json
- https://www.guofei.site/tags.json
- https://www.guofei.site/pages/reading.json
