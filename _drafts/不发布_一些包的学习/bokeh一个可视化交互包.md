bokeh:交互可视化。基于d3

- Charts:高层接口
- Plotting:中层接口
- Models:底层接口


现在没力气学了，自己去官网上看吧


## 有哪些图

p.scatter
https://bokeh.pydata.org/en/latest/docs/user_guide/quickstart.html

## 5个主要流程
```Python
from bokeh.io import output_file # 生成 html 文档
from bokeh.io import output_notebook # 在jupyter中使用


from bokeh.plotting import figure, show

# 1. 准备数据
x = [1, 2, 3, 4, 5]
y = [6, 7, 2, 4, 5]

# 2. 指定是输出到 html 还是 jupyter
output_file("lines.html")
# or output_notebook


# 3. 建立figure
p = figure(title="simple line example", x_axis_label='x', y_axis_label='y')

# 3. 画图
p.line(x, y, legend="Temp.", line_width=2)

# 5. show/save
show(p)
```


## 有哪些图

p.scatter
p.circle
p.square
