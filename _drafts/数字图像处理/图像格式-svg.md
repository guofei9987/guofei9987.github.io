<svg viewBox="0 0 600 250" width="117" height="38" xmlns="SVG namespace">
    <g stroke-width="16" fill="none">
        <path d="M173 102a51 51 0 1 1-13-30m20 37h-53" stroke="#4a87ee"></path>
        <circle cx="227" cy="128" r="32" stroke="#d83038"></circle>
        <circle cx="313" cy="128" r="32" stroke="#f4c022"></circle>
        <path d="M401 160a31 31 0 1 1 0-61m-4 0a24 29 0 1 1 0 61m26-67v79m-1-12a20 20 0 1 1-52 17" stroke="#4a87ee"></path>
        <path stroke="#4ab95a" d="M449 51v115"></path>
        <path d="M529 118a30 30 0 1 0-2 24m5-32l-62 28" stroke="#d83038"></path>
    </g>
</svg>


## 什么是SVG？
- SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
- SVG 使用 XML 格式定义图形
- SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失
- SVG 是万维网联盟的标准
- SVG 与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体


## SVG 预定义形状

共有属性
- stroke 和 stroke-width 轮廓颜色 和 轮廓宽度
    - stroke-opacity 边框透明度
- fill 填充色，fill-opacity透明度

### 矩形 rect
```html
<svg width="100%" height="100%">
<rect x=1 y=20 rx=30 ry=5 width="300" height="100"
style="fill:rgb(0,0,255);stroke-width:1;
stroke:rgb(0,0,0)"/>
</svg>
```
<svg width="100%" height="100%">
<rect x=1 y=20 rx=30 ry=5 width="300" height="100"
style="fill:rgb(0,0,255);stroke-width:1;
stroke:rgb(0,0,0)"/>
</svg>

- x, y 左上顶点的坐标
- rx, ry 产生圆角

### 圆形 circle
```html
<svg width="100%" height="100%">
<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>
</svg>
```

<svg width="100%" height="100%">
<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>
</svg>

- cx 和 cy 定义圆中心的坐标，默认0
- r 属性定义圆的半径。

### 椭圆 ellipse
```html
<svg width="100%" height="100%">
<ellipse cx="300" cy="150" rx="200" ry="80"
style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2"/>
</svg>
```
<svg width="100%" height="100%">
<ellipse cx="300" cy="150" rx="200" ry="80"
style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2"/>
</svg>

- cx, cy 定义圆点的坐标
- rx 属性定义水平半径
- ry 属性定义垂直半径

### 线 line
```html
<svg width="100%" height="100%">
<line x1="0" y1="0" x2="300" y2="300"
style="stroke:rgb(99,99,99);stroke-width:2"/>
</svg>
```

<svg width="100%" height="100%">
<line x1="0" y1="0" x2="300" y2="300"
style="stroke:rgb(99,99,99);stroke-width:2"/>
</svg>

- x1, y1 线条开始的坐标
- y1, y2 线条结束的坐标

### 多边形 polygon
```html
<svg width="100%" height="100%">
<polygon points="220,100 300,210 170,250"
style="fill:#cccccc;
stroke:#000000;stroke-width:1"/>
</svg>
```
<svg width="100%" height="100%">
<polygon points="220,100 300,210 170,250"
style="fill:#cccccc;
stroke:#000000;stroke-width:1"/>
</svg>

- points 属性定义多边形每个角的 x 和 y 坐标

### 折线 polyline
```html
<svg width="100%" height="100%">
<polyline points="0,0 0,20 20,20 20,40 40,40 40,60"
style="fill:white;stroke:red;stroke-width:2"/>
</svg>
```
<svg width="100%" height="100%">
<polyline points="0,0 0,20 20,20 20,40 40,40 40,60"
style="fill:white;stroke:red;stroke-width:2"/>
</svg>


### 路径 path
```html
<svg width="100%" height="100%" >
<path d="M250 150 L150 350 L350 350 Z"/>
</svg>
```
<svg width="100%" height="100%" >
<path d="M250 150 L150 350 L350 350 Z"/>
</svg>

```html
<svg width="100%" height="100%">
<path d="M153 334 C153 334 151 334 151 334 C151 339 153 344 156 344 C164 344 171 339 171 334 C171 322 164 314 156 314 C142 314 131 322 131 334 C131 350 142 364 156 364 C175 364 191 350 191 334 C191 311 175 294 156 294 C131 294 111 311 111 334 C111 361 131 384 156 384 C186 384 211 361 211 334 C211 300 186 274 156 274" style="fill:white;stroke:red;stroke-width:2"/>
</svg>
```
<svg width="100%" height="100%">
<path d="M153 334 C153 334 151 334 151 334 C151 339 153 344 156 344 C164 344 171 339 171 334 C171 322 164 314 156 314 C142 314 131 322 131 334 C131 350 142 364 156 364 C175 364 191 350 191 334 C191 311 175 294 156 294 C131 294 111 311 111 334 C111 361 131 384 156 384 C186 384 211 361 211 334 C211 300 186 274 156 274" style="fill:white;stroke:red;stroke-width:2"/>
</svg>

- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Belzier curve
- T = smooth quadratic Belzier curveto
- A = elliptical Arc
- Z = closepath

注：以上所有命令：大写表示绝对定位，小写表示相对定位





## 滤镜
feBlend
feColorMatrix
feComponentTransfer
feComposite
feConvolveMatrix
feDiffuseLighting
feDisplacementMap
feFlood
feGaussianBlur
feImage
feMerge
feMorphology
feOffset
feSpecularLighting
feTile
feTurbulence
feDistantLight
fePointLight
feSpotLight

### Gaussian Blur
```html
<svg width="100%" height="100%">
<defs>
<filter id="Gaussian_Blur">
<feGaussianBlur in="SourceGraphic" stdDeviation="6" />
</filter>
</defs>
<ellipse cx="200" cy="150" rx="70" ry="40"
style="fill:#ff0000;stroke:#000000;
stroke-width:2;filter:url(#Gaussian_Blur)"/>
</svg>
```
<svg width="100%" height="100%">
<defs>
<filter id="Gaussian_Blur">
<feGaussianBlur in="SourceGraphic" stdDeviation="6" />
</filter>
</defs>
<ellipse cx="200" cy="150" rx="70" ry="40"
style="fill:#ff0000;stroke:#000000;
stroke-width:2;filter:url(#Gaussian_Blur)"/>
</svg>


### SVG 线性渐变 linearGradient
```html
<svg width="100%" height="100%" >
<defs>
<linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" style="stop-color:rgb(255,255,0); stop-opacity:1"/>
  <stop offset="100%" style="stop-color:rgb(255,0,0); stop-opacity:1"/>
</linearGradient>
</defs>
<ellipse cx="200" cy="190" rx="85" ry="55"
style="fill:url(#orange_red)"/>
</svg>
```
<svg width="100%" height="100%" >
<defs>
<linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" style="stop-color:rgb(255,255,0); stop-opacity:1"/>
  <stop offset="100%" style="stop-color:rgb(255,0,0); stop-opacity:1"/>
</linearGradient>
</defs>
<ellipse cx="200" cy="190" rx="85" ry="55"
style="fill:url(#orange_red)"/>
</svg>

- 多个stop来定义不同的颜色
- offset 属性用来定义渐变的开始和结束位置。
- stop-opacity 定义透明度

### SVG 放射性渐变 radialGradient
```html
<svg width="100%" height="100%">
<defs>
    <radialGradient id="grey_blue" cx="50%" cy="50%" r="50%"
    fx="50%" fy="50%">
        <stop offset="0%" style="stop-color:rgb(200,200,200);
        stop-opacity:0"/>
        <stop offset="100%" style="stop-color:rgb(0,0,255);
        stop-opacity:1"/>
    </radialGradient>
</defs>
<ellipse cx="230" cy="200" rx="110" ry="100"
style="fill:url(#grey_blue)"/>
</svg>
```
<svg width="100%" height="100%">
<defs>
    <radialGradient id="grey_blue" cx="50%" cy="50%" r="50%"
    fx="50%" fy="50%">
        <stop offset="0%" style="stop-color:rgb(200,200,200);
        stop-opacity:0"/>
        <stop offset="100%" style="stop-color:rgb(0,0,255);
        stop-opacity:1"/>
    </radialGradient>
</defs>
<ellipse cx="230" cy="200" rx="110" ry="100"
style="fill:url(#grey_blue)"/>
</svg>


## 其它案例
### feBlend 滤镜
<svg width="100%" height="100%">
<defs>
<linearGradient id="MyGradient" gradientUnits="userSpaceOnUse" x1="100" y1="0" x2="300" y2="0">
	<stop offset="0" style="stop-color:#000000"/>
	<stop offset=".67" style="stop-color:#ffff00"/>
	<stop offset="1" style="stop-color:#000000"/>
</linearGradient>
<filter id="normal">
	<feBlend mode="normal" in2="BackgroundImage"/>
</filter>
<filter id="multiply">
	<feBlend mode="multiply" in2="BackgroundImage"/>
</filter>
<filter id="screen">
	<feBlend mode="screen" in2="BackgroundImage"/>
</filter>
<filter id="darken">
	<feBlend mode="darken" in2="BackgroundImage"/>
</filter>
<filter id="lighten">
	<feBlend mode="lighten" in2="BackgroundImage"/>
</filter>
</defs>
<g style="enable-background: new">
<rect x="40" y="20" width="300" height="450" style="fill:url(#MyGradient)"/>
<g style="font-size:75;fill:#888888;fill-opacity:.6">
	<text x="50" y="90" style="filter:url(#normal)">Normal</text>
	<text x="50" y="180" style="filter:url(#multiply)">Multiply</text>
	<text x="50" y="270" style="filter:url(#screen)">Screen</text>
	<text x="50" y="360" style="filter:url(#darken)">Darken</text>
	<text x="50" y="450" style="filter:url(#lighten)">Lighten</text>
</g>
</g>
</svg>

### feColorMatrix 滤镜
<svg width="100%" height="100%" version="1.1">

<defs>
<linearGradient id="MyGrad" gradientUnits="userSpaceOnUse" x1="100" y1="0" x2="500" y2="0">
	<stop offset="0" style="stop-color:#ff00ff"/>
	<stop offset=".33" style="stop-color:#88ff88"/>
	<stop offset=".67" style="stop-color:#2020ff"/>
	<stop offset="1" style="stop-color:#d00000"/>
</linearGradient>
<filter id="Matrix">
	<feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
</filter>
<filter id="Saturate">
	<feColorMatrix type="saturate" values="0.4"/>
</filter>
<filter id="HueRotate">
	<feColorMatrix type="hueRotate" values="90"/>
</filter>
<filter id="Luminance">
	<feColorMatrix type="luminanceToAlpha" result="a"/>
	<feComposite in="SourceGraphic" in2="a" operator="in"/>
</filter>
</defs>

<g style="font-size:50;fill:url(#MyGrad)">
	<text x="50" y="60">Unfiltered</text>
	<text x="50" y="120" style="filter:url(#Matrix)">Matrix</text>
	<text x="50" y="180" style="filter:url(#Saturate)">Saturate</text>
	<text x="50" y="240" style="filter:url(#HueRotate)">HueRotate</text>
	<text x="50" y="300" style="filter:url(#Luminance)">Luminance</text>
</g>
</svg>

### feComponentTransfer 滤镜
<svg width="100%" height="100%" version="1.1">

<defs>
<linearGradient id="MyGrad" gradientUnits="userSpaceOnUse" x1="50" y1="0" x2="600" y2="0">
	<stop offset="0" stop-color="#ff0000"/>
	<stop offset=".33" stop-color="#00ff00"/>
	<stop offset=".67" stop-color="#0000ff"/>
	<stop offset="1" stop-color="#000000"/>
</linearGradient>

<filter id="Identity">
	<feComponentTransfer>
        	<feFuncR type="identity"/>
	        <feFuncG type="identity"/>
        	<feFuncB type="identity"/>
	        <feFuncA type="identity"/>
      </feComponentTransfer>
</filter>
<filter id="Table">
	<feComponentTransfer>
        	<feFuncR type="table" tableValues="0 0 1 1"/>
	        <feFuncG type="table" tableValues="1 1 0 0"/>
        	<feFuncB type="table" tableValues="0 1 1 0"/>
      	</feComponentTransfer>
</filter>
<filter id="Linear">
	<feComponentTransfer>
        	<feFuncR type="linear" slope=".5" intercept=".25"/>
	        <feFuncG type="linear" slope=".5" intercept="0"/>
        	<feFuncB type="linear" slope=".5" intercept=".5"/>
	</feComponentTransfer>
</filter>
<filter id="Gamma">
	<feComponentTransfer>
        	<feFuncR type="gamma" amplitude="2" exponent="5" offset="0"/>
	        <feFuncG type="gamma" amplitude="2" exponent="3" offset="0"/>
        	<feFuncB type="gamma" amplitude="2" exponent="1" offset="0"/>
	</feComponentTransfer>
</filter>
</defs>

<g font-size="50" font-weight="bold" fill="url(#MyGrad)">
<text x="50" y="60" filter="url(#Identity)">Identity</text>
<text x="50" y="120" filter="url(#Table)">TableLookup</text>
<text x="50" y="180" filter="url(#Linear)">LinearFunc</text>
<text x="50" y="240" filter="url(#Gamma)">GammaFunc</text>
</g>

</svg>
### feOffset 滤镜
<svg width="100%" height="100%" version="1.1">

<defs>
<filter id="filter" x="0" y="0">
	<feGaussianBlur stdDeviation="5"/>
	<feOffset dx="5" dy="5"/>
</filter>
</defs>

<rect width="90" height="90" fill="grey" filter="url(#filter)"/>
<rect width="90" height="90" fill="yellow" stroke="black"/>

</svg>

### feOffset、feFlood、feComposite、feMerge 以及 feMergeNode

<svg width="100%" height="100%" version="1.1">

<defs>
<filter id="test" filterUnits="objectBoundingBox" x="0" y="0" width="1.5" height="4">

	<feOffset result="Off1" dx="15" dy="20"/>
	<feFlood style="flood-color:#ff0000;flood-opacity:0.8"/>
	<feComposite in2="Off1" operator="in" result="C1"/>
	<feOffset in="SourceGraphic" result="Off2" dx="30" dy="40"/>
	<feFlood style="flood-color:#ff0000;flood-opacity:0.4"/>
	<feComposite in2="Off2" operator="in" result="C2"/>

	<feMerge>
		<feMergeNode in="C2"/>
		<feMergeNode in="C1"/>
		<feMergeNode in="SourceGraphic"/>
	</feMerge>
</filter>
</defs>
<text x="30" y="100" style="font:36px verdana bold;fill:blue;filter:url(#test)">This is some text!</text>
</svg>


### feMorphology 滤镜

<svg width="100%" height="100%" version="1.1">
<defs>
<filter id="Erode1">
	<feMorphology operator="erode" in="SourceGraphic" radius="1"/>
</filter>
<filter id="Erode3">
	<feMorphology operator="erode" in="SourceGraphic" radius="3"/>
</filter>
<filter id="Erode4">
	<feMorphology operator="erode" in="SourceGraphic" radius="4"/>
</filter>
<filter id="Dilate1">
	<feMorphology operator="dilate" in="SourceGraphic" radius="1"/>
</filter>
<filter id="Dilate3">
	<feMorphology operator="dilate" in="SourceGraphic" radius="3"/>
</filter>
<filter id="Dilate4">
	<feMorphology operator="dilate" in="SourceGraphic" radius="4"/>
</filter>
</defs>
<g enable-background="new">
<g font-family="Verdana" font-size="50" stroke="red" stroke-width="4">
	<text x="50" y="60">Unfiltered</text>
	<text x="50" y="120" filter="url(#Erode1)">Erode 1</text>
	<text x="50" y="180" filter="url(#Erode3)">Erode 3</text>
	<text x="50" y="240" filter="url(#Erode4)">Erode 4</text>
	<text x="50" y="300" filter="url(#Dilate1)">Dilate 1</text>
	<text x="50" y="360" filter="url(#Dilate3)">Dilate 3</text>
	<text x="50" y="420" filter="url(#Dilate4)">Dilate 4</text>
</g>
</g>
</svg>

### 向矩形添加一个 "a" 元素，这样矩形就可以作为一个超级链接了。
<svg xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" version="1.1">
<a xlink:href="http://www.guofei.site" target="blank">
<rect x="20" y="20" width="250" height="250" style="fill:blue;stroke:pink;stroke-width:5;opacity:0.9"/>
</a>
</svg>


### 重复用 5 秒时间淡出的矩形
<svg width="100%" height="100%" version="1.1">
<rect x="20" y="20" width="250" height="250" style="fill:blue">
    <animate attributeType="CSS" attributeName="opacity" from="1" to="0" dur="5s" repeatCount="indefinite"/>
</rect>
</svg>

### 动画

<svg width="100%" height="100%" version="1.1">
<rect id="rec" x="300" y="100" width="300" height="100" style="fill:lime">
    <animate attributeName="x" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="300" to="0"/>
    <animate attributeName="y" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="100" to="0"/>
    <animate attributeName="width" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="300" to="800"/>
    <animate attributeName="height" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="100" to="300"/>
    <animateColor attributeName="fill" attributeType="CSS" from="lime" to="red" begin="2s" dur="4s" fill="freeze"/>
</rect>
</svg>

### 会改变颜色的三个矩形

<svg width="100%" height="100%" version="1.1">

<rect x="10" y="20" width="90" height="60">
  <animateColor id="a1" attributeName="fill" from="red" to="blue" dur="3s"/>
</rect>
<rect x="10" y="120" width="90" height="60">
  <animateColor id="a2" attributeName="fill" from="blue" to="yellow" begin="a1.end" dur="3s"/>
</rect>
<rect x="10" y="220" width="90" height="60">
  <animateColor id="a3" attributeName="fill" from="yellow" to="green" begin="a2.end" dur="3s"/>
</rect>

</svg>

### 沿一个运动路径移动的文本
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1.1">
<g transform="translate(100,100)">
<text id="TextElement" x="0" y="0" style="font-family:Verdana;font-size:24"> It's SVG!
    <animateMotion path="M 0 0 L 100 100" dur="5s" fill="freeze"/>
</text>
</g>
</svg>

### 沿一个运动路径移动、旋转并缩放的文本
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1.1">
<g transform="translate(100,100)">
<text id="TextElement" x="0" y="0" style="font-family:Verdana;font-size:24; visibility:hidden"> It's SVG!
    <set attributeName="visibility" attributeType="CSS" to="visible" begin="1s" dur="5s" fill="freeze"/>
    <animateMotion path="M 0 0 L 100 100" begin="1s" dur="5s" fill="freeze"/>
    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-30" to="0" begin="1s" dur="5s" fill="freeze"/>
    <animateTransform attributeName="transform" attributeType="XML" type="scale" from="1" to="3" additive="sum" begin="1s" dur="5s" fill="freeze"/>
</text>
</g>
</svg>
### 沿一个运动路径移动、旋转并缩放的文本 + 逐步放大并改变颜色的矩形
