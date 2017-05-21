---
layout: post
title: blog语法示例.
categories: Geek
tags: 文档语法示例
keywords:
description:
---

用来记录blog的语法

下面是一些格式举例

## 插入照片并预设照片大小
```
<img width="300" height="400" alt="A photo of Guofei" src="http://i.imgur.com/Sus27p8.jpg">
```

效果：

<img width="300" height="400" alt="A photo of Guofei" src="http://i.imgur.com/Sus27p8.jpg">


## 插入音乐

```
{% raw %}
<iframe frameborder="20" border="20" marginwidth="10" marginheight="0" width="298" height="80" src="http://www.guofei.site/public/assets/追梦人.mp3"></iframe>
{% endraw %}
```

效果：



{% raw %}
<iframe frameborder="20" border="20" marginwidth="10" marginheight="0" width="298" height="80" src="http://www.guofei.site/public/assets/追梦人.mp3"></iframe>
{% endraw %}



音乐会自动播放

## 插入视频
{% raw %}
<div class="embed-responsive embed-responsive-16by9"><iframe height=498 width=510 src="http://player.youku.com/embed/XNTE1NjQ5MzY4" frameborder=0 allowfullscreen></iframe></div>
{% endraw %}
