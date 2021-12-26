---
layout: post
title: 【pyecharts】漂亮的可视化
categories:
tags: 0x70_可视化
keywords:
description:
order: 764
---



## Bar3D

```python
from pyecharts.charts import Bar3D
from pyecharts import options as opts
import numpy as np

bar3d = Bar3D(init_opts=opts.InitOpts(
    width='1500px', height='1000px',
    page_title='页面标题',
))
hours = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a",
         "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"]
days = ["Saturday", "Friday", "Thursday", "Wednesday", "Tuesday", "Monday", "Sunday"]

data = [[i, j, np.random.randint(0, i + j + 1)] for i in range(24) for j in range(7)]
range_color = ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf',
               '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
# bar3d.add("", x_axis, y_axis, [[d[1], d[0], d[2]] for d in data], is_visualmap=True,
#           visual_range=[0, 20], visual_range_color=range_color, grid3d_width=200, grid3d_depth=80)
# bar3d

bar3d.add(series_name="", data=data, xaxis3d_opts=opts.Axis3DOpts(type_="category", data=hours),
          yaxis3d_opts=opts.Axis3DOpts(type_="category", data=days),
          zaxis3d_opts=opts.Axis3DOpts(type_="value"))
bar3d.set_global_opts(visualmap_opts=opts.VisualMapOpts(max_=20, range_color=range_color),
                      title_opts=opts.TitleOpts(title="图表标题"))
bar3d.render("filename.html")

```

## Boxplot
https://gallery.pyecharts.org/#/Boxplot/boxplot_base


## EffectScatter

https://gallery.pyecharts.org/#/EffectScatter/effectscatter_symbol

## Gauge

https://gallery.pyecharts.org/#/Gauge/gauge


## 关系图

https://echarts.apache.org/examples/zh/editor.html?c=graph-webkit-dep

```python
nodes = [
    {"name": "结点1", "symbolSize": 10, 'category': '第一类'},
    {"name": "结点2", "symbolSize": 20, 'category': '第二类'},
    {"name": "结点3", "symbolSize": 30, 'category': '第一类'},
    {"name": "结点4", "symbolSize": 40, 'category': '第一类'},
]

graph_category = [
    {"name": "第一类", "symbol": 'triangle'},
    {"name": "第二类", "symbol": 'diamond'},
]
# 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
# 'image://url' url 为图片的链接，或者 dataURI。


links = [{'source': '结点1', 'target': '结点2'},
         {'source': '结点2', 'target': '结点3'},
         {'source': '结点3', 'target': '结点1'},
         {'source': '结点2', 'target': '结点4'}]

from pyecharts import options as opts
from pyecharts.charts import Graph

graph = Graph(init_opts=opts.InitOpts(
    width='1500px', height='1000px',
    page_title='页面标题',
))
graph.add("", nodes, links, graph_category, repulsion=8000, is_draggable=True
          , edge_symbol=['circle', 'arrow']  # 箭头
          , edge_symbol_size=[4, 10]  # 箭头大小
          , label_opts=opts.LabelOpts(is_show=False)  # 不显示节点名
          )
graph.set_global_opts(title_opts=opts.TitleOpts(title="图表标题"))
graph.render("filename.html")
```
