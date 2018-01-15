---
layout: post
title: 【Python】运算符.
categories:
tags: Python语法
keywords:
description:
order: 1124
---


## 算术运算
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>运算符</th><th>名称</th><th>说明</th><th>例子</th></tr></thead><tbody>
 <tr><td>+</td><td>加</td><td>两个对象相加</td><td>3 + 5得到8。'a' + 'b'得到'ab'。</td></tr>
 <tr><td>-</td><td>减</td><td>负数或是减号</td><td>-5.2得到负数。50 - 24得到26。</td></tr>
 <tr><td>*</td><td>乘</td><td>两个数相乘，或list重复若干次</td><td>2 * 3得到6。'la' * 3得到'lalala'。</td></tr>
 <tr><td>**</td><td>幂</td><td>返回x的y次幂</td><td>3 ** 4得到81</td></tr>
 <tr><td>/</td><td>除</td><td>x除以y</td><td>4/3得到1.3333333</td></tr>
 <tr><td>//</td><td>取整除</td><td>返回商的整数部分</td><td>4 // 3.0得到1.0</td></tr>
 <tr><td>%</td><td>取模</td><td>返回除法的余数</td><td>8%3得到2。-25.5%2.25得到1.5</td></tr>
</tbody></table>

## 布尔比较运算
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>运算符</th><th>名称</th><th>说明</th><th>例子</th></tr></thead><tbody>
 <tr><td><</td><td>小于</td><td>返回x是否小于y。所有比较运算符返回1表示真，返回0表示假。这分别与特殊的变量True和False等价。注意，这些变量名的大写。</td><td>5 < 3返回0（即False）而3 < 5返回1（即True）。比较可以被任意连接：3 < 5 < 7返回True。</td></tr>
 <tr><td>></td><td>大于</td><td>返回x是否大于y</td><td>5 > 3返回True。如果两个操作数都是数字，它们首先被转换为一个共同的类型。否则，它总是返回False。</td></tr>
 <tr><td> &lt;= </td><td>小于等于</td><td>返回x是否小于等于y</td><td>x = 3; y = 6; x <= y返回True。</td></tr>
 <tr><td>>=</td><td>大于等于</td><td>返回x是否大于等于y</td><td>x = 4; y = 3; x >= y返回True。</td></tr>
 <tr><td>==</td><td>等于</td><td>比较对象是否相等，注意，是对象！</td><td>x = 2; y = 2; x == y返回True。x = 'str'; y = 'stR'; x == y返回False。x = 'str'; y = 'str'; x == y返回True。</td></tr>
 <tr><td>!=</td><td>不等于</td><td>比较两个对象是否不相等</td><td>x = 2; y = 3; x != y返回True。</td></tr>
</tbody></table>


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
==表示判断两个对象是否相等，is判断两个对象是否是同一个

- 语句末尾加一个\ 这个表示一句没写完，下一行继续这一行内容
- 成块注释的技巧：用三个引号。可以当成注释来使用


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
8. 优先级排行榜第8名——按位&、^、|，其实这三个中也是有优先级顺序的，但是他们处于同一级别，故而不细分
9. 优先级排行榜第9名——比较运算符
10. 优先级排行榜第10名——逻辑的not、and、or
11. 优先级排行榜第11名——lambda表达式
