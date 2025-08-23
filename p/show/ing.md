---
layout: post_pure
title: 【学习中】
categories: 合集
tags:
val: 学习中
permalink: /ing.html
---

{% assign category_name = page.val %}

共 {{site.categories[category_name].size}} 篇

{% for post in site.categories[category_name] %}
  <li>
    <span>{{ post.date | date: "%Y年-%m月-%d日" }}</span> &raquo;
    <a href="{{ post.url }}">{{post.title}}</a>
  </li>
{% endfor %}







