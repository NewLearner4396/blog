---
title: 时间序列处理的stata
date: 2022-11-28
tags:
 - 实际序列
categories:
 -  Basic
---

## Stata处理时间序列数据

```stata
//设置时间序列标识
tsset year
// 绘制时间序列图
tsline y
// 或是
line y year

gen lny = log(y)
gen dlny = d.lny // 生成lny的一阶差分

// 查看自回归图
corrgram dlny
// 或是单独查看ac、pac,lag为滞回阶数
ac dlny(,lag(n))
pac dlny(,lag(n))

estat ic // 计算回归aic信息准则，数值越小，拟合优度越好

// 计算自回归系数（序列相关系数）
// 1-n阶滞后项
reg dlny l(1/n).dlny // 回归
arima dlny,ar(1/n) // 极大似然法
// arima 还可以计算MA(移动平均模型)
arima dlny,ma(1/n)
// 同时计算AR，MA
// ARIMA (p，d，q)中
// AR是“自回归”，p为自回归项数；
// MA为“滑动平均”，q为滑动平均项数;
// d为使之成为平稳序列所做的差分次数（阶数）
arima dlny,ar(1),ma(1)
arima dlny,arima(1,0,1) // 等价于 arima lny,arima(1,1,1)

// 序列平稳性检测
// 单位根检验
dfuller 

// arch

// estout
```
