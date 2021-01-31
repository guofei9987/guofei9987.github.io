
## GUI内部：

### 方法1，用global
存取频繁用global，不频繁用application或handle

### 方法2，用handle
写入：
handles.F=6;
guidata(hObject,handles);
读取：
F=handles.F

### 方法3：用application
setappdata：设定或创建结构体数据  
getappdata：访问数据  
isappdata：判断是否存在  
rmappdata：删除  

写入：(pushbutton1中)  
data.a=100;  
setappdata(hObject,'my_data',data)  
读取：  
data=getappdata(handles.pushbutton1,'my_data')  



## GUI之间：
### 方法1，用global

### 方法2，用application

写入：(第一个gui中)
data.a=100;
setappdata(0,'my_data',data)
读取：
data=getappdata(0,'my_data')

### 方法3，用变量空间（不推荐）
assignin('base','a',a)
a=evalin('caller','a')
'caller'是主函数的workspace



## 多界面
```
h=gcf;  
wenjian;  
close(h);  
```

http://blog.sina.com.cn/s/blog_630c70530100ies5.html  
http://blog.csdn.net/iuway/article/details/7845516  
http://blog.sina.com.cn/s/blog_4d633dc70100o58b.html  
http://blog.sina.com.cn/s/blog_4b1260cb0100khzd.html  
http://www.cnblogs.com/nktblog/archive/2012/05/04/2482875.html  
