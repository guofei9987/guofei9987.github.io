---
layout: page
title: Open Source/开源
permalink: /open_source.html
name: 开源
---

<div id="sidebar_type" class="open_source"></div>
<br>
<object data="/pages/trophy.svg" style="width: 100%;max-width: 550px;"></object>
<br>


| Project | Document |
|---------|----------|
| [![scikit-opt](https://www.guofei.site/public/icon/scikit-opt.svg)](https://github.com/guofei9987/scikit-opt)| [Documentation](https://www.guofei.site/os/sko_en.html) <br> [中文文档](https://www.guofei.site/os/sko_zh.html) |
| [![blind_watermark](https://www.guofei.site/public/icon/blind_watermark.svg)](https://github.com/guofei9987/blind_watermark) | [Documentation](https://www.guofei.site/os/bw_en.html) <br> [中文文档](https://www.guofei.site/os/bw_zh.html)
| [![](https://www.guofei.site/public/icon/hidden_watermark.svg)](https://github.com/guofei9987/hidden_watermark)  <br> [![](https://www.guofei.site/public/icon/text_blind_watermark.svg)](https://github.com/guofei9987/text_blind_watermark)| [文档](https://www.guofei.site/os/text_wm.html) |
| [![](https://www.guofei.site/public/icon/HideInfo.svg)](https://github.com/guofei9987/HideInfo) | [文档](https://www.guofei.site/os/hide_info.html) |








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
  <td><img class="icon" src="/public/logo/star.svg">{{ repo.star_cnt }}</td>
  <td><img class="icon" src="/public/logo/fork.svg">{{ repo.fork_cnt }}</td>
  <td>{{ repo.description }}</td>
</tr>
{% endfor %}
</table>




{% for category in site.categories %}
{% if category[0] == '开源' %}
{% assign sorted_tag = category[1] | sort:"order" %}
{% for post in sorted_tag %}

{% if post.repo_name %}
    {% assign this_repo = site.data.data_github.repo_list | where: "name", post.repo_name | first%}
<a href="{{ post.url }}">【☆{{ this_repo.star_cnt }}】{{post.title}} </a>
{% else %}
<a href="{{ post.url }}">{{post.title}}</a>
{% endif %}

{% endfor %}
{% endif %}
{% endfor %}
