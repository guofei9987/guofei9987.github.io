

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
