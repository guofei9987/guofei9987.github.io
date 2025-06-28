
## 字符串方法
*回收原因：用df.transfrom({'col':func}) 可读性更强、更灵活，也没必要记太多的方法*
```python
df['index'].str.upper()
df['index'].str.len()
df['index'].str.contains('a')#字符中是否包含a，bool
```


### 字符串加减
```PY
df=pd.DataFrame(['北京','北京市','北京地区'])
df_abc=pd.DataFrame(list('abc'))
df+df_abc*2
```

### 字符串的分裂合并


**只对Series有用**

#### 分裂

```py
s=pd.Series(['a|b|cc','x|yy|z'])
s_list=s.str.split('|')
```
- output
```py
0    [a, b, cc]
1    [x, yy, z]
```

#### 获取元素
```py
s_list.str[1]
```
- output
```py
0     b
1    yy
```

#### 用其它字符填充
```py
s_comma=s_list.str.join(',')
```
- output
```py
0    a,b,cc
1    x,yy,z
```

#### 正则表达式
```py
s.str.extract('正则表达式')
```

## 列变化
*transform和apply，agg 这三个够了*
### 方法1：map
- map只能针对Series
- 原本的数据没在dict中的，填充为NaN

```python
data['animal'] = data['food'].map(str.lower).map(my_dict)
#my_dict是一个字典，key是data['food']中的元素，values是输出Series中的元素
```
