---
layout: post
title: 【pytorch】【进行中】运算符
categories:
tags: 0x26_torch
keywords:
description:
order: 263
---


## 基本

```python
m = torch.tensor([[1, 2], [3, 4]])


# 矩阵积
m.matmul(m)

# 矩阵的点积
m * m

```

## 布尔类型
### ByteTensor
生成
```python
# 转换后是 torch.uint8 数据类型
torch.ByteTensor([1.1, 2, 3]) # 对于小数，会取整。对于溢出的数（大于255或负的），会舍弃溢出位数
# 但是，如果输入的是Tensor，会卡死，这么解决：
torch.tensor([1, 2, 3]).type(torch.int8)
```
运算
```python
a = torch.ByteTensor([0, 1, 0, 1])
b = torch.ByteTensor([1, 1, 0, 0])

a & b # logical and
a|b # logical or
a^b # logical xor
~a # 并不是，logical not，而是按位与，你需要 1-a
```



### BoolTensor
生成
```python
torch.BoolTensor([1.1, 2, 0.9, -0.9, 0, True, False])
# 输出 tensor([ True,  True, False, False, False,  True, False])
# 绝对值小于1的，都会转成 False, 其它转为 True

# 直接大于、小于、等于都可以
torch.rand(size=(5, 6)) < 0.5
```
运算
```python
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
