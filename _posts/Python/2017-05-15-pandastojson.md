---
layout: post
title: 【语法速查】【Python】pandas.to_json.
categories: Geek
tags: 语法速查
keywords:
description:
---



## to_json

用Python于其他数据交互时，经常要用到json，这里记录to_json的方法




生成数据
```Python
import pandas as pd
a=pd.DataFrame({"col1":['str1','str2','str3'],"col2":[1,2,3]},index=["idx1","idx2","idx3"])
```

out:
| |col1|	col2|
|--|--|--|
idx1	|str1|	1
idx2	|str2	|2
idx3	|str3	|3

### orient='index'
```Python
a.to_json('a.json',orient='index')
```
out:
```Json
{"idx1":{"col1":"str1","col2":1},"idx2":{"col1":"str2","col2":2},"idx3":{"col1":"str3","col2":3}}
```

### orient='columns'
```Python
a.to_json('a.json',orient='columns')
```
out:
```Json
{"col1":{"idx1":"str1","idx2":"str2","idx3":"str3"},"col2":{"idx1":1,"idx2":2,"idx3":3}}
```
### orient='records'
```Python
a.to_json('a.json',orient='records')
```
out:
```Json
[{"col1":"str1","col2":1},{"col1":"str2","col2":2},{"col1":"str3","col2":3}]
```
### orient='split'
```Python
a.to_json('a.json',orient='split')
```
out:
```Json
{"columns":["col1","col2"],"index":["idx1","idx2","idx3"],"data":[["str1",1],["str2",2],["str3",3]]}
```
