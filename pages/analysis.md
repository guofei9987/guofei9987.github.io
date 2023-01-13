---
layout: page
title: 分析
---


<table>
<tr>
  <th>Project</th>
  <th>fork</th>
  <th>Star</th>
  <th>Fork</th>
  <th>language</th>
  <th>description</th>
</tr>

{% assign sorted_repos = (site.github.public_repositories | sort: 'stargazers_count') | reverse %}
{% for repo in sorted_repos  %}
<tr>
  <td><a href="{{ repo.html_url }}">{{ repo.name }}</a></td>
  <td>{{ repo.fork }}</td>
  <td>☆{{ repo.stargazers_count }}</td>
  <td><img alt="fork:" src="https://www.guofei.site/public/icon/fork.svg">{{ repo.forks_count }}</td>
  <td>{{repo.language}}</td>

  <td>{{ repo.description }}</td>
</tr>
{% endfor %}
</table>

-----------------------

{% assign total_star=0%}
{% for repo in sorted_repos  %}
{% assign total_star= (total_star|plus repo.stargazers_count)%}
{% endfor %}

total_star: {{total_star}}
