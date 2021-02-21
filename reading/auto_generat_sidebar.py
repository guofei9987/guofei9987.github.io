# print sidebar & detail list
# 我另外写了一个多叉树实现的版本。
# 我的目录结构都是两级，且都在docs下，所以也就不需要多叉树了。

# %%
import os
import re
import string

# 字数统计
regex_chinese = re.compile('[\u4e00-\u9fa5]')  # 汉字
regex_English = re.compile('[0-9a-zA_Z]+')  # 数字和英语单词
# 去掉中文标点和英文标点
regex_punctuation = re.compile('[!"()*+,./:;<=>?{|}~。；，：“”（）、？《》]')


def word_count(file_name_md):
    '''
    返回文件的字数，（新增）二级目录
    '''
    f = open(file_name_md, 'r', encoding='utf-8')
    try:
        passages = f.readlines()
    except:
        print(file_name_md)
        return
    # word_num = sum([len(passage.replace('\n', '').replace(' ', '')) for passage in passages])
    word_num = sum([len(regex_chinese.findall(passage))
                    + len(regex_English.findall(passage))
                    + len(regex_punctuation.findall(passage))
                    for passage in passages])

    title_level_2 = [line.replace('## ', '').replace('\n', '') for line in passages if line.startswith('## ')]
    f.close()
    return word_num, title_level_2


# %%

path_walker = os.walk('docs', topdown=True)
path_all = list(path_walker)[1:]
path_all = sorted(path_all, key=lambda x: x[0])
path_all = [(top, dirs, sorted(nondirs)) for top, dirs, nondirs in path_all]

sidebar = ''
detail = ''
data = []
for top, dirs, nondirs in path_all:
    block_name = top.replace('docs' + os.sep, '')
    sidebar += '* ' + block_name + '\n'
    # detail += '\n### ' + block_name + '\n'
    detail += '''
###  {block_name}
|板块|书目|
|--|--|
'''.format(block_name=block_name)
    for file_name in nondirs:
        word_num, title_level_2 = word_count(top + os.sep + file_name)
        article = file_name.replace('.md', '')
        sidebar += '    * [{article}<sup style = "color:red">{word_num}字<sup>](docs/{block_name}/{article}.md)\n'. \
            format(article=article, block_name=block_name, word_num=word_num)
        detail += '|[{article}<sup style = "color:red">{word_num}字<sup>](docs/{block_name}/{article}.md)|{title_level_2}\n'. \
            format(article=article,
                   block_name=block_name,
                   word_num=word_num,
                   title_level_2='，'.join(['[{l2}](docs/{block_name}/{article}.md?id={l2})'.
                                          format(l2=l2, block_name=block_name, article=article)
                                           for l2 in title_level_2]))
        data.append([article, block_name, word_num])

print('_' * 10, 'sidebar:', '_' * 10)
print(sidebar)
print('_' * 10, 'detail:', '_' * 10)
print(detail)
print('_' * 10, 'total words:', '_' * 10)
print(sum(i[2] for i in data))
# %%
head = '''
<a href="http://www.guofei.site" target='blog'>
<img src="https://www.guofei.site/public/about/me.png"  alt="回到blog" height="64" width="64">
</a>
<br>
<a href="{{ site.author.github }}" target='GitHub'>
  <img src="https://img.shields.io/github/followers/guofei9987?label=%20&logoColor=%231abc9c&style=social"  class="img-ronuded avatar" style="border-width:0px; border-color:#000">
</a>

'''

tail = '''

* 书单
    * [书单](书单/书单.md)
    * [读完的书单](书单/读完的书单.md)
* 建站日志
    * [快速开始](建站日志/quickstart.md)
    * [配置项](建站日志/configuration.md)
    * [主题](建站日志/themes.md)
    * [扩展Markdown语法<sup style="color:red">(new)<sup>](建站日志/markdown.md)
    * [mermaid语法](建站日志/mermaid.md)
'''

f = open('sidebar.md', 'w', encoding='utf-8')
# print(head+content)
# f.write(head+content.encode('utf-8').decode('utf-8'))
f.write(head + sidebar + tail)
f.close()

f = open('homepage.md', 'w', encoding='utf-8')
f.write(detail)
f.close()
