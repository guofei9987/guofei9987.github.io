
## 回调函数

Menu Editor  
Context Editor  



## my_gui(varargin)
每次触发控件后，此主函数会运行

varargin包含4个变量：  
['触发控件的回调函数名',hObject,eventdata,handles]  
hObject是当前对象的句柄  
eventdata是附加参数  
handles，结构体，包含当前gui所有对象的句柄和用户定义的数据  

get(hObject,'value')  

## 一些callback

figure上的：  
```
CreateFcn  
DeleteFcn  
ButtonDownFcn:左，中，右键；但左键可能冲突时，左键无效  
WindowButtonDownFcn  
WindowButtonMotionFcn  
WindowButtonUpFcn  
WindowKeyPressFcn  
WindowKeyReleaseFcn  
WindowScrollWheelFcn  
KeyPressFcn  
KeyReleaseFcn  
SizeChangedFcn:改变figure大小时，调用这个  
CloseRequestFcn:关闭GUI时，调用这个  
```

小技巧：把CloseRequestFcn中的delete(hObject)删掉，GUi就无法关闭了  



控件上的：  
```
callback  
CreateFcn  
DeleteFcn:控件关闭时触发  
ButtonDownFcn:右键点击  
KeyPressFcn:当前控件获得焦点，并且有按键按下时执行  
```

table控件上多了2个  
CellEditCallback  
CellSelectionCallback  
