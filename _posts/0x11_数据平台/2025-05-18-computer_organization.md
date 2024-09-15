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


## 参考资料

[Coursera课程：北京大学《计算机组成》](https://www.coursera.org/learn/jisuanji-zucheng/)



![Computer Organization](/pictures_for_blog/certification/coursera/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90.jpg) <br> [link](https://www.coursera.org/account/accomplishments/certificate/F987E2DF2V73)