字典转对象：
```
class Dict(dict):
    __setattr__ = dict.__setitem__
    __getattr__ = dict.__getitem__
```
