

## sqlite3
```py
strftime(format, timestring, modifier, modifier, …)
# format ”YYYY-MM-DD HH:MM:SS”

# Modifiers 每一个修饰符都是对其左边值的转换，当有多个修饰符时，其生效的顺序为从左至右。可用的修改符有：
# NNN days
# NNN hours
# NNN minutes
# NNN.NNNN seconds
# NNN months
# NNN years
# start of month
# start of year
# start of day
# weekday N
# unixepoch
# localtime
# utc

# 例子
# 当前日期
SELECT date('now');

# 当月的最后一天
SELECT date('now','start of month','+1 month','-1 day');

# 将UNIX时间戳转化为时间日期格式
SELECT datetime(1092941466, 'unixepoch');

# 将UNIX时间戳转化为本地时间
SELECT datetime(1092941466, 'unixepoch', 'localtime');

# 当前日期的UNIX时间戳格式
SELECT strftime('%s','now');

# 计算当天与美国独立日之间的日期差（以天为单位）
SELECT julianday('now') – julianday('1776-07-04′);

# 计算任意时间至当前时间的时间差（以秒为单位）
SELECT strftime('%s','now') – strftime('%s','2004-01-01 02:34:56′);

# 将日期确定在本年度十月的条一个星期二
SELECT date('now','start of year','+9 months','weekday 2′);

```
