## 计算均值、和等
```python
df.mean(1)#参数为0或1.默认为0，即按照列运算
df.sum(1) #计算行的和
df.apply(lambda x: x.max() - x.min())#将一个函数应用到DataFrame的每一列，这里使用的是匿名lambda函数，与R中apply函数类似
```



取最值
```python
print df['two'].max()  #  min取最小
print df['two'].idxmax()  #idxmin取最小
```


## 描述性统计
```python
df.describe(include='all').T#T表示转置，为了美观
```
- 用include='all'，表示对字符串也描述。对分类变量计算unique个数等等



## 排序

```python
df.sort_index(axis=1, ascending=False)
```

```python
df.sort(columns=['1','two'],ascending=[0,1])
```
