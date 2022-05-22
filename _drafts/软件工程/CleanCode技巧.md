input_function -> input_fn






## 《编写高质量代码：改善Python程序的91个建议》
一些 Pythonic 的做法

- 包的命名采用小写、单数，且短小
- 包通常仅作为命名空间，如只包含空的 `__init__.py` 文件

### 建议
避免劣质的代码
- 避免用大小写作为不同的对象，例如 A 是一个对象，a是另一个对象
- 避免混淆。例如，用同一个词反复作为不同的对象。用内建名称作为变量名（`list`这种），使用o,l（与数字0, 1 混淆）
- 不要怕过长的变量名，相反，不要过分缩写


PEP8 是一个关于 Python 编码风格的指南。  

```bash
pip install pycodestyle

pycodestyle demo.py
```

#### 常量
Python中的常量有 True, False, None 少量几个，不支持自定义常量，通常用 **大写字母+下划线** 来提醒用户这按照常量来理解。

## 还有
```python
# 用字符串的方式导入包，不过不推荐使用
__import__('numpy')
```


```python
# 这是一个dict，内容是已经加载的包
sys.modules

# 这是一个list，内容是命名空间中所有变量
dir()
```

（不是严格标准）尽量避免使用类似 `from scikit-opt import GA`，因为在大型项目中，如果频繁使用这个句式，会增加命名空间冲突的可能性。

## with语句
with语句做了什么？
1. 计算表达式的值，返回一个上下文管理对象
2. 加载上下文管理对象的 `__exit__()` 方法以备后用
3. 调用上下文管理器对象的 `__enter__()` 方法
4. 如果with语句中设置了目标对象，把 `__enter__()` 方法的返回值赋值给目标对象
5. 执行 `with` 中的代码块
6. 如果正常结束，调用 `__exit__()` 方法，忽略返回值。
7. 如果发生异常，调用 `__exit__()` 方法，把异常类型、值、traceback信息传递给 `__exit__()`。如果 `__exit__()` 返回 True，异常被挂起，程序继续执行；如果返回False，抛出异常。

with语句好处是无论何种方式跳出代码块，`__exit__()` 总是被执行


你可以定义自己的上下文管理器：
```python
class MyContextManager(object):
    def __enter__(self):
        print('enter')

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('leaving', exc_type, exc_val, exc_tb)
        if exc_type is None:
            return False
        if exc_type is ZeroDivisionError:
            print('ZeroDivisionError')
            return True
        print('other error')
        return True

with MyContextManager():
    1/0
```

## 多用else
for循环后面可以跟else，当循环自然终结时，会执行else；如果被break打断，不执行else

```python
for i in range(4):
    print(i)
    if i>5:break
else:
    print('no more then 5')
```


try 后面跟else，当try语句没发生异常时，执行else，全语句： `try-except-else-finnaly`

## 可变对象和不可变对象


```python
class STUDENT:
    def __init__(self, name, course=[]):
        self.name = name
        self.course = course

    def add_course(self, course_name):
        self.course.append(course_name)


Lucy = STUDENT('Lucy')
Lily = STUDENT('Lily')

Lucy.add_course('math')
Lily.add_course('PE')

print(Lucy.course)
print(Lily.course)
```

很惊讶的发现，虽然 `Lucy` 和 `Lily` 是不同的对象，但course却指向同一个地址。这是因为默认参数仅仅评估一次。

## 配置文件
常见有XML，ini

`ConfigParser` 是一个常用的解析配置文件的包

`getboolean('section1', 'option1')` 可以解析 yes/no, true/false, on/off

## traceback来调试报错信息
## logging 来记录日志

logger分为五个等级
1. DEBUG，
2. INFO，正常的信息
3. WARNING
4. ERROR
5. CRITICAL


```python
import logging

logging.Logger.setLevel()
logging.Logger.addHandler()
logging.Logger.removeHandler()
logging.Logger.addFilter()

logging.Logger.debug()
logging.Logger.info()
logging.Logger.warning()
logging.Logger.error()
```

一个简单案例
```python
import logging

logging.basicConfig(
    level=logging.DEBUG,
    filename='log.txt',
    filemode='w',
)

k = 0
for i in range(5):
    k += i
    logging.info('[INFO]:calling i={i}'.format(i=i))
```


## 如何优化代码
1. 最优先：保证代码可运行、不破坏结构、秩序
2. 权衡不同的方面
3. 定义指标，防止与客户的理解出现偏差
4. 不能牺牲代码可读性


## 如何命名
作者：hzwer
链接：https://zhuanlan.zhihu.com/p/104963169
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

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

## 另一个更全的（JAVA）

告别编码5分钟，命名2小时！史上最全的Java命名规范参考！ - 老刘的文章 - 知乎
https://zhuanlan.zhihu.com/p/96100037

### 命名规范

| 类型  | 约束                              | 例                                              |
|-----|---------------------------------|------------------------------------------------|
| 项目名 | 全部小写，多个单词用中划线分隔‘\-’             | spring\-cloud                                  |
| 包名  | 全部小写                            | com\.alibaba\.fastjson                         |
| 类名  | 单词首字母大写                         | Feature, ParserConfig,DefaultFieldDeserializer |
| 变量名 | 首字母小写，多个单词组成时，除首个单词，其他单词首字母都要大写 | password, userName                             |
| 常量名 | 全部大写，多个单词，用'\_'分隔               | CACHE\_EXPIRED\_TIME                           |
| 方法  | 同变量                             | read\(\), readObject\(\), getById\(\)          |

### 类命名

| 属性\(类\) | 约束                                   | 例                                                     |
|---------|--------------------------------------|-------------------------------------------------------|
| 抽象      | Abstract或 Base 开头                    | BaseUserService                                       |
| 枚举      | Enum 作为后缀                            | OSType                                                |
| 工具      | Utils作为后缀                            | StringUtils                                           |
| 异常类     | Exception结尾                          | RuntimeException                                      |
| 接口实现    | 接口名\+ Impl                           | UserServiceImpl                                       |
| 领域模型相   | /DO/DTO/VO/DAO                       | 正例：UserDAO，反例：UserDao                                 |
| 设计模式相关  | Builder，Factory等                     | 当使用到设计模式时，要使用对应的设计模式作为后缀，如ThreadFactory               |
| 处理特定功能  | Handler，Predicate，Validator          | 表示处理器，校验器，断言，这些类工厂还有配套的方法名，如handle，predicate，validate |
| 测试      | Test后缀                               | UserServiceTest，表示用来测试UserService类的                   |
| MVC分层   | Controller，Service，ServiceImpl，DAO后缀 | UserManageController，UserManageDAO                    |

### 四、方法
方法命名采用小驼峰的形式，首字小写，往后的每个单词首字母都要大写。 和类名不同的是，方法命名一般为动词或动词短语，与参数或参数名共同组成动宾短语，即动词 + 名词。一个好的函数名一般能通过名字直接获知该函数实现什么样的功能。

#### 1 返回真伪值的方法
注：Prefix-前缀，Suffix-后缀，Alone-单独使用

| 位置     | 单词     | 意义                                 | 例             |
|--------|--------|------------------------------------|---------------|
| Prefix | is     | 对象是否符合期待的状态                        | isValid       |
| Prefix | can    | 对象能否执行所期待的动作                       | canRemove     |
| Prefix | should | 调用方执行某个命令或方法是好还是不好,应不应该，或者说推荐还是不推荐 | shouldMigrate |
| Prefix | has    | 对象是否持有所期待的数据和属性                    | hasObservers  |
| Prefix | needs  | 调用方是否需要执行某个命令或方法                   | needsMigrate  |


#### 2 用来检查的方法

| 单词       | 意义                              | 例              |
|----------|---------------------------------|----------------|
| ensure   | 检查是否为期待的状态，不是则抛出异常或返回error code | ensureCapacity |
| validate | 检查是否为正确的状态，不是则抛出异常或返回error code | validateInputs |


#### 3 按需求才执行的方法

| 位置     | 单词        | 意义                        | 例                      |
|--------|-----------|---------------------------|------------------------|
| Suffix | IfNeeded  | 需要的时候执行，不需要的时候什么都不做       | drawIfNeeded           |
| Prefix | might     | 同上                        | mightCreate            |
| Prefix | try       | 尝试执行，失败时抛出异常或是返回errorcode | tryCreate              |
| Suffix | OrDefault | 尝试执行，失败时返回默认值             | getOrDefault           |
| Suffix | OrElse    | 尝试执行、失败时返回实际参数中指定的值       | getOrElse              |
| Prefix | force     | 强制尝试执行。error抛出异常或是返回值     | forceCreate, forceStop |


#### 4 异步相关方法

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


#### 5 回调方法


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


#### 6 操作对象生命周期的方法


| 单词         | 意义              | 例              |
|------------|-----------------|----------------|
| initialize | 初始化。也可作为延迟初始化使用 | initialize     |
| pause      | 暂停              | onPause ，pause |
| stop       | 停止              | onStop，stop    |
| abandon    | 销毁的替代           | abandon        |
| destroy    | 同上              | destroy        |
| dispose    | 同上              | dispose        |


#### 7 与集合操作相关的方法


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


#### 8 与数据相关的方法


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


#### 9 成对出现的动词

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


### 通用命名规则
1. 尽量不要使用拼音；杜绝拼音和英文混用。对于一些通用的表示或者难以用英文描述的可以采用拼音，一旦采用拼音就坚决不能和英文混用。
正例： BeiJing， HangZhou
反例： validateCanShu

2. 命名过程中尽量不要出现特殊的字符，常量除外。
3. 尽量不要和jdk或者框架中已存在的类重名，也不能使用java中的关键字命名。
4. 妙用介词，如for(可以用同音的4代替), to(可用同音的2代替), from, with，of等。如类名采用User4RedisDO，方法名getUserInfoFromRedis，convertJson2Map等。
