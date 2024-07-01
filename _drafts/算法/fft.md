## 展示 fft 和原始序列的关系

```python
import numpy as np

sample_rate = 500  # 采样率为 500Hz
t_max = 5  # 时间为5秒
t = np.linspace(start=0, stop=t_max, num=sample_rate * t_max, endpoint=False)  # 时间轴
# 创建信号：频率为 5 的信号 + 频率为 20 的信号
y = np.sin(2 * np.pi * 5 * t) + np.sin(2 * np.pi * 20 * t)

y_fft = np.fft.fft(y)
y_fft_magnitude = np.abs(y_fft)

```

画图
```python
import matplotlib.pyplot as plt

fig = plt.figure(2)
axes = fig.subplots(nrows=2, ncols=1, sharex=True, sharey=False)

axes[0].plot(y)
axes[1].plot(y_fft_magnitude)

plt.show()
```


【图片】

计算周期（完整代码）

```python
import numpy as np

sample_rate = 500  # 采样率为 500Hz
t_max = 5  # 时间为5秒
t = np.linspace(start=0, stop=t_max, num=sample_rate * t_max, endpoint=False)  # 时间轴
# 创建信号：频率为 5 的信号 + 频率为 20 的信号
y = np.sin(2 * np.pi * 5 * t) + 0.8 * np.sin(2 * np.pi * 20 * t)

y_fft = np.fft.fft(y)
y_fft_magnitude = np.abs(y_fft)

# %%计算最强的周期
len_y = len(y)
# 频率轴
freq = np.fft.fftfreq(len_y, 1 / sample_rate)

# 找到最大幅度对应的频率，只取左半边
peak_frequency = freq[np.argmax(y_fft_magnitude[:len_y // 2])]

# 周期是频率的倒数
period = 1 / peak_frequency
# 打印结果
print(f"主要周期: {period}秒")

# %%找到所有的周期。
all_possible = np.argsort(y_fft_magnitude[:len_y // 2])[::-1]

pred_i = all_possible[0]
for i in all_possible:
    # 如果强度比前一个小太多（这里是小一半），就停了
    if y_fft_magnitude[i] < y_fft_magnitude[pred_i] / 2:
        break
    print(f"周期：{1 / freq[i]}，对应强度 {y_fft_magnitude[i]}")

```

结果：
```
主要周期: 0.2秒
周期：0.2，对应强度 1250.0
周期：0.05，对应强度 999.9999999999999
```
