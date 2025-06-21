---
layout: post
title: 【Python】异常和错误
categories: python
tags: 
keywords:
description:
order: 1207
---

## assert

```python
assert 1>0, '如果左边的条件不满足，会报错并显示这段文字'
```

## warnings

```python
import warnings

warnings.warn('It is deprecated')
```

## error


```python
# 简单写法
try:
    import aaaaaaaa
except ImportError:
    print('import error')


# 同时 catch 多种错误
try:
    num = 1
    num.aaaa
except (ImportError, AttributeError):
    print('import error')

# 分别 catch 多种错误
try:
    import aaaaaaaa
    print('上一行出错，就不往下执行了')
except ImportError:
    print('import error')
except AttributeError:
    print('attr error')
except Exception:
    print('other error')
else:
    print('no error')
finally:
    print('无论是否异常都会执行')
```


如何自定义异常类型：
```python
class MyException(Exception):
    def __init__(self, error):
        self.error = error  # print 时显示的信息
        self.msg = '自定义字段'

    def myfunc(self):
        print('可以定义一个方法，来显示信息:', self.msg)
        return '自定义方法也可以return'


# 使用：
try:
    raise MyException('错误')
except MyException as e:
    print(e)
    print(e.msg)
    print(e.myfunc())
```

为何需要异常：
- 永远不要让用户看到错误
- 有时需要在执行到某个阶段后，跳到 exception


| 异常名称                      | 描述                                  |
|---------------------------|-------------------------------------|
| BaseException             | 所有异常的基类                             |
| SystemExit                | 解释器请求退出                             |
| KeyboardInterrupt         | 用户中断执行\(通常是输入^C\)                   |
| Exception                 | 常规错误的基类                             |
| StopIteration             | 迭代器没有更多的值                           |
| GeneratorExit             | 生成器\(generator\)发生异常来通知退出           |
| SystemExit                | Python 解释器请求退出                      |
| StandardError             | 所有的内建标准异常的基类                        |
| ArithmeticError           | 所有数值计算错误的基类                         |
| FloatingPointError        | 浮点计算错误                              |
| OverflowError             | 数值运算超出最大限制                          |
| ZeroDivisionError         | 除\(或取模\)零 \(所有数据类型\)                |
| AssertionError            | 断言语句失败                              |
| AttributeError            | 对象没有这个属性                            |
| EOFError                  | 没有内建输入,到达EOF 标记                     |
| EnvironmentError          | 操作系统错误的基类                           |
| IOError                   | 输入/输出操作失败                           |
| OSError                   | 操作系统错误                              |
| WindowsError              | 系统调用失败                              |
| ImportError               | 导入模块/对象失败                           |
| KeyboardInterrupt         | 用户中断执行\(通常是输入^C\)                   |
| LookupError               | 无效数据查询的基类                           |
| IndexError                | 序列中没有没有此索引\(index\)                 |
| KeyError                  | 映射中没有这个键                            |
| MemoryError               | 内存溢出错误\(对于Python 解释器不是致命的\)         |
| NameError                 | 未声明/初始化对象 \(没有属性\)                  |
| UnboundLocalError         | 访问未初始化的本地变量                         |
| ReferenceError            | 弱引用\(Weak reference\)试图访问已经垃圾回收了的对象 |
| RuntimeError              | 一般的运行时错误                            |
| NotImplementedError       | 尚未实现的方法                             |
| SyntaxError               | Python 语法错误                         |
| IndentationError          | 缩进错误                                |
| TabError                  | Tab 和空格混用                           |
| SystemError               | 一般的解释器系统错误                          |
| TypeError                 | 对类型无效的操作                            |
| ValueError                | 传入无效的参数                             |
| UnicodeError              | Unicode 相关的错误                       |
| UnicodeDecodeError        | Unicode 解码时的错误                      |
| UnicodeEncodeError        | Unicode 编码时错误                       |
| UnicodeTranslateError     | Unicode 转换时错误                       |
| Warning                   | 警告的基类                               |
| DeprecationWarning        | 关于被弃用的特征的警告                         |
| FutureWarning             | 关于构造将来语义会有改变的警告                     |
| OverflowWarning           | 旧的关于自动提升为长整型\(long\)的警告             |
| PendingDeprecationWarning | 关于特性将会被废弃的警告                        |
| RuntimeWarning            | 可疑的运行时行为\(runtime behavior\)的警告     |
| SyntaxWarning             | 可疑的语法的警告                            |
| UserWarning               | 用户代码生成的警告                           |
