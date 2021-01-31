[tf.data.experimental.CsvDataset](tf.data.experimental.CsvDataset)
用来直接从 gzip中读取csv


下载
```python
TRAIN_DATA_URL = "https://storage.googleapis.com/tf-datasets/titanic/train.csv"
train_file_path = tf.keras.utils.get_file("train.csv", TRAIN_DATA_URL)
# 从网上下载csv，并存到  ~\.keras\datasets 这个文件夹下。
# 返回的 train_file_path 是一个str，内容是存储路径
```

读取本地csv
```python
dataset = tf.data.experimental.make_csv_dataset(
    file_pattern=train_file_path,
    batch_size=5, # Artificially small to make examples easier to show.
    label_name='survived',
    na_value="?",
    num_epochs=1,
    ignore_errors=True)

dataset.take(1) # 返回的是一个generator

# dataset.take(1) 是一个 generator，里面是一个 batch
for batch, label in dataset.take(1):
    for key, value in batch.items():
          # 这里的key是 str，内容是 字段名
          # value是tf.Tensor，内容是 值（batch_size维）
          print(key, value)
```
关注以下参数
- batch_size
- label_name
- select_columns：读入指定的列，其它列被忽略
- column_defaults


然后，还可以：（代码省略，用的时候查）
- 把字符串格式的值，转为float格式
- dataset.map 后的返回值，可以直接作为 `model.fit` 的入参

## numpy

```python
from sklearn import datasets

X, y = datasets.make_classification(n_samples=1000, n_features=10)

dataset = tf.data.Dataset.from_tensor_slices((X, y))
# dataset 的类型是 <BatchDataset>
dataset = dataset.shuffle(100).batch(64)
```

使用
```python
# 取一个batch
dataset.take(1)

# 可以直接使用
model.fit(dataset, epochs=10)
model.evaluate(dataset)
```

numpy 与 tensor 的算子都可以直接相互套用。  
而且他们共享内存，但如果用GPU，那么会做一个copy
```python
import numpy as np

ndarray = np.ones([3, 3])

```


## images
```python
import pathlib
data_dir = tf.keras.utils.get_file(origin='https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos.tgz',
                                         fname='flower_photos', untar=True)
data_dir = pathlib.Path(data_dir)
```
