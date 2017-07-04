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


## 合并DataFrame  
### 纵向合并  
特点：匹配columns，匹配不到的的填入nan
```python
result=pd.concat([df1,df2,df3])
```

例子：  
```py
import pandas as pd
from pandas import DataFrame
df1=DataFrame({'A':['A0','A1','A2','A3'],
               'B':['B0','B1','B2','B3'],
               'C':['C0','C1','C2','C3'],
               'D':['D0','D1','D2','D3']},
               index=[0,1,2,3])

df2=DataFrame({'A':['A4','A5','A6','A7'],
               'B':['B4','B5','B6','B7'],
               'C':['C4','C5','C6','C7'],
               'D':['D4','D5','D6','D7']},
               index=[4,5,6,7])

df3=DataFrame({'A':['A8','A9','A10','A11'],
               'B':['B8','B9','B10','B11'],
               'C':['C8','C9','C10','C11'],
               'D':['D8','D9','D10','D11']},
               index=[8,9,10,11])

result=pd.concat([df1,df2,df3])
```

效果如下：  
<img src='http://www.guofei.site/public/postimg2/concat.jpg'>


要在相接的时候在加上一个层次的key来识别数据源自于哪张表，可以增加key参数
```py
result = pd.concat(frames, keys=['x', 'y', 'z'])
```
效果如下：  
<img src='http://www.guofei.site/public/postimg2/concat2.jpg'>



### 横向对齐
```py
result = pd.concat([df1, df4], axis=1)
```
效果如下：  
<img src='http://www.guofei.site/public/postimg2/concat3.jpg'>


### join



## 数据切片、筛选

### 通过下标选取数据：

准备数据
```python
import pandas as pd
d = {'one' : pd.Series([1., 2., 3.], index=['a', 'b', 'c']),'two' : pd.Series([2., 3., 4., 5.], index=['a', 'b', 'c', 'd'])}
df = pd.DataFrame(d)
```

- 选取列
```python
a=df[['one']]#a是DataFrame
b=df['one']#b是Series
```
注意：type不同

- 选取行
```python
a=df[0:3]#a是DataFrame，含头不含尾
```

- 选取行列：loc

```python
df.loc['a':'b']#选取ab两行数据，返回DataFrame
df.loc['a':'b','one']#选取one列的数据，返回Series
a=df.loc[:'b',['one']]#返回DataFrame
```
注意：用index取数是含头又含尾的


- 用数字选取行列：iloc
含头不含尾
```python
a = df.iloc[1,1]#从0开始计数，返回的是这个元素本身的类型
a = df.iloc[0:2,1:2]#返回DataFrame
a = df.iloc[0:2,:]#返回DataFrame
a = df.iloc[:,1]#选取所有记录的第一列的值，返回的为一个Series
a = df.iloc[1,:]#选取第一行数据，返回的为一个Series！！！行也可以组成一个Series
```

- 更通用的方式:ix
切片共享内存
### 数据筛选

```python
df[df.one >= 2]#单个逻辑条件
df[(df.one >=1 ) & (df.one < 3) ]#多个逻辑条件组合
```
分析：
df.one是一个Series
df.one>1是一个Series，里面存的是bool
多个逻辑条件组合，不能用and，而要用&
df>2是一个DataFrame
