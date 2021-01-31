## mySQL
### 配置：
Step 1:安装mysql_installer_community_V5.6.21.1.msi  
Step 2: 将mysql-connector-java-5.1.33-bin.jar文件拷贝到......\MATLAB\R2015b\java\jar\toolbox  
Step 3: 到......\MATLAB\R2015b\toolbox\local目录下，找到classpath.txt文件，打开，并添加用来加载mysql的jdbc驱动语句：  
$matlabroot/java/jar/toolbox/mysql-connector-java-5.1.33-bin.jar  
Step 4:重新打开MATLAB即可  




### 使用：
%代码功能：从txt中读入sql语句，执行sql语句

```cpp
file_name='sql_all.txt';
bid=fopen(file_name,'r');
sql_sq=fscanf(bid,'%c');
fclose(bid);
conn = database('tennis','root','1234','com.mysql.jdbc.Driver','jdbc:mysql://localhost:3306/');
ATP=fetch(conn,sql_sq)
```
