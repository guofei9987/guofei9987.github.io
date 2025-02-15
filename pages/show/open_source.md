---
layout: post_pure
title: 开源
permalink: /open_source.html
name: 开源
---


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

