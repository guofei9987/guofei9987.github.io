# -*- coding: utf-8 -*-

import os
import re
import string
import json
import requests

with open('../_data/data_github.json', 'r') as f:
    num_follower = json.load(f)['followers']

# %% 字数统计
regex_chinese = re.compile('[\u4e00-\u9fa5]')  # 汉字
regex_English = re.compile('[0-9a-zA-Z]+')  # 数字和英语单词
# 去掉中文标点和英文标点
regex_punctuation = re.compile('[!"()*+,./:;<=>?{|}~。；，：“”（）、？《》]')


def get_msg(file_name_md):
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
    word_num = sum([
        len(regex_chinese.findall(passage))
        + len(regex_English.findall(passage))
        # + len(regex_punctuation.findall(passage))
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
        if file_name == '.DS_Store':
            continue
        word_num, title_level_2 = get_msg(top + os.sep + file_name)
        article = file_name.replace('.md', '')
        sidebar += '    * [{article}<sup style = "color:red">{word_num}字<sup>](docs/{block_name}/{article}.md)\n'. \
            format(article=article, block_name=block_name, word_num=word_num)
        detail += '|[{article}<sup style = "color:red">{word_num}字<sup>](docs/{block_name}/{article}.md)|{title_level_2}\n'. \
            format(article=article,
                   block_name=block_name,
                   word_num=word_num,
                   title_level_2='，'.join(['[{l2}](docs/{block_name}/{article}.md?id={l2_trim})'.
                                          format(l2=l2.replace('_', ' ')
                                                 , l2_trim=l2.replace(' ', '%20'),
                                                 block_name=block_name,
                                                 article=article)
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

total_words_str = "{} 万".format(round(total_words / 10000, ndigits=1))
# %%总字数写入到 _data 里面
import json

with open('../_data/cnt_reading_words.json', 'w') as f:
    json.dump({"cnt_reading_words_precision": total_words,
               "cnt_reading_words": total_words_str
               }
              , f, ensure_ascii=False, indent='')

r = requests.get('https://www.guofei.site/pages/book_list.json')

book_list = json.loads(r.content.decode('utf-8'))
print('总字数写入 json')

# %% 侧边栏
head = f'''
<a href="http://www.guofei.site" target='blog'>
<img src="https://www.guofei.site/public/about/me.png"  alt="回到blog" height="64" width="64">
</a>
<br>
<a href="https://github.com/guofei9987/" target='GitHub'>
❤️ {num_follower}
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
f.write('\n读书 **{} 本**，笔记总字数 **{} 字**\n'.format(len(book_list)， total_words) + detail)
f.close()

# %% guofei.site 首页专用，链接到新库
f = open('all.md', 'w', encoding='utf-8')
f.write(detail_2)
f.close()

# %% 封面

coverpage = '''

# 郭飞的知识宝库

> 人类必将化身为神

* (读书笔记累积 {} 字)

[GitHub](https://github.com/guofei9987/guofei9987.github.io)
[读书](/README)

![logo](media/cover.jpeg)
'''.format(total_words_str)

with open('coverpage.md', 'w') as f:
    f.write(coverpage)
