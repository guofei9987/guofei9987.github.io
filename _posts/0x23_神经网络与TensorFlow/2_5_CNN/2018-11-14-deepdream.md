---
layout: post
title: 【DeepDream】初学
categories:
tags: 0x25_CV
keywords:
description:
order: 271
---

[tensorflow 示例](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/examples/tutorials/deepdream) 上的讲解，比看过的几本书都要清晰（看的几本书都是从这里抄的，而且抄来抄去反而不太好看了）。  


我的粗浅理解是这样的：
1. 找到CNN中某个神经元（换句话说，某个CNN节点的某个channel）。合适的层叫做风格层，至于怎么找到的我还没搞清楚。总之越往上层的神经元，其处理的信息越抽象；越下层的神经元越细节。
2. 对于输入的图片，我们想调整图片，使得上面那个神经元输出值最大（被激活）
3. 用梯度来做这个事情，迭代中不断调整图片各个像素的值（梯度上升）。


---------------------------
下面是听吴恩达的课程后的笔记

Content（C）+Style（S）=Generated image G  

$J(G)=\alpha J_{content}(C,G)+\beta J_{style}(S,G)$

算法过程
1. initiate G randomly
2. Use gradient descent to $\min J(G)$
    - $J_{content}(C,G)=0.5 \mid \mid a^{[l](C)}-a^{[l](G)}\mid\mid^2$
    - $J_{style}(S,G)=\sum\limits_l\lambda^{[l]}J_{style}^{[l]}(S,G)$
        - $J_{style}^{[l]}(S,G)=\dfrac{1}{(2n_H^{[l]}n_W^{[l]}n_C^{[l]})^2}\mid\mid G^{[l](S)}-G^{[l](C)} \mid\mid_F=\dfrac{1}{(2n_H^{[l]}n_W^{[l]}n_C^{[l]})^2}\sum\limits_k\sum\limits_{k'}(G_{kk'}^{[l](S)}-G_{kk'}^{[l](G)})$
        - $G_{kk'}^{[l](S)}=\sum\limits_i\sum\limits_j a_{ijk}^{[l](S)}a_{ijk'}^{[l](S)}$
        - $G_{kk'}^{[l](C)}=\sum\limits_i\sum\limits_j a_{ijk}^{[l](C)}a_{ijk'}^{[l](C)}$


## tf实现

不同的是，这里用的是 vgg-19，预训练好的参数在这里下载
https://www.kaggle.com/teksab/imagenetvggverydeep19mat/downloads/imagenetvggverydeep19mat.zip/1




## 参考文献
https://github.com/tensorflow/tensorflow/tree/master/tensorflow/examples/tutorials/deepdream  
https://github.com/hjptriplebee/deep_dream_tensorflow/blob/master/main.py  
https://github.com/google/deepdream/blob/master/dream.ipynb
