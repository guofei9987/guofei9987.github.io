


查看内存

```python
import psutil
import os

info = psutil.virtual_memory()
print('内存使用：',psutil.Process(os.getpid()).memory_info().rss/1024/2014, 'M')
print('总内存：',info.total/1024/2014, 'M')
print('内存占比：',info.percent)
print('cpu个数：',psutil.cpu_count())
```

查看单个变量的内存

```python
import sys

sys.getsizeof(a)/1024/1024 # 除完以后单位是 M
```

```python
whos
```
