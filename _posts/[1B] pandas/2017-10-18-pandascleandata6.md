---
layout: post
title: 【pandas】groupby
categories:
tags: 1-2-Pandas与numpy
keywords:
description:
order: 106
---

## 创建groupby

数据准备
```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(-1,4),columns=list('wxyz'))
df.loc[:,'w']=[0,0,1,1]
df.loc[:,'x']=[3,4,3,4]
```


### 1. groupby字段
可以groupby一个字段
```py
df.groupby('w')

```
可以groupby多个字段
```py
df.groupby(['w','x'])
```
### 2. groupby一个序列
一个1darray
```py
random_values=np.random.randint(0,5,df.shape[0])
df.groupby(random_values)
```
一个Series
```py
df.groupby(df.loc[:,'w'])
```
### 3. 函数/lambda
```py
df.groupby(lambda n:n%3)
```
n是index，每次调用函数是输入1个
### 4. 在一个list中混用

```py
df.groupby(['w',random_values,lambda n:n%3])
```

## groupby取数

### 1. len

返回一个数字，分了多少组

```py
len(df.groupby('w'))
```

### 2. key, df

```py
for key,df_group in df.groupby('w'):
    print(key)#从0开始的编号
    print(df_group)#每个group的DataFrame
```

支持多种迭代接口

```py
(key1,df1),(key2,df2)=df.groupby('w')
```

### 3. get_group

获取指定分组键对应的数据  

数据准备：

```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(-1,4),columns=list('wxyz'))
df.loc[:,'w']=[0,0,1,1]
df.loc[:,'x']=list('abab')
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
      <td>a</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>b</td>
      <td>6</td>
      <td>7</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>a</td>
      <td>10</td>
      <td>11</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>b</td>
      <td>14</td>
      <td>15</td>
    </tr>
  </tbody>
</table>

```py
df.groupby(['w','x']).get_group((1,'a'))
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
      <th>2</th>
      <td>1</td>
      <td>a</td>
      <td>10</td>
      <td>11</td>
    </tr>
  </tbody>
</table>

### 4. 取新列

```py
df.groupby(['w','x'])['y']
```
也是一个groupby对象，只不过数据只有y这一列，用法与groupby完全相同：
```py
for key,df_group in df.groupby(['w','x'])['z','y']:
    print(key)#从0开始的编号
    print(df_group)#每个group的DataFrame
```


## groupby运算
### 通用方法
大多数DataFrame方法都可以用于groupby, 见于[这里](http://www.guofei.site/2017/10/18/pandascleandata5.html)  

### agg()

```py
import pandas as pd
import numpy as np
from scipy import stats
rv=stats.uniform()
df=pd.DataFrame(rv.rvs(size=(100,5)),columns=list('abcde'))
df.a=(df.a>0.5)*1
df.b=(df.b>0.5)*1

# 对所有列做多个agg
df.groupby('a')['d','e'].agg([np.sum,np.mean,np.min,np.max])

# 对每个列做不同的agg
df.groupby(['a','b'], as_index=False).agg({'c':[('mean_of_c','mean'),'std',('sum_of_c',np.sum)],'d':np.std,'e':lambda x:x.mean(),'e':func})
# 1. as_index 顾名思义
# 2. agg 后接一个dict，dict的key表示对这个字段进行操作，
# 3. dict 的 value 可以是字符串、函数，可以是['自定义名',字符串/函数]
```

常用函数
- 内置函数('count','sum'...)
- np函数 (np.max, np.min, np.sum, np.mean, np.median, np.std, np.std, np.size)
- 自定义函数(func,lambda表达式)


后接自定义函数时，该自定义函数输入时每个group的每个列作为Series，返回一个数  
func接受Series报错时，会尝试接受分组DataFrame，并输出一个数，或者一行数   
示例：  
```py
df.groupby('w').agg(lambda dd: dd.loc[(dd.z+dd.y).idxmax()])
```

#### agg()命名
可以手动给agg后的每列命名
```py
df.groupby('a').agg([('one','mean'),('two','std')]) # 两列不再以mean, std命名，而是改成'one', 'two'
df.groupby('a').agg({'col1':('mean_of_col1','mean'),('std_of_col1','std')]})
df.groupby('a').mean().add_prefix('mean_of_') # 批量命名
```
### transfrom()

效果同agg(),func接受每个group的Series，如果不能接受接受Series时，会尝试接受分组DataFrame，

例如，下面用一行代码做到了分组标准化

```py
df.groupby('w').transform(lambda s:(s-s.mean())/s.std())
```

### filter()

func接收每个group的DataFrame，返回True/False。  
filter根据返回的True/False决定是否保留这一个group

下面这段代码剔除了最大值大于0.6的组  
```py
df.groupby('w').filter(lambda s:s.x.max()<0.6)
```


### apply()
apply用法十分灵活，可以完成上面的agg，transfrom，filter等。  

```py
def func(df,n=5,b=9):
    return 1
df.groupby('col1').apply(func,n=1,b=3) # n=1, b=3是func的输入
```
## 其它用法

```py
creditcard_exp.groupby('gender')['avg_exp'].describe()
```
