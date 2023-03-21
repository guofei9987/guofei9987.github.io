---
layout: post
title: 【开源】恶俗古风诗歌生成器
categories: 开源
tags:
keywords:
description:
repo_name: vulgar_language_generator
---

## demo
**如果点击按钮没反应，刷新一次就好了（网站框架的锅，从目录点进来就有这问题，以后有时间再修复）**


<script src="https://www.guofei.site/vulgar_language_generator/vulgar_poet/vulgar_poet.js"></script>
<script>
    // 这一段代码可以放到head/引用/body中，都可以调用
    function myFunction() {
        document.getElementById("vulgar_poet").innerHTML += vulgar_poet();
    }
</script>

<button type="button" onclick="myFunction()">恶俗古风诗歌生成器</button>
<p id="vulgar_poet"></p>

## 如何部署到你的网站上

```html
<script src="https://www.guofei.site/vulgar_language_generator/vulgar_poet/vulgar_poet.js"></script>
<script>
    // 这一段代码可以放到head/引用/body中，都可以调用
    function myFunction() {
        document.getElementById("vulgar_poet").innerHTML += vulgar_poet();
    }
</script>

<button type="button" onclick="myFunction()">恶俗古风诗歌生成器</button>
<p id="vulgar_poet"></p>
```

## 源码和原理

[![Stars](https://img.shields.io/github/stars/guofei9987/vulgar_language_generator.svg?label=Stars&style=social)](https://github.com/guofei9987/vulgar_language_generator/stargazers)
[![Forks](https://img.shields.io/github/forks/guofei9987/vulgar_language_generator.svg?label=Fork&style=social)](https://github.com/guofei9987/vulgar_language_generator/network/members)


**网上的相关文章太多了，搞不清楚原想法是谁的了，请原作者联系一下我**。  
下面是原文
```
关键词：朱砂 天下 杀伐 人家 韶华 风华 繁华 血染 墨染 白衣 素衣 嫁衣 倾城 孤城 空城 旧城
 旧人 伊人 心疼 春风 古琴 无情 迷离 奈何 断弦 焚尽 散乱 陌路 乱世 笑靥 浅笑 明眸 轻叹 烟火
一生 三生 浮生 桃花 梨花 落花 烟花 离殇 情殇 爱殇 剑殇 灼伤 仓皇 匆忙 陌上 清商 焚香 墨香
微凉 断肠 痴狂 凄凉 黄梁 未央 成双 无恙 虚妄 凝霜 洛阳 长安 江南 忘川 千年 纸伞 烟雨 回眸
公子 红尘 红颜 红衣 红豆 红线 青丝 青史 青冢 白发 白首 白骨 黄土 黄泉 碧落 紫陌情深缘浅 情深不寿
莫失莫忘 阴阳相隔 如花美眷 似水流年 眉目如画 曲终人散 繁华落尽 不诉离殇 一世长安
基本句式：
1.xx，xx，xx了xx。
2.xxxx，xxxx，不过是一场xxxx。
3.你说xxxx，我说xxxx，最后不过xxxx。
4.xx，xx，许我一场xxxx。
5一x一x一xx，半x半x半xx。
6.你说xxxx xxxx，后来xxxx xxxx。
7.xxxx，xxxx，终不敌xxxx。
注意事项：
1.使用一个句式时一定要多重复几次，形成看起来异常高端的排比句。
2.［殇］这个字恶俗到爆，一定要多用。
3.不要随意用连词，就让这些动词名词形容词堆在一起，发生奇妙的反应。
4.填句子千万不能有逻辑性！填句子千万不能有逻辑性！填句子千万不能有逻辑性！重要的事情说三遍。
例句：
1.江南烟雨，陌上白衣，不过是一场情深缘浅。伊人回眸，繁华落尽，不过是一场烟火迷离。浮生微凉，白骨成双，不过是一场三世离殇。
2.旧城，未央，许我一场墨染清商。乱世，无情，许我一场白衣仓皇。忘川，千年，许我一场奈何成双。
end
【简直丧心病狂精神污染，po主去吐一吐。】
```
