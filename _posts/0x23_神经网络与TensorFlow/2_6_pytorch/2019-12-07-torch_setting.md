---
layout: post
title: 【pytorch】【进行中】基本配置
categories:
tags: 0x26_torch
keywords:
description:
order: 261
---


## 安装GPU驱动（待续）

参考： https://zhuanlan.zhihu.com/p/366882419


```bash
# 查看电脑的显卡型号
lspci | grep -i nvidia

# 进入管理员权限
sudo -s
```

禁用Nouveau驱动

```bash
# 禁用Nouveau驱动
vim /etc/modprobe.d/blacklist-nouveau.conf
# 在文件最后加入以下内容
blacklist nouveau
options nouveau modeset=0
# 然后保存退出

# 更新并重启
update-initramfs -u
reboot
# 检查是否禁用成功
lspci | grep nouveau
# 没有内容输出，说明禁用成功。


# 看看gcc和cmake是否已经安装
gcc --version
cmake --version
# 如果没有，旧安装
apt-get install build-essential
apt-get install cmake
```

下载驱动
```bash
# 列出可用的驱动
sudo ubuntu-drivers devices
# 下载：
# https://www.nvidia.com/Download/index.aspx?lang=cn
```

安装驱动
```bash
# 关闭显示管理
service lightdm stop
# 如果没有的话，需要安装（sudo apt install -y lightdm）

# ctrl+alt+F1 进入
cd /home/username/Downloads  # 此处的目录为你下载的驱动文件所在目录
sh NVIDIA-Linux-x86_64-415.27.run --no-opengl-files
# 一路continue

# 查询驱动是否安装成功
nvidia-smi
```


## 安装torch

[官网上的安装教程](https://pytorch.org/get-started/locally/)

## GPU
```python
import torch

torch.cuda.is_available() # 返回 True/False 表示GPU是否可用
torch.cuda.device_count() # 可用的GPU数量
```

转为GPU
```python

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
# 'cuda' 等同于 'cuda:X',其中X是torch.cuda.current_device()
model.to(device) # 模型
mytensor = my_tensor.to(device) # tensor

model = nn.DataParallel(model)
```

### 并行资源

```python
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
