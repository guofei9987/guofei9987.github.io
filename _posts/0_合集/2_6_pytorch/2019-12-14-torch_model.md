---
layout: post
title: 【pytorch】建立模型
categories: torch
tags: 
keywords:
description:
order: 264
---




## 最小实践：分类模型

step1:编数据
```python
from sklearn import datasets
from sklearn.preprocessing import StandardScaler
from sklearn import model_selection, datasets


X, y = datasets. \
    make_classification(n_samples=100_000,
                        n_features=10,
                        n_informative=5,
                        n_redundant=2,  # 用 n_informative 线性组合出这么多个特征
                        n_classes=3,
                        n_clusters_per_class=1,
                        flip_y=0.05  # 随机交换这么多比例的y，以制造噪声
                        )

from sklearn import model_selection

X_train, X_test, y_train, y_test = model_selection.train_test_split(X, y, test_size=0.2)

# NN基本上都要做标准化。图像类是归一化到 0~1，文本类是 embedding
# 只在训练集上 fit，避免数据穿越
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

step2:构建神经网络

```python
import torch
import torch.nn as nn
import torch.nn.functional as F


class MyNet(nn.Module):
    def __init__(self):
        super(MyNet, self).__init__()
        self.fc1 = nn.Linear(10, 20)
        self.fc2 = nn.Linear(20, 3)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x


my_net = MyNet()
```

step3: 定义参数和损失函数
```python
epochs = 101

# batch_size 大训练更快，但更容易泛化变差
batch_size = 1024

print_every = 5

criterion = nn.CrossEntropyLoss()
# 用的是是最后一层输出 logits（未 softmax）

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
print(device)

optimizer = torch.optim.Adam(my_net.parameters(), lr=1e-3)
```

step4：训练
```python
from torch.utils.data import TensorDataset, DataLoader
from sklearn import metrics
import numpy as np

my_net.to(device)

# dataset / dataloader
X_train_tensor = torch.tensor(X_train, dtype=torch.float32)
y_train_tensor = torch.tensor(y_train, dtype=torch.long)
train_loader = DataLoader(
    TensorDataset(X_train_tensor, y_train_tensor),
    batch_size=batch_size,
    shuffle=True
)

X_test_tensor  = torch.tensor(X_test, dtype=torch.float32, device=device)
y_test_tensor  = torch.tensor(y_test, dtype=torch.long, device=device)


for epoch in range(epochs):
    my_net.train()
    running_loss = 0.0
    n = 0

    for xb, yb in train_loader:
        # 训练数据放入 device
        xb = xb.to(device)
        yb = yb.to(device)
        
        # 每次迭代都要清空梯度
        optimizer.zero_grad()

        # 前向传播
        logits = my_net(xb)

        # 计算损失
        loss = criterion(logits, yb)

        # 反向传播
        loss.backward()

        # 更新权重参数值
        optimizer.step()

        running_loss += loss.item() * xb.size(0)
        n += xb.size(0)

    train_loss = running_loss / n

    if epoch % print_every == 0:
        my_net.eval()
        with torch.no_grad():
            test_logits = my_net(X_test_tensor)
            test_loss = criterion(test_logits, y_test_tensor).item()
            y_pred = test_logits.argmax(dim=1).cpu().numpy()

        y_true = y_test_tensor.cpu().numpy()
        precision = metrics.precision_score(y_true, y_pred, average="macro", zero_division=0)
        recall = metrics.recall_score(y_true, y_pred, average="macro", zero_division=0)

        print(f"epoch={epoch:3d} train_loss={train_loss:.5f} "
              f"test_loss={test_loss:.5f} precision={precision:.4f} recall={recall:.4f}")

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



## 最小实践：回归模型

```python
# 编数据

from sklearn import datasets
from sklearn import model_selection
from sklearn import preprocessing
import numpy as np
import torch
from torch import nn
from torch.utils.data import TensorDataset, DataLoader

X, y, coef = \
    datasets.make_regression(n_samples=1000,
                             n_features=5,
                             n_informative=3,  # 其中，3个feature是有信息的
                             n_targets=1,  # 多少个 target
                             bias=1,  # 就是 intercept
                             coef=True,  # 为True时，会返回真实的coef值
                             noise=1,  # 噪声的标准差
                             )

X_train, X_test, y_train, y_test = model_selection.train_test_split(
    X.astype(np.float32), y.reshape(-1, 1).astype(np.float32), test_size=0.2)

# 要标准化
X_scaler, y_scaler = preprocessing.StandardScaler(), preprocessing.StandardScaler()
X_train = X_scaler.fit_transform(X_train).astype(np.float32)
X_test = X_scaler.transform(X_test).astype(np.float32)
y_train = y_scaler.fit_transform(y_train).astype(np.float32)
y_test = y_scaler.transform(y_test).astype(np.float32)


# %% 建模型
class MyModel(nn.Module):
    def __init__(self, input_dim, output_dim):
        super(MyModel, self).__init__()
        self.linear = nn.Linear(input_dim, output_dim, bias=True)

    def forward(self, x):
        out = self.linear(x)
        return out


my_model = MyModel(input_dim=5, output_dim=1)

# %% 超参数和损失函数
epochs = 401
learning_rate = 0.01
batch_size = 512

criterion = nn.MSELoss()
optimizer = torch.optim.SGD(my_model.parameters(), lr=learning_rate)

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
print(device)

# %% 构建数据

# 使用 DataLoader 做 batch
X_train_t = torch.tensor(X_train, dtype=torch.float32)
y_train_t = torch.tensor(y_train, dtype=torch.float32)
X_test_t = torch.tensor(X_test, dtype=torch.float32, device=device)
y_test_t = torch.tensor(y_test, dtype=torch.float32, device=device)

dataloader_train = DataLoader(
    TensorDataset(X_train_t, y_train_t),
    batch_size=batch_size,
    shuffle=True,
    num_workers=0,
    pin_memory=torch.cuda.is_available()
)

# %% 定义测评指标
import numpy as np
from sklearn import metrics


def eval_1(model, X, y, y_scaler):
    model.eval()
    with torch.no_grad():
        X = X.to(device)
        y_hat_np = model(X).cpu().numpy()
    y_np = y.cpu().numpy()

    # 返回到原来的尺度
    y_hat_np = y_scaler.inverse_transform(y_hat_np)
    y_np = y_scaler.inverse_transform(y_np)

    # 计算 MAE、MSE、R2
    mae = metrics.mean_absolute_error(y_np, y_hat_np)
    rmse = np.sqrt(metrics.mean_squared_error(y_np, y_hat_np))
    r2 = metrics.r2_score(y_np, y_hat_np)
    return mae, rmse, r2


# %% 训练

my_model = my_model.to(device)

for epoch in range(epochs):
    my_model.train()
    for xb, yb in dataloader_train:
        xb = xb.to(device, non_blocking=True)  # 允许异步拷贝，从而节省时间
        yb = yb.to(device, non_blocking=True)

        optimizer.zero_grad()
        pred = my_model(xb)
        loss = criterion(pred, yb)
        loss.backward()
        optimizer.step()

    if epoch % 50 == 0:
        mae_tr, rmse_tr, r2_tr = eval_1(model=my_model, X=X_train_t, y=y_train_t, y_scaler=y_scaler)
        mae_te, rmse_te, r2_te = eval_1(model=my_model, X=X_test_t, y=y_test_t, y_scaler=y_scaler)

        print(f"epoch {epoch:3d} | "
              f"train MAE={mae_tr:.4f} RMSE={rmse_tr:.4f} R2={r2_tr:.4f} | "
              f"test  MAE={mae_te:.4f} RMSE={rmse_te:.4f} R2={r2_te:.4f}")

# %% 预测（输出回到原 y 尺度）
my_model.eval()
with torch.no_grad():
    y_hat_scaled = my_model(X_test_t.to(device)).cpu().numpy()

y_hat = y_scaler.inverse_transform(y_hat_scaled)
```


## DDP

如果有多个 GPU，可以并行训练，其原理很简单，各 GPU 上独立计算梯度，然后做 All-Reduce 求平均，再各自更新参数


```
from torch.nn.parallel import DistributedDataParallel as DDP
```




这里分3步：
1. 生成数据并保存
2. 并行训练
3. 推理


step1: 编造数据，并保存。以及把标准化的模型一起保存
```python
# make_data.py
import os
import numpy as np
from sklearn import datasets, model_selection
from sklearn.preprocessing import StandardScaler
import joblib


def main(seed=42, out_dir="data"):
    os.makedirs(out_dir, exist_ok=True)

    X, y = datasets.make_classification(
        n_samples=100_000,
        n_features=10,
        n_informative=5,
        n_redundant=2,
        n_classes=3,
        n_clusters_per_class=1,
        flip_y=0.05,
        random_state=seed
    )

    X_train, X_test, y_train, y_test = model_selection.train_test_split(
        X, y, test_size=0.2, random_state=seed, stratify=y
    )

    # 只在训练集上 fit，避免数据穿越
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    np.savez_compressed(
        os.path.join(out_dir, "cls_data.npz"),
        X_train=X_train.astype(np.float32),
        y_train=y_train.astype(np.int64),
        X_test=X_test.astype(np.float32),
        y_test=y_test.astype(np.int64),
    )
    joblib.dump(scaler, os.path.join(out_dir, "scaler.joblib"))

    print(f"Saved: {out_dir}/cls_data.npz, {out_dir}/scaler.joblib")


if __name__ == "__main__":
    main()
```


step2: 训练

```python
# 4个 GPU 并行训练，执行以下脚本：
# torchrun --standalone --nproc_per_node=4 train_ddp.py
# train_ddp.py
import os
import numpy as np
from dataclasses import dataclass

import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.distributed as dist

from torch.utils.data import TensorDataset, DataLoader
from torch.utils.data.distributed import DistributedSampler
from torch.nn.parallel import DistributedDataParallel as DDP

from sklearn import metrics


@dataclass
class Config:
    data_path: str = "data/cls_data.npz"
    ckpt_dir: str = "ckpt"
    ckpt_name: str = "model.pt"

    epochs: int = 101
    batch_size: int = 1024
    lr: float = 1e-3
    print_every: int = 5
    num_workers: int = 2
    seed: int = 42


class MyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 20)
        self.fc2 = nn.Linear(20, 3)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        return self.fc2(x)  # logits


def is_main() -> bool:
    return dist.get_rank() == 0


def ddp_setup():
    """
    torchrun 会注入环境变量：RANK, WORLD_SIZE, LOCAL_RANK
    RANK 是全局 rank，每个进程有唯一的编号，范围 [0, WORLD_SIZE-1]
    LOCAL_RANK 是本机 rank，范围 [0, nproc_per_node-1]
    """
    if not torch.cuda.is_available():
        raise RuntimeError("未检测到 CUDA/GPU")

    if "RANK" not in os.environ or "WORLD_SIZE" not in os.environ:
        raise RuntimeError("启动方式：torchrun --standalone --nproc_per_node=4 train_ddp.py ")

    dist.init_process_group(backend="nccl")

    if not (dist.is_available() and dist.is_initialized()):
        raise RuntimeError("初始化失败")

    local_rank = int(os.environ["LOCAL_RANK"])
    # 设置默认的 CUDA，不然的话，其它代码如果未指定GPU号则会都集中在 CUDA:0 上
    torch.cuda.set_device(local_rank)

    # 一些相关配置：
    # dist.get_world_size()
    return local_rank


def ddp_cleanup():
    dist.destroy_process_group()


def set_seed(seed: int):
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    np.random.seed(seed)


@torch.no_grad()
def evaluate(model, device, X_test, y_test, criterion):
    model.eval()
    logits = model(X_test)
    loss = criterion(logits, y_test).item()
    y_pred = logits.argmax(dim=1).cpu().numpy()
    y_true = y_test.cpu().numpy()
    precision = metrics.precision_score(y_true, y_pred, average="macro", zero_division=0)
    recall = metrics.recall_score(y_true, y_pred, average="macro", zero_division=0)
    return loss, precision, recall


def main():
    cfg = Config()
    os.makedirs(cfg.ckpt_dir, exist_ok=True)

    local_rank = ddp_setup()
    set_seed(cfg.seed + dist.get_rank())

    device = torch.device("cuda", local_rank)
    print("启动设备：", device)

    # load data
    d = np.load(cfg.data_path)
    X_train = torch.from_numpy(d["X_train"])
    y_train = torch.from_numpy(d["y_train"])
    # 评估只在主进程做
    X_test = torch.from_numpy(d["X_test"]).to(device) if is_main() else None
    y_test = torch.from_numpy(d["y_test"]).to(device) if is_main() else None

    train_ds = TensorDataset(X_train, y_train)

    # DDP sampler
    sampler = DistributedSampler(train_ds, shuffle=True)

    train_loader = DataLoader(
        train_ds,
        batch_size=cfg.batch_size,
        sampler=sampler,
        num_workers=cfg.num_workers,
        pin_memory=True,  # 锁定内存页，提高 CPU -> GPU 的搬运效率
        drop_last=False
    )

    # model / loss / optim
    model = MyNet().to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=cfg.lr)

    # wrap DDP
    model = DDP(model, device_ids=[device.index])

    for epoch in range(cfg.epochs):
        sampler.set_epoch(epoch)

        model.train()
        running_loss = 0.0
        n = 0

        for xb, yb in train_loader:
            xb = xb.to(device, non_blocking=True)
            yb = yb.to(device, non_blocking=True)

            optimizer.zero_grad(set_to_none=True)
            logits = model(xb)
            loss = criterion(logits, yb)

            # 这一步 DDP 会对所有 GPU 上的梯度做 reduce
            # 发生阻塞，DDP 做了优化，“边算边通信”
            loss.backward()
            optimizer.step()  # 每个进程用相同的梯度更新自己的模型副本

            running_loss += loss.item() * xb.size(0)
            n += xb.size(0)

        train_loss_local = running_loss / max(n, 1)

        # 汇总各进程的 train loss（加权平均）
        t = torch.tensor([running_loss, n], dtype=torch.float64, device=device)
        # 对所有进程的 t 求和，并广播回各自进程的 t
        dist.all_reduce(t, op=dist.ReduceOp.SUM)
        train_loss = (t[0] / t[1]).item()

        if (epoch % cfg.print_every == 0) and is_main():
            # 注意：DDP 下 model 是 wrapper，真实模型是 model.module
            eval_model = model.module
            test_loss, precision, recall = evaluate(eval_model, device, X_test, y_test, criterion)

            print(
                f"epoch={epoch:3d} "
                f"train_loss={train_loss:.5f} "
                f"test_loss={test_loss:.5f} "
                f"precision={precision:.4f} recall={recall:.4f}"
            )

    # save checkpoint（只在主进程保存）
    if is_main():
        raw_model = model.module
        ckpt_path = os.path.join(cfg.ckpt_dir, cfg.ckpt_name)
        torch.save(
            {
                "model_state_dict": raw_model.state_dict(),
                "config": cfg.__dict__,
            },
            ckpt_path
        )
        print(f"Saved checkpoint to: {ckpt_path}")

    ddp_cleanup()


if __name__ == "__main__":
    main()
```


原理说明：
1. 会在 CPU 上启动4个进程，每个进程绑定一个 GPU
2. 每个 GPU 上计算梯度，然后 reduce，然后用相同的梯度更新各自的模型副本


加载模型，并做推理

```python
# infer.py
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from sklearn import metrics


class MyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 20)
        self.fc2 = nn.Linear(20, 3)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        return self.fc2(x)


def main(data_path="data/cls_data.npz", ckpt_path="ckpt/model.pt"):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    d = np.load(data_path)
    X_test = torch.from_numpy(d["X_test"]).to(device)
    y_test = d["y_test"]  # numpy

    model = MyNet().to(device)
    ckpt = torch.load(ckpt_path, map_location=device)
    model.load_state_dict(ckpt["model_state_dict"])
    model.eval()

    with torch.no_grad():
        logits = model(X_test)
        y_pred = logits.argmax(dim=1).cpu().numpy()

    print("confusion_matrix=\n", metrics.confusion_matrix(y_test, y_pred))


if __name__ == "__main__":
    main()
```





## 一些研究




可以手动去做 SGD
```python
learning_rate = 0.01
for f in net.parameters():
    f.data.sub_(f.grad.data * learning_rate)
```



### 从raw建立神经网络

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
