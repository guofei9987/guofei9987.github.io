# 自动生成国内线路代码仓库
mkdir _tmp
cd _tmp
git clone git@e.coding.net:guofei9987/pages/guofei9987.coding.io.git
git clone git@github.com:guofei9987/guofei9987.github.io.git
git clone git@github.com:guofei9987/pictures_for_blog.git
git clone git@github.com:guofei9987/StatisticsBlog.git

rm -r guofei9987.coding.io/_posts/
rm -r guofei9987.coding.io/pictures_for_blog/
rm -r guofei9987.coding.io/StatisticsBlog
mv guofei9987.github.io/_posts/ guofei9987.coding.io/_posts
rm -rf guofei9987.github.io/.git
rm -rf pictures_for_blog/.git
rm -rf StatisticsBlog/.git
mv pictures_for_blog guofei9987.coding.io/pictures_for_blog
mv StatisticsBlog guofei9987.coding.io/StatisticsBlog

cd guofei9987.coding.io
git add -A
git commit -m 'auto update'
git push

cd ../..
rm -rf _tmp
