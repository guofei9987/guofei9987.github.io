---
layout: post
title: 【论文笔记】CNN features off-the-Shelf
categories:
tags: 0-读论文
keywords:
description:
order: 4
---



- **CNN features off-the-Shelf: An astounding baseline for recognition** (2014), A. Razavian et al. [[pdf]](http://www.cv-foundation.org//openaccess/content_cvpr_workshops_2014/W15/papers/Razavian_CNN_Features_Off-the-Shelf_2014_CVPR_paper.pdf)
- 镜像地址 [pdf](https://github.com/guofei9987/pictures_for_blog/tree/master/papers)

## abstract&introduction
最近的研究表明，从CNN中提取的generic descriptors很强大，这篇论文进一步实锤了。  

本文使用 OverFeat 模型（一种CNN模型），这个模型：
- 有96~1024个3×3~7×7的卷积核  
- 激活函数是 Half-wave rectification
- Max Pooling是 3×3和5×5的

## Visual Classification

- feature vector 做了 L2 normalize然后在这上面做SVM，这叫做CNN-SVM
- 训练集增强（方法是对样本进行裁切和旋转），这叫做CNNaug-SVM
- 这里用了 1-against-all 策略，但其他地方用 1-against-1 策略
- 数据有两组：Pascal VOC（1万张图片，20个类） 和 MIT-67 indoor scenes（1.5万张图片）


结论是，CNN-SVM 能良好的工作，CNNaug-SVM的表现更为良好

然后，论文又在 Object Detection 上做了实验，再其他数据集上也是。

## 结论
CNN在提取特征上，很有竞争力。
