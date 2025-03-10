---
layout: post
title: 【matplotlib】面向对象绘图
categories:
tags: 0x70_可视化
keywords:
description:
order: 710
---




## 示例

取fig和ax的方法
```py
import matplotlib.pyplot as plt

# 方法1
fig = plt.figure(2)
axes = fig.subplots(nrows=2, ncols=1, sharex=True, sharey=False)
# 只有一个 axes 时，axes2 是一个 axes 对象，超过一个是 m*n 的 array


# 方法2
fig,ax=plt.subplots(3,2)

# 方法3
fig=plt.figure(3)
ax=fig.add_subplot(111)
```

### 对象之间的关系
```py
fig1=plt.figure(1)  
# 先生成一个figure，在figure上生成一个Axes，在Axes上面生成line（plot）,或者生成patch(bar&hist)  

fig1=plt.gcf() # get current figure
axes1=plt.gca() # get current axes

fig1.axes[0].lines[0]


# get & set
axes1=plt.getp(fig1,'axes')[0]
lines1=plt.getp(axes1,'lines')[0]

plt.setp(fig.axes[0].lines[0],'color','g')
```
取所有属性:
```py
plt.getp(plt.gcf())
```

### 示例2：方块
```py
import matplotlib.pyplot as plt
fig,ax=plt.subplots(1,1,sharex=True)
# fig,ax=plt.subplots(3,2)，ax是一个3*2的list，存放各个子图的axes对象


rect=plt.Rectangle((0.2,0.75),0.4,0.15,color='k',alpha=0.3)
circ=plt.Circle((0.7,0.2),0.15,color='b',alpha=0.3)
pgon=plt.Polygon([[0.15,0.15],[0.35,0.4],[0.2,0.6]],color='g',alpha=0.5)

ax.add_patch(rect)
ax.add_patch(circ)
ax.add_patch(pgon)
plt.show()
```


## 共有属性
这些对象共有的一些属性：  

|关键字|取值|解释|
|--|--|--|
|alpha||透明度，0~1|
|animated|布尔值|用于绘制动画效果|
|axes||所在的axes|
|clip_box||对象的裁剪框|
|clip_on||是否裁剪|
|clip_path||裁剪的路径|
|contains||判断指定点是否在对象上的函数|
|figure||**对象所在的figure**|
|label||文本标签|
|picker||用来控制对象的选取|
|transform||控制偏移、旋转、缩放等|
|visible||**是否可见**|
|zorder||控制绘图顺序,any number|

## figure

figure的类型是：
```py
<class 'matplotlib.figure.Figure'>
```

figure下的属性（用plt.getp(f)获取）

```py
plt.getp(fig)

agg_filter = None
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
window_extent = TransformedBbox(Bbox([[0.0, 0.0], [6.0, 4.0]]))
zorder = 0
```

一些解释：  

|属性|意义|
|--|--|
|axes|Axes对象列表，如[<matplotlib.axes._subplots.AxesSubplot>]|
|patch|作为背景的Rectangle对象|
|images|FigureImage对象列表，用于显示图像|
|lines|Line2D对象列表|
|patches|Patch对象列表|
|text|Text对象列表，用于显示文字|

## Axes

对象信息：
```py
<matplotlib.axes._subplots.AxesSubplot>
```

可以有两种方法获取

```py
a1=plt.getp(f,'axes') # 生成的是一个list
a2=plt.gca() #当前激活的axes
```

Axes 有很多有用的属性
- 坐标轴
```py
# xlim/ylim 坐标轴范围
ax.get_xlim() # 返回 (left,right)
ax.set_xlim(left, right)
ax.get_ylim()
ax.set_ylim(left, right)
# xlable/ylabel 坐标轴名称
ax.set_xlabel('xlabel')
ax.get_xlabel()
ax.set_ylabel('ylabel')
ax.get_ylabel()
# xticks/yticks 在轴上显示哪些刻度
ax.set_xticks([3,6,7]) # 显示这些刻度
ax.set_xticklabels(['a','b','c'], rotation=30) # 配合上面的 set_xticks 使用，给显示的刻度改个名
ax.set_yticks([10,15,40]) # yticks 一样
```
- title
```py
ax.set_title('title',loc='center') # return 一个<Text>
# loc='left','right','center'，不同的 loc 对应不同的对象，各自独立
ax.get_title(loc='center')
fig.suptitle('title') # 整个图片的title
```
- visible
```py
plt.get(ax,'visible')
```
- legend
```py
# 第一种写法：
ax.plot([1,2],[2,1],label='a')
ax.legend() # 或者 plt.legend()
# loc = 'best', 'right', 'center left', 'upper right', 'lower right', 'center', 'lower left', 'center right', 'upper left', 'upper center', 'lower center
```
- 网格线
```py
ax.grid()
# b=None, which='major', axis='both', **kwargs
# which:'major', 'minor', or 'both'
# axis:'both', 'x', or 'y'
# **kwargs: 自定义线的样式，例如 color='r', linestyle='-', linewidth=2
```
- 双坐标轴
```py
line1 = ax.plot(np.arange(10), label='line1')
ax_twinx = ax.twinx()
line2 = ax_twinx.plot(10-np.arange(10), label='line2')
# 附加：因为是两个 ax，所以 legend 是独立的
# 如果想让两个坐标轴的 legend 合并：
lines = line1+line2
labs = [l.get_label() for l in lines]
ax.legend(lines, labs, loc='upper right')
```
- 其它
```py
ax.autoscale_view() # 自动调整横纵坐标
ax.set_axis_off() #不显示坐标轴
```
- 画图
```py
lines1=ax.plot(range(10),range(10),'.')
```


其它实现方法
```py



plt.getp(ax,'xlim') # 'ylim'
plt.getp(ax,'xlim',(-1,2)) # 'ylim'

plt.setp(ax,'xlabel','$y=x^2$')
plt.getp(ax,'xlabel') # 返回字符串


plt.setp(ax,'title','$y=x^2$')
plt.getp(ax,'title') # 返回字符串


# legend第二种写法：
ax.plot([1,2],[2,1])
plt.legend(['c']) # 入参用list，用以同时给多条线设定 legend

# lines
plt.getp(ax,'lines')  # <a list of 34 Line2D objects> , 可以用类似 a[0]的方式取
```


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


### 其它
```py
ax.axes is ax # True
```

```py
# 用plt.getp(ax)获取
adjustable = box
agg_filter = None
anchor = C
animated = False
aspect = auto
autoscale_on = False
autoscalex_on = True
autoscaley_on = False
axes_locator = None
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
frame_on = True
geometry = (1, 1, 1)
gid = None
images = <a list of 0 AxesImage objects>
label =
legend = None
legend_handles_labels = ([], [])
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
window_extent = Bbox(x0=50.5, y0=32.5, x1=392.3, y1=256.94)
xaxis = XAxis(54.000000,36.000000)
xaxis_transform = BlendedGenericTransform(CompositeGenericTransform(...))
xbound = (-0.30000000000000004, 6.2999999999999998)
xgridlines = <a list of 9 Line2D xgridline objects>
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
ymajorticklabels = <a list of 7 Text yticklabel objects>
yminorticklabels = <a list of 0 Text yticklabel objects>
yscale = linear
yticklabels = <a list of 7 Text yticklabel objects>
yticklines = <a list of 14 Line2D ytickline objects>
yticks = [-1.5 -1.  -0.5  0.   0.5  1. ]...
```





## line
对象信息：
```py
<matplotlib.lines.Line2D>
```

获取方法类似

```py
l=plt.getp(a,'lines') # 是一个list
l=ax.plot(x,y,label="$sin(x)$",color='red',linewidth=2,marker='.',linestyle='-')
l=plt.plot(x,y,label="$sin(x)$",color='red',linewidth=2) # 可以直接在plot中配置参数
# color: ‘b’	blue, ‘g’	green, ‘r’	red, ‘c’	cyan, ‘m’	magenta, ‘y’	yellow, ‘k’	black, ‘w’	white
```

获取line属性的方法
```py
line=plt.plot(x,y)

plt.setp(line[0],'color','r') # plt.getp(line[0],'color')
plt.setp(line,'color','r') # setp可以对一组对象进行操作，getp只能操作一个
```

常用属性
```py
plt.setp(line,'xdata',[1,2,3],'ydata',[4,5,6])
plt.setp(line,'xydata',[[1,2,3],[4,5,6]])

```


```py
line.axes

```


line有这些属性：  
```py
agg_filter = None
alpha = None
animated = False
antialiased or aa = True
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
zorder = 2
```




|属性|解释|
|--|--|
|label|给plot的曲线一个标签名字，可以使用LaTeX|
|color|给曲线指定颜色，可以是英文单词'red'等，也可以是16进制数'#ff0000',也可以用0~1tuple(1.0,0,0)|
|linewidth|曲线宽度，float|
|markeredgecolor or mec| any matplotlib color|
|markeredgewidth or mew| float value in points|
|markerfacecolor or mfc| any matplotlib color|
|markerfacecoloralt or mfcalt| any matplotlib color|
|markersize or ms| float|
|xdata | 1D array
|ydata | 1D array

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
- xycoords&textcoords都是字符串, 解释在下表


|属性值|解释|
|--|--|
|figure points|以点为单位的坐标，图表左下角的坐标(0,0)|
|figure pixels|以像素为单位的坐标，图表左下角为(0,0)|
|figure fraction|图表坐标系中的坐标，左下角是(0,0)，右上角是(1,1)|
|axes points|以点为单位的坐标，子图左下角的坐标(0,0)|
|axes pixels|以像素为单位的坐标，子图左下角的坐标(0,0)|
|axes fraction|子图坐标系中的坐标,左下角是(0,0),右上角是(1,1)|
|data|数据坐标系中的坐标|
|offset points|以点为单位，相对于点xy的坐标|
|polar|数据坐标系中的极坐标|

## text

用来绘制文字

```py
ax.text(x,y,string,fontname='STKaiti',fontsize=20,color='r',transform=ax.transData) # 数据坐标
ax.text(x,y,string,fontname='STKaiti',fontsize=20,color='r',transform=ax.transAxes) # Axes内坐标，左下是(0,0)，右上是(1,1)
fig.text(x,y,string,fontname='STKaiti',fontsize=20,color='r',transform=ax.transData) # 数据坐标
fig.text(x,y,string,fontname='STKaiti',fontsize=20,color='r',transform=ax.transAxes) # Figure内坐标，左下是(0,0)，右上是(1,1)
```

- fontname：字体，参见[这里](https://www.guofei.site/2017/09/20/matplotlib.html#字体支持)
