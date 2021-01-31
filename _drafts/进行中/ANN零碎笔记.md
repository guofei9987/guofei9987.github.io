## TF安装
conda install tensorflow


## 实际的计算方式
随机梯度下降：不用全部数据来计算Loss，而是使用每个batch，类似于Sampling


## 问题
梯度消失问题：Loss过早的不再下降，精确度过早地不再提高
y过于接近0或者1（概率还是挺大的，参见sigmoid）

解决方法：用ReLu
ReLu：$y=max(x,0)$


## RNN

当然可以使用梯度下降来计算，但期数很多时，计算量非常大，还会引发梯度爆炸和梯度消失的问题。  
人们发现了LSTM的算法代替BPTT算法实现RNN的训练  

### LSTM算法
Long Short-Term Memory


### 深度残差网络

深度网络有个巨大的问题，就是容易出现梯度消失和梯度爆炸。  
深度残差网络引入“短路”设计

### 受限玻尔兹曼机

受限玻尔兹曼机(RBM,restricted boltzmann machine)
#### DBN（deep belief network，深度信念网络）
DBN由多个RBM组成，Hitton提出DBN，验证了Greedy Layer-wise Training  
DBN对每层进行无监督训练，训练方法可以是标准的RBM，各层训练完毕后，用BP算法进行微调。

#### 损失函数
RBM的cost Function称为对比散度函数(contrasive divergence，CD)  
学习的目标是最大似然度。  


RBM有一种解释是能量解释，基于能量模型(energy-based model)  
$E(v,h \mid \theta)=-(\sum\limits_{ij}w_{ij}v_ih_j+\sum\limits_ib_iv_i+\sum\limits_jc_jh_j)$  


实现案例：
https://github.com/meownoid/tensorfow-rbm
https://github.com/Cospel/rbm-ae-tf

## reinforcement learning
Q-Learning
## 对抗学习
对抗网络(generative adversarial networks,GAN)  


有两个模型：
- G模型(generative model)用来根据样本，捏造一些样本
- D模型(discriminative model)用来做分类


如果D能把所有G生成的样本都判别为假，说明D很强，G很弱，  
如果D不能正确判别，说明D很弱，G很强。


评价函数这样写：  
$\min\limits_{G}\max\limits_{D} V(D,G)$  
$V(D,G)=E_{x\sim Pdata(x)}[\log D(x)]+E_{z\sim Pz(z)}[\log(1-D(G(z)))]$  
$D(x)$是真实图片判断为真实的概率  
$G(x)$是z噪声输入到G网络，并输出一张图片的过程



## 深度学习的领军人

Hinton，LeCun，Bengio  
这三人是祖师三代。
Hinton2006年提出了深度神经网络算法，可以对7层以上神经网络进行训练。此前还发明了反向传播法、对比散度算法。    
LeCun：第一位把BP算法用于CNN上  


德国人Schmidhuber，发明了LSTM，梯度消失的贡献者，递归结构的推动者  
李飞飞  
吴恩达  
Hopfield：80年代神经网络复兴，一般功劳应当归功于他。  


Minsky：构建第一部能自我学习的神经网络机器SNARC

## BP
BP推荐使用：3层（能解决大部分问题）  
hidden layer中神经元的个数推荐是$\sqrt{n_{input}+n_{output}} \pm 10$个  
