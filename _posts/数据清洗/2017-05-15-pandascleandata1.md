---
layout: post
title: 【pandas】读入与读出.
categories: Geek
tags: 数据清洗
keywords:
description:
---

## 创建
### 用Series组成的dict创建
```python
import pandas as pd
d = {'one' : pd.Series([1., 2., 3.], index=['a', 'b', 'c']),'two' : pd.Series([1., 2., 3., 4.], index=['a', 'b', 'c', 'd'])}
df = pd.DataFrame(d)
```

### 用list组成的dict创建
```python
import pandas as pd
df = pd.DataFrame({'key': ['b', 'b', 'a', 'c', 'a', 'a', 'b'], 'data1': range(7)})
df.head(5)
```

### 用dict组成的list创建
```python
d = [{'one' : 1,'two':1},{'one' : 2,'two' : 2},{'one' : 3,'two' : 3},{'two' : 4}]
df = pd.DataFrame(d,index=['a','b','c','d'],columns=['one','two'])
df.index.name='index'
```

## to_dict
```python
df.to_dict(orient='Series')
df.to_dict(orient='records')
...
```
返回一个Series组成的dict

## to_excel&read_excel
- 从EXCEL读入DataFrame：
```python
bonus = pd.read_excel('bonus_schedule.xls')
bonus.head(3)
```

- 将DataFrame写入EXCEL：
```python
bonus.to_excel('foo1.xlsx', sheet_name='sheet1')
```

## to_csv&read_csv
- read_csv
```python
macrodata = pd.read_csv('macrodata.csv')
macrodata.head(1)
```

- to_csv
```py
macrodata.to_csv('d:/foo.csv')
```

### read_csv中的参数

在数据分析中，read_csv是最常用的函数之一，所以有必要详细解释参数。  

- header： 选择哪一行作为columns name，读入的数据从header的下一行开始
    - int：这一行作为columns name
    - list of ints：几行合起来作为columns name
    - None：不用数据作为columns name，而是用自然数
- names： 自定义columns name
- index_col：  选择那一列作为index name
    - int：选择第几列作为index name
    - list：选择多列作为多层index name(**非常强大！**)
    - None：不用数据做index name，而是用自然数

## to_json

用Python于其他语言进行数据交互时经常要用到json，这里记录to_json的方法




生成数据
```Python
import pandas as pd
a=pd.DataFrame({"col1":['str1','str2','str3'],"col2":[1,2,3]},index=["idx1","idx2","idx3"])
```

out:

<table>
<tr><th></th><th>col1</th><th>col2</th></tr>
<tr><td>idx1</td><td>str1</td><td>1</td></tr>
<tr><td>idx2</td><td>str2</td><td>2</td></tr>
<tr><td>idx3</td><td>str3</td><td>3</td></tr>
</table>



- orient='index'
```Python
a.to_json('a.json',orient='index')
```
out:
```Json
{"idx1":{"col1":"str1","col2":1},"idx2":{"col1":"str2","col2":2},"idx3":{"col1":"str3","col2":3}}
```

- orient='columns'
```Python
a.to_json('a.json',orient='columns')
```
out:  
```Json
{"col1":{"idx1":"str1","idx2":"str2","idx3":"str3"},"col2":{"idx1":1,"idx2":2,"idx3":3}}
```
- orient='records'
```Python
a.to_json('a.json',orient='records')
```
out:  
```Json
[{"col1":"str1","col2":1},{"col1":"str2","col2":2},{"col1":"str3","col2":3}]
```
- orient='split'
```Python
a.to_json('a.json',orient='split')
```
out:
```Json
{"columns":["col1","col2"],"index":["idx1","idx2","idx3"],"data":[["str1",1],["str2",2],["str3",3]]}
```

- orient='values'
```Python
a.to_json('ax1.json', orient='values')
```
out:
```Json
[["str1",1],["str2",2],["str3",3]]
```


## 其它to
```py
df.to_clipboard到剪切板上
to_panel
to_period# 把时间序列数据，变成频率数据
to_latex
to_html
to_string
to_pickle# 存到内存中
to_sql
```
