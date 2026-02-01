---
layout: open_source
title: Open Source/开源
permalink: /open_source.html
name: 开源
---

<link rel="stylesheet" href="/c/card.css">
<script src="/c/card-list.js"></script>

<div id="sidebar_type" class="open_source"></div>
<br>
<object data="/trophy.svg" style="width: 100%;max-width: 550px;"></object>
<br>

<div class="card-wrap">
  <div class="card-topbar">
    <div class="card-filter" id="open-source-filter">
      <span class="card-chip active" data-cat="all">全部 <span class="num">0</span></span>
      <span class="card-chip" data-cat="tool">工具 <span class="num">0</span></span>
      <span class="card-chip" data-cat="project">项目 <span class="num">0</span></span>
    </div>
    <div class="card-count" id="open-source-count">共 0 个 | 当前筛选 0 个</div>
  </div>

  <div class="card-grid cols-4" id="open-source-grid">
    {% for tool in site.data.tools %}
    <article class="card-item" data-cat="{{ tool.cat }}">
      <div class="card-body">
        <div class="card-title">
        <a href="{{ tool.url }}">
          {% if tool.icon %}<img src="{{ tool.icon }}" alt="{{ tool.name }}">{% else %} {{ tool.name }} {% endif %}
        </a>
        </div>
        {% if tool.description %}}<div class="card-subtitle">{{ tool.description }}</div>{% endif %}
        <div class="card-links">
          {% for link in tool.links %}
          <a href="{{ link.url }}" title="{{ link.text }}">{{ link.text }}</a>
          {% endfor %}
        </div>
      </div>
    </article>
    {% endfor %}
  </div>
</div>

<script>
cardList.bindFilter({
  filterSel: '#open-source-filter .card-chip',
  gridSel: '#open-source-grid',
  itemCls: '.card-item',
  countSel: '#open-source-count',
  countText: (t,v)=>`共 ${t} 个 | 当前筛选 ${v} 个`,
  hashPrefix: '#os-'
});
</script>





数量统计：

<table>
<tr>
  <th>Project</th>
  <th>Star {{ site.data.data_github.star_cnt }}</th>
  <th>Fork {{ site.data.data_github.fork_cnt }}</th>
  <th>description</th>
</tr>

{% assign filtered_repos = site.data.data_github.repo_list | where: "is_fork", false | where_exp: "repo", "repo.star_cnt >= 20" %}


{% for repo in filtered_repos %}
<tr>
  <td><a href="{{ repo.url }}">{{ repo.name }}</a></td>
  <td><img class="icon" src="/p/logo/star.svg">{{ repo.star_cnt }}</td>
  <td><img class="icon" src="/p/logo/fork.svg">{{ repo.fork_cnt }}</td>
  <td>{{ repo.description }}</td>
</tr>
{% endfor %}
</table>


