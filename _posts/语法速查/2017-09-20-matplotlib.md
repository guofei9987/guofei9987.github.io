---
layout: post
title: 【语法速查】【Python】matplotlib
categories: Geek
tags: 语法速查
keywords:
description:
---

## 示例

```py
import matplotlib.pyplot as plt
import numpy as np
x=np.linspace(0,6,1000)
y=np.sin(x)
z=np.cos(x**2)
plt.plot(x,y,label="$sin(x)$",color='red',linewidth=2)
#label 可以用LaTeX
plt.plot(x,z,'b--',label='$cos(x^2)$')

plt.xlabel('Time(s)')
plt.ylabel('Volt')
plt.title('Pyplot')
plt.ylim(-1.2,1.2)
plt.legend()

plt.show()
```

## matplotlib.rcParams
*<class 'matplotlib.RcParams'> ， 可以按照dict理解*  
存放了基本配置，这里拣选一部分进行说明：  

|变量|意义|
|--|--|
|savefig.dpi|点击工具栏里save进行保存时的dpi|
|savefig.directory|点击工具栏里save进行保存时的默认目录|


## 各个对象

plt.figure()

先生成一个figure，在figure上生成一个Axes，在Axes上面plot

```py
f=plt.gcf()#get current figure
a=plt.gca()#get current axes
```

### figure

```py
f=plt.gcf()
plt.getp(f)
```

```py
agg_filter = None
alpha = None
animated = False
axes = [<matplotlib.axes._subplots.AxesSubplot
children = [<matplotlib.patches.Rectangle
clip_box = None
clip_on = True
clip_path = None
contains = None
default_bbox_extra_artists = [<matplotlib.axes._subplots.AxesSubplot
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
window_extent = TransformedBbox(Bbox([[0.0, 0.0], [6.0, 4.0]]), Af...
zorder = 0
```

## Axes对象的属性


|参数|意义|
|--|--|
|xlabel, ylabel|X, Y轴的标题文字|
|title|标题|
|xlim, ylim|X, Y轴的范围|
|legend|显示图示|

## line对象的属性

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
clip_box = TransformedBbox(Bbox([[0.0, 0.0], [1.0, 1.0]]), Co...
clip_on = True
clip_path = None
color or c = #1f77b4
contains = None
dash_capstyle = butt
dash_joinstyle = round
data = (array([ 0.        ,  0.66666667,  1.33333333,  2....
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
path = Path(array([[ 0.        , -0.        ],        [ 0...
path_effects = []
picker = None
pickradius = 5
rasterized = None
sketch_params = None
snap = None
solid_capstyle = projecting
solid_joinstyle = round
transform = CompositeGenericTransform(TransformWrapper(Blended...
transformed_clip_path_and_affine = (None, None)
url = None
visible = True
xdata = [ 0.          0.66666667  1.33333333  2.          ...
xydata = [[ 0.         -0.        ]  [ 0.66666667 -0.618369...
ydata = [-0.         -0.6183698  -0.9719379  -0.90929743 -...
zorder = 2
```



## plot

示例：  
```py
plt.plot(x,y,label="$sin(x)$",color='red',linewidth=2)
```

plot的参数一览：  

|||
|--|--|
|label|给plot的曲线一个标签名字，可以使用LaTeX|
|color|给曲线指定颜色，可以是英文单词'red'等，也可以是16进制数'##ff0000',也可以用0~1tuple(1.0,0,0)|
|linewidth|曲线宽度，可以不是整数|


### line style or marker


|character           |description|
|-------------------|-----------|
|``'-'``            | solid line style
|``'--'``           | dashed line style
|``'-.'``           | dash-dot line style
|``':'``            | dotted line style
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


*上面的点和线可以搭配使用，例如'.-'，例如'+--'*


### color

==========  ========
character   color
==========  ========
'b'         blue
'g'         green
'r'         red
'c'         cyan
'm'         magenta
'y'         yellow
'k'         black
'w'         white
==========  ========

## plot的其它参数
agg_filter: unknown
alpha: float (0.0 transparent through 1.0 opaque)
animated: [True | False]
antialiased or aa: [True | False]
axes: an :class:`~matplotlib.axes.Axes` instance
clip_box: a :class:`matplotlib.transforms.Bbox` instance
clip_on: [True | False]
clip_path: [ (:class:`~matplotlib.path.Path`, :class:`~matplotlib.transforms.Transform`) | :class:`~matplotlib.patches.Patch` | None ]
color or c: any matplotlib color
contains: a callable function
dash_capstyle: ['butt' | 'round' | 'projecting']
dash_joinstyle: ['miter' | 'round' | 'bevel']
dashes: sequence of on/off ink in points
drawstyle: ['default' | 'steps' | 'steps-pre' | 'steps-mid' | 'steps-post']
figure: a :class:`matplotlib.figure.Figure` instance
fillstyle: ['full' | 'left' | 'right' | 'bottom' | 'top' | 'none']
gid: an id string
label: string or anything printable with '%s' conversion.
linestyle or ls: ['solid' | 'dashed', 'dashdot', 'dotted' | (offset, on-off-dash-seq) | ``'-'`` | ``'--'`` | ``'-.'`` | ``':'`` | ``'None'`` | ``' '`` | ``''``]
linewidth or lw: float value in points
marker: :mod:`A valid marker style <matplotlib.markers>`
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
visible: [True | False]
xdata: 1D array
ydata: 1D array
zorder: any number

kwargs *scalex* and *scaley*, if defined, are passed on to
:meth:`~matplotlib.axes.Axes.autoscale_view` to determine
whether the *x* and *y* axes are autoscaled; the default is
*True*.

















































































## 保存

```py
plt.savefig('test.png',dpi=120)
```
