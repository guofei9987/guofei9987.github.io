---
layout: post
title: 数据查询优化
categories:
tags: 1-1-算法平台
keywords:
description:
order: 190
---

## Presto优化
### 一、Presto存储优化
1. 合理设置分区  
与Hive类似，Presto会根据元信息读取分区数据，合理的分区能减少Presto数据读取量，提升查询性能。
2. 使用列式存储  
Presto对ORC文件读取做了特定优化，因此在Hive中创建Presto使用的表时，建议采用ORC格式存储。
3. 使用压缩  
数据压缩可以减少节点间数据传输对IO带宽压力，对于即席查询需要快速解压，建议采用snappy压缩
4. 预先排序  
对于已经排序的数据，在查询的数据过滤阶段，ORC格式支持跳过读取不必要的数据。比如对于经常需要过滤的字段可以预先排序。
```sql
INSERT INTO table nation_orc partition(p) SELECT * FROM nation SORT BY n_name;
```
在查询阶段，如果需要过滤n_name字段，则性能将提升。
```sql
SELECT count(*) FROM nation_orc WHERE n_name=’AUSTRALIA’;
```
### 二、Presto查询优化
1. 只选择使用必要的字段  
由于采用列式存储，选择需要的字段可加快字段的读取、减少数据量。避免采用*读取所有字段。  
```sql
[GOOD]: SELECT time,user,host FROM tbl
[BAD]:  SELECT * FROM tbl
```
2. 过滤条件必须加上分区字段  
对于有分区的表，where语句中优先使用分区字段进行过滤。例如，下表中，acct_day是分区字段，visit_time是普通字段
```sql
[GOOD]: SELECT time,user,host FROM tbl where acct_day=20171101
[BAD]:  SELECT * FROM tbl where visit_time=20171101
```
3. Group By语句优化

合理安排Group by语句中字段顺序对性能有一定提升。将Group By语句中字段按照每个字段distinct数据多少进行降序排列。
```sql
[GOOD]: SELECT GROUP BY uid, gender
[BAD]:  SELECT GROUP BY gender, uid
```
4. Order by时使用Limit  
Order by需要扫描数据到单个worker节点进行排序，导致单个worker需要大量内存。如果是查询Top N或者Bottom N，使用limit可减少排序计算和内存压力。
```sql
[GOOD]: SELECT * FROM tbl ORDER BY time LIMIT 100
[BAD]:  SELECT * FROM tbl ORDER BY time
```
5. 使用近似聚合函数  
Presto有一些近似聚合函数，对于允许有少量误差的查询场景，使用这些函数对查询性能有大幅提升。比如使用approx_distinct() 函数比Count(distinct x)有大概2.3%的误差。
6. 用regexp_like代替多个like语句  
Presto查询优化器没有对多个like语句进行优化，使用regexp_like对性能有较大提升
7. 使用Join语句时将大表放在左边

Presto中join的默认算法是broadcast join，即将join左边的表分割到多个worker，然后将join右边的表数据整个复制一份发送到每个worker进行计算。如果右边的表数据量太大，则可能会报内存溢出错误。
8. 使用join语句时条件过滤尽量在ON阶段完成，而少用WHERE

ON 条件（“A LEFT JOIN B ON 条件表达式”中的ON）用来决定如何从 B 表中检索数据行。如果 B 表中没有任何一行数据匹配 ON 的条件,将会额外生成一行所有列为 NULL 的数据,在匹配阶段 WHERE 子句的条件都不会被使用。仅在匹配阶段完成以后，WHERE 子句条件才会被使用。它将从匹配阶段产生的数据中检索过滤。
9. 使用join取代子查询  
在数据量比较大时，使用inner join取代exists，使用left join取代 not exists 性能上可以得到较大的提升
```sql
[GOOD] select t1.* from t1   inner join (select distinct r_id from t2) t2 on t1.id= t2.r_id   
[BAD] select * from t1 where exists(select 1 from t2 where t1.id=t2.r_id);  
```
10. 分析函数中，Rank函数比row_number函数更快
11. UNION ALL比UNION效率高（因为UNION额外有去重功能）



## Hive优化

1. join前使用子表过滤掉不需要的数据（新版本Hive已经优化过，无需再考虑）
2. 解决数据倾斜问题  
1. 多表join时，每个on语句使用同样的连接键（可以减少job数）  
1. join时，把小表放前面，大表放后面，hive会自动缓存其它表  


## 参考资料
[Presto查询优化](https://blog.csdn.net/freefishly/article/details/79081764)
