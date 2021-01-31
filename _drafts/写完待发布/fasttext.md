
这里有训练好的 157 种语言的 fasttext模型   
https://github.com/facebookresearch/fastText/blob/master/docs/crawl-vectors.md



---------


步骤

## 获取数据

下载数据源： http://www.sogou.com/labs/resource/cs.php


```bash
# 解压缩
tar -zxvf news_sohusite_xml.full.tar.gz

# 转为utf-8（源格式是gb18030）
cat news_sohusite_xml.dat | iconv -f gb18030 -t utf-8 > news_sohusite_xml-utf8.txt
```

数据清洗
```bash
# 过滤出url字段的内容，并且删除掉url标签。
cat news_sohusite_xml-utf8.txt | grep '<url>' | sed  's/<url>//g' | sed  's/<\/url>//g' > news_sohusite_url.txt

# 过滤出content字段的内容，并且删除掉content标签。（此步略郭，下一步和分词放到一起做）
# cat news_sohusite_xml-utf8.txt | grep '<content>' | sed  's/<content>//g' | sed  's/<\/content>//g' > news_sohusite_content.txt

# content是中文内容，需要使用jieba进行切词，
cat news_sohusite_xml-utf8.txt | grep '<content>' | sed  's/<content>//g' | sed  's/<\/content>//g' | python -m jieba -d ' '  > news_sohusite_content.txt


```
