---
layout: post
title: 【特征工程】语法速查
categories:
tags: 0x12_特征工程
keywords:
description:
order: 101
---

```python
import pandas as pd
```



**pd.set_option**

```py
pd.set_option('display.max_columns',5000)
pd.set_option('display.max_columns', None) # 显示所有的列
pd.set_option('display.width',100000)
pd.set_option('display.max_rows', None) # 显示所有行
pd.set_option('display.max_colwidth',100) # 有时候一个单元格里面的内容太长，超过上限会不显示并加上省略号
```



## 创建


- 按列创建
```python
df = pd.DataFrame({'col1': [1] * 9, 'col2': ['one', 'tow', 'three'] * 3}, index=range(9))
```
- 从数据集创建
```py
df = pd.DataFrame([[1, 2], [3, 4], [5, 6]], index=range(3), columns=['col1', 'col2'])
```
- 按行创建
```python
df = pd.DataFrame(
    data=[{'col1': 1, 'col2': 1}, {'col1': 2, 'col2': 2}, {'col1': 3, 'col2': 3}, {'col2': 4}]
    , index=['idx1', 'idx2', 'idx3', 'idx4'], columns=['col1', 'col2']
)
# 当字段名对不上时，会按照指定来，并最终保证最终的 df 与 columns 一致
```

## 与各种数据类型的交互

**Python 基本数据类型**
```python
df.to_dict(orient='list')
# {'col1': [数据], 'col2': [数据]}


df.to_dict(orient='records')
# [{'col1': 1, 'col2': 'one'},
# {'col1': 1, 'col2': 'tow'}]

# orient 可以是："dict", "list", "series", "split", "tight", "records", "index"
```

**Excel**
```python
df.to_excel('xlsx.xlsx', sheet_name='sheet1', index=False)
# index=False 不保存行索引
df1 = pd.read_excel('xlsx.xlsx')

# 写入多个 sheet：
with pd.ExcelWriter('xlsx.xlsx') as writer:
    df.to_excel(writer, sheet_name='sheet1', index=False)
    df.to_excel(writer, sheet_name='sheet2', index=False)
```

**CSV**
```python
df.to_csv("csv.csv", index=False)
df1 = pd.read_csv("csv.csv")
# 可以自定义 sep、names 等，还可以设置读取开始/结束位置，不常用，不记了
```

**Json**
```python
df.to_json('json.json', orient='records', force_ascii=False)
# [{'col1': 1, 'col2': 'one'},
# {'col1': 1, 'col2': 'tow'}]
df1 = pd.read_json('json.json', orient='records')

# 注：
# force_ascii=False 类似 json 中的 ensure_ascii
# orient 还可以是: "split", "records", "index", "table", "columns", "values"
```



**其它**
```py
# 剪贴板
read_clipboard
to_clipboard

to_panel
to_period # 把时间序列数据，变成频率数据
to_latex
to_html
to_string
to_pickle # 存到内存中
to_sql # 也挺有用，在另一篇博客里详解
```


## 按行筛选


```python
import pandas as pd

df = pd.DataFrame({'col1': [1, 2, 3, 4, 5, 6], 'col2': ['one', 'two', 'three'] * 2}, index=list('abcdef'))
```

**切片筛选数据**

- loc：指定 index 名和 columns 名，以选取行列（**含头又含尾**）
```python
df.loc['a':'b', 'col1']  # 选取1列的数据，返回Series
df.loc[:'b', ['col1']]  # 返回DataFrame
df.loc['a':'b', :]  # 选取ab两行数据，返回DataFrame
```
- iloc：基于序号选取行列（**含头不含尾**）
```python
df.iloc[1, 1]  # 从0开始计数，返回的是这个元素本身的类型
df.iloc[0:2, 1:2]  # 返回DataFrame
df.iloc[0:2, :]  # 返回DataFrame
df.iloc[:, 1]  # 选取所有记录的第一列的值，返回的为一个Series
df.iloc[1, :]  # 选取第一行数据，返回的为一个Series
```
- 想要一部分指定名字，另一部分指定序号，只好这样：
```python
df.iloc[:5, :].loc[:, ['col1']]
```

**按照条件筛选数据**

（方法太多了，记一个最通用的方法即可，更多的参见[这里](https://www.guofei.site/2017/10/15/pandas2.html)）


```python
def filter_func(x: pd.core.series.Series) -> bool:
    return x['col1'] > 2 and x['col2'] in {'one', 'three'}


# mask 是一个 Series，其内容是 bool 类型，表示每一行是否满足条件
mask = df.apply(filter_func, axis=1)

df[mask]
```

## 重复数据

```python
df.drop_duplicates()
df.drop_duplicates(subset=['col1'], keep='last')
# keep='first','last'
```

或者
```python
mask = df.duplicated(subset=['col1'], keep='last')
df[mask]
```

## 空数据

**删除空数据**
```python
dropna(how='any') # how='all'
```

**填充空数据**


可以向上填充/向下填充
```python
a=data.fillna(method='bfill',inplace=True)
# method :bfill,ffill,
```

也可以用值填充
```python
a=data.fillna(data.mean(),inplace=True)
```

值填充时，可以每列不一样
```py
df.fillna({'a':999,'b':888,'c':777,'d':666})
```

线性插值填充

```py
df1.interpolate()
```

线性插值填充：把index作为间隔

```py
df1.interpolate(method='index')
```

## apply


```python
def func(row: pd.core.series.Series):
    row['col1'] = float(row['col1'])
    row['col2_new'] = row['col2'] + '_' + str(row['col1'])
    return row


df1 = df.apply(func, axis=1)
```

## groupby

```python
df = pd.DataFrame({
    'col1': [1, 2, 3, 4, 5, 6]
    , 'col2': ['one', 'two', 'three'] * 2
    , 'col3': [1, 2] * 3})
```

groupby 的几种方式
```python
# groupby 一个字段
df.groupby('col1')

# groupby 多个字段
df.groupby(['col1', 'col2'])

# 可以是一个 list，其值表示分组号
df.groupby([[0, 0, 1, 1, 2, 2]])

# 可以是一个函数
df.groupby([lambda n: n % 3])

# 可以是它们的组合
df.groupby(['col2', lambda n: n % 3, [1, 2, 2, 2, 2, 2]])
```

**取出 group**
```python
# 1. len
len(df.groupby('col2'))

# 2. 迭代
for key, df_group in df.groupby(['col2', lambda n: n % 3]):
    print("key:", key)  # tuple，放置了此 group 的名字
    print(df_group)  # 此 group 的 DataFrame
    print("----")
```

**agg**

```python
def func(data: pd.core.series.Series):
    return data.max()


df.groupby(['col2']). \
    agg({'col1': ['mean', 'std', func]})
# 对 col1 列做 mean、std、自定义聚合


# 还可以对新列命名
df.groupby('col2'). \
    agg({
    'col1': [('新列名', 'mean'), ('std_of_col1', 'std'), ('max_of_col1', func)],
    'col3': [('mean_of_col3', 'count')]
})
```


[**多表合并**](https://www.guofei.site/2017/07/04/pandasconcat.html)



## DuckDB

原因：
- 2017年记了 [极为详细的pandas使用笔记](https://www.guofei.site/pandas.html)  
- 回头看来，pandas 太杂乱，各种语法也太反直觉，心智负担极重。因此这篇只保留最常用的。
- 因此推荐使用更现代的工具：`DuckDB`（用SQL操作数据） 和 `polars`（基于 Rust，语法不乱） 都是比较好的替代品


与 pandas 的互相转换

```python
import pandas as pd
import duckdb

df = pd.DataFrame({
    'col1': [1, 2, 3, 4, 5, 6]
    , 'col2': ['one', 'two', 'three'] * 2
    , 'col3': [1, 2] * 3})

df.to_csv("data.csv", index=False)
df.to_json("data.json", orient="records")



duckdb.sql("SELECT col1, col2, col3 FROM df WHERE col2 in ('one', 'three')"). \
    to_df()  # 转换为 pandas.DataFrame
```


从硬盘读写
```python
# 可以读入很多文件格式，例如 csv, parquet, json, excel 等等
df1 = duckdb.read_csv("data.csv")
df2 = duckdb.read_json("data.json")

# 或者用 SQL 读入数据
df3 = duckdb.sql("SELECT col1, col2, col3 FROM 'data.csv'")


# 写入
duckdb.write_csv("data.csv", df1)
duckdb.write_json("data.json", df1)

# 用 SQL 写入
duckdb.sql("COPY df1 TO 'output.csv' (HEADER, DELIMITER ',');")
duckdb.sql("COPY df1 TO 'output.json' (FORMAT JSON);")
```


**注册并使用UDF**

```python
con = duckdb.connect(':memory:')


def myfunc(x):
    return x ** 2 + 1


def my_add(x, y):
    return x + y


con.create_function(name='myfunc', function=myfunc, parameters=[sqltypes.DOUBLE], return_type=sqltypes.DOUBLE)
con.create_function(name='my_add', function=my_add, 
                    parameters=[sqltypes.DOUBLE, sqltypes.DOUBLE],
                    return_type=sqltypes.DOUBLE)

con.sql("""
        SELECT col1, myfunc(col1) AS col1_new, my_add(col1, 10) AS col1_added
        FROM df
        """)
```


暂时没有 UDAF 的功能，可以用 UDF 来代替 UDAF：

```python

def my_square_sum(arr):
    return sum(v * v for v in arr)


con.create_function(name='my_square_sum', function=my_square_sum, return_type=sqltypes.DOUBLE)

con.sql("""
        SELECT col2, SUM(col3) AS sum_col3, my_square_sum(LIST(col1)) AS square_sum_col1
        FROM df
        GROUP BY col2
        """)
```


**各种 JOIN、UNION**：直接写 SQL 即可。





还可以以数据库的形式使用

```python
con = duckdb.connect(database=':memory:')
con = duckdb.connect('mydb.duckdb')
con.close()
```

