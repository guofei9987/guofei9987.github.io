---
layout: post
title: 【Clean Code】高质量代码指南
categories:
tags: 0xd0_设计模式
keywords:
description:
order: 1040
---



## 面向对象设计原则

**开放/封闭原则** 对于扩展开放，对于修改封闭，需要拓展类的行为时，不必修改类本身，而是简单扩展便可以建立新行为。  
优点：  
1. 现有类不会被修改
2. 有助于保持以前代码向后兼容性。


**控制反转原则** 高层级模块不应该依赖低层级模块，都依赖于抽象。任意两个模块之间不应该以紧密方式依赖。  
优点：  
1. 削弱模块之间的紧耦合，消除系统复杂性/刚性
2. 更好的方式处理模块支架的相互关系


**接口隔离原则** 客户端不应当依赖于他们不需要的接口  
例如，一个Pizza类不应该提供add_chicken()方法。

**单一职责原则** 类的职责单一  
优点：  
1. 一个功能发生变化时，除了特定类需要改，其它类无需改动
2. 如果类有多个职责，依赖它的类必然也会经历多次修改，应该避免。


**里氏替换原则** 派生类必须能够完全取代基类，任何使用基类的地方都不应该因替换为子类而出错。


**迪米特法则**（最少知识原则） 对象只与“直接朋友”通信，避免 `a.b.c` 式的链式调用，降低耦合与连锁影响。

**合成/聚合复用原则** 优先使用组合/聚合复用，而不是继承。继承用于表达“是一个”，组合用于表达“有一个”。



## 设计模式

**1. 创建型模式**
1. 运行机制基于对象的创建方式
2. 将对象创建的细节隔离开
3. 代码与所创建的对象的类型无关


**2. 结构型模式**
1. 致力于设计出能够通过组合获得更强大功能的对象和类结构
2. 重点是简化结构并识别类与对象之间的关系
3. 主要关注类的继承和组合


**3. 行为模式类**
1. 关注对象之间的交互和响应
2. 同时仍然保持松散耦合






## 重构

*参考阅读：《大话重构》*


面对重构的两难
- 面对多年的大型遗留系统，越来越多的需求变更让维护成本越来越高，面对越来越多的竞争，有被市场淘汰的风险
- 凑合用一下还可以坚持几年，如果不小心改出问题，企业可能立即歇菜

系统重构的前提是“不改变软件的外部行为”，这保证了不会引入bug. 例如，把显示的日期表示从 '2021-12-12' 变成 '2021-12-12 00:00:00'，在开发看来不是bug，但在客户看来就是bug

改代码的原因有4种：
1. 满足客户的新需求
2. 改bug
3. 优化性能
4. 优化内部结构

其中1和2源于客户的功能需求，3源于客户的非功能需求。只有4的价值是隐形的，体现在日后长期维护上。

似乎重构与需求无关，但其实不是这样的
- 传统是如何添加新功能的：尽量不改变原代码，这样就不会影响以往的功能。后果是源源不断往里面添加程序，时间一长，代码越来越多、越来越乱。
- “糟糕设计零容忍”策略：接到需求后，分为两步。先重构系统，使其适应要添加的功能；然后添加需求。


**等价变换重构** 的一个事件例子
- 分段（用空行把程序分成不同单元）
- 把分段后的代码提取成函数

重构时，最好快速迭代，快速发布一个版本。否则，如果重构深入时发现bug，不得不回滚到原始代码，整个重构就失败了。

--------------------------

重构的步骤

**第一步：分解大函数** 具体步骤还是上面的增加注释、调整顺序、重命名变量、分段、提取

指南：
- **增加注释**（原程序没有注释，或者注释与代码对不上）
- **调整顺序**（很多大函数在开始定义了一大堆变量，你需要边读边调整，把变量的定义移动到用它们的代码附近）
- 重命名变量（原程序变量名很多不合理）
- 分段，然后提取成函数：
    - 你不必把一个大函数读完才提取函数。
    - 有些天然的分块，例如条件语句、循环语句，有时候一个分块很多行，就可以抽取成函数
    - 有时候，抽取出来的函数也很大，可以之后继续分解这个函数。
- 经过一系列分解，一个大函数变成很多小函数，可读性强了，但是产生了几十个小函数，这些小函数凌乱的堆砌、没有层级，整个代码依然很大。我们在后面的步骤继续重构


常见问题
- 原代码中的变量可以毫无顾忌的交互数据，但是抽取之后就只能用参数来定义。
- 一个糟糕的设计：把所有有交互的变量都写到参数里面。一方面，可读性很差也很傻；另一方面，如果代码变更需要增加参数，就是灾难。
- 一般可以用值对象（Value Object）来传递参数，重构初期可以把变量都塞进一个值对象。不过后面需要把值对象变成有实际意义的几个。最终的参数就是几个值对象。函数传入的值对象数量不超过6个，最好1-4个


**第二步：拆分大对象** 把原对象中的某些方法移动到其他对象中，这个操作叫做 Extract Class，问题的关键是移动到哪个对象。
- 传统的重构思路是“按照职责做拆分”，每个类单一职责。但这种方法并不奏效。因为开发人员原本不熟悉整个业务的所有细节，而是在开发之后才熟悉。因此一下子想好整个设计是不可能的。
- 更推荐“小步快跑”，一次想不清楚，就分多次，每次实现一部分。
    - 合久必分：把大对象中不相关的拆分成多个方法类
    - 分久必合：随着开发人员对整个业务更加了解，系统性的审视全局，把分散的方法类合并到业务类中


**第三步：提高代码复用**
- 找到重复的代码并不难：
    - 当你开发新功能时，复制第二次就要注意了。
    - 同一个流程的某个环节，例如付款时的付款方式不同，但流程中的大部分应该是可以复用的。
    - 不同业务的相似功能。例如，填写付款单、发票。它们虽然是不同的业务，但都需要效验输入是否合法、检查余额等。
    - 本身相似的功能。例如收款单和付款单、同行评审和非同行评审。
- 提高代码复用，是考验优秀程序员的地方。
    - 如果重复代码在同一个对象中：抽取成方法
    - 如果重复代码在不同对象中：抽取成工具类。例如，获取时间的代码散布在十几个地方，但功能有不完全相同。就应当整合成一个工具类。
    - 重复代码在不同对象中：另一种方法是抽取成实体类。工具类仅仅是一堆方法的集合，而实体类有一定的业务逻辑。
    - 如果代码所在的类有并列关系：抽取父类。例如，正常开票与非正常开票这两个类，都有 valid, save 方法，因此抽取出一个开票类
    - 其他。提高复用的方法还有很多，各有使用场景。体现了对优秀程序员的考验。


**第四步：发现程序可扩展点**。是预先做可扩展性，还是需求变更时增加扩展性，这是个两难的难题，有一些一般原则
- 预先的可扩展性设计不要太多
- 更常见的可扩展性来自需求变更。

**第五步：降低程序的依赖**
- 接口、实现：工厂模式
- 与外部系统解耦：外部接口和适配器模式.我们想调用一个服务的3.0版本，而不是原先的2.0版本，发现类名、方法名，甚至包名都变了，代码里到处都是对2.0版本的各种引用，像老树一样盘根错节。根本原因是耦合太强。这就适合用适配器模式改造。
- 继承泛滥：桥接模式
- 方法的解耦：策略模式
- 过程的解耦：命令模式

（关于设计模式，详细见于另一篇文章 [【Python】设计模式](https://www.guofei.site/2019/10/26/design_patterns.html)）


**第六步：分层**




## 命名

一般规则

1. 尽量不用拼音。
    - 对于一些通用的表示或者难以用英文描述的可以采用拼音，一旦采用拼音就坚决不能和英文混用。
    - 正例： BeiJing， HangZhou
    - 反例： validateCanShu
2. 命名过程中尽量不要出现特殊的字符，常量除外。
3. 尽量不要框架名、框架中已存在的类重名，更不能使用语言的关键字命名。
4. 妙用介词，如for(可以用同音的4代替), to(可用同音的2代替), from, with，of等。如类名采用User4RedisDO，方法名getUserInfoFromRedis，convertJson2Map等。






下面以 Java 为例，别的语言类似


**命名规范**(Java的，别的语言有很多类似)

| 类型  | 约束  | 例              |
|-----|------|--------------------|
| 项目名 | 全部小写，多个单词用中划线分隔 '-'  | spring-cloud  |
| 包名  | 全部小写     | com.alibaba.fastjson  |
| 类名  | 单词首字母大写  | Feature, ParserConfig,DefaultFieldDeserializer |
| 变量名 | 首字母小写，多个单词组成时，除首个单词，其他单词首字母都要大写 | password, userName      |
| 常量名 | 全部大写，多个单词，用'_'分隔               | CACHE_EXPIRED_TIME    |
| 方法  | 同变量      | read(), readObject(), getById()          |





**类命名**

| 类别 | 约束 | 例子 |
|---------|----------|-------------------|
| 抽象      | Abstract或 Base 开头  | BaseUserService      |
| 枚举      | Enum 作为后缀  | OSTypeEnum      |
| 工具      | Utils作为后缀     | StringUtils      |
| 异常类     | Exception结尾    | RuntimeException    |
| 接口实现    | Impl 结尾   | UserServiceImpl     |
| 领域模型相   | /DO/DTO/VO/DAO | 正例：UserDAO，反例：UserDao |
| 设计模式相关  | 对应的设计模式名结尾，Builder，Factory等  | ThreadFactory   |
| 处理特定功能  | Handler，Predicate，Validator          | 表示处理器，校验器，断言，这些类工厂还有配套的方法名，如handle，predicate，validate |
| 测试      | Test后缀        | UserServiceTest，表示用来测试UserService类的                   |
| MVC分层   | Controller，Service，ServiceImpl，DAO后缀 | UserManageController，UserManageDAO  |



### 方法的命名


**1 返回真伪值的方法**

注：Prefix-前缀，Suffix-后缀，Alone-单独使用

| 位置     | 单词     | 意义 | 例             |
|--------|--------|------------------------------------|---------------|
| Prefix | is     | 对象是否符合期待的状态 | isValid       |
| Prefix | can    | 对象能否执行所期待的动作 | canRemove     |
| Prefix | should | 调用方执行某个命令或方法是好还是不好,应不应该，或者说推荐还是不推荐 | shouldMigrate |
| Prefix | has    | 对象是否持有所期待的数据和属性    | hasObservers  |
| Prefix | needs  | 调用方是否需要执行某个命令或方法   | needsMigrate  |


**2 用来检查的方法**

| 单词       | 意义       | 例              |
|----------|---------------------------------|----------------|
| ensure   | 检查是否为期待的状态，不是则抛出异常或返回error code | ensureCapacity |
| validate | 检查是否为正确的状态，不是则抛出异常或返回error code | validateInputs |


**3 按需求才执行的方法**

| 位置     | 单词        | 意义 | 例                      |
|--------|-----------|---------------------------|------------------------|
| Suffix | IfNeeded  | 需要的时候执行，不需要的时候什么都不做       | drawIfNeeded           |
| Prefix | might     | 同上 | mightCreate            |
| Prefix | try       | 尝试执行，失败时抛出异常或是返回errorcode | tryCreate              |
| Suffix | OrDefault | 尝试执行，失败时返回默认值             | getOrDefault           |
| Suffix | OrElse    | 尝试执行、失败时返回实际参数中指定的值       | getOrElse              |
| Prefix | force     | 强制尝试执行。error抛出异常或是返回值     | forceCreate, forceStop |


**4 异步相关方法**

| 位置              | 单词           | 意义                     | 例                     |
|-----------------|--------------|------------------------|-----------------------|
| Prefix          | blocking     | 线程阻塞方法                 | blockingGetUser       |
| Suffix          | InBackground | 执行在后台的线程               | doInBackground        |
| Suffix          | Async        | 异步方法                   | sendAsync             |
| Suffix          | Sync         | 对应已有异步方法的同步方法          | sendSync              |
| Prefix or Alone | schedule     | Job和Task放入队列           | schedule, scheduleJob |
| Prefix or Alone | post         | 同上                     | postJob               |
| Prefix or Alone | execute      | 执行异步方法（注：我一般拿这个做同步方法名） | execute, executeTask  |
| Prefix or Alone | start        | 同上                     | start, startJob       |
| Prefix or Alone | cancel       | 停止异步方法                 | cancel, cancelJob     |
| Prefix or Alone | stop         | 同上                     | stop, stopJob         |


**5 回调方法**


| 位置     | 单词     | 意义            | 例            |
|--------|--------|---------------|--------------|
| Prefix | on     | 事件发生时执行       | onCompleted  |
| Prefix | before | 事件发生前执行       | beforeUpdate |
| Prefix | pre    | 同上            | preUpdate    |
| Prefix | will   | 同上            | willUpdate   |
| Prefix | after  | 事件发生后执行       | afterUpdate  |
| Prefix | post   | 同上            | postUpdate   |
| Prefix | did    | 同上            | didUpdate    |
| Prefix | should | 确认事件是否可以发生时执行 | shouldUpdate |


**6 操作对象生命周期的方法**


| 单词         | 意义              | 例              |
|------------|-----------------|----------------|
| initialize | 初始化。也可作为延迟初始化使用 | initialize     |
| pause      | 暂停              | onPause ，pause |
| stop       | 停止              | onStop，stop    |
| abandon    | 销毁的替代           | abandon        |
| destroy    | 同上              | destroy        |
| dispose    | 同上              | dispose        |


**7 与集合操作相关的方法**


| 单词       | 意义             | 例          |
|----------|----------------|------------|
| contains | 是否持有与指定对象相同的对象 | contains   |
| add      | 添加             | addJob     |
| append   | 添加             | appendJob  |
| insert   | 插入到下标n         | insertJob  |
| put      | 添加与key对应的元素    | putJob     |
| remove   | 移除元素           | removeJob  |
| enqueue  | 添加到队列的最末位      | enqueueJob |
| dequeue  | 从队列中头部取出并移除    | dequeueJob |
| push     | 添加到栈头          | pushJob    |
| pop      | 从栈头取出并移除       | popJob     |
| peek     | 从栈头取出但不移除      | peekJob    |
| find     | 寻找符合条件的某物      | findById   |


**8 与数据相关的方法**


| 单词     | 意义                  | 例             |
|--------|---------------------|---------------|
| create | 新创建                 | createAccount |
| new    | 新创建                 | newAccount    |
| from   | 从既有的某物新建，或是从其他的数据新建 | fromConfig    |
| to     | 转换                  | toString      |
| update | 更新既有某物              | updateAccount |
| load   | 读取                  | loadAccount   |
| fetch  | 远程读取                | fetchAccount  |
| delete | 删除                  | deleteAccount |
| remove | 删除                  | removeAccount |
| save   | 保存                  | saveAccount   |
| store  | 保存                  | storeAccount  |
| commit | 保存                  | commitChange  |
| apply  | 保存或应用               | applyChange   |
| clear  | 清除数据或是恢复到初始状态       | clearAll      |
| reset  | 清除数据或是恢复到初始状态       | resetAll      |


**9 成对出现的动词**

| 单词           | 意义             |
|--------------|----------------|
| get获取        | set 设置         |
| add 增加       | remove 删除      |
| create 创建    | destory 移除     |
| start 启动     | stop 停止        |
| open 打开      | close 关闭       |
| read 读取      | write 写入       |
| load 载入      | save 保存        |
| create 创建    | destroy 销毁     |
| begin 开始     | end 结束         |
| backup 备份    | restore 恢复     |
| import 导入    | export 导出      |
| split 分割     | merge 合并       |
| inject 注入    | extract 提取     |
| attach 附着    | detach 脱离      |
| bind 绑定      | separate 分离    |
| view 查看      | browse 浏览      |
| edit 编辑      | modify 修改      |
| select 选取    | mark 标记        |
| copy 复制      | paste 粘贴       |
| undo 撤销      | redo 重做        |
| insert 插入    | delete 移除      |
| add 加入       | append 添加      |
| clean 清理     | clear 清除       |
| index 索引     | sort 排序        |
| find 查找      | search 搜索      |
| increase 增加  | decrease 减少    |
| play 播放      | pause 暂停       |
| launch 启动    | run 运行         |
| compile 编译   | execute 执行     |
| debug 调试     | trace 跟踪       |
| observe 观察   | listen 监听      |
| build 构建     | publish 发布     |
| input 输入     | output 输出      |
| encode 编码    | decode 解码      |
| encrypt 加密   | decrypt 解密     |
| compress 压缩  | decompress 解压缩 |
| pack 打包      | unpack 解包      |
| parse 解析     | emit 生成        |
| connect 连接   | disconnect 断开  |
| send 发送      | receive 接收     |
| download 下载  | upload 上传      |
| refresh 刷新   | synchronize 同步 |
| update 更新    | revert 复原      |
| lock 锁定      | unlock 解锁      |
| check out 签出 | check in 签入    |
| submit 提交    | commit 交付      |
| push 推       | pull 拉         |
| expand 展开    | collapse 折叠    |
| begin 起始     | end 结束         |
| start 开始     | finish 完成      |
| enter 进入     | exit 退出        |
| abort 放弃     | quit 离开        |
| obsolete 废弃  | depreciate 废旧  |
| collect 收集   | aggregate 聚集   |



**10 常见的命名和缩写**


add 加
anc, ancestor 祖先
ans, answer 答案
bel, belong 属于
best 最佳的
build 建立
block 障碍
ch, char 字符
check 判定
color 颜色
cmp, compare 比较
cnt, count 计数器
cur, current 当前量
deg, degree 度数
dep, depth 深度
del 删除（delete是保留字）
delta 增量
diff, difference 差别
dist, distance 距离
div, division 除法，部分
dp 动态规划
edge 边
extra 额外的
fa, father 父亲
factor 因子
fail 失败
flag 标志
flow 流
from 来自
get 得到
Hash 哈希表（hash是保留字）
heap 堆
in 入
ind, index 标号
inq 在队列里
inf, infinity 无穷大
init, initialize 初始化
insert 插入
inv, inverse 翻转，颠倒
last 最后一个
len, length 长度
lim, limit 极限
low, lower 下边的
mat, matrix 矩阵
mid, middle 中间量
mod 模
modify 修改
mp, map 映射
mst 最小生成树
mul, multiply 乘法
node 结点
num, number 数量
nxt 后继（next是保留字）
out 出
pa, pair 对子
pre, precursor 前驱
prime 质数
pos, position 位置
prod, product 乘积
put 放置
que, queue 队列
query 询问
rank 秩
res, result 结果
res, residual 剩余
scc 强连通分量
size 大小
split 分裂
start 开始
stk, stack 栈
str 字符串
suc, succeed 后继
sum 和
tim 时间（time是保留字）
tmp, temporary 临时量
tree 树
to 表目的
unite 联合
up, upper 上边的
update 更新
used 使用过的
val, value 值
vec, vector 向量
vis, visit 访问
zero 零





## 参考资料

- 《编写高质量代码：改善Python程序的91个建议》
- 《大话重构》，范钢，人民邮电出版社。
- 算法竞赛编程变量命名指南：https://zhuanlan.zhihu.com/p/104963169
- 告别编码5分钟，命名2小时！史上最全的Java命名规范参考！ - 老刘的文章 - 知乎 https://zhuanlan.zhihu.com/p/96100037