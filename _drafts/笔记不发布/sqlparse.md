
```bash
!pip install sqlparse
```

## 入门功能
## split:分割sql
```
sqlparse.split(sql,encoding = None)
```

如果sql包含多行sql文本，返回一个list，元素是单个的sql语句(string)

## format:美化sql

```Python
options = dict(
    keyword_case='upper'  # 保留字转大写，也可转小写 'lower'
    , identifier_case='upper'  # 标识符转大写，也可转小写 'lower'
    , strip_comments=True  # 删除注释
    , reindent=True  # 美化缩进
)

sqlparse.format(sql.lower(), encoding=None, **options)
```

## 进阶功能
## statement

```python
statements = sqlparse.parse(sql) # 返回list，每个元素对应一个sql语句(Statement 对象)
```

可以对 statement 做遍历：
```Python
for iter_num, token in enumerate(statements[0]):
    print('iter_num={} | type={} | ttype={} | value={}'.
          format(iter_num, type(token), token.ttype, token.value))

# 除了可以按照 generator 使用外，还可以索引，如:
token = statement[0]
```

遍历后，有可能会遇到以下对象：
- Token: Token是最基本的单位，不能再遍历了（其他元素都可以继续遍历）。ttype 可能是：
  - 空格、空行: `Token.Text.Whitespace.Newline`, `Token.Text.Whitespace`
  - select, insert, update, delete: `Token.Keyword.DML`
  - create, drop, alter: `Token.Keyword.DDL`
  -
  - `from`, `inner join`, `on` 等: `Token.Keyword`
  - 分号、括号等：`Token.Punctuation`
  - 关键词 `Keyword`，例如 where、and等
  - 通配符，也就是星号：`Wildcard`
- `IdentifierList` 是你 select 了哪些字段。
- `Function` 如果对字段用了函数，这个就是整体带函数的。下钻一层后这个函数是 Identifier，再下钻后是 Token
- `Identifier` 可以是子查询，连同括号. 也可以是表名. 如果 select 了一个字段，也可以是字段
- `Comparison` 单个的比较条件，可以继续拆分，得到最基本的单位，例如，['col','>','1']
- `Parenthesis`  从Identifier 取出来的，对这个做遍历得到子语句
- `Where` : 'where' + where条件，对这个 Where 可以再次遍历，得到 `Token.Keyword` 的 where， `Comparison` 比较条件，`Keyword` and


### token
```python
token.value # 返回文本，这个token对应的内容
token.ttype

token.parent # 上一层对象
token.is_group #?
token.is_keyword # 多说一句，select 也算
token.is_whitespace # 空格、空行
token.normalized # 不止是 token，其它对象也能用，返回格式化后的 string


token.match() # ?
token.flatten() # 转为list

token.has_ancestor(other) # other 是否是 token 的祖先（祖先定义为token的n层parent）
token.is_child_of(other) # other 是否是 token 的 父
```


### IdentifierList
遇到 IdentifierList 可以继续遍历

```python
for token in file_parse[0]:
    if isinstance(token,sqlparse.sql.IdentifierList):
        print('-'*30)
        print('type_token={}|ttype={}|value={}'.format(type(token),token.ttype,token.value))
        for token_sub in token.get_identifiers():
            print('type_token={}|ttype={}|value={}'.format(type(token),token.ttype,token.value))
```
*IdentifierList 也可以直接遍历，会把token和Identifier都遍历出来*  


```python
IdentifierList.get_identifiers()
# 会返回所有的 identifier，其中不包含空格和标点符号

il.token_first() # Returns the first child token.
# skip_ws, skip_cm 是否忽略whitespace、comments
il.token_next(idx)
il.token_prev()

il.token_index(token) # token 子对象在 il 中的位置号，不过不在，会报错
```

### Identifier
*Identifier 可以用 get_real_name() 获取真名*  

```python
for token in file_parse[0]:
    if isinstance(token,sqlparse.sql.Identifier):
        print('type_token={}|ttype={}|value={}｜real_name={}'.format(type(token),token.ttype,token.value,token.get_real_name()))
```

看了一眼都是啥
- 子查询是 Identifier
- select 后面的字段是 `IdentifierList`，但如果select 1个字段，就变成了 `Identifier`
- 会把 `row_number()` 语句拆成好几个Identifier

### statement
```python
statement = sqlparse.parse(sql)[0]

# 上面 token 的方法全都有，此外还有以下方法：
statement.get_type() # 这个语句的类型，`SELECT`, `UPDATE`, `DELETE` , `CREATE`  ,`INSERT`
statement.get_alias()
statement.get_sublists() # 一个 generator，试了 select，2个位置分别是 cols 和 tables
statement.get_token_at_offset(5) #?

# 下面这两个似乎都返回整个语句的别名，并且 Identifier 也有这个
statement.get_name()
statement.get_real_name()
statement.get_parent_name()
```

### 有用的语句

```python
sqlparse.sql.Case
sqlparse.sql.Where
sqlparse.sql.If # if-else
sqlparse.sql.Parenthesis # 括号
sqlparse.sql.For # for
sqlparse.sql.Assignment # 像var：= val;这样的赋值
```



```python
tokens_list = sqlparse.parse(sql) # 返回list，每个元素对应一个sql语句
sqlparse.sql.Statement(tokens=tokens_list[1]).get_type()
```
返回这个sql语句的类型，`SELECT`, `UPDATE`, `DELETE` , `CREATE`  ,`INSERT`

### 案例2


也可以用 sqlglot