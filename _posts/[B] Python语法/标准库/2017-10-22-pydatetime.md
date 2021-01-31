---
layout: post
title: 【Python标准库】datetime
categories:
tags: Python语法
keywords:
description:
order: 1201
---


*因为datetime比time好用一些，所以本文暂时不涉及time*  

## 时间表示的3种格式
- float
- str
    - format是一个str，例如`'%Y-%m-%d %H:%M:%S'`
    - %y年份中的后两位，%Y年份4位数年
    - %m ：2位数月
    - %d： 2位数日
    - %H： 24进制小时。%I：12进制小时
    - %M： 2位数分钟
    - %S： （秒，可以是60和61，表示闰秒），%S.%f精确到毫秒
    - %a周几（简称） %A周几（全称）， %w：周几，0代表周日。%u：周几，7代表周日。
    - %W一年中的第几周，每年第一个周一之前的几天认为是“第0周”， %U一年中的第几周，每年第一个周日之前的几天认为是“第0周”
    - %j 一年中的第几天，范围是001-366
    - %b月份简写 %B月份全称
    - %p 上午还是下午, 值是AM或PM
    - %c 完整的日期和时间
- datetime.datetime
    - datetime.datetime.now()




相互转化：  
- float --> datetime: datetime.datetime.fromtimestamp( float )
- datetime --> str:
```py
datetime.datetime.strftime(now,'%Y-%m-%d')
now.strftime('%Y-%m-%d')
```
- str --> datetime: datetime.datetime.strptime(str, format)
```py
datetime.datetime.strptime('2018-02-03','%Y-%m-%d')
```


## datatime


### 创建
1. 直接生成
```py
import datetime
datetime.datetime(2017,11,12,18,5,9)
```
2. now
```py
datetime.datetime.now()
```
3. strptime
4. parse：好处是不用自定义格式
```py
from dateutil.parser import parse
parse('2016/11/12 12:00:03')
```


### 应用
```py
now=datetime.datetime.now()
now.year,now.month,now.day # 年月日
now.weekday() # 一周中的第几天，周一是0，周日是6

```
## timedelta

### timedelta1

```py
datetime.timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)  
```

datetime.timedelta类可以加减乘除，示例代码：

```py
import datetime
year = datetime.timedelta(days=365)
ten_years = year *10
nine_years = ten_years - year  
```

### timedelta2

两个datetime.datetime可以相减，返回datetime.delta
示例代码：

```py
import datetime
d1 = datetime.datetime.strptime('2015-03-05 17:41:20', '%Y-%m-%d %H:%M:%S')
d2 = datetime.datetime.strptime('2015-03-02 17:41:20', '%Y-%m-%d %H:%M:%S')
delta = d1 - d2
print(delta.days)
```

## 时区问题

### 1 时区对象
```py
import pytz
pytz.all_timezones#打印全部时区
tz=pytz.timezone('Asia/Shanghai')#返回时区对象
```


### 2 datetime中建立时区

```py
tz=pytz.timezone('Asia/Shanghai')
ddt = datetime.datetime(2014, 8, 20, 10, 0, 0, 0)
ddt=tz.localize(ddt)
```


#### 平均日出时间时区

```py
ddt1 = datetime.datetime(2014, 8, 20, 10, 0, 0, 0, pytz.timezone('Asia/Shanghai'))
```

**这里有个大坑：这个时间是根据平均日出时间(Local Mean Time)的时区，所以不要轻易这么用，除非特殊需求**  

### 3 时区换算

```py
ddt2=ddt1.astimezone(pytz.timezone('Europe/London'))
```

### 小的注意

```
ddt1==ddt2
```

- output：
```
True
```
## 参考文献
https://docs.python.org/3/
