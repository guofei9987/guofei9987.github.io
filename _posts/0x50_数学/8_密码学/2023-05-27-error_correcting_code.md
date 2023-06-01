---
layout: post
title: 【纠错码】入门
categories:
tags: 0x58_密码学
keywords:
description:
order: 59003
---


常见的纠错码有：海明码、循环冗余检验码（CRC码）、卷积码、布谷鸟码等。

- 奇偶校验码（Parity code）：最简单的纠错码，通过在数据后添加一个校验位，使数据中二进制位1的个数为奇数或偶数。
- 海明码（Hamming code）：通过在数据中添加冗余位，使得任何单一位的错误都可以被检测和纠正。
- 布朗码（BCH code）：一种通用的纠错码，可以检测和纠正多位错误，并被广泛应用于磁盘和数据存储等领域。
- RS码（Reed-Solomon code）：一种广泛使用的纠错码，常用于数字通信、数据存储、光纤通信等领域，可以纠正多达t个错误。
- LDPC码（Low-Density Parity-Check code）: 一种最新的纠错码技术，应用广泛，如蓝光、DVD、WiFi、有线电视等。该编码方式在通信链路带宽利用效率和纠错性能方面取得了很好的平衡。



Simple checksum trick
- 算法：所有的值相加，模10，作为校验码
- 缺点：如果两个数字同时变化，就可能校验错误

```python
import numpy as np


def get_checksum(content):
    # Simple checksum trick
    return np.sum(content) % 10


def check(content_with_check):
    return get_checksum(content_with_check[:-1]) == content_with_check[-1]


# 带传输的数据
content = [1, 2, 3, 5, 4]
content_with_check = content+[get_checksum(content)]
# 传输过程中，一个数字变化
content_with_check[0] = 3
print('未发生变化' if check(content_with_check) else '发生变化')
```

Staircase Checksum trick
- Simple checksum trick中，如果两个数字变化，有可能无法检测到
- 所以用 Staircase Checksum trick 做改进

```python
def get_checksum(content):
    # Staircase Checksum trick
    checksum = 0
    for idx, data in enumerate(content):
        checksum += (idx + 1) * data
    return checksum % 10
```

position trick
- 我们还希望能定位到哪个数字错了
- 算法：把数字写成nxm的矩阵，然后对每行每列做 Simple Checksum