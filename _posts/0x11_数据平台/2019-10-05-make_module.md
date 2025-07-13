---
layout: post
title: 打包Python库
categories:
tags: 0x11_算法平台
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
    packages=find_packages(), # 会寻找每一个带 __init__.py 的文件夹和子文件夹
    python_requires='>=3.5',
    install_requires=['numpy', 'scipy', 'matplotlib', 'pandas'],  # 指定此包的依赖    
    description='Swarm Intelligence in Python',
    long_description=read_file('README.md'),
    long_description_content_type="text/markdown",
    url='https://github.com/guofei9987/scikit-opt',  # 随意填写，一般是项目的 github 地址
    author='Guo Fei',
    author_email='guofei9987@foxmail.com',
    license='MIT',
    platforms=['linux', 'windows', 'macos'],
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

其它配置项
- `packages=['sko', 'sko.operators_gpu', 'sko.operators']` 打包哪些目录
    - `packages=find_packages()` 会寻找所有的包（定义为含有 `__init__.py` 的目录）
    - 子目录不会自动打包，除非指定（上面的例子）



### ext_modules：C 语言扩展

ext_modules 可以指定 C/C++/Python 代码编译为 .so 文件

例子：https://github.com/guofei9987/hibird_python


关键目录：https://github.com/guofei9987/hibird_python/tree/main/my_build/core


`CoreFunction.c` ：C语言代码

`__init__.py`：为了做到平台无关、接口统一而做的代码
1. 生成的文件形如 `CoreFunction.cpython-38-darwin.so`，每个平台不一样，我们在init里面统一处理
2. 暴露接口 CoreFunction 给 ide 识别，防止用户导入时显示红线
3. 代码：
```py
import os
import ctypes
core_path = os.path.dirname(__file__)
so_files = {file.split('.')[0]: os.path.join(core_path, file)
            for file in os.listdir(core_path)
            if file.endswith('.so')}
CoreFunction = ctypes.cdll.LoadLibrary(so_files['CoreFunction'])
```

`core/setup.py` 用于在本地生成 .so 文件，仅测试方便，无其它用
```py
# python setup.py build_ext --inplace
from distutils.core import setup
from Cython.Build import cythonize
setup(ext_modules=cythonize(['CoreFunction.c']))
```


`setup.py` 不多说，用 `ext_modules` 指定扩展c文件
```py
ext_modules=[
    # c文件会编译为 .so 文件
    Extension(
        # 1)my_build.core 对应安装时的目录，不写 so 文件直接生成到包的根目录下。
        # 2）CoreFunction 是生成的so文件名，会自动添加后缀使其符合规范
        name="my_build.core.CoreFunction",
        # 被编译的 c 文件：
        sources=['my_build/core/CoreFunction.c'])
],
```



**附：基础知识点**

1. python 如何调用 .so
```py
import ctypes
my_so = ctypes.cdll.LoadLibrary("my_add.cpython-38-darwin.so")
```
2. 生成 so 方法见于上面 `core/setup.py`
    - 对应命令是 `python setup.py build_ext --inplace`
    - build_ext是指明python生成 `.so` 文件，
    - inplace指示将编译后的扩展模块直接放在同级的目录中
    - 后台流程是这样的：
    - `.py`->`.pyc`-(使用Cython)-> `.c`-(使用C编译器)- >`.pyd`(win)或`.so`(linux)
3. setup 中配置方法见于上面 `setup.py`
4. 还有另一种方式来生成 so 文件
```
ext_modules=cythonize(["my_build/core/CoreClass.py", 'my_build/core/CoreFunction.c']
```
5. python 生成的 .so 文件不能用 ctypes.cdll.LoadLibrary 读取，但可以 import

### ext_modules: 加密c和py

加密的原理：代码文件编译为 .so 文件，打包 .so 文件，不打包代码。


不希望被看到代码的文件夹，里面有 python 和 c 源文件
https://github.com/guofei9987/hibird_python/tree/main/core_private_source
- `core_private_source/setup.py` 用来自动生成 .so 文件。命令是 `python setup.py build_ext --inplace`
- **注意**，每种系统上生成的 so 文件不通用


so文件复制到目标子包中，[/my_build/core_private](https://github.com/guofei9987/hibird_python/tree/main/my_build/core_private)
- 注意 `__init__.py`
- 对于python生成的 so，直接import
- 对于c生成的so，调用方法同上


### 数据文件 package_data
如何把数据文件也一起打包进去？
- `package_data={'my_build': ['data/*.txt']}` 同时把文件也作为安装包的一部分
    - my_build 是包，`data` 指的是 `my_build/data` （好像有些奇怪）
- 代码部分，包可能安装在任何目录，因此这样调整
    - `__init__.py` 里面：（其它py文件中也行，不过这个感觉更规范）
```py
from os.path import dirname
module_path = dirname(__file__)
```
    - 使用数据的目录中：
```py
from . import module_path
# 如果是子目录，from .. import module_path
os.path.join(module_path, 'data/a.txt')
```
- 另一个方法： `data_files=[('my_build/data', ['my_build/data/a.txt'])]`
    - 这个是把 a.txt 这个文件，放到 python 根目录/my_build/data 这个文件夹中 （更奇怪）


```py
scripts = ['say_hello.py']
keywords = "hello world example examples"
```


参考：https://docs.python.org/3/distutils/setupscript.html


### 在本地试一试
```bash
pip install .
```
这样你就可以在自己的电脑上的任何目录中导入包了
```py
import sko
```

（如果只是想做一个包，到这里就算完事了，但如果你想让全世界人方便地用 `pip install` 安装你的包，看下面）

## 打包上传到 PyPI
step1:更新相关工具
```bash
python3 -m pip install --user --upgrade setuptools wheel twine
# setuptools、wheel 用于打包
# twine 用于上传
```


step2：打包上传

```bash
# 打包
python setup.py sdist bdist_wheel

# 上传
python -m twine upload --repository-url https://upload.pypi.org/legacy/ dist/*
```

免密码（按照步骤来）：
1. 在 pypi.org 生成 api
2. 编辑 `~/.pypirc`
```
[pypi]
username = __token__
password = <your token>
```
3. `chmod 600 ~/.pypirc` 来更改其权限
4. 使用 `python -m twine upload dist/*` 发布项目



step3： 享受成功！
上传成功后，全世界所有人都可以使用pip下载你的包啦！
```
$pip install scikit-opt
```

说明：
- `sdist`（源码分发）分发的是源代码，格式是 `*.tar.gz` 或者 `*.zip` 文件，包含源文件和 `setup.py`，用户安装时先编译
    - 如何生成 zip 文件 `python setup.py sdist --formats=zip`
    - 如何生成 gz 和 zip 文件 `python setup.py sdist --formats=gztar,zip`
    - 如果包含 C/Rust 源码，不会在开发者的机器上编译，而是在用户 `pip install xxx` 时编译
- `bdist_wheel`（预编译二进制分发）分发的是二进制 wheel 文件，是 `*.whl` 文件，包含已编译二进制文件和相关元数据。用户安装时不需要编译。
    - 如果包含 C/Rust 源码，你必需按照目标用户的操作系统类型编译多份



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
# 从 github 安装
pip install git+git://github.com/guofei9987/blind_watermark.git@master

# 安装 .tar.gz 包 
pip install dist/pyLSHash-0.1.1.tar.gz
# 如果引用了第三方库，会自动下载这些依赖库

# 安装 .whl 包
pip install dist/pyLSHash-0.1.1-py3-none-any.whl

# 按照 requirements.txt 安装
pip install -r requirements.txt
```


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

## pyproject.toml

比 `setup.py` 更现代的打包方案。来自 PEP621 规范


新建 `pyproject.toml`

```yml
[build-system]
requires = ["setuptools>=69", "wheel", "setuptools-scm[toml]>=8"]
# ↑ 构建时（build）需要提前安装的工具包：
#   - setuptools：最常用的构建后端
#   - wheel：产出 .whl 包
#   - setuptools-scm[toml]：从 Git tag 自动生成版本号；[toml] 表示支持在 pyproject.toml 里配置
build-backend = "setuptools.build_meta"         # 指定构建后端：setuptools 的 PEP 517 接口

[project]
# 发行包名（pip install 的名字）
name = "blind_watermark"
# 动态版本号：来自 git tag（例如 v0.4.2 -> 0.4.2），由构建后端（setuptools-scm）提供
dynamic = ["version"]
# 简短描述（展示在 PyPI 概览）
description = "Blind Watermark in Python"
# 长描述
readme = { file = "docs/en/README.md", content-type = "text/markdown" }

license = { file = "LICENSE" }

# 运行时 Python 最低版本
requires-python = ">=3.6"

# 作者信息，可列多位
authors = [{ name = "Guo Fei", email = "me@guofei.site" }]


# 运行依赖（安装本包时会被一起装）
dependencies = [
  "numpy>=1.17.0",
  "opencv-python",
  "PyWavelets"
]



keywords = ["watermark", "dwt", "dct", "svd", "blind-watermark"]
# ↑ 关键词有助于检索

# 标签，用于 pypi 的搜索、展示、分类
classifiers = [
  "License :: OSI Approved :: MIT License",     # 许可证分类
  "Programming Language :: Python",             # 语言分类
  "Programming Language :: Python :: 3",        # 支持 Python3
  "Programming Language :: Python :: 3 :: Only", # 仅支持 Python3，不支持 Python2

  "Programming Language :: Python :: 3.6",      # 细项版本支持（越具体越好）
  "Programming Language :: Python :: 3.7",
  "Programming Language :: Python :: 3.8",
  "Programming Language :: Python :: 3.9",
  "Programming Language :: Python :: 3.10",
  "Programming Language :: Python :: 3.11",
  "Programming Language :: Python :: 3.12",

  "Operating System :: OS Independent",
  # 跨平台，可在 Windows、Linux、Mac 等平台使用

  "Topic :: Multimedia :: Graphics",
  # 主题分类

  "Topic :: Software Development :: Libraries :: Python Modules"
  # 这是一个 Python 模块   
]


[project.urls]
# 项目的主页，可以是仓库首页、项目官网
Homepage = "https://github.com/guofei9987/blind_watermark"
# 文档地址
Documentation = "https://blindwatermark.github.io/blind_watermark"
# 仓库地址
Source = "https://github.com/guofei9987/blind_watermark"
Issues = "https://github.com/guofei9987/blind_watermark/issues"



[project.optional-dependencies]
# 服务器/CI 场景可选无 GUI 的 OpenCV
server = ["opencv-python-headless"]
# ↑ 可选依赖组（extras）。安装方式：pip install blind_watermark[server]

[project.scripts]
blind_watermark = "blind_watermark.cli_tools:main"
# ↑ 安装后生成同名命令行入口：执行时相当于运行
#   from blind_watermark.cli_tools import main; main()

[tool.setuptools]
# 如果你是平铺式结构（包目录与 pyproject.toml 同级），自动发现：
packages = { find = {} }                        # 自动发现包（等价于 setup.py 里的 find_packages()）
include-package-data = true                     # 打包时包含包内声明的数据文件（配合 MANIFEST.in 或 setuptools-scm）

[tool.setuptools.packages.find]
# 如需排除测试等目录，可用：
exclude = ["tests*", "docs*"]                   # 自动发现时要排除的路径通配

[tool.setuptools_scm]
# 从 git tag 推导版本；无 tag 时可给出本地版本后缀
version_scheme = "post-release"                 # 正式版本号的生成策略（如 0.4.2.postN）
local_scheme = "node-and-date"                  # 本地版本后缀策略（含提交哈希/日期，便于区分私有构建）
# 可选：生成一个 _version.py，供运行时读取
write_to = "blind_watermark/_version.py"        # 构建时把推导出的版本写入该文件
```

















安装必要的包
```sh
pip install build twine
```

构建并上传
```sh
# 构建，构建的结果会放到 ./dist 下
python -m build
# 上传，（token 设置同上）
twine upload dist/*
```


## import 一个 zip 包

```python
import os
import sys
abs_file = __file__
prefix = os.path.dirname(abs_file)
sys.path.append(os.path.join(prefix,"testZip.zip"))

from testZip import a

print(a.__file__)
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

### coveralls
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
  - pip install pytest-cover
  # 下面这个忘了干啥用的了
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

### pytest

文档：https://docs.pytest.org/en/latest/contents.html

安装
```bash
pip install -U pytest
pytest --version
```





- Test level, which runs a single test. The first example runs a test in a class. The second runs a stand alone test.
```
pytest statsmodels/regression/tests/test_regression.py::TestOLS::test_missing
pytest statsmodels/regression/tests/test_regression.py::test_ridge
```



测试范围
- 测试整个项目，例如 `pytest blind_watermark`
- 测试一个目录 `pytest blind_watermark/examples/tests`
- 测试一个文件，文件以`test_`开头或者 `_test`结尾，`pytest test_one.py`
- 测试类以 Test 开头，并且不能带有 init 方法，`pytest test_one.py::TestMyClass`
- 测试函数以 `test_` 开头，例如
    - `pytest test_one.py::TestMyClass::test_my_func`
    - `pytest test_one.py::test_my_func`
- 断言使用 `assert`
- 在执行pytest命令时，会自动从当前目录及子目录中寻找符合上述约束的测试函数来执行。


pytest.main()会自动读取当前目录下的所有test开头的.py文件，运行test方法或者类

```python
pytest.main(['./'])               # 运行./目录下所有（test_*.py  和 *_test.py）
pytest.main (['./subpath1'])    # 运行./subpath1 目录下用例
pytest.main (['./subpath1/test_module1.py'])    # 运行指定模块
pytest.main (['./subpath1/test_module1.py::test_m1_1'])  # 运行模块中的指定用例
pytest.main (['./subpath2/test_module2.py::TestM2::test_m2_02'])  # 运行类中的指定用例
pytest.main (['-k','pp'])         # 匹配包含pp的用例(匹配目录名、模块名、类名、用例名)
pytest.main(['-k','spec','./subpath1/test_module1.py'])     # 匹配test_module1.py模块下包含spec的用例
pytest.main(['-k','pp','./subpath2/test_module2.py::TestM2'])   # 匹配TestM2类中包含pp的用例
```


```bash
# 默认 print 不能显示，用下面这个
pytest -s
```

配合gh action（https://docs.codecov.com/docs/github-2-getting-a-codecov-account-and-uploading-coverage）

```yaml
name: API workflow

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    name: Test python API
    defaults:
      run:
        working-directory: ./api
    steps:
    - uses: actions/checkout@v1
    - uses: actions/setup-python@v2
      with:
        python-version: '3.10'
    - name: Install requirements
      run: pip install -r requirements.txt
    - name: Run tests and collect coverage
      run: pytest --cov .
    - name: Upload coverage reports to Codecov with GitHub Action
      uses: codecov/codecov-action@v3
```


## 重新载入包
```python
import importlib

importlib.reload(scipy)
```




## python 环境

```bash

# 创建环境
conda create -n myenv_py38 python=3.8

# 激活环境
conda activate myenv_py38

# 然后可以在此环境中安装包，例如：
pip install scikit-opt

# 列出所有的环境
conda env list

# 反激活环境
conda deactivate

# 删除环境
conda remove -n myenv_py38 --all
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

### 运行 python 脚本

除了用 `python file.py` 运行python外，还可以用 `./file.py` 这种命令来直接运行 python，需要进行以下操作：


第一步：找到 python 解释器在哪
```bash
whereis python
```


第二步：
如果上面输出为 `/root/miniconda3/bin/python`  
pytho脚本 `file.py` 这么写：  

```python
#!/root/miniconda3/bin/python
print('hello')
```

第三步：给 `file.py` 添加运行权限
```bash
chmod u+x file.py
```

第四步：运行
```bash
./file.py
```



额外，一般第一行写解释器，第二行写 `utf-8`，如下：

```python
#!/root/miniconda3/bin/python
# coding:utf-8
print('你好')
```



## 参考资料


[CSDN](https://blog.csdn.net/tlonline/article/details/79751658) 中文的，但是打包上传那一部分过时了。  
[官方网站](https://packaging.python.org/tutorials/packaging-projects/#uploading-your-project-to-pypi)

[setup.py 指南](http://blog.konghy.cn/2018/04/29/setup-dot-py/#part-2bb23566e92e12ab)

[Cython介绍](https://blog.csdn.net/feijiges/article/details/77932382)

[知乎：如何保护你的 Python 代码](https://zhuanlan.zhihu.com/p/54296517)

[pip install](https://pip.pypa.io/en/stable/reference/pip_install/)
