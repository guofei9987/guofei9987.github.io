---
layout: page
title: 分析
---


<object data="https://www.guofei.site/pages/trophy.svg"></object>


- [![rank](https://github.com/gf99/sn/blob/master/data/rank.svg?raw=true)](https://gitstar-ranking.com/guofei9987)，![rank](https://github.com/gf99/sn/blob/master/data/star.svg?raw=true)
- <a href="https://www.zhihu.com/people/guofei9987/answers/by_votes" target="_blank"><img alt="Blog Counts" src="https://www.guofei.site/guofei9987/zhihu.svg"></a>
- <a href="https://www.zhihu.com/people/guofei9987/answers/by_votes" target="_blank"><object data="https://www.guofei.site/guofei9987/zhihu.svg"></object></a>



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
  <th>Project 数量 {{ site.data.data_github.repo_list.size }} </th>
  <th>fork</th>
  <th>Star</th>
  <th>Fork</th>
  <th>language</th>
  <th>description</th>
</tr>

{% for repo in site.data.data_github.repo_list  %}
<tr>
  <td><a href="{{ repo.url }}">{{ repo.name }}</a></td>
  <td>{{ repo.is_fork }}</td>
  <td>☆{{ repo.star_cnt }}</td>
  <td><img alt="fork:" src="https://www.guofei.site/public/icon/fork.svg">{{ repo.fork_cnt }}</td>
  <td>{{repo.language}}</td>

  <td>{{ repo.description }}</td>
</tr>
{% endfor %}
</table>
