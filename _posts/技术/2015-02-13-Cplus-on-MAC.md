---
layout: post
title: Mac以及Windows上搭建C++工作环境
category: 技术
tags: Mac
keywords: 
description: 
---

实验室里我申请的垃圾老爷机被师弟玩坏了，弄了一天，最后发现根本就是硬件损伤，想把它砸掉！太坑了。

clang是osx自带的c,c++,objective-c编译器；gnu是常用的c++的轻量级编译器，在windows上通常是下载MinGW；sublime就不多说了；本文的目的就是搭建一个轻量级的C++编辑-编译-调试-运行环境。


##MAC上
###方法一：
1. 打开sublime，`command`+`shift`+`P`
2. 输入install，选择`install package`，回车
3. 输入sublimeClang，回车下载
4. 编写一个简单的c++程序，保存为name.cpp
5. 在terminal中，`clang++ name.cpp -o name`或者`g++ name.cpp -o name`
6. 双击name运行
7. 如果运行过程不需要输入数据，可以直接在sublime中`command`+`shift`+`B`运行

###方法二
1. AppStore中下载Xcode
2. 使用这个IDE


##WINDOWS上

###方法一：
1. 安装Installation Manager，运行，选择需要下载的组件，比如这里需要C++有关的组件
2. 将MinGW的安装路径添加到环境变量中
3. cmd中输入`g++ -v`来检测gnu是否安装成功
4. 打开sublime text 3
5. `preferences`->`browse packages`->`gcc`(好像是这样，反正自己摸索就好了)
6. OK，完成

###方法二：
1. Visual Studio
2. 使用该IDE


###有用的资料
【1】[Writing and Running C++ Programs in the UNIX Environment using g++](https://www.cs.drexel.edu/~mcs171/Sp14/extras/g++/index.html)

【2】[Writing and Running C++ Programs in the Mac OS X 10.4 Environment using xCode](https://www.cs.drexel.edu/~mcs171/Sp14/extras/xCode_Instructions/index.html)







