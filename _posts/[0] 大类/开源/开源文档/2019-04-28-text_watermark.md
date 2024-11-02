---
layout: page
title: 文本盲水印
categories: 开源
tags: 0x58_密码学
keywords:
description:
repo_name: text_blind_watermark
---

提供了网页版本、Python版本、Rust版本


在线试用：[https://www.guofei.site/pictures_for_blog/app/text_watermark/v1.html](https://www.guofei.site/pictures_for_blog/app/text_watermark/v1.html)

<iframe src="/pictures_for_blog/app/text_watermark/v1.html" width="100%" height="300em" marginwidth="10%"></iframe>


## 零宽字符选择


字符测试地址（网页）：https://www.guofei.site/pictures_for_blog/app/text_watermark/find_chr.html


测试范围：

|| macbook| windows | iso | 安卓系统 | linux
|--|--|--|--|--|--|
| Chrome | 
| 系统预装的浏览器 | 
| 系统预装的编辑器 | 
| 微信 | 
| office | 
| 其它主流APP ||QQ、抖音、知乎、小红书、B站|
| wps |
| Github readme、代码预览页 |  |






 windows-excel
 - ❌：7F，00AD
 - ✔️：1d，200B，200C，200D，FEFF，2060，202A

 windows-word
 - ❌：1d，7F，00AD，
 - ✔️：200B，200C，200D，FEFF，2060，202A

windows-ppt
- ❌：None
- 正确：1d，7F，200B，200C，200D，FEFF，2060，00AD，202A


windows-chrome
- ❌：1d，7F
- ✔️：其它

windows-edge
- 同 windows-chrome

IE
- 全通过


windows-写字板
- 同 Windows- Chrome

windows-txt编辑器
- 全通过

Windows-钉钉
- 同 Chrome

Windows-微信

Windows-wps

Windows-ppt

Windows-excel



命令行
- macbook-pycharm 命令行
    - ✔️： 1d，202A，FEFE，200E，200F
- macbook-zsh
    - ❌：200B，200C，00AD
    - ✔️： 1d，7F，200D，FEFF，2060，202A，FEFE、2060，200E，200F



字符说明

1. 零宽度空格（Zero Width Space）
代码点: U+200B
名称: ZERO WIDTH SPACE
功能: 允许在文本中插入一个可能的换行点，但不会显示任何可见的空格。常用于需要控制换行但不希望显示空格的位置。
2. 零宽度非连接符（Zero Width Non-Joiner）
代码点: U+200C
名称: ZERO WIDTH NON-JOINER (ZWNJ)
功能: 防止前后字符连接或形成连字，常用于书写需要区分连接性语言（如阿拉伯语、希伯来语）中的字母。
不可用：MacBook 的 Excel
3. 零宽度连接符（Zero Width Joiner）
代码点: U+200D
名称: ZERO WIDTH JOINER (ZWJ)
功能: 指示前后的字符应连接或形成连字，常用于组合字母或生成特定的连字形式。
不可用：Macbook 的 Excel
4. 零宽度无断行空格（Zero Width No-Break Space）
代码点: U+FEFF
名称: ZERO WIDTH NO-BREAK SPACE (ZWNBSP)
功能: 原本用作字节顺序标记（BOM），但也可作为不可见的无需断行的空格使用。注意：在现代 Unicode 中，推荐使用 WORD JOINER (U+2060) 来替代。
5. 左右文本方向控制字符
左至右标记（Left-to-Right Mark, LRM）
代码点: U+200E
名称: LEFT-TO-RIGHT MARK
功能: 指示文本方向为从左到右，常用于混合方向的文本中。
右至左标记（Right-to-Left Mark, RLM）
不可用：Macbook-Excel
6. 方向
代码点: U+200F
名称: RIGHT-TO-LEFT MARK
功能: 指示文本方向为从右到左，常用于混合方向的文本中。
不可用：Macbook-Excel
6. 字符连接格式符（Character Joiner）
代码点: U+2063
名称: INVISIBLE SEPARATOR
功能: 用作不可见的分隔符，通常用于分隔两个字符但不显示任何分隔符。
7. 数学格式字符
线性占位符（Invisible Times）
代码点: U+2062
名称: INVISIBLE TIMES
功能: 用于数学表达式中，作为隐形的乘号。
线性占位符（Invisible Separator）
不可用：Macbook-Excel、MacBook-word
8. 代码点: U+2063
名称: INVISIBLE SEPARATOR
功能: 在数学表达式中用作隐形的分隔符。
不可用：Macbook-Excel、MacBook-word



综合来说，使用 2060、FEFF 是比较好的


