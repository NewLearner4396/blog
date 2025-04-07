---
title: statsmodels库的学习笔记
date: 2022-10-08
tags:
 - Python
categories:
 -  Lang
---

## statsmodels库

```python
import statsmodels.api as sm
```

### OLS

一般来讲我们先构造一个OLS类，然后去拟合数据（调用fit（）方法），从而得到线性回归的结果。

```python
class statsmodels.regression.linear_model.OLS(endog, exog=None, missing='none', hasconst=None, **kwargs)
```

输入有 (endog, exog, missing, hasconst) 四个，我们现在只考虑前两个。第一个输入 endog 是回归中的反应变量（也称因变量），是上面模型中的 y。第二个输入 exog 则是回归变量（也称自变量）的值，即模型中的x。

这里有一个问题，statsmodels.OLS 不会假设回归模型有常数项，所以我们应该假设模型是 $Y_i=αX_0+βX_i$ ，其中$X_0$=1

Statmodels 有直接解决这个问题的函数：sm.add_constant()，它会在一个 array 左侧加上一列 1。

除了fit（）函数以外，如下表还有一些对拟合线性模型非常有用的其他函数

| 函数         | 用途                               |
| ------------ | ---------------------------------- |
| params()     | ang你ueli1里列出拟合函数的参数     |
| conf_int()   | 提供模型参数的置信区间             |
| fittedvalues | 模型的拟合值                       |
| resid        | 模型的残差值                       |
| aic          | 赤池信息统计量                     |
| predict()    | 用拟合模型对新的数据集预测解释变量 |

示例：

```python
x = np.linspace(0, 10, 100)
X = sm.add_constant(x)  # 使用 sm.add_constant() 在 array 上加入一列常项1
beta = np.array([1, 10])
e = np.random.normal(size=nsample)  # 误差项
y = X @ beta + e
model = sm.OLS(y,X)
results = model.fit()
print(results.params)
print(results.summary())
y_fitted = results.fittedvalues  # 调用拟合结果的 fittedvalues 得到拟合的y值

```

输出：

```python
[ 1.04510666, 9.97239799]
```

![OLS输出](http://imagebed.krins.cloud/api/image/H6B26464.png)

#### 参考链接：

[从零入门量化交易系列(九)用python做回归分析](https://zhuanlan.zhihu.com/p/357695665)

[Statsmodels 统计包之 OLS 回归](https://blog.csdn.net/qq_17119267/article/details/79108333)