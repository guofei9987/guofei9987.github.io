
## cell
cellfun(@myfun1,my_cell)
%逐行计算，放回mat

mat2cell(my_mat,[1,1,1,1],[1,1,1,1])
%后两个矩阵是cell每格的矩阵大小

---
## struct

```
fieldnames(s)%返回字段名
getfield(s,fieldname)%相当于s.fieldname
setfield(s,fieldname,v)%相当于s.fieldname=v
rmfield(s,fieldname)%删除字段
isfield(s,fieldname)%判断是否是字段
isstruct(s)%判断是否是struct
orderfields%给字段排序
```

stuctfun
