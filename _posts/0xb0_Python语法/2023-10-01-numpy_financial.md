---
layout: post
title: 【numpy-financial】金融计算模块
categories:
tags: 0xb0_Python语法
keywords:
description:
order: 1269
---


需要 `pip install numpy_financial` https://github.com/numpy/numpy-financial

定义
- rate: rate of interest per period，0.1 代表 10% 利率
- nper：几期
- pmt： Payment
- pv：present value
- fv: future value
- when: begin/end


代码：
```python
import numpy_financial as npf

npf.fv(rate=0.1, nper=10, pmt=500, pv=300, when='end')
npf.pv(rate=0.05, nper=24, pmt=1000, when='end')
npf.rate(nper=10, pmt=100, pv=20, fv=-1500, when='end')
npf.nper(rate=0.05, pmt=3000, pv=5000, fv=-50000, when='end')
npf.pmt(rate=0.05, nper=30, pv=-5000, fv=0, when='end')

# npf.ipmt(...)  # interest payment，付款中的利息部分
# npf.ppmt(...)  # Principal Payment，付款中的本金部分
```

多期现金流相关计算：
```python
npf.irr(values=[-100, 39, 59, 55, 20])  # Internal Rate of Return，现金流对应的收益率

# Modified internal rate of return，考虑现金流再投资的 IRR
npf.mirr(values=[-100, 39, 59, 55, 20],
         finance_rate=0.1, reinvest_rate=0.5)

npf.npv(rate=0.1, values=[1, 3, 3])  # Net Present Value，现金流的 PV
```