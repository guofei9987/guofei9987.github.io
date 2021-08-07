---
layout: post
title: 【spark】DataFrame
categories:
tags: 1-1-算法平台
keywords:
description:
order: 154
---

<!-- df_30_days_sku.write.mode("overwrite").format("orc").partitionBy("dt").saveAsTable("df_30_days_sku"); -->
<!-- #事后堡垒机内合并小文件
#table-merge table=default.df_30_days_sku start=dt='2018-07-01' end=dt='2018-08-30' -->




DataFrame的生成见于另一篇文章  
DataFrame转RDD后也有一系列的使用技巧，见于另一篇文章  

这里介绍DataFrame的操作
## 基本操作
### 导入所需包
```py
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("appName").enableHiveSupport().getOrCreate()
```
### 新建
```py
df = spark.createDataFrame([[1, 2], [1, 3], [2, 3], [2, 4]], schema=['col1', 'col2'])
spark.createDataFrame(<pd.DataFrame>)
spark.createDataFrame(<rdd>)
```
### show
```py
df.limit(5)  # 取前5行，不同的是，是transformation
df.show()  # 返回20条数据
df.show(30)  # 返回30条数据
df.collect()  # 返回一个list，里面多个Row

# df.take(5) #类似RDD，等价于 df.limit(n).collect()
# df.head(5) #类似RDD，等价于 df.take(n)
# df.first() #返回一个Row，等价于 df.head(1)


df.describe()  # 返回统计值，是一个action，但返回的是DataFrame
df.describe('col1', 'col2')  # 返回指定字段的统计值


df.columns  # 返回一个list，内容是列名
df.dtypes


df.drop('col1', 'col2')  # 删除某些列
df.withColumnRenamed('col1', 'col1_new')  # 给指定列改名
```


## 查询

```py
df.filter('col1=1 and col2="abc"')  # 与 df.where 效果完全相同
df.filter(df.col1 > 5)

df.select('col1', 'col2')
df.selectExpr('col1 as id', 'col2*2 as col2_value')
```

## 数据清洗类操作
```py
# 去重
df.distinct()  # 返回一个去重的DataFrame
df.dropDuplicates()
df.dropDuplicates(subset=['col1', 'col2'])  # 按字段去重，其它未指定的字段只会保留1个


df.dropna(how='any', thresh=None, subset=None)  # 返回一个去 null 后的 DataFrame （不会修改df）
# how='any' / 'all'
# thresh: 1) 使 how 失效，2) 如果某一行的非空值个数小于 thresh，就 drop 这一行.
# subset: 你定义的 how/thresh 规则作用于哪些字段

df.fillna(0)
```

例子:一个数据表，可能重复的数据'id'这个字段也不一样，那么要去重就只能在除id字段以外的所有字段中去重，这么写：
```py
df.dropDuplicates(subset=[i for i in df.columns if i != 'id'])

```


## 统计分析类操作
### orderBy
```py
df.orderBy(['col1','col2'], ascending=[0,1])
```
### 分位数
```py
df.approxQuantile('col1', [0.25,0.75], 0.05) # 返回一个list，大小与第二个参数相同，表示分位数。
# 第一个参数是列名，第二个参数是分位数，第三个参数是准确度，设定为0时代价巨大

df.corr('col1','col2') # 返回一个数字，相关系数。目前只支持两个字段，只支持Person相关系数
df.cov('col1','col2')
```

### pivot

```py
df=spark.createDataFrame(pd_df)
df.groupBy('w', 'x').pivot('y').sum('z')
# 详解：
# 1. groupby 后面的内容作为 index （因为 spark.DataFrame 不搞 index，因此作为普通列）
# 2. pivot 后面的内容作为 col
# 3. 后面接的agg func 作为返回的表里面的 value. 例如 count(), sum('z'), mean,  avg, max, min
# 3_2. sum('z1', 'z2') 产生多个列
# df.groupBy('w', 'x').pivot('y', [20,21,22]).sum('z') # pivot 的第二个参数用来限定 col 所取的范围
# df.groupBy('w', 'x').pivot('y') 是一个 <GroupedData> ，因此后面可以跟 agg 等操作（agg ,apply）
```

## groupby
```py
df.groupby('col1') # 返回一个GroupedData对象，可以对这个对象进行很多操作

#例1
df.groupby('col1').max('col2','col3')
# min,sum,mean,count
df.groupBy('col1').max() # 不加参数就是对所有列做同样的操作


# agg1:默认函数
df.groupby('col1').agg({'col2':'mean','col3':'sum'}) # 似乎不能与F混用

# agg2：F中的函数
from pyspark.sql import functions as F
df.groupBy('col1').agg(F.countDistinct('col2').alias('col2_cnt'))

# agg3：自定义函数
## agg3_1：udf作用于被 groupBy 的列，一一映射就有意义
spark.udf.register('udf_func1',lambda x:x+1)
df.groupBy('a').agg({'a':'udf_func1','b':'std'})
## agg3_2：udf作用于普通列：
def func(x):
    return x + 1
spark.udf.register('func',func)
df.selectExpr('func(a)')
## agg3_2: udf作用于groupBy之后的普通列
#（方案有几种，见于下面）
```


### aggfunc 方案1

先把被汇总的数据放到一个 list 中，然后用 UDF 处理这个list

step1：生成数据
```py
from pyspark.sql import SparkSession
import pandas as pd
import scipy.stats as stats

spark = SparkSession.builder.appName("appName").enableHiveSupport().getOrCreate()

pd_df = pd.DataFrame(stats.norm().rvs(size=(100, 3)), columns=['type', 'col1', 'col2'])
pd_df.type = (pd_df.type > 0) * 1.0
df = spark.createDataFrame(pd_df)
```

step2: 用 collect_list 汇总数据
```py
import pyspark.sql.functions as F
from pyspark.sql.types import DoubleType

df2 = df.groupBy('type'). \
    agg(F.collect_list('col1').alias('col1_lst'),
        F.collect_list('col2').alias('col2_lst'))

```

step3:构建 udf 并计算得到结果

```py
def func1(x, y):
    return float(stats.pearsonr(x, y)[0])


# 方法1（文本）：
spark.udf.register('func1', func1, returnType=DoubleType())
df2.selectExpr('type', 'func1(col1_lst,col2_lst) as corr_1_2').show()

# 方法2（借助F）：
udf_func1 = F.udf(func1, DoubleType())
df2.select('type', udf_func1('col1_lst', 'col2_lst').alias('corr_1_2')).show()
```

额外来讲，可以返回一个list
```py
def func2(col1, col2):
    return max(col1), min(col1), min(col2)


spark.udf.register('func2', func2, returnType=ArrayType(DoubleType()))
df3 = df2.selectExpr('type', 'func2(col1_lst,col2_lst) as col3_lst')

# 也可以同上用 F 来实现：
# 不多写了

# 展开：
df3.selectExpr('*', 'explode(col3_lst) as col4')
```







### aggfunc 方案2
```py
# http://spark.apache.org/docs/latest/api/python/pyspark.sql.html#pyspark.sql.GroupedData.apply
from pyspark.sql.functions import pandas_udf, PandasUDFType

df = spark.createDataFrame(
    [(1, 1.0), (1, 2.0), (2, 3.0), (2, 5.0), (2, 10.0)],
    ("id", "v"))

@pandas_udf("id long, v double", PandasUDFType.GROUPED_MAP)
def substract_mean(pdf):
    # pdf is a pandas.DataFrame
    v = pdf.v
    return pdf.assign(v=v - v.mean())

df.groupby("id").apply(substract_mean).show()
```

一下是相关网站：  
http://spark.apache.org/docs/2.1.1/api/python/index.html  
https://databricks.com/blog/2017/10/30/introducing-vectorized-udfs-for-pyspark.html  
http://spark.apache.org/docs/latest/api/python/pyspark.sql.html#pyspark.sql.GroupedData    
https://blog.csdn.net/dabokele/article/details/52802150  
https://blog.csdn.net/sparkexpert/article/details/51042970


## UDF 详解


```py
import pyspark.sql.functions as F
from pyspark.sql.types import DoubleType, IntegerType, StringType, ArrayType
import numpy as np


def myfunc(col1, col2):
    return float(np.sin(col1 + 1) + col2)



# 方法1:F形式
myudf = F.udf(myfunc, returnType=DoubleType())  # 这个类型一定要正确指定，否则结果为 null
df.select('col1', 'col2', myudf('col1', 'col2').alias('sin_col1'))

# 或者：
df.withColumn('sin_col1', myudf('col1', 'col2'))



# 方法2:文本形式
spark.udf.register('myudf', myfunc, returnType=DoubleType())
df.selectExpr('col1', 'col2', 'myudf(col1,col2) as sin_col1')
```


例子：UDF 如何处理 list  
(见于上面的 aggfunc)






### 非groupby下的agg

```py
df1.agg({'col1':'max','col2':'min'}) # 返回1行2列的 DataFrame
```


## 合并操作

### 1. 纵向
```py
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("appName").enableHiveSupport().getOrCreate()
df1 = spark.createDataFrame([[1, 2], [1, 3], [2, 3], [2, 4]], schema=['col1', 'col2'])
df2 = spark.createDataFrame([[1, 2], [1, 4], [2, 3], [2, 3]], schema=['col1', 'col3'])

df1.union(df2)  # 并集：纵向合并，不会删除重复
df1.intersect(df2)  # 交集
df1.subtract(df2)  # 差集
```
注意，这里的交集和差集是按照整个列

### 2. 横向
```py
df1.join(df2) #  笛卡尔积，慎用！
df1.join(df2,on='id')
a.join(b,on=['id','dt'],how='inner')
# innner, left, right, outer
# left_semi，以左表为准，在右表中查找匹配的记录，相当于 in ，并且只返回左表的字段。如果左表的 key 中有 null，会忽略这条记录
# left_anti， 以左表为准，找到右边不匹配的记录，相当于 not in。只返回左表的字段。如果左表的 key 中有 null，会筛选出来这条记录，无论右表中有没有 null




# 进阶用法
a.join(b,on=a.id==b.id,how='right').show()
a.join(b,on=[a.id==b.id,a.col1>b.col2+1],how='right').show()
```


## funs
增添一列递增、唯一（但不连续）的数字
```py
import pyspark.sql.functions as fn
df_abnormal_id=df1.select(fn.monotonically_increasing_id().alias('id'),'*')
```



一个增加效率的技巧:
```py
df2=df2.repartition(number_of_executors)
# 否则，如果小文件过多，只会让一个 executors 去计算
```



## 参考文献
https://blog.csdn.net/wy250229163/article/details/52354278
