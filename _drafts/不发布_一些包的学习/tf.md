
```
with tf.Graph().as_default():
    pass
```

## slim
很有用的东西，可以不用设置中间变量，给函数赋值
```
slim=tf.contrib.slim
with slim.arg_scope([slim.conv2d,slim.fully_connected],weights_regularizer=slim.l2_regularizer(weights_decay)):
    pass
```

### 队列和同步运算
Enqueue，Deq
ueue，MutexAcquire，MuterRelease
### 控制流
Merge，Switch，Enter，Leave，NextIteration

```py
x=tf.placeholder(shape=(None,6),dtype=tf.float32)
w1=tf.Variable(tf.random_normal(shape=(6,2)))
a=tf.matmul(x,w1) #矩阵乘法

sess.run(tf.global_variables_initializer())
sess.run(a,feed_dict={x:rv.rvs(size=(3,6))})
```


有很多已经训练好的模型，可以直接下载下来作为预训练模型  
https://github.com/tensorflow/models


keras

## 人脸检测
人脸检测：检测并定位图片中的人脸  
人脸关键点检测：返回五官和轮廓关键点的位置  
人脸属性检测：年龄、种族、性别、情绪


## 移动端
两种方法加快运行速度
### 1. 量化
quantitative  
例如，float32变成int8  
训练时不能量化，因为牵涉到梯度。  
部署时可以量化，因为神经网络对噪声的鲁棒性很强  

## 性能指标
### 1. 人脸识别
Top k 错误率  
Top k 召回率  
识别速度  
注册速度（注册一个人的时间）  
### 2. 聊天机器人
1. 回答与问应当语义一致、语法正确、逻辑正确
2. 有趣、多样，少一些安全回答（好啊，是啊之类的）
3. 个性表达一致


## 其它
```
tf.train.batch
tf.train.shuffle_batch
```

```
lstm:dropout
```
## 其它2
autoencoder的代码还没有review

## tensorboard
```
tf.summay.scalar # 标量数据，如准确率，损失值
tf.summay.histogram # 参数数据，如weights，bias
tf.summay.image # 图像数据
tf.summay.audio # 音频
tf.summay.FileWriter # 计算图结构

```

## RNN
- 听：语音识别（Speech To Text），从音频到文本
- 说：语音合成（Text To Speech），从文本到音频
- 读：文本理解（Text Understanding），从文本到语义
- 写：文本生成（Text Generation），从语义到文本


1. 文本理解
    - 新闻自动分类（文本分类）
    - 用户评论分析（情感分析）
2. 文本生成
    - 翻译


图像识别中，图片大小的问题可以通过裁剪、缩放解决，但文本处理中并不能。

### 对话机器人
- 基于规则：人工标注，对语料进行数据挖掘，来减少人工标注的工作量
- 基于检索
- 基于生成模型
