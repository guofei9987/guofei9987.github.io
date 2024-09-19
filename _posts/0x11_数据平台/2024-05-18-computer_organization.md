---
layout: post
title: 计算机组成
categories:
tags: 0x11_算法平台
keywords:
description:
order: 173
---

## 冯诺依曼结构

冯诺依曼结构的要点
- 计算机五大组成部分
    - 运算器 CA，central arithmetical
    - 控制器 CC，central control
    - 存储器 M，memory
    - 输入设备，I，input
    - 输出设备，O，output
- **数据和程序** 均以 **二进制的形式** 不加区别地存放在存储器中
- 计算机在工作时能够 **自动** 地从存储器中取出指令并执行


用餐馆做菜来类比
- 主存：货架。货架上的格子上面放着食材和任务单
- CPU：厨师。取出货架上的任务单、食材。厨师的动作非常快

![cpu](/pictures_for_blog/computer/computer_analogy.jpg)

执行一条命令的过程如下
1. 取址 fetch
    1. 厨师查看下一个任务单对应的货架标号
    2. 根据标号从货架上取出任务单
    3. 更新下一张任务单对应的货架标号
2. 译码 decode
    1. 查看任务单，发现任务是：取仓库 6 和 A 盘子的原料，炒菜，然后放入盘子A（寄存器）
3. 执行 execute
    1. 取第 6 格的物品
    2. 取盘子 A 的物品
    2. 炒
    3. 放入 A 盘子
4. 回写 write-back
5. 执行下一条命令（回到1）


参考视频：https://www.coursera.org/learn/jisuanji-zucheng/lecture/EwddN/103-feng-nuo-yi-man-jie-gou-de-xiao-gu-shi



### 计算机结构的简化模型

![存储器](/pictures_for_blog/computer/memory.jpg)

上图为存储器

存储器要点：
- 控制总线用来接收来自CPU的读写新号，或者向CPU反馈读写完成的信号
- 每个地址对应一个存储单元，对应一个字节（8位二进制）
- 地址总线决定了能管理多少个存储单元。
    - 32位系统的寄存器宽为 32 位，可以寻址 `2^32 = 4GB` 内存空间。64位系统则是 `2^64 = 16EB` 内存空间，不过 64 位通常用地址总线为位为 36、40、48，因为没有必要支持到 16 EB 这么大
- MAR，Memory Address Register，用于存放 CPU 正在读或者写的存储单元地址
- MDR，Memory Data Register，用于存放正在读出或者即将写入存储单元的数据




![控制器](/pictures_for_blog/computer/cpu.jpg)  
上图为控制器（CPU）


控制器要点：
- 指令寄存器，IR，Instruction Register
    - 存放 “正在执行 或者 即将执行的指令”
- 程序计数器，PC，Program Counter
    - 存放“下一条指令的存储单元地址”，
    - 它有自动增量计数的功能
- 存储器地址寄存器，MAR，Memory Address Register
- 存储器数据寄存器，MDR，Memory Data Register
    - MAR 和 MDR 在上面提过了
- 指令译码部分
    - 对 IR 中的指令进行译码
- 控制电路
    - 产生控制信号，在时序脉冲的同步下控制各个部件的动作



![运算器](/pictures_for_blog/computer/cpu2.jpg)

上图为运算器

运算器要点
- 运算器用于算术运算和逻辑运算
    - 常见的算术运算：加减乘除
    - 常见的逻辑运算：与、或、非
- 核心部件是 ALU，用于完成算术运算和逻辑运算
- X、Y、Z 是寄存器
- F（也是寄存器）用于存放运算结果状态，（零、正负、进位、溢出）
- R0, R1,..., Rn-1 是通用寄存器，其存放的数据可以来自存储器、也可以来自其它通用寄存器或者 ALU 的输出
- 内部总线：用于 CPU 内部各个部件之间传递数据
    - 例如，CPU 可以命令 R0 中的数据传给 X，这就是通过内部总线来传递的
    - 其电路实现在下面介绍



关于存储器、控制器、运算器的介绍：https://www.coursera.org/learn/jisuanji-zucheng/lecture/1wVRC/104-ji-suan-ji-jie-gou-de-jian-hua-mo-xing


计算机执行指令过程的举例：https://www.coursera.org/learn/jisuanji-zucheng/lecture/8Xyeu/105-ji-suan-ji-zhi-xing-zhi-ling-de-guo-cheng


![一个例子](/pictures_for_blog/computer/computer.jpg)



- 例子是展示 指令 `ADD R0, [6]` 
- 指令功能：把 R0 存储的内容，加上存储器地址为6的存储单元的内容，然后把结果存放在 R0 中

指令 `ADD R0, [6]` 全部步骤详解:
1. 取址
    - 控制器中：PC -> 内部总线 -> MAR
    - 控制器中的 MAR -> 地址总线 -> 存储器中的 MAR
    - 控制器具发出信号：Read，经过 控制总线 传递给存储器 
    - 存储器：（控制逻辑操作下），找到 MAR 存放的地址，然后把内容取出来，送到 存储器的 MDR
    - 存储器：控制逻辑，给控制总线反馈状态： Ready
    - 存储器的 MDR -> 数据总线 -> 控制器的 MDR
    - 控制器中：MDR -> 内部总线 -> IR
    - PC 寄存器自增更新
2. 译码
    - IR -> 指令译码
    - 电路切换到对应的控制状态
3. 执行
    - IR 发现需要读取 `[6]` 对应的数据，
    - 过程与步骤1 的取址几乎一样，最后 MDR -> 内部总线 -> Y
    - R0 -> 内部总线 -> X
    - ALU 执行➕
4. 回写
    - Z -> 内部总线 -> R0



IO 设备（现代往往把 输入设备 和 输出设备  划在一起，例如硬盘）
- 如何在上面这套流程中加入 IO 设备呢？
- 入如下图所画，在各种总线上加上 IO 设备
- 旧的计算机，对于各种设备，都在主板上有的接口和芯片（例如网卡、声卡、打印机、耳机、显示器）
- 现代计算机，把各种输入输出设备都统一用 **南桥芯片** 来管理。不过图形计算比较复杂，还是用独立的显卡来处理。


![IO](/pictures_for_blog/computer/io.jpg)

### 南北桥结构的演变

演变1
- CPU 通过 北桥 来访问 存储器
- CPU 担任 CA、CC 功能（计算器和控制器）
- GPU 也有 CA、CC 功能
- 直接从硬盘启动时十分复杂的，用 BIOS 来检查主板设备和启动第一条指令。BIOS 是通过 南桥 连接的

演变2
- CPU直接控制主存
- CPU加上直接连接显卡
- 北桥消失，功能拆给CPU和南桥

更多的演变：
- 把所有的组件整合到单一芯片的集成电路上
- 手机、平板电脑等


![computer2](/pictures_for_blog/computer/computer2.png)


这种演变得益于芯片技术的进步（摩尔定律）

## 计算机指令

设计一套简单的指令
- 我们需要哪些指令？
    - `ADD R, M`: 把 寄存器 R 中的内容，与 存储器 M 中的内容相加，然后把结果存入 R
    - `LOAD R, M`: 把 M 中的内容装入 R
    - `STORE M, R`: 把 R 中的内容存入 M
    - `JMP L`:  转入 L 指向的存储器中
- 设计指令本身的格式呢
    - 每条指令都是 2 个字节
    - 第一个字节的高 4 位是操作码。例如 `LOAD:0000; ADD:0001; STORE:0010; JMP:0011`，这样我们可以共设计出 16 种操作类型
    - 第一个字节的低 4 位是寄存器号，这样我们可以最多支持 16 个寄存器
    - 第二个字节是存储单元地址，所以支持最大内存为 `2^8 = 256` 个字节
    - 举例来说，指令 `ADD R2, [9]`，其指令对应的二进制为 `0001 0010 0000 1001`

题目：使用以上的指令系统，写出一个功能：把 M1 中的内容和 M2 中的内容相加后存入 M3，然后转向 L 处的指令

指令为：
```
LOAD R3, M1
ADD R3, M2
STORE M3, R3
JMP L
```

假设 M1=5, M2=6, M3=7, L=18，那么机器语言为

```
0000 0011 0000 0101
0001 0011 0000 0110
0010 0011 0000 0111
0010 0000 0001 0010
```

以上程序在内存中，以及如何执行的，见于下图：


![instruction](/pictures_for_blog/computer/instruction.jpg)


### x86 体系结构

x86 体系主要分为 16位、32位、64位
- 16位的典型型号是 Intel 8086，8088，80186，80188，80286
- 32位的典型型号是 Intel 80386，80486


#### 8086

基本情况
- 16 位 CPU
- 内部通用寄存器为 16 位
- 对外有 16 根数据线和 20 根地址线。可寻址 `2^20 = 1MB`

![8086](/pictures_for_blog/computer/8086.jpg)


寄存器详解
- `AX、BX、CX、DX` 是通用寄存器，每个可以存放 1 个 16 位，或者 2 个 8 位
- `SP、BP、SI、DI` 也是通用寄存器，在最早期版本各有任务，随着更细，它们也变成了通用寄存器
- `IP` 对应“计算机结构简化模型” 中的 PC 寄存器
    - 会自增，或者依照转移指令等来改变，寻址能力为 `2^16 = 64KB`
- `FLAGS` 标志寄存器，就是上面 “计算机结构简化模型” 中的 F 寄存器。它存放了 2 类数据：1）状态标志，例如是否产生了进位，结果是否为零；2）控制标志，单步还是连续运行，是否允许响应中断。其 16 个二进制位意义如下：
    - ![8086_flags](/pictures_for_blog/computer/8086_flags.jpg)
- `CS、DS、ES、SS`（Code Segment, Data Segment, Extra Segment, Stack Segment） 是段寄存器
- 8086 是如何寻址 `2^20 = 1MB` 呢？
    - 采用段寄存器 + `IP`
    - 举例来说，段寄存器左移 4 位，（可以看成“段基值”），得到一个 20 位的地址，加上 `PC` 寄存器的值（可以看成“偏移量”）。两者通过 **地址加法器** ，得到一个 20 位的地址，这就是物理地址。这个地址会发送到 **地址总线**


#### 80386

基本情况
- 是 80x86 系列的第一款 32 位处理器
- 支持 32 位算术和逻辑运算，提供 32 位 寄存器
- 地址总线是 32 位，可寻址 `2^32 = 4GB` 内存空间


![80386](/pictures_for_blog/computer/80386.jpg)


这么做的原因是为了与 8086 向上兼容

#### x86-64 系列

基本情况
- 寄存器扩展到 64 位
- 新增了 8 个通用寄存器（共 16 个）


![x86-64](/pictures_for_blog/computer/x86_64.jpg)


### x86 指令

指令的分类
- 运算类。加减乘除、与或非
- 传送类。存储器到通用寄存器，通用寄存器到IO接口
- 转移类。条件转移、无条件转移、过程调用
- 控制类。暂停、清除标志位。

指令执行的结果
- 改变通用寄存器内容
- 改变存储器内容
- 改变标志位
- 改变外设端口内容
- 改变指令指针
- 其它



## 参考资料

[Coursera课程：北京大学《计算机组成》](https://www.coursera.org/learn/jisuanji-zucheng/)



![Computer Organization](/pictures_for_blog/certification/coursera/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90.jpg) <br> [link](https://www.coursera.org/account/accomplishments/certificate/F987E2DF2V73)