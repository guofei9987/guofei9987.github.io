---
layout: open_source
title: HideInfo
categories: 开源
tag: Watermark
order: 210
repo_name: HideInfo
---

## HideInfo

[![](https://www.guofei.site/public/icon/HideInfo.svg)](https://github.com/guofei9987/HideInfo)


一些小而美的信息隐藏方法  



[![PyPI](https://img.shields.io/pypi/v/HideInfo)](https://pypi.org/project/HideInfo/)
[![License](https://img.shields.io/pypi/l/HideInfo.svg)](https://github.com/guofei9987/HideInfo/blob/master/LICENSE)
![Python](https://img.shields.io/badge/python->=3.5-green.svg)
![Platform](https://img.shields.io/badge/platform-windows%20|%20linux%20|%20macos-green.svg)
[![stars](https://img.shields.io/github/stars/guofei9987/HideInfo.svg?style=social)](https://github.com/guofei9987/HideInfo/)
[![fork](https://img.shields.io/github/forks/guofei9987/HideInfo?style=social)](https://github.com/guofei9987/HideInfo/fork)
[![Downloads](https://pepy.tech/badge/HideInfo)](https://pepy.tech/project/HideInfo)




| 算法                                                                                         | 说明                |
|--------------------------------------------------------------------------------------------|-------------------|
| [幻影坦克](https://github.com/guofei9987/HideInfo/blob/main/example/example_mirage_tank.py)    | 使图片在不同的背景下显示不同的图片 |
| [化物为图](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_as_img.py)    | 把数据以图片形式存放        |
| [藏物于图](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_in_img.py)    | 把数据藏在一个图片中        |
| [图片隐水印](https://github.com/guofei9987/HideInfo/blob/main/example/example_img_watermark.py) | 图片空域上的隐水印         |
| [图种](https://github.com/guofei9987/HideInfo/blob/main/example/example_img_seed.py)         | 把图片和文件黏在一起，并存为图片  |
| [EXIF](https://github.com/guofei9987/HideInfo/blob/main/example/example_img_exif.py)       | 把一段信息放到图片的EXIF中   |
| [化物为音](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_as_music.py)  | 把数据以音频的形式存放       |
| [藏物于音](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_in_music.py)  | 把数据隐藏在一个音频中       |
| [回声水印](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_in_music.py)  | 以回声的形式，把二进制嵌入到音频中 |
| [化物为文](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_as_txt.py)    | 把数据以文本文件的形式存放     |
| [藏物于文](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_in_txt.py)    | 把数据隐藏在一段文本中       |




安装
```
pip install HideInfo
```


## 幻影坦克

功能：把两个图片合并，使其在黑色背景下显示图片A，在白色背景下显示图片B

说明
- 已支持彩色图片
- 一般情况下，手机/浏览器的预览和点击大图分别使黑色背景和白色背景，因此有"预览和点击是两张不通的图"的效果
- 视频展示：[B站](https://www.bilibili.com/video/BV1DF41117c7/)
- 代码：[example/example_mirage_tank.py](https://github.com/guofei9987/HideInfo/blob/main/example/example_mirage_tank.py)


```python
from hide_info import mirage_tank

mirage_tank.mirage_tank('图片.png', 'img2.jpeg', '幻影坦克.png')
```

## hide_as_img:化物为图

功能：把文件/文本/bytes 类数据，转换为图片  
原理：图片 1 个像素的 1 个通道可以存放 0-255 的数字，也就是一个字节。因此可以用来存放数据。
使用场景：
- 信息隐藏、隐蔽传输
- 在只能发送图片的场景下（例如社交软件），发送任意信息

说明
- RGB 3个通道都用来存放数据，但不使用透明通道
- 使用前4个字节记录数据的大小，因此要求总的数据量小于 4G
- 可以存放文件、文本、字节等类型的数据，把它转化为一张图片
- 代码：[example_hide_as_img.py](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_as_img.py)

```python
from hide_info import hide_as_img

# 文件转为图片并存下来
hide_as_img.file_encode(filename='要隐藏的文件.zip', img_filename='化物为图.png')
# 把图片再转回文件
hide_as_img.file_decode(filename='化物为图-解出来的文件.zip', img_filename='化物为图.png')
```

## hide_in_img：藏物于图

功能：把文件/文本/字节 类数据，藏进一个预先准备好的 PNG 图片中，使其用肉眼无法看出区别  
原理：（LSB算法）根据信息的二进制，改变像素数据的最低位，肉眼是无法察觉这种改变  
使用场景：
- 信息隐藏、隐蔽传输
- 在只能发送图片的场景下（例如某社交软件），发送任意信息
- 盲水印、图片溯源、版权保护


说明
- 解原始数据时，无需原图参与
- 使用前4个字节存放数据的大小
- 使用位运算，提高一定的性能
- LSB算法对压缩、转格式等攻击脆弱
- 例子：[example_hide_in_img.py](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_in_img.py)

```python
from hide_info import hide_in_img

# 把文件隐藏到图片中
hide_in_img.file_encode(filename='要隐藏的文件.zip', img_filename='图片.png', img_filename_new='藏物于图.png')
# 从图片中提取文件
text_encode = hide_in_img.file_decode('藏物于图-解出的文件.zip', img_filename='藏物于图.png')
```

## img_watermark: 图片空域上的隐水印

说明：
- 同样使用 LSB 算法。 
- 水印是一个 **二值图**。
- 可对抗裁剪攻击
- 如果图片有大片纯色区域，对这些攻击有一定的鲁棒性：缩放、转格式、截图、裁剪。如果没有大片纯色区域，则不能对抗这些攻击。
- 例子：[example/example_img_watermark.py](https://github.com/guofei9987/HideInfo/blob/main/example/example_img_watermark.py)

代码 
```python
from hide_info import img_watermark

# 嵌入隐式水印
img_watermark.file_encode(img_filename="图片.png", watermark_filename="watermark.png", img_filename_new="图片_打入水印.png")

# 提取隐式水印
img_watermark.file_decode(img_filename="图片_打入水印.png", wm_extract="解出的水印.png")
```

## img_seed:图种

功能：把图片和文件连接起来，以图片的形式存下来（目前还不完善）

- 例子：[example/example_img_seed.py](https://github.com/guofei9987/HideInfo/blob/main/example/example_img_seed.py)

原理
- jpg 的内容结束标志为 FF D9，它不关心之后的内容
- rar 的内容开始标志为 52 61 71 21，它不关心前面的内容

## img_exif:把信息隐藏在图片的EXIF中

功能：把信息隐藏在图片的 EXIF 中，从而获得隐蔽信息、传输隐蔽信息的能力

- 例子：[example/example_img_exif.py](https://github.com/guofei9987/HideInfo/blob/main/example/example_img_exif.py)

## hide_in_music: 藏物于音

功能：把一段信息（文件/文本/bytes），藏进一个音乐文件中

例子：
- [example_hide_in_music.py](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_in_music.py)

```python
from hide_info import hide_in_music

# 把文件隐藏到某个音乐中
hide_in_music.file_encode(filename='要隐藏的文件.zip', music_filename="音乐.wav", music_filename_new="藏物于音.wav")
# 从音乐中提取文件
hide_in_music.file_decode(filename="藏物于音-解出的文件.zip", music_filename="藏物于音.wav")
```

## hide_as_music：化物为音

功能：把一段信息（文件/文本/bytes），转为声音
原理：用 16 种音可以表示一个四进制。如果每个音持续 0.05 秒，那么每秒声音可以存放 10 字节
使用场景：
    - 信息隐藏、隐蔽传输
    - 在只能发送图片的场景下（例如某社交软件），发送任意信息
    

说明
- 例子：[hide_as_music.py](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_as_music.py)

```python
from hide_info import hide_as_music

# 文件转为声音并存下来
hide_as_music.file_encode(filename='要隐藏的文件2.zip', wav_filename='化物为音.wav')
# 把声音再转回文件
hide_as_music.file_decode(filename='化物为音-解出来的文件.zip', wav_filename='化物为音.wav')

```

## echo_watermark: 回声水印

人类听觉系统（HAS）极为灵敏，音频感知冗余小，音频水印同时满足隐蔽性和鲁棒性有一定难度。同时音频压缩算法如 MP3 有损压缩有出色的压缩率和音质，对音频水印带来很大的挑战。

掩蔽效应是 HAS 的一个特点：短时间内高能量部分会掩蔽低能量部分，从而让人耳只能听见高能量部分，掩蔽分为超前掩蔽、同时掩蔽、滞后掩蔽。因此可以将信息隐藏在音频信号的回声中而不影响听感。

回声水印（Echo Watermarking）是一种音频水印技术，通过在原始音频信号中添加回声来嵌入信息。

回声水印的实现通常有两个重要参数：回声延迟和回声幅度。延迟时间决定了回声在原始信号之后多久发生，而幅度则影响回声的强度。通过巧妙地调节这两个参数，可以将数字信息（如比特流）编码到音频信号中。

例如，可以用短的延迟时间表示比特'0'，用长的延迟时间表示比特'1'，或者通过调整回声的幅度来表示不同的数据位。

回声水印技术对于音质的影响相对较小，同时具有较好的鲁棒性，能够在一定程度上抵抗压缩、转换等处理过程。这使得它适用于版权保护、内容认证、隐秘通讯等领域。

```python
from hide_info.echo_watermark import EchoWatermark
from hide_info import utils, evaluate
from scipy.io import wavfile

ori_file = "./ori_file/sounds.wav"  # 载体
embedded_file = "./output/sounds_with_watermark.wav"  # 嵌入水印后的文件名
wm_str = "回声水印算法，欢迎 star!"  # 水印

wm_bits = utils.bytes2bin(wm_str.encode('utf-8'))
len_wm_bits = len(wm_bits)

# embed:
echo_wm = EchoWatermark(pwd=111001)
echo_wm.embed(origin_filename=ori_file, wm_bits=wm_bits, embed_filename=embedded_file)

# extract：
echo_wm = EchoWatermark(pwd=111001)
wm_extract = echo_wm.extract(embed_filename=embedded_file, len_wm_bits=len_wm_bits)

wm_str_extract = utils.bin2bytes(wm_extract).decode('utf-8', errors='replace')
print("extract watermark: ", wm_str_extract)
# error rate：
evaluate.get_error_rate(wm_extract, wm_bits)
```


## hide_in_text：藏物于文

功能：把一段信息（文件/文本/bytes），藏进一段文本中

说明
- 实测在苹果设备 Macbook、IOS 上，隐藏前后的文本看不出区别。但是 Windows 和某些安卓系统上，会有空格
- 例子：[hide_in_txt.py](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_in_txt.py)

```python
from hide_info import hide_in_txt

# 把一个文件隐藏在一段已有的文本中
hide_in_txt.file_encode(filename='要隐藏的文件2.zip', text_filename='一段文本.txt', text_filename_new='藏物于文.txt')
# 从文本中提取文件
hide_in_txt.file_decode(filename='藏物于文-解出的文件.zip', text_filename='藏物于文.txt')
```

## hide_as_txt: 化物为文

功能：把一段信息（文件/文本/bytes），以文本的形式存放下来

说明
- 使用的是 base85 算法
- 例子：[hide_as_txt.py](https://github.com/guofei9987/HideInfo/blob/main/example/example_hide_as_txt.py)

```python
from hide_info import hide_as_txt

# 把一个文件转化为一段文本，并存下走
hide_as_txt.file_encode(filename='要隐藏的文件.zip', txt_filename='化物为文.txt')
# 从文本中提取文件
hide_as_txt.file_decode(filename='化物为文-解出的文件.zip', txt_filename='化物为文.txt')
```

## 其他算法

缩放藏图：提前计算用近邻法缩放时使用的时哪些像素点，然后把这些像素点变成另一个图。
