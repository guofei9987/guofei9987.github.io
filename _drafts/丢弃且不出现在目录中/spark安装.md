
## 安装Hadoop
### 安装JDK
1. 下载[java安装包](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)，并安装
2. 添加环境变量
```bash
JAVA_HOME：C:\Program Files\Java\jdk1.8.0_181
PATH里面添加上：;%JAVA_HOME%\bin
```
3. CMD下输入JAVAC，用以验证是否安装完成


### 安装Hadoop
1. 下载[Hadoop安装包](http://archive.apache.org/dist/hadoop/core/),或者从[备用站](http://mirror.bit.edu.cn/apache/hadoop/common/)下载
2. 解压到一个目录（解压后配置环境变量就算安装完毕）
3. 配置Hadoop环境变量
```bash
HADOOP_HOME : D:\Soft\hadoop291
PATH里面添加上：;%HADOOP_HOME%\bin;
```
4. CMD下输入 hadoop version, 用以检查Hadoop是否安装完成
5. 配置Hadoop配置文件 G:\hadoop\hadoop291\etc\hadoop











## 参考文献

https://blog.csdn.net/zhongjunlang/article/details/80812669  
https://blog.csdn.net/zhongjunlang/article/details/80816711
