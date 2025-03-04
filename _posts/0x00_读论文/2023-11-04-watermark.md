---
layout: post
title: 【读论文】水印
categories:
tags: 0x00_读论文
keywords:
description:
order: 9
---


## 《Practical Deep Dispersed Watermarking with Synchronization and Fusion》

来自字节跳动
- 论文：https://arxiv.org/pdf/2310.14532.pdf
- 代码：https://github.com/bytedance/DWSF


现状：近期基于深度学习的盲水印技术涌现。以往主要集中在固定的低分辨率图像上。对于任意分辨率的图像，尤其是当下广泛使用的高分辨率图像关注较少。大多数工作通常只展示了对典型的非几何攻击（例如，JPEG压缩）的鲁棒性，却忽略了常见的几何攻击（Resize，Rotate，Padding）和更具挑战性的组合攻击（Rotate&JPEG，Resize&Crop）。

本文：对于任意分辨率的封面图像，此论文采用了一种分散的嵌入方案，它稀疏且随机地选择几个固定小尺寸的封面块来通过训练有素的编码器嵌入一致的水印信息。在提取阶段，此论文首先设计了一个水印同步模块来定位并校正受噪声影响的水印图像中的编码块。然后此论文使用解码器来获取这些块中嵌入的信息，并提出了一种基于相似性的信息融合策略来充分利用信息之间的一致性，从而确定可靠的信息。

本文提出了 DWSF（Dispersed Watermarking with Synchronization and Fusion）。
- 嵌入阶段：将水印分散嵌入到封面图像的多个子区域中。从封面图像中稀疏且随机地选择几个小尺寸的封面块，然后通过一个与解码器和抵抗非几何攻击的噪声层共同训练好的编码器，在每个块中嵌入一致的水印信息。与“将水印信息嵌入整个图像的方案”相比，这样的嵌入设计涉及更少的修改，使得水印图像具有更好的视觉质量和较小的文件大小增量。此外，这也可以自然地避免局部擦除攻击（例如，裁剪，遮挡）。
- 在提取阶段，给定一个有水印的图像，此论文设计了一个水印同步模块，该模块旨在定位和校正分散的编码块。具体来说，此论文采用一个分割模型来捕捉不可察觉的甚至是扭曲的水印特征，以预测编码块的区域。如果水印图像被几何攻击（例如，旋转）扭曲，分割结果可以帮助估计几何变换参数（例如，旋转角度），从而逆转几何变换以获得同步的编码块。之后，此论文可以使用解码器来提取每个同步编码块中嵌入的信息。
- 最后，此论文提出了一种基于相似性的信息融合策略，充分利用信息的一致性，可以规避解码信息中可能的偏差对结果的负面影响，从而确定一个更可靠的水印信息。

前人提出的抗几何攻击方案：
- Pereira等人提出将一个额外的模板嵌入到图像中，以估计变换参数，然后逆转这些变换。
- Lin等人通过应用傅立叶-梅林变换在一个几何变换不变的域中嵌入水印信息。
- 然而，这些传统方法往往是为特定的扭曲量身定制的，可能在应用中有很大的局限性。
- 因此，最近的研究转向训练神经网络以实现水印同步。Tancik等人对语义分割模型进行了微调，以在印刷攻击下定位白色背景上的水印图像，由于背景和图像之间有明显的边界，因此取得了令人满意的分割性能。
- Luo等人设计了一个模型来预测水印图像的缩放比例和偏移量，然而缺乏对其他几何攻击（例如，旋转，填充）的讨论。

此论文的方案
- 稀疏：因为是稀疏嵌入，从而对局部擦除攻击（local erasure attacks）更有鲁棒性。修改更小，更不易被察觉，对文件影响更小
- 随机：虽然在图像的固定位置嵌入水印信息使此论文更容易定位和提取，但它也增加了安全风险——被攻击者利用来擦除水印。为了避免这种情况，此论文随机选择每张图像的嵌入区域。 
- 一致。由于此论文的编码块分散在图像中，并且每个块中嵌入的消息是一致的，此论文可以通过充分利用所有提取结果之间的相似性来减少最终消息的偏差，从而确定一个更可靠的消息。

水印模型架构
- 也训练了端到端的水印模型来嵌入和提取水印。区别是水印的载体不是整个图像，而是图像块
- 为了限制编码块和封面块的差异，设计了两个指标，MSE控制像素级别修改，MSSSIM 控制不同尺度下的结构棉花

之后是效果实验数据





## 使用深度学习构建的水印

### 《A Survey of Text Watermarking in the Era of Large Language Models》


https://dl.acm.org/doi/pdf/10.1145/3691626


一个 survey，原因是
- 水印有助于 LLM
    - 恶意用户可能利用大语言模型生成 misinformation 或 harmful content，并在网上传播
    - LLM可能受 extraction attacks，就是攻击者用 LLM 生成的内容去训练一个新的 LLM
- LLM 有助于水印
    - 文本水印的一个关键挑战在于如何在不扭曲原始文本含义或降低可读性的前提下嵌入水印。传统方法往往无法在修改文本的同时保证其语义不变。
    - 这要求算法既要理解文本的语义，又要能够精细地控制文本内容。LLM 改变了这一局面。




第二节，介绍文本水印的定义和关键算法特性
- text watermarking algorithms
    - $A(x,w)=t$, 其中 $A$:watermark generator,  $x$: text, $w$:watermark message, $t$: watermarked text
    - $D(t)=w$, 其中 $D$: watermark detector
- 相关概念
    - 隐写术（Steganography）更看重隐秘信息的容量，而watermark更看重 robustness
    - LLM watermarking，包含各种 LLM+watermarking 的概念，例如 **把水印嵌入到parameter、output embedding、output text**，此论文只讨论 output text 的情况
- text watermarking 的特点：对 text quality 影响低、robust
    - 对 text quality 影响低：$A(x,0)$表示不加水印的输出，那么 $\forall w_i ,R(A(x,0),A(x,w_i))<\delta$
    - robust：某种攻击后，提取率大于 $\beta$
- watermarking algorithm 分为两种：
    - watermarking for existing text
    - watermarking for LLMs，涉及到修改 LLMs，既可以是train阶段，也可以是 inference 阶段

【图】



第三节 watermarking for existing text，分为4种：
1. format-based，例如，line-shift，word-shift coding，通过改变行、字的垂直间距和水平间距来嵌入信息。（Jack T. Brassil, 1995）。
    - 隐藏的信息依赖图像形式的文本，而不是字符串本身
    - 作为改进，用相似unicode做，例如 : U+0043和U+216d分别是：C和Ⅽ；U+004c和U+216c分别是 L和Ⅼ
    - Easymark：零宽字符之类的
2. Lexical-Based ：换词，例如用 WordNet&Word2Vec 做近义词替换，缺点是可能影响语义。有用 BERT 来保持语义合理的
3. Syntactic-Based：三种方式，附加成分移动（Adjunct Movement）、分裂句（Clefting）以及被动化（Passivization）
    - 每种定义为1个bit，Adjunct Movement：0，Clefting：1，Passivization：2
    - 提取时，先把原文和嵌入后的文本都转为语法树（syntax trees），然后比较。
    - 之后，又新增两种句法转换方式：激活化（Activization）和主题化（Topicalization）
    - 之后，研究从英语扩展到了土耳其语
    - 此种方法严重依赖语法，需要根据语言定制
4. Generation-Based 
    - Abdelnabi开发了 end-to-end 神经网络 encoder
    - Zhang 做了改进，REMARK-LLM，使用 pre-trained LLM


第四节：针对LLM的水印

第五节：评估指标
- 可检测性（detectablility）
    - 对 zero-bit watermark：z-score，p-value，...
    - multi-bit: BER, payload
    - watermark size
- quality impact
- robustness under attack
    - ...



第六节探讨应用场景，主要是版权保护和 AI 生成文本的检测；

第七节考察当前面临的挑战和未来研究方向；  

第八节为综述结论。






## 水印技术与深度学习中的安全

### 《SPY-WATERMARK: ROBUST INVISIBLE WATERMARKING FOR BACKDOOR ATTACK》



Wang R, Wan R, Guo Z, Guo Q, Huang R. SPY-Watermark: Robust Invisible Watermarking for Backdoor Attack. InICASSP 2024-2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP) 2024 Apr 14 (pp. 2700-2704). IEEE.



提出 Spy-Watermark（一种 Backdoor attack 方法），嵌入不可见水印（trigger），使其输入 CNN 模型时能误导模型，输出你想要的 tag

[https://arxiv.org/pdf/2401.02031](https://arxiv.org/pdf/2401.02031)