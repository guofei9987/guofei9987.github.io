---
layout: post
title: 【Python】【matplotlib】面向对象方式绘图
categories: Geek
tags: 语法速查
keywords:
description:
---


不用面向对象方式画图，优点在于代码简单，缺点在于画多图和多子图附带各种标注时，代码很乱。  
当然，更复杂和标注清晰的图，大部分需求场景是成熟的可视化展示，这种情况下用echart更好。  


## 各个对象

plt.figure()  

先生成一个figure，在figure上生成一个Axes，在Axes上面生成line（plot）,或者生成patch(bar&hist)  

它们之间的关系参照这段代码:  
```py
f.axes[0].lines[0]
```


获取的方法1
```py
f=plt.gcf()#get current figure
a=plt.gca()#get current axes
```

获取的方法2
```py
f=plt.gcf()
a=plt.getp(f,'axes')[0]
l=plt.getp(f,'lines')[0]
```

### 共有属性
这些对象共有的一些属性：  

|关键字|解释|
|--|--|
|alpha|透明度，0~1|
|animated|布尔值，用于绘制动画效果|
|axes|所在的axes|
|clip_box|对象的裁剪框|
|clip_on|是否裁剪|
|clip_path|裁剪的路径|
|contains|判断指定点是否在对象上的函数|
|figure|对象所在的figure|
|label|文本标签|
|picker|用来控制对象的选取|
|transform|控制偏移、旋转、缩放等|
|visible|是否可见|
|zorder|控制绘图顺序,any number|

## figure

```py
f=plt.gcf()
f=plt.figure(1)
```

figure的类型是：
```py
<class 'matplotlib.figure.Figure'>
```

figure下的属性（用plt.getp(f)获取）

```py
agg_filter = None
alpha = None
animated = False
axes = [<matplotlib.axes._subplots.AxesSubplot>]
children = [<matplotlib.patches.Rectangle>]
clip_box = None
clip_on = True
clip_path = None
contains = None
default_bbox_extra_artists = [<matplotlib.axes._subplots.AxesSubplot>]
dpi = 72.0
edgecolor = (1.0, 1.0, 1.0, 0.0)
facecolor = (1.0, 1.0, 1.0, 0.0)
figheight = 4.0
figure = None
figwidth = 6.0
frameon = True
gid = None
label =
path_effects = []
picker = None
rasterized = None
size_inches = [ 6.  4.]
sketch_params = None
snap = None
tight_layout = False
transform = IdentityTransform()
transformed_clip_path_and_affine = (None, None)
url = None
visible = True
window_extent = TransformedBbox(Bbox([[0.0, 0.0], [6.0, 4.0]]))
zorder = 0
```

一些解释：  

|属性|意义|
|--|--|
|axes|Axes对象列表|
|patch|作为背景的Rectangle对象|
|images|FigureImage对象列表，用于显示图像|
|lines|Line2D对象列表|
|patches|Patch对象列表|
|text|Text对象列表，用于显示文字|

## Axes

对象信息：
```py
<matplotlib.axes._subplots.AxesSubplot at 0x263c9ba9320>
```

可以有两种方法获取

```py
a1=plt.getp(f,'axes')#生成的是一个list
a2=plt.gca()#当前激活的axes

```

axes对象的属性：(用plt.getp(a2)获取)

```py
adjustable = box
agg_filter = None
alpha = None
anchor = C
animated = False
aspect = auto
autoscale_on = False
autoscalex_on = True
autoscaley_on = False
axes = Axes(0.125,0.125;0.775x0.755)
axes_locator = None
axis_bgcolor = (1.0, 1.0, 1.0, 1)
axisbelow = line
children = [<matplotlib.lines.Line2D>]
clip_box = None
clip_on = True
clip_path = None
contains = None
cursor_props = (1, (0.0, 0.0, 0.0, 1))
data_ratio = 0.36363636363636365
default_bbox_extra_artists = [<matplotlib.lines.Line2D>]
facecolor = (1.0, 1.0, 1.0, 1)
fc = (1.0, 1.0, 1.0, 1)
figure = Figure(432x288)
frame_on = True
geometry = (1, 1, 1)
gid = None
images = <a list of 0 AxesImage objects>
label =
legend = None
legend_handles_labels = ([], [])
lines = <a list of 34 Line2D objects>
navigate = True
navigate_mode = None
path_effects = []
picker = None
position = Bbox(x0=0.125, y0=0.125, x1=0.9, y1=0.88)
rasterization_zorder = None
rasterized = None
renderer_cache = None
shared_x_axes = <matplotlib.cbook.Grouper
shared_y_axes = <matplotlib.cbook.Grouper
sketch_params = None
snap = None
subplotspec = <matplotlib.gridspec.SubplotSpec
title = Pyplot
transform = IdentityTransform()
transformed_clip_path_and_affine = (None, None)
url = None
visible = True
window_extent = Bbox(x0=50.5, y0=32.5, x1=392.3, y1=256.94)
xaxis = XAxis(54.000000,36.000000)
xaxis_transform = BlendedGenericTransform(CompositeGenericTransform(...))
xbound = (-0.30000000000000004, 6.2999999999999998)
xgridlines = <a list of 9 Line2D xgridline objects>
xlabel = Time(s)
xlim = (-0.30000000000000004, 6.2999999999999998)
xmajorticklabels = <a list of 9 Text xticklabel objects>
xminorticklabels = <a list of 0 Text xticklabel objects>
xscale = linear
xticklabels = <a list of 9 Text xticklabel objects>
xticklines = <a list of 18 Text xtickline objects>
xticks = [-1.  0.  1.  2.  3.  4.]...
yaxis = YAxis(54.000000,36.000000)
yaxis_transform = BlendedGenericTransform(BboxTransformTo(Transforme...))
ybound = (-1.2, 1.2)
ygridlines = <a list of 7 Line2D ygridline objects>
ylabel = Volt
ylim = (-1.2, 1.2)
ymajorticklabels = <a list of 7 Text yticklabel objects>
yminorticklabels = <a list of 0 Text yticklabel objects>
yscale = linear
yticklabels = <a list of 7 Text yticklabel objects>
yticklines = <a list of 14 Line2D ytickline objects>
yticks = [-1.5 -1.  -0.5  0.   0.5  1. ]...
zorder = 0
```




|参数|意义|
|--|--|
|xlabel, ylabel|X, Y轴的标题文字|
|title|标题|
|xlim, ylim|X, Y轴的范围|
|legend|显示图示|

显示legend：ax1.legend()  
自动调整横纵坐标：ax.autoscale_view()  

### axes对象可以包含的对象

|Axes方法|所创建的对象|添加进的列表|
|--|--|--|
|annotate|Annotate|texts|
|bars|Rectangle|patches|
|errorbar|Line2D,Rectangle|lines,patches|
|fill|Polygon|patches|
|hist|Rectangle|patches|
|imshow|AxesImage|images|
|legend|Legend|legends|
|plot|Line2D|lines|
|scatter|PolygonCollection|Collections|
|text|Text|texts|


## line
对象信息：
```py
<matplotlib.lines.Line2D at 0x263c9fc0a20>
```

获取方法类似

```py
l=plt.getp(a,'lines')#是一个list
l=plt.plot(...)#这个可以注意一下
l=plt.plot(x,y,label="$sin(x)$",color='red',linewidth=2)#可以直接在plot中配置参数
```

获取line属性的方法
```py
line=plt.plot(x,y)
plt.getp(line[0],'color')
plt.setp(line[0],'color','r')
plt.setp(line,'color','r')#setp可以对一组对象进行操作，getp只能操作一个
```

line有这些属性：  
```py
agg_filter = None
alpha = None
animated = False
antialiased or aa = True
axes = Axes(0.125,0.125;0.775x0.755)
children = []
clip_box = TransformedBbox(Bbox([[0.0, 0.0], [1.0, 1.0]]), Co...)
clip_on = True
clip_path = None
color or c = #1f77b4
contains = None
dash_capstyle = butt
dash_joinstyle = round
data = (array([ 0.        ,  0.66666667,  1.33333333,  2....]))
drawstyle = default
figure = Figure(432x288)
fillstyle = full
gid = None
label = $cos(x^2)$
linestyle or ls = -
linewidth or lw = 1.5
marker = +
markeredgecolor or mec = #1f77b4
markeredgewidth or mew = 1.0
markerfacecolor or mfc = #1f77b4
markerfacecoloralt or mfcalt = none
markersize or ms = 6.0
markevery = None
path = Path(array([[ 0., -0.],[ 0...]]))
path_effects = []
picker = None
pickradius = 5
rasterized = None
sketch_params = None
snap = None
solid_capstyle = projecting
solid_joinstyle = round
transform = CompositeGenericTransform(TransformWrapper(Blended...))
transformed_clip_path_and_affine = (None, None)
url = None
visible = True
xdata = [ 0.          0.66666667  1.33333333  2.          ]
xydata = [[ 0.         -0.        ]  [ 0.66666667 -0.618369.]]
ydata = [-0.         -0.6183698  -0.9719379  -0.90929743 -...]
zorder = 2
```




|属性|解释|
|--|--|
|label|给plot的曲线一个标签名字，可以使用LaTeX|
|color|给曲线指定颜色，可以是英文单词'red'等，也可以是16进制数'##ff0000',也可以用0~1tuple(1.0,0,0)|
|linewidth|曲线宽度，可以不是整数|


### linestyle


|character           |description|
|-------------------|-----------|
|``'-'``            | solid line style
|``'--'``           | dashed line style
|``'-.'``           | dash-dot line style
|``':'``            | dotted line style

### marker

|character           |description|
|-------------------|-----------|
|``'.'``            | point marker点
|``','``            | pixel marker一个像素点
|``'o'``            | circle marker实心圆
|``'v'``            | triangle_down marker
|``'^'``            | triangle_up marker
|``'<'``            | triangle_left marker
|``'>'``            | triangle_right marker
|``'1'``            | tri_down marker
|``'2'``            | tri_up marker
|``'3'``            | tri_left marker
|``'4'``            | tri_right marker
|``'s'``            | square marker方块
|``'p'``            | pentagon marker五边形
|``'*'``            | star marker五角星
|``'h'``            | hexagon1 marker六边形
|``'H'``            | hexagon2 marker横六边形
|``'+'``            | plus marker
|``'x'``            | x marker
|``'D'``            | diamond marker菱形
|``'d'``            | thin_diamond marker瘦菱形
|``'|'``            | vline marker竖线
|``'_'``            | hline marker横线





### color


|character|   color|
|--|--|
|'b'         |blue
|'g'         |green
|'r'         |red
|'c'         |cyan
|'m'         |magenta
|'y'         |yellow
|'k'         |black
|'w'         |white


### line的其他参数

```py
antialiased or aa: [True | False]
axes: an :class:`~matplotlib.axes.Axes` instance
clip_box: a :class:`matplotlib.transforms.Bbox` instance
clip_on: [True | False]
clip_path: [ (:class:`~matplotlib.path.Path`, :class:`~matplotlib.transforms.Transform`) | :class:`~matplotlib.patches.Patch` | None ]
contains: a callable function
dash_capstyle: ['butt' | 'round' | 'projecting']
dash_joinstyle: ['miter' | 'round' | 'bevel']
dashes: sequence of on/off ink in points
drawstyle: ['default' | 'steps' | 'steps-pre' | 'steps-mid' | 'steps-post']
figure: a :class:`matplotlib.figure.Figure` instance
fillstyle: ['full' | 'left' | 'right' | 'bottom' | 'top' | 'none']
gid: an id string
label: string or anything printable with '%s' conversion.
linestyle
markeredgecolor or mec: any matplotlib color
markeredgewidth or mew: float value in points
markerfacecolor or mfc: any matplotlib color
markerfacecoloralt or mfcalt: any matplotlib color
markersize or ms: float
markevery: [None | int | length-2 tuple of int | slice | list/array of int | float | length-2 tuple of float]
path_effects: unknown
picker: float distance in points or callable pick function ``fn(artist, event)``
pickradius: float distance in points
rasterized: [True | False | None]
sketch_params: unknown
snap: unknown
solid_capstyle: ['butt' | 'round' |  'projecting']
solid_joinstyle: ['miter' | 'round' | 'bevel']
transform: a :class:`matplotlib.transforms.Transform` instance
url: a url string
xdata: 1D array
ydata: 1D array
```

## patch

bar()和hist()都是创建Patch对象列表  
每个Patch列表中

```py
n,bins,rects=ax.hist(...)
```

- 这里的rects是<a list of 10 Patch objects>  
- rects[0]是<matplotlib.patches.Rectangle at 0x1b592e47be0>  
- ax.patches是一个list，list中的元素是<matplotlib.patches.Rectangle>

示例：

```py
import matplotlib.pyplot as plt
from scipy.stats import norm

f1 = plt.figure(1)
ax = plt.subplot(111)
n, bins, rects = ax.hist(norm.rvs(loc=0, scale=1, size=100))
rects
```

## Axis

```py
fig = plt.figure(1)
ax = fig.add_subplot(111)
line=ax.plot([1,2,3,4,5])
xaxis=ax.xaxis
plt.getp(xaxis)
```

可以获得它们的属性：

```py
agg_filter = None
alpha = None
animated = False
axes = Axes(0.125,0.11;0.775x0.77)
children = [<matplotlib.text.Text object at 0x0000020033F2F78...>]
clip_box = TransformedBbox(Bbox([[0.0, 0.0], [1.0, 1.0]]), Co...)
clip_on = True
clip_path = None
contains = None
data_interval = [ 0.  4.]
figure = Figure(640x480)
gid = None
gridlines = <a list of 11 Line2D gridline objects>
label = Text(0.5,0,'')
label_position = bottom
label_text =
major_formatter = <matplotlib.ticker.ScalarFormatter>
major_locator = <matplotlib.ticker.AutoLocator>
major_ticks = [<matplotlib.axis.XTick>]
majorticklabels = <a list of 11 Text major ticklabel objects>
majorticklines = <a list of 22 Line2D ticklines objects>
majorticklocs = [-0.5  0.   0.5  1.   1.5  2. ]...
minor_formatter = <matplotlib.ticker.NullFormatter>
minor_locator = <matplotlib.ticker.NullLocator>
minor_ticks = []
minorticklabels = <a list of 0 Text minor ticklabel objects>
minorticklines = <a list of 0 Line2D ticklines objects>
minorticklocs = []
minpos = 1.0
offset_text = Text(1,0,'')
path_effects = []
picker = None
pickradius = 15
rasterized = None
scale = linear
sketch_params = None
smart_bounds = False
snap = None
tick_padding = 3.5
tick_space = 11
ticklabels = <a list of 11 Text major ticklabel objects>
ticklines = <a list of 22 Line2D ticklines objects>
ticklocs = [-0.5  0.   0.5  1.   1.5  2. ]...
ticks_position = bottom
transform = IdentityTransform()
transformed_clip_path_and_affine = (None, None)
units = None
url = None
view_interval = [-0.2  4.2]
visible = True
zorder = 0
```

|属性|意义|
|--|--|
|ticklocs|刻度位置|
|ticklabels|刻度对应的文字|

## annotate

用来绘制带箭头的注释文字  

```py
annotate(s,xy,xytext,xycoords='data',textcoords='data',arrowprops=None)
```

- s:注释文本
- xy:箭头处的坐标
- xytext:注释文本的坐标
- xycoords&textcoords都是字符串
|属性值|解释|
|--|--|
|figure_points||
|figure_pixels||
|figure_fraction||
|axes_points||
|axes_pixels||
|axes_fraction||
|data||
|offset_points||
|polar||
