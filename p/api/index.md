---
layout: post_pure
title: 数据接口说明
permalink: /api/
order: 9999
---

## 📊 个人网站数据接口说明

本站除展示文章外，还公开部分结构化数据，存放于 **/api/** 目录下，以 JSON 为主，供站内脚本与外部程序读取使用。  
这些文件不仅是网站内容的底层数据源，也记录着个人的**学习轨迹、成长进步与思考足迹**，见证知识体系的不断演化。

## 一、设计原则

- **公开透明**：数据化自己，用可追溯的方式记录学习、创作与成长。  
- **可复用**：允许任何人在合理引用的前提下使用这些数据。  
- **持续演化**：以长期主义为信念，让数据在时间中积累、更新与生长。  


## 二、文件列表

| 文件 | 说明 | 主要字段 |
|------|------|----------|
| [`/tags.json`](https://www.guofei.site/tags.json) | 技术文章索引，按标签分类，每个标签包含若干 `[标题, URL]` | `[[tag_name, [[title, url], … ]], …]` |
| [`/reading.json`](https://www.guofei.site/reading.json) | 阅读笔记索引，分领域、子领域及条目 | `[[领域, [[子领域, 字数, [条目] ], …]], …]` |
| [`/api/book_list.json`](https://www.guofei.site/api/book_list.json) | 阅读书单，含评分与简评 | `title`, `author`, `publisher`, `finish_date`, `rating`, `comment`, `note` |
| [`/api/cnt_github_repo.json`](https://www.guofei.site/api/cnt_github_repo.json) | GitHub 仓库统计信息 | `repo`, `stars`, `forks`, `language`, … |
| [`/api/achievement.json`](https://www.guofei.site/api/achievement.json) | 综合统计数据：博客数、读书数、知乎赞同数、Star 数等 | 各项计数值 |
| [`/api/certification.json`](https://www.guofei.site/api/certification.json)（规划中） | 职业与专业证书 | `category`, `title`, `organization`, `link`, `image` |


## 三、示例用法
```bash
# 下载书单
curl https://www.guofei.site/api/book_list.json -o book_list.json
```