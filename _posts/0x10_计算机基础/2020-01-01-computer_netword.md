---
layout: post
title: 【计算机网络】知识体系
categories: 学习中
tags: 
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

## 数据交换

数据交换：如何在多个设备之间传输数据
- 电路交换（circuit switching）：建立一条专用物理电路。
    - 通信质量稳定、线路利用率低
    - 典型例子：电话网络
    - 典型特点：**独占资源**
    - 经常用 **多路复用**（multiplexing）技术 来提高用户容量。
- 报文交换（message switching）：每个报文是一个信息单元（报头+报文主体+报尾），网络中每个中间节点会接收完整的报文，然后根据报头往下转发。
    - 延迟大、线路利用率高。
    - 典型例子：电报
- 分组交换（packet switching）：报文 分成若干个 packet，每个有自己的头，在网络中独立转发，在目的地整合。高效、灵活、充分利用网络资源，需要复杂的协议。
    - 目前互联网最常用
    - 与报文交换相比。每个中间节点无需等待整个报文接收完毕再转发，而是接收每个 packet 后转发，这使得 **交付时间大大减少**，**所需缓存大大减少**
    - 与电路交换相比。大大提高用户数量。
        - 例如，链路1Mb/s，每个用户需要 100kb/s，活跃时间10%。如果使用电路交换，不活跃时间内不能解除电路独占，因此一个线路能容纳的用户数量为 10个；如果使用使用分组交换，如果有 35个用户，同时有大于10个活动的概率为万分之四
        - 分组交换适用于 **突发** 数据传输，这也是现代网络的特点。
        - 可能产生拥塞（congestion），分组的延迟和丢失




**多路复用**： 把链路划分为“片”，使得可以多路独占“片”进行通信
- **频分多路复用**(frequency division multiplexing，FDM)
    - 每个用户占用 **频率带宽（Hz）**，始终用对应的频率来通信
    - 例如有线电视信号
- **时分多路复用**(time division multiplexing，TDM)
    - 按照时间等长划分，称为 **帧**，每个帧等长划分为多个 **时隙**。每个用户占用一个时隙，周期性使用链路
- **波分多路复用**(Wavelength division multiplexing，WDM)
    - 实际上是一种 FDM，光通信中通常用波长来描述，故而另写一类
- **码分多路复用**(Code division multiplexing，CDM)
    - 广泛用于无线链路共享（蜂窝网络、卫星通信等）
    - 每个用户分配一个唯一的 m bit **码片序列** (chipping sequence)，各用户之间的 码片序列 相互 **正交**（orthogonal）
    - 各用户使用相同频率载波，利用各自码片序列编码数据。
    - 信道上各个用户同时发送信息，这些信息会叠加。解码时用对应的码片序列解码即可
    - CDMA



**码分多路复用** 算法挺有趣，我用python写了一下

![chipping](/a/computer/network/chipping.gif)


```python
import numpy as np


def is_orthogonal(chipping1, chipping2) -> bool:
    # 确保正交
    dot_sum = np.sum(chipping1 * chipping2)
    return dot_sum == 0


def encode(msg, chipping):
    res = list()
    for i in msg:
        res.extend((i * chipping).tolist())

    return np.array(res)


def mix(p1, p2):
    return p1 + p2


def decode(p, chipping):
    length_chipping = len(chipping)
    length = len(p) // length_chipping

    res = []
    for i in range(length):
        p_slice = p[i * length_chipping:(i + 1) * length_chipping]
        if np.mean(p_slice * chipping) > 0:
            p_val = 1
        elif np.mean(p_slice * chipping) < 0:
            p_val = -1
        else:
            p_val = 0  # 表示没有传递数据
        res.append(p_val)
    return res


msg1 = [-1, 1, 1, 1, -1]
msg2 = [1, -1, -1, 1, 1]

chipping1 = np.array([1, 1, 1, -1, 1, -1, -1, -1])
chipping2 = np.array([1, -1, 1, 1, 1, -1, 1, 1])

assert is_orthogonal(chipping1, chipping2), "两个码片序列必须正交"

print("用户1", msg1)
print("用户2", msg2)

p1 = encode(msg1, chipping1)
p2 = encode(msg2, chipping2)

p = mix(p1, p2)
print("编码后传递的数据=", p)

res1 = decode(p, chipping1)
res2 = decode(p, chipping2)

print("用户1解码", res1)
print("用户2解码", msg2)
```


## 计算机网络性能

- **速率**（数据率，data rate，数据传输率，比特率，bit rate）
    - 每秒传输的信息量。
    - 单位为 `b/s`, `bps`, `kbs`, `Mbs`, `Gbs`
    - 往往标定的是是额定速率（理想状况下的速率）
- **带宽**（bandwidth）
    - 原本指最高频率与最低频率之差（单位 Hz）
    - 计算机网络中，指的是所能传输的“最高数据率”（单位 bps）
- **延迟**（时延，delay，latency）
    - 原因：在某路由节点，分组到达速率超过容量，分组只好排队等待。如果缓存满了，分组还会被丢弃，叫做 **丢包**（loss）
    - 延迟为4个延迟的总和：
    - **节点处理延迟**（nodal processing delay）。节点处理导致的延迟
        - 差错检测
        - 确定输出链路
        - 通常小于 1ms，通常讨论可忽略
    - **排队延迟**（queueing delay）
        - 等待输出链路可用
        - 取决于路由器拥塞程度
        - 其值是不确定的
    - **传输延迟**（transmission delay）：发送信号所需时间。取决于：1）分组大小（bits）；2）链路带宽（bps）
    - **传播延迟**（propagation delay）：信号在物理介质上的传播速度。取决于：1）物理链路长度；2）信号本身的传播速度，例如铜缆中信号传播速度是 0.8倍光速
    - 传输延迟和传播延迟有严格区别。类比：前者类似高速收费站的处理能力（一辆卡车通过，流程要多久），后者类似卡车在高速公路上一个收费站到下一个收费站跑了多久。


**时延带宽积** = 传播时延 x 带宽




## 参考资料

《计算机网络》课程，哈尔滨工业大学，中国大学MOOC [https://www.icourse163.org/course/HIT-154005](https://www.icourse163.org/course/HIT-154005)