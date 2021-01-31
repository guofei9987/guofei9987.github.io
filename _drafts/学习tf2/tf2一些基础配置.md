安装 cuda

## GPU支持
先在 nvidia 官网安装 cuda https://developer.nvidia.com/cuda-downloads

然后安装 tensorflow-gpu
```bash
pip install tensorflow-gpu
```

列出可用的设备
```python
tf.config.experimental.list_physical_devices()
tf.config.experimental.list_physical_devices("GPU")
tf.config.experimental.list_physical_devices("CPU")
```

看 tensor 所用的资源
```python
x = tf.random.uniform([3, 3])
x.device
```


切换回CPU的方法
```python
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
```


运行，并看用了哪个设备
```python
tf.debugging.set_log_device_placement(True)  # 每个算子都会显示详细信息

with tf.device('/device:GPU:0'):
    a = tf.constant([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
    b = tf.constant([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])
    c = tf.matmul(a, b)

print(c)
```

## 主要模块

- tf.data 加载数据
- tf.keras 构建模型（estimator验证模型，hub迁移学习）
- eager mode 运行和调试
- 分发策略做分布式训练
- SavedModel 导出模型
- 部署模型TensorFlow Server， TensorFlow Lite（Android & IOS）， TensorFlow.js
