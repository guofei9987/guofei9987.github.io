
train set  80%  
test set  20%  

模型用train set

### 预测结果分析
1. train set效果良好，test set 效果良好
这是我们追求的
2. train set 效果良好，test set 效果良好
有可能过拟合了
3. train set 效果不好，test set 效果良好  
这种情况不常见。要具体分析。  
例如，考虑集合划分是否有问题。train set 中的样本太相似，信息量不高。train set 中有离群值。    
4.



例如100人，90男，10女。（或者肿瘤案例，肿瘤本就少）  
用train set，可能全部抽出男  
按照分层抽样，而不是简单随机抽样。保证每个样本都抽到。


## 验证集

valid set  20%   
train set 60%    
test set 20%   

验证集  
用于调整模型参数，防止模型过拟合  
