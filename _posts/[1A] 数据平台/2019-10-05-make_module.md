---
layout: post
title: 打包Python库
categories:
tags: 1-1-算法平台
keywords:
description:
order: 173
---

## 打包前的准备


### 目录结构
```
scikit-opt/
    └── sko/
    |   |── filename.py
    |   └── __init__.py
    setup.py
```

### setup.py
```py
from setuptools import setup
setup(name='scikit-opt',
      version='0.1',
      description='Genetic Algorithm, Particle Swarm Optimization, Simulated Annealing, Ant Colony Algorithm in Python',
      url='https://github.com/guofei9987/scikit-opt', # 随意填写，一般是项目的 github 地址
      author='Guofei',
      author_email='guofei9987@foxmail.com',
      license='MIT',
      packages=['sko'],
      install_requires=['numpy', 'scipy', 'matplotlib', 'pandas'], # 指定此包的依赖
      zip_safe=False # 为了兼容性，一般填 False
      )
```
- name: 包的名字，也是将来用户使用 `pip install` 时的名字
- version： 每次上传的版本号应该不一样


### 在本地试一试
```bash
$pip install .
```
这样你就可以在自己的电脑上的任何目录中导入包了
```py
import sko
```

（如果只是想做一个包，到这里就算完事了，但如果你想让全世界人方便地用 `pip install` 安装你的包，看下面）

## 打包上传到 PyPI
step1:更新相关工具
```bash
# 更新 setuptools wheel 这两个工具，用于打包
python3 -m pip install --user --upgrade setuptools wheel


# 上传前，还要先在 https://pypi.org/ 注册个账号
# 更新 twine 这个工具，用于上传
$python -m pip install --user --upgrade twine
```


step2：打包上传

```bash
# 打包
python setup.py sdist bdist_wheel

# 上传
python -m twine upload --repository-url https://upload.pypi.org/legacy/ dist/*
```



step3： 享受成功！
上传成功后，全世界所有人都可以使用pip下载你的包啦！
```
$pip install scikit-opt
```

## 相关扩展应用

### travis-ci
一个自动化测试和构建GitHub代码的网站。  
www.travis-ci.org  

[官方文档](https://docs.travis-ci.com/)  

分为2步。  
1. 权限和配置
2. 配置文件 `.travis.yml`  

成功后你需要一个类似 [![Build Status](https://travis-ci.com/guofei9987/scikit-opt.svg?branch=master)](https://travis-ci.com/guofei9987/scikit-opt) 的玩意儿，这东西也可以在你配置时可以找到。
```
[![Build Status](https://travis-ci.com/guofei9987/scikit-opt.svg?branch=master)](https://travis-ci.com/guofei9987/scikit-opt)
```

### coeralls
一个代码覆盖率检测服务网站  
coveralls.io  
配置挺简单的，就是授权一下，然后 `.travis.yml` 改成这样
```yaml
language: python
python:
  - "3.6"
  - "3.7"


# command to install dependencies
install:
  - pip install -r requirements.txt
  - pip install coverage codecov
  - python setup.py install

# command to run tests
script:
  - coverage run examples/demo_ga.py

# Push the results back to codecov
after_success:
  - codecov
```

提一句，`coverage` 是一个包，可以用 `pip install` 或者 `easy_install` 安装，然后，  
`coverage run -p test.py` 可以多条不覆盖  
`coverage combine` 可以合并多条（经测试，不需要合并多条，就可以codecov上传）


## 加密python代码
### 方法1:用 pyc 文件加密

```bash
find <src> -name '*.py' -type f -print -exec rm {} \;
python -m compileall <src>
```


### 方法2:使用 cython

你的源码，放到文件 `hello.py`
```python
def say_hello():
    print("hello world")
```

同一个目录中建立一个 `setup.py` 文件
```python
from distutils.core import setup
from Cython.Build import cythonize

setup(ext_modules = cythonize("hello.py"))
```

shell 中运行：
```
>>> python setup.py build_ext  --inplace
```
- build_ext是指明python生成C/C++的扩展模块
- inplace指示 将编译后的扩展模块直接放在与test.py同级的目录中

后台流程是这样的：
`.py`->`.pyc`-(使用Cython)-> `.c`-(使用C编译器)- >`.pyd`(win)或`.so`(linux)


python -c "from hello import say_hello;say_hello()"

## pip命令

```bash
pip install --user --upgrade scikit-opt blind_watermark
```
- `-r`, `--requirement` 一般后接 requirement file
- `-U, --upgrade` 升级
- `-t, --target` 安装到哪个路径
- `--user` 安装到哪个路径
- `--no-deps` 不安装依赖的包
- `-e`, `--editable` editable mode

## 重新载入包
```python
import importlib

importlib.reload(scipy)
```




## python 环境

创建环境
```bash
conda create -n myenv_py38 python=3.8
```

激活环境
```bash
activate myenv_py38 # for Windows
source activate myenv_py38 # for Linux & Mac

# 然后可以在此环境中安装包，例如：
pip install scikit-opt

# 反激活环境
conda deactivate
```




删除环境
```bash
conda remove --name myenv_py38 --all
```

显示python路径
```bash
whereis python # 只会显示 /usr/bin/python 之类

sys.path # 这个好像显示的比较正确
```

另外，`pyenv` 也是个强大的 python 版本管理工具。


一些概念
- conda: python虚拟环境管理工具，其中一个功能是安装python包。conda 还可以用来管理其它语言。
- pip: python的包管理工具，可以用于安装python包。
- miniconda: conda的压缩包，自带了一个名为base的虚拟环境，这个虚拟环境里只安装了python和几个必要的库。
- anaconda：conda的压缩包。自带了一个名为base的虚拟环境，这个虚拟环境里安装了很多和数据处理有关的python包。



也可以用 docker：
- anaconda `docker run -it continuumio/anaconda3 /bin/bash` https://hub.docker.com/r/continuumio/anaconda3
- miniconda `docker run -it continuumio/miniconda3 /bin/bash` https://hub.docker.com/r/continuumio/miniconda3



## 参考资料


[CSDN](https://blog.csdn.net/tlonline/article/details/79751658) 中文的，但是打包上传那一部分过时了。  
[官方网站](https://packaging.python.org/tutorials/packaging-projects/#uploading-your-project-to-pypi)

[setup.py 指南](http://blog.konghy.cn/2018/04/29/setup-dot-py/#part-2bb23566e92e12ab)

[Cython介绍](https://blog.csdn.net/feijiges/article/details/77932382)

[知乎：如何保护你的 Python 代码](https://zhuanlan.zhihu.com/p/54296517)

[pip install](https://pip.pypa.io/en/stable/reference/pip_install/)
