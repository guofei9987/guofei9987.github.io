

step1：生成模拟数据
```
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
data1=pd.DataFrame({'x':np.random.normal(0,1,size=50),'y':np.random.normal(0,1,size=50)})
data2=pd.DataFrame({'x':np.random.normal(0,1,size=50),'y':np.random.normal(8,1,size=50)})
data3=pd.DataFrame({'x':np.random.normal(4,1,size=50),'y':np.random.normal(4,1,size=50)})
data=pd.concat([data1,data2,data3])
```


step2：画图
```py
plt.plot(data.x,data.y,'r.')
plt.show()
```
模拟数据是这样的：
<img src='http://www.guofei.site/public/postimg/kmeans1.png'>

step3：聚类
```py
from sklearn.cluster import KMeans
kmeans=KMeans(n_clusters=3)
kmeans.fit(data)
```


step4：画图
```py
cen=kmeans.cluster_centers_#中心点
plt.plot(data.x,data.y,'r.')
plt.plot(cen[:,0],cen[:,1],'b^')
plt.show()
```
得到中心点的位置图：  
<img src='http://www.guofei.site/public/postimg/kmeans2.png'>
