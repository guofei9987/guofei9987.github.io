
计算一个文件的md5值
```
m = hashlib.md5()
with open(filename, 'rb') as f:
    bytes = f.read(1024)
    while (bytes != b''):
        m.update(bytes)
        bytes = f.read(1024)
res = m.hexdigest()
res
```



tar

```
import  tarfile

tar  =  tarfile.open( " temp.tar " , " w " )
 for  file  in  files:
    tar.add(file)#www.iplaypy.com

tar.close()
```

gzip
```
import gzip
```
