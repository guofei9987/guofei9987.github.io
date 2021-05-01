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

(Django 遵循 MTV 模式)

### 创建项目

```bash
django-admin create project sitename
```

会生成几个文件模版：
- `manage.py` 是启动入口文件
- `settings.py` 配置文件
- `url.py` 存放 url和函数的对应关系（url路由）
- `wsgi.py` 服务端模块



### 创建 app

一个网站可以有多个app，创建一个app ：
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

## url路由系统

在 `views.py` 里面增加一个 view 类函数。

```py
# views.py
def index(request):
    return HttpResponse('This is a page of index')
```

在 `urls.py` 中添加进去(这个文件有详细说明)

```py
# urls.py
urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.index)
]
```

### url支持正则

例如，我想批量化的支持类似 `/page/1`,`page/156` 这样的网页，可以这样：


```py
# urls.py
urlpatterns = [
    path('page/<int:page_id>/', views.page)
]

# views.py
def page(request, page_id):
    return HttpResponse('page_id 就是接受的正则中的数字 page_id = {}'.format(page_id))
```

另外，正则可以多个，例如 `page/2021/04/17`

### url分发

想让不同的app，各种处理自己的 url

```py
# urls.py
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myapp/', include('myapp.url')), # 只需要映射到 app，具体的 url 在 myapp.urls.py 中处理
    path('myapp/', include('myapp2.url')),
]



# 然后创建 myapp/urls.py，填入具体的网址
# myapp/urls.py
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('page/<int:page_id>/', views.page)
]


# views.py （保持不变）
def page(request, page_id):
    return HttpResponse('page_id = {}'.format(page_id))


# 访问 http://localhost:9000/myapp/page/18/ 看效果
```

## Model

```py
# models.py
class UserInfo(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    gender = models.BooleanField(default=False)
    age = models.IntegerField(default=18)
    memo = models.TextField(default='')
# 之后会自动生成对应的表，表名是 myapp_userinfo


# settins.py 需要相应的修改
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

INSTALLED_APPS = [
'...',
'myapp' # 把你的 app 名添加进去
]
```

然后命令行执行这个，效果是根据代码，在数据库中生成表：
```bash
python manage.py makemigrations
python manage.py migrate
```


备注：
- 如果你之后改了 models.py ，也就是修改了表，那么重新执行上面的命令，就可以重新生成表。（会抹除原表的数据！）
- Pycharm 如何预览 sqlite 数据库？ View -> Tool Window -> Database 打开数据库视图，在视图中创建数据库链接


### 字段类型的定义

- 一些字段类型(仅列出常用的)：
    - `models.CharField`
    - `models.TextField`
    - `models.BooleanField`
    - `models.DateField`
    - `models.DateTimeField`
    - `models.IntegerField`
    - `models.BigIntegerField`
    - `models.FloatField`

- 更多设置
    - `null=True` 是否可以为空
    - `primary_key=False` 是否是主键

```py
class UserInfo(models.Model):
    # 1、字段类型（仅列出常用的）
    username = models.CharField(max_length=50)
    memo = models.TextField(default='')
    gender = models.BooleanField(default=False)

    create_date = models.DateField(default='2021-06-16')
    create_time = models.DateTimeField(default='2021-06-16')

    age = models.IntegerField(default=18)
    num_papers = models.BigIntegerField(default=100)
    influence = models.FloatField(default=0.1)

    # 2、设置属性
    notes = models.TextField(
        null=True  # 可以为空
        , primary_key=False  # 不是主键
        , max_length=50
        , default=''
        , db_column='col_name'  # 自定义数据库中的字段名，而不是自动生成
        , unique=True  # 不允许重复
        , editable=True  # 允许被编辑
        , error_messages={'invalid': '格式错误！'}  # 错误时返回的信息
        , validators=[]  # 可填入正则，用于验证数据是否符合格式
    )

    # 存入1、2、3，代表普通用户、管理员、游客
    user_type = models.CharField(max_length=2
                                 , choices=(('1', '普通用户')
                                            , ('2', '管理员')
                                            , ('3', '游客'))
                                 , default='1'
                                 )

    # 自动把写入当前时间
    update_time = models.DateTimeField(
        auto_now=True # 每次增、改，都会写入当前时间，用于 update_time
        # auto_now_add=True # 每次增加会写入当前时间，用于 create_time
    )
```

### 外键

```py
class UserType(models.Model):
    type_name = models.CharField(max_length=50)


class UserInfo(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    gender = models.BooleanField(default=False)
    age = models.IntegerField(default=18)
    memo = models.TextField(default='')
    type_id = models.ForeignKey(UserType, on_delete=models.SET_DEFAULT, default='')
    # on_delete = models.SET_DEFAULT, models.SET_NULL, models.CASCADE, models.RESTRICT
```

如此，myapp_userinfo.type_id 就映射到 myapp_usertype.id 了


另外，除了 `models.ForeignKey` 之外，还有一些：
- models.ManyToManyField
- models.OneToOneField

### 增删改查数据库

```py
# models.py 用来存放数据库表
# models.py
class PV(models.Model):
    page = models.CharField(max_length=10)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)


# views.py 用来存放页面
# views.py

from . import models

# 增
def add_one(requst, page_id):
    models.PV.objects.create(page=page_id)  # 增加一条记录
    # 上面的 page 对应models.py 中的字段名

    # 另一种方式
    # obj = models.PV(page=page_id)
    # obj.save()
    return HttpResponse('page_id = {}'.format(page_id))

# get 只能获取一条记录，filter 获取多条记录
# 删
def del_one(requst, page_id):
    models.PV.objects.get(id=page_id).delete()  # 删除一条记录
    # 也可以 filter 后接 delete
    return HttpResponse('page_id = {}'.format(page_id))


# 改
def update_one(requst, page_id):
    obj = models.PV.objects.get(id=page_id)
    obj.page = '9999'
    obj.save()
    return HttpResponse('update id = {}'.format(page_id))


def update_many(requst, page_id):
    # 批量把 id>page_id 的找出来，然后让他们的 page字段变成 '8888'
    models.PV.objects.filter(id__gt=page_id).update(page='8888')
    # id__gt 指的是大于号。类似的"函数"有： id__contain
    return HttpResponse('update id = {}'.format(page_id))

# 查
def select_many(request, page_id):
    select_res = models.PV.objects.filter(id__gt=page_id)
    print(type(select_res))

    # 可以用for循环
    for item in select_res:
        print(item.page)

    # 甚至可以用切片
    print(select_res[0:5])  #

    # 显示全部数据：
    all_data = models.PV.objects.all()
    print(all_data)

    print(all_data.query)  # 打印其sql语句
    print(select_res.query)  # 打印其sql语句

    print(select_res.values('id', 'page'))  # 返回类似 [{'id': 5, 'page': '1'}, {'id': 6, 'page': '2'}]

    return HttpResponse('')
```

别忘了改 `urls.py` 使其生效
```py
# urls.py
urlpatterns = [
    path('admin/', admin.site.urls),
    path('add_one/<int:page_id>/', views.add_one),
    path('del_one/<int:page_id>/', views.del_one),
    path('select_one/<int:page_id>/', views.select_one),
    path('update_one/<int:page_id>/', views.update_one),
    path('update_many/<int:page_id>/', views.update_many),
    path('select_many/<int:page_id>/', views.select_many),
]
```


## 参考资料
