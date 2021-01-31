### 安装
```
pip install -U Sphinx
```

### 初始化一个空的项目
```
sphinx-quickstart
```

### 创建网站
```
sphinx-build -b html sourcedir builddir
```
这个里面，sourcedir 是你存放source的目录名，builddir是你想存放html的目录名

或者，目录中有个 `make.bat`，你可以用 `make html`


## 好用的功能
### 代码引用
```rst
.. py:function:: enumerate(sequence[, start=0])

   Return an iterator that yields tuples of an index and an item of the
   *sequence*. (And so on.)


.. function:: enumerate(sequence[, start=0])

   ...


The :py:func:`enumerate` function can be used for ...

.. py:class:: name
.. py:class:: name(parameters)
.. py:attribute:: name
.. py:method:: name(parameters)


例如：
.. py:class:: name
    .. py:method:: name
```

#### Autodoc
做这一步之前，应当先去 `conf.py` 文件。找到 `extensions`，这是一个 `list`，添加一个字符串 `'sphinx.ext.autodoc'`

然后这样就可以了
```
.. autofunction:: sko.GA.ga_register_udf
```

或者整个包(试了一下整个文件)
```
.. automodule:: sko.GA
   :members:
```

一个类
```
.. automodule:: sko.GA.GA
   :members:
```
但这个生成的结果没有标题，只有内容


还有一个问题，就是自动提取出来的注释格式有问题（可能是我的注释写的不对，等会儿改改试试）

#### 额外的一些示例

```
.. py:function:: filterwarnings(action, message='', category=Warning, \
                                module='', lineno=0, append=False)
   :noindex:
```
这里有两个点：
1. 写的时候是斜杠，解析以后当做是同一行
2. :noindex:


## rST语法
### 1. 字体
```
*text* 斜体
**text** 粗体
``text`` 代码
```
### 2. 序号
与markdown类似，星号代表无序列表，数字+句号代表有序列表

### 3. 代码块
上一段后面加双引号`::`，然后留一个空行，下面是缩进，例子:

```
This is a normal text paragraph. The next paragraph is a code sample::

   It is not processed in any way, except
   that the indentation is removed.

   It can span multiple lines.

This is a normal text paragraph again.
```

上面的双引号被解析成单引号

还有一种，三个大于号，
```
>>> 1 + 1
2
```

### 4. 超链接
超链接
```
.. _a link: https://domain.invalid/
```

图片
```
.. image:: gnu.png
   (options)
```
Sphinx 会自动把 source 中的图片，拷贝到 build 中。  
这个文件名可以用星号作为模糊匹配，如果有多个匹配，会选择其中之一。  
图片文件名中不应当有空壳

### 5. 标题
```
一级标题： =
二级标题： -
三级标题： +
四级标题： ^
```

### 注释
```python
def myfunc(a, b):
    '''My function

    :param a:
    :param b:
    :return:
    '''
    c = a + b
    return c
```

### 注脚
```
注脚示例，带井号会自动编号 [#f1]_
还有不带井号的 [Ref]_
带井号会自动编号 [#name]_

.. [#f1] 这是一个注脚，会自动编号
.. [Ref] 不带井号的注脚
.. [#name] 注脚会继续上面的编号，编号为2
```
