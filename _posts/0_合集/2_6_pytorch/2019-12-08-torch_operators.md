---
layout: post
title: 【pytorch】基本语法
categories: torch
tags: 
keywords:
description:
order: 262
---



## 正则化项

### l1和l2

```python
# optimizer = torch.optim.SGD(my_net.parameters(), lr=0.001, momentum=0.9)
# 原来的上面一行代码，替换成下面的多行代码，其它部分不变

weight_p, bias_p = [], []
for name, p in my_net.named_parameters():
    if 'bias' in name:
        bias_p += [p]
    else:
        weight_p += [p]

optimizer = torch.optim.SGD([{'params': weight_p, 'weight_decay': 1e-5},
                             {'params': bias_p, 'weight_decay': 0}],
                            lr=1e-2,
                            momentum=0.9)

```

### dropout
dropout 用来减轻 overfitting
```py
# torch.nn.functional.dropout
# torch.nn.functional.dropout1d
# torch.nn.functional.dropout2d
# torch.nn.functional.dropout3d

torch.nn.functional.dropout(x, p=0.5, training=True, inplace=False)
# p是丢弃概率，1表示全部丢弃
# training=False，表示在训练阶段也不生效


# 类的形式定义：
self.dropout = nn.Dropout(config.dropout)
# config.dropout = 0.5
```




### BN
Batch Normalization
```py
torch.nn.BatchNorm1d # 针对 2 维或者 3 维，输入是 (N, D), 或者 (N, D, L)
torch.nn.BatchNorm2d # 针对 2 维，输入 (N, C, H, W)
torch.nn.BatchNorm3d # 针对 3 维，输入 (N, C, D, H, W)
# 其中，N 是批次数
# D是数据个数
# L是数据长度
# C是通道，H是高度，W是宽度
# D是深度


torch.nn.BatchNorm1d(num_features=5, eps=1e-5
                     , momentum=0.1, affine=True, track_running_stats=True, device=None, dtype=None)
# num_features：二维(N, D) 中的 D，BatchNorm2d 中的 C
# eps：防治0值导致数据溢出
# momentum 动态均值和动态方差所用的动量
# affine 自适应调整 gamma/beta 值，若为 False 则不用它们
# track_running_stats=True 不但追踪当期的均值和方差，还根据之前批次做调整

```

$y = \frac{x - \mathrm{E}[x]}{\sqrt{\mathrm{Var}[x] + \epsilon}} * \gamma + \beta$

BN不能紧跟着dropout，否则会抖动严重


## 损失函数

```
criterion = torch.nn.L1Loss()


```

1. 交叉熵 $H(p,q)=-\sum p(x)\log q(x)$
```py
criterion = nn.CrossEntropyLoss()
torch.nn.CrossEntropyLoss(weight)  # 加权交叉熵
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
4. 多标签二分类任务中的损失函数，每个预测值有 n 个 0/1
```python
torch.nn.BCELoss
torch.nn.BCEWithLogitsLoss
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

开关梯度计算

```python
x = torch.ones(2, 2, requires_grad=True)

# 方法1. 使用 with
with torch.no_grad():
    y = x + 2

print(y.requires_grad)  # False

# 方法2. 使用装饰器
@torch.no_grad()
def func(x):
    return x + 2


y = func(x)
print(y.requires_grad)  # False

# 相反的运算是 torch.enable_grad()，可以嵌入到 no_grad() 代码块里面
# 如果 x 本身没有设置 requires_grad=True，那么即使 enable_grad()，它也不生效

# 方法3. 全局打开/关闭
torch.set_grad_enabled(True)
torch.set_grad_enabled(False)
```


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

### torch中的优化器
```python
optimizer = torch.optim.SGD(my_model.parameters(), lr=learning_rate)
optimizer = torch.optim.Adam(my_model.parameters(),weight_decay =1e-3) # weight_decay 是 L2 penalty
```

适用性
- SGD 对尺度很敏感，因此必须做标准化


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

学习率衰减
```python
# 等间隔调整
scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=7, gamma=0.1)
# 按步调整
torch.optim.lr_scheduler.MultiStepLR

# 指数衰减 lr * (gamma ** step)
torch.optim.lr_scheduler.ExponentialLR

# 余弦退火，学习率按余弦衰减
torch.optim.lr_scheduler.CosineAnnealingLR

# 指标在近几次没有变化时，调整学习率，最常用
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau \
    (optimizer=optimizer
     , mode='min'
     , factor=0.5  # gamma
     , patience=5  # 监控不再减少/增加的次数
     , verbose=True  # 触发规则后打印
     , threshold=1e-4  # 触发规则的阈值
     , threshold_mode='abs'  # 触发规则的计算方法
     , cooldown=0  # 触发规则后停止监控这么多次
     , min_lr=0  # lr最小是这么多
     , eps=1e-8
     )

# 自定义 学习率衰减
torch.optim.lr_scheduler.LambdaLR
```

如何使用？
```python
# 训练阶段，前面一堆代码
optimizer.step()
scheduler.step()
# 后面一堆代码
```

画一个学习率衰减图

```python
optimizer = torch.optim.Adam(my_net.parameters(), lr=0.1)
# scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=20, gamma=0.5)
scheduler = torch.optim.lr_scheduler.ExponentialLR(optimizer, gamma=0.96)

lr_history = []
for i in range(100):
    scheduler.step()
    lr_history.append(optimizer.state_dict()['param_groups'][0]['lr'])
```




![learning_rate1](https://github.com/guofei9987/StatisticsBlog/blob/master/%E9%99%84%E4%BB%B6/tf/learning_rate1.png?raw=true)

## 其它代码
### hook

```python
# 正向时会触发的hook
def func1(model,input,output):pass
my_net.register_forward_hook(func1)
# 反向时会触发的hook
def func2(model,grad_input,grad_output):pass
my_net.register_backward_hook(func2)
```

### 显存不够

如果模型太大，一个batch未必能放进去显存。解决：把一个 batch 分割运行，把梯度累积起来，n次后更新一次

```python
accumulation_steps = 5  # 累积5次，然后更新一次权重

for i in range(1000):
    loss = loss_func(pred, y)
    loss = loss / accumulation_steps
    loss.backward() # 计算 loss
    if (i + 1) % accumulation_steps == 0:
        optimizer.step()  # 参数更新
        optimizer.zero_grad()  # 清空梯度
```

另一种情况，如果有两个独立的子任务，尽量独自前向传播
```py
# 不要这样：
loss = loss1 + loss2
loss.backward()

# 而是这样：
loss = loss1 + loss2
loss1.backward()
loss2.backward()
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
