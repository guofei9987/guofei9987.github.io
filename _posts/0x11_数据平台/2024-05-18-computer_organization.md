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




<hr>

一、数据传输指令

 **指令**     | **功能**              | **语法**                  | **示例**               
------------|---------------------|-------------------------|----------------------
 **MOV**    | 将数据从源操作数传送到目标操作数    | MOV dest, src           | MOV EAX, EBX <br> MOV EBX, 40：把40这个数字送入 EBX <br> MOV ECX, [1000H] 把内存中的数据读入 EXC <br> MOV [DI], AX 把 AX 写入 一个内存上，这个内存的地址存储在 DI 寄存器 <br> MOV WORD PTR[BX+SI*2+200H], 01H 把一个双字节，存到某个内存单元，这个内存单元地址是计算得到的        
 **PUSH**   | 将操作数压入堆栈顶部          | PUSH src                | PUSH EAX             
 **POP**    | 从堆栈顶部弹出数据到操作数       | POP dest                | POP EBX              
 **XCHG**   | 交换两个操作数的值           | XCHG operand1, operand2 | XCHG EAX, EBX        
 **LAHF**   | 加载标志寄存器的低8位到AH      | LAHF                    | LAHF                 
 **SAHF**   | 将AH的值存入标志寄存器的低8位    | SAHF                    | SAHF                 
 **LEA**    | 计算源操作数的有效地址并存入目标寄存器 | LEA dest, src           | LEA EAX, [EBX+ECX*4] 
 **MOVSX**  | 带符号扩展传送             | MOVSX dest, src         | MOVSX EAX, BL        
 **MOVZX**  | 零扩展传送               | MOVZX dest, src         | MOVZX EAX, BL        
 **CMOVcc** | 条件传送（当条件满足时）        | CMOVcc dest, src        | CMOVE EAX, EBX       


<hr>

二、算术运算指令

 **指令**   | **功能**          | **语法**                 | **示例**       
----------|-----------------|------------------------|--------------
 **ADD**  | 相加，并把结果存在 dst 寄存器         | ADD dst, src          | ADD EAX, EBX 
 **ADC**  | 带进位的加法， dst := dst + src + CF  | ADC dst, src          | ADC EAX, EBX 
 **SUB**  | 执行减法运算          | SUB dest, src          | SUB EAX, EBX 
 **SBB**  | 带借位的减法   | SBB dest, src          | SBB EAX, EBX 
 **INC**  | 自加1           | INC operand            | INC EAX      
 **DEC**  | 自减1           | DEC operand            | DEC EAX      
 **MUL**  | 无符号乘法           | MUL src                | MUL EBX      
 **IMUL** | 有符号乘法           | IMUL src               | IMUL EBX     
 **DIV**  | 无符号除法           | DIV src                | DIV EBX      
 **IDIV** | 有符号除法           | IDIV src               | IDIV EBX     
 **NEG**  | 求二进制补码（取负值） | NEG operand            | NEG EAX      
 **CMP**  | 比较两个操作数，不保存结果，只影响标志位  | CMP operand1, operand2 | CMP EAX, EBX 
 **CWD**  | AX扩展到DX         | CWD                    | CWD          
 **CDQ**  | EAX扩展到EDX       | CDQ                    | CDQ          
 **CQO**  | RAX扩展到RDX       | CQO                    | CQO          




<hr>



三、逻辑运算指令

 **指令**   | **功能**         | **语法**         | **示例**        
----------|----------------|----------------|---------------
 **AND**  | 按位与           | AND dest, src  | AND EAX, EBX  
 **OR**   | 按位或            | OR dest, src   | OR EAX, EBX   
 **XOR**  | 按位异或        | XOR dest, src  | XOR EAX, EBX  
 **NOT**  | 按位取反             | NOT operand    | NOT EAX       
 **TEST** | 按位与，不保存结果，只影响标志位 | TEST dest, src | TEST EAX, EBX 






四、移位和旋转指令
 **指令**      | **功能**      | **语法**          | **示例**     
-------------|-------------|-----------------|------------
 **SHL/SAL** | 逻辑左移，右边补0   | SHL dest, count | SHL EAX, 1 
 **SHR**     | 逻辑右移，左边补0   | SHR dest, count | SHR EAX, 1 
 **SAR**     | 算术右移，（指的是保留符号的移位） | SAR dest, count | SAR EAX, 1 
 **ROL**     | 循环左移        | ROL dest, count | ROL EAX, 1 
 **ROR**     | 循环右移        | ROR dest, count | ROR EAX, 1 
 **RCL**     | 包括进位位的循环左移  | RCL dest, count | RCL EAX, 1 
 **RCR**     | 包括进位位的循环右移  | RCR dest, count | RCR EAX, 1 



<hr>


五、控制转移指令


 **指令**   | **功能**       | **语法**     | **示例**           
----------|--------------|------------|------------------
 **JMP**  | 无条件跳转        | JMP label  | JMP START        
 **Jcc**  | 条件跳转，包括很多指令，见于下面的表   | Jcc label  | JE LOOP_START    
 **LOOP** | 循环，使用计数寄存器   | LOOP label | LOOP LOOP_START  
 **CALL** | 调用子程序，保存返回地址 | CALL label | CALL SUB_ROUTINE 
 **RET**  | 从子程序返回       | RET        | RET              
 **INT**  | 触发软件中断       | INT type   | INT 21h          
 **IRET** | 从中断服务程序返回    | IRET       | IRET             


**Jcc** 指令:

 **指令**      | **功能**                      | **条件**           
-------------|-----------------------------|------------------
 **JC**      | 有进位时跳转                      | CF = 1           
 **JNC**     | 无进位时跳转                      | CF = 0           
 **JP/JPE**  | 奇偶标志为偶时跳转（Parity Even）      | PF = 1           
 **JNP/JPO** | 奇偶标志为奇时跳转（Parity Odd）       | PF = 0           
 **JE/JZ**   | 相等或结果为零时跳转                  | ZF = 1           
 **JNE/JNZ** | 不相等或结果不为零时跳转                | ZF = 0           
 **JS**      | 符号标志被置位时跳转（负数）              | SF = 1           
 **JNS**     | 符号标志未被置位时跳转（非负数）            | SF = 0           
 **JG/JNLE** | 有符号比较中，第一个操作数大于第二个操作数时跳转    | ZF = 0 且 SF = OF <br> 这是因为 `CMP` 指令实际上是 `SUB` 操作但不保存结果，只更新标志位
 **JL/JNGE** | 有符号比较中，第一个操作数小于第二个操作数时跳转    | SF ≠ OF          
 **JGE/JNL** | 有符号比较中，第一个操作数大于或等于第二个操作数时跳转 | SF = OF          
 **JLE/JNG** | 有符号比较中，第一个操作数小于或等于第二个操作数时跳转 | ZF = 1 或 SF ≠ OF 



<hr>


六、字符串操作指令


 **指令**     | **功能**           | **语法**                | **示例**    
------------|------------------|-----------------------|-----------
 **MOVS**   | 将数据从源字符串传送到目标字符串 | MOVSB（传送字节） / MOVSW（传送字，通常是2字节） / MOVSD（传送双字，通常是4字节） | MOVSB     
 **CMPS**   | 字符串比较  | CMPSB / CMPSW / CMPSD | CMPSB     
 **SCAS**   | 将累加器与目标字符串的数据比较  | SCASB / SCASW / SCASD | SCASB     
 **LODS**   | 将源字符串的数据装载到累加器   | LODSB / LODSW / LODSD | LODSB     
 **STOS**   | 将累加器的数据存储到目标字符串  | STOSB / STOSW / STOSD | STOSB     
 **REP 前缀** | 重复执行字符串指令        | REP instruction       | REP MOVSB 



<hr>

七、位操作指令

 **指令**    | **功能**       | **语法**                 | **示例**       
-----------|--------------|------------------------|--------------
 **BT**    | 测试某个位的值，并将其存在 CF（标志寄存器中的进位标志） 中          | BT dest, bit_position  | BT EAX, 2    
 **BTS**   | 测试某个位的值，并将其设置为 1，然后将原值其存在 CF 中      | BTS dest, bit_position | BTS EAX, 2   
 **BTR**   | 测试某个位的值，并将其设置为 0，然后将原值其存在 CF 中       | BTR dest, bit_position | BTR EAX, 2   
 **BTC**   | 测试某个位的值，并将其取反，然后将原值其存在 CF 中       | BTC dest, bit_position | BTC EAX, 2   
 **BSF**   | 找到最低位的1，返回其索引      | BSF dest, src          | BSF EAX, EBX 
 **BSR**   | 找到最高位的1，返回其索引      | BSR dest, src          | BSR EAX, EBX 
 **SETcc** | 根据条件码设置字节为0或1 | SETcc dest             | SETZ AL      






八、标志控制指令


 **指令**  | **功能**       | **语法** | **示例** 
---------|--------------|--------|--------
 **CLC** | 清除进位标志（CF=0） | CLC    | CLC    
 **STC** | 设置进位标志（CF=1） | STC    | STC    
 **CMC** | 取反进位标志       | CMC    | CMC    
 **CLD** | 清除方向标志（使其自动递增） | CLD    | CLD    
 **STD** | 设置方向标志（使其自动递减） | STD    | STD    
 **CLI** | 禁止硬件中断（IF=0） | CLI    | CLI    
 **STI** | 允许硬件中断（IF=1） | STI    | STI    




<hr>

九、系统指令


 **指令**      | **功能**         | **语法**                | **示例**         
-------------|----------------|-----------------------|----------------
 **HLT**     | 停止处理器执行，直到收到中断 | HLT                   | HLT            
 **NOP**     | 空操作，不执行任何操作    | NOP                   | NOP            
 **WAIT**    | 等待处理器的忙标志被清除   | WAIT                  | WAIT           
 **LOCK 前缀** | 用于在多处理器环境下，确保指令的原子性       | LOCK instruction      | LOCK INC [EBX] 
 **CPUID**   | 获取CPU的特性和功能信息  | CPUID                 | CPUID          
 **IN**      | 从I/O端口读取数据     | IN accumulator, port  | IN AL, DX      
 **OUT**     | 向I/O端口写入数据     | OUT port, accumulator | OUT DX, AL     




<hr>

十、浮点运算指令


 **指令**   | **功能**           | **语法**   | **示例**            
----------|------------------|----------|-------------------
 **FLD**  | 将浮点数装载到浮点堆栈      | FLD src  | FLD [EBX]         
 **FST**  | 将浮点堆栈顶部的值存储到指定位置 | FST dest | FST [EBX]         
 **FADD** | 浮点加法运算           | FADD src | FADD ST(0), ST(1) 
 **FSUB** | 浮点减法运算           | FSUB src | FSUB ST(0), ST(1) 
 **FMUL** | 浮点乘法运算           | FMUL src | FMUL ST(0), ST(1) 
 **FDIV** | 浮点除法运算           | FDIV src | FDIV ST(0), ST(1) 
 **FCOM** | 比较浮点堆栈顶部的两个值     | FCOM src | FCOM ST(1)        
 **FCHS** | 改变浮点堆栈顶部值的符号     | FCHS     | FCHS              




<hr>

十一、SIMD指令（是一种并行处理技术）

SIMD 指令通过在单个指令中指定多个数据元素的位置，允许处理器在一个指令周期内对这些数据元素执行相同的操作。在进行向量运算时，大大减少指令数量，提高执行效率。
- 有些高级语言，编译器能够自动识别数据并行性，并优化位 SIMD 指令。例如 GCC 和 Clang 都至此自动向量化优化
- C/C++ 的 intrinsics 也提供了 SIMD 指令集接口
- Rust编译器也能自动优化，也可以用 `std::arch, std::simd` 访问 SIMD 指令



 **指令类别**   | **功能**          | **示例**                  
------------|-----------------|-------------------------
 **MMX 指令** | 处理并行整数运算，用于多媒体运算  | PADDW MM0, MM1          
 **SSE, SSE2, SSE3** | 并行浮点运算 | ADDPS XMM0, XMM1        
 **AVX 指令** | 扩展SSE，支持更宽的寄存器（256位、512位）  | VADDPS YMM0, YMM1, YMM2 




<hr>

十二、其他指令

 **指令**    | **功能**           | **语法**                       | **示例**           
-----------|------------------|------------------------------|------------------
 **XLAT**  | 根据累加器的值在查找表中检索数据 | XLAT                         | XLAT             
 **BOUND** | 检查操作数是否在数组边界内    | BOUND reg, mem               | BOUND EAX, [EBX] 
 **ENTER** | 为过程建立栈帧          | ENTER nest_level, frame_size | ENTER 0, 10h     
 **LEAVE** | 从过程栈帧中退出         | LEAVE                        | LEAVE            
 **UD2**   | 执行时导致无效操作码异常     | UD2                          | UD2              






## 参考资料

[Coursera课程：北京大学《计算机组成》](https://www.coursera.org/learn/jisuanji-zucheng/)



![Computer Organization](/pictures_for_blog/certification/coursera/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90.jpg) <br> [link](https://www.coursera.org/account/accomplishments/certificate/F987E2DF2V73)