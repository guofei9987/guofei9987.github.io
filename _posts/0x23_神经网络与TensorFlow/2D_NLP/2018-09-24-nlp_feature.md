---
layout: post
title: 【NLP】feature提取
categories:
tags: 0x24_NLP
keywords:
description:
order: 301
---



一些约定：（为了变量名前后统一，并且开箱即用，约定一些固定的符号）
- `y`: target 标签, 0/1 或者在多分类模型中是 0/1/2，一维的，直接传到模型里面
- `documents_raw`：原始语料， `list<str>`
- `documents`: 初步清洗后的语料 `list<str>`
- `X`: 特征提取后的向量




## 1. 文本数据的初步清洗
### step1 读入数据
```py
import pandas as pd
df = pd.read_csv('http://www.guofei.site/datasets_for_ml/SMSSpamCollection/SMSSpamCollection.csv', sep='\t', header=None, names=['label', 'documents'])
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

df = pd.read_csv('外卖评价语料.csv')
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
有时候我们想要调整某些特定单词的权重，提高有用单词的权重，降低常用或无意义单词的权重。  


$f_{ij}=$frequency of term (feature) i in doc j  
$TF_{ij}=\dfrac{f_{ij}}{\sum_k f_{kj}}$  


$n_i=$number of docs that mention term i  
$N=$total number of docs  
$IDF_{i}=\log\dfrac{N}{n_i}$，某个单词越频繁出现，这个数字越小  


$TF-IDF_{ij}=TF_{ij}\times IDF_i$  


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


## 其它的特征提取方法


```py
text.HashingVectorizer  # 占用内存更少，索引速度更快
VectorizerMixin
```


## 参考资料
http://scikit-learn.org/stable/modules/feature_extraction.html  
https://blog.csdn.net/pipisorry/article/details/41957763  
Nick McClure:《TensorFlow机器学习实战指南》 机械工业出版社  
lan Goodfellow:《深度学习》 人民邮电出版社  
王琛等：《深度学习原理与TensorFlow实战》 电子工业出版社  
李嘉璇：《TensorFlow技术解析与实战》 人民邮电出版社  
黄文坚：《TensorFlow实战》 电子工业出版社  
郑泽宇等：《TensorFlow实战Google深度学习框架》 电子工业出版社
