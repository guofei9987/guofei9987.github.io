---
layout: post
title: 【python】网络编程
categories:
tags: Python语法
keywords:
description:
order: 1261
---


## wsgiref

```python
from wsgiref.simple_server import make_server


def demo_app(environ, start_response):
    start_response("200 OK", [('Content-Type', 'text/html; charset=utf-8')])
    return ['<h1>Hello,web !</h1>'.encode("utf-8"), '<h2>h2</h2>'.encode('utf-8')]


server = make_server("127.0.0.1", 8000, demo_app)

# 只处理一次
# server.handle_request()
# 或者处理无穷次
server.serve_forever()
```


```python
environ['SERVER_PORT'] # 端口
environ['PATH_INFO'] # 用户输入的网址，例如 '/login'
environ['REMOTE_ADDR'] # 用户ip地址
```

## MVC

- C：controller
- V：View，例如html等
- M：Model，例如数据库

MTV：
- T指的是Template，放html模版
- View，放处理逻辑
- Model，放数据库配置


## Django

pycharm：`New Project` -> `Django` ，会生成几个文件模版：
- `manage.py` 是启动入口文件
- `settings.py` 配置文件
- `url.py` 存放 url和函数的对应关系（url路由）
- `wsgi.py` 服务端模块

### app
一个网站可以有多个app，创建一个app (MTV模式)：
```bash
python manage.py startapp myapp
```
- `models.py`
- `views.py`
- template：可以放project目录下，也可以放到 app 所在目录下

### 运行起来

```bash
python manage.py runserver 0.0.0.0:9000
```




## 参考资料
