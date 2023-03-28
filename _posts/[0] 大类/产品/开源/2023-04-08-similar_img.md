---
layout: post
title: 相似图片算法
categories: 开源
tags:
keywords:
description:
repo_name: 
---




## 相似图片算法


### 感知哈希算法（Perceptual hash algorithm，Average Hash Method，aHash）

是一种基于指纹的算法，可以用来快速检索


算法步骤
1. 缩小图片信息。
    - 像素：把图片缩放为 8x8 ，共 64 个像素
    - 颜色：把图片转为 64 级灰度
2. 计算图片的平均值
3. 比较64个像素值 和 平均值，大于等于记为1，否则记为0
4. 如此得到一个 长度为 64 的二进制，他就是这个图片的指纹


检索过程：
- 只需要对比指纹
- 使用 Hamming distance
- 如果不同的数量小于 5，说明很相似。如果多于10，说明两个图片不同


代码参考：http://www.ruanyifeng.com/blog/2011/07/imgHash.txt


算法特点
- 不受图片大小缩放、亮度攻击影响
- 对图片内容攻击，会让算法失效。例如图片上加些文字。
- 常用场景：根据缩略图，找对应哪个原图

（aHash：上面的）

## 2




## phash：较常用

## SIFT：较常用


## 参考资料

https://github.com/MashiMaroLjc/Learn-to-identify-similar-images

- [https://github.com/MashiMaroLjc/Learn-to-identify-similar-images](https://github.com/MashiMaroLjc/Learn-to-identify-similar-images)
- [https://github.com/nivance/image-similarity](https://github.com/nivance/image-similarity)


