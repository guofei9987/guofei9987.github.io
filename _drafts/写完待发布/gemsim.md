
官网 https://radimrehurek.com/gensim/auto_examples/tutorials/run_word2vec.html#sphx-glr-auto-examples-tutorials-run-word2vec-py

## 使用
```python
sentences = [['first', 'sentence'], ['second', 'sentence']]
model = gensim.models.Word2Vec(sentences=sentences, min_count=5)
model.wv.word_vec('first')
```


### 用法详解
```python
gensim.models.Word2Vec(
    sentences=None,
    size=100,
    alpha=0.025,
    window=5,
    min_count=5,
    workers=3,
    min_alpha=0.0001,
    sg=0,
    hs=0,
    negative=5,
    iter=5,
    sorted_vocab=1,
    compute_loss=False,
)

```
- `sentences` 列表格式的语料，或者 `LineSentence` 格式的语料。可以不在这里给出
- `size=100` 隐藏层的单元数，推荐值为几十到几百。这也是参数的个数、向量的维度
- `window=5`：Maximum distance between the current and predicted word within a sentence.
- `min_count=5`出现次数少于这个数的单词会被丢弃
- `workers=3` :并行线程数量，可以 `workers=multiprocessing.cpu_count()` 用掉所有线程
- `sg=0`：0代表skip-gram，1代表CBOW
- `hs=0`：0代表使用负抽样，1代表使用 hierarchical softmax
- `negative=5` ： 负抽样的倍数，通常是 5～20
- `alpha`/`min_alpha` ： 初始和最终学习率
- `iter` ： 迭代次数
- `sorted_vocab` : 1表示按词频降序，0表示否
- `compute_loss` ： True/False 存储并记录 loss，`gensim.models.word2vec.Word2Vec.get_latest_training_loss`。 但想要取得每一步的loss就比较麻烦。






可以不一开始就指定语料
```python
model = gensim.models.Word2Vec(size=200, window=8, min_count=10, iter=10, workers=multiprocessing.cpu_count())

model.build_vocab(x)
model.train(x, total_examples=model.corpus_count, epochs=model.iter)
```


### 从文件中读训练数据
- step1：读入数据。要求list每个元素是一句话。不多说。
- step2:先分词、过滤停词，分词结果用空格分割，然后存到文件。（详见 [另一篇博客](https://www.guofei.site/2018/09/24/nlp_feature.html#%E4%B8%AD%E6%96%87%E6%B8%85%E6%B4%97)）
- step3:读入文件
```python
line_sentence = gensim.models.word2vec.LineSentence(source='中文语料已空格切分.txt')
```
- step4:word2vec
```python
model = gensim.models.Word2Vec(line_sentence)
```
- step5:检查结果
```python
most_similars_precalc = {word : model.wv.most_similar(word) for word in model.wv.index2word}
```

结果就不贴了，还行。因为数据量很小，所以可以把 `iter` 调高。

## 结果分析
```python
model.wv.index2word # vocabulary
model.wv.most_similar(word, topn=10) # 返回一个词的相近词
```

所以就有了下面这些操作：
- 看一些词的相近词
```python
most_similars_precalc = {word : model.wv.most_similar(word) for word in model.wv.index2word[300:1000]}
```
- 上面没有剔除关系分低的词，下面剔一下
```python
# 剔除关系分小于 0.4 的词
tmp={key: [(i,j) for i,j in value if j>0.4] for key, value in most_similars_precalc.items()}
# 空的（没有关系分大于0.4）的词也剔除
{key:value for key, value in tmp.items() if len(value)>0}
```


另外，还有一些操作
```
model.evaluate_word_pairs(*)
```
