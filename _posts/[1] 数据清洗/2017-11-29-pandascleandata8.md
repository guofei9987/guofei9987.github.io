---
layout: post
title: 【pandas】时间序列
categories:
tags: 1数据清洗
keywords:
description:
order: 107
---
时间序列可以按照index是datetime的Series来使用，  
关于datetime， [看这里](http://www.guofei.site/2017/10/22/pydatetime.html)[^pydatetime]  


## 生成
原理与Series相同
```py
import pandas as pd
from datetime import datetime
values=[2,5,7,10,12]
dates=[datetime(2017,5,i) for i in values]
ts=pd.DataFrame(values,index=dates)
```

## 读取

1. 切片读取
```py
ts[::2]
```
2. 用日期读取
```py
ts[datetime(2017,5,8):]
ts['5/8/2017':]
#只对顺序为正序有用，否则会报错
```


## 重复时间索引
某些业务场景中，可能会有多个观测值落在同一个时间点上
```py
import pandas as pd
from datetime import datetime
values=[2,5,7,10,10,12]
dates=[datetime(2017,5,i) for i in values]
ts=pd.DataFrame(values,index=dates)
ts
```


```py
ts.index.is_unique #返回bool类型False
```

```py
ts.loc['5/10/2017',:] #对于重复的读取会返回多行DataFrame
```


```py
ts.groupby(level=0).count() #可以groupby index的第0层
```

## 间隔时间
```py
pd.date_range(datetime(2017,5,1),'8/12/2017',freq='4h') #'D', '4h30min'
```

```py
from pandas.tseries.offsets import Hour,Minute
pd.date_range(datetime(2017,5,1),'8/12/2017',freq='4h')+Minute(30)
```


- D 每日历日
- B 每工作日
- H 每小时
- T/min 每分钟
- S 每秒
- L/ms 每毫秒
- U 每微秒(报错？)
- M： MonthEnd，每个月最优一个日历日
- BM： BusinessMonthEnd，每个月最优一个工作日
- MS： MonthBegin，每个月第一个日历日
- BMS： BusinessMonthBegin，每月第一个工作日
- W-MON，W-TUE,...： 从指定星期几(MON, TUE, WED,THU,FRI,SAT,SUN)开始算计，每周
- WOM-1MON，WOM-2MON,...： WeekOfMonth，每月第n个星期几(WOM-3FRI表示每月第3个星期五)
- Q-JAN，Q-FEB，QuarterEnd，以指定月份开始(JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC)，每季度最优一月的最后一个日历日
- BQ-JAN，BQ-FEB : BusinessQuarterEnd, 以指定月份结束的年度，每季度最优一个月的最后一个工作日
- QS-JAN，QS-FEB ：QuarterBegin， 对于指定月份结束的年度，每季度最优一个月的第一个日历日
- BQS-JAN，BQS-FEB： BusinessQuarterBegin，对于以指定月份的结束的年度，每季度最后一月的第一个工作日
- A-JAN， A-FEB： YearEnd，每年指定月份的最后一个日历日
- BA-JAN，BA-FEB： BusinessYearEnd，每年指定月份的最后一个工作日
- AS-JAN，AS-FEB： YearBegin，每年指定月份的第一个日历日
- BAS-JAN，BAS-FEB： BusinessYearBegin，每年指定月份的第一个工作日


## reindex


```py
import pandas as pd
from datetime import datetime
values=[2,5,7,10,12]
dates=[datetime(2017,5,i) for i in values]
ts=pd.DataFrame(values,index=dates)
idx=pd.date_range(datetime(2017,5,1),datetime(2017,5,20),freq='H')
ts.reindex(idx,fill_value=-999)
```

## 参考资料
[^pydatetime]: [【Python】【datetime】时间的介绍](http://www.guofei.site/2017/10/22/pydatetime.html)
