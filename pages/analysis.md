---
layout: page
title: 分析
---


<object data="https://www.guofei.site/pages/trophy.svg"></object>


- [![rank](https://github.com/gf99/sn/blob/master/data/rank.svg?raw=true)](https://gitstar-ranking.com/guofei9987)，![rank](https://github.com/gf99/sn/blob/master/data/star.svg?raw=true)
- <a href="https://www.zhihu.com/people/guo-fei-16-12/answers/by_votes" target="_blank"><img alt="Blog Counts" src="https://www.guofei.site/guofei9987/zhihu.svg"></a>
- <a href="https://www.zhihu.com/people/guo-fei-16-12/answers/by_votes" target="_blank"><object data="https://www.guofei.site/guofei9987/zhihu.svg"></object></a>



<object data="https://github.com/gf99/sn/blob/master/data/text.svg?raw=true"></object>
<object data="https://github.com/gf99/sn/blob/master/data/sko.svg?raw=true"></object>
<object data="https://github.com/gf99/sn/blob/master/data/bw.svg?raw=true"></object>



![rank](https://github.com/gf99/sn/blob/master/data/text.svg?raw=true)

![sko](https://github.com/gf99/sn/blob/master/data/sko.svg?raw=true)

![bw](https://github.com/gf99/sn/blob/master/data/bw.svg?raw=true)

库：https://github.com/gf99/sn

--------


7. {{site.data.achievement}}




------------------

<table>
<tr>
  <th>Project 数量 {{ site.github.public_repositories.size }} </th>
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
