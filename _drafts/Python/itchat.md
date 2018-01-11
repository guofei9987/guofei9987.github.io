
## 读取好友列表
```py
import itchat
itchat.auto_login(hotReload=True)


friends=itchat.get_friends(update=True)
import pandas as pd
df=pd.DataFrame()
columns=['NickName','ContactFlag','MemberCount','RemarkName',\
         'Province','HideInputBarFlag','Sex','Signature',\
         'VerifyFlag', 'OwnerUin', 'PYInitial', 'PYQuanPin', 'RemarkPYInitial',\
          'RemarkPYQuanPin','StarFriend', 'AppAccountFlag', 'Statues', 'AttrStatus',\
         'Province', 'City', 'Alias', 'SnsFlag', 'UniFriend', 'DisplayName',\
         'ChatRoomId', 'KeyWord', 'EncryChatRoomId', 'IsOwner','UserName']
i=0
for j in friends:
    for k in columns:
        df.loc[i,k]=friends[i][k]
    i+=1
df  
```


## 发送信息
```py
itchat.send(msg='Message Content999', toUserName='@59a067d27f43bc522b8d275369f3d2fba9e44c8a36096d36f9c386c018e31a38')
```
