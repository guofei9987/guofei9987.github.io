---
layout: post
title: 【NLP】feature提取
categories:
tags: 0x24_NLP
keywords:
description:
order: 301
---

## 0. 整体文本预览和词云



**step0:下载必须的资源**

```python
import requests
from pathlib import Path


def download_file(url: str, filename: str, timeout: int = 30):
    path = Path(filename)

    if path.exists():
        return

    with requests.get(url, stream=True, timeout=timeout) as r:
        r.raise_for_status()
        path.write_bytes(r.content)

    print(f"[Downloaded] {filename}")


# 下载字体（画图用）
download_file(
    url='https://www.guofei.site/datasets/润植家刻本简体.ttf',
    filename='润植家刻本简体.ttf')

# 下载分析用的语料
download_file(
    url='https://www.guofei.site/datasets/nlp/《三国演义》.txt',
    filename='《三国演义》.txt')

# 下载常用停用词
download_file(
    url="https://raw.githubusercontent.com/goto456/stopwords/master/hit_stopwords.txt",
    filename="hit_stopwords.txt"
)
```


**step1:用 jieba 分词**

```python
import jieba.posseg as pseg

content = open('《三国演义》.txt', 'rb').read()

print("总字符数", len(content))

words = pseg.cut(content)  # <generator>
```


**step2:做一个简单的词频统计**

```python
import collections

word_dict = collections.defaultdict(int)

stopwords = set(line.strip() for line in open('hit_stopwords.txt', 'r', encoding='utf-8').readlines() if line.strip())
stopwords = stopwords | {'不要', '还要', '不可', '于是'}  # 自定义停用词

for word, flag in words:
    if flag == 'x':  # 剔除虚词
        continue
    if word in stopwords:  # 剔除禁止列表中的词
        continue
    if len(word) == 1:  # 剔除长度为1的词
        continue
    word_dict[word] += 1

# 按照词频从大到小排序
dict1 = sorted(word_dict.items(), key=lambda d: d[1], reverse=True)
```

**step3:用wordcloud画图**

[https://github.com/amueller/word_cloud](https://github.com/amueller/word_cloud) 这个包，是用来画词云的

```python
from wordcloud import WordCloud

wc = WordCloud(font_path='润植家刻本简体.ttf')  # ,max_font_size=40) # 使用前面下载好的字体
wordcloud = wc.fit_words(dict(dict1))


# 图片可以保存到本地：
wc.to_file('word_cloud.png')

# 也可以在屏幕上显示出来：
import matplotlib.pyplot as plt
plt.figure()
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.show()
```

![word_cloud](/a/nn/nlp/word_cloud.png)

## 1. 文本数据的初步清洗

一些约定：（为了变量名前后统一，并且开箱即用，约定一些固定的符号）
- `y`: target 标签, 0/1 或者在多分类模型中是 0/1/2，一维的，直接传到模型里面
- `documents_raw`：原始语料， `list<str>`
- `documents`: 初步清洗后的语料 `list<str>`
- `X`: 特征提取后的向量

### step1 读入数据
```py
import pandas as pd
df = pd.read_csv('http://www.guofei.site/datasets/nlp/SMSSpamCollection.csv', sep='\t', header=None, names=['label', 'documents'])
y = ((df.label == 'spam') * 1).values
documents_raw = df.documents.values
```
### step2 初步清洗
清洗目标：
1. 统一变成小写
2. 去除标点、数字等
3. 去除单个字母的单词
4. （如有）去除stopwords中的词语
5. （需要用 NLTK）词形还原，例如进行时、过去式、复数形式

```py
import re

regex = re.compile('[a-zA-Z]{2,}')  # 2次以上字母组合，去除标点符号和数字
documents = [regex.findall(document.lower()) for document in documents_raw]
documents = [' '.join(words) for words in documents]  # 重新整合成句子
# documents = [' '.join([word for word in words if word not in stopwords]) for words in documents]  # 如果有stopswords的话


# train_test_split
from sklearn.model_selection import train_test_split
documents_train, documents_test, y_train, y_test = train_test_split(documents, y, test_size=0.2)
```


#### 中文清洗

读入语料
```py
import pandas as pd

df = pd.read_csv('https://guofei.site/datasets/nlp/food_sentiment_cn.csv')
y = df.label
documents_raw = df.documents.values
```


1. 用jieba拆词
2. 去除数字
3. 去除停词
4. 用空格拼回

```py
import jieba
import re

documents = [jieba.lcut(document, cut_all=False) for document in documents_raw]  # 拆词
regex = re.compile(u'[\u4e00-\u9fa5]')  # 仅保留中文，(剔除 数字、英文)
documents = [[word for word in document if regex.match(word) is not None] for document in documents]
documents = [[word for word in document if word not in stopwords] for document in documents]  # 停词
documents = [' '.join(document) for document in documents]
```



更为复杂的情况，额外增加：
1. （代码还没有）繁体转简体，
2. （代码还没有）5位以上数字转NUM，
3. 英文转小写
4. 增加专有名词，防止分词时的错误

```python
import jieba
import re

add_words = ['沙瑞金', '田国富', '高育良', '侯亮平','钟小艾', '陈岩石', '欧阳菁', '易学习', '王大路', '蔡成功','孙连城', '季昌明', '丁义珍', '郑西坡',' 赵东来', '高小琴', '赵瑞龙', '林华华', '陆亦可', '刘新建', '刘庆祝']

for add_word in add_words:
    jieba.add_word(add_word)

documents = [jieba.lcut(document, cut_all=False) for documents in documents_raw]  # 拆词
regex = re.compile(u'[\u4e00-\u9fa5]')
documents = [[word for word in document if regex.match(word) is not None] for document in documents]  # jieba 拆开的词，一串数字也作为一个词返回，这里过滤一下
# documents=[[word for word in document if word not in stops] for document in documents] # 停词
documents = [' '.join(document) for document in documents]
```



## 2. VocabularyProcessor
给每个词对应一个数字标号（dictionary），然后把整个句子按照 dictionary 的一一对应关系，转换成数字列表。  
*tensorflow.contrib.learn.preprocessing.VocabularyProcessor 可以实现这个功能，但是这个函数将被移除。*  
*网上的实现也不够 Pythonic*  
**所以自己写了个类** ， 轻量、好用  


```py
import collections


class VocabularyProcessor:
    '''
    author: guofei
    site: www.guofei.site
    输入：一个列表，列表中的元素是句子，句子中的单词用空格分开。这里不提供数据清洗功能，所以应当先进行数据清洗，然后使用这个类
    输出：一个列表的列表，长度是词语个数，元素是单词的序号，例如 [[1, 2], [1, 2, 0, -1, -1, 3], [-1, 0, -1, -1], [2, 1, 0, -1, 3]]
    ```
    corpus = ['this is the first document',
              'this is the second second document',
              'and the third one',
              'is this the first document']
    vp = VocabularyProcessor(max_vocabulary_size=5)
    vp.fit(corpus)
    X = vp.transform(corpus)
    ```
    - 剔除低频词，并且把所有的低频词标记为 'RARE'，其序号固定为 0
    - max_vocabulary_size=10000 最多保留多少单词
    '''
    def __init__(self, max_vocabulary_size=10000):
        self.max_vocabulary_size = max_vocabulary_size
        self.word_count = None
        self.dictionary = None
        self.reverse_dictionary = None

    def fit(self, documents):
        words = [word for sentence in documents for word in sentence.split(' ')]
        word_count_ = collections.Counter(words)  # 词频
        word_count = word_count_.most_common(self.max_vocabulary_size - 1)  # 最多词频

        words_most = [word for word, num in word_count]  # 频率最高的词
        len_words_most=len(words_most)
        dictionary = dict(zip(words_most, range(1,len_words_most)))
        reverse_dictionary = dict(zip(range(1,len_words_most), words_most))

        # 添加 'RARE' ,也就是低频词语
        rare_count = sum([word_count_[word] for word in word_count_ if word not in words_most])
        word_count = [('RARE', rare_count)] + word_count
        dictionary['RARE'] = 0
        reverse_dictionary[0] = 'RARE'

        self.word_count = word_count
        self.dictionary = dictionary
        self.reverse_dictionary = reverse_dictionary

    def transform(self, documents):
        return [[self.dictionary.get(word, 0) for word in sentence.split(' ')] for sentence in documents]

    def fit_transform(self, documents):
        self.fit(documents)
        return self.transform(documents)
```


使用方法
```py
corpus = ['this is the first document',
          'this is the second second document',
          'and the third one',
          'is this the first document']
vp = VocabularyProcessor(max_vocabulary_size=5)
vp.fit(corpus)
X = vp.transform(corpus)
# vp.word_count, vp.dictionary, vp.reverse_dictionary
print(X)
```
>[[1, 2, 3, 0, 0], [1, 2, 3, 0, 0, 0], [0, 3, 0, 0], [2, 1]]

fit之后，还可以查询字典的其它信息
```py
vp.word_count  # 字典大小
vp.dictionary  # {'word': idx}
vp.reverse_dictionary  # {idx: 'word'}
```


## 3. CountVectorizer：词袋
又叫做词袋（Bag of Words），或者Tf(Text Frequency)

### 词袋介绍
结果的长度等于字典的长度，结果的元素值是在这句话中单词出现的次数。  

例如，我们的字典为
```py
['document', 'first', 'is', 'second', 'the', 'third', 'this']
```
词袋的计算结果为
```py
count_vectorizer.transform(['This is the first first first document.'])
# 结果：[[1, 3, 1, 0, 1, 0, 1]]

count_vectorizer.transform(['Is this the third document?'])
# 结果： [[1, 0, 1, 0, 1, 1, 1]]
```

词袋的特点
1. 非常稀疏。大多数为0
2. 未对常用词减少权重（因此引入 TF-IDF）



### 代码实现

[sklearn.feature_extraction.text.CountVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.CountVectorizer.html)
```py
from sklearn.feature_extraction import text

count_vectorizer = text.CountVectorizer()
# ngram_range
# max_df : float in range [0.0, 1.0] or int, default=1.0，浓度超过这个值的单词会被忽略
# min_df : float in range [0.0, 1.0] or int, default=1，数量低于这个值的单词背忽略
# max_features : int or None, default=None，选取最高频的 k 个单词
# vocabulary : Mapping or iterable，允许手动指定单词
# 或者：
# text.CountVectorizer(max_df=0.95, min_df=2,
# max_features=n_features,
# stop_words='english',
# token_pattern=r'\b\S+\b'
# )

# 源数据
documents = ['This is the first document.',
             'This is the second second document.',
             'The third document.',
             'Is this the first document?']

# 训练
count_vectorizer.fit(documents)

# 预测
X = count_vectorizer.transform(documents)
# 1. 不在 vocabulary 中的词，在 transform 阶段被忽略
# 2. X 是稀疏矩阵，用 X.toarray() 转换成普通矩阵
# 或者 count_vectorizer.fit_transform(documents)

X.toarray()  # 是一个shape=(num_sentence,num_words) 的array

count_vectorizer.vocabulary_  # vocabulary向量（dict格式，{'word': idx}）
# {'this': 6, 'is': 2, 'the': 4, 'first': 1, 'document': 0, 'second': 3, 'third': 5}

count_vectorizer.get_feature_names_out()
# ['document', 'first', 'is', 'second', 'the', 'third', 'this']
```

**入参：ngram**
```py
ngram_range=(1, 2) # 分词时，除了自身外，还可以保留前后单词，例如，这个案例可以以这个为词典：
# ['bi', 'grams', 'are', 'cool', 'bi grams', 'grams are', 'are cool']
```

**入参：token_pattern**

```python
# 默认正则表达式，剔除了单个字，适合英文
token_pattern = r'(?u)\b\w\w+\b'
# 把所有词都拆成单个字（适合中文）
token_pattern = r'\S'
# 如果中文文本已经分词，并用空格隔开，这样：
token_pattern=r'\b\S+\b'
```


```py
text.CountVectorizer(max_df=0.99, min_df=2,
                                        # max_features=n_features,
                                        stop_words='english')
```


## TF-IDF
TF-IDF(Text Frequency-Inverse Document Frequency)   

为什么？有些常见词，比如“有的”，在所有文章中出现概率都比较高。在 TF 中，它的值较大，但这意义不大，我们希望按比例缩小这个特征



1. (Term Frequency) $$TF_{ij}=\dfrac{f_{ij}}{\sum\limits_k f_{kj}}$$
    - $f_{ij}=$ frequency of term (feature) i in doc j
    - i: 第i个Term
    - j: 第j个文本文件
    - 分子是出第i个词在第j个文本文件中出现的次数。  
    - 分母是第j个文本文件中，所有词的个数
2. IDF(Inverse Document Ferquency) $$IDF_i=\log\dfrac{\lvert D\rvert}{\lvert\{ j:t_i \in d_j\}\rvert}$$
    - 分母: total number of docs
    - 分子: number of docs that mention term i
    - 某个单词越频繁出现，这个数字越小  
3. $TF-IDF_{ij}=TF_{ij}\times IDF_i$  


```py
from sklearn.feature_extraction import text
tf_idf_transformer=text.TfidfTransformer()

counts = [[3, 0, 1],
           [2, 0, 0],
           [3, 0, 0],
           [4, 0, 0],
           [3, 2, 0],
           [3, 0, 2]]
tf_idf_transformer.fit(counts)

tf_idf_transformer.transform(counts).toarray()
```

### TfidfVectorizer
TfidfVectorizer = CountVectorizer + TfidfTransformer

```py
from sklearn.feature_extraction import text

tf_idf=text.TfidfVectorizer()
tf_idf.fit(documents)

# tf_idf.vocabulary_ # {'单词':idx}
# tf_idf.fixed_vocabulary_ # 是否指定 vocabulary
# tf_idf.idf_ # 每个单词的 idf 值
# tf_idf.stop_words_

X = tf_idf.transform(documents)
```

说明和评价
- 什么时候适合使用外部语料做 IDF（例如使用 wikipedia）
    - 语料太小、idf 噪声很大、统计不稳定
    - 想做到“跨领域一致”。做到不同的语料有可比性。
    - 提高泛化。尤其是语料很偏的情况下
- 什么时候不应该
    - 领域词偏斜。例如 `myocardial` 不算稀有词，但是在医疗领域是一个典型特征，如果用通用 IDF，它的权重可能会被压低
    - 专业领域。法律、生物、金融，它们的词频分布与通用语料完全不同，因此最好用领域内的语料做 IDF
- 现代（2025）已经很少用 TF-IDF 了，在现代视角下，它更接近“规则”


**其它的特征提取方法**

```py
text.HashingVectorizer  # 占用内存更少，索引速度更快
VectorizerMixin
```

## Word2Vec

原理、Tensorflow实现、Torch 实现分别见于：
- https://www.guofei.site/2017/12/17/word2vec.html
- https://www.guofei.site/2022/12/24/word2vec.html

这里仅展示调用一个最方便的包：[https://github.com/piskvorky/gensim](https://github.com/piskvorky/gensim)
- 它实现了 TF-IDF、LDA、LSA、Word2Vec 等多种算法
- `pip install gensim`
- 不支持 GPU，不过这个算法本身性能也不错


### 预训练 Word2Vec
- https://fasttext.cc/docs/en/crawl-vectors.html
- 可以用 fastText 加载模型，也可以用 gensim 加载（这里用 gensim）
- 提供 bin/text 两种格式，区别：
    - text 只包含了 词向量。bin 更大，还有模型训练相关的更多文件
    - 因此 bin 提供继续训练的能力。还支持不在词表中的词，生成向量，OOV 能力。


```python
from gensim.models import KeyedVectors
model = KeyedVectors.load_word2vec_format(
    "cc.en.300.vec", # 下载并解压缩
    binary=False,    
    limit=30000      # 数据量太大，内存爆炸，前 3万个词已经能覆盖绝大多数了
)

model.most_similar(positive=['king', 'Queen'], negative=['man'])

# 注意，KeyedVectors 生成的对象，相当于 Word2Vec 对象的 model.wv
```


减少模型体积并保存

```python
print("原始形状:", model.vectors.shape)

# 减少 vocabulary 大小
words = model.index_to_key[:20000]
vectors = model.vectors[:20000]

# 减少维度
from sklearn.decomposition import PCA

target_dim = 100

pca = PCA(n_components=target_dim)
vectors_reduced = pca.fit_transform(vectors)

model.fill_norms()

small_model = KeyedVectors(vector_size=target_dim)
small_model.add_vectors(words, vectors_reduced)
small_model.fill_norms()

print("缩小后的形状:", small_model.vectors.shape)

model.save("cc.en.100.top20k.kv")
```




### 训练 Word2Vec

```python
# 数据准备（前面已下载）
content = open('《三国演义》.txt', 'r', encoding='utf-8').read()
documents_raw = [sentence.strip() for sentence in content.split('\n')]

# 分词、清洗、保存
import jieba
documents = [jieba.lcut(document, cut_all=False) for document in documents_raw]  # 分词
documents = [' '.join(document) for document in documents]

with open("《三国演义》_切分.txt", 'w', encoding='utf-8') as f:
    f.write('\n'.join(documents))
```


训练 Word2Vec 模型
```python

from gensim.models import word2vec

# 设置模型参数并训练
model = word2vec.Word2Vec(
    corpus_file='《三国演义》_切分.txt'
    , vector_size=100
)




# 使用模型：
# 词对应的向量
model.wv['曹操']

# 两个词的相似度
model.wv.similarity('曹操', '刘备')

# a + b - c:
print(model.wv.most_similar(positive=['曹操', '魏王'], negative=['玄德']))


model.wv.index_to_key          # list[str]，按频率排序的全部 vocabulary
model.wv.key_to_index          # {'word': id} 结构


model.wv.most_similar(word, topn=10) # 返回一个词的相近词

# 批量返回一些词的近义词
most_similars_precalc = {word : model.wv.most_similar(word) for word in model.wv.index_to_key[100:200]}
# 然后：
# 剔除关系分小于 0.4 的词
tmp={key: [(i,j) for i,j in value if j>0.4] for key, value in most_similars_precalc.items()}
# 空的（没有关系分大于0.4）的词也剔除
{key:value for key, value in tmp.items() if len(value)>0}


# 模型的保存和加载
# 保存：
model.save('./word2Vec.model')
# 加载：
model2 = word2vec.Word2Vec.load('./word2Vec.model')
print(model2.wv.most_similar(positive=['曹操', '魏王'], negative=['玄德']))
```



详细解释训练参数（其实大多数不用改）
```python
model = word2vec.Word2Vec(
    # sentences 和 corpus_file 任选一个，代表语料
    # corpus_file='《三国演义》_切分.txt'
    # sentences，格式是 list<list<str>> ，这里的每个 str 是一个词
    # 或者把目录下的所有文本文件当做语料：
    # sentences = word2vec.PathLineSentences('./corpus_seg/')
    sentences          # 语料，格式是 list<list<str>> 

    , vector_size=100  # 词向量维度
    , window=5         # 上下文大小（左右各 window）
    , sg=0             # 使用 CBOW 模型（默认），如果设置为 1 则使用 Skip-gram 模型
    , min_count=5      # 低于该频次的词被丢弃
    , max_vocab_size=None  # 限制词表大小（按频率裁剪）
    , sample=1e-3          # 高频词的下采样率。越小 → “的、了”更容易被丢弃
    , epochs=5             # 训练轮数
    , negative=5          # 负采样的数量（每个正样本对应多少个负样本）
    , hs=0                # 是否使用 Hierarchical Softmax
    , alpha=0.025         # 初始学习率
    , min_alpha=0.0001    # 最小学习率
    , workers=3           # 训练线程数，建议设置为 CPU 核心数 - 1
    # workers=multiprocessing.cpu_count()
)
```


## 句向量


**MTEB** (Massive Text Embedding Benchmark) 
- [https://huggingface.co/spaces/mteb/leaderboard]https://huggingface.co/spaces/mteb/leaderboard
- 是一个全面的 benchmark，它涵盖了分类、聚类、检索、排序等8大类任务和58个数据集。
    - **检索**(Retrieval)：从一个庞大的文档库中，根据用户输入的查询（Query），找出最相关的文档列表。
    - **语义文本相似度**(Semantic Textual Similarity, STS)：判断一对句子的语义相似程度，并给出一个连续的分数（例如1到5分）。
    - **重排序**(Reranking)：对一个已经初步检索出的文档列表进行二次优化排序，使得最相关的文档排在最前面。
    - **分类**(Classification)：将单个文本（如电影评论、新闻文章）划分到预定义的类别中（如“正面/负面”、“体育/科技”）。
    - **聚类**(Clustering)：在没有任何预设标签的情况下，将一组文本自动地分成若干个有意义的群组，使得同一组内的文本语义相似，不同组间的文本语义差异大。
    - **对分类**(Pair Classification)：判断一对文本（句子或段落）是否具有某种特定关系，通常是二分类问题，如“是否是重复问题”、“是否是转述关系”。
    - **双语挖掘**(Bitext Mining)：从两种不同语言的大量句子中，找出互为翻译的句子对。对于机器翻译至关重要。
    - **摘要**(Summarization)：这个任务比较特殊，它不是让模型生成摘要，而是评估一个机器生成的摘要与人工撰写的参考摘要之间的语义相似度。


举例（参考 https://www.guofei.site/2026/01/17/agent.html ）：
```python
from sentence_transformers import SentenceTransformer

embed_model = SentenceTransformer("./bge-small-zh-v1.5")

embedding = embed_model.encode(sentence)
```

**query 改写**




## 参考资料
http://scikit-learn.org/stable/modules/feature_extraction.html  
https://blog.csdn.net/pipisorry/article/details/41957763  
Nick McClure:《TensorFlow机器学习实战指南》 机械工业出版社  
lan Goodfellow:《深度学习》 人民邮电出版社  
王琛等：《深度学习原理与TensorFlow实战》 电子工业出版社  
李嘉璇：《TensorFlow技术解析与实战》 人民邮电出版社  
黄文坚：《TensorFlow实战》 电子工业出版社  
郑泽宇等：《TensorFlow实战Google深度学习框架》 电子工业出版社
