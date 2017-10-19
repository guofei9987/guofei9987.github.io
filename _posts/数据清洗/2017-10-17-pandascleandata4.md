---
layout: post
title: 【pandas】index&colums修改.
categories:
tags: 数据清洗
keywords:
description:
---

## MultiIndex

```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.random.rand(16).reshape(4,-1))
index=pd.Index([('A','x'),('A','y'),('B','x'),('B','y')],name=['class1','class2'])
df.index=index
df
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
    <tr>
      <th>class1</th>
      <th>class2</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">A</th>
      <th>x</th>
      <td>0.066857</td>
      <td>0.245256</td>
      <td>0.042875</td>
      <td>0.725917</td>
    </tr>
    <tr>
      <th>y</th>
      <td>0.450916</td>
      <td>0.776887</td>
      <td>0.369172</td>
      <td>0.655803</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">B</th>
      <th>x</th>
      <td>0.642242</td>
      <td>0.119586</td>
      <td>0.084696</td>
      <td>0.377162</td>
    </tr>
    <tr>
      <th>y</th>
      <td>0.080035</td>
      <td>0.653582</td>
      <td>0.825833</td>
      <td>0.420380</td>
    </tr>
  </tbody>
</table>

### 每个层次的名字
```py
index.levels
```
- output
```py
FrozenList([['A', 'B'], ['x', 'y']])
```


### 每个层次分别的归属

```py
index.labels
```
- output
```py
FrozenList([[0, 0, 1, 1], [0, 1, 0, 1]])
```


### 每一个index
```py
index[0]
```
- output
```py
('A', 'x')
```


## index&columns名称修改

### 取index&columns

```py
df.index
df.columns
df.index.values
df.columns.values
df.index.name='idx'#设置index的名称
```

### 赋值修改index&columns

index是不可修改对象，要修改就只能整体换掉。

- data.index可以直接赋值为Series或list
- data.columns可以直接赋值为Series或list



### 用rename修改index和Seris
需要知道修改前的字段和修改后的字段
```python
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(4,-1),index=list('abcd'),columns=list('gfjk'))
df.rename(index={'a':'aa','e':'ee'},columns={'g':'gg'},inplace=True)
```

修改为首字母大写，大写
```python
df.rename(index={'a':'aa','e':'ee'},columns={'g':'gg'},inplace=True)
```



### set_index


```python
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(-1,4),index=list('abcd'),columns=list('wxyz'))
```

- 把某1列/多列变成index：
```py
df.set_index(['w','x'],inplace=True)#多列变成index, 多级目录
```
- append=True
```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(-1,4),index=list('abcd'),columns=list('wxyz'))
df.set_index(['w','x'],inplace=True,append=True)#保留原来的index，设置多级目录
```
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th></th>
      <th>y</th>
      <th>z</th>
    </tr>
    <tr>
      <th></th>
      <th>w</th>
      <th>x</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <th>0</th>
      <th>1</th>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>b</th>
      <th>4</th>
      <th>5</th>
      <td>6</td>
      <td>7</td>
    </tr>
    <tr>
      <th>c</th>
      <th>8</th>
      <th>9</th>
      <td>10</td>
      <td>11</td>
    </tr>
    <tr>
      <th>d</th>
      <th>12</th>
      <th>13</th>
      <td>14</td>
      <td>15</td>
    </tr>
  </tbody>
</table>


### reset_index

把index变成普通的列。  
然后index填充为0,1,2,3...  

```python
df.reset_index(inplace=True)
```

### stack/unstack

- stack:变成Series。index变成一级index，columns变成二级index
```
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(-1,4),index=list('abcd'),columns=list('wxyz'))
df.stack()
```
- unstack:变成Series。columns变成一级index，index变成二级index
```
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(-1,4),index=list('abcd'),columns=list('wxyz'))
df.unstack()
```
    - output:
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>0</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="4" valign="top">w</th>
      <th>a</th>
      <td>0</td>
    </tr>
    <tr>
      <th>b</th>
      <td>4</td>
    </tr>
    <tr>
      <th>c</th>
      <td>8</td>
    </tr>
    <tr>
      <th>d</th>
      <td>12</td>
    </tr>
    <tr>
      <th rowspan="4" valign="top">x</th>
      <th>a</th>
      <td>1</td>
    </tr>
    <tr>
      <th>b</th>
      <td>5</td>
    </tr>
    <tr>
      <th>c</th>
      <td>9</td>
    </tr>
    <tr>
      <th>d</th>
      <td>13</td>
    </tr>
    <tr>
      <th rowspan="4" valign="top">y</th>
      <th>a</th>
      <td>2</td>
    </tr>
    <tr>
      <th>b</th>
      <td>6</td>
    </tr>
    <tr>
      <th>c</th>
      <td>10</td>
    </tr>
    <tr>
      <th>d</th>
      <td>14</td>
    </tr>
    <tr>
      <th rowspan="4" valign="top">z</th>
      <th>a</th>
      <td>3</td>
    </tr>
    <tr>
      <th>b</th>
      <td>7</td>
    </tr>
    <tr>
      <th>c</th>
      <td>11</td>
    </tr>
    <tr>
      <th>d</th>
      <td>15</td>
    </tr>
  </tbody>
</table>


注意：stack与unstack **不是** 逆操作。  


### pivot透视表
选取三列，分别作为行索引，列索引，元素值，将其转成二维表格  

数据准备：  
```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(-1,4),columns=list('wxyz'))
df.loc[:,'w']=[0,0,1,1]
df.loc[:,'x']=[3,4,3,4]
```

```py
df.pivot(index='w',columns='x',values='y')
```


<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>x</th>
      <th>3</th>
      <th>4</th>
    </tr>
    <tr>
      <th>w</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>6</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10</td>
      <td>14</td>
    </tr>
  </tbody>
</table>


注意：index， columns， values 这三列都只能接受一个值。  


如果不指定values，会把所有数据变成values，并生成多列数据

```
df.pivot(index='w',columns='x')
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>x</th>
      <th>3</th>
      <th>4</th>
    </tr>
    <tr>
      <th>w</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>6</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10</td>
      <td>14</td>
    </tr>
  </tbody>
</table>



### 交换index

swaplevel()  
这里先交换再排序：  
```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(-1,4),index=list('abcd'),columns=list('wxyz'))
df.set_index(['w'],append=True,inplace=True)
df.swaplevel().sort_index()
```
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>w</th>
      <th>x</th>
      <th>y</th>
      <th>z</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>4</td>
      <td>6</td>
      <td>7</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>10</td>
      <td>11</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>4</td>
      <td>14</td>
      <td>15</td>
    </tr>
  </tbody>
</table>




### 用reindex填充index

- 前提：原index是某种连续的值
- 没有inplace，不修改原df，而是返回一个DataFrame

```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(12).reshape(-1,4),index=list('abc'),columns=list('wxyz'))

df.reindex(list('abcde'),method='ffill')
#index太多，默认填值为nan，可以ffill，bfill填充

df.reindex(list('abcde'),fill_value=0)
#用指定的数填充
```



|参数|说明|
|--|--|
|index||
|method|ffill,bfill|
|fiil_value||
|limit|向前或向后填充时，最大填充量|
|copy|默认为True，否则不复制|







#### 案例：时间序列中填充index
```python
idx = pd.date_range('09-01-2013', '09-30-2013')

s = pd.Series({'09-02-2013': 2,
               '09-03-2013': 10,
               '09-06-2013': 5,
               '09-07-2013': 1})#数据类型是<DatetimeIndex>


#下面扩展
s.index = pd.DatetimeIndex(s.index)#把原来index从字符串格式str变为时间格式Timestamp
s = s.reindex(idx,fill_value=np.nan)  
#reindex不限于时间序列，idx还可以是list，这样可以扩展非时间序列的数据             
```
？？column能不能这么转

### 类型转换astype
```python
 data["medal"].astype("category")#这样，就把字符型，转换为category型了
```
？？参数还可以是其它类型吗
？？字符格式的时间能不能转成时间格式
【未完待续】自己查


## 时间序列


Timestamp对象继承自datetime类,参见我写的[另一篇博客](http://www.guofei.site/2017/10/22/pydatetime.html)

## 其它

### 用map修改index&columns
- rename可以完全替代这个
- 参数不能是dict
index有map()方法，但没有apply方法，案例：
```python
import pandas as pd
import numpy as np

df = pd.DataFrame(np.arange(16).reshape(4, -1), index=list('abcd'), columns=list('gfjk'))
df.index = df.index.map(str.upper)
```
