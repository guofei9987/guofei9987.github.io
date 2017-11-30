---
layout: post
title: 【Python】【matplotlib】键鼠响应事件
categories: 
tags: 7可视化
keywords:
description:
---

## 事件绑定fig.canvas.mpl_connect()

```py
import matplotlib.pyplot as plt


def on_key_press(event):
    print(event.key)


fig, ax = plt.subplots()
fig.canvas.mpl_connect('key_press_event', on_key_press)
plt.show()
```
这段程序的功能是响应键盘按键，print按键的值  


mpl_connect的参数：  

|参数|意义|
|--|--|
|'button_press_event'|按下鼠标|
|'button_release_event'|释放鼠标|
|'draw_event'|界面重新绘制|
|'key_press_event'|按下键盘|
|'key_release_event'|释放键盘|
|'motion_notify_event'|鼠标移动|
|'pick_event'|鼠标点选绘图对象|
|'resize_event'||
|'scroll_event'|鼠标滚轴事件|
|'figure_enter_event'|鼠标进入figure|
|'figure_leave_event'|鼠标离开figure|
|'axes_enter_event'|鼠标进入Axes|
|'axes_leave_event'|鼠标离开Axes|
|'close_event'|关闭图表|


### 查询已经注册的响应函数
```py
fig.canvas.callbacks.callbacks
```

### 程序示例：键盘控制颜色

```py
import matplotlib.pyplot as plt
import numpy as np


def on_key_press(event):
    if event.key in 'rgbcmyk':
        line.set_color(event.key)
    fig.canvas.draw_idle()#重新绘制整个图表，



fig, ax = plt.subplots()
x = np.linspace(0, 10, 1000)
y = np.sin(x)
line = ax.plot(x, y)[0]

fig.canvas.mpl_disconnect(fig.canvas.manager.key_press_handler_id)#取消默认快捷键的注册
fig.canvas.mpl_connect('key_press_event', on_key_press)
plt.show()

```

这里有两个点：
1. fig.canvas.draw_idle()重新绘制整个图表
2. fig.canvas.mpl_disconnect()取消已经注册的响应函数。这里是为了取消默认快捷键

### 程序示例

```py
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
text = ax.text(0.5, 0.5, 'event', ha='center', va='center', fontdict={'size': 20})


def call_back(event):
    info = 'name:{}\n button:{}\n x,y:{},{}\n xdata,ydata:{}{}'.format(event.name, event.button,event.x, event.y,event.xdata, event.ydata)
    text.set_text(info)
    fig.canvas.draw_idle()


fig.canvas.mpl_connect('button_press_event', call_back)
fig.canvas.mpl_connect('button_release_event', call_back)
fig.canvas.mpl_connect('motion_notify_event', call_back)

plt.show()
```
功能不多解释，仔细读读代码  
