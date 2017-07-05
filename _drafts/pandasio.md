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
