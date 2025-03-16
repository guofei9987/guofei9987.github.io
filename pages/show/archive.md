---
layout: post_pure
title: 归档
permalink: /archive.html
name: 合集
---


<ul>
{% for category in site.categories %}
{% if category[0] == '合集' %}
{% assign sorted_tag = category[1] | sort:"order" %}
{% for post in sorted_tag %}
<li><a href="{{ post.url }}">{{post.title}}</a></li>
{% endfor %}
{% endif %}
{% endfor %}
</ul>