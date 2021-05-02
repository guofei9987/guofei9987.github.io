---
layout: post
title: 【NLP】【Python】新词发现
categories:
tags: 2-4-NLP
keywords:
description:
order: 305
---



## 数据导入和清洗

新词发现针对三种场景：
- 英语，基本单元是单词，目标是发现词组，特征是单词之间全部以空格分开
    - 例如，我们想建模发现 `neural network` 是一个常用的词组
- 中文，基本单位是字，目的是发现词语，我们手动清洗，让每个字之间都有空格
    - 例如，清洗后的数据是 `侯 亮 平 得 知 航 班 无 限 期 延 误 急 得 差 点 跳 起 来`
    - 目的是发现新词 `侯亮平`，`航班`，`延误`
- 中文，基本单位是词，目的是发现词语组成的常用短语
    - 例如，清洗并用 **jieba分词** 后的数据是 `膨胀 金 和 相互 宝 都 复杂`
    - 目的是发现新词 `膨胀金`，`相互宝`

**总结上面3条**，我们统一规定清洗后的数据格式：基本单元之间用空格分割。  
本文的算法就 **同时支持** 上面的3种情况。  
本文的代码以上面第二种情况为例，词库选《人民的名义》txt版本。  


```python
import numpy as np
import re

with open('语料.txt') as f:
    X_raw = f.readlines()


X = [list(sentence) for sentence in X_raw]  # 拆词
regex = re.compile(u'[\u4e00-\u9fa5]')
X = [[word for word in sentence if regex.match(word) is not None] for sentence in X]
# X=[[word for word in sentence if word not in stops] for sentence in X] # 停词
X = [' '.join(sentence) for sentence in X]
```


## 凝固程度
也叫做点间互信息（Pointwise Mutual Information）  
$\operatorname{PMI}(x, y)=\log \dfrac{p(x, y)}{p(x) p(y)}$

解释：这个数字代表两个词是否经常出现在一起。例如，
- 如果x和y的出现完全随机，那么pmi=1  
- 如果x和y同时出现的概率，大于完全随机，那么pmi>1  
- PMI越大，说明这两个词经常出现在一起，意味着两个词的 **凝固程度** 越大，其组成一个新词的可能性也就越大。



用 CountVectorizer 做 n_gram
```python
from sklearn.feature_extraction import text

max_n_gram = 4
count_vectorizer = text.CountVectorizer(ngram_range=[1, max_n_gram],
                                        token_pattern=r'\S',
                                        max_df=0.8,
                                        min_df=5)

count_vectorizer.fit(X)

X_cnt_vec = count_vectorizer.transform(X)

X_cnt_vec.toarray().sum(axis=0)

# 每个 feature 是什么（文本）
feature_names = count_vectorizer.get_feature_names()

# 每个feature含多少词（n-gram）
feature_len = np.array([feature_name.count(' ') + 1 for feature_name in feature_names])

# 全部语料中，每个feature出现多少次
feature_cnt = X_cnt_vec.toarray().sum(axis=0)

# 每种长度的词，在全部语料中出现多少次
feature_toal = {i: feature_cnt[feature_len == i].sum() for i in range(1, max_n_gram + 1)}
```

建模：
```python
res = []
for idx in range(len(feature_names)):
    if feature_len[idx] == 1:
        continue
    feature_name_split = feature_names[idx].split(' ')
    p_x_y = feature_cnt[idx] / feature_toal[feature_len[idx]]
    px_multiply_py = 0
    for i in range(1, feature_len[idx]):
        part_left = ' '.join(feature_name_split[:i])
        part_right = ' '.join(feature_name_split[i:])
        idx_left = feature_names.index(part_left)
        idx_right = feature_names.index(part_right)
        if part_left in feature_names and part_right in feature_names:
            px_multiply_py_ = feature_cnt[idx_left] * feature_cnt[idx_right] / feature_toal[feature_len[idx_left]] / \
                              feature_toal[feature_len[idx_right]]
            if px_multiply_py_ > px_multiply_py:
                px_multiply_py = px_multiply_py_
    res.append([feature_names[idx], p_x_y / px_multiply_py])

res
```

看看得分前20名：
```python
sorted(res, key=lambda x: x[1], reverse=True)[:20]
```

>[['霹 雳', 79500.59362313423],
 ['羡 慕', 66250.4946859452],
 ['胞 胎', 66250.4946859452],
 ['蹊 跷', 56786.138302238745],
 ['嘀 咕', 56786.13830223874],
 ['玫 瑰', 49687.8710144589],
 ['慷 慨 激 昂', 48455.0664978678],
 ['恍 然 大 悟', 43071.17022032694],
 ['嫖 娼', 36136.633465061015],
 ['玻 璃', 33125.2473429726],
 ['轮 廓', 33125.2473429726],
 ['螃 蟹', 33125.247342972594],
 ['巧 取 豪 夺', 32303.377665245203],
 ['惭 愧', 30974.257255766588],
 ['锻 炼', 30577.15139351317],
 ['阿 庆 嫂', 30054.559043032466],
 ['鸿 门 宴', 28898.6144644543],
 ['描 淡 写', 28898.614464454295],
 ['兄 弟 姐 妹', 28714.113480217955],
 ['废 墟', 28393.069151119373]]


看起来还不错

## 自由程度

也就是左右熵（Information Entropy）  
公式如下（就是信息熵）： $E_{left}(PreW)=-\sum_{\forall Pre \subseteq A} P(PreW) \log P(PreW )$

参考文献给了个例子，虽然我们发现，“被子”和“辈子”出现都很多，PMI都很大，但两个词是有区别的：
- “被子”的左邻字用例非常丰富，“晒被子”、“床被子”、“叠被子”、“盖被子”、“加被子”、“新被子”、“掀被子”、“收被子”、“薄被子”、“踢被子”、“抢被子”。左临词的熵很大。
- “辈子”的左邻词很少，基本上就是“一辈子”、“这辈子”、“下辈子”、“上辈子”、“半辈子”。左临词的熵很小。
- 被子左边词有100多种不同情况，显然其不确定性明显更大，在生活中我们也的确会大概率的把“被子”当成一个词来用。所以我们大致可以得到：左右熵值越大，说明该词的周边词越丰富，意味着词的自由程度越大，其成为一个独立的词的可能性也就越大。


代码的处理：
- 候选词直接用 PMI 那一步的结果
- 计算 entropy 时，只计算左边第一个基本单元（本例子中，是字），或者右边第一个基本单元（本例子中，是字）。
- 还有个问题没有处理，句末的词算熵的时候可以算大一些，可以按照下一句的句首来算，但这里直接忽略了。


```python

import collections

# 取上一步的结果，这里应当卡域值，但作为演示就取top20
possible_new_words = sorted(res, key=lambda x: x[1], reverse=True)[:20]


def cal_entropy(cnt):
    # 计算熵
    freq = np.array(list(cnt.values()))
    prob = freq / freq.sum()
    return -(prob * np.log2(prob)).sum()


new_word = []
for word in possible_new_words:
    regex_left = re.compile(r'[\S]* {word}'.format(word=word[0]))
    regex_right = re.compile(r'{word} [\S]*'.format(word=word[0]))

    # 遍历语料，找到左字和右字（用空格分割的一个基础单元，字或词或英语单词）
    cnt_left, cnt_right = collections.Counter(), collections.Counter()
    for x in X:
        cnt_left.update(collections.Counter(regex_left.findall(x)))
        cnt_right.update(collections.Counter(regex_right.findall(x)))

    left_entropy, right_entropy = cal_entropy(cnt_left), cal_entropy(cnt_right)
    if left_entropy > 1 and right_entropy > 1:
        new_word.append(word)

new_word
```

发现把 '胞 胎'、'描 淡 写' 这两个词给剔除了，剩下的词全部是我们熟知的词语。
>霹雳   
羡慕   
蹊跷   
嘀咕   
玫瑰   
慷慨激昂   
恍然大悟   
嫖娼   
玻璃   
轮廓   
螃蟹   
巧取豪夺   
惭愧   
锻炼   
阿庆嫂   
鸿门宴   
兄弟姐妹   
废墟   



## 中文分词

同样的思路可以用于分词。

给定一个句子的一种分词方案，可以定义其概率。  
我们添加一个独立性假设，就可以把分词方案$w_1w_2...w_n$的概率定义为：$P(w_1w_2...w_n)=P(w_1)P(w_2)...P(w_n)$  

其中，$P(w_1)=w_1$ 在语料中出现的次数/语料中种的词数

举例来说，“有 意见 分歧” 和 “有意 见 分歧” 是两种分词方案，可以分别计算概率，概率更大的方案更合理。

按此思路，在实现中有以下关注点：
- 乘法的计算量大，加一个对数，就改为加法了。
- 待评估的方案，如果不做设计，是指数级复杂度。在计算前半部分不同的分词结果时，会反复用到后半部分分词计算结果，因此可以用 **动态规划** 减少计算量。
- 语料库中挖掘并保存词频信息。用 Tire 树。

## 实体识别

## 参考文献

基于互信息和左右熵的新词发现算法——python实现 - 王鹏的文章 - 知乎
https://zhuanlan.zhihu.com/p/107663648
