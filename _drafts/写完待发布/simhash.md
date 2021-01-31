

## 介绍
我们想找到一个能快速、准确找到文档之间相似性的算法。这个算法可以用于论文查重、搜索引擎去重等任务。  

自然想到的解决方法是定义文档相似度函数。但如果仅这样的话，效率就很低，尤其是对于大文档而言。  

## simhash算法
simhash 首次提出见于 Charikar(2002):《Similarity estimation techniques from rounding algorithms》。

对比两个文档是否相同时，会计算对应的hash值(md5和sha256等）。

如果是检测文档是否被篡改时，使用hash值具有不错的表现：修改少许文字，插入广告甚至只是修改了标点符合和错别字，都会导致hash值改变，可是文档的核心内容并未发生改变。

（但我们要的是相反的效果）

simhash 的设计初衷就是使用一种所谓局部 hash 的方法，可以既可以敏感的识别文档的少许修改又可以识别出文档的大多数内容相同。

## 算法实现

step1: 将Doc分词和计算权重，抽取出n个(关键词，权重)对，即 (feature, weight)  
step2: 计算 feature 的 hash，生成 (hash, weight），并将 hash 和 weight 相乘 （本质上是对 hash 值加权）  
step3: 将相乘后的值相加，比如 [13, 108, -22, -5, -32, 55]，并最终转换成simhash值110001（转换的规则为正数为1负数为0）  

## 实现
```python
!pip install simhash

hash1=simhash.Simhash('hello， 你好')
hash2=simhash.Simhash('hello， 再见')

# 得到距离
hash1.distance(hash2)
```

```python
bin(hash1.value) # hash 值，10进制的，所以套个bin
```

注：经测试，会忽略空格和标点符号


## 更复杂的

用结巴分词，然后用tf-idf算法计算权重。最后用simhash。



## 参考文献

https://zhuanlan.zhihu.com/p/92155250
