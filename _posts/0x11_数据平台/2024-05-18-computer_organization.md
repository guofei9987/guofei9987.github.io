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

指令 `ADD R0, [6]` 全部步骤详解
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
    - IR 发现需要读取 `[6]`


## 参考资料

[Coursera课程：北京大学《计算机组成》](https://www.coursera.org/learn/jisuanji-zucheng/)



![Computer Organization](/pictures_for_blog/certification/coursera/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90.jpg) <br> [link](https://www.coursera.org/account/accomplishments/certificate/F987E2DF2V73)