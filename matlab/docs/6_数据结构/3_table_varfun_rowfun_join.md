## varfun
```
 B = varfun(@myfun,A, 'PARAM1',val1, 'PARAM2',val2, ...)
```
### @myfun：
输入是A.var1
输出是一个matrix或cell，进而合并到B中

### 'InputVariables'
所需要计算的列
    值：1、列名（字符串）      例如：{'variable2','variable3'}
            2、列号（数字）        例如：[3,2]
            3、逻辑矩阵               例如：logical([0,1,0,1,0,0])

### 'GroupingVariables'
分组计算，当分组时，@myfun的输入变为每组的列

### 'OutputFormat'
 输出格式：'uniform', 'table', 'cell'

### 'ErrorHandler'   
错误时，运行@myfun2

## rowfun
```
B = rowfun(@myfun,A, 'PARAM1',val1, 'PARAM2',val2, ...)
```
行函数，比varfun应用场景更广泛

### @myfun
@myfun是这样的：
function [y1,y2,y3]=myfun(x1,x2,x3,x4)
每次读入一行

### 'GroupingVariables'
如果有这个值：@myfun的输入是mi*ni的变量，而不是单纯的一行了


### 'OutputVariableNames'
输出格式：'uniform', 'table', 'cell'


## 排序
```
 B = sortrows(A,VARS,MODE)
```

当vars='RowNames'，意思是按行名排序
 MODE is 'ascend' (the default) or 'descend'

## 连接
 [C,IB] = join(A, B, 'PARAM1',val1, 'PARAM2',val2, ...)

'Keys':共同的列名
'LeftKeys'  'RightKeys'  左表和右表

'LeftVariables'  C表中包括A表中的那些字段
 'RightVariables'

 'KeepOneCopy'

总结：join在SQL里面没有对应的语句，限制比较大
---
## innerjoin
 [C,IA,IB] = innerjoin(A, B, 'PARAM1',val1, 'PARAM2',val2, ...)

 'Keys'
'LeftKeys'  'RightKeys'

'LeftVariables'   'RightVariables'


[C,IA,IB] = outerjoin(A, B, 'PARAM1',val1, 'PARAM2',val2, ...)

 'Keys'
'LeftKeys'  'RightKeys'

 'MergeKeys'

'LeftVariables'   'RightVariables'

'Type'='full', 'left', or 'right'


---
## 其它
size

intersect 交集。返回两表中的相同的行，返回table  
setxor 差集
ismember 查询表A中的行是否在表B中也出现，回逻辑向量  
setdiff 查询两表之间的差异，返回table  
unique 返回的表中没有相同的行  
sextor 两个集合交集的非  
union 两个集合的并  
join 自然连接  
innterjoin 内连接  
outerjoin 外连接  

Data organization的操作  
summary 返回table的基本信息  
stack 把table的各列摞成一列  
unstack 把table的某一列展开成为若干列  
ismissing 找到table中那些没有赋值的项，返回logical index  
standizeMissing 给未赋值项赋默认值  


## stack&unstack

```
Storm = [3;3;1;3;1;1;4;2;4;2;4;2];
Town = {'T1';'T3';'T1';'T2';'T2';'T3';...
    'T2';'T1';'T3';'T3';'T1';'T2'};
Snowfall = [0;3;5;5;9;10;12;13;15;16;17;21];
T = table(Storm,Town,Snowfall)
W = unstack(T,'Snowfall','Town')
```


```
[W,it] = unstack(T,'Price','Stock','AggregationFunction',@mean)
```


stack  
unstack  
是sas中的转秩  
具体参见doc  
