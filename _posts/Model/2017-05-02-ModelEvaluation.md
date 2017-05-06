

## 对回归和分类模型的评价
- accurate
- stable
同一样本得出的模型，不能变化太大
- general
推广性，对新样本，预测作用同样良好
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

- 这个系统是不是黑盒
如果模型的内在逻辑很难用业务逻辑解释，那么要打上一个问号
- 系统与实际的相符程度
    - 测试数据是否覆盖一个经济周期
    - 佣金
    - 滑点
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
TP，FP，TN，TP

### ROC曲线
- 观察曲线
- 求出曲线下方的面积，也就是R统计量
- 有些模型可以求出R统计量的解析形式

### Brier评分

这个方法是在北科文档里面看到的，
