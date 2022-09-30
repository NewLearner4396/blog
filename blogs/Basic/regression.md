---
title: 线性回归
date: 2022-09-29
tags:
 - Regress
categories:
 -  Basic
---

## 线性回归的数学推导

### 数学表达

#### 回归方程

![image-20220929212535367](http://imagebed.krins.cloud/api/image/6P282662.png)

#### 损失函数

![image-20220929212605171](http://imagebed.krins.cloud/api/image/XJLZND8N.png)

### 参数估计

这一部分与上文参考自不同文章，函数表达略有不同，但并不影响理解。

![image-20220930085631165](http://imagebed.krins.cloud/api/image/J620866P.png)

令其对$\beta_i$的导数为0,求解方程组得到向量$\beta$,即上文的$W$

![image-20220930085653197](http://imagebed.krins.cloud/api/image/NZNPZ6N4.png)

![image-20220930090437448](http://imagebed.krins.cloud/api/image/8PN222LR.png)

上文的黑体1表示全1列向量。

![image-20220930090545374](http://imagebed.krins.cloud/api/image/4TH468F2.png)

![image-20220930090556060](http://imagebed.krins.cloud/api/image/404R0L0T.png)

![image-20220930090616512](http://imagebed.krins.cloud/api/image/86446X4N.png)

### 梯度计算

![image-20220929212724851](http://imagebed.krins.cloud/api/image/LVRDHJ28.png)

![image-20220929212740213](http://imagebed.krins.cloud/api/image/64JD8J20.png)

![image-20220929212752156](http://imagebed.krins.cloud/api/image/00022R4R.png)

---

可以看到，参数估计部分对$\beta$求导的结果与梯度计算的部分差了个系数“-2”，因为其只需计算=0的结果，系数可以约去。

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

fig = plt.figure(figsize=(8, 6))

# 梯度下降
lr = 0.0001
th = 1000000
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
    fig.clf()
    ax = Axes3D(fig)
    ax.scatter(x1, x2, y, c='k', marker='*', label='Y')
    ax.plot(x1, x2, Y_Test.T, 'r', label='梯度')
    ax.plot(x1, x2, Y_test.T, 'b', label='求逆')
    ax.legend()
    plt.pause(0.05)
    
    if (th - e) < 0.01:
        print(W_)
        print(W, w)
        print(e_, e)
        plt.show()  # 保持绘图窗口，否则程序运行完，窗口会关闭
        break
    if e < th:
        th = e

```

```bash
求逆得到的参数： [ 0.98652158 11.50489256  1.63967672]
梯度下降得到的参数： [ 0.34552899 11.5653558   1.57215115] 此时的梯度： [-0.04107174 -7.25936784 -6.8486504 ]
W_计算出的残差： 1727.6436919042164 W计算出的残差： 1727.6644713103485
```

![image-20220930183407215](http://imagebed.krins.cloud/api/image/0N804088.png)

### 参考链接

[回归分析|笔记整理（6）——多元线性回归（上）](https://zhuanlan.zhihu.com/p/48541799)

[多元线性回归之矩阵求导推导与python实现](https://blog.csdn.net/qq_39545674/article/details/109630314)

[3分钟带你掌握标量对矩阵求导方法](https://mp.weixin.qq.com/s/txRNKUXMVKv3nm0jftqjRg)

