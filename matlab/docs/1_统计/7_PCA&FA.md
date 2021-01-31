## PCA
主成份分析
[COEFF,latent,explained] = pcacov(V)
where,
V是协方差矩阵 p-by-p
COEFF是主成份变换矩阵
latent是特征值
explained贡献率

[COEFF,SCORE,latent,tsquare] = princomp(X)
where,
X是原始数据
SCORE是每个样本每个主成份的得分
tsquare是每个数据点的HotellingT2统计量

```matlab
clear
clc
X=[
76.5	81.5	76.0	75.8	71.7
70.6	73.0	67.6	68.1	78.5
90.7	87.3	91.0	81.5	80.0
77.5	73.6	70.9	69.8	74.8
85.6	68.5	70.0	62.2	76.5
85.0	79.2	80.3	84.4	76.5
94.0	94.0	87.5	89.5	92.0
84.6	66.9	68.8	64.8	66.4
57.7	60.4	57.4	60.8	65.0
70.0	69.2	71.7	64.9	68.9
];
%%
%pcacov

num_variables=size(X,2);
V=cov(X);
[COEFF,latent,explained] =pcacov(V);%核心代码！！！
%COEFF转换矩阵，latent特征值，explained累积

%%
%可视化展示
row_names=cell(num_variables+1,1);
column_names=cell(1,num_variables);
for i=2:num_variables+1
row_names{i}=['X',num2str(i)];

end
for i=1:num_variables
column_names{i}=['PRIN',num2str(i)];
end
disp('---------------协方差矩阵--------------')
disp(V)
disp('---------------特征值------------------')
fprintf('特征值    累积\n')
disp([latent,explained])
disp('-----------------特征向量------------------')
disp([row_names,[column_names;mat2cell(COEFF,ones(1,5),ones(1,5))]])



%%
%直接输入原始数据
[COEFF,SCORE,latent,tsquare] = princomp(X)



%%
%注意：
%得出的COEFF和SCORE可能对应的行/列同时加上一个负号，也对
%X=X+100得出的结论也完全相同
%X=X/100得出的COEFF也相同
%计算SCORE时，每一项要减去均值，例如：
%[X(:,1)-mean(X(:,1)),X(:,2)-mean(X(:,2)),X(:,3)-mean(X(:,3)),X(:,4)-mean(X(:,4)),X(:,5)-mean(X(:,5))]*COEFF
%上式与SCORE完全相同

```


## FA
```matlab
[lambda,psi,T,stats,F] = factoran(X,m)
X:n*d，样本容量n，d维
m：返回m个公共因子
lambda：d*m 第(i,j)个元素为第j个因子在第i个变量上的载荷(或系数)
psi：特定方差的最大似然估计
T：包含以下字段：（H0：公共因子个数为m）
loglike    最大对数似然函数
dfe       误差自由度((d-m)^2-(d+m))/2
chisq    H0的近似卡方统计量
p           H0的右侧显著性水平  p小说明m太少

[lambda,psi,T]=factoran(X,2,'xtype','covariance','delta',0,'rotate','none')
```
