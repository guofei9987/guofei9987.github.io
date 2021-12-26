---
layout: post
title: 【statsmodels】（进阶）(补全中)
categories:
tags: 0x41_统计模型
keywords:
description:
order: 409
---

## 对象一览（未整理）
### Model Classes
```py
OLS(endog[, exog, missing, hasconst])	A simple ordinary least squares model.
GLS(endog, exog[, sigma, missing, hasconst])	Generalized least squares model with a general covariance structure.
WLS(endog, exog[, weights, missing, hasconst])	A regression model with diagonal but non-identity covariance structure.
GLSAR(endog[, exog, rho, missing])	A regression model with an AR(p) covariance structure.
yule_walker(X[, order, method, df, inv, demean])	Estimate AR(p) parameters from a sequence X using Yule-Walker equation.
QuantReg(endog, exog, **kwargs)	Quantile Regression
RecursiveLS(endog, exog, **kwargs)	Recursive least squares
```
### Results Classes

```py

RegressionResults(model, params[, ...])	This class summarizes the fit of a linear regression model.
OLSResults(model, params[, ...])	Results class for for an OLS model.
QuantRegResults(model, params[, ...])	Results instance for the QuantReg model
RecursiveLSResults(model, params, filter_results)	Class to hold results from fitting a recursive least squares model.
```

## 其它重要模型（未整理）

https://www.statsmodels.org/stable/examples/index.html
### Generalized Linear Models  
smf.glm
smf.GLM


### Generalized Estimating Equations
smf.gee
smf.GEE


### Robust Linear Models
smf.rlm




### Regression with Discrete Dependent Variable
sm.Logit

### ANOVA
```
moore_lm = ols('conformity ~ C(fcategory, Sum)*C(partner_status, Sum)',data=data).fit()
table = sm.stats.anova_lm(moore_lm, typ=2) # Type 2 ANOVA DataFrame
```
### Time Series analysis tsa
### Time Series Analysis by State Space Methods statespace
### Methods for Survival and Duration Analysis
### Statistics stats

这里面很多假设检验模型
### Nonparametric Methods nonparametric
### Generalized Method of Moments gmm
### Contingency tables
### Multiple Imputation with Chained Equations
### Multivariate Statistics multivariate
### Empirical Likelihood emplike
### Other Models miscmodels
### Distributions
### Graphics

有几个画图功能还不错

### Input-Output iolib
### Tools
### The Datasets Package
### Sandbox
