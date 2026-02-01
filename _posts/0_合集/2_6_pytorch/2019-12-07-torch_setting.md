---
layout: post
title: 【pytorch】【进行中】基本配置
categories: torch
tags: 
keywords:
description:
order: 261
---



## 安装torch

看CUDA版本
```
nvidia-smi
```

[官网上的安装教程](https://pytorch.org/get-started/locally/)


## GPU
```python
import torch
from torch import nn

torch.cuda.is_available() # 返回 True/False 表示GPU是否可用
torch.cuda.device_count() # 可用的GPU数量
```

转为GPU
```python

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
# 'cuda' 等同于 'cuda:X',其中X是torch.cuda.current_device()
model.to(device) # 模型
mytensor = my_tensor.to(device) # tensor

```

### 并行

```python
# torch 默认不会做多显卡计算，用这个
model = nn.DataParallel(model)
# 目前替换：nn.parallel.DistributedDataParallel

# 设定这个之后，CPU占用会极大提高
torch.set_num_threads(num_physical_cores/num_workers)

# 加载并行
DataLoader(..., num_workers=args.nThreads)
```






### 性能相关的其它资料

- [ ] https://zhuanlan.zhihu.com/p/69250939


## 案例
```python
model = Model(input_size, output_size)
if torch.cuda.device_count() > 1:
  print("Let's use", torch.cuda.device_count(), "GPUs!")
  # dim = 0 [30, xxx] -> [10, ...], [10, ...], [10, ...] on 3 GPUs
  model = nn.DataParallel(model)

model.to(device)
```

## 不太常用的代码

```

torch.get_default_dtype()
torch.set_default_dtype(torch.float16)

```


```
torch.ByteTensor([1.1, 2, 3]) # 对于小数，会取整。对于溢出的数（大于255或负的），会舍弃溢出位数
# 但是，如果输入的是Tensor，会卡死，这么解决：
torch.tensor([1, 2, 3]).type(torch.int8)
```



BoolTensor
```python
torch.BoolTensor([1.1, 2, 0.9, -0.9, 0, True, False])
# 输出 tensor([ True,  True, False, False, False,  True, False])
# （新版本已经不对了）绝对值小于1的，都会转成 False, 其它转为 True

# 直接大于、小于、等于都可以
torch.rand(size=(5, 6)) < 0.5

# 运算

# logic and:
a * b
a *= b

# logic or:
a + b
a += b

a.logical_xor(b)
a.logical_xor_(b)
a.logical_not()
a.logical_not_()
```


reshape
```python
# 修正：新版本已可用
# reshape 也可以做下面这些事，但不能reshape到1维（？不知道为什么要这么设计）

x = torch.randn(4, 4)
y = x.view(16)
z = x.view(-1, 8)
```
