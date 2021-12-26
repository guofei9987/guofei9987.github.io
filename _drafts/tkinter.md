```py
from tkinter import *
from tkinter.filedialog import askdirectory
import os


def selectPath():
    path_ = askdirectory() #使用askdirectory()方法返回文件夹的路径
    if path_ == "":
        path.get() #当打开文件路径选择框后点击"取消" 输入框会清空路径，所以使用get()方法再获取一次路径
    else:
        path_ = path_.replace("/", "\\")  # 实际在代码中执行的路径为“\“ 所以替换一下
        path.set(path_)


def openPath():
    dir = os.path.dirname(path.get()+"\\")
    os.system('start ' + dir)
    #print(dir)

root = Tk()
root.title("路径选择和文件位置打开功能演示")
path = StringVar()
path.set(os.path.abspath("."))

Label(root, text="目标路径:").grid(row=0, column=0)
Entry(root, textvariable=path,state="readonly").grid(row=0, column=1,ipadx=200)


# e.insert(0,os.path.abspath("."))
Button(root, text="路径选择", command=selectPath).grid(row=0, column=2)
Button(root, text="打开文件位置", command=openPath).grid(row=0, column=3)
root.mainloop()
```
