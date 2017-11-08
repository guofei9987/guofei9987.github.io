---
layout: post
title: 【Matlab】恶俗古风诗歌自动生成器.
categories: 趣文
tags:
keywords:
description:
---

看到一篇文章，原文是这样的：
>关键词1：朱砂 天下 杀伐 人家 韶华 风华 繁华 血染 墨染 白衣 素衣 嫁衣 倾城 孤城 空城 旧城 旧人 伊人 心疼 春风 古琴 无情 迷离 奈何 断弦 焚尽 散乱 陌路 乱世 笑靥 浅笑 明眸 轻叹 烟火 一生 三生 浮生 桃花 梨花 落花 烟花 离殇 情殇 爱殇 剑殇 灼伤 仓皇 匆忙 陌上 清商 焚香 墨香 微凉 断肠 痴狂 凄凉 黄梁 未央 成双 无恙 虚妄 凝霜 洛阳 长安 江南 忘川 千年 纸伞 烟雨 回眸 公子 红尘 红颜 红衣 红豆 红线 青丝 青史 青冢 白发 白首 白骨 黄土 黄泉 碧落 紫陌情深缘浅 情深不寿  
关键词2：莫失莫忘 阴阳相隔 如花美眷 似水流年 眉目如画 曲终人散 繁华落尽 不诉离殇 一世长安  
基本句式：1.xx，xx，xx了xx。  
2.xxxx，xxxx，不过是一场xxxx。  
3.你说xxxx，我说xxxx，最后不过xxxx。  
4.xx，xx，许我一场xxxx。  
5一x一x一xx，半x半x半xx。  
6.你说xxxx xxxx，后来xxxx xxxx。  
7.xxxx，xxxx，终不敌xxxx。  
注意事项：1.使用一个句式时一定要多重复几次，形成看起来异常高端的排比句。  
2.［殇］这个字恶俗到爆，一定要多用。  
3.不要随意用连词，就让这些动词名词形容词堆在一起，发生奇妙的反应。  
4.填句子千万不能有逻辑性！填句子千万不能有逻辑性！填句子千万不能有逻辑性！重要的事情说三遍。  
例句：  
1.江南烟雨，陌上白衣，不过是一场情深缘浅。伊人回眸，繁华落尽，不过是一场烟火迷离。浮生微凉，白骨成双，不过是一场三世离殇。  
2.旧城，未央，许我一场墨染清商。乱世，无情，许我一场白衣仓皇。忘川，千年，许我一场奈何成双。  
end  
【简直丧心病狂精神污染，po主去吐一吐。】   


## 既然不要逻辑，那么用简单的随机函数就可以了

**首先，为了这位诗人能够手动进化，把词组和句式放到Excel表里：**  
![微信图片_20171108153726](https://i.imgur.com/Ult3OEU.jpg)

## 然后是代码部分：

```
[~,original_words,~]=xlsread('词组集合.xlsx');
for j=1:20
    sentence_model=original_words{random('unid',7),3};
    for i=1:3
        four_chars_words=original_words{random('unid',11),2};
        sentence_model= regexprep(sentence_model,'xxxx',four_chars_words,1);
    end
    for i=1:3
        two_chars_words_selected=original_words{random('unid',86),1};
        sentence_model= regexprep(sentence_model,'xx',two_chars_words_selected,1);
    end
    for i=1:6
        two_chars_words_selected=original_words{random('unid',86),1};
        sentence_model= regexprep(sentence_model,'x',two_chars_words_selected(1),1);
        sentence_model= regexprep(sentence_model,'x',two_chars_words_selected(2),1);
    end
    fprintf(sentence_model)
    fprintf('\n')
end
```

## 我们来欣赏一些例句：

>你说情深不寿，我说一世长安，最后不过曲终人散  
梨花，明眸，忘川了断肠  
一未一央一红豆，半长半安半离殇  
情深缘浅，繁华落尽，不过是一场莫失莫忘  
你说如花美眷，我说莫失莫忘，最后不过莫失莫忘  
繁华落尽，一世长安，不过是一场阴阳相隔  
一陌一路一江南，半灼半伤半红尘  
韶华，红衣，许我一场莫失莫忘  
灼伤，离殇，烟雨了春风  
一青一丝一断肠，半碧半落半黄梁  
红颜，心疼，匆忙了痴狂  
情深不寿，莫失莫忘，不过是一场情深不寿  
奈何，伊人，陌上了凄凉  
韶华，白首，洛阳了长安  
你说似水流年情深不寿，后来如花美眷嫁衣杀伐  
你说眉目如画不诉离殇，后来阴阳相隔梨花韶华  
一墨一染一落花，半旧半城半忘川  
莫失莫忘，不诉离殇，不过是一场曲终人散  
古琴，韶华，桃花了天下  
风华，焚尽，人家了爱殇  


简直不要太合拍。  
关键是每秒能写几百万句。  
