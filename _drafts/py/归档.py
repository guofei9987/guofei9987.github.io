"""
给“合集”的标题加上文章数量
为了性能考虑，“合集”对应的文章就不出现在侧边栏了
只会作用于 "./_posts/0_合集/" 路径
步骤：
1. 目录下的文件是 “合集页”
2. 子目录的文件是 “文章”
3. “文章”的 `categories` 是类名
4. “合集页”的 `name` 是类名
5. 统计每个类名的文章数量，并放入到 title 中
"""

import os
import re

regex_yml = re.compile(r"^---([\s\S]*)---")
regex_title = re.compile(r"\ntitle:\s(.*)\n")
regex_title_pure = re.compile(r"\ntitle:\s(.*?)(\(\d+篇\))*\n")
regex_name = re.compile(r"\nname:\s(.*)\n")
regex_category = re.compile(r"\ncategories:\s(.*)\n")

# %%

my_dir = "./_posts/0_合集/"
all_posts = list(os.walk(my_dir))
menu_list = all_posts[0]
detail = all_posts[1:]

# %% 遍历文章，计算得到每组的数量

import collections

category_cnt = collections.defaultdict(int)

for (path, _, filename_list) in detail:
    for filename in filename_list:
        if not filename.endswith(".md"):
            continue

        filename_whole = os.path.join(path, filename)
        with open(filename_whole) as f:
            all_content = f.read()

        yml_text = regex_yml.findall(all_content)[0].strip()
        yml_category = regex_category.findall(yml_text)[0].strip()

        category_cnt[yml_category] += 1

print(category_cnt)

# %% 遍历目录，并修改 title
menu_dict = dict()
for menu_post in menu_list[2]:
    if not menu_post.endswith(".md"):
        continue

    filename_whole = os.path.join(menu_list[0], menu_post)
    with open(filename_whole) as f:
        all_content = f.read()

    yml_text = regex_yml.findall(all_content)[0].strip()
    yml_title = regex_title.findall(all_content)[0].strip()
    yml_title_pure = regex_title_pure.findall(all_content)[0][0].strip()
    yml_name = regex_name.findall(yml_text)[0].strip()

    menu_dict[menu_post] = [yml_title, yml_name]

    if yml_name in category_cnt:
        all_content = all_content.replace(yml_title, yml_title_pure + "({}篇)".format(category_cnt[yml_name]), 1)

        #     写回
        with open(filename_whole, "w") as f:
            f.write(all_content)
    print()
    print(all_content)
