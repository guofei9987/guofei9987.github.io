## 启动
windows下
```py
set FLASK_APP=hello.py # linux下 export FLASK_ENV=development
python -m flask run
```

公开访问
```
flask run --host=0.0.0.0 # 让服务器被公开访问
```

调试模式
```
export FLASK_ENV=development
还可以通过导出 FLASK_DEBUG=1 来单独控制调试模式的开关
```
调试模式有这些功能
1. 激活调试器。
2. 激活自动重载。
3. 打开 Flask 应用的调试模式。



```py
# from http://flask.pocoo.org/ tutorial
from flask import Flask
app = Flask(__name__)


@app.route("/")  # take note of this decorator syntax, it's a common pattern
def hello():
    return "Hello World!"


if __name__ == "__main__":
    app.run()
```

## route
```py
@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % subpath
```
string,int,float,path,uuid


## 1
```py
@app.route('/projects/')
def projects():
    return 'The project page'

@app.route('/about')
def about():
    return 'The about page'
```
route后面定义斜杠的，访问时加不加斜杠都可以访问  
route后面没有定义斜杠的，访问时加斜杠会404

## url_for()
用来构建url
```
with app.test_request_context():
    print(url_for('index'))
    print(url_for('login'))
    print(url_for('login', next='/'))
    print(url_for('profile', username='John Doe'))

/
/login
/login?next=/
/user/John%20Doe
```

## HTTP方法
缺省是get
```py
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()
```


## 静态文件
```
url_for('static', filename='style.css')
```
