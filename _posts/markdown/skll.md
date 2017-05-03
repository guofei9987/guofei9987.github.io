## 配置jekyll
### 安装python
### 安装easyinstall
### 安装ruby
### 安装Pygments
Pygments是一个语法高亮插件
ruby下：
```ruby
easy_install Pygments
```
### 安装bundler
```
gem install bundler
```
### 安装 jekyll
```
gem install jekyll
```
## 使用

### 新建站点
jekyll new myblog命令新建一个名字叫‘myblog’的站点

### 启用站点
启动站点
进入站点的目录，运行jekyll serve
```
jekyll new site-name # 创建一个新的
jekyll build # 构建
jekyll server # 开启本地服务器查看效果
jekyll server -P 4001 # 指定端口
jekyll server -w # 文件发生变化时，自动重新编译
```
