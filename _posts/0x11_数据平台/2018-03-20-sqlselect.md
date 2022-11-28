---
layout: post
title: 【SQL】SELECT专题
categories:
tags: 0x11_算法平台
keywords:
description:
order: 150
---



## select

```sql
SELECT 列名称
from 表名
where 条件1
group by 列名 having 条件2
order by  列名 asc/desc;
```

## 执行顺序
1. 先连接from后的数据源(若有join，则先执行on后条件，再连接数据源)。
2. 执行where条件
3. 执行group by
4. 执行having
5. 执行order by
6. 最后select 输出结果。


```sql
(8)SELECT (9)DISTINCT  (11)<Top Num><select list>
(1)FROM[left_table]
(3)<join_type>JOIN<right_table>
(2)        ON<join_condition>
(4)WHERE<where_condition>
(5)GROUPBY<group_by_list>
(6)WITH<CUBE | RollUP>
(7)HAVING<having_condition>
(10)ORDERBY<order_by_list>
```
逻辑查询处理阶段简介

- FROM：对FROM子句中的前两个表执行笛卡尔积（Cartesian product)(交叉联接），生成虚拟表VT1  
- ON：对VT1应用ON筛选器。只有那些使<join_condition>为真的行才被插入VT2
- OUTER(JOIN)：如 果指定了OUTER JOIN（相对于CROSS JOIN 或(INNERJOIN),保留表（preserved table：左外部联接把左表标记为保留表，右外部联接把右表标记为保留表，完全外部联接把两个表都标记为保留表）中未找到匹配的行将作为外部行添加到 VT2,生成VT3.如果FROM子句包含两个以上的表，则对上一个联接生成的结果表和下一个表重复执行步骤1到步骤3，直到处理完所有的表为止。  
- WHERE：对VT3应用WHERE筛选器。只有使<where_condition>为true的行才被插入VT4.  
- GROUPBY：按GROUP BY子句中的列列表对VT4中的行分组，生成VT5.  
- CUBE/ROLLUP：把超组(Suppergroups)插入VT5,生成VT6.  
- HAVING：对VT6应用HAVING筛选器。只有使<having_condition>为true的组才会被插入VT7.  
- SELECT：处理SELECT列表，产生VT8
- DISTINCT：将重复的行从VT8中移除，产生VT9
- ORDERBY：将VT9中的行按ORDER BY 子句中的列列表排序，生成游标（VC10)
- TOP：从VC10的开始处选择指定数量或比例的行，生成表VT11,并返回调用者



## group by

group by 相关的汇总函数
```sql
count([distinct|all] 字段1)
count(*),计算包含null行数
count(a),计算不包含a位null的行数

max, min, sum, avg, sum, avg
var_pop, var_samp 方差和样本方差
stddev_pop, stddev_samp 偏差和样本偏差
covar_pop(col1,col2), vovar_samp 协方差和样本协方差
corr(col1,col2) 相关系数
count(DISTINCT col1) - 合适的函数，都可以接受DISTINCT
```


给出名字
```
SELECT 列名 as 显示列名 where...
```

## union
两个表并到一起，并且删掉重复内容
```
SELECT field1,field2,...,from tablename1
UNION
SELECT  field1,field2,...,from tablename2
UNION
SELECT  field1,field2,...,from tablenamen
...
```

- 把 UNION 换成 **UNION ALL**，把两个表并到一起，不删除重复内容  
- **EXCEPT** 差集，也就是在table1中，但不在table2中的结果。  
- **EXCEPT ALL** 表示不删除重复行  
- 有的数据库还可以用 **MINUS** 和 **MINUS ALL**
- INTERSECT 交集，表示同时出现在table1和table2中的结果  
- **INTERSECT ALL** 表示不删除重复行。  

注：差集和交集也可以用in/join来实现  


## join

- 笛卡尔积（CARTESIAN PRODUCT）  
- 内连接（INNER JOIN）：在笛卡尔积中，保留匹配的，舍去不匹配的。  
    - 自然连接（natural join）：对相同字段匹配
    - 等值连接：对等值匹配
    - 不等连接：对不等值匹配

- 外连接（outer join）：不但保留匹配，还保留一部分不匹配
    - 左外连接(left [outer] join)：保留匹配，还保留左边表的不匹配
    - 右外连接(right [outer] join)：保留匹配，还保留右边表的不匹配
    - 全外连接(full [outer] join)：保留匹配，保留左表、右表的不匹配
- 交叉连接
- 额外：**semi join, anti join**


```sql
SELECT field1, field2, ... ,fieldn
from join_tablename1
inner join join_tablename2
on joincondition;
```

三重内连接+别名
```sql
SELECT a.id, a.name, b.salary, c.department
from table_name1 a
inner join table_name2 b
on a.id=b.id
inner join table_name3 c
on a.id=c.id;
```

以上可以用where的形式实现(更简单)
```sql
SELECT a.id, a.name, b.salary, c.department
from table_name1 a, table_name2 b, table_name3 c
where a.id=b.id and a.id=c.id;
```

## 子查询
单行子查询
```sql
SELECT enamel,sal,job
    from t_employee
    where(sal,job)=(
            SELECT sal,job
                from t_employee
                where ename='smith');
```

多行单列
```sql
in（select...）
not in(select...)
```



## 函数

### 输出bool的运算符


```sql
>
<
=
!=、<>
>=
<=
between 取值1 and 取值2

is null
in（1，2)

like            通配符匹配
-- %表示多个字符或0个，
-- _表示单个字符,
-- [charlist]字符列中的任意单一字符,
-- [^charlist]不在字符列中的任意单一字符


regexp        正则表达式
    举例：‘cjgong’regexp 'g$' 返回1
    ^        匹配开始部分
    $        匹配结束部分
    .        匹配任意一个字符
    [字符集合]        匹配集合中的任意一个字符
    [^字符集合]        匹配集合中外的任意一个字符
    str1|str2|str3        匹配任意一个字符串
    *
    +
    字符串{N}            字符串出现N次
    字符串(M,N)        字符串出现至少M次，最多N次
```

### 逻辑运算符
（与C语言很像）
```
条件1 and 条件2 and 条件3
条件1 or 条件2 or 条件3

and(&&)
or(||)
not(!)
xor(异或)

位运算符（与C语言完全相同）
&
|
~
^
<<
>>
```



### CASE


简单Case

```sql
-- 公式：
case 列名
    when   条件值1   then  选择项1
    when   条件值2    then  选项2.......
    else     默认值      
end

-- 例子：
select
    case 　　job_level
        when    '1'     then    'rich'
        when　  '2'     then    'middle'
        when　  '3'     then    'poor'
        else       'not sure'
    end
from table_employee
```

复杂Case

```sql
-- 公式：
case  
    when  条件值1   then  选择项1
    when  条件值2   then  选择项2
    ...
    else 选择项n
end


-- 例子：
case
    when   job_level = '1'    then e_wage*1.97
    when   job_level = '2'   then e_wage*1.07
    when   job_level = '3'   then e_wage*1.06
    else     e_wage*1.05
end
```

### 函数1
```sql
distinct 字段1
is null：字段1 is null
is missing：字段1 is missing
contains：CONTAINS( 字段1, '"HEIBEI province" OR beijing' )
CONTAINS(*,'beijing')
```

### 类型转化函数

```sql
decimal, double, Integer, smallint,real  
Hex(arg):转化为参数的16进制表示。  
转化为字符串类型的：  
char, varchar  
Digits(arg):返回arg的字符串表示法，arg必须为decimal。  
转化为日期时间的：  
date, time,timestamp  
```

### 时间
Mysql 中的时间
```sql
year, quarter, month, week, day, hour, minute, second  
dayofyear(arg)  
Dayofweek(arg)  
days(arg):返回日期的整数表示法，从0001-01-01来的天数。   
midnight_seconds(arg):午夜和arg之间的秒数。  
Monthname(arg):返回arg的月份名。  
Dayname(arg):返回arg的星期。  
```

字符串时间
```sql
SELECT to_date('2008-12-29 16:25:46'); -- 返回日期
SELECT date_sub('2008-12-29',5); -- 日期减去一个天数
SELECT date_add('2008-12-29',5); -- 日期增加一个天数
SELECT datediff('2008-12-19','2008-12-10'); -- 两个日期之差
```

### 多列函数
```sql
coalesce(arg1,arg2….) -- 返回参数集中第一个非null参数。
greatest(col1,col2,...,coln) -- 返回多列中，最大的那个值
least()
```

### 字符串函数

```sql
length,lcase, ucase, ltrim , rtrim  
CONCAT(arg1,arg2) -- 连接两个字符串arg1和arg2。  
insert(arg1,pos,size,arg2) -- 返回一个，将arg1从pos处删除size个字符，将arg2插入该位置。  
left(arg,length) -- 返回arg最左边的length个字符串。  
right(arg,length) -- 返回一个有arg右边length个字节组成的字符串。
locate(arg1,arg2,<pos>;) -- 在arg2中查找arg1第一次出现的位置；如果指定pos，则从arg2的pos处开始查找  
posstr(arg1,arg2) -- 返回arg2第一次在arg1中出现的位置。  
repeat(arg1 ,num_times) -- 返回arg1被重复num_times次的字符串。  
replace(arg1,arg2,arg3) -- 将在arg1中的所有arg2替换成arg3。  
space(arg) -- 返回一个包含arg个空格的字符串。  
substr(arg1,pos,<length>;):返回arg1中pos位置开始的length个字符，如果没指定length，则返回剩余的字符。
initcap(col) -- 每个单词的首字母大写（一个字符串中可以有多个单词）
```
### 数学函数

```sql
Abs

ln, log10, log2, log(base,arg)
exp(d), power(a,b)
Power(arg1,arg2) -- 返回arg1的arg2次方。

Mod(arg1,arg2) --返回arg1除以arg2的余数，符号与arg1相同。
Round(arg1,arg2) -- 四舍五入截断处理，arg2是位数，如果arg2为负，则对小数点前的数做四舍五入处理。
Ceil(arg) -- 返回大于或等于arg的最小整数。
Floor(arg) -- 返回小于或等于参数的最小整数。

Rand() -- 返回1到1之间的随机数。
Sign(arg) -- 返回arg的符号指示符。-1,0,1表示。
truncate(arg1,arg2) -- 截断arg1，arg2是位数，如果arg2是负数，则保留arg1小数点前的arg2位。

e(),pi() 常数e和常数pi

factorial(5) -- 阶乘
```



### 算术运算符
（与C语言很像）
```sql
+
-
*
/
% 余数
A & B 按位与
A|B 按位或
A^B 按位异或
~A 按位反
```


### 统计运算符
```sql
percentile_approx(col_name,0.25) # 求0.25分位数
```



## 窗口函数

一般语法是：
```sql
function() OVER([partition_clause]  order_by_clause)
```

### over部分
```
over(order by col1)：对查询的整个数据范围内的数据，按照字段col1排序
over(partition by col2)：按照字段col2分组，统计每个组内的数据
over(partition by col2 order by col1)：按照字段col2分组，每个分组内按照字段col1排序
over(order by col3 range between 2 preceding and 2 following)：窗口范围为当前行数据幅度减2加2后的范围内的 ---- 按列值控制窗口大小
over(order by col3 rows between 2 preceding and 2 following)：窗口范围为当前行前后各移动2行 ---- 按行数控制窗口大小
```

关键字解释：

- ROWS：指定行
- RANGE：指定范围
- PRECEDING：往前
- FOLLOWING：往后
- CURRENT ROW：当前行
- UNBOUNDED：起点
- UNBOUNDED PRECEDING：表示从前面的起点开始
- UNBOUNDED FOLLOWING：表示到后面的终点结束


### function部分
#### 1. 排名函数

**ROW_NUMBER()**: 会对所有数值输出不同的序号，序号唯一连续；  
**RANK()**: 相同的值排名相同，并且排名数字靠前，（例如，排名可能是这样的：1,1,3,3,5,6,7）  
<!-- 公司hive里面不太对   -->

**DENSE_RANK**：排名序号连续(例如：1,1,2,2,3,3,4)  
**NTILE(n)**： 全部数据n等分，序号就是等分数(1到n),如果不能平均分配，那么序号靠后的组的数量不多于序号靠前的(例如，ntile(3)分5条记录，就是2,2,1)  


**PERCENT_RANK()**：计算当前行的百分比排名 ——（当前行排名 - 1）/（窗口分区中的行数 - 1）  
**CUME_DIST**：计算当前行的相对排名——（前面的行数[+相等值行数]）/（分区中的总行数）


应用案例1：
https://jingyan.baidu.com/article/9989c74604a644f648ecfef3.html

应用案例2：（选出每组最大的记录）  
```
SELECT * from app.app_temp_test where row_number(id)<=1;
```

#### 2. 描述统计函数

根据有无 order/partition 分为4种，细心体会：

```py
pd_df=pd.DataFrame(np.random.randint(low=0,high=3,size=(20,2)),columns=['a','b'])
df=spark.createDataFrame(pd_df).cache()
df.createOrReplaceTempView('df')
spark.sql('''
SELECT *,
count(*) over() as c1, -- 总行数
count(*) over(order by a asc) as c2, -- 递加行数，例如，a=[0,0,0,1,1], 那么结果就是[3,3,3,5,5]
count(*) over(partition by b) as c3, -- 分组行数，就是每个分组有多少行
count(*) over(partition by b order by a asc) as c4 --分组递加计数，先分组，对每组求递加行数
from
df
''').show()
```


**COUNT(*)** 4种都支持，但不支持 COUNT(distinct * )  
**SUM(col1)**  
**AVG(col1)**  
**MIN(col1)**, **MAX(col1)**

**FIRST(col1)**, **LAST(col1)** 【貌似】又可以写成FIRST_VALUE(col1), LAST_VALUE(col1)

lag()???


**stddev(col1)**, 样本标准差，只有一行数据时返回0  
**stddev_samp(col1)**, 样本标准差，只有一行数据时返回null  
**stddev_pop(col1)**, 总体标准差


**variance(col1)**：计算样本方差，只有一行数据时返回0  
**var_samp(col1)**：计算样本方差，只有一行数据时返回null  
**var_pop(col1)**：计算总体方差

注：*stddev()=sqrt( variance() ),
stddev_samp()=sqrt( var_samp() ),
stddec_pop=sqrt( var_pop() )*


**covar_samp(col1, col2)**：样本协方差  
**covar_pop(col1, col2)**： 总体协方差  
**corr(col1, col2)**： 相关系数  


[分析函数参考资料](https://blog.csdn.net/weixin_43274226/article/details/83304836)

## 表生成函数

单行多列->单行单列（横向拼接）
```sql
-- 拼接行：
CONCAT(col1,col2) -- 拼接每一个字段，按行
CONCAT_WS(",",col1,col2) -- 拼接,并且中间用逗号分隔
```

多行->单行（纵向拼接）
```sql
-- 把列拼接到一个单元格：（要与group by 配合使用）
-- 注意：新字段是 array 对象
collect_list
collect_set

-- 综合用法：(列拼接成一个单元格，并转为string)
CONCAT_WS(',',COLLECT_LIST(name))
CONCAT_WS(',',COLLECT_LIST(cast (name as string))) -- 非 string 的必须要转格式
```

单行单列->多行单列（纵向展开）
```sql
SELECT explode(split('a,b,c,d,e',','))
```

（进阶）单行单列->多行多列
```sql
SELECT t1.id,t2.serialno,t2.arr
FROM (SELECT 'xxx' as id,array('a','b','c') as arr) t1
LATERAL VIEW posexplode(t1.arr) t2 AS serialno,arr;
```

输出：


id | serialno | arr
|--|----------|-----|
xxx | 0 | a
xxx | 1 | b
xxx | 2 | c


## 特殊数据结构
### json
数据准备

```sql
CREATE TABLE tmp_example_json AS
SELECT id,json_str FROM
(SELECT '0' AS id,'[{"name":"王二狗","sex":"男","age":"25"},{"name":"李狗嗨","sex":"男","age":"47"}]' AS json_str)
UNION
(SELECT '1' AS id,'[{"name":"王三狗","sex":"女","age":"21"}]' AS json_str)
```

提取指定的值
```sql
SELECT id
,GET_JSON_OBJECT(json_str,'$.[0]') -- 提取第0个
,GET_JSON_OBJECT(json_str,'$.[0].name') -- 提取第0个的name属性
FROM tmp_example_json;
```
另外，不带中括号的json格式也可以用：
```
SELECT GET_JSON_OBJECT('{"name":"李狗嗨","sex":"男","age":"47"}','$.name')
```




json_tuple：外围没有中括号，且需要在 LATERAL VIEW 中使用：
```sql
SELECT JSON_TUPLE('{"name":"王二狗","sex":"女","age":"21"}','name','age') AS (name,age)
```

遍历提取。预先不知道 json array 长度，并且提取出所有name，需要手动分割，然后提取。（暂时没找到更优雅的方法）

```sql
SELECT  id
        ,GET_JSON_OBJECT(json_str_split,'$.name') AS name
FROM    (
            SELECT  t1.id
                    ,t2.json_str_split
            FROM    (
                        SELECT  id
                                ,
                                    REGEXP_REPLACE(
                                        REGEXP_EXTRACT(json_str,'^\\[(.+)\\]$',1)    --把前后中括号去掉
                                        ,'\}\,\{\"name"'
                                        ,'\}\|\|\{\"name\"'    --把两个name之间的逗号换成||
                                    )
                                 AS json_str_tmp
                        FROM    tmp_example_json
                    ) t1
            LATERAL VIEW EXPLODE(SPLIT(t1.json_str_tmp,'\\|\\|')) t2 AS json_str_split
        )
;
```

## with语句

```sql
WITH
tmp_table_01 AS (SELECT 1 AS col1)
-- 前面定义的表，后面可以直接用
,tmp_table_02 AS (SELECT  col1+9 AS col1 FROM    tmp_table_01)
insert overwrite table table_name partition (dt='dt')
SELECT  * FROM    tmp_table_01 UNION ALL SELECT  * FROM    tmp_table_02;
```

## 查询案例

### 找出重复的记录
```sql
SELECT id,COUNT(id)
FROM table1
WHERE dt = '2018-02-16'
GROUP BY id HAVING COUNT(id) > 2;
```

## 性能优化

**1** 避免使用 `select *`，而是使用 `select col1, col2` （未测试）

**2** where 条件中尽量避免函数，比起 `where col1 + 5 > 90`，更推荐 `where col1 > 90 - 5`

**3** 避免类型隐式转换，如果 `col1` 是string类型，那么推荐 `where col1 = '1'`，而不是 `col1 = 1`



**4** 避免用 `or`, `!=`, `<>`，而是用 `union` (未测试)  
原因：Mysql 使用 or 之类可能会使索引失效

```sql
-- 不推荐
select col1 from table1 where col2 == 1 or col2 == 2
-- 推荐
select col1 from table1 where col2 ==1
union
select col1 from table1 where col2 ==2


-- 不推荐
select col1 from table1 where col2 <> 10
-- 推荐
select col1 from table1 where col2 < 10
union select col1 from table1 where col2 > 10

```

**5** 如果确定知道只有1条记录，那么使用 `limit`  
原因：使用 `limit 1` 之后，找到一个就不会再继续找了

```sql
-- 不推荐
select col1 from table1 where name == 'Tom'
-- 推荐
select col1 from table1 where name == 'Tom' limit 1;
```

**6** 尽量使用 `union all` 而不是 `union`，因为 `union` 还会尝试合并和排序

## 参考文献

[LATERAL VIEW](https://blog.csdn.net/clerk0324/article/details/58600284)  
https://www.cnblogs.com/liuxuewen/archive/2012/03/12/2392644.html  
[w2school:SQL教程](http://www.w3school.com.cn/sql/)  
[SQL字符串函数](https://www.cnblogs.com/vofill/p/6806962.html)  
[Hive字符串操作](https://www.cnblogs.com/iiwen/p/5611761.html)  
[Hive日期格式转换用法](http://blog.csdn.net/lichangzai/article/details/19406215)
