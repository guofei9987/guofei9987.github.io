tf.estimator
- `tf.estimator` 预装了很多机器学习模型
- 继承自`tf.estimator.Estimator`
- 可以自定义 estimator： https://www.tensorflow.org/tutorials/estimator/keras_model_to_estimator




需要做这几件事：
* Create one or more input functions.
* Define the model's feature columns.
* Instantiate an Estimator, specifying the feature columns and various
  hyperparameters.
* Call one or more methods on the Estimator object, passing the appropriate
  input function as the source of the data.


### input functions
可以自己写一个函数， return features, labels（具体不写了，用的时候查）

更推荐的方法是使用 tf.data

### feature columns
tf.feature_column


例如：
```python
my_feature_columns = [
    tf.feature_column.numeric_column(key='feature_name1',dtype=tf.float32) # 实数特征
    tf.feature_column.categorical_column_with_vocabulary_list(key='feature_name2', vocabulary_list=['A', 'B', 'C', 'D']) # 分类特征
    tf.feature_column.crossed_column(['age', 'sex'], hash_bucket_size=100) # 字段之间的交叉特征

]
```

>[NumericColumn(key='feature1', shape=(1,), default_value=None, dtype=tf.float32, normalizer_fn=None)]


这个可以很复杂，参见 [this guide](https://www.tensorflow.org/guide/feature_columns)

### Instantiate an estimator
有很多种，例如
* `tf.estimator.DNNClassifier` for deep models that perform multi-class
  classification.
* `tf.estimator.DNNLinearCombinedClassifier` for wide & deep models.
* `tf.estimator.LinearClassifier` for classifiers based on linear models.


```python
classifier = tf.estimator.DNNClassifier(
    feature_columns=my_feature_columns,
    # Two hidden layers of 30 and 10 nodes respectively.
    hidden_units=[30, 10],
    # The model must choose between 3 classes.
    n_classes=3)

#  linear classifier (logistic regression model)
tf.estimator.LinearClassifier(feature_columns)
```    

### Train
```python
classifier.train(
    input_fn=lambda: input_fn(train, train_y, training=True),
    steps=5000)

print('\nTest set accuracy: {accuracy:0.3f}\n'.format(**eval_result))
```

prediction
```python
predictions = classifier.predict(
    input_fn=lambda: input_fn(predict_x))

# predictions 是一个 generator

classifier.evaluate(input_fn)
```


#### boost tree 的例子

```python
# Since data fits into memory, use entire dataset per layer. It will be faster.
# Above one batch is defined as the entire dataset.
n_batches = 1
est = tf.estimator.BoostedTreesClassifier(feature_columns,
                                          n_batches_per_layer=n_batches)

# The model will stop training once the specified number of trees is built, not
# based on the number of steps.
est.train(train_input_fn, max_steps=100)

# Eval.
result = est.evaluate(eval_input_fn)

# 注：参数

params = {
  'n_trees': 50,
  'max_depth': 3,
  'n_batches_per_layer': 1,
  # You must enable center_bias = True to get DFCs. This will force the model to
  # make an initial prediction before using any features (e.g. use the mean of
  # the training labels for regression or log odds for classification when
  # using cross entropy loss).
  'center_bias': True
}
```
