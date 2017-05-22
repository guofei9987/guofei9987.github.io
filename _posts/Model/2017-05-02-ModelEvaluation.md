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



<table class="wikitable" align="center" style="text-align:center; border:none; background:transparent;">
<tbody><tr>
<td colspan="2" style="border:none;"></td>
<td colspan="2" style="background:#eeeebb;"><b>predicted condition</b></td>
</tr>
<tr>
<td style="border:none;"></td>
<td style="background:#dddddd;"><a href="/wiki/Statistical_population" title="Statistical population">total population</a></td>
<td style="background:#ffffcc;">prediction positive</td>
<td style="background:#ddddaa;">prediction negative</td>
<td style="background:#eeeecc;"><a href="/wiki/Prevalence" title="Prevalence">Prevalence</a> <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">Σ&nbsp;condition positive</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">Σ&nbsp;total population</span></span></span></span></td>
</tr>
<tr>
<td rowspan="2" style="background:#bbeeee;"><b>true<br>
condition</b></td>
<td style="background:#ccffff;">condition<br>
positive</td>
<td style="background:#ccffcc;"><span style="color:#006600;"><b><a href="/wiki/True_positive" class="mw-redirect" title="True positive">True Positive (TP)</a></b></span></td>
<td style="background:#eedddd;"><span style="color:#cc0000;"><b><a href="/wiki/False_Negative" class="mw-redirect" title="False Negative">False Negative (FN)</a></b></span><br>
(<a href="/wiki/Type_II_error" class="mw-redirect" title="Type II error">type II error</a>)</td>
<td style="background:#eeffcc;"><a href="/wiki/True_Positive_Rate" class="mw-redirect" title="True Positive Rate">True&nbsp;Positive&nbsp;Rate&nbsp;(TPR)</a>, <a href="/wiki/Sensitivity_(tests)" class="mw-redirect" title="Sensitivity (tests)">Sensitivity</a>, <a href="/wiki/Recall_(information_retrieval)" class="mw-redirect" title="Recall (information retrieval)">Recall</a>, Probability&nbsp;of&nbsp;Detection <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">Σ TP</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">Σ&nbsp;condition&nbsp;positive</span></span></span></span></td>
<td style="background:#ffeecc;"><a href="/wiki/False_Negative_Rate" class="mw-redirect" title="False Negative Rate">False&nbsp;Negative&nbsp;Rate&nbsp;(FNR)</a>, Miss&nbsp;Rate <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">Σ FN</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">Σ&nbsp;condition&nbsp;positive</span></span></span></span></td>
</tr>
<tr>
<td style="background:#aadddd;">condition<br>
negative</td>
<td style="background:#ffdddd;"><span style="color:#cc0000;"><b><a href="/wiki/False_Positive" class="mw-redirect" title="False Positive">False&nbsp;Positive&nbsp;(FP)</a></b></span><br>
(<a href="/wiki/Type_I_error" class="mw-redirect" title="Type I error">Type I error</a>)</td>
<td style="background:#bbeebb;"><span style="color:#006600;"><b><a href="/wiki/True_negative" class="mw-redirect" title="True negative">True Negative (TN)</a></b></span></td>
<td style="background:#eeddbb;"><a href="/wiki/False_Positive_Rate" class="mw-redirect" title="False Positive Rate">False&nbsp;Positive&nbsp;Rate&nbsp;(FPR)</a>, <a href="/wiki/Information_retrieval" title="Information retrieval"><span class="nowrap">Fall-out</span></a>, Probability&nbsp;of&nbsp;False&nbsp;Alarm <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">Σ FP</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">Σ&nbsp;condition&nbsp;negative</span></span></span></span></td>
<td style="background:#ddeebb;"><a href="/wiki/True_Negative_Rate" class="mw-redirect" title="True Negative Rate">True&nbsp;Negative&nbsp;Rate&nbsp;(TNR)</a>, <a href="/wiki/Specificity_(tests)" class="mw-redirect" title="Specificity (tests)">Specificity</a> (SPC) <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">Σ TN</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">Σ&nbsp;condition&nbsp;negative</span></span></span></span></td>
</tr>
<tr>
<td style="border:none;"></td>
<td rowspan="2" style="background:#cceecc;border-top:solid grey;border-right:solid grey"><a href="/wiki/Accuracy_and_precision" title="Accuracy and precision">Accuracy</a> <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">Σ&nbsp;TP + Σ TN</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">Σ&nbsp;total population</span></span></span></span></td>
<td style="background:#ccffee;border-top:solid grey;"><a href="/wiki/Positive_Predictive_Value" class="mw-redirect" title="Positive Predictive Value">Positive&nbsp;Predictive&nbsp;Value&nbsp;(PPV)</a>, <a href="/wiki/Precision_(information_retrieval)" class="mw-redirect" title="Precision (information retrieval)">Precision</a> <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">Σ TP</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">Σ&nbsp;prediction&nbsp;positive</span></span></span></span></td>
<td style="background:#eeddee;border-bottom:solid grey;"><a href="/wiki/False_omission_rate" class="mw-redirect" title="False omission rate">False&nbsp;Omission&nbsp;Rate&nbsp;(FOR)</a> <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">Σ FN</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">Σ&nbsp;prediction&nbsp;negative</span></span></span></span></td>
<td style="background:#eeeeee;"><a href="/wiki/Positive_likelihood_ratio" class="mw-redirect" title="Positive likelihood ratio">Positive&nbsp;Likelihood&nbsp;Ratio&nbsp;<span class="nowrap">(LR+)</span></a> <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">TPR</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">FPR</span></span></span></span></td>
<td rowspan="2" style="background:#dddddd;"><a href="/wiki/Diagnostic_odds_ratio" title="Diagnostic odds ratio">Diagnostic&nbsp;Odds&nbsp;Ratio&nbsp;(DOR)</a> <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">LR+</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">LR−</span></span></span></span></td>
</tr>
<tr>
<td style="border:none;"></td>
<td style="background:#cceeff;border-top:solid grey;"><a href="/wiki/False_Discovery_Rate" class="mw-redirect" title="False Discovery Rate">False&nbsp;Discovery&nbsp;Rate&nbsp;(FDR)</a> <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">Σ FP</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">Σ&nbsp;prediction&nbsp;positive</span></span></span></span></td>
<td style="background:#aaddcc;border-bottom:solid grey;"><a href="/wiki/Negative_Predictive_Value" class="mw-redirect" title="Negative Predictive Value">Negative&nbsp;Predictive&nbsp;Value&nbsp;(NPV)</a> <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">Σ TN</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">Σ&nbsp;prediction&nbsp;negative</span></span></span></span></td>
<td style="background:#cccccc;"><a href="/wiki/Negative_likelihood_ratio" class="mw-redirect" title="Negative likelihood ratio">Negative&nbsp;Likelihood&nbsp;Ratio&nbsp;<span class="nowrap">(LR−)</span></a> <span style="font-size:118%;white-space:nowrap;">= <span class="texhtml"><span class="sfrac nowrap" style="display:inline-block; vertical-align:-0.5em; font-size:85%; text-align:center;"><span style="display:block; line-height:1em; margin:0 0.1em;">FNR</span><span style="display:block; line-height:1em; margin:0 0.1em; border-top:1px solid;">TNR</span></span></span></span></td>
</tr>
</tbody></table>



---
<table>
  <tr>
    <th colspan="2" rowspan="2">confusion matrix</th>
    <th colspan="2">Predicted </th>
    <th></th>
  </tr>
  <tr>
    <td>1</td>
    <td>0</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Actual</td>
    <td>1</td>
    <td>True Positive</td>
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
    <td>total predicted positive</td>
    <td>total predicted negative</td>
    <td>total cases</td>
  </tr>
</table>

#### 指标1
正确率	Accuracy
: (TP+TN)/total cases

误分类
: Error rate=(FP+FN)/total cases

#### 指标2
覆盖率	Recall(True Positive Rate，or Sensitivity)
: TPR=TP/(TP+FN)

命中率	Precision(Positive Predicted Value,PV+)
: TP/(TP+FP)

#### 指标3
负例的覆盖率	Specificity(True Negative Rate)
: TNR=TN/(FP+TN)

负例的命中率	Negative predicted value(PV-)
: TN/(TP+FP)


值得注意的是，在不同的场景中，选择的主要指标不同。例如：   
覆盖率	Recall: 预测信用卡诈骗时，cover了多少骗子    
命中率	Precision：精准营销时，发的宣传有多少人回应    
在垃圾邮件分类时，错把一封正常邮件分类成垃圾邮件，这个结果的不良后果远高于错把一封垃圾邮件分类为一封正常邮件。  
在医疗诊断时，错把患病诊断为未患病，其后果远比错发患病诊断为未患病严重的多。   

### ROC曲线
值得是不同阈值下曲线，  
x轴：	FPR=FP/(FP+TN)   
y轴：	TPR=TP/(TP+FN)


- 观察曲线
- 求出曲线下方的面积，也就是R统计量
- 有些模型可以求出R统计量的解析形式


### Lift
模型变化时，画出PV+曲线  
衡量不同模型的预测能力


### Brier评分

这个方法是某paper里面看到的，  
$BS=\dfrac{1}{N} \sum(\hat p-y)^2$  
其中$\hat p$是模型输出的概率，y是实际结果。注意要计算所有选项  
一个随机模型的BS=0.25，BS越小越好。

### 其它分析

正确性分析：（模型稳定性分析，稳健性分析，收敛性分析，变化趋势分析，极值分析等）
有效性分析：误差分析，参数敏感性分析，模型对比检验
有用性分析：关键数据求解，极值点，拐点，变化趋势分析，用数据验证动态模拟。
高效性分析：时空复杂度分析与现有进行比较
