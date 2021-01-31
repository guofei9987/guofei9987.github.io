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
df=spark.createDataFrame([[1,2],[1,3],[2,3],[2,4]],schema=['col1','col2'])
spark.createDataFrame(<pd.DataFrame>)
spark.createDataFrame(<rdd>)
```
### show
```py
df.limit(5) # 取前5行，不同的是，是transformation
df.show() # 返回20条数据
df.show(30) # 返回30条数据
df.collect() # 返回一个list，里面多个Row

# df.take(5) #类似RDD，等价于 df.limit(n).collect()
# df.head(5) #类似RDD，等价于 df.take(n)
# df.first() #返回一个Row，等价于 df.head(1)



df.describe() #返回统计值，是一个action，但返回的是DataFrame
df.describe('col1','col2') #返回指定字段的统计值

df.columns #返回一个list，内容是列名
df.dtypes


df.drop('col1','col2') # 删除某些列
df.withColumnRenamed('col1','col1_new') # 给指定列改名
```


## 查询

```py
# df.where('col1=1 and col2="abc"') #是transformation，返回RDD
df.filter('col1=1 and col2="abc"') #与where效果完全相同
df.filter(df.col1>5)

df.select('col1','col2') # 取指定列,返回RDD
df.selectExpr('col1 as id','col2*2 as col2_value')
```

## 数据清洗类操作
```py
# 去重
df.distinct() # 返回一个去重的DataFrame
df.dropDuplicates()
df.dropDuplicates(subset=['col1','col2']) # 按字段去重


df.dropna(how='any', thresh=None, subset=None)
# ! 注意，不会修改df，而是返回一个新的df
# thresh 是一个阈值，例如，thresh=3，代表一行的缺失值达到3个以上时，移除这一行

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

df.corr('pv','uv') # 相关系数，目前只支持两个字段，只支持Person相关系数
df.cov('a','b')
```

### pivot
- 借用pandas
```py
import pandas as pd
import numpy as np
pd_df=pd.DataFrame(np.arange(40).reshape(4,-1).T,columns=list('wxyz'))
pd_df.w=pd_df.w%2
pd_df.x=pd_df.x//3
pd_df.pivot_table(index='w',columns='x',values='y',aggfunc=sum)
```
- 借用spark
```py
df=spark.createDataFrame(pd_df)
df.groupBy('w', 'x').pivot('y').sum('z')
# 详解：
# 1. groupby 后面的内容作为 index （因为 spark.DataFrame 不搞 index，因此作为普通列）
# 2. pivot 后面的内容作为 col
# 3. 后面接的agg func 作为返回的表里面的 value
# df.groupBy('w', 'x').pivot('y', [20,21,22]).sum('z') # pivot 的第二个参数用来限定 col 所取的范围
# df.groupBy('w', 'x').pivot('y') 是一个 <GroupedData> ，因此后面可以跟 agg 等操作
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
df.groupBy('col1').agg(F.countDistinct('col2'))

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


### 方案1：UDF
目前因为一些包没装好，暂时没去测
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
### 方案2：借助register
（目前个人偏爱这个方案）
```py
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("appName").enableHiveSupport().getOrCreate()
import pandas as pd
import scipy.stats as stats
pd_df=pd.DataFrame(stats.norm().rvs(size=(100,3)),columns=list('abc'))
pd_df.a=(pd_df.a>0)*1.0
df=spark.createDataFrame(pd_df)
```

```py
import pyspark.sql.functions as F
# step1:groupby阶段，先把待使用的数据做成list
df2 = df.groupBy('a').agg(F.collect_list('b').alias('b_list'),
                          F.collect_list('c').alias('c_list'))

# step2：定义函数并 register
#（注意，返回的应当是标准的float格式，scipy返回的是 numpy.float64，如果不转化一下，会使spark报错）
def my_fun1(x, y):
    return float(stats.pearsonr(x, y)[0])

# step3：应用
from pyspark.sql.types import DoubleType
spark.udf.register('my_fun1', my_fun1, returnType=DoubleType())
df3 = df2.selectExpr('*', 'my_fun1(b_list,c_list) as a_end')

#%%
# 附：有时候每次调用 udf，想要返回多个数字组成的 list
# 返回的是 array 对象
def my_fun1(x, y):
    return x+y

spark.udf.register('my_fun1', my_fun1,returnType=ArrayType(DoubleType())) # 这里指定了 type，注意，如果 return 的 type 不同，会置为空
df3 = df2.selectExpr('*', 'my_fun1(b_list,c_list) as a_end')

# 1. 想要把 array 横向展开，只需自定义一个udf
spark.udf.register('my_fun2',lambda x,y:x[y])
df4=df3.selectExpr('my_fun2(a_end,1) as a_1')
# 2. 想要把 array 纵向展开，用explode即可
df3.selectExpr('*','explode(a_end)')
```

### 方案3：借助F.udf
思路类似方案2。  
生成数据也与方案2一样，略去  
[参考](https://changhsinlee.com/pyspark-udf/)
```py
import pyspark.sql.functions as F
from pyspark.sql.types import DoubleType

df2=df.groupBy('a').agg(F.collect_list('b').alias('b_list'),
                    F.collect_list('c').alias('c_list'))

# 同方案2，这里如果返回 numpy.float64,将会报错
def corr_fun(x,y):
    return float(stats.pearsonr(x,y)[0])

# 这里也需要注意，要指定返回值得类型。任何不一致都会用null填充。
# 例如，如果 udf 返回 int，这里指定 DoubleType,会用null填充。
# 方案2则没有这种困扰
spark_corr_fun=F.udf(corr_fun,DoubleType())
df3=df2.withColumn('corr',spark_corr_fun('b_list','c_list'))


# 如果想让新列是一个 ArrayType:
from pyspark.sql.types import ArrayType
def myfun(x, y):
    return x + y

spark_myfun = F.udf(myfun, ArrayType(DoubleType()))
df4 = df2.withColumn('merge', spark_myfun('b_list', 'c_list'))

# 一个增加效率的技巧:df2=df2.repartition(number_of_executors)
# 否则，如果小文件过多，只会让一个 executors 去计算
```


### 方案4：借助rdd
```py
df.rdd.map(lambda row: ((row['sku_id']), row)).groupByKey().flatMap(lambda row : func(row))
```
示例（因为目前平台的udf没配置好，所以用rdd来代替，如下）
```py
import scipy.stats as stats
import scipy
import pandas as pd
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("appName").enableHiveSupport().getOrCreate()

pd_df = pd.DataFrame(scipy.stats.norm().rvs(size=(3000, 3)), columns=list('abc'))
pd_df.a = (pd_df.a > 0.5) * 1

df = spark.createDataFrame(pd_df)


def myfunc1(row, mystr):
    '''
    :param row: (row[0],row[1)结构，
    其中row[0]是一个row['key']，是一个元素
    row[1]是 <iterable of row>
    :param mystr: 可以额外自定义一些输入
    :return: 返回一定是 <iterable> ,其中的每个元素就是新rdd的一行
    '''
    key = row[0]
    x, y = [], []
    for i in row[1]:
        x.append(i['b'])
        y.append(i['c'])
    # pd_df = pd.DataFrame(list(row[1]), columns=list('abc'))  # 一行转为DataFrame. 需要手动定义 columns
    return [[key, sum(x), sum(y)]]


rdd1 = df.rdd.map(lambda row: ((row['a']), row)).groupByKey() \
    .flatMap(lambda row: myfunc1(row, 'cool!'))

df1 = spark.createDataFrame(rdd1, schema=['a', 'b', 'c'])
df1.show()
pd_df1 = df1.toPandas()
```

### 非groupby下的agg

```py
df1.agg({'col1':'max','col2':'min'}) # 返回1行2列的 DataFrame

```


一下是相关网站：  
http://spark.apache.org/docs/2.1.1/api/python/index.html  
https://databricks.com/blog/2017/10/30/introducing-vectorized-udfs-for-pyspark.html  
http://spark.apache.org/docs/latest/api/python/pyspark.sql.html#pyspark.sql.GroupedData    
https://blog.csdn.net/dabokele/article/details/52802150  
https://blog.csdn.net/sparkexpert/article/details/51042970



## 合并操作

### 1. 纵向
```py
df1.union(df2) # 并集：纵向合并，不会删除重复
df1.intersect(df2) # 交集
df1.subtract(df2) # 差集
```
注意，这里的交集和差集是按照整个列

### 2. 横向
```py
df1.join(df2) #笛卡尔积，慎用！
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


## 参考文献
https://blog.csdn.net/wy250229163/article/details/52354278
