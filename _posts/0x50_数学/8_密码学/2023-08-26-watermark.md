---
layout: post
title: 信息嵌入技术【2】
categories:
tags: 0x58_密码学
keywords:
description:
order: 59003
---


仓库地址：https://github.com/guofei9987/HideInfo




Info Hiding Library  
一些主流（但是原理简单）的信息隐藏方法  

| 算法   | 说明                |
|------|-------------------|
| 幻影坦克 | 使图片在不同的背景下显示不同的图片 |
| 转物为图 | 把数据以图片形式存放        |
| 藏物于图 | 把数据藏在图片中          |
| 图种   | 把图片和文件黏在一起，并存为图片  |
| EXIF | 把一段信息放到图片的EXIF中   |
| 藏物于音 | 把数据隐藏在音频文件中       |
| 转物为音 | 把数据以音频的形式存放       |
| 藏物于文 | 把数据隐藏在文本中 |


安装
```
pip install HideInfo
```


## 幻影坦克

功能：一个带透明通道的图片，使其在黑色背景下显示图片A，在白色背景下显示图片B

说明
- 目前只支持黑白图片
- 一般情况下，手机/浏览器的预览和点击大图分别使黑色背景和白色背景，因此有"预览和点击是两张不通的图"的效果
- 未来：支持彩色图片
- 例子：[example/example_mirage_tank.py](example/example_mirage_tank.py)


## hide_as_img:转物为图

功能：文件/文本/bytes 类数据，转换为图片  
原理：图片1个通道上的1个像素，可以存放 0-255 的数字，也就是一个字节。因此可以用来存放数据。

说明
- RGB 3个通道都用来存放数据
- 使用前4个字节存放数据的大小，因此要求总的数据量小于 4G
- 可以存放文件、文本、bytes 类数据，把它转化为一张图片
- 代码：[example_hide_as_img.py](example/example_hide_as_img.py)

## hide_in_img：藏物于图

功能：文件/文本/bytes 类数据，藏进一个 PNG 图片中，并且用肉眼无法看出区别

说明
- 使用 LSB 算法
- 解原始数据时，无需原图参与，只看最低位
- 使用前4个字节存放数据的大小
- 使用位运算，提高一定的性能
- LSB算法对压缩、转格式等攻击脆弱
- 例子：[example_hide_in_img.py](example/example_hide_in_img.py)


## img_seed:图种

功能：把图片和文件连接起来，以图片的形式存下来（目前还不完善）

- 例子：[example/example_img_seed.py](example/example_img_seed.py)

## img_exif:把信息隐藏在图片的EXIF中

功能：把图片和文件连接起来，以图片的形式存下来（目前还不完善）

- 例子：[example/example_img_exif.py](example/example_img_exif.py)

## hide_in_music: 藏物于音

功能：把一段信息（文件/文本/bytes），藏进一个音乐文件中

例子：
- [example_hide_in_music.py](example/example_hide_in_music.py)

## hide_as_music：转物为音

功能：把一段信息（文件/文本/bytes），转为声音

说明
- 用 16 种音表示四进制。每个音持续 0.05 秒，因此每秒对应 10 字节。
- 例子：[hide_as_music.py](clockware/hide_as_music.py)

## hide_in_text：藏物于文

功能：把一段信息（文件/文本/bytes），藏进一段文本中

说明
- 实测在苹果设备 Macbook、IOS 上，隐藏前后的文本看不出区别。但是 Windows 和某些安卓系统上，会有空格
- 例子：[hide_in_text.py](clockware/hide_in_text.py)








## 缩放藏图


效果：一张图片缩放后，变成另一张图片


原理：
- 缩小图片时，如果使用近邻法，缩放过程就是把指定的像素提取，然后组成一个新图片。
- 如果事先把这些像素找到，并替换成另一个图片，那么就能够得到“缩放前是图片A，缩放后是图片B”的效果了


限制：
- 必须是 PNG，不能是JPG格式
- 缩放后的大小是确定的，才能显示图片B
- 缩放算法必须是近邻法
- 操作系统自带的缩放算法未必和嵌入算法一致，因此最好用代码来统一（这样做这算法好像使用范围很窄了）


额外
- 可以做多层嵌套，效果是：缩小图片后得到图片B，再次缩小后得到图片C


代码示例：https://github.com/3150601355/SimpleScaleDown


## 其他算法


为什么没有"转物为文"？想要把字节码转为文本，可以借助 base64 或者 `bytes.hex()` 等多种方法。

