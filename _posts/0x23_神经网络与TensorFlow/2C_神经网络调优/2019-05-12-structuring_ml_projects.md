---
layout: post
title: Structuring Machine Learning Projects
categories:
tags: 0x23_深度学习
keywords:
description:
order: 453
---

*吴恩达的课程笔记*  

## Why ML Strategy

Ideas
- Collect more data
- Collect more diverse training set
- Train algorithm longer with gradient descent
- Try Adam instead of gradient descent
- Try bigger network
- Try smaller network
- Try dropout
- Add L2 regularization
- Network architecture
    - Activation functions
    - num of hidden units
    - ...

每一项都很耗时，如果你不知道怎样选择，就可能浪费六个月时间在错误的方向上。

## Orthogonalization
举例来说，汽车操纵有2个维度：方向和速度。  
如果汽车的控制系统是这样的：按钮1=0.8angel+1.2speed，按钮2=-0.2angel+2speed。这样的汽车人类几乎没法去调整和控制。

### Chain of assumptions in ML
- Fit training set well
    - bigger network
    - Adam
- Fit dev set well
    - Regularization
    - Biger train set
- Fit test set well
    - Bigger dev set
- Perform well in real world
    - change dev/test set or cost function


所以不太喜欢 early stopping，因为会同时影响1,2 （想想那个奇怪的汽车按钮）

### Single number evaluation metric
你选择模型时，同时看 precision 和 recall ，这两个往往需要 trade-off ， 这是奇怪的汽车按钮，可以用 F1 Score 来代替。  

又例如，你选择选择图片识别模型时，来自不同国家的图片，其误差不一样。你可以用一个平均误差来衡量。

### Satisficing and Optimizing metric
例如，选择模型时，有2个维度：Accuracy，RunningTime，有两种方法处理这个
- cost=accuracy-0.05RunningTime （缺点是看起来太过主观）
- max(accuracy), subject to RunningTime<100ms

进一步，如果你有N个 metric 可以衡量，你可以用：
- 1 optimizing metric
- N-1 satisfying metric

## Train/dev/test
dev/test 要来自 same distribution  
真实案例：贷款违约预测项目，dev在中等收入，test在低收入群体上。浪费了3个月。  


传统小数据下，Train/dev/test 划分可以是 70/30, 60/20/20  
海量数据下，
- 可以是98/1/1, 只要test set数量足够你评估模型就行了.  
- 可以不要 test，只做train/dev

change dev/test sets and metrics  
举例来说，你要建立一个算法，来识别并为用户推荐猫咪照片。  
你按照正确率来评估一个图像识别算法，但是如果算法把一张色情图片错误地识别为猫咪，这个后果就很严重了。  
你可以在计算正确率时，给这种错误增加一个大权重：  
$error=\dfrac{1}{\sum_i w^{(i)}}\sum_i w^{(i)}I(\hat y^{(i)} \not =y^{(i)})$


## 超越人类
算法在超越人类后，往往进步速度变慢，有两个原因
- bayes optimal error（任何算法、人类所能达到的最佳表现），很可能本身与人类表现就很接近
- 有一些改进工具，在算法超越人类后就不能用了
    - 雇人打标签
    - 分析哪些案例人类做对了，算法做错了。得到一些insight
    - better analysis of bias/variance （下面讨论的内容）

### Avoidable bias
在 bias/variance 的 trade-off 过程中，我们经常与人类表现比照，然后决定改进哪一项。  
这么做本质上是假设人类表现约等于 Bayes error. bias 远不如人类，差别叫做 avoidable bias.  

### what is human-level performance
因为我们用 human-level performance 时，实际上在用 bayes error，因此，我们可以把 human-level performance 定义为 “一群专家讨论后得到的最佳结果”  

当然，你发文章或者建立系统时，可以把 human-level performance 定义为“一个典型中等水平人的表现”  

（学习这一部分之前，我们默认把 bayes error 当成0，仔细想想，这是不对劲的。）

当你的算法超越人类最好表现后，你就没办法知道 bayes error 了，上面提过超越人类后，进步速度变慢。


## error analysis
列出 dev set 中，识别错误的案例，一一列出原因，然后统计原因的比例。这样就可以确定优先解决哪些问题。  
例如，识别猫咪的算法中，发现分错类的大多是狗，就可以特别地去训练模型去识别狗。如果分错类的极少比例是大猫（狮子老虎等），就不需要浪费太多时间去处理这个。  


**原始数据标注错误**
- DL algorithms are quite robust to random errors in the training set. 所以不用管就行了
- 但如果错误是 systematic errors ，就需要处理了，例如数据倾向于把某类狗标注成猫，这会造成算法偏差。

## Training and testing on different distributions
你要做图像识别，从网页上获取了海量质量较好的数据，从你的app中获得一定量的质量较差数据。你的训练目标是app上获取的数据，要在这个数据上表现良好。
- 做法1：放到一起，shuffle后作为 train/dev/test. 缺点：dev 集合大多来自网页数据。
- 做法2：让 dev/test set 数据全部来自app的数据。剩余的app数据，和web获得的数据一起，放到train set。

### Bias and Variance with mismatched data distributions
一般使用做法2.  

新问题是，你不知道 dev error与training error的差别来自算法，还是来自 distribution.  
解决：把training set 随机分割为两份：training set/training-dev error. 如果 training set 和 training-dev set 上的 error 差别很大，就是模型泛化性有问题。否则就是 data mismatch problem.    

- human error
- training error
- training-dev error
- dev error
- test error

上面5个数字的差值分别表示：
- avoidable error
- variance error
- data mismatch error
- degree of overfitting to dev set

### Addressing data mismatch

- 手动分析train error 与 dev/test set
- make training data more similar. 例如，你的算法是识别车内语音，dev数据有很多街道杂音，可以在 train data 上加入相同的杂音。


## Transfer learning
识别猫咪的算法，有助于识别 x射线 图片  
把最后一层换掉，然后训练即可。  

两个过程叫做 pre-training, fine-tuning

- 最后一层的参数随机初始化
- 最后一层后面可以新加入多层

## Multi-task learning
与 multi-class learning 很像，不同的是，
- label可以是multiple labels
- label可以是undefined，这种情况下，计算 cost 时，按照0来算


**Why**
- having shared lower-level features
- data for each task is similar
- can train a big neural network to do well on all the tasks

## end-to-end deep learning
不分几步建立多个模型，而是直接从X到Y

- Pros
    - Let the data speak （pipline 模型中，可能会有人的偏见）
    - 不用太多人工设计
- cons
    - need large amount of data
    - 有些人工设计还是有用的，可是被排除出去了。
