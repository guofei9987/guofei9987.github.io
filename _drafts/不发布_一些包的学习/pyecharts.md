## 1. 借助flask

templates/pyecharts.html
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Proudly presented by ECharts</title>
    {% for jsfile_name in script_list %}
        <script src="{{ host }}/{{ jsfile_name }}.js"></script>
    {% endfor %}
</head>

<body>
  {{ myechart|safe }}
</body>

</html>
```

main_py_file
```py
from flask import Flask, render_template
from pyecharts import Scatter
import scipy.stats as stats

app = Flask(__name__)
REMOTE_HOST = "https://pyecharts.github.io/assets/js"


@app.route('/')
def hello():
    my_echarts = draw_my_echarts()
    return render_template('pyecharts.html', myechart=my_echarts.render_embed(), host=REMOTE_HOST,
                           script_list=my_echarts.get_js_dependencies())

def draw_my_echarts():
    data_x = stats.uniform(loc=1, scale=3).rvs(size=(20,))
    data_y = stats.uniform(loc=1, scale=3).rvs(size=(20,))
    scatter = Scatter('my title', width=1200, height=600)
    scatter.add('random data', data_x, data_y, is_visualmap=True)
    my_echarts = scatter
    return my_echarts


app.run(debug=True)
```

## 2. 直接保存到本地
```py
import pyecharts.echarts.events as events
from pyecharts import Bar
from pyecharts_javascripthon.dom import alert


def on_click():
    alert("点击事件触发")


def test_mouse_click():
    bar = Bar("我的第一个图表", "这里是副标题")
    bar.add(
        "服装", ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"], [5, 20, 36, 10, 75, 90]
    )  # 1. add
    bar.on(events.MOUSE_CLICK, on_click) # 2. on 事件
    bar.render()
```
