## 控件

- h=msgbox('message','title',icon) %icon可以是none/error/help/warn/custom
- h=inputdlg('message','title',N)%N是行数
h=inputdlg({'m1','m2'},'info',1,{'mm','nn'})%多输入框
- h=waitxbar(x,h,’message’)%进度条
- bu=questdlg('内容','题目','按键1','按键2','按键1')  %选择对话框
- 打开文件
```
[FileName,PathName] = uigetfile('*.m','Select the M-file');    %打开文件的对话框
filename = uigetfile
[FileName,PathName,FilterIndex] = uigetfile(FilterSpec)
[FileName,PathName,FilterIndex] = uigetfile(FilterSpec,DialogTitle)
[FileName,PathName,FilterIndex] = uigetfile(FilterSpec,DialogTitle,DefaultName)
[FileName,PathName,FilterIndex] = uigetfile(...,'MultiSelect',selectmode)%选择多个文件
```
- uigetdir %打开文件夹
- uigetpref
- uiimport%import数据
- uiload%调用mat
- uiputfile%保存文件
- uisave%保存mat
- c=uisetcolor([r g b])% 选色对话框，默认是[r g b]
- uisetfont
- helpdlg%类似msgbox，单多了个图标
- ButtonName = questdlg(Question, Title, 'No')%多按钮对话框
ButtonName = questdlg(Question, Title, Btn1, Btn2, DEFAULT);
```
 ButtonName = questdlg('What is your favorite color?', ...
                         'Color Question', ...
                         'Red', 'Green', 'Blue', 'Green');
   switch ButtonName,
     case 'Red',
      disp('Your favorite color is Red');
     case 'Blue',
      disp('Your favorite color is Blue.')
      case 'Green',
       disp('Your favorite color is Green.');
   end
```
- imageview(S)
- movieview%放动画
- soundview%放声音


## 其它技巧
在gui中插入多个图  
axes(handles.axes1);  
cla;  

---
输出鼠标坐标  
 currPt = get(gca, 'CurrentPoint');
 xb = currPt(1,1);
 yb = currPt(1,2);

 ---
 uitable改颜色的一种方法：
```
<html><BODY bgcolor="green">CSLO</BODY></html>
```
