---
layout: post
title: 【Python】【matplotlib】动画
categories: Geek
tags: 可视化
keywords:
description:
---

## figure.canvas.draw()

```py
import matplotlib.pyplot as plt
import numpy as np


def update_data(line):
    x[:] += 0.1
    plt.setp(line, 'ydata', np.sin(x))
    fig.canvas.draw()


fig, ax = plt.subplots()
x = np.linspace(0, 10, 1000)
line, = ax.plot(x, np.sin(x), lw=2)

timer = fig.canvas.new_timer(interval=50)
timer.add_callback(update_data, line)
timer.start()
plt.show()
```

1. figure.canvas.draw()用来重新绘制整张图表，在[上一篇博客](http://www.guofei.site/2017/09/26/matplotlib3.html)中有大量应用
2. setp，设定曲线的数据
3. timer定时器，用法参见代码


## 使用缓存快速重绘

figure.canvas.draw()重绘整个图表，因此速度慢，占用资源多。  

下面这段代码，只更新动态对象，而静态对象保存起来
```py
import matplotlib.pyplot as plt
import numpy as np


fig, ax = plt.subplots()
x = np.linspace(0, 10, 1000)
ax.plot(x,np.cos(x))
line, = ax.plot(x, np.sin(x), lw=2,animated=True)#1. 要作为动画的元素，animated属性设为True

fig.canvas.draw()#2. 重绘图表，忽略animated=True的对象
background=fig.canvas.copy_from_bbox(ax.bbox)#3. 保存图像信息到background中

def update_data(line):
    x[:] += 0.1
    plt.setp(line, 'ydata', np.sin(x))
    fig.canvas.restore_region(background)#4. 恢复background中的信息（也就擦除了所有动态元素）
    ax.draw_artist(line)#5. 绘制更新后的动态对象
    fig.canvas.blit(ax.bbox)#6. 绘制更新后的内容


timer = fig.canvas.new_timer(interval=50)
timer.add_callback(update_data, line)

timer.start()
plt.show()
```

注意代码中注释的6个步骤:  
1. 要作为动画的元素，animated属性设为True
2. 重绘图表，忽略animated=True的对象
3. 保存图像信息到background中
4. 恢复background中的信息（也就擦除了所有动态元素）
5. 绘制更新后的动态对象
6. 绘制更新后的内容

## animation模块

animation模块对上述过程进行了封装，使得画动画变得方便一些。  

```py
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.animation import FuncAnimation

fig, ax = plt.subplots()
x = np.linspace(0, 10, 200)
y = np.sin(x)
line, = ax.plot(x, y, lw=2, animated=True)


def update_line(i):
    y = np.sin(x + i / 50)
    plt.setp(line, 'ydata', y)
    return [line]


ani = FuncAnimation(fig, update_line, blit=True, interval=25, frames=1000)
plt.show()
```
1. blit=True表示使用缓存快速重绘
2. frames参数设置最大帧数，update_line()的输入值i将在0到frames之间循环变化，frames也可以是一个list或array
3. interval时间间隔

## 动画保存

step1：下载[ffmpeg](https://ffmpeg.org/),[FFmpeg for Windows](https://ffmpeg.zeranoe.com/builds/)，并解压缩  
step2: 代码中添加一行:  
```py
plt.rcParams['animation.ffmpeg_path'] = r'C:\Users\guofei\Downloads\ffmpeg\bin\ffmpeg'
```  
step3: 保存  
```py
ani.save('test.mp4',fps=25)
```

效果:  
<video src="http://www.guofei.site/public/postimg2/matplotlib4_1.mp4" controls="controls">
</video>
