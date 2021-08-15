---
layout: post
title: 【python】sqlAlchemy
categories:
tags: 1-1-算法平台
keywords:
description:
order: 180
---

## 方式1：query方式
```py
from sqlalchemy import create_engine
engine=create_engine("sqlite://", echo=False)
```

```py
# 建表
engine.execute("create table users(userid char(10), username char(50))")

# 插入单条
resultProxy = engine.execute("insert into users (userid,username) values('user1','tony')")

# 批量插入
data = [(str(i), 'user' + str(i)) for i in range(5)]
engine.execute("insert into users (userid,username) values(?,?)", data)


# 查
resultProxy = engine.execute("select * from users")
resultProxy.fetchall()  # fetch 类的语句，只有 select 才可以用，其它报错
resultProxy.fetchmany(size=1)


resultProxy.close()  # resultProxy 用完之后, 需要close


resultProxy.rowcount  # return rows affected by an UPDATE or DELETE statement
resultProxy.returns_rows  # True if this ResultProxy returns rows.
```


其它不常用
```python
resultProxy.fetchone()
resultProxy.first() # 返回第一行，然后关闭这次查询
resultProxy.scalar() # 返回第一行第一列，然后关闭这次查询
```


## 方式2：借助pandas

生成实验用的数据
```py
import numpy as np
import pandas as pd
df = pd.DataFrame(np.random.rand(10, 5), columns=list('abcde'))
```

### 连接数据库
```py
from sqlalchemy import create_engine
# engine = create_engine("mysql+pymysql://root:@127.0.0.1:3306/databasename?charset=utf8")
engine = create_engine('sqlite:///E:/test1.db',encoding='utf-8',echo=True)
```

### 读写
```py
# 写入数据库
df.to_sql("tablename",con = engine,index=False,if_exists='append',index_label=False)
# if_exists：如果存在，怎样.fail(default):报错。replace:替换。append:插入
# index:True(default),False.是否使用 df 的index ，作为index
# index_label:sql 的 index 字段名

# 读出数据库
pd.read_sql(sql='select * from tablename where e>:value', con=engine, params={'value':0.5})
# 注意，这里用params可以传递参数，好像跟format实现没什么区别
```


## 方式3：ORM


调包
```py
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = sqlalchemy.create_engine('sqlite:///:memory:')
Base = declarative_base()
# 创建session对象:
session = sessionmaker(bind=engine)()
```

建表
```py
# 1. 必须继承 Base
class User(Base):
    # 2. 定义表名
    __tablename__ = 'users'

    # 3. 定义字段
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    name = sqlalchemy.Column(sqlalchemy.String)
    fullname = sqlalchemy.Column(sqlalchemy.Integer)
    password = sqlalchemy.Column(sqlalchemy.String)

    def __repr__(self):
        return "<User(name='%s', fullname='%s', password='%s')>" % (
            self.name, self.fullname, self.password)


Base.metadata.create_all(engine)  # 创建表结构
```

做增删改查操作
```py

# 创建新User对象:
new_user = User(id='5', name='Bob')
# 添加到session:
session.add(new_user)
# 提交即保存到数据库:
session.commit()
# 关闭session:
session.close()

user = session.query(User).filter(User.id == '5').one()
# user是一个User对象

session.query(User).filter(User.id == '5').all()
```

另外，还有外键查询等功能，见于 https://blog.csdn.net/fgf00/article/details/52949973

## 创建连接方法一览
### 1. sqlite
```py
# database URL 形式是 sqlite://<nohostname>/<path>
engine = create_engine('sqlite:///foo.db')

# 在Unix/Mac
engine = create_engine('sqlite:////absolute/path/to/foo.db')
# 在Windows
engine = create_engine('sqlite:///C:\\path\\to\\foo.db')
# 在Windows 中使用原始字符串
engine = create_engine(r'sqlite:///C:\path\to\foo.db')

# 使用内存
engine = create_engine('sqlite://')
engine = create_engine('sqlite:///:memory:')
```
### 2. postgresql
```py
# 默认情况(即使用psycopg2)
engine = create_engine('postgresql://scott:tiger@localhost/mydatabase')

# 使用psycopg2
engine = create_engine('postgresql+psycopg2://scott:tiger@localhost/mydatabase')

# 使用pg8000
engine = create_engine('postgresql+pg8000://scott:tiger@localhost/mydatabase')
```
### 3. MySQL
```py
# 默认情况（即使用mysql-python）
engine = create_engine('mysql://scott:tiger@localhost/foo')

# 使用mysql-python
engine = create_engine('mysql+mysqldb://scott:tiger@localhost/foo')

# 使用MySQL-connector-python
engine = create_engine('mysql+mysqlconnector://scott:tiger@localhost/foo')

# 使用OurSQL
engine = create_engine('mysql+oursql://scott:tiger@localhost/foo')
```

### 4. Oracle
```py
＃ 默认情况（即使用cx_oracle）
engine = create_engine('oracle://scott:tiger@127.0.0.1:1521/sidname')
# 使用cx_oracle
engine = create_engine('oracle+cx_oracle://scott:tiger@tnsname')
```
### 5. Microsoft SQL Server
```py
# 使用pyodbc
engine = create_engine('mssql+pyodbc://scott:tiger@mydsn')

# 使用pymssql
engine = create_engine('mssql+pymssql://scott:tiger@hostname:port/dbname')
```

## 参考文献
http://blog.csdn.net/billvsme/article/details/50197197  
https://www.liaoxuefeng.com/wiki/001374738125095c955c1e6d8bb493182103fac9270762a000/0014021031294178f993c85204e4d1b81ab032070641ce5000  
http://blog.csdn.net/MMX/article/details/48064109  
