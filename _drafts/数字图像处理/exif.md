```python
# 方法1:可读性更好
# pip install exifread
import exifread  # 专门用来读图片exif信息的库

with open('IMG_3669.JPG', 'rb') as f:
    tags = exifread.process_file(f)


# %%
# 方法2:更底层的数据
from PIL import Image

img = Image.open("IMG_3669.JPG")
img._getexif()
```
