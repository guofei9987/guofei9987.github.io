

```bash
diskutil list # 查看硬盘分区
sudo nano /etc/fstab # 可以打开NTFS

# 切换到其它硬盘
cd  /Volumes

# 硬盘使用情况
smartctl -a disk0 # 需要先安装 smartctl
```

录屏幕：QuickTime Player

control+command+shift+4:截图到剪切板
command+shift+4:截图到文件


聚焦耗电快，可以关闭：
sudo mdutil -a -i off




## 好用的app

- downie：下载在线视频
- Duplicate file finder

还没试过
- paste：管理黏贴版



## 一些linux命令

```sh
# 删除本目录下的空文件夹：
find -type d -empty | xargs rm -rf

# 删除本目录下所有 css文件
find ./ -name *.css | xargs rm -rf
```

## 硬盘不装载

Mac的移动硬盘不能装载该如何解决? - 陶落落的文章 - 知乎
https://zhuanlan.zhihu.com/p/346106923

```sh
diskutil list # 查看
ps aux | grep fsck
sudo pkill -f fsck # 然后输入密码
# 再次打开磁盘工具，发现分区是可被选择的状态了，点击上方的急救
```
