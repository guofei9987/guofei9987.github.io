---
layout: post_pure
title: 归档
permalink: /archive.html
name: 合集
---


{% for category in site.categories %}
{% if category[0] == '合集' %}
{% assign sorted_tag = category[1] | sort:"order" %}
{% for post in sorted_tag %}
{% if site.categories[post.name] %}
<a href="{{ post.url }}">{{post.title}} （{{ site.categories[post.name].size }} 篇）</a>
{% else %}
<a href="{{ post.url }}">{{post.title}}</a>
{% endif %}
{% endfor %}
{% endif %}
{% endfor %}
