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








## 正在学习

！网易公开课也能用



- 数据库原理 https://www.icourse163.org/course/PAEU-1003647009
- 计算机网络：https://www.icourse163.org/course/HIT-154005
- 网络技术与应用：https://www.icourse163.org/course/NJUPT-1001639008
- 软件工程：https://www.icourse163.org/course/PKU-1003177002

- 音乐鉴赏：https://www.icourse163.org/course/XJTU-1002530012





**学完，等待成绩**
- 宝石鉴赏：https://www.icourse163.org/course/ZGDZDXBJ-1206419805


## 学完，但未开课

健身课程：
- https://www.icourse163.org/course/BFU-1205985806
- https://www.icourse163.org/course/SWPU-1449561166
- https://www.icourse163.org/course/PKU-1205824813

击剑
- https://www.icourse163.org/course/BSU-1207419808
- https://www.icourse163.org/course/BSU-1207419808








## 等待开课



软件工程-哈工大
- https://www.icourse163.org/course/HIT-298007



编译原理（二选一）
- 哈工大：https://www.icourse163.org/course/HIT-1002123007
- 国防科技大：https://www.icourse163.org/course/NUDT-1003101005



## 其它可能学

网络攻防技术
- https://www.icourse163.org/course/ZIIT-1206699813


## 学完，但是错过开课时机的

信息隐藏技术
- https://www.icourse163.org/course/SEU-1468757162
- B站上的一个隐写术课程：- https://www.bilibili.com/video/BV1hf4y1P7KY