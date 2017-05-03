---
layout: post
title: 在Mac上用LaTeX写漂亮的简历
category: 技术
tags: LaTeX Mac
keywords: 报告总结
description: 
---


![1](/public/img/posts/resume.jpg)

你会搜索查看到这篇文章，相信就不需要我解释为什么要用LaTeX写Resume了：）

今晚报名Facebook China Tech Talk，最后一步需要上传简历。看着已经2年没有更新过的简历，好捉急。那时真是年轻，不舍得做减法，恨不能一张A4纸写尽一生。于是索性重新制作一份简历。

###需要准备

- 安装好的LaTeX，如果没有安装请参考[在Mac上通过Sublime、Skim编辑LaTeX](http://painterlin.com/2014/08/10/Using-LaTeX-with-Sublime-and-Skim-for-Mac.html)
- 互联网

###资料
- [Using the LaTeX Resume Templates](http://www.rpi.edu/dept/arc/training/latex/resumes/)
- [LaTeX Templates](http://www.latextemplates.com/cat/curricula-vitae)

###步骤
- 在上述资料中寻找自己喜欢的模板
- 下载模板对应的tex文件
- 用LaTeX打开对应文件，编辑，编译

这个时候，如果你使用的是Mac系统，非常不幸，大多数情况下都将编译失败。因为网上多数模板需要使用windows环境下的Tex应用程序，而Mac环境下MacTex应用程序会缺少部分文件。没关系，我们有办法解决。

###解决方案一：moderncv
- 进入[http://www.ctan.org/pkg/moderncv ](http://www.ctan.org/pkg/moderncv )下载`moderncv package`
- 解压，找到模板文件`template.tex`
- 用已经安装好的LaTeX打开模板文件，编辑，编译，成功

但是呢，我个人觉得moderncv模板并不够好，虽然其结构清新简洁，但布局过于稀疏。没关系，我们仍然有办法。感谢一个我无意中发现的网站：ShareLaTeX.com

###解决方案二：ShareLaTeX.com
也许你在上面的资料中找到了你最喜欢的模板，却苦于在Mac OS X系统下无法编译成功。这时可以求助于[ShareLaTeX](https://www.sharelatex.com/)，这是一个在线LaTeX编辑网站，并且提供`Resume`,`Cover Letter`,`Journal Article`,`Presentation`,`Thesis`,`Bibliographies`等不同分类的多种模板。最重要的一点事，只需要确定Latex语法无误，再也不需担心什么编译环境、文件缺失等乱七八糟的问题。

- 进入[ShareLaTeX](https://www.sharelatex.com/)，注册账号
- 点击`New Project`，选择`CV or Resume`，挑选你喜欢的简历模板
- 根据自己的情况编辑，自动或手动编译，保存PDF

###后记
既然写到这里了，还想讲讲自己对于简历的体会。但我真的是困得不行了。。。。北京第一次不归夜。。。改天再来补全。。。。









