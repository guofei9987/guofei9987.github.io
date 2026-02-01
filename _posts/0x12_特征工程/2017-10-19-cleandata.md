---
layout: post
title: 🔥 数据清洗与特征工程
categories:
tags: 0x12_特征工程
keywords:
description:
order: 100
---

## 初步清洗

**缺失值**
1. 直接使用。有些模型支持缺失值，如决策树
2. 删除特征。如果某个特征大多数都是缺失值，那么可以删除这个特征
3. 补全
    - 均值填充。缺点是填充的值都一样
    - 众数填充
    - 插值法填充
    - 聚类，然后同类均值插补
    - 建模预测。缺点是：如果缺失属性与其他属性无关，那么预测结果无意义。如果高度相关，那么可以删除特征。  
    - 高维映射。优点：最准确的做法，因为完全保留了信息，也不增加任何信息。  
    - 缺失标记：适用于样本量非常大、缺失的变量是离散的，且非常稀疏。缺失值也当做某类取值处理。它类似One-hot Encode



**异常值**
- **极端值**指的是5 Sigma之外的值
- **离群值**指的是3 Sigma之外的值  
- 确认的方法
    - 画box图检查
    - 用5倍std检查
- 解决方法
    - 盖帽法。把3sigma之外的数据定为sigma
    - **取ln**。有些异常值是因为此变量服从对数正态分布，直接取对数就能解决。
        - 现实中的对数正态分布也很广泛（可能仅次于正态分布）
    - 分类建模。把干扰变量变成分类变量（异常为1，不异常为0）  
    - 离散化。例如做成 高、中、低，三种字段。  
    - 剔除
        - 剔除整行
        - 剔除整列

**冗余值**
- drop_duplicates



## 描述性统计

| 名称 | 特点 |
|------|-----|
| 众数 | 不受极端值影响、不唯一、可用于分布有偏的情况 |
| 中位数 | 不受极端值影响、可用于分布有偏的情况 |
| 平均值 | 易受极端值影响、数学性质较好、适用于无偏的情况 |

<br>


| 数据类型 | 适用哪些 |
|---------|---------|
| 分类数据 | **众数** |
| 顺序数据 | **中位数**、四分位数、众数|
| 间隔数据 | **平均数**、四分位数、众数|
| 连续数据 | **平均数**、调和平均、几何平均、中位数、四分位数、众数|

其它
- 全距
- 四分位距
- 方差
- 标准差
- 偏度
- 峰度
- 变异系数


### 描述性绘图

**单变量**

| 数据类型 | 适用哪些 |
|---------|---------|
| 分类数据 | **饼图** |
| 顺序数据 | **条形图** |
| 间隔数据 | **条形图** |
| 连续数据 | **直方图**、**箱图**|


**双变量X-Y**

|X\Y|多分类|连续 |
|---|-----|----|
|多分类|矩形图|箱图|
|连续|箱图|scatter|


## 模型反馈

1. 数据清洗有没有问题
2. 数据抽样有没有问题
3. 数据理解有没有问题
    - 主成分分析看一下
    - 聚类看一下
4. 模型选择有没有问题
5. 参数调整有没有问题




## 数据不均衡


**Unbalanced Data** 背景就不说了，数据不均衡是常态，做分类模型时不得不认真处理。  
基本上有这几个策略：
1. 增加数据。很多其它问题也都能用这个方法解决，但成本太高，不多提了。
2. Oversampling，有很多变种
3. Undersampling，也有很多变种
4. 划分训练集
5. 算法层面
    - 改变 cost function. sklearn 很多方法可以输入 weights 参数，实际上就是改变 cost function，让稀有类的权重增加。
    - 使用可以处理不平衡问题的模型，如 朴素贝叶斯。有材料说 决策树 也可以？我表示怀疑，回头试试。
    - 吴恩达的神经网络课程上讲过一个方法。对于可以重复训练的模型，把多数类分割成多个部分，每部分都和稀有类结合起来去训练模型。
    - 【TODO: 这一部分以后补充，因为很有用且重要】考虑不同误分类情况代价的差异性对算法进行优化，主要是基于代价敏感学习算法(Cost-Sensitive Learning)，代表的算法有adacost；
    - 不平衡数据集的问题考虑为一分类（One Class Learning）或者异常检测（Novelty Detection）问题，代表的算法有One-class SVM。 `sklearn.svm.OneClassSVM`


### 2. over sampling
https://github.com/scikit-learn-contrib/imbalanced-learn  
https://pypi.org/project/imbalanced-learn/

#### 数据准备
```python
from sklearn.datasets import make_classification
from collections import Counter

X, y = make_classification(n_samples=100, weights=[0.2, 0.8])
```

#### RandomOverSampler
简单的复制
```python
from imblearn import over_sampling
osamp = over_sampling.RandomOverSampler(random_state=0)
X_resampled, y_resampled = osamp.fit_sample(X, y)
Counter(y_resampled)
```

- 优点：简单
- 缺点：小众样本复制多份，一个点会在高维空间中反复出现。导致过拟合，或者运气好就能分对很多点，否则分错很多点。

#### SMOTE
```python
from imblearn import over_sampling
osamp = over_sampling.SMOTE(kind='regular',k_neighbors=2)
X_resampled, y_resampled = osamp.fit_sample(X, y)
Counter(y_resampled)
```
随机选取少数类的样本，在该样本与最邻近的样本的连线上随机取点，生成无重复的新的稀有类样本。

- kind='regular'
- kind='borderline1', kind='borderline2'关注在最优化决策函数边界的一些危险样本
- kind='svm' 使用支持向量机分类器产生支持向量然后再生成新的少数类样本。


缺点：
- 增加了类之间重叠的可能性（由于对每个少数类样本都生成新样本，因此容易发生生成样本重叠(Overlapping)的问题），
- 生成一些没有提供有益信息的样本。


#### ADASYN

关注的是在那些基于KNN分类器被错误分类的原始样本附近生成新的少数类样本

```python
from imblearn import over_sampling
osamp = over_sampling.ADASYN()
X_resampled, y_resampled = osamp.fit_sample(X, y)
Counter(y_resampled)
```

### 3. under sampling

```python
usap = under_sampling.RandomUnderSampler()
X_resampled, y_resampled = usap.fit_sample(X, y)
Counter(y_resampled)
```
功能挺多，`replacement = True` 有放回抽样，结果会有重复，默认 `replacement = False`

- 启发式规则做降采样  `under_sampling.NearMiss(version=1)` version = 1, 2, 3 有3种启发式规则
- 用近邻算法进行降采样 `under_sampling.EditedNearestNeighbours()` 绝大多数(kind_sel='mode')或者全部(kind_sel='all')的近邻样本都属于同一个类，这些样本会被保留在数据集中
- 在EditedNearestNeighbours基础上, 延伸出了RepeatedEditedNearestNeighbours算法和ALLKNN算法，前者重复基础的EditedNearestNeighbours算法多次，后者在进行每次迭代的时候，最近邻的数量都在增加。
- `under_sampling.ClusterCentroids()` 不是从原始数据集中直接抽取数据，每一个类别的样本都会用K-Means算法的中心点来进行合成。

### over Sampling + under sampling



数据不均衡参考资料：
- https://www.cnblogs.com/kamekin/p/9824294.html
- https://www.jianshu.com/p/2149d94963cc  
- https://github.com/scikit-learn-contrib/imbalanced-learn



## 标准化

标准化是对列操作  

数据准备：
```py
import pandas as pd
import numpy as np
df = pd.DataFrame(np.random.uniform(size=(20, 3)), columns=list('abc'))
```

**StandardScaler**
```py
# （Z-Score）
# 公式为：(X-mean)/std 计算时对每个属性/每列分别进行。
from sklearn import preprocessing as preprocessing

standard_scaler = preprocessing.StandardScaler()
standard_scaler.fit_transform(df)
standard_scaler.fit(df)
standard_scaler.transform(df)
```



**MinMaxScaler** 0-1标准化  
- 使用这种方法的目的包括：  
    1. 对于方差非常小的 feature 可以增强其稳定性。
    2. 如果是正的稀疏矩阵，可以维持为0的条目。


```py
from sklearn import preprocessing
min_max_scaler = preprocessing.MinMaxScaler()
min_max_scaler.fit_transform(df)
min_max_scaler.fit(df)
min_max_scaler.transform(df)
```

**MaxAbsScaler** 列除以该列的最大值。优点是可以保持稀疏矩阵中的0不变。
```py
from sklearn import preprocessing
max_abs_scaler = preprocessing.MaxAbsScaler()
max_abs_scaler.fit_transform(df)
max_abs_scaler.fit(df)
max_abs_scaler.transform(df)
```

**RobustScaler** 一种可以防止异常值的Scaler。算法是减去0.5分位数，然后除以0.75-0.25极差。
```py
from sklearn import preprocessing
robust_scaler=preprocessing.RobustScaler(with_centering=True, with_scaling=True, quantile_range=(25.0, 75.0))
robust_scaler.fit_transform(df)
robust_scaler.fit(df)
robust_scaler.transform(df)
```

**其它**
- 秩标准化：把数据排序，然后记下其序号，然后转化到 `[0,1]` 的数据
- 函数标准化：用 $x'=1/x$、$x=log(x)$ 等转化。适用于你知道其分布/数据情况
- 


## 正则化（Normalization）
每个样本变成单位范数

```py
from sklearn import preprocessing
normalizer = preprocessing.Normalizer(norm='l2') # l1, l2, max

normalizer.fit(df)
normalizer.transform(df)
```


## OneHotEncoder
```py
from sklearn import preprocessing
import pandas as pd
df = pd.DataFrame(np.random.randint(low=0, high=3, size=(10, 3)), columns=list('abc'))

onehotencoder = preprocessing.OneHotEncoder()
onehotencoder.fit(df)

onehotencoder.n_values_  # 每个feature有多少种value，例如 array([3, 3, 3])
onehotencoder.feature_indices_  # 第i个feature被映射到 feature_indices_[i] to feature_indices_[i+1]
onehotencoder.transform(df).toarray()  # OneHotEncoder 的结果
```

## PolynomialFeatures
在输入数据存在非线性特征时，这一操作对增加模型的复杂度十分有用。  
例如，特征向量X=(X1, X2)，最高项次数为2，被转化为(1, X1, X2, X1^2, X1X2, X2^2)  
如果最高为n次方，有m个feature，那么转化后得到comb(n+m,m)个feature
（因为$(\sum_{i=1}^m x_i)^n$展开后有comb(m+n+1,n)项）  

```py
from sklearn import preprocessing

polynomial_features = preprocessing.PolynomialFeatures(degree=2) # 最高项的次数为2
# interaction_only=True 只产生相互作用项
polynomial_features.fit_transform(df)
polynomial_features.fit(df)
polynomial_features.transform(df)
```
## FunctionTransformer
自定义预处理器
```py
from sklearn import preprocessing
function_transformer=preprocessing.FunctionTransformer(lambda x:np.log(x+100))
function_transformer.fit_transform(df)
function_transformer.fit(df)
function_transformer.transform(df)
```


## 经典数据集



### sklearn的随机数据


**sklearn随机造的数据** [samples-generator](https://scikit-learn.org/stable/modules/classes.html#samples-generator)

回归 [sklearn.datasets.make_regression](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.make_regression.html)

```python
from sklearn import datasets

X, y, coef = \
    datasets.make_regression(n_samples=1000,
                             n_features=5,
                             n_informative=3,  # 其中，3个feature是有信息的
                             n_targets=1,  # 多少个 target
                             bias=1,  # 就是 intercept
                             coef=True,  # 为True时，会返回真实的coef值
                             noise=1,  # 噪声的标准差
                             )
```

分类 [sklearn.datasets.make_classification](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.make_classification.html)

```python
from sklearn import datasets

X, y = datasets. \
    make_classification(n_samples=1000,
                        n_features=10,
                        n_informative=2,
                        n_redundant=3,  # 用 n_informative 线性组合出这么多个特征
                        n_repeated=3,  # 用 n_informative+n_redundant 线性组合出这么多个特征
                        n_classes=2,
                        n_clusters_per_class=1,
                        weights=[0.2, 0.8],  # class 数量不均衡
                        scale=[5] + [1] * 8 + [3],  # feature 的 scale
                        flip_y=0.1  # 随机交换这么多比例的y，以制造噪声
                        )
```

另外，还有一个 [make_multilabel_classification](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.make_multilabel_classification.html) 用来生成多标签（target是多个维度）

**聚类**

```python
from sklearn import datasets

X, y_true = datasets.make_blobs(
    n_samples=1000,
    n_features=2,
    centers=3,
    center_box=(-1, 1),  # 取值范围
    cluster_std=0.05,
    random_state=23)
```





**其它**
```python
datasets.make_s_curve # S型
datasets.make_circles # 圆环
datasets.make_moons # 月亮
...
```

### sklearn真实数据
```py
import sklearn.datasets as datasets
dataset=datasets.load_iris()
dataset.data,dataset.target
dataset.feature_names,dataset.target_names
print(dataset.DESCR)
```


转为pandas  
```py
import pandas as pd
import sklearn.datasets as datasets
dataset=datasets.load_iris()
df_feature=pd.DataFrame(data=dataset.data,columns=dataset.feature_names)
df_target=pd.DataFrame(data=dataset.target,columns=['target'])
df=pd.concat([df_feature,df_target],axis=1)
```


**boston (regression)**  
Boston House Prices dataset  
:Number of Instances: 506  
:Number of Attributes: 13 numeric/categorical predictive  

**breast_cancer (classification)**  
:Number of Instances: 569  
:Number of Attributes: 30 numeric, predictive attributes and the class  

**diabetes (regression)**
:Number of Instances: 442  
:Number of Attributes: First 10 columns are numeric predictive values  

**digits (classification)**
:Number of Instances: 5620  
:Number of Attributes: 64 (8x8 image of integer pixels)  


**iris (classification)**  
:Number of Instances: 150 (50 in each of three classes)  
:Number of Attributes: 4 numeric, predictive attributes and the class  

**linnerud (multivariate regression)**

:Number of Instances: 20  
:Number of Attributes: 3  

**load_digits (classification)**  
手写数字识别，8x8像素，16色，肉眼都不容易判断
```
=================   ==============
Classes                         10
Samples per class             ~180
Samples total                 1797
Dimensionality                  64
Features             integers 0-16
=================   ==============
```

**load_linnerud (multivariate regression)**
```
==============    ============================
Samples total     20
Dimensionality    3 (for both data and target)
Features          integer
Targets           integer
==============    ============================
```

**load_wine (classification)**
```
=================   ==============
Classes                          3
Samples per class        [59,71,48]
Samples total                  178
Dimensionality                  13
Features            real, positive
=================   ==============
```


### 网络资源
UCI，有很多经典数据：  
http://archive.ics.uci.edu/ml/  
（PS）UCI有时候会崩，太不靠谱了，git上自己做了个库[datasets](https://github.com/guofei9987/datasets)  


应用举例：  
```py
df=pd.read_csv('http://archive.ics.uci.edu/ml/machine-learning-databases/auto-mpg/auto-mpg.data',sep='\s+',na_values='?',
               header=None,names=['mpg','cylinders','displacement','horsepower','weight','acceleration','model_year','origin','car_name'])
df.head()
```

sogou数据实验室：  
http://www.sogou.com/labs/resource/list_pingce.php  

https://www.quandl.com/search   

### MNIST
1. [lecun官网](http://yann.lecun.com/exdb/mnist/)
2. 我给转成了csv格式，放到了[github上](https://www.guofei.site/datasets/cv/MNIST_data_csv.zip),用代码读也方便  
```py
# step1:下载
import requests
url = 'https://www.guofei.site/datasets/cv/MNIST_data_csv.zip'
r = requests.get(url)
with open('MNIST_data_csv.zip', 'wb') as f:
    f.write(r.content)
# step2：解压
import zipfile
azip = zipfile.ZipFile('MNIST_data_csv.zip')
azip.extractall()
# step3：读取
import pandas as pd
mnist_train_images = pd.read_csv('mnist_train_images.csv', header=None).values
mnist_test_images = pd.read_csv('mnist_test_images.csv', header=None).values
mnist_train_labels = pd.read_csv('mnist_train_labels.csv', header=None).values
mnist_test_labels = pd.read_csv('mnist_test_labels.csv', header=None).values
```
3. tensorflow
```py
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data/', one_hot=True)
mnist.train.images,mnist.train.labels
rand_test_indices = np.random.choice(len(mnist.test.images), test_size)
mnist.test.images[rand_test_indices],mnist.test.labels[rand_test_indices]
```

### 图片类

**Cifar-10**，由Hinton等整理出，搜集了10种类型60000张图片，全部是$32\times 32$彩图，人工标注正确率为94%  
http://www.cs.toronto.edu/~kriz/cifar.html


**ImageNet** 是基于WordNet的大型图片数据库，由李飞飞带头整理，1500万张图片关联到20000个名词同义词上。  
图片从互联网上爬虫，通过亚马逊人工标注服务分类。  
每张图片上由多个实体。  
http://www.image-net.org/challenges/LSVRC/  


## 参考资料
- [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)  
- [关于使用sklearn进行数据预处理](http://www.cnblogs.com/chaosimple/p/4153167.html)  
