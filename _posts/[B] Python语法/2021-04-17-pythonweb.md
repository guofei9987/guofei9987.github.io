---
layout: post
title: 【python】web
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

## MTV


MVC
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
django-admin startproject my_sitename

# 或者： django-admin create project my_sitename
```

会生成几个文件模版：
- `manage.py` 是启动入口文件
- `settings.py` 配置文件
- `url.py` 存放 url和函数的对应关系（url路由）
- `wsgi.py` 服务端模块



### 创建 app

一个网站可以有多个app，创建一个app ：
```bash
python manage.py startapp my_app
```
- `models.py`
- `views.py`
- template：可以放project目录下，也可以放到 app 所在目录下

### 运行起来

```bash
python manage.py runserver 0.0.0.0:9000
```

### settings

`settings.py` 用来存放基础信息，一些重要的配置：
```py
BASE_DIR  # 基本目录，其它目录都是这个拼接出来的

INSTALLED_APPS  # 把自己的应用放进去

ROOT_URLCONF = 'my_sitename.urls'  # 你的根路由

TEMPLATES  # 用来配置模版

DATABASES  # 数据库配置

LANGUAGE_CODE = 'en-us'  # 语言，！改为 ‘zh-hans’
TIME_ZONE = 'UTC'  # 时区，！改为'Asia/Shanghai'
USE_TZ = False  # 是否使用国际时间，改为 False，否则数据库时间会不对
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

另外，正则可以更复杂，例如 `page/2021/04/17`

### url分发

想让不同的app，各种处理自己的 url

```py
# urls.py，根路由
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

用来做数据库相关

```py
# models.py
class UserInfo(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
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

# get 只能获取一条记录，filter 获取多条记录，all 获取全部记录
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




### 外键

```py
# models.py
class UserType(models.Model):
    type_name = models.CharField(max_length=50)


class UserInfo(models.Model):
    username = models.CharField(max_length=50)
    user_type = models.ForeignKey(UserType, on_delete=models.SET_DEFAULT, default='')
    # on_delete = models.SET_DEFAULT, models.SET_NULL, models.CASCADE, models.RESTRICT
```

如此，myapp_userinfo.type_id 就映射到 myapp_usertype.id 了

userinfo:

|id|username|user_type
|--|--|--|
|1|Tom|1|
|2|Jack|2|
|3|Lily|1|

user_type:

|id|type_name|
|--|--|
|1|用户|
|2|管理员|



**连表查询**  本质上是 join 操作


```py
select_res = models.UserInfo.objects.filter(user_type__name='用户')
select_res = models.UserInfo.objects.filter(user_type__id__gt=1)
```

什么规律？ 相当于 UserInfo 这个表有一个字段 `user_type`，而这个字段实际上是个指针，指向 UserType 这个表。




### 多对多

另外，除了 `models.ForeignKey` 之外，还有一些：
- `models.ForeignKey` 看上面的例子，一个 user 对应一种身份
- `models.ManyToManyField` 下面的例子，一个 user 对应多种身份
- models.OneToOneField

ManyTOMany
```py
class UserInfo(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(null=True)


class UserGroup(models.Model):
    group_name = models.CharField(max_length=50)
    user = models.ManyToManyField('UserInfo')
```

生成三张表
- userinfo
- usergroup
- usergroupuser

userinfo:

|id|username|email|
|--|--|--|
1|guofei1|1@guofei.site
2|guofei2|2@guofei.site
3|guofei3|3@guofei.site

usergroup:

|id|group_name|
|--|--|
1|报警组
2|监控组
3|DBA


myapp_usergroup_user 用于存放它们之间的多对对关系：

|id|usergroup_id|userinfo_id|
|--|--|--|
1|3|2
2|3|3


怎么操作？

新增连接
```py
u1 = models.UserInfo.objects.get(id=1)
g1 = models.UserGroup.objects.get(id=1)
u1.user.add(g1)
# 另一种写法： u1.usergroup_set.add(g1)

```

`myapp_usergroup_user` 会新增一条记录
|id|usergroup_id|userinfo_id|
|--|--|--|
1|3|2|
2|3|3|
3|1|1|


其它操作：

```py
# 添加数据
#group_obj.user_info.add(user_info_obj)
#group_obj.user_info.add(*user_info_objs)

# 删除数据
#group_obj.user_info.remove(user_info_obj)
#group_obj.user_info.remove(*user_info_objs)

# 添加数据
#user_info_obj.usergroup_set.add(group_obj)
#user_info_obj.usergroup_set.add(*group_objs)

# 删除数据
#user_info_obj.usergroup_set.remove(group_obj)
#user_info_obj.usergroup_set.remove(*group_objs)

# 获取数据
#print group_obj.user_info.all()
#print group_obj.user_info.all().filter(id=1)

# 获取数据
#print user_info_obj.usergroup_set.all()
#print user_info_obj.usergroup_set.all().filter(caption='CEO')
#print user_info_obj.usergroup_set.all().filter(caption='DBA')
```

参考资料：https://www.cnblogs.com/wupeiqi/articles/4508271.html

## template

需求：把数据库中的数据好看的展示到前端。

方案1:
1. `show_str = read('template.html')`
2. 在 `show_str` 中替换
3. 返回 `show_str`

但这毕竟太麻烦，还有方案2，使用 **模版语言**：


模版html
```html
<!--1、展示直接使用-->
<dib>【【user】】</div>


<!--2、展示for循环引用-->
【% for item in data%】
<table>
    <tr>
        <td>【【item.page】】</td>
        <td>【【item.create_time】】</td>
        <td>【【item.update_time】】</td>
    </tr>
    【%endfor%】
</table>

<!--展示if语句-->
<!--【%if user==='Guofei'%】-->
<!--作者：郭飞-->
<!--【%else%】-->
<!--作则：未知-->
<!--【%endif%】-->

</body>
</html>
```

views.py
```py
def get_and_show(request, page_id):
    all_data = models.PV.objects.all()
    return render(request,
                  'show.html',
                  {'user': 'Guofei',
                   'data': all_data,
                   })
```

### 母版

目的：不同页面的html中，往往有共用的部分。把共用的部分放到母版里面

母版
```html
<!-- base.html -->
<div>公用的头部</div>
<div>
    【%block content%】【%endblock%】
</div>
<div>公用的底部</div>
</body>
</html>
```

子版
```html
<!-- child.html -->
【%extends "base.html"%】
【%1block content%】
【【user】】
【%1endblock%】
```

view引用的是子版
```py
# views.py
def child(request, page_id):
    return render(request, 'child.html', {'user': 'Guofei'})
```


## 表单

一个简单的表单使用：

```html
<!-- login.html -->
<form action="/myapp/login/" method="POST">
    用户名<input name="username">
    <br>
    密码<input name="password">
    <input type="submit" value="提交">
</form>
```

为了用较短的代码说明问题，返回一个结果html。实际网站应当读取数据库做比较之类的。
```html
<!-- login2.html -->
登陆成功：
username【【username】】
password【【password】】
```

```py
# views.py
def login(request):
    if request.method == 'POST':
        username = request.POST.get("username", None)
        password = request.POST.get("password", None)
        return render(request, 'login2.html', {"username": username, "password": password})
    elif request.method == 'GET':
        return render(request, 'login.html', )
    else:
        return render(request, 'login.html', )
```

### 类的方式做表单：更傻瓜

```html
<!-- register.html -->
<form action="/web/login/" method="POST">
    用户名：【【form.username】】
    <br>
    邮箱【【form.email】】
    <br>
<!--   或者更简单的方法 【【form.as_table】】-->
    <input type="submit" value="提交">
</form>

<!-- 用来展示出错信息，详细看下面 -->
【【error.as_ul】】
```



```py
# views.py

from django import forms


class RegisterForm(forms.Form):
    # 类里面定义“表单需要什么内容”
    username = forms.CharField()
    email = forms.EmailField(required=True)
    ip = forms.GenericIPAddressField()


def register(request):
    register_form = RegisterForm()
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():  # 验证数据格式，例如邮箱格式
            data = form.cleaned_data  # 返回一个字典
            print(data)
        else:
            error_msg = form.errors  # <ErrorDict>对象，打印出来是 html 格式，有多种解析格式：
            error1 = form.errors.as_json()  # <str>，形式是 json
            error2 = error_msg.as_data()  # <dict>
            error3 = error_msg.as_ul()  # <SafeString> ，形式是 html，这个 html 展示出来是个列表
            error4 = error_msg.as_text()  # <str>，形式是 markdown

            return render(request, 'register.html', {'form': register_form, 'error': error_msg})

    return render(request, 'register.html', {'form': register_form})
```

（url.py就不写了）


如何定制错误信息？
```python
class RegisterForm(forms.Form):
    ip = forms.GenericIPAddressField(error_messages={'required': '用户名不能为空', 'invalid': '格式错啦！'})
```


## Ajax

用异步请求的方式，来刷新部分内容


**step1**：需要 `jquery-3.6.0.min.js` 文件，可以放到 project 目录下的 `/static/js/jquery-3.6.0.min.js`，也可以放到 `/myapp/static/js/jquery-3.6.0.min.js`


**step2** templates
```html
<!-- ajax.html -->
<input id="name" type="text">
<input type="button" value="点击执行ajax请求" onclick="DoAjax()">

<script src="/static/js/jquery-3.6.0.min.js"></script>

<script type="text/javascript">
    function DoAjax() {
        var tmp = $('#name').val();
        $.ajax({
            url: '/myapp/ajax/', // 这次异步请求提交给哪个url
            type: 'POST',
            data: {dat: tmp}, //提交什么内容
            success: function (arg) {
                console.log('success')
                console.log(arg);
            },
            error: function (arg) {
                console.log('failed');
                console.log(arg)
            }
        });
    }
</script>
```

**step3** view.py

```py
def ajax(request):
    if request.method == 'POST':
        print(request.POST)
        return HttpResponse('ok') # 这个 ok 会传到 html 中作为 arg。
        # 如果想传入更多信息，可以用 json.dump 打包为 json 形式的字符串；对应的 html 端用 jQuery.parseJson(arg) 来解析。  
    else:
        return render(request, 'ajax.html')
```



## 参考资料
