---
layout: post
title: 【spark】sql.functions详解
categories:
tags: 1-1-算法平台
keywords:
description:
order: 155
---

*这篇文章是我总结的spark官方文档中关于[pyspark.sql.functions](http://spark.apache.org/docs/latest/api/python/pyspark.sql.html#module-pyspark.sql.functions)中的有关内容，源文档是按照函数的字母表顺序排列的，这里我按照功能排列。并且删除了其中的一些*

## 用法
有几种
```py
import pyspark.sql.functions as F
df.select(F.expr('*'),F.expr('length(name)').alias('len'),F.rand(seed=42))
df.withColumn('rand_num',F.sin(df.col1)*3)
df.selectExpr('*','power(cid2,5)')

# 针对 agg func：
df.groupBy('col1').agg(F.count('col2'))
df.groupBy('col1').agg(F.count(df.col2))
```

## 特殊常用
```py
F.lit(3) # 增列都是一个值
F.col('col1') # 选取一列
F.when().else()
```

F.expr: 用python风格写sql
```py
# 最简单的用法
df.withColumn('row_num',F.expr('row_number() over(partition by col1 order by col2)'))

# 分位数
from pyspark.sql import Window
df.withColumn('percentile_25',F.expr('percentile_approx(col2, 0.25)').over(Window.partitionBy('col1'))) # 每个partition的分位数，但不聚合（所以逻辑上有点怪）

# 分位数
df.groupBy('col1').agg(F.expr('''
concat(
    round(percentile_approx(col2,0),3),'_',
    round(percentile_approx(col2,0.25),3),'_',
    round(percentile_approx(col2,0.5),3),'_',
    round(percentile_approx(col2,0.75),3),'_',
    round(percentile_approx(col2,1),3),'_'
    )
''').alias('percentile_col2'))

```


## 数学
- 符号，取整等
```py
abs(col)
signum(col) # 符号函数，返回-1,0,1
ceil 向上取整
floor 向下取整
round(col, scale=0) # 小数形式的四舍五入，到scale位
```
- 角度类
```py
sin(col),cos(col),tan(col)
asin(col),acos(col),atan(col)
sinh(col),cosh(col),tanh(col)
radians(col) # 度数转弧度
degrees(col) # 弧度转角度
```
- 指数类
```py
exp(col)
pow(col1,col2) # 指数，col1和col2都可以换成数字
log(col1,col2) # 对数，col1和col2都可以换成数字
log(col1) # 自然对数
factorial(col) # 阶乘，sql也有这个命令
sqrt(col)
cbrt(col) # 三次方根
# 其实还有更为python的混合用法：
df1.withColumn('s1',F.sqrt(df1.col1**df1.col2+df1.col1))
```
- 统计类
```py
max(col) # aggregate function
min(col) # aggregate function
avg(col) # aggregate function
mean # alias for avg()
count(col) # aggregate function
countDistinct(col) # aggregate function
corr(col1, col2) # 皮尔逊相关系数
kurtosis(col) # 峰度
skewness(col) # 偏度
stddev(col) # Aggregate function: returns the unbiased sample standard deviation of the expression in a group
stddev_pop(col) # Aggregate function: returns population standard deviation of the expression in a group.
stddev_samp(col) # Aggregate function: returns the unbiased sample standard deviation of the expression in a group.
var_pop(col) # Aggregate function: returns the population variance of the values in a group.
var_samp(col) # Aggregate function: returns the unbiased variance of the values in a group.
variance(col) # Aggregate function: returns the population variance of the values in a group.
```
- 随机函数
```py
rand(seed=None) # 随机数
df.withColumn('rand', F.rand(seed=42) * 3) # sql 中也有这个函数，但不能传入 seed 参数
randn(seed=None) # 正态分布
```

## 字符串
- 大小写
```py
initcap(col) 每个单词的首字母大写（一个元素的字符串中可以有多个单词）（sql也有这个命令）
lower(col) 转为小写
upper(col) # 转为大写
```
- 填充
```py
lpad(col, len, pad) # 用pad把col填充到len长度，pad放左边
rpad(col, len, pad) # 用pad把col填充到len长度，pad放右边
rtrim(col) # 删掉右边的空格
ltrim(col) # 删掉左边的空格
trim(col) # 两边都删
```
- 反转、截取
```py
repeat(col, n) # 字符串重复n次
reverse(col) # 把 string 或 array 反转
substring(str, pos, len) # 截取从pos开始，len长度
```
- 匹配
```py
instr(str, substr) # str中，substr第一次出现的位置，可以用sql
locate(substr, str, pos=1) # str中，pos后，substr第一次出现的位置号，位置号从1开始，如果没找到就返回0
```
- 正则
```py
split(str, pattern) # 正则表达式分割
regexp_replace(str, pattern, replacement)
```

## 时间
- 时间生成
```py
current_date() # 当前日期
current_timestamp() # 当前时间
date_format(date, format) # 把时间转化成指定格式
date_trunc(format, timestamp) # 把时间四舍五入到某一个精度
# format – ‘year’, ‘yyyy’, ‘yy’, ‘month’, ‘mon’, ‘mm’, ‘day’, ‘dd’, ‘hour’, ‘minute’, ‘second’, ‘week’, ‘quarter’
```
- 时间加减
```py
add_months(start, months) # 增加一个月，mysql可以用 `select DATE_ADD('2018-02-05',INTERVAL 1 month) as dt` 但spark中不行
# start 可以是字符串格式
date_sub(start, days)
datediff(end_date, start_date)
months_between(end_date, start_date, roundOff=True)
# 1. 返回月份差
# 2. date1大于date2，返回正值
# 3. 默认返回整数，但roundOff=False 时返回8位小数
next_day(date, dayOfWeek) # 返回下一个“周n”，dayOfWeek=“Mon”, “Tue”, “Wed”, “Thu”, “Fri”, “Sat”, “Sun”
```
- 取位（都返回int格式）
```py
year(col) # 取年
quarter(col) # 取季度
month(col) # 取月
hour(col) # 取小时
minute(col) # 取分钟
second(col) # 秒
```
- 取dayof
```py
dayofmonth(col)
dayofweek(col)
dayofyear(col)
weekofyear(col) # 周一到周日算是一周（）
last_day(date) # 所在月的最后一天
```

## array
- 生成
```py
array(*cols) # 把多列粘合成一个类似 array<double> 的格式
sequence(start, stop, step=None) # 等差数列组成的array，入参可以是列名
```
- 集合运算
```py
array_contains(array_col, value)  # 包含
# 如果 array_col 为null，返回null
# 如果 array_col 包含value，返回value
# 如果 array_col 不包含value，返回false
array_distinct(array_col) # 移除 array_col 中的重复
array_except(array_col1, array_col2) # 生成一个array，其元素在col1中，但不在col2中
array_intersect(col1, col2) # 差集（剔除重复）
array_union(col1, col2) #交集（剔除重复）
arrays_overlap(a1, a2) # 是否存在交集：
# 如果有共同的元素，返回 true
# 如果没有共同元素，如果任一有空元素，返回 null
# 否则返回false
```
- 修改
```py
array_position(col, value) # 返回 array 从的第一个value 的序号，如果没有则返回null，序号是从1开始的
array_remove(col, element) # 从array中删除所有的element
array_repeat(col, count) # array中的元素重复3次，生成一个新array
array_sort(col) # 返回升序array，null放到最后
sort_array(col, asc=True) # 也是排序
arrays_zip(*cols) # 效果相当于 Python 的 list(zip(a,b)) http://spark.apache.org/docs/latest/api/python/pyspark.sql.html#pyspark.sql.functions.arrays_zip
slice(x, start, length) # 切片取数，例如 slice(df.x, 2, 2)
shuffle(col) # 打乱顺序
```
- 统计
```py
size(col) # array的长度
covar_pop(col1, col2) # 两个array的相关系数
covar_samp(col1, col2) #相关系数
array_max(col) # array中的最大值
array_min(col) # array中的最小值
```
- 拼接和展开
```py
array_join(col, delimiter, null_replacement=None)  
# 将array拼接成一个字符串，其中分割符为 delimiter  
# 如果指定了null_replacement，用null_replacement 替换空值，否则视空值不存在
concat(*cols) #也是拼接（可用于 string，binary，array）如果array有一个为空，返回空。这个函数与sql的concat不太一样
concat_ws(sep, *cols) # 用sep链接
explode_outer(col)
# 如果 col是一个 <array> 那么生成一个新列，col，把 <array>中的元素竖着变成列
# 如果 col 是一个 <map> 那么生成两个新列，key, value, 把map中的元素竖着变成列
df = spark.createDataFrame([(1, ["foo", "bar"], {"x": 1.0}), (2, [], {}), (3, None, None)],("id", "an_array", "a_map"))
df.select("id", "an_array", F.explode_outer("a_map")).show()
df.select("id", "a_map", F.explode_outer("an_array")).show()
```

## 其它
```py
F.greatest('col1','col2',...) # 多列中最大的那个，sql也有这个命令
F.least('col1','col2',...) # 最小的那个

F.coalesce # 取第一个不为空的元素（sql也有这个命令）

when(condition, value)
df.select(when(df['age'] == 2, df.age + 1).otherwise(4).alias("age"))
```
## aggfunction

```py
collect_list
collect_set
sum
sumDistinct
```

## 窗口函数
```py
lag(col, count=1, default=None) # 窗口函数，返回往前数第count行的内容（ sql也有同样的命令）（ 机器上好像报错）
lead(col, count=1, default=None) # 窗口函数，返回往后数第count行的内容（ sql也有同样的命令）（ 机器上好像报错）
first(col, ignorenulls=False) # aggfunction，返回第一个
last(col, ignorenulls=False) # aggfunction，返回最后一个
row_number()
cume_dist()
dense_rank()
lead(col, count=1, default=None)  # returns the ntile group id (from 1 to n inclusive)
percent_rank()
rank()
```


## 其它
下面这些函数都可以方便地用其它函数代替（虽然运行效率会慢点儿），个人不建议多用下面这些函数，如果你的队友不是很熟悉spark.sql.functions，可能会对他们来说可读性太差，影响合作。
```py
expm1:$e^{x-1}$
hypot(col1, col2) # 等价于 sqrt{(a^2 + b^2)}
atan2(col1, col2) # 输入x,y坐标，输出theta
log10(col)
log2(col)
log1p(col) # $\log(x+1)$

bround(col, scale=0) # 小数形式的四舍五入，与round(col, scale=0)重复

## 不常用
base64
basestring
bin
approx_count_distinct
```



## 参考文献
http://spark.apache.org/docs/latest/api/python/pyspark.sql.html#module-pyspark.sql.functions  
https://blog.csdn.net/liam08/article/details/79663018
