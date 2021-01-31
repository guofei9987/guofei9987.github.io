---
layout: post
title: 【spark】模型持久化
categories:
tags: 1-1-算法平台
keywords:
description:
order: 173
---



##  PickleSerializer

准备你的模型
```python
from sklearn import linear_model

lm=linear_model.LinearRegression()
x=np.random.rand(1000,1)
y=x+0.1*np.random.rand(1000,1)
lm.fit(x,y)
```

模型转为文本
```python
from pyspark import PickleSerializer
ps=PickleSerializer()
model_str=ps.dumps(obj=lm)
# 是一个 byte 类型的数据，然后可以存到hive了
# 存hive略，要先用 str(model_str) 转为str，然后存hive
# 从hive读取时，用 eval() 转回 Byte 格式
```

文本转模型
```python
from pyspark import PickleSerializer
ps=PickleSerializer()
model_load=ps.loads(model_str)
model_load.predict([[0.1]])
```

## 另外
这个可以序列化 iterator，不过还没试过

```Python
ps.dump_stream
ps.load_stream
```

### MarshalSerializer
faster than PickleSerializer but supports fewer datatypes
