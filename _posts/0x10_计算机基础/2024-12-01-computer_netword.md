---
layout: post
title: 【计算机网络】知识体系
categories:
tags: 0x10_计算机基础
keywords:
description:
order: 103
---

## 1. 概述
计算机网络定义：**互连**、**自治** 的计算机集合
- 自治：无主从关系
- 互联

最大的计算机网络：Internet


网络协议（network protocol），三要素：
- 语法（Syntax）
    - 数据与控制信息的结构或格式
    - 如果是底层设备，定义的是信号电平
- 语义（Semantics）
    - 需要发出何种信息
    - 完成何种动作，做出何种响应
    - 差错控制
- 时序（Timing）
    - 事件顺序
    - 速度匹配

物理介质
- DSL：电话线
    - 50kHz-1MHz 用于下行
    - 4kHx-50kHx 用于上行
    - 0kHz-4kHz 用于传统电话
- 电缆网络（电视线）
    - HFC（混合黄线同轴电缆，hybrid fiber coax）
    - 下行 30Mbps，上行 2Mbps
- 光纤
- 移动网络（4G/5G）


internet 结构

![internet](/a/computer/network/internet.gif)

### 网络核心

两两相连是不可能的
- 共需要 N^2 条线路，成本极高
- 每台机器需要连接 N-1 条线路，不可能


![switching](/a/computer/network/switching.gif)

数据交换：如何在多个设备之间传输数据
- 电路交换（circuit switching）：建立一条专用物理电路。
    - 通信质量稳定、线路利用率低
    - 典型例子：电话网络
    - 典型特点：**独占资源**
    - 线路 **多路复用**（multiplexing）
- 报文交换（message switching）：每个报文是一个信息单元（报头+报文主体+报尾），网络中每个中间节点会接收报文，然后根据报头往下转发。报文一个一个发送。延迟大、线路利用率高。
- 分组交换（packet switching）：目前最常用。数据分成若干个 packet，每个有自己的头，在网络中独立转发，在目的地整合。高效、灵活、充分利用网络资源，需要复杂的协议。


**多路复用**： 把链路划分为“片”，使得可以多路独占“片”进行通信
- 频分多路复用(frequency division multiplexing，FDM)
    - 每个用户占用 **频率带宽（Hz）**，始终用对应的频率来通信
    - 例如有线电视信号
- 时分多路复用(time division multiplexing，TDM)
    - 按照时间等长划分，称为 **帧**，每个帧等长划分为多个 **时隙**。每个用户占用一个时隙，周期性使用链路
- 波分多路复用(Wavelength division multiplexing，WDM)
    - 实际上是一种 FDM，光通信中通常用波长来描述
- 码分多路复用(Code division multiplexing，CDM)
    - 广泛用于无线链路共享（蜂窝网络、卫星通信等）
    - 每个用户分配一个唯一的 m bit **码片序列** (chipping sequence)，各用户之间的 码片序列 相互正交
    - 各用户使用相同频率载波，利用各自码片序列编码数据。
    - 
    - CDMA



















## 参考资料

《计算机网络》课程，哈尔滨工业大学，中国大学MOOC [https://www.icourse163.org/course/HIT-154005](https://www.icourse163.org/course/HIT-154005)