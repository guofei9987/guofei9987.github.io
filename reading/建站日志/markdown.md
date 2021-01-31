
## emoji
http://emojihomepage.com/
## markdown 语法

下面是分割线

---

### 1. 斜体和粗体
可以使用*斜体*，也可以使用**粗体**，或者使用~~删除线~~
```
*斜体*
**粗体**
~~删除线~~
```

### 2. 链接

```
[这是一个链接](https://www.baidu.com)
<a href='https://www.guofei.site/StatisticsBlog/describe.htm' target="describe">描述性统计</a>
```

[这是一个链接](https://www.baidu.com)


### 3. 无序列表

使用 \*，+，- 表示无序列表。

示例：

- 无序列表项 一
- 无序列表项 二
- 无序列表项 三

### 4. 有序列表

使用数字和点表示有序列表。

示例：

1. 有序列表项 一
2. 有序列表项 二
3. 有序列表项 三

### 6. 文字引用

使用 > 表示文字引用。

示例：

> 野火烧不尽，春风吹又生。
要打回车，否则还在引用中

引用中也可以套列表
> - 整理知识，学习笔记
> - 发布日记，杂文，所见所想
> 3. 撰写发布技术文稿（代码支持）
> 4. 撰写发布学术论文（LaTeX 公式支持）

### 7. 行内代码块

使用 \`代码\` 表示行内代码块。

示例：

让我们聊聊 `html`。

### 8.  代码块

使用 四个缩进空格 表示代码块。

示例：

    这是一个代码块，此行左侧有四个不可见的空格。

### 9.  插入图像



![我的头像](/public/about/me.png)

```
![我的头像](https://www.guofei.site/public/about/me.png)
<img src='https://www.guofei.site/public/about/me.png'>
```


### iframe

```
<iframe src="https://guofei9987.github.io/donate/" style="overflow-x:hidden;overflow-y:hidden; border:0xp none #fff; min-height:240px; width:100%;"  frameborder="0" scrolling="no"></iframe>
```
<iframe src="https://guofei9987.github.io/donate/" style="overflow-x:hidden;overflow-y:hidden; border:0xp none #fff; min-height:240px; width:100%;"  frameborder="0" scrolling="no"></iframe>

### 4. 注脚

使用 [^keyword] 表示注脚。

这是一个注脚[^footnote]的样例。

这是第二个注脚[^footnote2]的样例。

### 5. LaTeX 公式

传送门：[latex](http://www.guofei.site/2017/03/10/LateX.html)

$y=\int x^2$
### 6. 代码[^code]

```python
@requires_authorization
class SomeClass:
    pass

if __name__ == '__main__':
    # A comment
    print 'hello world'
```

### 12. 表格支持

| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机     | \$1600 |   5     |
| 手机        |   \$12   |   12   |
| 管线        |    \$1    |  234  |


### 13. 定义型列表

名词 1
:   定义 1（左侧有一个可见的冒号和四个不可见的空格）

代码块 2
:   这是代码块的定义（左侧有一个可见的冒号和四个不可见的空格）

        代码块（左侧有八个不可见的空格）


### 14. Html 语言

<table>
    <tr>
        <th rowspan="2">值班人员</th>
        <th>星期一</th>
        <th>星期二</th>
        <th>星期三</th>
    </tr>
    <tr>
        <td>李强</td>
        <td>张明</td>
        <td>王平</td>
    </tr>
</table>



### 16. 待办事宜 Todo 列表

使用带有 [ ] 或 [x] （未完成或已完成）项的列表语法撰写一个待办事宜列表，并且支持子列表嵌套以及混用Markdown语法

- [ ] 待办1
- [ ] 待办2

### 内置图标
<i class="icon-share"></i> 发布：将当前的文稿生成固定链接，在网络上发布，分享
<i class="icon-file"></i> 新建：开始撰写一篇新的文稿
<i class="icon-trash"></i> 删除：删除当前的文稿
<i class="icon-cloud"></i> 导出：将当前的文稿转化为 Markdown 文本或者 Html 格式，并导出到本地
<i class="icon-reorder"></i> 列表：所有新增和过往的文稿都可以在这里查看、操作
<i class="icon-pencil"></i> 模式：切换 普通/Vim/Emacs 编辑模式
<i class="icon-list"></i> 目录：快速导航当前文稿的目录结构以跳转到感兴趣的段落
<i class="icon-chevron-sign-left"></i> 视图：互换左边编辑区和右边预览区的位置
<i class="icon-adjust"></i> 主题：内置了黑白两种模式的主题，试试 **黑色主题**，超炫！
<i class="icon-desktop"></i> 阅读：心无旁骛的阅读模式提供超一流的阅读体验
<i class="icon-fullscreen"></i> 全屏：简洁，简洁，再简洁，一个完全沉浸式的写作和阅读环境


[^footnote]: 这是一个 *注脚* 的 **文本**。

[^footnote2]: 这是另一个 *注脚* 的 **文本**。



[^LaTeX]: 支持 **LaTeX** 编辑显示支持，例如：$\sum_{i=1}^n a_i=0$， 访问 [MathJax][4] 参考更多使用方法。


[^code]: 代码高亮功能支持包括 Java, Python, JavaScript 在内的，**四十一** 种主流编程语言。





## docsify扩展markdown语法
## 强调内容


```py
!> 一段重要的内容，可以和其他 **Markdown** 语法混用。
```

!> 一段重要的内容，可以和其他 **Markdown** 语法混用。

```markdown
?> _TODO_ 完善示例
```

?> _TODO_ 完善示例

## 忽略编译链接

有时候我们会把其他一些相对路径放到链接上，你必须告诉 docsify 你不需要编译这个链接。 例如：

```md
[link](/demo/)
```

它将被编译为 `<a href="/#/demo/">link</a>` 并将加载 `/demo/README.md`. 可能你想跳转到 `/demo/index.html`。

现在你可以做到这一点

```md
[link](/demo/ ':ignore')
```

即将会得到 `<a href="/demo/">link</a>` html 代码。不要担心，你仍然可以为链接设置标题。

```md
[link](/demo/ ':ignore title')

<a href="/demo/" title="title">link</a>
```

## 设置链接的 target 属性

```md
[link](/demo ':target=_blank')
[link](/demo2 ':target=_self')
```


[文档嵌入](https://docsify.js.org/#/zh-cn/embed-files)

## 关于css
下面这个可以浮动字符
```html
.markdown-section h2:after {
    content: "+--";
    float: right
}
```

## 其它
```
▓▓▓▓▓▓░░░░ 54%
```
