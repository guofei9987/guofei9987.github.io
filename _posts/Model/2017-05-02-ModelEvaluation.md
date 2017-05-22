---
layout: post
title: 模型的评价方法
categories: 模型
tags: 统计模型
keywords: model evaluation
description:
---


## 对回归和分类模型的评价
- accurate
- stable
对同一样本同一模型，多次计算出的模型不能差别太大
- general
推广性，对新样本预测作用同样良好。
- ease of use
    - generat a fit 做模型快捷（不用管，现在都快捷）
    - measure accuracy
    - prediction
    - swith algerithm
    - share results
- Feature selection
    - uncorelated predictor
    - corelated predictor



## 对交易模型的评价
**金融中的交易模型，几乎都属于上面说的对回归和分类模型。因此，对回归和分类模型的评价同样适用。下面具体分析，其内容没有超越上文**
- 这个系统是不是黑盒
如果模型的内在逻辑很难用业务逻辑解释，那么要打上一个问号
- 系统与实际的相符程度
    - 测试数据是否覆盖一个经济周期
    - 佣金&滑点是否准确地考虑进去了
- 测试结果是否有统计意义
    - 交易次数越多，结果越可信
    - 系统盈利越分散，结果越可信。否则，盈利太集中，说明有可能运气成分居多
- 是否有过拟合
    - 参数越少越好。很多参数可能过拟合
    - 魔法数字：为何是20日移动平均？为何不是30日或21日？
    - 规则越简单，越不容易过拟合
    - 对参数的敏感程度（不要参数稍小变动导致交易效果巨量变动）



## 针对accurate评价方法

### 混淆矩阵
可用于：  
1. 模型输出的是预测结果
2. 模型输出的是概率，这时用0.5截取

<table>
  <tr>
    <th colspan="2">confusion matrix</th>
    <th colspan="2">Predicted </th>
    <th></th>
  </tr>
  <tr>
    <td>col 1 is<br></td>
    <td></td>
    <td>1</td>
    <td>0</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Actual</td>
    <td>1</td>
    <td>True<br>  Positive</td>
    <td>False Negative</td>
    <td>total actual positive</td>
  </tr>
  <tr>
    <td>0</td>
    <td>False Positive</td>
    <td>True Negative</td>
    <td>total actual negative</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>total<br>  predicted positive</td>
    <td>total predicted negative</td>
    <td>total cases</td>
  </tr>
</table>



TP，FP，TN，TP

值得注意的是，在不同的场景中，选择的主要指标不同。例如：   

在垃圾邮件分类时，错把一封正常邮件分类成垃圾邮件，这个结果的不良后果远高于错把一封垃圾邮件分类为一封正常邮件。  

在医疗诊断时，错把患病诊断为未患病，其后果远比错发患病诊断为未患病严重的多。

### ROC曲线
- 观察曲线
- 求出曲线下方的面积，也就是R统计量
- 有些模型可以求出R统计量的解析形式

### Brier评分

这个方法是某paper里面看到的，  
$BS=\dfrac{1}{N} \sum(\hat p-y)^2$  
其中$\hat p$是模型输出的概率，y是实际结果。注意要计算所有选项  
一个随机模型的BS=0.25，BS越小越好。
