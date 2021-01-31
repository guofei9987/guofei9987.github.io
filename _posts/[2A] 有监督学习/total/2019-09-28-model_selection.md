---
layout: post
title: 【sklearn】模型选取+参数选择
categories:
tags: 2-1-有监督学习
keywords: model evaluation
description:
order: 201
---

两年前总结过模型选取和参数选择的理论+代码。[机器学习模型汇总](http://www.guofei.site/2017/05/22/modelpool.html), [【模型评价】理论与实现](http://www.guofei.site/2017/05/02/ModelEvaluation.html), [【交叉验证】介绍与实现](http://www.guofei.site/2017/10/03/crossvalidation.html)  
两年过去了，理论没太大变化，但 sklearn 增加了很多好用的新功能（点赞）。  
现在对这几篇博客，删掉代码，保留理论部分。在这篇博客里重新总结一遍代码。（过段时间会把旧博客删掉）  

## 本文结构
1. 先讲 `GridSearchCV`，这是一个网格搜索的方法，然后介绍 `RandomizedSearchCV` 等，它们的用法类似
2. 进行搜索时，需要定义需要计算的 `scoring`，从而输出分数，并寻找最佳模型，第二部分就介绍 `score`  
3. 进行搜索时，有一些具体的 CV（cross validation） 方法，例如，`Kfold`


## GridSearchCV
```python
from sklearn import neural_network
mlp=neural_network.MLPClassifier(max_iter=1000)

param_grid = {
    'hidden_layer_sizes':[(10, ), (20, ), (5, 5)],
    'activation':['logistic', 'tanh', 'relu'],
    'alpha':[0.001, 0.01, 0.1, 0.4, 1]
}

gscv = model_selection.GridSearchCV(estimator=mlp,
                                   param_grid=param_grid,
                                   scoring='accuracy', # 打分
                                   cv=gkf.split(X,y,groups), # cv 方法
                                   return_train_score=True, # 默认不返回 train 的score
                                   refit=True, # 默认为 True, 用最好的模型+全量数据再次训练，用 gscv.best_estimator_ 获取最好模型
                                   n_jobs=-1)

gscv.fit(X,y)
gscv.cv_results_
```
### 关于score
https://scikit-learn.org/stable/modules/model_evaluation.html


1. 关于best model，需要 `refit=True`
```python
gscv.best_score_
gscv.best_params_
best_model = gscv.best_estimator_
best_model.score(test_data, test_target)
```
2. 如果我需要多个score，而且需要 `refit=True` 再次训练最好的模型。那么我们需要指定以哪种 score 作为判断最好的标准。例如：
```python
from sklearn import tree
dtc=tree.DecisionTreeClassifier()
gscv = model_selection.GridSearchCV(estimator=dtc,
                                   param_grid={'min_samples_split':[2,3,4]},
                                   scoring=['accuracy','f1','roc_auc'],
                                   refit='accuracy')
```

### model_selection.RandomizedSearchCV
[sklearn.model_selection.RandomizedSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html).  
好处在吴恩达的课程上说过，就是你不确定哪些变量实际上不重要时，用随机搜索比网格搜索“有效”搜索更多。
```python
estimator
param_distributions # 一个dict，value要么是dict，要么是带rvs方法的对象（例如 scipy.stats.distributions）
scoring # 同上
n_jobs
cv
refit
return_train_score
random_state
```
使用方法类似 `GridSearchCV`

### 其它 cv
- `[model_selection.learning_curve](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.learning_curve.html#sklearn.model_selection.learning_curve)` 计算 train_size 不断扩大时，指标表现
- validation_curve,参数不同时，各个评价指标的曲线


## score
https://scikit-learn.org/stable/modules/model_evaluation.html  

官网总结很好，还有一个自定义score函数，没有摘抄下来。  

### classification
```python
import sklearn.metrics as metrics
metrics.confusion_matrix(test_target, test_predict, labels=['CYT','NUC']) # label可以控制显示哪些标签
```

- accuracy_score: metrics.accuracy_score(test_target, test_predict)
- precision_score:metrics.precision_score(test_target, test_predict)
- recall_score:metrics.recall_score(test_target, test_predict)
- metrics.f1_score(test_target, test_predict)
- metrics.fbeta_score(test_target, test_predict)


一个总结 precision, recall, f1-score, support 的表
```python
metrics.classification_report(test_target, test_predict)
```

P-R曲线
```python
metrics.precision_recall_curve(y_true, y_predict_proba)
```

ROC曲线
```python
test_proba_predict = model.predict_proba(test_data)[:,0]
train_proba_predict=model.predict_proba(train_data)[:,0]
fpr_test, tpr_test, th_test = metrics.roc_curve(test_target=='CYT', test_proba_predict)
fpr_train, tpr_train, th_train = metrics.roc_curve(train_target=='CYT', train_proba_predict)
plt.figure(figsize=[6,6])
plt.plot(fpr_test, tpr_test, color='blue',label='test')
plt.plot(fpr_train, tpr_train, color='red',label='train')
plt.legend()
plt.title('ROC curve')
```

- AUC:metrics.roc_auc_score(y_true, y_predict_proba),返回AUC值


### 回归模型的评价指标
- 误差绝对值的平均值 metrics.mean_absolute_error(y_true,y_pred)
- 误差平方的绝对值（MSE） metrics.mean_squared_error(y_true,y_pred)

### make_scorer


```python
from sklearn import metrics

def my_custom_loss_func(y_true, y_pred):
    diff = np.abs(y_true - y_pred).max()
    return np.log1p(diff)

score = metrics.make_scorer(my_custom_loss_func, greater_is_better=False)
```

## Kfold
[splitter](https://scikit-learn.org/stable/modules/classes.html#splitter-classes), 这里摘抄最常用的  

需要注意的点：
1. 默认不 shuffle，而是按照顺序去做分割（重复n次的除外，重复n次只能 shuffle）
2. `split()` 方法返回一个 generator，存放的是index，而不是值本身

调包+做数据
```python
import sklearn.model_selection as cross_validation
from sklearn import datasets
from sklearn import model_selection
from sklearn import metrics
X, y = datasets.make_classification(n_samples=10,
                                    n_features=10,
                                    n_informative=2,
                                    n_redundant=3,  # 用 n_informative 线性组合出这么多个特征
                                    n_repeated=3,  # 用 n_informative+n_redundant 线性组合出这么多个特征
                                    n_classes=2,
                                    n_clusters_per_class=1,
                                    weights=[0.2, 0.8],  # class 数量不均衡
                                    scale=[5] + [1] * 8 + [3]  # feature 的 scale
                                    )
```


下面是一些主要的方法
- [Kfold](http://scikit-learn.org/stable/modules/generated/sklearn.model_selection.KFold.html):Split dataset into k consecutive folds (without shuffling by default).
```python
kf = model_selection.KFold(n_splits=4,shuffle=True,random_state=0)
for train_index, test_index in kf.split(X, y):
    print("TRAIN:", train_index, "TEST:", test_index)
```
- [StratifiedKFold](http://scikit-learn.org/stable/modules/generated/sklearn.model_selection.StratifiedKFold.html#sklearn.model_selection.StratifiedKFold)分层抽样,保证每个集合y值的频率都与整体相等，也是不shuffle
```python
skf = model_selection.StratifiedKFold(n_splits=3,shuffle=False,random_state=0)
for train_index, test_index in skf.split(X, y):
    print("TRAIN:", train_index, "TEST:", test_index)
```
- [RepeatedKFold](http://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RepeatedKFold.html#sklearn.model_selection.RepeatedKFold), KFold 的变种，执行 n_repeats 次
```python
rkf = model_selection.RepeatedKFold(n_splits=2, n_repeats=5,random_state=0)
```
- [RepeatedStratifiedKFold](http://scikit-learn.org/stable/modules/generated/sklearn.model_selection.StratifiedKFold.html#sklearn.model_selection.StratifiedKFold), StratifiedKFold 的变种，执行n_repeats次
```python
rskf = model_selection.RepeatedStratifiedKFold(n_splits=2, n_repeats=5,random_state=0)
for train_index, test_index in rskf.split(X, y):
    print("TRAIN:", train_index, "TEST:", test_index)
```
- LeaveOneOut 留一法
```python
loo = model_selection.LeaveOneOut()
for train_index, test_index in loo.split(X, y):
    print("TRAIN:", train_index, "TEST:", test_index)
```
- [GroupKFold](http://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GroupKFold.html#sklearn.model_selection.GroupKFold) 保证同一个group只能出现在同一个集合中
```python
gkf=model_selection.GroupKFold(n_splits=2)
groups=[0]*5+[1]*5
for train_index, test_index in gkf.split(X, y,groups):
    print("TRAIN:", train_index, "TEST:", test_index)
```
- [LeaveOneGroupOut](http://scikit-learn.org/stable/modules/generated/sklearn.model_selection.LeaveOneGroupOut.html#sklearn.model_selection.LeaveOneGroupOut) GroupKFold的变种，每次只留一个group，保证同一个group只能出现在同一个集合中
```python
logo = model_selection.LeaveOneGroupOut()
groups=[0]*2+[1]*8
for train_index, test_index in logo.split(X, y,groups):
    print("TRAIN:", train_index, "TEST:", test_index)
```


## 参考文献

[sklearn官网](https://scikit-learn.org/stable/modules/classes.html)
