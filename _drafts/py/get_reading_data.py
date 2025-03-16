# -*- coding: utf-8 -*-

"""
获取 reading 下的“书目”、字数等信息
"""


import os
import re
import json


class WordCounter:
    def __init__(self):
        self.regex_chinese = re.compile('[\u4e00-\u9fa5]')  # 汉字
        self.regex_english = re.compile('[0-9a-zA-Z]+')  # 数字和英语单词

    def cnt(self, text):
        return len(self.regex_chinese.findall(text)) \
            + len(self.regex_english.findall(text))


def get_h2(text):
    # 获取所有的 h2
    return [line.replace('## ', '')
            for line in text.split('\n') if line.startswith('## ')]


word_counter = WordCounter()


def get_msg(text):
    # 返回：文件的字数，二级目录
    return word_counter.cnt(text), get_h2(text)


# %%

work_path = './_reading/'

path_walker = os.walk(work_path, topdown=True)
path_all = list(path_walker)[1:]
path_all = sorted(path_all, key=lambda x: x[0])
path_all = [(top, sorted(filename)) for top, dirs, filename in path_all]

total_words = 0
res_json = []
for path, filenames in path_all:
    res_json_1 = []
    for filename in filenames:
        if not filename.endswith('.md'):
            continue
        with open(os.path.join(path, filename), 'r') as f:
            text = f.read()

        word_cnt, all_h2 = get_msg(text)
        total_words += word_cnt

        res_json_1.append({'l3': filename.replace('.md', ''), 'cnt': word_cnt, 'h2': all_h2})

    res_json.append({
        "l1": path.replace(work_path, ''),
        "l2": res_json_1})

with open('./pages/reading.json', 'w') as f:
    json.dump(res_json, f, ensure_ascii=False)

total_words_str = "{}万".format(round(total_words / 10000, ndigits=1))

# %%总字数写入到 _data 里面
with open('./_data/cnt_reading_words.json', 'w') as f:
    json.dump({"cnt_reading_words_precision": total_words,
               "cnt_reading_words": total_words_str
               }
              , f, ensure_ascii=False, indent='')
