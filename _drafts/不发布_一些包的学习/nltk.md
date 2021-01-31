NLTK
情感分析
文本相似度
文本分类

## 配置
```py
import nltk
nltk.download()
```


nltk.corpus # 语料库
tokenize # 分词

## 文本预处理流程
1. 原始文本
2. 分词
3. 词形归一化（有时需要词性标注）
4. 去除停用词

### 词形归一化
英语里的单词有各种变化，通常
#### PorterStemmer
特点是不会考虑不规则动词和名词
```py
from nltk.stem.porter import PorterStemmer
porter_stemmer = PorterStemmer()

porter_stemmer.stem('wanted')
porter_stemmer.stem('fishes')
```


还有一种可以指定语言的
```python
from nltk.stem import SnowballStemmer
s=SnowballStemmer(language='english')
s.stem('fishes')
```

#### WordNetLemmatizer
特点是可以用于不规则动词和不规则名词
```python
# nltk.download('wordnet')  # 使用前需要下载

from nltk.stem import WordNetLemmatizer
wordnet_lemmatizer = WordNetLemmatizer()
wordnet_lemmatizer.lemmatize('gone', pos='v') # 指定词性，默认是名词
```
>go


### 词性
```python
nltk.word_tokenize('are you ok')
```
### 停用词
- 功能词，例如冠词，
- 词汇词，广泛使用的词，例如 want

```py
from nltk.corpus import stopwords
'a' in stopwords.words('english')
```
