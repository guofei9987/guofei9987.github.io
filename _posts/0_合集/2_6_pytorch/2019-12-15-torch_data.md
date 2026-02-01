---
layout: post
title: 【pytorch】data
categories: torch
tags: 
keywords:
description:
order: 263
---


## 整体架构
分为3部分
1. Transforms
    - 用来做数据预处理，例如图片的缩放、剪切、正则化。
    - `torchvision.transforms` 有现成的实现
    - `torchvision.transforms.Compose` 可以把多个串起来，当成一个来用
    - 可以自定义，继承自 `object`
2. Dataset：
    - 用来设定如何读取数据源，整合 Transforms
    - 可以自定义，继承自 `torch.utils.data.Dataset`
    - 也可以用 `dataset = torch.utils.data.Dataset(x_train_tensor, y_train_tensor)`
    - `torchvision.datasets` 有现成的实现。例如 `torchvision.datasets.ImageFolder()` 以及经典数据集
3. `torch.utils.data.DataLoader(dataset=dataset, batch_size=batch_size, shuffle=True, num_workers=num_workers)`
    - 是一个iterable对象




## 简单示例

```python
import torch
from torchvision import transforms, datasets

# Compose 已弃用，改为 RandomResizedCrop
my_transform = transforms.Compose([
    transforms.RandomSizedCrop(224),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])
my_dataset = datasets.ImageFolder(root='hymenoptera_data/train',
                                  transform=my_transform)
my_dataloader = torch.utils.data.DataLoader(
    my_dataset, batch_size=4, shuffle=True,
    num_workers=4)

# DataLoader也预提供了不同的用法：
torch.utils.data.DataLoader
torch.utils.data.RandomSampler
torch.utils.data.SequentialSampler
```


## 自定义
### 1. Transformer


写法1
```python
# 例如，下面这个对图片做一些操作
import torch
from torch.utils.data import DataLoader
from torchvision import transforms, datasets


class MyTransformer(object):
    def __init__(self, output_size):
        assert isinstance(output_size, (int, tuple))
        self.output_size = output_size

    def __call__(self, sample):
        image, landmarks = sample['image'], sample['landmarks']
        pass  # 可以有很复杂的数据预处理逻辑，省略不写了
        return {'image': image, 'landmarks': landmarks}

my_transformer = MyTransformer(255)
```

写法2:
```python
# 例如，skimage 中有很多现成的，并且可以用 Compose 连接起来，当成一个用
from skimage import io, transform

my_transformer = transforms.Compose([
    MyTransformer(256),
    transforms.RandomCrop(224),
    transforms.RandomResizedCrop(224),
    transforms.ToTensor()
])
```

### 2. Dataset

写法1:
```python
class MyDataset(torch.utils.data.Dataset):
    """Face Landmarks dataset."""

    def __init__(self, csv_file, root_dir, transform=None):
        """
        Args:
            csv_file (string): Path to the csv file with annotations.
            root_dir (string): Directory with all the images.
            transform (callable, optional): Optional transform to be applied
                on a sample.
        """
        self.landmarks_frame = pd.read_csv(csv_file)
        self.root_dir = root_dir
        self.transform = transform

    def __len__(self):
        return len(self.landmarks_frame)

    def __getitem__(self, idx):
        if torch.is_tensor(idx):
            idx = idx.tolist()

        img_name = os.path.join(self.root_dir,
                                self.landmarks_frame.iloc[idx, 0])
        image = io.imread(img_name)
        landmarks = self.landmarks_frame.iloc[idx, 1:]
        landmarks = np.array([landmarks])
        landmarks = landmarks.astype('float').reshape(-1, 2)
        sample = {'image': image, 'landmarks': landmarks}

        if self.transform:
            sample = self.transform(sample)

        return sample
        # 另一个源码返回的是这个：
        # img_data,target


my_dataset = MyDataset(
    csv_file='data/faces/face_landmarks.csv',
    root_dir='data/faces/',
    transform=my_transformer)
```

简洁写法（通用）
```python
my_dataset = TensorDataset(torch.tensor(data), torch.tensor(label))
```



简洁写法（图像类）
```python
from torchvision import datasets

my_dataset = datasets.ImageFolder('./train', transform=my_transformer)

# 目录格式约定如下：
# 图片文件名随意，目录名字就是类名
'''
.
├── train
│   ├── ants
│   │   └── ant2.jpg
│   └── bees
│       ├── a.jpg
│       └── b.jpg
└── val
    ├── ants
    │   ├── ant8.jpg
    │   └── ant9.jpg
    └── bees
        └── bee3.jpg
'''
```

### 3. DataLoader


```python
dataloader = torch.utils.data.DataLoader(dataset=dataset, batch_size=batch_size, shuffle=True, num_workers=num_workers)
```


dataloader 是一个可迭代对象:
```python
import torch.optim as optim


dataiter = iter(dataloader)
imgs, labels = next(dataiter)

# 训练时，是这样做的：
model = model_ft.to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=7, gamma=0.1) # 这是一个学习率下降的东西
for epoch in range(num_epochs):
    for inputs, labels in dataloaders:
        inputs, labels = inputs.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(inputs)
        _, preds = torch.max(outputs, 1) # 如果
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
    scheduler.step()
```
