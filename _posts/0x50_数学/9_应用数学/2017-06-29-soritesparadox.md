---
layout: post
title: 【逻辑学】连锁悖论、真值度、超赋值理论与认知主义
categories:
tags: 0x59_应用数学
keywords:
description:
order: 98001
---

参考文献：北京大学哲学课----悖论：思维的魔方https://www.coursera.org/

## 什么是连锁悖论？

>连锁悖论（sorites paradox）是古希腊麦加拉学派欧布里德和阿莱克西努提出的一系列疑难中的一种。指一个微小量的连续相加或相减，最后达到一个不同质的事物。这是由逻辑演绎与事实演变的差别而产生的形式思维矛盾。著名的例子有“谷堆论证”和“秃头论证”。

### 几个经典的连锁悖论
悖论1：**谷粒和响声**    
1. 1粒谷子落地没有响声，
2. 如果n粒谷子落地没有响声，那么n粒谷子和1粒谷子落地也没有响声，所以n+1粒谷子落地也没有响声。
3. 所以十万粒谷子落地没有响声。  

悖论2： **秃头论证**   
1. 有十万根头发的人不是秃子。
2. 不是秃子的人少一根头发不是也秃子。
3. 以上命题进行十万次，推导出没头发的人不是秃子。  


### 连锁悖论的分析
连锁悖论是用一系列微小的不准确推出一个荒谬的结论。  

连锁悖论在于模糊谓词。  
模糊谓词的定义：有些词的界限很难定，因此而导致的悖论。  



又由于日常语言交流中，绝大部分都有模糊性。  
所以人们建立了模糊性理论：  

### 模糊性理论
与模糊性理论有关的学派有这些：  
1. 精确语言进路。发展出精确语言代替原本语言。由于这个理论不具有实践性，所以处于边缘地位。  
2. [多值逻辑和真值度理论](#title4)。  
3. [超赋值理论](#title5)。不在经典语义学上真假，而是相对于某种精确化方式为真。  
4. [认知主义](#title6)。模糊性源于我们认知能力的局限性，源于对事物存在状况的无知。  
5. 语境主义。模糊性是语境敏感的，可以通过语境消解。  
6. 虚无主义。模糊谓词没哟精确的外延，包含他们的句子也没有确定的真值。
7. 形而上学的模糊性。世界本身是模糊的。比如云、山


这些理论的区别在于对这几个问题的回答不同：  
1. 模糊性的根源。是语言，外部世界，还是认知？
2. 对经典逻辑，特别是二值原则的态度。保留，否定，还是修改？
3. 以何种方式导致连锁悖论


*下面介绍多值逻辑和真值度理论、超赋值理论、认知主义。*  

#### 多值逻辑和真值度

既然无法把模糊命题分类为真和假，那么给每句话都赋予真值度，真值度介于0,1之间。  

0为假，1为真。  

$[p \land q] = min\{[p],[q]\}$  
$[p \lor q] = max\{[p],[q]\}$  
$[\lnot p] = 1- [p]$  


优点：  
- 可以解决连锁悖论  

然而真值度理论遇到严重挑战：  
- 高阶模糊性。既然0和1都无法确定的分离开来，那么如何能假定多个精确值能代表命题？如果能够精确赋值，那么你已经预先知道精确划分了。  
- “A是秃头，这个命题既不真也不假”这个命题要么是真，要么是假。对多值逻辑的判断，又退回到二值逻辑体系。高阶上仍然承认二值理论不可动摇。
- 复合模糊句的真值度问题。例如：  
$[p]=0.5$，那么$[p \land \lnot p]=0.5$这个结论与二值逻辑结论完全不同。

#### 超赋值理论

模糊性产生的原因在于语义上的不完整或不确定。  
所以试图把模糊谓词精确化，不承认模糊谓词有明确的界限。  

定义超真：对于任意精确化方式，都为真。  
定义超假：对于任意精确化方式，都为假。  




把真分为3种：
1. $T_r$相对于某个精确化方式为真。  
2. $T_s$超真  
3. $T_c$经典逻辑真  

把我们所说的真定义为超真。

例如：定义100根头发为秃头与非秃头的界限，于是模糊谓词精确化了。  
进而，“没头发的人是秃头”这个命题是超真命题。    


**一些定理**：
1. 排中律和矛盾律都是超真的：  
$p \lor \lnot p$在任何精确化方式下都是$T_r$，所以是$T_c$  
$p \land \lnot p$在任何精确化方式下都是$F_r$,所以是$F_c$
2. 超真层次上，L的连接词不再是真值函数项的。例如，$p \lor \lnot p$超真，但是$p$是相对真或者相对假。  
3. 一个存在量化式可以为超真，但它的例证却没有一个为超真。一个全称量化式可以为超假，但是它的例证却没有一个为超假。


超赋值理论解决连锁悖论：使某段论证不对，从而消解连锁悖论。  


**理论优点** ：  
- 解决了连锁悖论
- 对经典逻辑理论改动很小

### 认知主义

客观本身存在截然分明的界限，经典逻辑的二值理论有效。模糊性源自于我们对事物存在的无知。  

由模糊谓词G排定的序列$<a_1,...,a_n>$，有$Ga_i \to Ga_{i+1},\lnot(Ga_i \to Ga_{i+1})$,但你不知道，也不可能知道分界点在哪里。  

例如，客观上存在一个自然数，它是谷堆和非谷堆的界限，然而人不知道。  


对这个理论评价：  
- 承认经典理论的二值逻辑的有效性（其它几个理论都不承认）。
- 其它的解释都修改了经典逻辑理论，所以对传统理论体系产生了震荡。
- 缺点：高度的反直观性。与这个理论不同的是，在常识和直观中，没有任何东西能决定模糊谓词之间截然分明的分界线。


###  特修斯之船
*（连锁悖论的变体）*    
不断维修保养一艘船。    
最后把原有的所有部件都换了。  
还是原来的船吗？  

把原来换下来的部件，组装成一艘船。两艘船是同一艘船吗？哪一艘船是原来的船？  


特修斯之船涉及到一个个体与自身的`同一性问题`。  

个体的区别
: 如何把一个个体当成不同于其他的个体。  

个体的再现    
: 如何把个体当成先前出现的个体。  


#### 特修斯之船的解决

莱布尼茨提出统一不可分辨原则：  
如果任意两个对象是是同一个对象，那么对于任意命题，无法区别  

莱布尼茨同一不可分辨原则
: $\forall x \forall y \forall F(x=y) \to (Fx \to Fy)$  

莱布尼茨不可分辨者的同一原则：  
: $\forall x \forall y \forall F((Fx \to Fy) \to (x=y))$  
