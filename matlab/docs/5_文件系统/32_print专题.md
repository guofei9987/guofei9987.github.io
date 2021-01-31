# 1、Print
```
Print%把函数图形保存成图片
```
用法：先plot，然后
print('-dpng','文件名.png')
-dbmp：保存为bmp格式
-djpeg：保存为jpeg格式
-dpng：保存为png格式
-dpcx：保存为pcx格式
-dpdf：保存为pdf格式
-dtiff：保存为tiff格式


# 2、fopen
```
fopen
```
fid = fopen('filename','permission')
fid:
fid=+N(N是正整数)：表示文件打开成功，文件代号是N.
fid=-1 : 表示文件打开不成功。
permission:
r读取,必须存在
w 写入，不存在则创建，存在则覆盖
a 写入，创建，存在则不覆盖而是添加
r+ 读+写，不存在则不创建
w+ 读+写，创建，覆盖
a+ 读+写，创建，不覆盖而是添加（追加式打开）
 W 写，无自动刷新功能
A 读,无自动刷新功能

```
fclose
```


# 3、二进制读写

```
fread   二进制读
fwrite  二进制写
ftell    返回文件位置指针
fseek  移动文件位置指针
```




# 4、文本读写
```
fprintf%把数据写入文本文件中
```
fprintf(bid,format,data)
%c 单个字符
%d 有符号十进制数（%i也可以）
%u 无符号十进制数
%f 浮点数（%8.4f表示对浮点数取8位宽度，同时4位小数）
%o 无符号八进制数
%s  字符串
%x 小写a-f的十六进制数
%X 大小a-f的十六进制数


fscanf(fid,format,size)






# 5、屏幕显示
```
fprintf%显示在屏幕上
```
