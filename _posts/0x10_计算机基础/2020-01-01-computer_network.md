---
layout: post
title: 【学习中】计算机网络
categories: 学习中
tags: 
keywords:
description:
order: 103
---

## 概述
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
    - 4kHz-50kHz 用于上行
    - 0kHz-4kHz 用于传统电话
- 电缆网络（电视线）
    - HFC（混合光纤同轴电缆，hybrid fiber coaxial）
    - 下行 30Mbps，上行 2Mbps
- 光纤
- 移动网络（4G/5G）


internet 结构

![internet](/a/computer/network/internet.gif)


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

性能1
- **速率**（数据率，data rate，数据传输率，比特率，bit rate）
    - 每秒传输的信息量。
    - 单位为 `b/s`, `bps`, `kbs`, `Mbs`, `Gbs`
    - 往往标定的是是 **额定速率**（理想状况下的速率）
- **带宽**（bandwidth）
    - 原本指最高频率与最低频率之差（单位 Hz）
    - 计算机网络中，指的是所能传输的“最高数据率”（单位 bps）
- **延迟**（时延，delay，latency）
    - 原因：在某路由节点，分组到达速率超过容量，分组只好排队等待。如果缓存队列满了，分组还会被丢弃，叫做 **丢包**（loss）
    - 分组交换网络的延迟为4个延迟的总和：
    - **节点处理延迟**（nodal processing delay）。节点处理导致的延迟
        - 差错检测、确定输出链路
        - 通常小于 1ms，通常讨论可忽略。做路由器内部优化需要重点关注的。
    - **排队延迟**（queueing delay）
        - 等待输出链路可用
        - 取决于路由器拥塞程度
        - 其值是不确定的
    - **传输延迟**（transmission delay）：发送信号所需时间。
        - 取决于：1）分组大小（bits）；2）链路带宽（bps）。
        - 传输延迟=分组长度/链路带宽
    - **传播延迟**（propagation delay）：信号在物理介质上的传播速度。
        - 取决于：1）物理链路长度；2）信号本身的传播速度，例如铜缆中信号传播速度是 0.7倍光速
        - 传播延迟=物理链路长度/信号本身的传播速度
    - 传输延迟和传播延迟有严格区别。
        - 类比：前者类似高速收费站的处理能力（一个卡车车队通过收费站时，第一辆发车到最后一辆离开收费站，所用的时间），后者类似卡车在高速公路上一个收费站到下一个收费站跑了多久。
    - 两个节点之间的时间=节点处理延迟+排队延迟+传输延迟+传播延迟


**排队延迟**的计量  
- 假设：
    - R：链路带宽 （bps）
    - L：分组长度（bits）
    - a：平均分组到达速率
- **流量强度** （traffic intensity）=La/R
    - 如果 La/R 接近零，平均排队延迟很小
    - 如果 La/R 接近1，平均排队延迟很大
    - 如果 La/R>1，超出服务能力，平均排队延迟无限大
- 他们的关系如下：

![](/a/computer/network/speed.gif)



性能2
- **时延带宽积** = 传播延迟 x 带宽
    - 相当于：第一个比特到达终点时，整个链路上有多少个比特
    - 也可以称为 **比特长度**，就是某段链路有多少个比特
    - ![](/a/computer/network/bdp.gif)
- 分组丢失（丢包）
    - **丢包率** = 丢包数/总包数
- **吞吐量**（吞吐率，Throughput）：发送端与接收端之间的传送数据速率（bps）
    - 取决于各链路中吞吐量最小的那个，最小的那个叫做 **瓶颈链路**（bottleneck link）
    - 即时吞吐量（某时刻的速率）
    - 平均吞吐量（一段时间的平均速率）


## 计算机网络体系结构

为什么需要计算机网络体系结构？
- 计算机网络十分复杂，涉及到许多组成：主机（hosts）、路由器（routers）、各种链路（links）、应用（applications）、协议（protocols）、硬件、软件、……
- 问题:如何描述它，至少让我们可以讨论它


**计算机网络体系结构**（简称网络体系结构，network architecture）
- 是从 **功能上** 描述计算机网络结构（而不是从硬件上描述）
- 是 **分层结构**
- 每层遵循某个/些 **网络协议** 完成本层功能
- 是计算机网络的各层及其协议的集合
- 是一个计算机网络的功能层次及其关系的 **定义**
- 是 **抽象的**


为什么采用分层结构?
- 结构清晰，有利于识别复杂系统的部件及其关系
    - 也叫做分层的 **参考模型**（reference model）
- 模块化的分层易于系统更新、维护
    - 任何一层服务实现的改变对于系统其它层都是透明的
    - 例如，登机过程的改变并不影响航空系统的其它部分（层）
- 有利于标准化
- 分层是否有缺点？
    - 分层太多：效率变低
    - 某些特殊网络（如传感器），会做跨层设计，以提高效率



![architecture](/a/computer/network/architecture.gif)


### OSI模型


- 开放系统互连 (OSI)参考模型是由国际标准化组织 (ISO) 于1984年提出的分层网络体系结构模型
- 目的是支持 **异构网络系统** 的互联互通
- 理论模型。理论成功，市场失败
- 功能上划分 **7层**，每层完成特定的网络功能


![osi1](/a/computer/network/osi1.gif)

解释
- 上面的实线表示物理层面上数据的流动，虚线表示逻辑层面上的数据流动
- 前4个层次，不需要中间系统实现，叫做 **end-end层**

![osi2](/a/computer/network/osi2.gif)


解释
- 每一步都增加 **控制信息**，包括
    - **地址**（Address）：标识发送端/接收端
    - **差错检测**（Error-detecting code）
    - **协议控制**（Protocol control）：协议中的附加信息，例如优先级、服务质量、安全控制等


**1. 物理层**：完成每个比特的传输
- 定义 **接口特性**，它包括4个方面：
    - 机械特性：插口类型、位置
    - 电气特性：电平、电压等
    - 功能特性：多少个引脚，每个引脚的功能
    - 规程特性：规定通信过程
- 定义 **比特编码**，如何表示0/1
    - 什么样的调制技术/编码技术
- 定义 **数据率**，以多快速度发送
- 解决 **比特同步**，防止错过/提前接收一个比特，导致接收的比特错误
    - 时钟同步
- 定义 **传输模式**
    - 单工（Simplex），只能单向通信（传统电视）
    - 半双工（half-duplex），交替双向，两边不能同时向对方发信息（对讲机）
    - 全双工（full-duplex），双方可以同时向对方发送信息，一般用两个独立信道


**2.数据链路层**，谁接收、错误如何纠正
- 负责 **结点-结点（node-node）** （两个相邻节点）数据传输
- 数据单位是 **帧**
- **组帧**（Framing）：加头加尾，目的是接收方接收比特流后正确切分
- **物理寻址**（Physical addressing）
    - 帧头中有发送端/接收端的 **物理地址**（物理地址标识）
- **流量控制**（Flow control）
    - 匹配发送端和接收端的速度。避免淹没接收端。
- **差错控制**（Error control）
- **访问（接入）控制**（Access control）
    - 任意给定时刻，哪个设备有物理介质的使用权


**3.网络层**
- 负责 **源主机到目的主机** 数据分组（packet）交付
    - 可能穿越多个网络
- **逻辑寻址**（Logical addressing）
    - **全局唯一** 的逻辑地址，确保数据分组被送达目的主机，如IP地址
- **路由**（routing）
    - 路径选择
- **分组转发**：每个节点收到一个分组，按照路由完成转发



![osi3](/a/computer/network/osi3.gif)

图片解释：
1. 上面分组中的 S 和 D 是网络层添加的。它标记了源主机/目的主机的地址
2. 数字是数据链路层添加的，它标记了每个节点时间的源/目的


**4.传输层**
- 完成端到端的、完整报文的传输。接受：来自会话层的完整报文；完成：完成报文的传输。
- **分段和重组**，发送端：把报文分割为段；接收端：把段重新组合成完整的报文
- **SAP寻址**
    - 确保把完整报文提交给正确的 **进程**（例如端口号）
- 端到端的 **连接控制**，建立、维护、拆除。这里的连接是逻辑上的连接
- 端到端的 **流量控制**
- **差错控制**


**5.会话层**
- **对话控制**（dialog controlling）：建立、维护、拆除
- **同步**（synchronization）：在数据中插入n个“同步点”。一旦传输中断，可以从上一个“同步点”继续传输。
- 功能最少的一层。实际应用中，这一层不是单独存在的。


**6.表示**：处理两个系统见交换信息的 **语法和语义**（syntax and semantics）问题
- **数据表示转化**，例如大端数/小端数
    - 转换为主机独立的编码，接收端再解码
- **加密/解密**
- **压缩/解压缩**
- 实际应用中。这一层也不是独立存在的。


**7.应用层**：不同的应用对应不同的应用层协议，例如：HTTP、FTP、SMTP
- 支持用户使用用户代理（如浏览器、邮箱软件）或网络接口使用网络



### 其它模型

**TCP/IP参考模型**
- 共4层
- 所有应用都架构在IP上
- IP之上是 TCP 和 UDP
- 网络接口层没有定义具体协议，只要求其能够封装 IP分组，使其能在结点间传输


![tcp_ip_model](/a/computer/network/tcp_ip_model.gif)



**5层参考模型**：把 TCP/IP 的 “网络接口层”分为两层：“数据链路层”、“物理层”
- **应用层** : 支持各种网络应用
    - FTP, SMTP, HTTP
- **传输层** : 进程-进程的数据传输
    - TCP, UDP
- **网络层** : 源主机到目的主机的数据分组路由与转发
    - IP协议、路由协议等
- **链路层** : 相邻网络元素（主机、交换机、路由器等）的数据传输
    - 以太网（Ethernet）、802.11 (WiFi)、PPP
- **物理层** : 比特传输

![5layer_model](/a/computer/network/5layer_model.gif)

## 应用层

**网络应用的体系结构**
- **C/S**（客户机/服务器，Client-Server）
    - 服务器：1）7x24小时提供服务、2）永久性访问地址/域名、3）利用大量服务器实现可扩展性
    - 客户机：1）与服务器通信，使用服务器的服务，2）间歇性接入网络，3）可能使用动态IP，4）不与其它客户机直接通信
    - 典型例子是 Web：服务器运行Web服务，客户机上运行游览器
- **P2P**（点对点结构，Peer-to-Peer）
    - 没有永远在线的服务器
    - 任意端/节点之间可以直接通讯
    - 节点间歇性接入网络
    - 节点可能改变IP地址
    - 典型例子：BT下载
    - 优点：高度可伸缩。缺点：难以管理
- 混合结构（Hybrid）。 C/S和P2P的混合
    - 典型例子：Napster，文件传输用P2P，文件搜索用C/S



进程通信
- 同一主机上运行的进程之间的通信。**进程间通信**，操作系统提供了各种方式。
- 不同主机上运行的进程之间：消息交换（报文交换）
    - 客户机进程：发起通信的进程
    - 服务器进程：等待通信请求的进程
    - P2P也有以上进程


**socket**：一种编程接口（API），为网络通信提供一种抽象的数据通道
- 操作系统提供
- 可用于同一个主机、不同主机之间的通信



不同主机之间的进程间通信需要 **标识符**：IP地址+端口号
- HTTP Server：80
- Mail Server：25


**应用层协议**
- 公开协议
    - 由 RFC（Request For Comments）定义
    - 允许互操作
    - 例如：HTTP，SMTP，...
- 私有协议
    - P2P 文件共享应用
    - 可以自己设计协议


**应用层协议** 的内容
- 消息的类型(type)
    - 请求消息
    - 响应消息
- 消息的语法(syntax)/格式
    - 消息中有哪些字段(field)？
    - 每个字段如何描述
- 字段的语义(semantics)
    - 字段中信息的含义
- 规则(rules)
    - 进程何时发送/响应消息
    - 进程如何发送/响应消息


**网络应用的需求与传输层服务**







**网络应用的服务需求**
- 数据丢失(data loss)/可靠性(reliability)
    - 某些网络应用能够容忍一定的数据丢失：网络电话、在线视频
    - 某些网络应用要求100%可靠的数据传输：文件传输，telnet、网上银行
- 时间(timing)/延迟(delay)
    - 有些应用只有在延迟足够低时才“有效”
    - 网络电话/网络游戏
- 带宽(bandwidth)
    - 某些应用只有在带宽达到最低要求时才“有效”：在线视频
    - 某些应用能够适应任何带宽：email、文件下载
- 其它需求
    - 安全等


Internet传输层服务模型
- **TCP服务**
    - 面向连接: 客户机/服务器进程间
        - 需要建立连接
        - 双工
    - 可靠的传输
    - 流量控制: 发送方不会发送速度过快，超过接收方的处理能力
    - 拥塞控制: 当网络负载过重时能够限制发送方的发送速度
    - 不提供：
        - 时间/延迟保障
        - 最小带宽保障
- **UDP服务**
    - 无连接
    - 不可靠的数据传输，不提供：
        - 可靠性保障
        - 流量控制
        - 拥塞控制
        - 延迟保障
        - 带宽保障
    - 例子：网络电话、网络视频

### Web 应用

- Word Wide Web
- 网页（Web page）包含多个对象（Objects）
    - HTML文件、JPEG图片、动态脚本等
- 对象的寻址
   - URL（Uniform Recourse Locator）：统一资源定位器 *RFC1738*
   - `Scheme://host:port/path` 
       - scheme:协议
- **HTTP协议**（超文本传输协议，Hyper Text Transfer Protocol）
    - C/S结构
       - S端一般用 Apache Web
       - C端可以是各种浏览器
    - HTTP协议版本：1.0:*RFC1945*，1.1:*RFC2068*
- HTTP 依赖 TCP 
    - 服务器在80端口等待客户请求
    - 浏览器发起到服务器的TCP连接（创建 Socket）
    - 服务器接受来自浏览器的TCP连接
    - 浏览器与Web服务器交换HTTP消息
    - 关闭TCP连接
- **无状态**（stateless）：服务器不维护任何有关客户端过去发送的请求




**HTTP连接**
- **非持久性连接**(NonpersistentHTTP)
    - 每个TCP连接最多允许传输一个对象
    - HTTP 1.0版本
- **持久性连接**(Persistent HTTP)
    - 每个TCP连接允许传输多个对象
    - HTTP 1.1版本默认


![http1](/a/computer/network/http1.gif)

缺点：
- 响应时间
    - 定义 RTT（Round Trip Time）：客户端发送极小数据，然后服务器返回数据所用的时间
    - 每个对象的响应时间 = 2RTT+文件传输时间
    - 如果有10个jpeg，还额外需要 20RTT + 文件传输时间
- TCP 连接过多
    - 服务器需要为每个 TCP 连接开销资源
    - 浏览器为了提高性能会并行打开多个 TCP 连接，导致服务器性能消耗很大
- 解决：**持久性连接**


持久性连接
- 发送响应后，服务器保持 TCP 连接的打开
- 后续的 HTTP 消息继续使用这个连接发送
- 每个对象时间消耗只有 1RTT+件传输时间
    - 无pipelining：串行，每个对象1个 RTT
    - 带pipeline：并行，所有耗时1RTT


**HTTP消息**

HTTP消息分为两种：
- **request**
- **response**



![http_request1](/a/computer/network/http_request1.gif)



![http_request2](/a/computer/network/http_request2.gif)



上传数据的方法
- POST
    - 例如：表格（form）
    - 方法：在请求消息的消息体（entity body）上传
- GET
    - 方法：把数据放到 URL 字段
    - 适用于数据量较少的情况


方法类型
- HTTP/1.0
    - GET
    - POST
    - HEAD：不要把请求的对象放入响应消息中。往往用来做测试。
- HTTP/1.1
    - GET、POST、HEAD
    - PUT：把消息体中的文件传到URL字段所指定的路径。用于上传文件。
    - DELETE：删除URL字段路径对应的文件



![http_response](/a/computer/network/http_response.gif)

其中常见的 **响应状态码**：
- `200 OK`
- `301 Moved Permanently`
- `400 Bad Request`
- `403 Forbidden`: 无权限访问
- `404 Not Found`
- `500 Internal Server Error`: 服务器内部错误
- `505 HTTP Version Not Supported`



**Cookie技术**
- HTTP 是无状态的
- 但很多网站需要辨别用户身份、进行session跟踪
- Cookie 是储存在用户本地终端上的数据（通常经过加密）。
- *RFC6265*

Cookie的组件
- HTTP响应消息的cookie头部行
- HTTP请求消息的cookie头部行
- 保存在客户端主机上的cookie文件，由浏览器管理
- Web服务器端的后台数据库

Cookie 的用途
- 身份认证
- 购物车
- 推荐


Cookie 的缺点：隐私问题

**Web缓存**

优点：
- 减少响应时间
- 减少组织的流量


如何做？
- 用户不访问原始服务器，而是向缓存/代理服务器发送所有HTTP请求
    - 如果请求对象在缓存服务器中，则直接返回给用户
    - 否则，缓存服务器向原始服务器发送 HTTP 请求，然后返回给用户。（同时缓存服务器保存对象）
- 一般 ISP 架设

一致性问题：缓存服务器如何判断原始服务器的内容是不是变了？
- 缓存服务器发送 `If-modified-since:<data>`
- 服务器：如果缓存的版本是最新的，则response 不包含对象的 `HTTP/1.0 304 Not Modified`，这就极大节省了流量/时间。


### Email应用


Email应用的构成组件
- 邮件客户端(user agent)
    - 读、写Email消息
    - 与服务器交互，收、发Email消息
    - Outlook, Foxmail, Thunderbird
    - Web客户端
- 邮件服务器(Mail Server)
    - 邮箱：存储发给该用户的Email
    - 消息队列(message queue)：存储等待发送的Email
- SMTP协议(Simple Mail Transfer Protocol)
    - 邮件服务器之间传递消息所使用的协议
    - 客户端：发送消息的服务器
    - 服务器：接收消息的服务器


SMTP协议: RFC 2821
- 使用TCP进行email消息的可靠传输
- 端口 25
- 传输过程的三个阶段
    - 握手
    - 消息的传输
    - 关闭
- 命令/响应交互模式
    - 命令(command): ASCII文本
    - 响应(response): 状态代码和语句
- Email消息只能包含7位ASCII码
    - 利用 回车+换行+句号 `CRLF.CRLF` 确定消息的结束



一些协议


| 协议/标准  | 主要作用 | 说明 |
|------------|----------|------------|
| **SMTP** (Simple Mail Transfer Protocol) | 客户端→服务器，服务器→服务器 | RFC 2821 (被 RFC 5322 取代)
| **POP**(Post Office Protocol) | 服务器→客户端<br>将服务器上的邮件下载到本地，然后在服务器上删除 | RFC 1939 <br> 最成熟、最普及的是 POP3 <br> IMAP 是其替代者
|**IMAP**(Internet Mail Access Protocol) | 服务器↔客户端 <br>在服务器上管理和同步邮件<br> 更多功能、更加复杂、能够操纵服务器上存储的消息 | RFC 1730
| HTTP | 网页客户端 |
| RFC 822     | 定义邮件基本格式（头+体） | 被 RFC 5322 取代 |
| RFC 2045    | 定义 MIME 类型和编码 | 活跃 |
| RFC 2056    | 定义 MIME 安全扩展 | 活跃但部分内容已替代 |




![smtp](/a/computer/network/smtp.gif)


SMTP 交互示例

```sh
S: 220 hamburger.edu
C: HELO crepes.fr
S: 250 Hello crepes.fr, pleased to meet you
C: MAIL FROM: <alice@crepes.fr>
S: 250 alice@crepes.fr... Sender ok
C: RCPT TO: <bob@hamburger.edu>
S: 250 bob@hamburger.edu ... Recipient ok
C: DATA
S: 354 Enter mail, end with "." on a line by itself
C: Do you like ketchup?
C: How about pickles?
C: .
S: 250 Message accepted for delivery
C: QUIT
S: 221 hamburger.edu closing connection
```


安装telnet

```bash
sudo apt update
sudo apt install telnet

# 现代都强制用 SSL 加密传输
sudo apt install openssl

```



用 telnet 发送邮件
```

telnet smtp.qq.com 25

HELO qq.com

```



SMTP 与 HTTP 对比
- HTTP：客户端主动拉取（pull）数据。SMTP：客户端主动推送（push）数据到服务器。
- 都是 request/response 交互模式
- 命令和状态码都是 ASCII 码
- HTTP：每个对象封装在独立的响应消息中
- SMTP：多个对象由多个部分构成的消息中发送


SMTP 和 POP3
- *RFC822*:邮件基本格式
    - **header**，包含 To、From、Subject
    - **body**，消息本身（只能是 ASCII 字符）
- MIME：多媒体邮件扩展 *RFC2045, 2056*
    - 在 header 增加额外的行以声明MIME的内容类型



邮件访问协议：从服务器获取邮件
- POP
    - 认证/授权(客户端->服务器)和下载
- IMAP
- HTTP：163, QQ Mail等。


**POP协议**
- 认证过程
    - 客户端命令
        - `User`：声明用户名
        - `Pass`: 声明密码
    - 服务器响应
        - +OK
        - -ERR
- 事务阶段
    - List：列出消息数量
    - Retr：用编号获取消息
    - Dele: 删除消息
    - Quit


**POP协议**
- “下载并删除”模式
    - 用户如果换了客户端软件，无法重读该邮件
- “下载并保持”模式：不同客户端都可以保留消息的拷贝
- POP3是无状态的


**IMAP协议**
- 所有消息统一保存在一个地方：服务器
- 允许用户利用文件夹组织消息
- IMAP支持跨会话(Session)的用户状态:
    - 文件夹的名字
    - 文件夹与消息ID之间的映射等



### DNS应用

问题：把域名翻译到IP地址

DNS
- 多层命名服务器构成的分布式数据库
- 应用层协议：完成名字的解析
    - 提供Internet核心功能
    - 用应用层协议实现
    - 网络边界复杂


DNS服务
- 域名向IP地址的翻译
- 主机别名
- 邮件服务器别名
- 负载均衡：Web 服务器轮流排在前面

问题：为什么不使用集中式的DNS？
- 单点失败问题。集中式一旦某台服务器坏了，整个互联网就坏了。
- 流量问题。几十亿台主机都在单台服务器查询。
- 距离问题。
- 维护性问题


DNS采用 分布式、层次式数据库

![DNS](/a/computer/network/dns1.gif)




客户端想要查询 www.guofei.site 的IP
- 客户端查询根服务器，找到 site 域名解析服务器
- 客户端查询 site 域名解析服务器，找到 guofei.site 域名解析服务器
- 客户端查询 guofei.site 域名解析服务器，获得 www.guofei.site 的IP地址


DNS的层级
- **DNS 根域名服务器**
    - 本地域名解析服务无法解析域名时，访问根域名服务器
    - 全球共13个
- 顶级域名服务器（TLD，top-level domain）
    - 负责 com、org、net、edu、cn、uk、fr 等顶级域名
- 权威（Authoritative）域名服务器
    - 组织（例如大学）维护
    - 服务提供商维护
- Local DNS server（不属于层级体系）
    - ISP 提供
    - 默认的域名解析服务器
    - 主机进行 DNS 查询时，查询先发送到本地域名解析服务器
        - 本地域名解析服务器作为代理（proxy），将查询转发给（层级式）域名解析服务器系统


DNS查询有两种：**迭代查询** 和 **递归查询**


**迭代查询：**
![迭代查询](/a/computer/network/dns2.gif)


**递归查询：**
![迭代查询](/a/computer/network/dns3.gif)
递归查询


缓存
- 一段时间后，缓存失效
- Local DNS server 会缓存顶级域名服务器的映射
    - 因此根域名服务器不经常被访问

**DNS的格式**
- DNS的记录是 **资源记录**（RR，resource records），是一个四元组，（name，value，type，ttl）
- `Type=A`，Name:主机域名，Value：IP地址
- `Type=NS`，Name：域（edu.cn），Value：域权威域名解析服务器的主机域名。就是，根据域给出对应能解析的服务器。
- `Type=CNAME`，Name：别名，Value：真实域名。实现别名服务。
- `Type=MX`，Value是Name对应的邮件服务器



DNS协议：
- **查询**(query)和 **回复**(reply消息)
- 两则格式相同
- 消息头部


![DNS消息格式](/a/computer/network/dns4.gif)



### P2P应用

Peer-to-peer
- 没有服务器
- 任意端系统之间直接通信
- 节点阶段性接入Internet
- 节点可能更换IP地址


![P2P耗时计算](/a/computer/network/p2p1.gif)


C/S 和 P2P 分发总时间
- C/S架构下，
    - 服务器需要发送N个副本，用时 $NF/u_s$
    - 客户机i下载需要 $f/\min(d_i)$
    - 总耗时：$\max \{ NF/u_s,f/\min(d_i)） \}$
    - **N较大时线性增长**
- P2P架构下，
    - 服务器需要发送1个副本，用时 $F/u_s$
    - 客户机i需要 $F/d_i$ 下载时间
    - 整个网络的总上传速度为 $u_s+\sum u_i$
    - 总耗时 $\max \{ F/u_s, F/\min(d_i), NF/(u_s+\sum u_i)    \}$
    - **N足够大时，耗时增长很慢**


![CS与P2P比较](/a/computer/network/p2p2.gif)


BitTorrent
- 文件划分为 256KB 的chunk
- 节点加入torrent
- 下载的同时，节点需要向其他节点上传
chunk
- 节点可能加入或离开，所以是动态的
- 一旦节点获得完整的文件，它可能离开（自私）或留下（无私）
- 获取chunk
    - 给定任一时刻，不同的节点持有文件的不同chunk集合
    - 节点(Alice)定期查询每个邻居所持有的chunk列表
    - 节点发送请求，请求获取缺失的chunk
        - 稀缺优先。例如，某个chunk有3个提供，另一个chuck有100个节点提供，则会优先获取前者，防止3个节点都下线。
- 发送chunk: tit-for-tat（以牙还牙）
    - Alice向4个邻居发送chunk：正在向其发送Chunk，速率最快的4个
        - 每10秒重新评估top 4
    - 每30秒随机选择一个其他节点，向其发送chunk
        -  新选择节点可能加入top 4
        - “optimistically unchoke”
    - 因此，最终效果是，上传的越快，下载的也快


#### P2P的索引技术

**索引** 是信息到节点位置（IP+端口号）的映射
- 文件共享(电驴)
    - 索引动态跟踪节点所共享的文件
    - 节点告诉索引它拥有哪些文件
    - 节点询问索引，从而获知能够得到哪些文件
- 即时消息(QQ)
    - 索引负责将用户名映射到位置
    - 当用户开启IM应用时，需要通知索引它的位置
    - 节点检索索引，确定用户的IP地址


方案1：**集中式索引**（Napster最早采用这种设计）
- 节点加入时，通知中央服务器：IP地址、内容
- Alice 查找 “xx.avi”
- Alice 从 Bob 处请求文件

特点：内容和文件传输是分布式的，但是内容定位是高度集中式的
- 单点失效问题。中央服务器崩了，整个服务就会失败
- 性能瓶颈。节点的动态更新、查找都向中央服务器报告，
- 版权问题。Napster 被诉讼关闭正是由于集中式架构让它暴露于版权监管之下。



方案2:**洪泛式查询**: Query flooding
- 完全分布式架构
- Gnutella采用这种架构
- 每个节点对它共享的文件进行索引，且只对它共享的文件进行索引
- 覆盖网络(overlay network): Graph
    - 节点X与Y之间如果有TCP连接，那么构成一个边
    - 所有的活动节点和边构成覆盖网络
    - 边：虚拟链路
    - 节点一般邻居数少于10个


查询方法：
- A节点向邻居发送查询消息
- 每个邻居转发查询消息
- 如果查询命中，则利用反向路径发回查询节点

缺点：
1. 消息泛滥，给网络带来很大的负担
2. 节点刚加入时，有很多需要处理的消息


![洪泛式](/a/computer/network/p2p_flooding.gif)




方案3:**层次式覆盖网络**。集中式索引和洪泛查询的结合
- 节点分为两种：普通节点、超级节点
- 节点和超级节点间维持TCP连接
- 某些超级节点之间维持TCP连接
- 超级节点负责跟踪子节点的内容
- 一旦完成查询，仍然是点对点的传输
- 例子：Skype


![层次式覆盖网络](/a/computer/network/p2p3.gif)



### Socket编程

![端上的网络开发](/a/computer/network/socket1.gif)

应用编程接口API（Application Programming Interface）
- 传输层、网络层、数据链路层、物理层是由操作系统提供的
- Socket API 是事实上的工业标准，绝大多数操作系统都支持
- 是Internet网络应用最常用的 API
- 通信模型：客户/服务器（C/S）
- Socket 提供了应用进程间通信的抽象机制


Socket 定位
- 对外，IP+端口号
- 操作系统/进程，使用 **socket descriptor**（一个小整数）

Socket 抽象
- 类似文件的抽象
- 进程创建 Socket 时候，操作系统分配一个数据结构存储相关信息
```c
struct sockaddr_in
{
u_char sin_len; /*地址长度 */
u_char sin_family; /*地址族(TCP/IP：AF_INET；非TCP/IP则是其他值) */
u_short sin_port; /*端口号 */
struct in_addr sin_addr; /*IP地址 */
char sin_zero[8]; /*未用(置0) */
}
```

Socket API（WinSock）
- 初始化 `WSAStartup`
    - 参数1:WinSock版本
    - 参数2:指向WSDATA的指针
- 释放 `WSACleanup`
- 创建 `sd = socket(protofamily,type,proto);`
    - protofamily:协议族。如果是 TCP/IP，则 `protofamily = AF_INET`
    - type:类型
        - `SOCK_STREAM` TCP协议
        - `SOCK_DGRAM` UDP 协议
        - `SOCK_RAW` 直接向网络层（需要root权限）
    - proto：协议号，默认0
    - 创建流式 Socket
    ```c
    struct protoent *p;
    p=getprotobyname("tcp");
    SOCKET sd=socket(PF_INET,SOCK_STREAM,p->p_proto);
    ```
    - TCP：可靠、有连接、字节流传输、点对点
    - UDP：不可靠、无连接（不用连接直接发送）、数据报传输
- 关闭 `closesocket`
    - 如果多个进程共享一个 socket，引用计数减1，减到0才关闭
    - 一个进程的多线程共享一个 socket，引用计数算成1
- socket 绑定本地端点地址（IP+端口号）`bind(sd,localaddr,addrlen)`
    - 客户端不用调用，会在 `connect()` 时自动分配端口
    - 服务器端，可以用地址通配符 `INADDR_ANY`，来指定任意IP
- `listen(sd,queuesize)` 置 socket 为监听状态
    - 仅用于服务端，仅用于 TCP
    - queuesize，请求队列大小
- `connect(sd,saddr,saddrlen)`
    - 仅用于客户端
    - saddr：目的主机的端口
    - 可用于 TCP/UDP
- `accept(sd,caddr,caddrlen)` 从监听队列中取出一个
    - 仅用于 TCP
    - 仅用于服务器
    - 会创建一个新的 Socket，接下来用新的 socket 与该客户机通信。（目的是实现并发为多个客户机服务）
- 发送数据 `send(sd,*buf,len,flags);`，`sendto(sd,*buf,len,flags,destaddr,addrlen)`
    - `send` 用于 TCP，或者调用了 connect 的 UDP
    - `sendto` 用于 UDP 服务器端 socket，或者 未调用 connect 的客户端 socket
- 接收数据 `recv(sd,*buffer,len,flags);` 和 `recvfrom(sd,*buf,len,flags,senderaddr,saddrlen);`
    - `recv` 从 TCP 接收数据，或者 调用了 connect 的 UDP 客户端
    - `recvfrom` 从 UDP 服务器端接收，或者 未调用 connect 的 UDP 客户端接收
- `setsocketopt` 和 `getsocketopt` 设置和获取 socket 参数


字节格式转化
- “表示层”处理字节顺序（例如大端、小端），但 TCP/IP 协议也规定了标准。
- 因此在使用 socket 的时候可以把本地字节顺序转换为网络字节顺序。socket 提供了一系列的转换函数。




![Socket API（TCP）调用流程](/a/computer/network/socket2.gif)


### Socket编程-客户端软件设计

- 解析服务器IP地址
    - 客户端可能使用 **域名** 或 **IP地址** 标识服务器
    - `inet_addr()` IP地址的进制转换 
    - `gethostbyname()` 域名到IP的转换
- 解析端口号
    - 客户端可能使用 **服务名** 标识服务器端口号
    - 例如 HTTP 对应 80
    - 函数 `getservbyname()` 从服务名获取端口号
- 解析协议号
    - 例如 TCP 对应 6
    - `getprotobyname()` 从协议名获取端口号



TCP 客户端软件流程
1. 确定服务器IP地址与端口号
2. 创建 socket
3. 分配本地端点地址（IP地址+端口号）。
    - 自动完成
    - IP通常是内网（192.168.x.x）或者公网IP
    - 端口号是操作系统临时分配的，通常在 49152~65535 之间
4. 连接服务器（socket）
5. 遵循应用层协议进行通信
6. 关闭/释放连接

UDP 客户端软件流程
1. 确定服务器IP地址与端口号
2. 创建 socket
3. 分配本地端点地址（IP地址+端口号）
4. 指定服务器端点地址，构造UDP数据报
5. 遵循应用层协议进行通信
6. 关闭/释放 socket

### Socket编程-服务器软件设计

4种类型
- **循环无连接**(Iterative connectionless) 服务器
    - 顺序处理客户请求，无并发
- **循环面向连接**(Iterative connection-oriented) 服务器
- **并发无连接**(Concurrent connectionless) 服务器
- **并发面向连接**(Concurrent connection-oriented) 服务器



**循环无连接**
1. 创建 socket
2. 绑定端点地址（INADDR_ANY+端口号）
3. 反复接收来自客户端的请求
4. 遵循应用层协议，构造响应报文，发送给客户 （使用 `sendto`）。回到3，处理下一个客户请求。


**循环面向连接**
1. 创建（主）socket，并绑定熟知端口号(`bind()`)；
2. 设置（主）socket为被动监听模式(`listen()`)，准备用于服务器；
3. 调用 `accept()` 函数接收下一个连接请求（通过主socket），创建新socket用于与该客户建立连接；
4. 遵循应用层协议，反复接收客户请求，构造并发送响应(通过新socket)；
5. 完成为特定客户服务后，关闭与该客户之间的连接，返回步骤3.


**并发无连接**
- 主线程:
    1. 创建socket，并绑定熟知端口号；  
    2. 反复调用 `recvfrom()` 函数，接收下一个客户请求，并创建新线程处理该客户响应；
- 子线程
    1. 接收一个特定请求；
    2. 依据应用层协议构造响应报文，并调用sendto()发送；
    3. 退出(一个子线程处理一个请求后即终止)。



**并发面向连接**
- 主线程
    1. 创建（主）socket，并绑定熟知端口号；
    2. 设置（主）socket为被动监听模式，准备用于服务器；
    3. 反复调用 `accept()` 函数接收下一个连接请求（通过主socket），并创建一个新的子线程处理该客户响应；
- 子线程
    1. 接收一个客户的服务请求（通过新创建的socket）；
    2. 遵循应用层协议与特定客户进行交互；
    3. 关闭/释放连接并退出（线程终止）.



-------------------










## 参考资料

- 李全龙 、聂兰顺：《计算机网络》课程，哈尔滨工业大学，中国大学MOOC [https://www.icourse163.org/course/HIT-154005](https://www.icourse163.org/course/HIT-154005)
- 本文的一些 [素材](/a/computer/network/计算机网络-素材.pptx)

第5周 传输层（上）（2h50m27s）

3.1 传输层服务（13m03s）

3.2 复用和分用（18m26s）

3.3 无连接传输协议-UDP（17m13s）

3.4 可靠数据传输的基本原理（1h18m01s）

3.5 滑动窗口协议（43m44s）

第6周 传输层（下）（2h05m14s）

3.6 面向连接传输协议-TCP（53m38s）

3.7 拥塞控制原理（34m25s）

3.8 TCP拥塞控制（34m15s）

3.9 传输层总结（2m56s）

第7周 网络层（上）（2h46m43s）

4.1网络层服务（18m16s）

4.2 虚电路网络与数据报网络（43m33s）

4.3 IPv4协议（1h44m54s）

第8周 网络层（中）（2h08m28s）

4.4 CIDR与路由聚集（19m29s）

4.5 DHCP协议（18m51s）

4.6 NAT（24m37s）

4.7 ICMP协议（21m47s）

4.8 IPv6简介（22m00s）

例题讲解一（21m44s）

第9周 网络层（下）（2h56m22s）

4.9 路由算法（1h43m13s）

4.10 Internet路由（1h13m09s）

第10周 数据链路层（1h59m14s）

5.1 数据链路层服务（15m08s）

5.2 差错编码（30m59s）

5.3 多路访问协议（1h13m07s）

第11周 局域网（2h30m58s）

5.4 ARP协议（28m53s）

5.5 以太网（1h03m56s）

5.6 PPP协议（20m11s）

5.7 802.11无线局域网（37m58s）

第12周 物理层（2h37m53s）

6.1 数据通信基础（37m29s）

6.2 物理介质（22m04s）

6.3 信道与信道容量（19m32s）

6.4 基带传输基础（29m22s）

6.5 频带传输基础（40m53s）

6.6 物理层接口规程（8m33s）

第二单元测验

第13周 网络安全基本原理（4h36m31s）

7.1 网络安全基础（35m24s）

7.2 网络安全威胁（32m55s）

7.3 密码学基础（2h07m16s）

7.4 身份认证（23m12s）

7.5 消息完整性与数字签名（36m47s）

7.6 密钥分发与公钥证书（20m57s）

第14周 网络安全协议与技术（4h14m48s）

8.1 安全电子邮件（39m54s）

8.2 安全socket层（SSL）（1h07m58s）

8.3 IP安全（IPsec）（1h31m06s）

8.4 无线局域网安全（31m18s）

8.5 防火墙（24m32s）

第三单元测验