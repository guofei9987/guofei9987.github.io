## 生成
### 方式1：读取文件
```
T = readtable(FILENAME,'FileType',FILETYPE)
```

 .txt, .dat, .csv

.xls, .xlsx, .xlsb, .xlsm, .xltm, .xltx, .ods:

'ReadVariableNames'     0/1  第一行是否是变量名
 'ReadRowNames'    0/1 第一列是否是行名
 'TreatAsEmpty'   string 或 cell of string 如果某cell为空，用什么代替
'Sheet'      
'Range'   
 'basic'

### 方式2：直接构造
```
T = table(var1,...,varN,Name,Value)
```
其中
name='RowNames'或'VariableNames'

变量可以是多种对象，例如：
```
T = table(categorical({'M';'F';'M'}),[45;32;34],... {'NY';'CA';'MA'},logical([1;0;0]),...'VariableNames',{'Gender''Age''State''Vote'})
```
### 方式3：array2table
```
T = array2table(my_array,Name,Value)
```

其中，
my_array可以是matrix或cell
name='RowNames'或'VariableNames'

## 取table中的数据

先生成table
```
array12=magic(4)%cell同理
T=array2table(array12,'RowNames',{'a','b','c','d'},'VariableNames',{'v1','v2','v3','v4'})
```
### 调用方式1：返回matrix或cell
```
T.v1
```

### 调用方式2：返回matrix或cell
```
T.v2(3)
T.v2([4,3])
```

### 调用方式3：返回table
```
T(1,1)
T(:,2)
T([3,2],:)
```

### 调用方式4：用变量名返回table
```
T('c','v3')
T('c',:)
T(:,'v3')
T(:,{'v1','v3'})
```
---
## 修改table
### 删除
```
T('c',:)=[]
```

### 添加列：赋值法
```
T.new_variables=[4;5;6;7];%添加mat
T.new_variables={6;4;7;8};%添加cell
```

### 添加列：合并法
```
T_new=[T_add,T]
```

### 添加行：合并法
```
T_new=[T_add;T]
```
写入
```
writeable(nasdaq,'mydata.csv')  
writetable(T,'mydata.txt','Delimiter',' ')
```

## 互相转化
table2array
struct2table
