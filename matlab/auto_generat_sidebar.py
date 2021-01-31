# 用二叉树自动print sidebar

# %%
import os
import re
import string

# 字数统计
regex_chinese = re.compile('[\u4e00-\u9fa5]') # 汉字
regex_English = re.compile('[0-9a-zA_Z]+') # 数字和英语单词
# 中文标点和英文标点
regex_punctuation = re.compile('[!"()*+,./:;<=>?{|}~。；，：“”（）、？《》]')

def word_count(file_name_md):
    f = open(file_name_md, 'r', encoding='utf-8')
    passages = f.readlines()
    # word_num = sum([len(passage.replace('\n', '').replace(' ', '')) for passage in passages])
    word_num = sum([len(regex_chinese.findall(passage))
                    + len(regex_English.findall(passage))
                    + len(regex_punctuation.findall(passage))
                    for passage in passages])

    f.close()
    return word_num


class TreeNode:
    def __init__(self, name, type, layer, word_num=0):
        self.name = name
        self.type = type  # 'file' or 'path'
        self.layer = layer
        self.word_num = word_num
        self.children = dict()

    def __repr__(self):
        # return self.name+self.type+str(self.layer)+str([i for i in self.children])
        return 'name={name},type={type},layer={layer},word_num={word_num},children={children}'. \
            format(name=self.name, type=self.type, layer=self.layer, word_num=self.word_num,
                   children=[i for i in self.children])


class Tree:
    def __init__(self, path):
        path_walker = os.walk(path, topdown=True)
        self.path1, self.path2 = '\\'.join(path.split('\\')[:-1]), path.split('\\')[-1]
        # 'C:\\Users\\guofei8\\Desktop\\git\\GitHub\\reading', 'docs' 这种
        self.root = TreeNode(self.path2, 'path', 0)
        self.add_all_tree_node(path_walker)

    def addTreeNode(self, path, dirs, nondirs):
        pointer = self.root
        for i in path:
            if i not in pointer.children:
                pointer.children[i] = TreeNode(i, 'path', pointer.layer + 1)
            pointer = pointer.children[i]
        for i in dirs:
            pointer.children[i] = TreeNode(name='* ' + i, type='path', layer=pointer.layer + 1)
        for i in nondirs:
            # 每个节点的 name 是规整后的 markdown语句，这样前序遍历不需要太多处理就可以满足需求
            word_num = word_count('\\'.join([self.path1] + path + [i]))

            file_name_md = '* [' + i.replace('.md', '') \
                           + ']' \
                           + '(' + '/'.join(path) + '/' + i + ')'
            pointer.children[i] = TreeNode(name=file_name_md,
                                           type='file',
                                           layer=pointer.layer + 1,
                                           word_num=word_num)

    def add_all_tree_node(self, path_walker):
        for top, dirs, nondirs in path_walker:
            path = top.replace(self.path1, '').split('\\')[1:]  # 0号位是一个空字符串
            self.addTreeNode(path, dirs, nondirs)

    def pre_order(self, root):
        return '' if (root is None) \
            else ((root.layer - 2) * '    ' if root.layer > 1 else '# ') + root.name + '\n' + \
                 ''.join([self.pre_order(i) for i in root.children.values()])

    def pre_order2(self, root):
        '''
        总字数
        '''
        return 0 if (root is None) else root.word_num + sum([self.pre_order2(i) for i in root.children.values()])


path = os.getcwd() + r'\docs'
tree = Tree(path)
sidebar = tree.pre_order(tree.root.children[tree.path2])
print(sidebar)

# 总字数
# c = tree.pre_order2(tree.root.children[tree.path2])
# print(c)
# %%
head = '''
<a href="http://www.guofei.site" target='blog'>
<img src="https://www.guofei.site/public/about/me.png"  alt="回到blog" height="64" width="64">
</a>

'''

tail = '''

'''

content = '\n'.join(sidebar.split('\n')[1:])

f = open('sidebar.md', 'w', encoding='utf-8')
# print(head+content)
# f.write(head+content.encode('utf-8').decode('utf-8'))
f.write(head + content + tail)
f.close()

f = open('homepage.md', 'w', encoding='utf-8')
# print(head+content)
# f.write(head+content.encode('utf-8').decode('utf-8'))
f.write(content)
f.close()

# %%
# 统计每个板块的字数
def word_ana():
    import re

    regex = re.compile("[0-9]+['字']")

    total_analys = []

    for i in sidebar.split('\n')[1:]:
        if len(i) > 0:
            if i[0] == '*':
                chapter = i[2:]
            else:
                k = regex.findall(i)
                word_num = int(k[0].replace('字', '')) if len(k) > 0 else 0
                total_analys.append([chapter, word_num])

    import pandas as pd
    total_analys_pd = pd.DataFrame(total_analys, columns=['chapter', 'word_num'])
    a = total_analys_pd.groupby('chapter').sum()

    import plotly.graph_objs as go
    import plotly

    # 拆成画图所需数据格式
    data1 = go.Bar(
        x=a.index,
        y=a.word_num,
        name='v1'
    )

    layout = go.Layout(title="bar charts", xaxis={'title': 'x'}, yaxis={'title': 'value'})
    fig = go.Figure(data=[data1], layout=layout)
    plotly.offline.plot(fig, filename='c:\\abc\\example.html')

# word_ana()
