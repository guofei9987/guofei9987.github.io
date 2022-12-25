---
layout: post
title: 【pytorch】建立模型
categories:
tags: 0x26_torch
keywords:
description:
order: 262
---



## 案例：分类模型

step1:编数据
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

step2:构建神经网络

```python
import torch
import torch.nn as nn
import torch.nn.functional as F


class MyNet(nn.Module):
    def __init__(self):
        super(MyNet, self).__init__()
        self.fc1 = nn.Linear(10, 10)
        self.fc2 = nn.Linear(10, 3)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        return x


my_net = MyNet()

# print(my_net) # 打印网络的基本情况
# my_net.state_dict() 看详细情况
# net.parameters() # <generator of Parameter>，用法类似 tonsor，例如：
# [params.size() for params in net.parameters()]
```

step3: 定义参数和损失函数
```python
epochs = 50
criterion = nn.CrossEntropyLoss()
# 这个criterion是这样的：预测值是倒数第二层的输出，真实值label而不是OneHot
# 对于回归类的问题，可以用 criterion = nn.MSELoss()

optimizer = torch.optim.SGD(my_net.parameters(), lr=0.001, momentum=0.9)
```

step4：训练
```python
X_test_tensor = torch.tensor(X_test, dtype=torch.float)
y_test_tensor = torch.tensor(y_test, dtype=torch.long)

for epoch in range(epochs):
    for i in range(1000):
        # 送入训练数据
        X_train_tensor = torch.tensor(X_train, dtype=torch.float)
        y_train_tensor = torch.tensor(y_train, dtype=torch.long)

        # 每次迭代都要清空梯度
        optimizer.zero_grad()

        # 前向传播
        y_hat = my_net(X_train_tensor)

        # 计算损失
        loss = criterion(y_hat, y_train_tensor)

        # 反向传播
        loss.backward()

        # 更新权重参数值
        optimizer.step()

    if epoch % 2 == 0:
        print("epoch = {}, loss on train {:.5f}, loss on test {:.5f}"
              .format(epoch
                      , loss.item()
                      , criterion(my_net(X_test_tensor), y_test_tensor).item()))
```

step5:模型的保存和读取
```python
torch.save(my_net.state_dict(), 'my_model.pkl')

my_net.load_state_dict(torch.load('my_model.pkl'))
```

step6:使用模型
```python
_, y_predicted = torch.max(my_net(X_test_tensor), 1)

from sklearn import metrics

print('confusion_matrix = \n', metrics.confusion_matrix(y_predicted, y_test))
```


### 注解

如何使用GPU？

```python
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# 1. 模型放入 GPU
model.to(device) # 模型

# 2. 数据也都放入 GPU
mytensor = my_tensor.to(device) # tensor

model = nn.DataParallel(model)
```


## 案例：回归模型

比上面的案例额外多了
- 数据标准化
- 用 DataLoader 划分 batch

```python
# 编数据

from sklearn import datasets
from sklearn import model_selection
from sklearn import preprocessing
import numpy as np

X, y, coef = \
    datasets.make_regression(n_samples=1000,
                             n_features=5,
                             n_informative=3,  # 其中，3个feature是有信息的
                             n_targets=1,  # 多少个 target
                             bias=1,  # 就是 intercept
                             coef=True,  # 为True时，会返回真实的coef值
                             noise=0.001,  # 噪声的标准差
                             )

X_train, X_test, y_train, y_test = model_selection.train_test_split(X.astype(np.float32),
                                                                    y.reshape(-1, 1).astype(np.float32), test_size=0.2)

# 必须标准化
X_Scaler, y_Scaler = preprocessing.StandardScaler(), preprocessing.StandardScaler()
X_train = X_Scaler.fit_transform(X_train).astype(np.float32)
X_test = X_Scaler.transform(X_test).astype(np.float32)
y_train = y_Scaler.fit_transform(y_train)
y_test = y_Scaler.transform(y_test)


# %%

import torch.nn as nn
import torch
from torch.utils.data import TensorDataset
from torch.utils.data import DataLoader

# 使用 DataLoader 做 batch
X_train, X_test, y_train, y_test = map(torch.tensor, (X_train, X_test, y_train, y_test))

batch_size = 20
dataset_train = TensorDataset(X_train, y_train)
dataset_test = TensorDataset(X_test, y_test)

dataloader_train = DataLoader(dataset_train, batch_size=batch_size, shuffle=True)
dataloader_test = DataLoader(dataset_test, batch_size=batch_size * 2)


# %%

class MyModel(nn.Module):
    def __init__(self, input_dim, output_dim):
        super(MyModel, self).__init__()
        self.linear = nn.Linear(input_dim, output_dim, bias=True)

    def forward(self, x):
        out = self.linear(x)
        return out


my_model = MyModel(input_dim=5, output_dim=1)

# 定义参数和损失函数
epochs = 400
learning_rate = 0.01
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(my_model.parameters(), lr=learning_rate)

# %% 训练

for epoch in range(epochs):
    for X_train_batch, y_train_batch in dataloader_train:
        optimizer.zero_grad()
        outputs = my_model(X_train_batch)
        loss = criterion(outputs, y_train_batch)
        loss.backward()
        optimizer.step()

    if epoch % 50 == 0:
        with torch.no_grad():
            loss_train = criterion(my_model(X_train), y_train).item()
            loss_test = criterion(my_model(X_test), y_test).item()
            print("epoch {}, loss_train = {:.5f}, loss_test = {:.5f}".format(epoch, loss_train, loss_test))

# %% 预测
y_hat = my_model(X_test).data.numpy()
```




## 一些研究



不计算梯度 `with torch.no_grad():`
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
或者使用 `y = x.detach()` 生成的是数据共享内存，但指定不微分的新 Tensor




可以手动去做 SGD
```python
learning_rate = 0.01
for f in net.parameters():
    f.data.sub_(f.grad.data * learning_rate)
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


## 从raw建立神经网络

```python
import numpy as np
from sklearn import datasets

X, y, coef = \
    datasets.make_regression(n_samples=1000,
                             n_features=5,
                             n_informative=5,  # 其中，3个feature是有信息的
                             n_targets=1,  # 多少个 target
                             bias=0,  # 就是 intercept
                             coef=True,  # 为True时，会返回真实的coef值
                             noise=0.001,  # 噪声的标准差
                             )

# 必须标准化

from sklearn import preprocessing

X_transform=preprocessing.StandardScaler().fit_transform(X)
y_transform=preprocessing.StandardScaler().fit_transform(y.reshape(-1,1))

# 构建参数

import torch

x_tensor = torch.tensor(X_transform,dtype=float)
y_tensor=torch.tensor(y_transform,dtype=float)

input_size, hidden_size, output_size, batch_size = x_tensor.shape[1], 128, 1, 116
```

方法1:从raw建立

```python
# 权重
weights1 = torch.randn((input_size, hidden_size), dtype=float, requires_grad=True)
biases1 = torch.randn(hidden_size, dtype=float, requires_grad=True)
weights2 = torch.randn((hidden_size, output_size), dtype=float, requires_grad=True)
biases2 = torch.randn(output_size, dtype=float, requires_grad=True)

# 训练

learning_rate = 0.01
losses = []

for i in range(10000):
    hidden = x_tensor.mm(weights1) + biases1
    hidden = torch.relu(hidden)
    y_hat = hidden.mm(weights2) + biases2
    # 可以用 my_nn = torch.nn.Sequential，简化

    # 可以用 cost = torch.nn.MSELoss，以及 loss = cost(y_hat, y) ，简化
    loss = torch.mean((y_hat - y_tensor) ** 2)
    losses.append(loss.data.numpy())

    if i % 1000 == 0:
        print('loss:', loss)

    loss.backward()

    # 更新参数，可以用 optimizer.step() 更新
    weights1.data.add_(-learning_rate * weights1.grad.data)
    biases1.data.add_(-learning_rate * biases1.grad.data)
    weights2.data.add_(-learning_rate * weights2.grad.data)
    biases2.data.add_(-learning_rate * biases2.grad.data)

    # 清空
    weights1.grad.data.zero_()
    biases1.grad.data.zero_()
    weights2.grad.data.zero_()
    biases2.grad.data.zero_()
```    


方法2:使用torch的内置函数，可以有更简洁的写法

```python
my_nn = torch.nn.Sequential(
    torch.nn.Linear(input_size, hidden_size),
    torch.nn.Sigmoid(),
    torch.nn.Linear(hidden_size, output_size)
)

cost = torch.nn.MSELoss(reduction='mean')
optimizer = torch.optim.Adam(my_nn.parameters(), lr=0.001)

# 训练
losses = []
for i in range(1000):
    batch_loss = []

    for start in range(0, len(x_tensor), batch_size):
        end = min(start + batch_size, len(x_tensor))
        xx = torch.tensor(x_tensor[start:end], dtype=torch.float, requires_grad=True)
        yy = torch.tensor(y_tensor[start:end], dtype=torch.float, requires_grad=True)

        y_hat = my_nn(xx)
        loss = cost(y_hat, yy)
        optimizer.zero_grad()
        loss.backward(retain_graph=True)
        optimizer.step()
        batch_loss.append(loss.data.numpy())

    if i % 100 == 0:
        losses.append(np.mean(batch_loss))
    print(i, np.mean(batch_loss))
```
