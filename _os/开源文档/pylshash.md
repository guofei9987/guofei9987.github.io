---
layout: open_source
title: 【PyLSHash】局部敏感哈希
categories: 开源
tag: tools
order: 730
repo_name: pyLSHash
---

## 项目地址

https://github.com/guofei9987/pyLSHash



|算法|功能|场景|特点|
|--|--|--|--|
|LSH|把实数向量映射到 Hash 值，使相似的向量对应的 Hash 值也相似|O(N)时间内快速检索到top-k相似向量|
|min-hash|把集合映射到 Hash 值，使相似的集合对应的 Hash 值也相似|快速检索相似集合、检索相似文档 | Hash 值相同的概率，等于 Jaccard 系数
|SimHash|把文档映射到 Hash 值，使相似的集合对应的 Hash 值也相似 | 快速检索相似文档
|aHash|把图片映射到 Hash 值，使相似图片的 Hash 值也相似|相似图片检索|抗缩放、亮度攻击等
|dHash|把图片映射到 Hash 值，使相似图片的 Hash 值也相似|相似图片检索|抗缩放、亮度攻击等
|pHash|把图片映射到 Hash 值，使相似图片的 Hash 值也相似|相似图片检索|抗缩放、亮度攻击、平移、小部分内容改变|



## LSH

把 n 维向量映射为 Hash 值，并保证相似的向量有相似的 Hash 值


这样一个任务：
1. 数据库中存了 1亿 个 n 维向量
2. 设计一个系统，使它能够
3. 每次有一个 n 维向量 query 这个系统时，能够给出数据库中与它相似（距离较近）的向量
4. 首先想到的是用暴力遍历，计算 1亿 次距离，然后卡阈值，但这效率极低
5. 引出这里要介绍的一个算法：Locality Sensitive Hashing，它可以很好的解决此问题



算法原理很简单：
1. 随机生成一个矩阵 $K_{m\times n}$，然后求矩阵积 $K_{m\times n} \vec a_{n\times 1}$
2. 把结果离散化，就是 $\vec a$ 的 “指纹”。
    - 这里的离散化就粗暴一些：大于0记为1，否则记为0。指纹长度为 m
3. 因为矩阵是随机生成的，离散化也粗暴，因此可以把以上多做几次，也就是对饮 `num_hashtables` 个矩阵




几何角度理解
- 从几何角度，矩阵积实际上是 m 个向量积。
- 向量积 $\vec k \cdot \vec a_1$ 和 $\vec k \cdot \vec a_2$ 相似，意味着 $\vec a_1, \vec a_2$ 在向量 $\vec k$ 上的投影相似
- 回到矩阵积，m 个投影都相似，也就意味着 $\vec a_1, \vec a_2$ 在 m 个基看来是近似的，也就是在空间上近似
- 极端情况，假设 $K$ 是单位矩阵，那么所谓的 “相似” 指的就是 “在同一象限”



### LSH 参考资料


- [https://github.com/guofei9987/pyLSHash](https://github.com/guofei9987/pyLSHash)
- [https://github.com/kayzhu/LSHash](https://github.com/kayzhu/LSHash)



## min-hash

把集合映射到 Hash 值
- 集合也可以用 0-1 向量等价表示。也就是说，这个方法也可以用于 0-1 向量

MinHash 是什么
- 是LSH的一种，
- 可以用来快速估算两个集合的相似度。
- MinHash由Andrei Broder提出，最初用于在搜索引擎中检测重复网页。它也可以应用于大规模聚类问题。


算法过程
- 输入是一个 01 矩阵，它代表一个集合
- 随机生成 k 种打乱顺序的方法（k种全排列）
- 记录下每种排列下，第 0 个 1 所在的位置
- 得到 k 个数字，它就是 MinHash 值


性质：对于 A，B 集合，MinHash 值相等的概率，等于 Jaccard 相似度

算法问题：如果特征很大，那么全排列非常耗时
算法改进：
- 定理：$h(x) = (ax+b) \mod n$，如果 a和n互素，那么这个函数可以生成全排列，
    - 例如：$h(x) = (3x+1) \mod 5$ 把 `0,1,2,3,4` 映射到 `1,4,2,0,3`
- 算法：遍历，取当前的最小值


min-hash 得到的是 Hash 值，通常还要判断其类别，就接上面的 LSH 算法


参考：https://blog.csdn.net/OrthocenterChocolate/article/details/38943491


## 文档 Hash 类算法
### SimHash

把文档映射到 Hash 值，使

是什么：
- 传统 Hash 无法衡量原内容的相似度。如果 Hash 值不相等。只能证明原始内容不完全一样。即使原始内容只相差一个字节，所产生的 Hash 值也很可能差别很大。
- SimHash 作为一种局部敏感哈希算法，它产生的hash值在一定程度上可以表征原内容的相似度。
- SimHash 算法是 Google 公司进行海量网页去重的高效算法
- 它把原始的文本映射为 64 位的二进制，然后用来快速判断其相似度

算法：
- 提取 feature 以及 feature 对应的权重。典型做法：分词、去除停用词，用 TF-IDF 做权重
- Hash：每个词做 Hash
- 加权：对二进制位，1的位置乘以权重，0的位置取负乘以权重
- 合并：把它们加起来
- 降维：如果位置大于0，则设置位1；小于0，则设置位0。得到一串二进制，就是 SimHash 值

![SimHash](/pictures_for_blog/algorithm/hash/sim_hash.jpg)


检索过程
- 把64位 SimHash 指纹拆成 4 个 16 位
- 倒排索引，类似 `{hash_value: passage_id}`
- 检测过程。根据抽屉原理，最多 3 位不同，必然有一个分片完全相同
- 即可很快检出

参考资料：
- 论文：http://static.googleusercontent.com/media/research.google.com/en//pubs/archive/33026.pdf
- https://github.com/1e0ng/simhash
- https://github.com/yanyiwu/simhash


一些使用场景
- Google，不多说
- 网易云，用户的关注情况作为文章，用 SimHash 计算出相似的陌生人 https://zhuanlan.zhihu.com/p/490369474


### 其它文档类相似度技术

方案1：使用“锚”
- 论文《Finding Similar Files in a Large File System》1993
- “锚”指的是特定的字符串，提前定义一些“锚”。把每个“锚”之后的50个字符 Hash 值提取出来，放到数据库中
- 对一篇新文章，用相同的方法提取，然后去数据库中比对相应的 Hash 片段，进而找到相似文档
- 缺点：“锚”的设定依赖专家经验。对《华尔街日报》好用的锚，可能不适用于医学文章。一种语言的锚也不适用于另一种语言。


方案2：Hash 子串
- 论文《Finding Similar Files in a Large File System》1993
- 遍历，计算所有的 Hash 片段。（有一个迭代式使计算量减少为 O(N)）
- 检索同上，新文章的 Hash 片段放数据库，对于新文章，同样操作查询数据库命中次数

方案3：分词+ElasticSearch
- 2010年以前的搜索引擎使用的是这种方案
- 分词+倒排放入数据库
- 检索同上

方案4：使用 NLP 模型，给出一段话对应的特征向量
- 2010年以后的很多模型可以用，最简单的 TF-IDF，到 TextCNN 甚至 Bert


方案5:百度的去重算法（直接找出此文章的最长的n句话，做一遍hash签名。n一般取3。 工程实现巨简单，据说准确率和召回率都能到达80%以上。）


方案6:shingle算法
- 从文档开始位置取，每隔N个字取一个shingle，直到取完，
- 然后计算每个shingle的签名（hash）。
- 检索过程：用简单的集合运算计算jaccard系数



## 图片 Hash 类算法






### aHash（均值哈希算法，Average Hash Method）

是一种基于指纹的算法，可以用来快速检索


算法步骤
1. 缩小图片信息。
    - 像素：把图片缩放为 8x8 ，共 64 个像素
    - 颜色：把图片转为 64 级灰度
2. 计算图片的平均值
3. 比较64个像素值 和 平均值，大于等于记为1，否则记为0
4. 如此得到一个 长度为 64 的二进制，它就是这个图片的指纹


检索过程：
- 只需要对比指纹
- 使用 Hamming distance
- 如果不同的数量小于 5，说明很相似。如果多于10，说明两个图片不同


代码参考：http://www.ruanyifeng.com/blog/2011/07/imgHash.txt


算法特点
- 不受图片大小缩放、亮度攻击影响
- 对图片内容攻击，会让算法失效。例如图片上加些文字。
- 常用场景：根据缩略图，找对应哪个原图


### dHash（差值哈希算法）

算法步骤
1. 缩小图片信息
    - 像素：把图片缩放为 8x9 = 72 个像素
    - 颜色：把图片转为 64 级灰度
2. 同行相邻对比，像素值⼤于后⼀个像素值记作1，否则记作0
3. 如此得到一个 长度为 64 的二进制，它就是这个图片的指纹




### pHash（Perceptual hash algorithm，感知hash）

算法步骤
1. 缩小图片信息
    - 像素：把图片缩放为小图（大于 8x8，32x32）
    - 颜色：把图片转为 64 级灰度
2. 做 DCT，得到 32x32 大小的矩阵，它代表频域
3. 保留左上 8x8，这部分代表低频区域
4. 做 aHash







3个算法的比较
- 性能：`dHash = aHash > pHash`
- 抗攻击： aHash 可以完美应对缩放攻击、亮度攻击等，但如果添加了一些内容，会无能为力。但是 pHash 可以应对这种情况
- dHash 效果很多时候好于 aHash

|方案|性能|特点|
|--|--|--|
|aHash|高|
|dHash|高|
|pHash|稍低|抗平移、内容改变|



### 直方图


算法步骤大致可以分为两步，
1. 根据源图像与候选图像的像素数据，生成各自直方图数据。
2. 使用第一步输出的直方图结果，运用巴氏系数（Bhattacharyya coefficient）算法，计算出相似程度值。


第一步直方图的计算有3种方式
- 对于灰度图像，初始化一个大小为256的直方图数组H，然后根据像素值完成频率分布统计
- RGB直方图方法1：三维直方图。
    - 3个颜色层各自做直方图，`bins = n`
    - 然后拼接起来，得到 `n + n + n` 长度的一个向量
- RGB直方图方法2：单一直方图。
    - 对一个像素，根据 bins 得到一个索引值。假设16等份，某像素点为 (0, 4, 13)，那么 `index = R + G*16 + B*16*16` 
    - `res[index] += 1`，最终得到一个 `n1 * n2 * n3` 长度的向量



第二步：巴氏系数计算， $\sum \sqrt {p_1 p_2}$



### SIFT（尺度不变特征转换，Scale-invariant feature transform）


SIFT 特征是基于物体上的一些局部外观的兴趣点而与影像的大小和旋转无关。对于光线、噪声、些微视角改变的容忍度也相当高。

SIFT算法的特点有：

1. SIFT特征是图像的局部特征，其对旋转、尺度缩放、亮度变化保持不变性，对视角变化、仿射变换、噪声也保持一定程度的稳定性；
2. 独特性（Distinctiveness）好，信息量丰富，适用于在海量特征数据库中进行快速、准确的匹配；
3. 多量性，即使少数的几个物体也可以产生大量的SIFT特征向量；
4. 高速性，经优化的SIFT匹配算法甚至可以达到实时的要求；
5. 可扩展性，可以很方便的与其他形式的特征向量进行联合。

SIFT算法可以解决的问题：
目标的自身状态、场景所处的环境和成像器材的成像特性等因素影响图像配准/目标识别跟踪的性能。而SIFT算法在一定程度上可解决：

1. 目标的旋转、缩放、平移（RST）
2. 图像仿射/投影变换（视点viewpoint）
3. 光照影响（illumination）
4. 目标遮挡（occlusion）
5. 杂物场景（clutter）
6. 噪声


SIFT算法的实质是在不同的尺度空间上查找关键点(特征点)，并计算出关键点的方向。SIFT所查找到的关键点是一些十分突出，不会因光照，仿射变换和噪音等因素而变化的点，如角点、边缘点、暗区的亮点及亮区的暗点等。 


Lowe将SIFT算法分解为如下四步：

1. 尺度空间极值检测：搜索所有尺度上的图像位置。通过高斯微分函数来识别潜在的对于尺度和旋转不变的兴趣点。
2. 关键点定位：在每个候选的位置上，通过一个拟合精细的模型来确定位置和尺度。关键点的选择依据于它们的稳定程度。
3. 方向确定：基于图像局部的梯度方向，分配给每个关键点位置一个或多个方向。所有后面的对图像数据的操作都相对于关键点的方向、尺度和位置进行变换，从而提供对于这些变换的不变性。
4. 关键点描述：在每个关键点周围的邻域内，在选定的尺度上测量图像局部的梯度。这些梯度被变换成一种表示，这种表示允许比较大的局部形状的变形和光照变化。



### SSIM（结构相似度）

是什么
- 是一种衡量两幅图像相似度的指标
- 从一幅图像中提取3个关键特征：亮度、对比度、结构
- 人类对像素的绝对亮度/颜色不敏感，但对边缘和纹理的位置非常敏感。 SSIM 通过主要关注边缘和纹理相似性来模仿人类感知。




$SSIM(x,y) = \dfrac{(2u_xu_y + c_1)(2\sigma_{xy}+c_2)}{(\mu_x^2+\mu_y^2+c_1)(\sigma_x^2+\sigma_y^2+c_2)}$


范围是 -1 到 1，当两张图片一模一样时，SSIM 的值为 1


### 图片Hash算法参考资料

https://github.com/MashiMaroLjc/Learn-to-identify-similar-images

- [https://github.com/MashiMaroLjc/Learn-to-identify-similar-images](https://github.com/MashiMaroLjc/Learn-to-identify-similar-images)
- [https://github.com/nivance/image-similarity](https://github.com/nivance/image-similarity)



