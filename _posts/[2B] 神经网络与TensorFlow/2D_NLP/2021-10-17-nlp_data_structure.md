---
layout: post
title: 【NLP】基本数据结构
categories:
tags: 2-4-NLP
keywords:
description:
order: 341
---

任务：我们事先有个词典，任务是给定一句话，找出这句话中所有在词典中的词语。

例如“商品和服务”，应当提取出 “商品”，“和”，“和服”，“服务”


用最粗暴的遍历当然可以解决，为了提升性能，显然有些做法：
- [BinTrie](https://github.com/hankcs/HanLP/blob/v1.7.5/src/test/java/com/hankcs/book/ch02/BinTrieBasedSegmentation.java)
- [DoubleArrayTrie](https://github.com/hankcs/HanLP/blob/v1.7.5/src/test/java/com/hankcs/book/ch02/DoubleArrayTrieBasedSegmentation.java)
- [AC自动机](https://github.com/hankcs/HanLP/blob/v1.7.5/src/test/java/com/hankcs/book/ch02/AhoCorasickSegmentation.java)
- [AC自动机+DoubleArrayTrie](https://github.com/hankcs/HanLP/blob/v1.7.5/src/test/java/com/hankcs/book/ch02/AhoCorasickDoubleArrayTrieSegmentation.java)


### trie

![trie](/pictures_for_blog/algorithm/tree/trie.jpeg)


这个版本是我见过实现最好的

```Python
class Node(object):
    def __init__(self, value) -> None:
        self._children = {}
        self._value = value

    def _add_child(self, char, value, overwrite=False):
        child = self._children.get(char)
        if child is None:
            child = Node(value)
            self._children[char] = child
        elif overwrite:
            child._value = value
        return child


class Trie(Node):
    def __init__(self) -> None:
        super().__init__(None)

    def __contains__(self, key):
        return self[key] is not None

    def __getitem__(self, key):
        state = self
        for char in key:
            state = state._children.get(char)
            if state is None:
                return None
        return state._value

    def __setitem__(self, key, value):
        state = self
        for i, char in enumerate(key):
            if i < len(key) - 1:
                state = state._add_child(char, None, False)
            else:
                state = state._add_child(char, value, True)
```

如何使用
```Python
trie = Trie()
# 增
trie['自然'] = 'nature'
trie['自然人'] = 'human'
trie['自然语言'] = 'language'
trie['自语'] = 'talk	to oneself'
trie['入门'] = 'introduction'
assert '自然' in trie
# 删
trie['自然'] = None
assert '自然' not in trie
# 改
trie['自然语言'] = 'human language'
assert trie['自然语言'] == 'human language'
# 查
assert trie['入门'] == 'introduction'
```


#### 改进1

上面的实现中，我们用 dict 来查找下一个字符，这里面有个问题
- dict 对应的 hash 是针对字符串而设计的，它是64位hash
- 而我们的数据只有 char
- 因此浪费了大量性能

#### 改进2

如果 “自然” 这条路径不存在，那么 “自然语言处理” 这个路径一定不存在，就没必要往下查询了。
