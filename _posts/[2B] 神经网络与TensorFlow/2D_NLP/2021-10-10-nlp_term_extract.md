---
layout: post
title: 【NLP】关键词提取
categories:
tags: 2-4-NLP
keywords:
description:
order: 341
---

任务：给出一段文字，提取其关键字。

## 基于 TF-IDF 的关键词提取

一个很直观的判断：一段文字中，哪个词越多，这个词就是关键词。

问题：高频词不等于关键词
1. 很可能 “的” 是高频的
2. 既是去除这些无意义词，也可能有问题。例如某个体育网站在奥运会期间，可能所有的文章中，“奥运会”都是高频词。

以上两个问题用 TF-IDF 解决。

## TF-IDF

略

## TextRank

解决问题：我们没有海量语料如何办？

1. 我们知道 PageRank，根据链接，形成一个图。然后根据这个图，计算每个页面的重要程度。
2. 文本复用类似的思路。一个词是一个“页面”，一个 2-gram 构成一个 “链接”。然后得到一个 Graph，进而计算得到每个词的重要程度。

[代码](https://github.com/hankcs/HanLP/blob/v1.7.5/src/test/java/com/hankcs/book/ch08/DemoPlane.java)
