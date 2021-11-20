---
layout: post
title: 【论文学习】深度学习“里程碑”论文
categories:
tags: 0-读论文
keywords:
description:
order: 6
---


https://github.com/floodsung/Deep-Learning-Papers-Reading-Roadmap



## 1.1 Survey

**[1]** LeCun, Yann, Yoshua Bengio, and Geoffrey Hinton. "**Deep learning**." Nature 521.7553 (2015): 436-444. [[pdf]](http://www.cs.toronto.edu/~hinton/absps/NatureDeepReview.pdf) **(Three Giants' Survey)** :star::star::star::star::star:


机器学习被广泛用于图像、语音、推荐。传统机器学习需要小心的构造特征。  
深度学习是一种 Represention learning，可以自动构建特征。它在一层构建特征，然后输出给更抽象的下一层。  
以图像为例，第1层检测不同角度和位置的 edge 是否存在，而第2层能检测图案，第3层可能把图案组合起来，如此等等。  
深度学习在解决以前的一些难题上是重大突破，它可以很好的发现高维复杂的特征，所以广泛用于科学、商业、政府。在 image recognition、speech recognition 等方面都打破了记录，还在药品分子建模、脑科学、DNA开合预测方便击败其它机器学习模型。在NLP领域，用于 topic classification, sentiment analysis, question answering，translation


有监督学习：设定一个优化目标（得分或距离），然后用 SGD 去优化参数。  

现代的神经元基本都用 ReLU，它训练更快，历史上用 sigmoid 更多。

以前人们认为局部最优是一个问题，近期人们发现更大的问题其实是 saddle points

NLP领域
- 2006年 加拿大CIFAR 团队引入了无监督过程，整个系统可以用 backpropagation 做 fine-tune
- 2009年，在GPU上训练 语音识别任务，加快了10～20倍，打破了记录

CV领域。filter layer 可以用来提取特征。pooling layer 也需要，因为 filter layer 提取的特征可能差别很大，

词向量之前，普遍的做法是 n-gram

RNNs 是很强大的动态系统，但是训练困难，因为面临梯度爆炸和梯度消失的问题

翻译模型：先用一个 encoder 把整个句子意义提取成一个向量，然后用 decoder 把这个向量翻译成另一种语言





## 1.2 Deep Belief Network(DBN)(Milestone of Deep Learning Eve)

**[2]** Hinton, Geoffrey E., Simon Osindero, and Yee-Whye Teh. "**A fast learning algorithm for deep belief nets**." Neural computation 18.7 (2006): 1527-1554. [[pdf]](http://www.cs.toronto.edu/~hinton/absps/ncfast.pdf)**(Deep Learning Eve)** :star::star::star:









**[3]** Hinton, Geoffrey E., and Ruslan R. Salakhutdinov. "**Reducing the dimensionality of data with neural networks**." Science 313.5786 (2006): 504-507. [[pdf]](http://www.cs.toronto.edu/~hinton/science.pdf) **(Milestone, Show the promise of deep learning)** :star::star::star:


借助多层神经网络，高维数据可以转为低维数据。  
在这个“autoencode” 中，可以用 gradient descent 来优化，前提是 initial weights 已经接近最优解了。

本文介绍了一种初始化 weights 的方案，使得 autoencoder 表现效果比 PCA 好很多



## 1.3 ImageNet Evolution（Deep Learning broke out from here）

**[4]** Krizhevsky, Alex, Ilya Sutskever, and Geoffrey E. Hinton. "**Imagenet classification with deep convolutional neural networks**." Advances in neural information processing systems. 2012. [[pdf]](http://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf) **(AlexNet, Deep Learning Breakthrough)** :star::star::star::star::star:

**[5]** Simonyan, Karen, and Andrew Zisserman. "**Very deep convolutional networks for large-scale image recognition**." arXiv preprint arXiv:1409.1556 (2014). [[pdf]](https://arxiv.org/pdf/1409.1556.pdf) **(VGGNet,Neural Networks become very deep!)** :star::star::star:

**[6]** Szegedy, Christian, et al. "**Going deeper with convolutions**." Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition. 2015. [[pdf]](http://www.cv-foundation.org/openaccess/content_cvpr_2015/papers/Szegedy_Going_Deeper_With_2015_CVPR_paper.pdf) **(GoogLeNet)** :star::star::star:

**[7]** He, Kaiming, et al. "**Deep residual learning for image recognition**." arXiv preprint arXiv:1512.03385 (2015). [[pdf]](https://arxiv.org/pdf/1512.03385.pdf) **(ResNet,Very very deep networks, CVPR best paper)** :star::star::star::star::star:

## 1.4 Speech Recognition Evolution

**[8]** Hinton, Geoffrey, et al. "**Deep neural networks for acoustic modeling in speech recognition: The shared views of four research groups**." IEEE Signal Processing Magazine 29.6 (2012): 82-97. [[pdf]](http://cs224d.stanford.edu/papers/maas_paper.pdf) **(Breakthrough in speech recognition)**:star::star::star::star:

**[9]** Graves, Alex, Abdel-rahman Mohamed, and Geoffrey Hinton. "**Speech recognition with deep recurrent neural networks**." 2013 IEEE international conference on acoustics, speech and signal processing. IEEE, 2013. [[pdf]](http://arxiv.org/pdf/1303.5778.pdf) **(RNN)**:star::star::star:

**[10]** Graves, Alex, and Navdeep Jaitly. "**Towards End-To-End Speech Recognition with Recurrent Neural Networks**." ICML. Vol. 14. 2014. [[pdf]](http://www.jmlr.org/proceedings/papers/v32/graves14.pdf):star::star::star:

**[11]** Sak, Haşim, et al. "**Fast and accurate recurrent neural network acoustic models for speech recognition**." arXiv preprint arXiv:1507.06947 (2015). [[pdf]](http://arxiv.org/pdf/1507.06947) **(Google Speech Recognition System)** :star::star::star:

**[12]** Amodei, Dario, et al. "**Deep speech 2: End-to-end speech recognition in english and mandarin**." arXiv preprint arXiv:1512.02595 (2015). [[pdf]](https://arxiv.org/pdf/1512.02595.pdf) **(Baidu Speech Recognition System)** :star::star::star::star:

**[13]** W. Xiong, J. Droppo, X. Huang, F. Seide, M. Seltzer, A. Stolcke, D. Yu, G. Zweig "**Achieving Human Parity in Conversational Speech Recognition**." arXiv preprint arXiv:1610.05256 (2016). [[pdf]](https://arxiv.org/pdf/1610.05256v1) **(State-of-the-art in speech recognition, Microsoft)** :star::star::star::star:
