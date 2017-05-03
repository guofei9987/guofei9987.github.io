---
layout: post
title: Yosemite OS X 10.10 Matlab 2012a停止工作的解决办法 
category: 技术
tags: Mac Matlab
keywords: 
description: 
---

###问题描述
OS X 系统更新到Yosemite后，Matlab 2012a就无法运行了。

###解决步骤

1. 进入[XQuartz](http://xquartz.macosforge.org/landing/)下载`XQuartz-2.7.7.dmg`，并安装更新。
2. 打开Mac终端，执行命令：`
	sudo ln -s /opt/X11/ /usr/X11
	`
3. 下载并安装[Java 6](http://support.apple.com/kb/DL1572)更新。

###完成✌️
OK，现在Matlab就能重新工作了。

###参考文章

[1][ running svreg and bdp on yosemite (os x 10.10)](http://brainsuite.org/quickstart/installation/mac/yosemite/)
