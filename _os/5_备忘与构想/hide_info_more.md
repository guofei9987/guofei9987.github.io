---
layout: post
title: 信息嵌入技术【2】
categories: 开源
tag: 备忘与构想
keywords:
description:
order: 59003
---


仓库地址：https://github.com/guofei9987/HideInfo




Info Hiding Library  
一些原理简洁的信息隐藏方法


| 算法   | 说明                |
|------|-------------------|
| 幻影坦克 | 使图片在不同的背景下显示不同的图片 |
| 化物为图 | 把数据以图片形式存放        |
| 藏物于图 | 把数据藏在图片中          |
| 图种   | 把图片和文件黏在一起，并存为图片  |
| EXIF | 把一段信息放到图片的EXIF中   |
| 藏物于音 | 把数据隐藏在音频文件中       |
| 化物为音 | 把数据以音频的形式存放       |
| 藏物于文 | 把数据隐藏在文本中 |


安装
```
pip install HideInfo
```


## 幻影坦克

功能：一个带透明通道的图片，使其在黑色背景下显示图片A，在白色背景下显示图片B

说明

- 一般情况下，手机/浏览器的预览和点击大图分别使黑色背景和白色背景，因此有"预览是一张图片，点开是另一张图片"的效果
- 代码：[example/example_mirage_tank.py](example/example_mirage_tank.py)


背景知识：
- PNG 有4个通道，除了RGB之外，还有个 alpha 通道（透明通道）
    - RGB 通道全部为 255 表示纯白色，全部为 0 表示纯黑色
    - alpha 通道值为 0 表示完全透明，值为 255 表示完全不透明
- 对于一个 PNG 图片，假设某个像素的 RBG 值分别是 R、G、B，透明通道值为 a，底色像素值为 $x_R, x_G, x_B$
- 在页面显示出的像素值为: 
    - $R_{final} = \dfrac{\alpha}{255} R +(1-\dfrac{\alpha}{255})x_R$
    - $G_{final} = \dfrac{\alpha}{255} G +(1-\dfrac{\alpha}{255})x_G$
    - $B_{final} = \dfrac{\alpha}{255} B +(1-\dfrac{\alpha}{255})x_B$




原理（灰度图）
- 目的是计算出灰度图的两个通道 P 和 a，使其在纯白色背景下显示 A，在纯黑色背景下显示 B
- 联立方程：
    - 白色背景下显示 A：$\dfrac{\alpha}{255} P +(1-\dfrac{\alpha}{255})255 = A$
    - 黑色背景下显示 B：$\dfrac{\alpha}{255} P +(1-\dfrac{\alpha}{255})0 = B$
- 其中 白色 = 255，黑色 = 0，代入方程，解得
    - $\alpha=255-(A-B)$
    - $P=255B/\alpha$ 或者 $P=\dfrac{A-(255-\alpha)255}{\alpha}$
    - 因为计算过程中数据可能溢出，因此两个值可能不一样，希望哪个图的质量更好就用哪个
- 另外，数据不能溢出，这要求 $A>B$，也就是 A 比较亮，B 比较暗


原理（彩色图片）
- 对于1个像素点而言，RGB三通道得到 6 个方程，而只有 4 个未知数，如下：
    - 白色背景
        - $\dfrac{\alpha}{255} R +(1-\dfrac{\alpha}{255})255 = A_R$
        - $\dfrac{\alpha}{255} G +(1-\dfrac{\alpha}{255})255 = A_G$
        - $\dfrac{\alpha}{255} B +(1-\dfrac{\alpha}{255})255 = A_B$
    - 黑色背景
        - $\dfrac{\alpha}{255} R +(1-\dfrac{\alpha}{255})0 = B_R$
        - $\dfrac{\alpha}{255} G +(1-\dfrac{\alpha}{255})0 = B_G$
        - $\dfrac{\alpha}{255} B +(1-\dfrac{\alpha}{255})0 = B_B$
- 方程大概率是无解的
    - 方案1：用最优化方法使 6 个方程尽可能的近似成立
    - 方案2：作为近似，计算 a 的时候，使用 A 和 B 对应的 grey 值，用得到的 a 计算 P


彩图方案2算法步骤
1. 输入 图片 A，B，其 RGB 通道记为 $A = [A_R, A_G, A_B], B = [B_R, B_G, B_B]$
2. 计算其对应的灰度值，记为 $A_{grey}, B_{grey}$，也可以使用平均值
3. 计算 `alpha = 255 - (A_grey - B_grey)`，然后 clip 保证其值范围在 0-255
4. 计算结果图片的 RBG 通道，`[R, G, B] = (A-(255-alpha))/(alpha/255)`


以上算法的评价
1. 在纯白背景下显示为 $\dfrac{\alpha}{255}RGB+\dfrac{255-\alpha}{255} 255$
    - $=\dfrac{\alpha}{255}\dfrac{A-(255-\alpha)}{\alpha/255}+\dfrac{255-\alpha}{255} 255$
    - $=A$
2. 在纯黑背景下显示为 $\dfrac{\alpha}{255}RGB+\dfrac{255-\alpha}{255} 0$
    - $=\dfrac{\alpha}{255}\dfrac{A-(255-\alpha)}{\alpha/255}$
    = $A-A_{grey}+B_{grey} $
3. 以上是理论情况，实际情况是，参与运算的各个值都是 uint8 类型，因此每个算式都会有偏差。尤其是 $A_{grey} - B_{grey}$ 接近 255 时，$\alpha$ 接近 0，它作为分母取整会导致值剧烈变化。
    - 最极端的情况，如果 `A=255,B=0`，那么 `a=0`，但是 `a` 之后作为除数了
    - 后果就是：合成图片在白色背景下，还是能隐约看到图片 B 的一些轮廓
4. 如果某个位置的像素点 B 值 比 A 值大，那么合成的透明通道值为 255，RGB 值等于图片 A 的值，也就是说，B 像素点不在结果中体现
5. 为了解决以上问题，可以先把图片 B 的范围做个映射，使 B 的值不要太小（为了规避取整带来的结果波动问题），同时使 B 值不要太大（为了规避 B>A 时 B 不再显示的问题），使用线性映射 `B = a * B + b`，
    - 效果：a 越大，在黑色背景下 B 越清晰，但是在白色背景下 A 越可能隐约看到 B
    - 调整两个参数有些费劲，为了减少一个参数，可以添加限制 `a * 255 + b < img1_avg`，从而令 `b = img1.mean() - 255 * a`
 


## 缩放藏图


效果：一张图片缩放后，变成另一张图片


原理：
- 缩小图片时，如果使用近邻法，缩放过程就是把指定的像素提取，然后组成一个新图片。
- 如果事先把这些像素找到，并替换成另一个图片，那么就能够得到“缩放前是图片A，缩放后是图片B”的效果了


限制：
- 必须是 PNG，不能是 JPG 格式
- 缩放后的大小是确定的，才能显示图片B
- 缩放算法必须是近邻法
- 操作系统自带的缩放算法未必和嵌入算法一致，因此最好用代码来统一（这样做这算法好像使用范围很窄了）


额外
- 可以做多层嵌套，效果是：缩小图片后得到图片B，再次缩小后得到图片C


代码示例：https://github.com/3150601355/SimpleScaleDown

## 化物为文：更简单的命令行实现


加密并转 Base64

```bash
openssl enc -aes-256-cbc -pbkdf2 -salt \
  -in input.txt \
  -out >(base64 > output.b64.txt) \
  -pass pass:"YourPassword"
```

解密
```bash
base64 -d output.b64.txt | \
openssl enc -d -aes-256-cbc -pbkdf2 -salt \
  -out recovered.txt \
  -pass pass:"YourPassword"
```