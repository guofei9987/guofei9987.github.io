## Tensor基本操作

生成
```python
tf.zeros([10, 5])
```

运算
```python
tf.add(1, 2)
tf.add([1, 2], [3, 4])
tf.square(5)
tf.reduce_sum([1, 2, 3])
tf.square(2) + tf.square(3)
```


矩阵计算
```python
tf.matmul([[1]], [[2, 3]])
```

map
```python
tf.data.Dataset.from_tensor_slices([1, 2, 3, 4, 5, 6])
ds_tensors.shuffle(2).batch(2).map(tf.square)
# 这是个 <dataset> 用法见于相关内容
```

还有啥
```
tf.where
tf.print

```

## 自动微分


```python
x = tf.ones((2, 2))

# persistent=True 就可以多次运行 t.gradient，否则只能运行一次
with tf.GradientTape(persistent=True) as t:
  t.watch(x)
  y = tf.reduce_sum(x)
  z = tf.multiply(y, y)

# Derivative of z with respect to the original input tensor x
dz_dx = t.gradient(z, x)
dz_dx

dz_dy = t.gradient(z, y)
dz_dy
```

高阶微分
```python
x = tf.Variable(1.0)  # Create a Tensorflow variable initialized to 1.0

with tf.GradientTape() as t:
  with tf.GradientTape() as t2:
    y = x * x * x
  # Compute the gradient inside the 't' context manager
  # which means the gradient computation is differentiable as well.
  dy_dx = t2.gradient(y, x)
d2y_dx2 = t.gradient(dy_dx, x)
```

## 训练相关
```python
v = tf.Variable(3.0)
v.assign(tf.square(v))
tf.assign_sub # 手写梯度下降时用的多
```

## 激活函数
```
tf.nn.softmax


```
## 完整案例

### 简陋款
```python
import tensorflow as tf
import numpy as np


class MyModel():
    def __init__(self):
        self.W = tf.Variable(1.0)
        self.b = tf.Variable(1.0)

    def __call__(self, x):
        return self.W * x + self.b


my_model = MyModel()

# %%
n_samples = 1000
X = np.random.rand(n_samples, 1) * 5
y = 5 * X + np.random.randn(n_samples, 1) + 2

import matplotlib.pyplot as plt

plt.plot(X, y, '.', label='true')
plt.plot(X, my_model(X), '.', label='predict')
plt.legend()
plt.show()


# %%

def loss(predict_y, true_y):
    return tf.reduce_mean(tf.square(predict_y - true_y))


def train(model, X, y, learning_rate):
    with tf.GradientTape() as t:
        current_loss = loss(my_model(X), y)
        dW, db = t.gradient(current_loss, [my_model.W, my_model.b])
        model.W.assign_sub(learning_rate * dW)
        model.b.assign_sub(learning_rate * db)


# %%
Ws, bs = [], []
losses = []

for epoch in range(100):
    Ws.append(my_model.W.numpy())
    bs.append(my_model.b.numpy())
    losses.append(loss(my_model(X), y))
    train(my_model, X, y, learning_rate=0.01)

# %%
fig, ax = plt.subplots(3, 1)
ax[0].plot(Ws, label='W')
ax[0].plot(bs, label='b')
ax[1].plot(losses, label='loss')
ax[2].plot(X, y, '.', label='true')
ax[2].plot(X, my_model(X), '.', label='predict')
ax[0].legend()
ax[1].legend()
ax[2].legend()

plt.show()
```

## tf.func
类似这样的，但速度更快
```python
@tf.function
def add(a, b):
    return a + b
```


有时候想限定输入值的类型，如果不符合，让它报错（例如，上面这个例子输入数字和字符串都可以）
```python
# 注意，shape也要严格满足，不然也会报错
@tf.function(input_signature=(tf.TensorSpec(shape=[None,None], dtype=tf.int32),))
def next_collatz(x):
  print("Tracing with", x)
  return tf.where(x % 2 == 0, x // 2, 3 * x + 1)

next_collatz(tf.constant([[1, 2], [3, 4]]))


# 或者用现成的
@tf.function
def double(a):
    return a + a

double_string = double.get_concrete_function(tf.TensorSpec(shape=None, dtype=tf.string))

double_string(tf.constant(["a"]))
```
