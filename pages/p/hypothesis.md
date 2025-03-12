---
layout: wide
---



| 条件 | H0 | 检验名字 | 构建随机变量 | 服从分布 | Python(scipy.stats as stats, statsmodel.api as sm) | 备注 |
|--|--|--|--|--|--|--|
| 方差已知 | u<=u0 <br> u>=u0 <br> u==u0 |z检验| $Z=\dfrac{\bar X-\mu}{\sigma/\sqrt{n}}$|N(0,1)| ds1=sm.stats.DescrStatsW(data1) <br> tstat, pvalue = ds1.ztest_mean(value=2, alternative='two-sided') <br> ds1.zconfint_mean(alpha=0.05,alternative='larger')|"two-sided" <br> "larger" <br> "smaller"
||||||||
||||||||
||||||||

