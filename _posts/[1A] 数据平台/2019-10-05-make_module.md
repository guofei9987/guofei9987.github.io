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
from setuptools import setup, find_packages
setup(
    name='scikit-opt',  # 包的名字，也是将来用户使用 pip install scikit-opt 来安装
    version='0.0.1',  # 版本号，每次上传的版本号应当不一样，可以用类似 sko.__version__ 去自动指定
    python_requires='>=3.5',
    description='Swarm Intelligence in Python',
    long_description=read_file('README.md'),
    long_description_content_type="text/markdown",
    url='https://github.com/guofei9987/scikit-opt',  # 随意填写，一般是项目的 github 地址
    author='Guo Fei',
    author_email='guofei9987@foxmail.com',
    license='MIT',
    packages=find_packages(),  # 也可以是一个列表，例如 ['sko']
    platforms=['linux', 'windows', 'macos'],
    install_requires=['numpy', 'scipy', 'matplotlib', 'pandas'],  # 指定此包的依赖
    zip_safe=False,  # 为了兼容性，一般填 False
    # 命令行工具，下文的意思是，命令行 file2tree1 启动 file2tree/file2tree.py 的 main() 这个函数
    entry_points={
        'console_scripts': [
            'file2tree1 = file2tree.file2tree:main'
        ]
    }
)



# 配合使用：
this_directory = os.path.abspath(os.path.dirname(__file__))


# 读取 README
def read_file(filename):
    with open(os.path.join(this_directory, filename), encoding='utf-8') as f:
        long_description = f.read()
    return long_description


# 获取依赖
def read_requirements(filename):
    return [line.strip() for line in read_file(filename).splitlines()
            if not line.startswith('#')]
```



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


### pip命令

```bash
pip install --user --upgrade scikit-opt blind_watermark
```
- `--user` 安装到哪个路径
- `-r`, `--requirement` 一般后接 requirement file
- `-U, --upgrade` 升级
- `-t, --target` 安装到哪个路径
- `--no-deps` 不安装依赖的包
- `-e`, `--editable` editable mode


```bash
# 看一个包的位置
pip show scikit-opt
```




### 命令行工具

```bash
python3 file2tree/tst1.py args # 直接运行
python3 -m file2tree.tst1 args # 当做模块运行，如果你 pip install 了file2tree，这里直接运行其中的 tst1.py 文件

# 如果包里放入 __main__.py， 下面的效果是运行 __main__.py
python3 -m file2tree args
```

我们有时候想把 `python3` 省略掉，如何做？  
上面提过 `entry_points` 这个选项：

```py
setup(
    entry_points={
        'console_scripts': [
            # 等号左边对应的是命令的名字（file2tree）
            'file2tree = file2tree.file2tree:main'
            # 等号右边代表，指向 file2tree 这个包下的 file2tree.py 中的 main() 函数
        ]
    }
)
```


### 命令行工具的入参


```python
# tst_optparse.py

from optparse import OptionParser

optParser = OptionParser(usage='file2tree -N')

# 1. 键值对的形式：
# python tst_optparse.py -f filename1
optParser.add_option('-f', '--file', dest='filename', help='a file name')
# dst: 存到哪个变量里面，例子是存到 opt.filename 里面

# 2. 单一键的形式
# python tst_optparse.py -v
optParser.add_option('-v', '--verbose', dest='is_verbose', action='store_const', const='yes',
                     help='Is it process verbosely?')
# 如果有 -v，那么就 opts.is_verbose='yes'，否则是 None

# 定义默认，如果不定义默认，默认就是 None
optParser.set_default('filename', 'default_filename')



# 解析
(opts, args) = optParser.parse_args()
# 可以指定解析什么：
# (opts, args) = optParser.parse_args(['-v', '-f', 'my_file'])
# opts 是一个 optparse.Values 对象
opts.filename  # 返回 filename1
args  # list，额外“找不到成对匹配的”，放到 args里面
```


help 命令也很方便：

```bash
python tst_optparse.py -h
python tst_optparse.py -help
python tst_optparse.py --help
```

备注：
- 很方便，这些场景有效：python调用、python -m、用 entry_points
- 还有一些其它包，例如 `argparse`, `getopt`，感觉相对没那么傻瓜。


### init


`__all__` 用来约定暴露哪些接口
```py
# file1.py
__all__ = ['func1', 'func2']
```

含义：
1. 在执行 `from file1 import *` 时，未在 `__all__` 中的函数不会被导入。
2. `from file1 import func3` 仍然可用
3. 可以和 `__init__` 配合使用




`__init__.py` 用来“把一个路径变成一个模块”


子目录中如何做？

空的 `__init__.py`

```py
# pkg1/__init__.py 为空

from tst_pkg.pkg1 import pkg1_file1
pkg1_file1.func1()

# 但是这个会报错：
from tst_pkg import pkg1
pkg1.pkg1_file1.func1()
```


```py
# pkg1/__init__.py
from .pkg1_file1 import func1


# 外面这样导入
from tst_pkg import pkg1

pkg1.func1()
pkg1.pkg1_file1.func1()
```



```py
# pkg1/__init__.py
from . import pkg1_file1

# tst_pkg.pkg1.pkg1_file1.func1()



# 外面这样导入
from tst_pkg import pkg1

pkg1.pkg1_file1.func1()

from tst_pkg.pkg1 import pkg1_file1

pkg1_file1.func1()
```

## 自动化测试

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
export my_package_dir='tst_package'
# 编译文件夹和子文件夹中的 py 文件：
python -m compileall -b ${my_package_dir}
# 这里加入 -b，否则生成的 pyc 文件在 __cache__ 文件夹下，且文件名包含python版本信息，就不能直接用

# 删除 py 文件（慎重！）：
find ${my_package_dir} -name '*.py' -type f -print -exec rm {} \;
```


compileall 官网： https://docs.python.org/3/library/compileall.html


注：
1. 无法用 `pip install .` 安装
2. ?能否打包



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



### pyenv


```bash
# 查看当前python版本
pyenv version

# 查看所有版本
pyenv versions

# 查看所有可安装的版本
pyenv install --list

# 安装指定版本
pyenv install 3.6.5
# 安装新版本后rehash一下
pyenv rehash

# 删除指定版本
pyenv uninstall 3.5.2

# 指定全局版本
pyenv global 3.6.5

# 指定多个全局版本, 3版本优先
pyenv global 3.6.5 2.7.14

# 实际上当你切换版本后, 相应的pip和包仓库都是会自动切换过去的
```


```bash
echo $PATH # 显示path
```


## 参考资料


[CSDN](https://blog.csdn.net/tlonline/article/details/79751658) 中文的，但是打包上传那一部分过时了。  
[官方网站](https://packaging.python.org/tutorials/packaging-projects/#uploading-your-project-to-pypi)

[setup.py 指南](http://blog.konghy.cn/2018/04/29/setup-dot-py/#part-2bb23566e92e12ab)

[Cython介绍](https://blog.csdn.net/feijiges/article/details/77932382)

[知乎：如何保护你的 Python 代码](https://zhuanlan.zhihu.com/p/54296517)

[pip install](https://pip.pypa.io/en/stable/reference/pip_install/)
