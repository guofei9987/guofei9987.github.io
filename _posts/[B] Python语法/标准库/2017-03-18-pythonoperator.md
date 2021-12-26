---
layout: post
title: 【Python】运算符&math
categories:
tags: 0xb0_Python语法
keywords:
description:
order: 1202
---


## 算术运算


| 运算符  | 名称  | 说明                             |
|------|-----|--------------------------------|
| \+   | 加   | 3 \+ 5得到8。'a' \+ 'b'得到'ab'。    |
| \-   | 减   | \-5\.2得到负数。50 \- 24得到26。       |
| \*   | 乘   | 2 \* 3得到6。'la' \* 3得到'lalala'。 |
| \*\* | 幂   | 3 \*\* 4得到81                   |
| /    | 除   | 4/3得到1\.3333333                |
| //   | 取整除 | 4 // 3\.0得到1\.0                |
| %    | 取模  | 8%3得到2。\-25\.5%2\.25得到1\.5     |



## 布尔运算

| 运算符 | 名称   | 说明                      |
|-----|------|-------------------------|
| <   | 小于   | 比较可以被任意连接：3 < 5 < 7     |
| >   | 大于   |                         |
| <=  | 小于等于 |                         |
| >=  | 大于等于 |                         |
| ==  | 等于   | 可以是对象，2 == 2; 2 == 'ab'，区别与 is 判断是否是同一个对象 |
| \!= | 不等于  | 可以是对象                   |
|all|判断全 True|all([True, False])|
|any||



- 运算优先级从高到底依次是not, and, or  
关系操作符：<，<=,==,>=,!=  
- 对字符串的大小比较：按照ascii码表比较，长度可以不一致  
    - "bbc">"ab"返回的是True
    - [1,1,0]>[0,1,1]返回的是True
    - "abcd"=="abc"是没有语法错误的，返回的是False
- 一个空序列为假，任何非空数列为真  
- 0为假，任何非0为真  


逻辑运算从左向右扫描，一旦能确定结果，那么便不再扫描，例如：
```python
if 1 or 1/0:
    print("hehe")
```
这个程序不会报错，因为1/0不运行

```python
bool(x)
```

### and和or

- `0, [], '', None` 都当作 False 处理
- and 和 or 运算，返回未必是 True/False，而是参与运算的值

规则如下:
- and返回第一个 False 对应的值。如果没有 False，返回最后一个值
- or返回第一个真值，如果都是假值，返回最后一个

```python
1 and 2 and 0 # 返回最后一个值，0
1 and 0 and 2 # 返回第一个短路值 0
1 and '' and 2 # 返回
1 and [] and 2 and 2/0 # 如果前面计算完了，后面就没必要算了，因此没有报错

0 or '' or [] or 1 or 2 # 返回第一个真值 1
```

妙用：
```python
# 实现三元表达式 (?:)
x > 0 and 'A' or 'B' # 如果 x>0 成立，返回 'A', 否则返回 'B'

# 提供默认值
x or 0 # 如果 x 是 None，返回0，否则返回x
```



## 位运算
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>运算符</th><th>名称</th><th>说明</th><th>例子</th></tr></thead><tbody>
 <tr><td><<</td><td>左移</td><td>把一个数的比特向左移一定数目（每个数在内存中都表示为比特或二进制数字，即0和1）</td><td>2 << 2得到8。——2按比特表示为10，左移n位等价于X*2**n</td></tr>
 <tr><td>>></td><td>右移</td><td>把一个数的比特向右移一定数目</td><td>11 >> 1得到5。——11按比特表示为1011，向右移动1比特后得到101，即十进制的5。</td></tr>
 <tr><td>&</td><td>按位与</td><td>数的按位与</td><td>5 & 3得到1。</td></tr>
 <tr><td>|</td><td>按位或</td><td>数的按位或</td><td>5 | 3得到7。</td></tr>
 <tr><td>^</td><td>按位异或</td><td>数的按位异或</td><td>5 ^ 3得到6</td></tr>
 <tr><td>~</td><td>按位翻转</td><td>x的按位翻转是-(x+1)</td><td>~5得到-6。</td></tr>
</tbody></table>


## 优先级
1. 优先级排行榜第1名——函数调用、寻址、下标
2. 优先级排行榜第2名——幂运算**
3. 优先级排行榜第3名——翻转运算~
a = ~4 * 2 ** 3
4. 优先级排行榜第4名——正负号
print 2 + 4 * -2
5. 优先级排行榜第5名—— * 、/、%
6. 优先级排行榜第6名——+、-
print 3 << 2 + 1
7. 优先级排行榜第7名——<<、>>
8. 优先级排行榜第8名——按位&、^、\|，其实这三个中也是有优先级顺序的，但是他们处于同一级别，故而不细分
9. 优先级排行榜第9名——比较运算符
10. 优先级排行榜第10名——逻辑的not、and、or
11. 优先级排行榜第11名——lambda表达式

## math

```python
import math
math.pi
math.e
math.ceil(x); math.floor(x)   # int也是向下取整
math.pow(x,y); pow(x,y)
math.log(x); math.log10(x)
math.sqrt(x)
math.exp(x)
math.sin(x); math.cos(); math.tan()
math.asin(); math.acos(); math.atan()
math.acos(x); math.asinh()
degrees(x)  # 弧度转角度
radians(x)  # 角度转弧度
```

## for-else 语句


如果 for 循环是正常跑完，执行 else。如果被 break 了，不但跳出循环，而且跳过 else
```py
for x in range(1, 8):
    if x == 5:
        print('find 5')
        break
else:
    print('can not find 5!')
```

while-else 同理



## 参考文献
https://docs.python.org/3/
