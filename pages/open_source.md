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
