---
layout: post
title: 【Matlab】机器学习代码速查
categories: 模型
tags: Matlab
keywords:
description:
---


## 决策树

```Matlab
clear;clc;close all
load fisheriris;
X=meas;Y=species;
Mdl=fitctree(X,Y,'MaxNumSplits',8,'CrossVal','on');
view(Mdl.Trained{1},'Mode','graph');
```

## logit回归

```Matlab
[b,dev,stats]=glmfit(x,y,'binomial', 'link', 'logit');
%b系数，dev表示残差
p = glmval(b,x, 'logit');

```

## SVM

生成一个ClassificationSVM 对象  

```Matlab
SVMModel = fitcsvm(X,y)
```

```Matlab
SVMModel.ClassNames%模型中的类名
%模型的支持向量
SVMModel.SupportVectors
%模型的支持向量
SVMModel.IsSupportVector
```

预测：
```Matlab
label = predict(SVMModel,TBL)
label = predict(SVMModel,X)example
[label,Score] = predict(___)
```

误差判定：
```Matlab
CVSVMModel = crossval(SVMModel);
classLoss = kfoldLoss(CVSVMModel)
```


## 贝叶斯
```Matlab
ObjBayes = NaiveBayes.fit(training,group,'Distribution','kernel')
pre0 = ObjBayes.predict(training);
```

```
Mdl = fitcnb(X,Y)
```

```
estimates = Mdl.DistributionParameters
```
完整案例
```
load fisheriris
X = meas;
Y = species;
classNames = {'setosa','versicolor','virginica'}; % Class order
prior = [0.5 0.2 0.3];
Mdl = fitcnb(X,Y,'ClassNames',classNames,'Prior',prior)
```

注意：训练过程不适用prior，因此可以在训练后改prior


CVMdl=crossval(Mdl)
loss=kfoldLoss(CVMdl)


## 判别分析
```
[class,err,POSTERIOR,logp,coeff] = classify(sample,training,group)
```

## 模型验证方法

注1：一般情况下，我们把y=1作为class1；然而，matlab 把第一行作为class1，因此，在二分类问题中，需要做这样的变换：[y;1-y],[p;1-p]      
注2：注1的情况，是因为confusion函数中，把单行的处理给弄反了！roc函数中，就可以不用这么麻烦，直接用(y,p)就好了    
注3：还缺一个C统计量，自带算法没有    
注4：plotroc不支持subplot等运算，还是手动分解一下比较好    

### confusion matrix   
```
[c,cm,ind,per] = confusion([y;1-y],[p;1-p])   
```

c：错误率    
cm：计数，cm(i,j)表示y落在class i中，p落在class j中    
ind：cm对应的原始数据的序号    
per：per(i,1:4)分别对应：FN/total actual negative,...    

### ROC
几种画ROC图的方法：   
1. plotroc
```
plotroc(y,p)
```
2. roc
```
[tpr,fpr,thresholds] = roc([y;1-y],[p;1-p]);
figure
plot(fpr{1},tpr{1})
```
3. plot
```
plot_it_y=[]
plot_it_y=[]
for i=1:100
    p1=p>i/100;
    [c,cm,ind,per] = confusion([y;1-y],[p1;1-p1]);
    plot_it_y(i,1)=cm(1,1)/(cm(1,1)+cm(1,2));
    plot_it_x(i,1)=cm(2,1)/(cm(2,1)+cm(2,2));
end

plot(plot_it_x,plot_it_y)
```


## 鼠标流

【鼠标流】Matlab一键生成22个模型的方法：  
APPS-->Classification Fitting-->New Session-->Start Session
