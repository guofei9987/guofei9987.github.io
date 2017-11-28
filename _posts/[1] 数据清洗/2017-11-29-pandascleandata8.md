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
pd.date_range(datetime(2017,5,1),'8/12/2017',freq='4h') #freq='D', '4h30min'
pd.date_range(datetime(2010,5,8),periods=3,freq='bas-Feb')
```

freq：
- D 每日历日
- B 每工作日
- H 每小时
- T/min 每分钟
- S 每秒
- L/ms 每毫秒
- U 每微秒
- M： MonthEnd，每个月最后一个日历日
- BM： BusinessMonthEnd，每个月最后一个工作日
- MS： MonthBegin，每个月第一个日历日
- BMS： BusinessMonthBegin，每月第一个工作日
- W-MON，W-TUE,...： Week，从指定星期几(MON, TUE, WED,THU,FRI,SAT,SUN)开始算计，每周
- WOM-1MON，WOM-2MON,...： WeekOfMonth，每月第n个星期几(WOM-3FRI表示每月第3个星期五)
- Q-JAN，Q-FEB，QuarterEnd，以指定月份为年结束(JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC)，每季度最后一月的最后一个日历日
- BQ-JAN，BQ-FEB : BusinessQuarterEnd, 以指定月份结束的年度，每季度最后一个月的最后一个工作日
- QS-JAN，QS-FEB ：QuarterBegin， 对于指定月份结束的年度，每季度最后一个月的第一个日历日
- BQS-JAN，BQS-FEB： BusinessQuarterBegin，对于以指定月份的结束的年度，每季度最后一月的第一个工作日
- A-JAN， A-FEB： YearEnd，每年指定月份的最后一个日历日
- BA-JAN，BA-FEB： BusinessYearEnd，每年指定月份的最后一个工作日
- AS-JAN，AS-FEB： YearBegin，每年指定月份的第一个日历日
- BAS-JAN，BAS-FEB： BusinessYearBegin，每年指定月份的第一个工作日


## 偏移
```py
from pandas.tseries.offsets import Day,Hour,Minute,MonthEnd
pd.date_range(datetime(2017,5,1),'8/12/2017',freq='4h')+Minute(30)
# MonthEnd指的是偏移到月末MonthEnd(2)就是往后加1个月
```

## reindex：填充


```py
import pandas as pd
from datetime import datetime
values=[2,5,7,10,12]
dates=[datetime(2017,5,i) for i in values]
ts=pd.DataFrame(values,index=dates)
idx=pd.date_range(datetime(2017,5,1),datetime(2017,5,20),freq='H')
ts.reindex(idx,fill_value=-999)
```

## shift

```py
import pandas as pd
from datetime import datetime
values=[2,5,7,10,12]
dates=[datetime(2017,5,i) for i in values]
ts=pd.DataFrame(values,index=dates)
ts.shift(1)#数据下移一格，第一格填入nan，最后个值丢弃
```


加上freq，不会丢弃数据，而是直接更改index：
```py
ts.shift(1,freq='D')
```
## resample：与groupby一样强大
数据准备
```py
import pandas as pd
import numpy as np
from datetime import datetime
rng=pd.date_range(datetime(2017,11,1),periods=100,freq='s')
ts=pd.DataFrame(np.random.randn(100),index=rng)
ts
```

```py
ts.resample('14s').sum()
```


高频数据聚合到低频数据，叫做downsampling，  
低频数据转高频数据，叫做upsampling  



- freq
- axis=0
- fill_methods=None：（仅用于upsampling）插值方法'ffill','bfill' (此功能将移除，用ffill()代替)
- colsed='right': （仅用于downsampling），用于指定区间哪个端点闭合，'right','left'
- label='right': （仅用于downsampling），用于指定index是左端点还是右端点，'right','left'
- limit=None： fill的时候，允许最大填充次数
- loffset=None: index偏移，'-1s', Second(-1)等.(用shift可以实现同样的功能)


### ohlc

开盘、最高、最低、收盘  
```py
ts.resample('5b').ohlc()
```

### ffill()/bfill()
upsampling的时候使用，填充nan.  
等同于resample后，做fillna()  


```py
import pandas as pd
import numpy as np
from datetime import datetime
rng=pd.date_range(datetime(2017,11,1),periods=1000,freq='3D')
ts=pd.DataFrame(np.random.rand(1000,2),index=rng,columns=['x1','x2'])

ts.resample('D').ffill()
# 等同于ts.resample('D').sum().fillna(method='ffill')
```



## 参考资料
[^pydatetime]: [【Python】【datetime】时间的介绍](http://www.guofei.site/2017/10/22/pydatetime.html)
