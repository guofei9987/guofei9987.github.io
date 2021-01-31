
## 读写
1、fscanf
%s   !!!问题：空格丢失
%c   ！！！没有上述问题，返回的是带空格和回车的char
**可用于SQL语句的读写！**

2、fget

fgetl;%不返回换行符，是m-文件,调用fgets
fgets%返回换行符，是build-in，可以指定字符数量



3、textsan(最常用)
适合读入大文件
可以从任何位置开始读入
**有很多变种，请doc后深入阅读**
？？？似乎是Build-in function
```
C = textscan(fileID,formatSpec,N)
C = textscan(str,formatSpec,N)
```

%3.1f  表示算上小数点，读入3位，小数点后1位
```
*1d
```
`*`表示跳过这个，不放到输出里面



4、fread
读入的是ASCII码


5、importdata('test1.txt')


6、textread
[a,b,c]=textread('filename','format');
逐渐被textscan取代
调用了dataread函数
C = textscan(fileID,formatSpec,N)
C = textscan(str,formatSpec,N)


7、dlmread和dlmwrite
dlmread调用fread
mat=dlmread('filename','\t')
dlmwrite调用fwrite

8、csvread,csvwirte
csvread调用dlmread
csvwrite调用dlmwrite
