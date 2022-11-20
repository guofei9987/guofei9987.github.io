



## 边缘检测

```python
Laplacian()        #作为边缘检测函数，他会产生明显的边缘线条，灰度图像更是如此。
Sobel()
Scharr()
```
这些滤波函数都会将非边缘区域转换为黑色，边缘区域转换成白色或其他饱和的颜色。但是这些函数都容易将噪声错误的识别为边缘。缓解这个问题的方法就是在找到边缘之前对图像进行模糊处理，去除噪声。

Open CV也提供了需要模糊滤波函数，包括以下：

```python
blur()
medianBlur()         #它对去除数字化的视频噪声特别有效，特别是去除彩色图像的噪声
GaussianBlur()
```



## 最小外接矩形

```python
x,y,w,h = cv2.boundingRect(array)  # 矩形框左上角的坐标(x, y)、宽度w和高度h。
```

```python
cv.minAreaRect(cnt) # 返回值中还包含旋转信息，返回值信息为包括中心点坐标(x,y)，宽高(w, h)和旋转角度。
```



---------------




```py

def recovery(ori_img, attacked_img, outfile_name='./recoveried.png', rate=0.7):
    img = cv2.imread(ori_img)
    img2 = cv2.imread(attacked_img)

    height = img.shape[0]
    width = img.shape[1]
    # Initiate SIFT detector
    orb = cv2.ORB_create(128)
    MIN_MATCH_COUNT = 10
    # find the keypoints and descriptors with SIFT
    kp1, des1 = orb.detectAndCompute(img, None)
    kp2, des2 = orb.detectAndCompute(img2, None)

    FLANN_INDEX_KDTREE = 0
    index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
    search_params = dict(checks=50)

    flann = cv2.FlannBasedMatcher(index_params, search_params)

    des1 = np.float32(des1)
    des2 = np.float32(des2)

    matches = flann.knnMatch(des1, des2, k=2)

    # store all the good matches as per Lowe's ratio test.
    good = []
    for m, n in matches:
        if m.distance < rate * n.distance:
            good.append(m)

    if len(good) > MIN_MATCH_COUNT:
        src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
        dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
        M, mask = cv2.findHomography(dst_pts, src_pts, cv2.RANSAC, 5.0)
        out = cv2.warpPerspective(img2, M, (width, height))  # 先列后行
        cv2.imwrite(outfile_name, out)
        print("还原截屏攻击成功")
        return True
    else:
        print("无法还原")
        return False

```
