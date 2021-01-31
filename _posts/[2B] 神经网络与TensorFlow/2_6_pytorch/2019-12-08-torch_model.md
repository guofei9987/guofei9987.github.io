---
layout: post
title: 【pytorch】【进行中】建立模型
categories:
tags: 2-6-torch
keywords:
description:
order: 262
---



## 配置
[官网上的安装教程](https://pytorch.org/get-started/locally/)

```python
import torch
torch.cuda.is_available() # 看 cuda 是否可用
```

## 开始
### 生成Tensor
- 新生成
```python
torch.empty(5, 3)
torch.rand(5, 3)
torch.zeros(5, 3, dtype=torch.long)
# dtype=torch.float, torch.double
```
- 从其它数据
```python
torch.tensor([5.5, 3])
```
- like
```python
torch.randn_like(x, dtype=torch.float)
```


### 运算
```python
torch.add(x, y)

# 或者
result = torch.empty(5, 3)
torch.add(x, y, out=result)

# 替换加
y.add_(x) # 这个会把加法的结果赋值给y
```

**注：加下划线后，是替换，很多这样的例子，如x.copy_(y), x.t_()**

### size
```
x.size()
```

index 和 Numpy 一样
```python
x[:, 1]
```

reshape
```python
# reshape 也可以做下面这些事，但不能reshape到1维（？不知道为什么要这么设计）
x = torch.randn(4, 4)
y = x.view(16)
z = x.view(-1, 8)
```

tensor 转其它格式
- 转数字
```python
# 用来转为 Python 的数字，但只能转单元数tensor
x = torch.randn(1)
print(x.item())
```
- 转 NumPy
```python
# tensor 转 numpy
x = torch.ones(5)
x.numpy()
```

注意一个特性: 共享内存
```python
x = torch.ones(5)
y = x.numpy()
x += 1
print(x, y)
# 这个打印出来都是2，说明：
# +=是指针操作内存
# 转 numpy 时共用内存


# 值得一提，反过来也是这个特性
a = np.ones(5)
b = torch.from_numpy(a)
a += 1
print(a, b)
```

## AUTOGRAD

- `y.requires_grad` 如果设定为 Ture，后面用到y的变量都会计算梯度
- `y.grad_fn` 返回创建时的函数（？可能是用来算梯度的）
- `out.backward()` 算梯度，执行这个命令后，可以用 `x.grad` 来查看前面层的梯度


下面是案例
```python
import torch

x = torch.ones(2, 2, requires_grad=True)
# requires_grad 默认为 False，
# 这种情况下对应的 x和后续的y，其 .grad_fn, .grad 都是 None，其.requires_grad 都是 False  

y = x + 2
print(y.grad_fn)
print('是否计算梯度:', y.requires_grad)
z = y * y * 3
out = z.mean()
out.backward()
print(x.grad)
# 返回的是偏导数矩阵，每一个位置上的元素是 out 对 x_ij 的导数
# 所以这里的 out一定是一个 tensor 数据类型的标量

# 如果 out 是一个 tensor 数据类型的矢量，那么这样
v = torch.tensor([1.0, 2, 3])
y.backward(v)
# ？？？但我没搞清楚这个对应哪个数学公式
```
？另外，第一套中间，`y.grad` 是None，这也不知道为啥，为何中间tensor的梯度不给显示呢?


进一步研究：不计算梯度 `with torch.no_grad():`
```python
x = torch.randn(3, requires_grad=True)
y = x * x
print(y.requires_grad) # True
with torch.no_grad():
    print(y.requires_grad) # True
    y2 = x * x
    print(y2.requires_grad) # False

print(y.requires_grad) # True
print(y2.requires_grad) # False
```
或者使用 `y = x.detach()` 生成的是数据共享内存，但制定不微分的新 Tensor

## 神经网络

这个包搭建神经网络的方式很有意思啊，很 pythonic  
下面这个是官方代码
```python
import torch
import torch.nn as nn
import torch.nn.functional as F


class Net(nn.Module):

    def __init__(self):
        super(Net, self).__init__()
        # 1 input image channel, 6 output channels, 3x3 square convolution
        # kernel
        self.conv1 = nn.Conv2d(1, 6, 3)
        self.conv2 = nn.Conv2d(6, 16, 3)
        # an affine operation: y = Wx + b
        self.fc1 = nn.Linear(16 * 6 * 6, 120)  # 6*6 from image dimension
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        # Max pooling over a (2, 2) window
        x = F.max_pool2d(F.relu(self.conv1(x)), (2, 2))
        # If the size is a square you can only specify a single number
        x = F.max_pool2d(F.relu(self.conv2(x)), 2)
        x = x.view(-1, self.num_flat_features(x))
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

    def num_flat_features(self, x):
        size = x.size()[1:]  # all dimensions except the batch dimension
        num_features = 1
        for s in size:
            num_features *= s
        return num_features


net = Net()

# 下面是看一眼基本情况
print(net) # 会打印出 __init__ 中定义的 nn 函数
net.parameters() # 这是一个 generator，每个元素是一个 Parameter 类型，这个类型和 tensor 很像。例如：
[params.size() for params in net.parameters()]
```

### forward&backprops

```python
# forward
input = torch.randn(1, 1, 32, 32)
out = net(input)

# backprops
net.zero_grad() # parameters 缓冲池归零
out.backward(torch.randn(1, 10))
```

### Loss Function
```python
input = torch.randn(1, 1, 32, 32)
output = net(input)
target = torch.randn(1,10)

criterion = nn.MSELoss()
loss = criterion(output, target)
print(loss)
```
### Backprop
求梯度
```python
net.zero_grad()
loss.backward()

net.conv1.bias.grad
```
可以手动去做 SGD
```python
learning_rate = 0.01
for f in net.parameters():
    f.data.sub_(f.grad.data * learning_rate)
```
但是推荐这么做
```python
import torch.optim as optim

# create your optimizer
optimizer = optim.SGD(net.parameters(), lr=0.01)

# in your training loop:
optimizer.zero_grad()   # zero the gradient buffers
output = net(input)
loss = criterion(output, target)
loss.backward()
optimizer.step()    # Does the update
```

### 合起来

制造数据
```python
from sklearn import datasets

X, y = datasets. \
    make_classification(n_samples=1000,
                        n_features=10,
                        n_informative=5,
                        n_redundant=2,  # 用 n_informative 线性组合出这么多个特征
                        n_classes=3,
                        n_clusters_per_class=1,
                        flip_y=0.05  # 随机交换这么多比例的y，以制造噪声
                        )

from sklearn import model_selection

X_train, X_test, y_train, y_test = model_selection.train_test_split(X, y, test_size=0.2)
```

构建并训练神经网络
```python
import torch
import torch.nn as nn
import torch.nn.functional as F


class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.fc1 = nn.Linear(10, 10)
        self.fc2 = nn.Linear(10, 3)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        return x


net = Net()

import torch.optim as optim

criterion = nn.CrossEntropyLoss()
# 这个criterion是这样的，预测值是倒数第二层的输出，真实值是不做OneHot的label
optimizer = optim.SGD(net.parameters(), lr=0.001, momentum=0.9)

X_train = torch.tensor(X_train, dtype=torch.float)
X_test = torch.tensor(X_test, dtype=torch.float)
y_train = torch.tensor(y_train, dtype=torch.long)
y_test = torch.tensor(y_test, dtype=torch.long)

for epoch in range(50):
    for i in range(1000):
        optimizer.zero_grad()
        y_hat = net(X_train)
        loss = criterion(y_hat, y_train)
        loss.backward()
        optimizer.step()

        if i % 200 == 0:
            print('loss:', criterion(net(X_test), y_test).item())

_, y_predicted = torch.max(net(X_test), 1)

from sklearn import metrics

metrics.confusion_matrix(y_predicted, y_test)
```
### 常用网络节点

```
nn.Conv2d(3, 6, 5)
nn.MaxPool2d(2, 2)
Linear(16 * 5 * 5, 120)
```

常用激活函数

```
F.relu()
```

优化器
```python
optimizer=optim.Adam(net.parameters(),weight_decay =0.0001) # weight_decay 是 L2 penalty
```
