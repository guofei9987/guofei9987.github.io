---
layout: post
title: 【pytorch】基本语法
categories:
tags: 0x26_torch
keywords:
description:
order: 262
---





## Tensor

新建
```python
torch.empty(5, 3)
torch.ones(3, 3)
torch.ones_like(...)
torch.zeros(5, 3, dtype=torch.long)
torch.eye(5)

torch.arange(start=0, end=8, step=2) # 含头不含尾
torch.linspace(start=0, end=9, steps=5) # 均匀的取5个值，含头含尾


# 随机生成
torch.manual_seed(2) # 设置种子
print(torch.initial_seed()) 查看种子
torch.rand(5, 3)
torch.randn(5, 3)
torch.randn_like(x, dtype=torch.float)


# 从其它数据新建
torch.tensor([5.5, 3], dtype=torch.float32)
# torch.from_numpy(np.ones()) # 用上面的也可以
```


数据类型转换
```python
x.int()
x.long()
x.float()
x.bool()
x.char() # int8 类型
x.double()

# 有这些类型
torch.bool
torch.int
torch.short
torch.uint8 # 这个是 ByteTensor
torch.int
torch.int8
torch.int16
torch.int32
torch.long
torch.float
torch.float16
torch.float32
torch.float64
torch.double
torch.complex32
torch.complex64
# 还有很多其它



# 四舍五入
x.round()
x.fix()
x.floor()
```


运算
```python
torch.add(x, y)
# 或者
x + y

# 或者
result = torch.empty(5, 3)
torch.add(x, y, out=result)




# 大多数运算符后面可以加个下划线，表示替换运算
# 替换加
y.add_(x) # 这个会把加法的结果赋值给y
# 如 x.copy_(y), x.t_()


```



取数
```python
x.size() # torch.Size([5, 3])
x.numel() # 共多少个元素

# index 和 Numpy 一样
x[:, 1]

# 获取某一行
x.select(dim=1,index=2) # 获取按照 dim 计算的 第 index 组。
# 例子的 dim=1 表示获取的是列，index=2 表示获取第 2 列


# tensor 转其它格式
x.numpy() # 转 np.array
x.tolist() # 转 list

# 转 Python 数字，只有单个元素的时候可以用
x[0][0].item()

# 注意一个特性: 共享内存
x = torch.ones(2)
y = x.numpy()
x += 1
print(x, y)
# 打印：tensor([2., 2.]) [2. 2.]

# 值得一提，反过来也是这个特性
a = np.ones(5)
b = torch.from_numpy(a)
a += 1
print(a, b)
# [2. 2.] tensor([2., 2.])
```

reshape
```python
# 修正：新版本已可用
# reshape 也可以做下面这些事，但不能reshape到1维（？不知道为什么要这么设计）

x = torch.randn(4, 4)
x.reshape(2, -1)
x.reshape(-1)
```


GPU

```python
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# 先生成，再放入 GPU
x = torch.randn(4, 4).to(device)
# 或者直接在 GPU 生成
x = torch.randn(4, 4, device=device)
# 也可以是字符串
# device = 'cpu' # device = 'cuda'
# ...to(device)
```




### 基本运算

```python
x.sqrt()
x.square()
x.exp()

x.cos()
x.cosh()
x.acos()
x.acosh()
x.arccos()
x.arccosh()
```

矩阵运算

```py
x = torch.rand(5, 5)

# 矩阵积
x.matmul(x)
# 矩阵的点积
x * x


U, S, V = x.svd()
eigenvalues, eigenvectors = x.eig(eigenvectors=False) # 默认不计算特征向量


x1.diag() # 对角线
```

矩阵变换
```py
x.flip(dim) # 按照 dim 确定的维度翻转

x.t() # 转秩


x.tril(k=0) # 下三角矩阵
x.triu(k=0) # 上三角矩阵

# cat
x1 = torch.rand(3, 2)
x2 = torch.rand(3, 2)

torch.cat([x1, x2], dim=0)

# 分割
x = torch.arange(0,12,step=1).reshape(2,6)
x.chunk(chunks=3, dim=1) # 尽量均匀分为三份
# 分为3份，大小分别是 1，3，2
torch.split(x, split_size_or_sections=(1, 3, 2), dim=1)
# 按 dim=1 分为3份，其大小分别为 1, 3, 2
```

where

```py
torch.where(x1 > 0.5, x1, x2)
torch.clip(x1, min=0.4, max=0.6)
```



按位运算
```python
# dtype 必须是 int 类型，最好是 uint8
x1 = torch.tensor([1, 2, 3], dtype=torch.uint8)
x2 = torch.tensor([1, 1, 1], dtype=torch.uint8)


x1 & x2  # 按位与
x1 | x2  # 按位或
~x1  # 按位非
x1 ^ x2  # 按位异或
# 以上对应的运算符为：x1.bitwise_or(x2) 等类似的东西

x1 << 1  # 移位运算
# x1.bitwise_left_shift(1)
```

逻辑运算
```python
# 0 转为 False，别的数字都转为 True
x1 = torch.tensor([-0.9, 0, True, False], dtype=torch.bool)

# >、<、==、 >=、 <= 都可以
x2 = torch.rand(size=(4,)) < 0.5

# logic and:
x1 * x2
x1 *= x2

# logic or:
x1 + x2
x1 += x2

x1.logical_and(x2)
x1.logical_or(x2)
x1.logical_xor(x2)
x1.logical_xor_(x2)
x1.logical_not()
x1.logical_not_()
```





### 统计类运算

```py
x.mean()
x.mean(dim=1,keepdim=True)

x.max()
values, indices = x.max(dim=1, keepdim=True)

x.min()
x.mode()

values, indices = x.sort(dim=1, descending=False)

x.argmin()
x.argsort()
x1.argmax(dim=1, keepdim=True)

x.histc
x.histogram

x.std

```



## 激活函数


### 激活函数
- ReLU  
ReLU(Rectifier Linear Unit),其函数为$max(0,x)$  
```py
torch.nn.ReLU
```
- ReLU6  
是 hard-sigmoid 的变种$min(max(0,x),6)$  
```py
torch.nn.ReLU6
```
- sigmoid
$1/(1+exp(-x))$
```py
torch.nn.Sigmoid
```
- tanh
$\dfrac{1-e^{2x}}{1+e^{-2x}}$
```py
torch.nn.Tanh
```
- softsign  
是符号函数的连续估计$x/(abs(x)+1)$  
```py
torch.nn.Softsign
```
- softplus  
是ReLU的平滑版 $log(exp(x)+1)$
```py
torch.nn.softplus
```
- ELU(Exponential Linear Unit)  
类似于softplus  
```py
# 表达式为 (exp(x)+1) if x<0 else x
torch.nn.ELU
torch.nn.Softmax
```


|激励函数|优点|缺点|
|--|--|--|
|Sigmoid|不容易出现极端值|收敛速度慢
|ReLU|收敛速度快|容易出现极端值|


2019年5月22日更新（来自吴恩达的 DeepLearning.ai 课程）：  
- sigmoid: never use, except output layer  
- tanh: pretty much strictly superior then sigmoid  
- ReLU: if you do not know which to choose, always choose ReLU  
- Leaky ReLU： you may try this $max(0.01z,z)$

**About derivative**（自己推导一下）  
- sigmoid:$g(x)=\dfrac{1}{1+e^{-z}},g'(z)=g(z)(1-g(z))$  
- tanh:$g(x)=\dfrac{e^z-e^{-z}}{e^z+e^{-z}},g'(z)=1-(g(z))^2$  
- ReLU/Leaky RelU： 分段函数，注意0点的情况 does not matter

### 卷积相关

```py
torch.nn.Conv2d(in_channels=1  # 灰度图
                      , out_channels=16, kernel_size=5, stride=1
                      , padding=2)  # 如果像保持输出的 size 和原来一样，需要 padding = (kernel_size-1)/2 if stride=1
nn.MaxPool2d(kernel_size=2)



tf.nn.conv2d(input,filter,strides=[1,1,1,1],padding='SAME')
# 对四维数据进行二维卷积操作
# input: [batch, in_height, in_width, in_channels]
# filter: [filter_height, filter_width, in_channels, out_channels]
# strides: [1,stride_horizontal,,stride_vertices,1]
# padding='SAME'表示边界加上padding，使得卷积的输入和输出保持同样的尺寸
# padding='VALID' 表示不在边界上加padding


tf.nn.convolution(input,filter, padding,strides=None,dilation_rate=None,name=None,data_format=None)
# N维卷积的和

tf.nn.conv1d(value,filters,stride,padding,use_cudnn_on_gpu=None,data_format=None,name=None)
# 对三维数据进行一维卷积操作
# value:[batch,in_width,in_channels]
# filter:[filter_width,in_channels,out_channels]

tf.nn.conv3d(input, filter, strides, padding)
# input: [batch,in_depth,in_height,in_width,in_channels]
# filter: [filter_depth, filter_height, filter_width, in_channels, out_channels]
# strides: [1,stride1,stride2,stride3,1]

tf.nn.depthwise_conv2d(input, filter, strides, padding, rate=None, name=None, data_format=None)
# input :[batch,in_height,in_width,in_channels]
# filter :[filter_height,filter_width,in_channels,channel_multiplier]
# 输出是[batch, out_height, out_width, in_channels * channel_multiplier]

tf.nn.separable_conv2d(input,depthwise_filter,pointwise_filter,strides,padding,rat,name,data_format)

tf.nn.atrous_conv2d
tf.nn.conv2d_transpose
```

池化层
```py
tf.nn.max_pool(x,ksize=[1,2,2,1],strides=[1,2,2,1],padding='SAME') #横竖步长为2，
# 每个输出元素是池化区域的最大值
tf.nn.avg_pool # 每个输出元素是池化区域的平均值
tf.nn.max_pool_with_argmax
# 返回最大值和最大值所在位置 (output,argmax),
# 其中output是每个池化区域的最大值。argmax是一个四维 <Targmax> 类型

tf.nn.avg_pool3d

```

## 正则化项

### l1和l2

### dropout
dropout 用来减轻 overfitting
```py
# 定义一个 dropout
self.dropout = nn.Dropout(config.dropout)
# config.dropout = 0.5

# 使用 dropout
out = self.dropout(out)
```



```py
tf.nn.lrn(pool1,4,bias=1,alpha=0.001/9.0,beta=0.75)
#LRN模仿生物的侧抑制机制，对局部神经元创建竞争环境，使其中响应大的值相对更大，并抑制其它反馈小的神经元。从而增强泛化能力
#可以用于Pooling之后，也可以用于conv之后、Pooling之前
#适用于ReLu这种没有上界的激活函数，不适合Sigmoid这种有固定边界，或者能抑制过大值得激活函数
```

### BN
Batch Normalization
```py
待填入
```

BN不能紧跟着dropout，否则会抖动严重


## 损失函数
1. 交叉熵 $H(p,q)=-\sum p(x)\log q(x)$
```py
criterion = nn.CrossEntropyLoss()
```
2. MSE $MSE(y,y')=\dfrac{\sum (y-y')^2}{n}$
```py
criterion = nn.MSELoss()
```
3. 自定义。例如，预测销量时，多预测一个损失1元，少预测1个损失10元。  
$Loss(y,y')=\sum f(y_i,y_i')$,  
其中，$$f(x,y)=\left\{\begin{array}{ccc}a(x-y)&x>y\\
b(y-x)&x\leq y\end{array}\right.$$
```py
```

## 优化器

### AUTOGRAD


```python
# 方法1
x = torch.ones(2, 2, requires_grad=True)
# requires_grad 默认为 False

# 方法2
x = torch.ones(2, 2)
x.requires_grad = True
```


```python
y = x + 2
# y.requires_grad 为 True
# y.grad_fn 非空
```


案例：

```py
y = x + 2
# 只要 x.requires_grad == True，那么对 x 的大多数运算都符合：
# y.requires_grad 为 True
# y.grad_fn 非空
z = y * y * 3
k = z.mean()
# 同上，z.requires_grad 和 k.requires_grad 都是 True
```

- `x.requires_grad` 如果设定为 Ture，后面用到y的变量都会计算梯度
- `y.grad_fn` 是与梯度计算有关的函数


```python
# 求导数
k.backward() # 开始计算梯度
print(x.grad) # 返回梯度值
# 1. 返回 dk/dx_ij，形式是矩阵
# 2. 只会给出叶子的导数。所以 z.grad 没有值。因为计算这个值往往意义不大
# 3. 如果确实需要 z.grad，提前声明 z.retain_grad()

x.is_leaf, y.is_leaf # (True, False)
```

要点：
- `k.backward()` 只能运行一次
- `k.backward(retain_graph=True)` 可以运行多次，但结果为上一次的累加，（会导致内存占用较多？）


```python
# ???
# 如果 out 是一个 tensor 数据类型的矢量，那么这样
v = torch.tensor([1.0, 2, 3])
y.backward(v)
# ？？？但我没搞清楚这个对应哪个数学公式
```


![optimization1](/pictures_for_blog/optimization/optimization1.gif)

![optimization2](/pictures_for_blog/optimization/optimization2.jpg)

[官网解释1](https://www.tensorflow.org/api_docs/python/tf/train)  
[官网解释2](https://www.tensorflow.org/api_guides/python/train)  


```py
tf.train.GradientDescentOptimizer # 如果每次只传入batch，那么就变成随机梯度下降
tf.train.AdadeltaOptimizer

# 下面两个是常用的高阶Optimizer
tf.train.MomentumOptimizer # 学习率不只是考虑这一次的学习趋势，而且考虑上一次的学习趋势
tf.train.AdamOptimizer

tf.train.RMSPropOptimizer # alpha go所使用的优化器
```


### 1. SGD类
#### 1.1 BGD
batch gradient descent, 就是输入全部数据求得平均误差，然后以此为依据，进行一次迭代更新

$\theta=\theta-\alpha \nabla_\theta J(\theta)$  

优点:
- cost fuction若为凸函数，能够保证收敛到全局最优值；若为非凸函数，能够收敛到局部最优值

缺点:
- 每轮迭代都需要在整个数据集上计算一次，速度慢
- 需要较大内存
- 批量梯度下降不允许在线更新模型，例如新增实例。


#### 1.2 SGD
stochastic gradient descent, 每次读入一个数据进行计算。  

$\theta=\theta-\alpha \nabla_\theta J(\theta,x^{(i)},y^{(i)})$  

优点:
- 算法收敛速度快(在Batch Gradient Descent算法中, 每轮会计算很多相似样本的梯度, 这部分是冗余的)
- 可以在线更新
- 有几率跳出一个比较差的局部最优而收敛到一个更好的局部最优甚至是全局最优


缺点：
1. 由于是随机抽取，梯度不可避免会有误差，因此需要调整学习率。
2. 容易局部最优，容易陷入马鞍点

#### 1.3 Mini-batch Gradient Descent
Mini-batch Gradient Descent, 将数据分为很多batch，每次随机抽取一个batch进行迭代运算。  

$\theta=\theta-\alpha \nabla_\theta J(\theta,x^{(i:i+n)},y^{(i:i+n)})$


以上方法的共同缺点是：
1. 学习率$\alpha$难以选择
2. 往往陷入局部最优


### 2. Momentum

#### 2.1 Momentum
模拟物理中的动量概念，优点是前期能够加速震荡，后期再局部最小值附近震荡时，能够抑制震荡，加快收敛。

$v_t=\gamma v_{t-1}+\nabla_\theta J(\theta)$  
$\theta \leftarrow \theta-v_t$  
特点：
- 下降初期，能够加速下降
- 下降中后期，康震荡

#### 2.2 Nesterov Momentum法

在小球向下滚动的过程中，我们希望小球能够提前知道在哪些地方坡面会上升，这样在遇到上升坡面之前，小球就开始减速。这方法就是Nesterov Momentum，其在凸优化中有较强的理论保证收敛。并且，在实践中Nesterov Momentum也比单纯的 Momentum 的效果好：  

$v_t=\gamma v_{t-1}+\nabla_\theta J(\theta-\gamma v_{t-1})$  
$\theta \leftarrow \theta-v_t$  

这样理解：$\theta-\gamma v_{t-1}$是小球对下一个位置的“展望”  


### 3. AdaGrad法
自适应地为各个参数分配不同的学习率，能够控制每个维度的梯度方向。  


AdaGrad 算法的一次迭代时这样的：
- 取一个batch
- 计算梯度，这一步与SGD一样 $g\leftarrow \dfrac{1}{m}\nabla_\theta \sum_i L(f(x^{(i)};\theta),y^{(i)})$  
- 累积平方梯度 $r\leftarrow r+g\bigodot g$  
- 计算更新$\Delta \theta \leftarrow \dfrac{\epsilon}{\delta+\sqrt r}\bigodot g$
- 应用迭代$\theta\leftarrow \theta+\Delta \theta$


用语言描述就是：梯度越小的分量（从图上看越平缓）下降越快，反之下降越慢。

![](https://github.com/guofei9987/pictures_for_blog/blob/master/optimization/AdaGrad.jpeg?raw=true)
（图片来源于[别人写的文章](https://www.sohu.com/a/197074244_206784)）  

这个图里的划线部分是传统的 mini-batch ，如果用 AdaGrad 可以小勺一些震荡。


### Adalelta
Adagrad法存在的问题：学习率单调递减，需要手动设置全局初始学习率。  
Adadelta法用一阶方法，近似模拟二阶牛顿法，解决了以上问题
### RMSProp法
与Momentum类似地方法，通过引入衰减系数，使每回合都衰减一定的比例。  
适用于RNN  
Adagrad会累加之前所有的梯度平方，而RMSprop仅仅是计算对应的平均值，因此可缓解Adagrad算法学习率下降较快的问题。  
- 取一个batch
- 计算梯度，这一步与SGD一样 $g\leftarrow \dfrac{1}{m}\nabla_\theta \sum_i L(f(x^{(i)};\theta),y^{(i)})$  
- $r\leftarrow \rho r+(1-\rho)g\bigodot g$  
- 计算更新$\Delta \theta \leftarrow \dfrac{\epsilon}{\delta+\sqrt r}\bigodot g$
- 应用迭代$\theta\leftarrow \theta+\Delta \theta$


### Adam
名称来源于 adaptive moment estimation. 根据损失函数对每个参数的梯度的一阶矩估计和二阶矩估计动态调整每个参数的学习率。  
本质上是 Momentum + RMSProp  

（tf的默认参数: $\alpha=0.001,\beta_1=0.9, \beta_2=0.999, \epsilon=10^{-8}$）  
$g_t$ 是梯度  
$m_t=\beta_1 m_{t-1}+(1-\beta_1) g_t$  
$v_t=\beta_2 v_{t-1}+(1-\beta_2)g_t^2$  
$\hat m_t=\dfrac{m_t}{1-\beta_1^t}$  
$\hat v_t=\dfrac{v_t}{1-\beta_2^t}$  
$\theta_{t+1}=\theta_t-\dfrac{\alpha}{\sqrt {\hat v_t}+\epsilon} \hat m_t$  

## 学习率
`tf.train.exponential_decay` 指数下降法减小学习率  
decayed_learning_rate=learning_rate * decay_rate ** (global_step/decay_steps)
```py
learning_rate=tf.train.exponential_decay(0.01,global_step=10000,decay_steps=100,decay_rate=0.96,staircase=True)
```
staircase=True时，(global_step/decay_steps)会转化成整数，使得学习率阶梯下降

学习率的图：
```py
import tensorflow as tf
sess=tf.Session()

global_step_=tf.constant(0)
c=tf.train.exponential_decay(learning_rate=0.01,global_step=global_step_,decay_steps=100,decay_rate=0.96,staircase=False)
d=tf.train.exponential_decay(learning_rate=0.01,global_step=global_step_,decay_steps=100,decay_rate=0.96,staircase=True)
steps,learning_rates_c,learning_rates_d=[],[],[]
for i in range(1000):
    steps.append(i)
    learning_rates_c.append(sess.run(c,feed_dict={global_step_:i}))
    learning_rates_d.append(sess.run(d,feed_dict={global_step_:i}))


import matplotlib.pyplot as plt
plt.plot(steps,learning_rates_c)
plt.plot(steps,learning_rates_d)
plt.show()
```
![learning_rate1](https://github.com/guofei9987/StatisticsBlog/blob/master/%E9%99%84%E4%BB%B6/tf/learning_rate1.png?raw=true)



用法案例
```py
import tensorflow as tf
TRAINING_STEPS = 100
global_step = tf.Variable(0)
LEARNING_RATE = tf.train.exponential_decay(0.1, global_step, 1, 0.96, staircase=True)

x = tf.Variable(tf.constant(5, dtype=tf.float32), name="x")
y = tf.square(x)
train_op = tf.train.GradientDescentOptimizer(LEARNING_RATE).minimize(y, global_step=global_step)

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    for i in range(TRAINING_STEPS):
        sess.run(train_op)
        if i % 10 == 0:
            LEARNING_RATE_value = sess.run(LEARNING_RATE)
            x_value = sess.run(x)
            print ("After %s iteration(s): x%s is %f, learning rate is %f."% (i+1, i+1, x_value, LEARNING_RATE_value))
```

## 关于局部最优

做梯度下降时，往往会收敛到各维度一阶导数为0的点。  
我们往往觉得这是一个局部最优点，但实际上有可能是鞍点。下面是鞍点的图示：  


![鞍点](/pictures_for_blog/optimization/saddle1.jpg)

![鞍点](/pictures_for_blog/optimization/saddle2.gif)


**判断鞍点的一个充分条件是：函数在一阶导数为零处（驻点）的 Hessian matrix 为不定矩阵。**

这让我们想到，如果算法收敛到一个点（各维度的一阶导数一定为0），那么这个点是不定矩阵的概率是 $1-0.5^n$，n较大时，这个数接近0.  
也就是说，**高维空间中的鞍点数量远远大于最优点**  
**看起来，模型几乎收敛到鞍点** （错误的结论，下面解释）  

在鞍点，一个随机的扰动，就会滑出鞍点。这是 mini-batch 的优势。**大部分时候收敛到的并不是鞍点**  
（另外，还有些鞍点是难以逃离的）

因此，高维空间里（深度学习问题上）真正可怕的不是局部最优也不是鞍点问题，而是一些特殊地形。比如大面积的平坦区域。  
