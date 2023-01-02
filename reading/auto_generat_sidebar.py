# -*- coding: utf-8 -*-


# print sidebar & detail list
# 我另外写了一个多叉树实现的版本。
# 我的目录结构都是两级，且都在docs下，所以也就不需要多叉树了。

# %%
import os
import re
import string
import json

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
detail_2 = ''
data = []
for top, dirs, nondirs in path_all:
    block_name = top.replace('docs' + os.sep, '')
    sidebar += '* ' + block_name + '\n'
    detail += '''
###  {block_name}
|板块|书目|
|---|---|
'''.format(block_name=block_name)
    detail_2 += '''
###  {block_name}
|板块|书目|
|---|---|
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

        detail_2 += '|<a href="/reading/#/docs/{block_name}/{article}" target="_blank">{article}<sup style = "color:red">{word_num}字<sup></a>|{title_level_2}\n'. \
            format(article=article,
                   block_name=block_name,
                   word_num=word_num,
                   title_level_2='，'.join(
                       ['<a href="/reading/#/docs/{block_name}/{article}.md?id={l2}" target="_blank">{l2}</a>'.
                            format(l2=l2, block_name=block_name, article=article)
                        for l2 in title_level_2]))

        data.append([article, block_name, word_num])

print('_' * 10, 'sidebar:', '_' * 10)
print(sidebar)
print('_' * 10, 'detail:', '_' * 10)
print(detail)
total_words = sum(i[2] for i in data)
print('_' * 10, 'total words = {}'.format(total_words), '_' * 10)

# %%总字数svg

total_words
# 写入 svg
with open('media/reading_words.svg', 'w') as f:
    f.write('''<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="67" height="22" role="img">
  <text x="1" y="20" style="fill:red;">{}万字
  </text>
</svg>'''.format(round(total_words / 10000, ndigits=1)))

# 写入 json
reading_words = {"reading_words": "{}万字".format(round(total_words / 10000, ndigits=1)),
                 "reading_words_accurate": total_words}
import json

with open('media/reading_words.json', 'w') as f:
    json.dump(reading_words, f, ensure_ascii=False, indent='')

# %% 读书数量

with open('media/book_cnt.svg', 'w') as f:
    with open('../pages/book_list.json') as f2:
        book_list = json.load(f2)
    f.write('''<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="58" height="22" role="img">
  <text x="1" y="20" style="fill:red;">{}本
  </text>
</svg>'''.format(len(book_list)))

# %% 侧边栏
head = '''
<a href="http://www.guofei.site" target='blog'>
<img src="https://www.guofei.site/public/about/me.png"  alt="回到blog" height="64" width="64">
</a>
<br>
<a href="https://github.com/guofei9987/" target='GitHub'>
  <img src="https://img.shields.io/github/followers/guofei9987?label=%20&logoColor=%231abc9c&style=social"  class="img-ronuded avatar" style="border-width:0px; border-color:#000">
</a>

'''

tail = '''


* 建站日志
    * [快速开始](建站日志/quickstart.md)
    * [配置项](建站日志/configuration.md)
    * [主题](建站日志/themes.md)
    * [扩展Markdown语法<sup style="color:red">(new)<sup>](建站日志/markdown.md)
'''

f = open('sidebar.md', 'w', encoding='utf-8')
f.write(head + sidebar + tail)
f.close()

# %% 访问.../reading 时出现封面，访问 .../reading/#/README 出现目录主页
f = open('README.md', 'w', encoding='utf-8')
f.write('\n笔记总字数 {} 字，读书 {} 本 \n'.format(total_words, len(book_list)) + detail)
f.close()

# %% guofei.site 首页专用，链接到新库
f = open('all.md', 'w', encoding='utf-8')
f.write(detail_2)
f.close()

# %% 封面

# coverpage = '''![logo](media/pic.jpg)
#
# # 郭飞的知识宝库
#
# > By guofei
#
# * 人类必将化身为神
# * (读书笔记累积 {} 字)
#
# [GitHub](https://github.com/guofei9987/guofei9987.github.io)
# [读书](/README)
# '''.format(total_words)
#
# with open('coverpage.md', 'w') as f:
#     f.write(coverpage)
