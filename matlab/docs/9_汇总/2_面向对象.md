
## UML
类的继承：空心箭头  
组合关系：实心菱形，在constructor中，把每个属性定义为其它的类  
聚集关系：空心菱形，不在constructor中定义  

属性：  
```
Access  
+public 都可以访问  
#protected 该类和该类的子类可以访问  
-private 该类可以访问  
```
SetAccess  
GetAccess  


## 基本篇

### 查询属性和方法
```
t=timer
properties(t)
methods(t)
events(t)
superclasses(t)
whos%查询当前变量
```

### class的一般用法示例
```
classdef Point2D<handle
    properties
        x=0
        y=0
    end
    methods
        function obj=Point2D(x0,y0)
            obj.x=x0
            obj.y=y0
        end
        function normalize(obj)
            r=sqrt(obj.x^2+obj.y^2);
            obj.x=obj.x/r
            obj.y=obj.y/r
        end
    end
end
```

### 关于property：
1. 直接赋值  
k=Point2D(2,3)  
k.x=555  

2. 默认值

??????
??????
??????


3. 常量属性
```matlab
properties(Constant)
```
输入A.R%这里A是类，而不是对象

4. dependent属性
```
properties(Dependent)
```
在methods中用这个：
```
function r=get.r(obj)
```
或
```
function string=get.text(obj)
```
5. Hidden属性
```
properties(Hidden)
```
隐藏后如果用户知道属性名，仍然可以访问该属性.

6. private属性（只有该类可访问）
```
properties(Access=private)
```

7. protected属性（该类和之类可访问）
```
properties(Access=protected)
```
8. public属性
默认的属性

## 关于methods

methods中的function可以放到一个独立的文件中，在methods中仅给出声明
```
normalize(obj)
```
但以下不能这么做，必须在类中给出实现细节：
```
Constructor，Destructor，static
```

### 调用methods

```
obj.memberFunction(arg1,arg2)
memberFunction(obj,arg1,arg2)
```

以上两个表达式等价，但表达式2非常不建议使用

### 任何methods都不隶属于对象
```
p1=Point2D(1,1)
p2=Point3D(1,1,1)
normalize(p1)和normalize(p2)分别调用不同的methods
```

在调用methods时，Dispathcer会动态判断methods的signature，signature=函数名+所属类。

#### 判断x是否是某个类型
```
isa(x,'Point2D')
```


### 类的继承


## 3、Value Class 和 Handle Class
Value Class赋值后，不产生副本，但修改后自动产生副本  
Handle Class赋值后，不产生副本，修改后也不产生副本（浅拷贝）  

handle类有一个method：delete，调用这个method，可以删除method对应的数据，只剩下一个失效的handle对象（即使这个数据被多个handle对应）  
1、当内存引用计数为0之前，会自动调用delete方法  
2、当对象离开作用域时，会自动调用delete方法  

value类没有delete方法

## 4、事件和响应
响应函数可以是普通函数
```
lh=addlistener(eventObject,'EventName',@functionName)
```
可以是类的成员方法
```
lh=addlistener(eventObject,'EventName',@obj.methodName)
```
可以是类的静态方法
```
lh=addlistener(eventObject,'EventName',@ClassName.methodName)
```
代码
event_class1是class1中的一个event：
my_call_back是一个独立的函数
```
p=class1()
%lh=addlistener(p,'events_class1',@my_call_back)
p.addlistener('events_class1',@my_call_back)
p.notify('events_class1')
```


## 5、文件结构
定义和方法分开放：  
1、必须放到同一个文件夹，文件夹名字为@class_name（文件夹名字就是类名）  
2、类m文件中有methods的定义：  
```
[y]=myfun1()
myfun2()
```
放methods的m文件中也是用上述表达方式  
3、Constructor,delete必须放到类定义中  
4、set和get方法必须放到类定义中  
5、static 方法必须放到类定义中  

这样：可以把@Point所在文件夹中运行  

打包：  
目录以+开头，例如：  
+my_package  

继承时，不要忘记加package名  


使用某个类  
p1=my_package.class1()  

导入全部的类  
import my_package.*  
这样，调用类的时候，就无须加上my_package.了  
调用my_package中的其它文件，也无须加上my_package  
局部函数：  
在类的m文件的结尾可以放一个function，这个function可以被类调用  



## 6、save和load
瞬态属性：不会被save到mat中  
properties(Transient)  

<table>
<thead><tr class="tableizer-firstrow"><th>属性</th><th>是否分配内存</th><th>是否save到mat</th></tr></thead><tbody>
 <tr><td>Stored</td><td>Y</td><td>Y</td></tr>
 <tr><td>Transient</td><td>Y</td><td>N</td></tr>
 <tr><td>Dependent</td><td>N</td><td>N</td></tr>
</tbody></table>

## GUI
几个需要的函数  
hfig=get(o,'Parent')  
取得o的Parent。例如，o是一个控件，那么，返回控件所在的figure  

findobj(hfig,'Tag','inputbox')  
与get相反的操作，找到某个控件  


set(withdrawButton,'callback',@(o,e)withdraw_callback(o,e));  
添加某个控件的回调函数  
