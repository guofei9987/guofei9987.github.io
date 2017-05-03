---
layout: post
title: 动态一致平均问题算法-EXTRA和DAC
category: 科研
tags: Optimization
keywords: 矩阵补全，一致平均，论文
description: 
---

### EXTRA

<a href="http://www.codecogs.com/eqnedit.php?latex=x_{(i)}^1=\sum_{j&space;=&space;1}^Nw_{ij}x_{(j)}^0-\alpha&space;\nabla&space;f_i(x_{(i)}^0)\\&space;\\&space;\\&space;x_{(i)}^{k&plus;2}=x_{(i)}^{k&plus;1}&plus;\sum_{j=1}^Nw_{ij}x_{(j)}^{k&plus;1}-\sum_{j=1}^N\tilde{w}_{ij}x_{(j)}^k-\alpha[\nabla&space;f_i(x_{(i)}^{k&plus;1})-\nabla&space;f_i(x_{(i)}^{k})]" target="_blank"><img src="http://latex.codecogs.com/gif.latex?x_{(i)}^1=\sum_{j&space;=&space;1}^Nw_{ij}x_{(j)}^0-\alpha&space;\nabla&space;f_i(x_{(i)}^0)\\&space;\\&space;\\&space;x_{(i)}^{k&plus;2}=x_{(i)}^{k&plus;1}&plus;\sum_{j=1}^Nw_{ij}x_{(j)}^{k&plus;1}-\sum_{j=1}^N\tilde{w}_{ij}x_{(j)}^k-\alpha[\nabla&space;f_i(x_{(i)}^{k&plus;1})-\nabla&space;f_i(x_{(i)}^{k})]" title="x_{(i)}^1=\sum_{j = 1}^Nw_{ij}x_{(j)}^0-\alpha \nabla f_i(x_{(i)}^0)\\ \\ \\ x_{(i)}^{k+2}=x_{(i)}^{k+1}+\sum_{j=1}^Nw_{ij}x_{(j)}^{k+1}-\sum_{j=1}^N\tilde{w}_{ij}x_{(j)}^k-\alpha[\nabla f_i(x_{(i)}^{k+1})-\nabla f_i(x_{(i)}^{k})]" /></a>

### DAC

<a href="http://www.codecogs.com/eqnedit.php?latex=x_i(t&plus;1)=x_i(t)&plus;\sum_{j&space;\neq&space;i}a_{ij}(t)(x_i(t)-x_i(t))&plus;r_i(t)-r_i(t-1)" target="_blank"><img src="http://latex.codecogs.com/gif.latex?x_i(t&plus;1)=x_i(t)&plus;\sum_{j&space;\neq&space;i}a_{ij}(t)(x_j(t)-x_i(t))&plus;r_i(t)-r_i(t-1)" title="x_i(t+1)=x_i(t)+\sum_{j \neq i}a_{ij}(t)(x_i(t)-x_i(t))+r_i(t)-r_i(t-1)" /></a>

### 优缺点比较
其中，DAC最大的缺点在于第一次迭代时对于r(-1)时刻的依赖，在实际仿真中，如果需要对动态输入求一致平均，往往并不能获取输入在-1时刻的值。导致在矩阵补全问题中，DAC做不精确的动态一致平均的子问题效果并不好。

而EXTRA却有很好的效果。