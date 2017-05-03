---
layout: post
title: 阿里巴巴大数据竞赛回顾与总结
category: 科研
tags: MachineLearning
keywords: 大数据，机器学习，推荐系统
description: 
---

8个月前，苏宇师兄问我对[阿里巴巴大数据竞赛](http://102.alibaba.com/competition/addDiscovery/index.htm)感兴趣吗。正好我选修了[陈恩红](http://staff.ustc.edu.cn/~cheneh/)老师的《机器学习与数据挖掘》，很好奇这门课在实际中的应用；身为淘宝用户，也好奇我是如何被推荐的。于是和师兄一起参加比赛，加上计算机学院的刘惠民同学，我们组成了名叫`Rosemary`三人团队。这次大赛总共有7276支队伍参赛，我们止步于第二赛季。第一赛季排名56；第二赛季排名68。

###开放数据

<table  class="table table-bordered table-striped table-condensed">
   <tr>
     <th>字段</th>
      <th>字段说明</th>
      <th>提取说明</th>
   </tr>
   <tr>
      <td>user_id</td>
      <td>用户标记</td>
      <td>抽样、字段加密</td>
   </tr>
   <tr>
      <td>Time</td>
      <td>行为时间</td>
      <td>精度到天级别、隐藏年份</td>
   </tr>
   <tr>
      <td>action_type</td>
      <td>用户对品牌的行为类型</td>
      <td>包括点击（0）、购买（1）、加入购物车（2）、收藏（3）四种行为 </td>
  </tr>
   <tr>
      <td>brand_id</td>
      <td>品牌数字ID</td>
      <td>抽样、字段加密</td>
   </tr>
</table>
###比赛任务
根据用户4个月在天猫的行为日志，建立用户的品牌偏好，并预测他们在将来一个月内对品牌下商品的购买行为。

###评估指标
大赛最终的比赛成绩排名以F1得分为准。

准确率：<img src="http://latex.codecogs.com/gif.latex?Precision=\frac{\sum_i^N&space;hitBrands_i}{\sum_i^N&space;pBrands_i}" title="Precision=\frac{\sum_i^N hitBrands_i}{\sum_i^N pBrands_i}" />

召回率：<img src="http://latex.codecogs.com/gif.latex?Recall=\frac{\sum_i^M&space;hitBrands_i}{\sum_i^M&space;bBrands_i}" title="Recall=\frac{\sum_i^M hitBrands_i}{\sum_i^M bBrands_i}" />

F1-Score：<img src="http://latex.codecogs.com/gif.latex?F_1=\frac{2\times&space;P\times&space;R}{P&plus;R}" title="F_1=\frac{2\times P\times R}{P+R}" />

其中，

- N 为参赛队预测的用户数；M 为实际产生成交的用户数量  
- pBrandsi为对用户i 预测他(她)会购买的品牌列表个数；bBrandsi为用户i 真实购买的品牌个数 
- hitBrandsi对用户i预测的品牌列表与用户i真实购买的品牌交集的个数

###解读`准确率`、`召回率`和`F1-Score`
准确率就是正确预测数目比上预测总数目。召回率就是正确预测数目比上真实总数目。F1-Score是准确率和召回率的调和平均。理论上，准确率与召回率并没有必然的联系；但在实际中，这二者往往此消彼长、相互制约。有研究表明，在不牺牲准确率的情况下，获得一个高召回率是很难的。在赛题环境下举个栗子：

<table  class="table table-bordered table-striped table-condensed">
   <tr>
     <th>我们预测出</th>
      <th>会有3个人买东西，A买品牌a，B买品牌b，C买P品牌c</th>
   </tr>
   <tr>
      <td>真实情况是</td>
      <td>有4个人买了东西，这4个人分别是A，B，C，D，其中A买a和b，B买b，C买b和c，D买a。</td>
   </tr>
</table>

按照我们的预测，准确率达到了100%，而召回率仅为50%。由此可见，想取得一个较好的F1-Score成绩，需要保证预测的数据尽量hit之外，还要保证预测的数据能够覆盖尽量多的真实数据。具体到比赛中，就需要很好地确定每个被预测的用户可能会买多少个品牌。

通过对这三个评判标准的分析，我们初步确定了第一赛季所用的策略。

###第一赛季
大致的方案是：

1. 加权对用户4种行为次数求和，得到简单的用户ID（行）与品牌ID（列）的`兴趣度`（值）矩阵。
2. 统计前4个月平均每个月有多少用户购买超过2个品牌的东西，记为B。
3. 根据用户前4个月的购买行为，按照`购买力`划分用户购买等级。直白解释就是你以前在天猫上平均每个月买了多少次，我就假设你下个月还会买这么多次。
4. 第一次切分兴趣度矩阵，保留前B行矩阵。
3. 对每个用户对不同品牌的兴趣度由高到低排序，再根据每个用户的购买力确定对该用户保留前n列的兴趣数据，并预测他会买这n个数据对应的品牌。

当然，在最初的模型建立起来之后，我们还陆续加了一些规则，比如在`时间节截止点`(最后N天，N可以根据自己的理解取值)的单独分析。另外，调参数真就是一项体力活。

![1](/public/img/posts/s1.jpg)

###第二赛季

（好困，需要去睡觉Zzz···）细节未完待续

![2](/public/img/posts/score0.png)


###总结


