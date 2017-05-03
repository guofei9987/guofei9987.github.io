---
layout: post
title: Mac安装unrar和rar解压缩工具
category: 技术
tags: Mac
keywords: 
description: 
---

###问题描述
Mac不能解压rar文件，但实际中会需要这项功能。比如从邮件中的附件时常以rar文件格式传输。

###步骤

1. 进入[rarlab](http://www.rarlab.com/download.htm)下载`RAR 5.20 beta 1 for Mac OS X`
2. 打开Mac终端，执行解压缩命令：tar xvfz rarosx-5.2.b1.tar进行解压
3. 进入刚刚解压的rar目录中，cd downloads/rar
4. 在rar目录下使用如下命令进行安装

```
sudo install -c -o$USER unrar /bin
sudo install -c -o$USER rar /bin
```

###解压与压缩

```
unrar x filename.rar             #解压
rar a archivename.rar filename   #压缩
```

###后记
为什么要折腾这个，因为今天收到一份rar格式的文件。
转眼一年了，好快啊。这是要每年送我一个生日蛋糕的节奏吗？如果是的话，这篇博客需要每年更新一次。
####2013年
![1](/public/img/birthday/1.jpg)
####2014年
![2](/public/img/birthday/2.jpg)
####2015年
![3](/public/img/birthday/3.jpg)



###谢意
蒲俊楠童鞋，阿里嘎多~


