---
title: 线性回归的推导
date: 2022-09-29
tags:
 - Regress
categories:
 -  Basic
---

## 线性回归内的数学

### 数学表达

#### 回归方程

![image-20220929212535367](http://imagebed.krins.cloud/api/image/6P282662.png)

#### 损失函数

![image-20220929212605171](http://imagebed.krins.cloud/api/image/XJLZND8N.png)

### 参数估计

#### 方程组的解法

这一部分与上文参考自不同文章，函数表达略有不同，但并不影响理解。

![image-20220930085631165](http://imagebed.krins.cloud/api/image/J620866P.png)

令其对$\beta_i$的导数为0,求解方程组得到向量$\beta$,即上文的$W$

![image-20220930085653197](http://imagebed.krins.cloud/api/image/NZNPZ6N4.png)

![image-20220930090437448](http://imagebed.krins.cloud/api/image/8PN222LR.png)

上文的黑体1表示全1列向量。

![image-20220930090545374](http://imagebed.krins.cloud/api/image/4TH468F2.png)

![image-20220930090556060](http://imagebed.krins.cloud/api/image/404R0L0T.png)

![image-20220930090616512](http://imagebed.krins.cloud/api/image/86446X4N.png)

#### 矩阵的解法

![image-20220929212724851](http://imagebed.krins.cloud/api/image/LVRDHJ28.png)

![image-20220929212740213](http://imagebed.krins.cloud/api/image/64JD8J20.png)

![image-20220929212752156](http://imagebed.krins.cloud/api/image/00022R4R.png)

#### 矩阵的另一种解法

![image-20221002231034219](http://imagebed.krins.cloud/api/image/H486L6J2.png)

---

可以看到，方程组的解法部分对$\beta$求导的结果与矩阵的解法部分差了个系数“-2”，因为其只需计算=0的结果，系数可以约去。而矩阵的另一种解法部分系数又差了个“-”,是因为求导的方程是反过来的，是“估计-测量”，而不是“测量-估计”。

---

### 验证代码

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# 支持中文
plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号

# 测试数据
x1 = np.arange(0, 10, 0.2)
x2 = np.arange(-10, 0, 0.2)
y = 10*x1 + 3*x2 + 5 + np.random.random((len(x1)))*20

# 初始化参数
W = np.random.random(3) * 2 - 1
X = np.vstack([np.ones(len(x1)), x1, x2]).T  # 按列组合
Y = y.T

# 求逆计算参数
W_ = np.linalg.pinv(X.T @ X) @ X.T @ y


# 梯度下降
lr = 0.0001
th = Y.T @ Y
while True:
    # 更新梯度
    w = -2 * (Y - X @ W.T).T @ X
    W = W - lr * w
    
    # 计算结果
    Y_Test = X @ W.T
    Y_test = X @ W_.T
    
    # 计算残差
    e = (Y - Y_Test).T @ (Y - Y_Test)
    e_ = (Y - Y_test).T @ (Y - Y_test)

    # 3维绘图
    fig = plt.figure(num="二元线性回归", figsize=(8, 6))
    fig.clf()
    ax = Axes3D(fig, auto_add_to_figure=False)
    fig.add_axes(ax)
    ax.scatter(x1, x2, y, c='k', marker='*', label='Y')
    ax.plot(x1, x2, Y_Test.T, 'r', label='梯度')
    ax.plot(x1, x2, Y_test.T, 'b', label='求逆')
    ax.legend()
    plt.pause(0.05)
    
    if (th - e) < 0.01:
        print("求逆得到的参数：", W_)
        print("梯度下降得到的参数：", W, "此时的梯度：", w)
        print("W_计算出的残差：", e_, "W计算出的残差：", e)
        plt.show()  # 保持绘图窗口，否则程序运行完，窗口会关闭
        break
    if e < th:
        th = e

```

输出：

```bash
求逆得到的参数： [ 0.98652158 11.50489256  1.63967672]
梯度下降得到的参数： [ 0.34552899 11.5653558   1.57215115] 此时的梯度： [-0.04107174 -7.25936784 -6.8486504 ]
W_计算出的残差： 1727.6436919042164 W计算出的残差： 1727.6644713103485
```

![image-20220930183407215](http://imagebed.krins.cloud/api/image/0N804088.png)

---

### 附录：标量对矩阵的求导

标量f对矩阵X的导数，定义为$\frac{\partial f}{\partial X} = \left[\frac{\partial f }{\partial X_{ij}}\right]$，即f对X逐元素求导排成与X尺寸相同的矩阵。

一元微积分中的导数（标量对标量的导数）与微分有联系：$df = f'(x)dx$；多元微积分中的梯度（标量对向量的导数）也与微分有联系：$df = \sum_{i=1}^n \frac{\partial f}{\partial x_i}dx_i = \frac{\partial f}{\partial \boldsymbol{x}}^T d\boldsymbol{x} $，这里第一个等号是全微分公式，第二个等号表达了梯度与微分的联系：全微分$df$是梯度向量$\frac{\partial f}{\partial \boldsymbol{x}}$(n×1)与微分向量$dx$(n×1)的内积。

受此启发，我们将矩阵导数与微分建立联系：$df = \sum_{i=1}^m \sum_{j=1}^n \frac{\partial f}{\partial X_{ij}}dX_{ij} = \text{tr}\left(\frac{\partial f}{\partial X}^T dX\right) $。其中$tr$代表迹(trace)是方阵对角线元素之和，满足性质：对尺寸相同的矩阵A,B，$\text{tr}(A^TB) = \sum_{i,j}A_{ij}B_{ij}$，即$tr(A^TB)$是矩阵A,B的**内积**。与梯度相似，这里第一个等号是全微分公式，第二个等号表达了矩阵导数与微分的联系：全微分$df$是导数$\frac{\partial f}{\partial X}$(m×n)与微分矩阵$dX$(m×n)的内积。

常用的矩阵微分的运算法则：

![image-20221002232458461](http://imagebed.krins.cloud/api/image/00D88J04.png)

如何利用矩阵导数与微分的联系$df = \text{tr}\left(\frac{\partial f}{\partial X}^T dX\right) $，在求出左侧的微分$df$后，写成右侧的形式并得到导数呢？这需要一些有关迹的性质：

![image-20221002232751438](http://imagebed.krins.cloud/api/image/JL04X408.png)

**若标量函数f是矩阵X经加减乘法、逆、行列式、逐元素函数等运算构成，则使用相应的运算法则对f求微分，再使用迹技巧给$df$套上迹并将其它项交换至$dX$左侧，对照导数与微分的联系**$df = \text{tr}\left(\frac{\partial f}{\partial X}^T dX\right) $**，即能得到导数。**

**特别地，若矩阵退化为向量，对照导数与微分的联系**$df = \frac{\partial f}{\partial \boldsymbol{x}}^T d\boldsymbol{x} $**，即能得到导数。**

假设已求得$\frac{\partial f}{\partial Y}$，而Y是X的函数，如何求$\frac{\partial f}{\partial Y}$呢？在微积分中有标量求导的链式法则$\frac{\partial f}{\partial x} = \frac{\partial f}{\partial y} \frac{\partial y}{\partial x}$，但这里我们**不能随意沿用标量的链式法则**，因为矩阵对矩阵的导数$\frac{\partial f}{\partial Y}$截至目前仍是未定义的。

链式法则的源头是微分。我们直接从微分入手建立复合法则：先写出$df = \text{tr}\left(\frac{\partial f}{\partial Y}^T dY\right)$，再将$dY$用$dX$表示出来代入，并使用迹技巧将其他项交换至$dX$左侧，即可得到$\frac{\partial f}{\partial Y}$。

![image-20221002233312054](http://imagebed.krins.cloud/api/image/60LHVT4T.png)

### 参考链接

[回归分析|笔记整理（6）——多元线性回归（上）](https://zhuanlan.zhihu.com/p/48541799)

[多元线性回归之矩阵求导推导与python实现](https://blog.csdn.net/qq_39545674/article/details/109630314)

[3分钟带你掌握标量对矩阵求导方法](https://mp.weixin.qq.com/s/txRNKUXMVKv3nm0jftqjRg)

[矩阵求导术（上）](https://zhuanlan.zhihu.com/p/24709748)
