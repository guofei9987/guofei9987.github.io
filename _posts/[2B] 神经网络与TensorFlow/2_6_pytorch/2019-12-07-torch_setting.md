---
layout: post
title: 【pytorch】【进行中】基本配置
categories:
tags: 0x26_torch
keywords:
description:
order: 261
---

## GPU
```python
import torch

torch.cuda.is_available() # 返回 True/False 表示GPU是否可用
torch.cuda.device_count() # 可用的GPU数量
```

转为GPU
```python

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

model.to(device) # 模型
mytensor = my_tensor.to(device) # tensor

model = nn.DataParallel(model)
```

## 案例
```python
model = Model(input_size, output_size)
if torch.cuda.device_count() > 1:
  print("Let's use", torch.cuda.device_count(), "GPUs!")
  # dim = 0 [30, xxx] -> [10, ...], [10, ...], [10, ...] on 3 GPUs
  model = nn.DataParallel(model)

model.to(device)
```
