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


## 用尖括号>实现的引用


> 用两个星号加粗，中间无须空格：
你要做一个**不动声色**的大人了. 不准情绪化, 不准偷偷想念, 不准回头看. 去过自己另外的生活. 你要听话, 不是所有的鱼都会生活在同一片海里.

## 使用空格实现引用效果

	'{
	    "src": "/home/your/sync\_dir",
	    "dest": "qiniu:access\_key=<AccessKey>&secret\_key=<SecretKey>&bucket=<Bucket>&key\_prefix=<KeyPrefix>&threshold=<Threshold>",
	    "debug\_level":  1
	}

使用三个引号实现引用```abc```

使用三个引号实现段落引用:


```
{
  "src": "/home/your/sync\_dir",
  "dest": "qiniu:access\_key=<AccessKey>&secret\_key=<SecretKey>&bucket=<Bucket>&key\_prefix=<KeyPrefix>&threshold=<Threshold>",
  "debug\_level":  1
}
```


使用单引号实现的`引用`
