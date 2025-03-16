---
layout: post_pure
title: 【归档】趣文(16篇)
categories: 合集
tags:
keywords:
description:
name: 趣文
permalink: /:title:output_ext
order: 19003
---


{% assign category_name = page.name %}

共 {{site.categories[category_name].size}} 篇

{% for post in site.categories[category_name] %}
  <li>
    <span>{{ post.date | date: "%Y年-%m月-%d日" }}</span> &raquo;
    <a href="{{ post.url }}">{{post.title}}</a>
  </li>
{% endfor %}

