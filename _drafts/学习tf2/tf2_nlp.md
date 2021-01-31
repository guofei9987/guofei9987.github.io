




## 示例2
需要下载两个包，分别是训练好的模型、数据
```bash
!pip install -q tensorflow-hub
!pip install -q tensorflow-datasets
```

### 使用训练好的模型
下面是一些训练好的 word embedding 模型
- google/tf2-preview/gnews-swivel-20dim/1
- google/tf2-preview/gnews-swivel-20dim-with-oov/1 与上面这个相同，但是 2.5% 作为OOV，因此适合用来 task 的 vocabulary 不重合的情况。
- google/tf2-preview/nnlm-en-dim50/1 很大的模型，1M vocabulary + 50 dimensions
- google/tf2-preview/nnlm-en-dim128/1 更大的模型 1M vocabulary + 128 dimensions

使用方法有两种：
#### 第一种使用方法
```python
import tensorflow_hub as hub

embed = hub.load("https://hub.tensorflow.google.cn/google/tf2-preview/gnews-swivel-20dim/1")
embeddings = embed(["cat is on the mat", "dog is in the fog"])
```

#### 第二种使用方法

```python
hub_layer = hub.KerasLayer("https://hub.tensorflow.google.cn/google/tf2-preview/gnews-swivel-20dim/1", output_shape=[20],
                           input_shape=[], dtype=tf.string)

model = keras.Sequential()
model.add(hub_layer)
model.add(keras.layers.Dense(16, activation='relu'))
model.add(keras.layers.Dense(1, activation='sigmoid'))

model.summary()
```

### 完整的代码
导入包
```python
import tensorflow as tf

!pip install -q tensorflow-hub
!pip install -q tensorflow-datasets
import tensorflow_hub as hub
import tensorflow_datasets as tfds


print("Version: ", tf.__version__)
print("Eager mode: ", tf.executing_eagerly())
print("Hub version: ", hub.__version__)
print("GPU is", "available" if tf.config.experimental.list_physical_devices("GPU") else "NOT AVAILABLE")



train_validation_split = tfds.Split.TRAIN.subsplit([6, 4])

(train_data, validation_data), test_data = tfds.load(
    name="imdb_reviews",
    split=(train_validation_split, tfds.Split.TEST),
    as_supervised=True)



train_examples_batch, train_labels_batch = next(iter(train_data.batch(10)))
train_examples_batch
```

下载已经训练好的模型，作为 embedding

```python
embedding = "https://hub.tensorflow.google.cn/google/tf2-preview/gnews-swivel-20dim/1"
hub_layer = hub.KerasLayer(embedding, input_shape=[],
                           dtype=tf.string, trainable=True)
hub_layer(train_examples_batch[:3])
```

用 keras 建模
```python
model = tf.keras.Sequential()
model.add(hub_layer)
model.add(tf.keras.layers.Dense(16, activation='relu'))
model.add(tf.keras.layers.Dense(1, activation='sigmoid'))

model.summary()
```

标准流程了
```python
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

history = model.fit(train_data.shuffle(10000).batch(512),
                    epochs=20,
                    validation_data=validation_data.batch(512),
                    verbose=1)
```

加上一个模型评估
```python
results = model.evaluate(test_data.batch(512), verbose=2)

for name, value in zip(model.metrics_names, results):
    print("%s: %.3f" % (name, value))
```

## 
