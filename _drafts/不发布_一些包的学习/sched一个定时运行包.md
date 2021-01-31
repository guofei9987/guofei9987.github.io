
```
import sched, time
def print_time(msg="default"):
    print("当前时间",time.time(),msg)
s=sched.scheduler(time.time,time.sleep)
print(time.time())
s.enter(5,1,print_time,argument=("延迟5秒，优先度1",))
s.enter(3,2,print_time,argument=("延迟3秒，优先度2",))
s.enter(3,1,print_time,argument=("延迟3秒，优先度1",))
s.run()
print(time.time())
```


```
#遍历windows所有窗口并输出窗口标题
from win32gui import *
titles = set()
def foo(hwnd,mouse):
 #去掉下面这句就所有都输出了，但是我不需要那么多
    if IsWindow(hwnd) and IsWindowEnabled(hwnd) and IsWindowVisible(hwnd):
        titles.add(GetWindowText(hwnd))
EnumWindows(foo, 0)

lt = [t for t in titles if t]
lt.sort()
for t in lt:
   print(t)
```
