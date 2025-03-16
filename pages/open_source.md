---
layout: open_source
title: Open Source/开源
permalink: /open_source.html
name: 开源
---

<object data="https://www.guofei.site/pages/trophy.svg"></object>


## Open Source(我的开源)


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

