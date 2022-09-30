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

#### 参数估计

这一部分与上文参考自不同文章，函数表达略有不同，但并不影响理解。

![image-20220930085631165](http://imagebed.krins.cloud/api/image/J620866P.png)

令其对$\beta_i$的导数为0,求解方程组得到向量$\beta$,即上文的$W$

![image-20220930085653197](http://imagebed.krins.cloud/api/image/NZNPZ6N4.png)

![image-20220930090437448](http://imagebed.krins.cloud/api/image/8PN222LR.png)

上文的黑体1表示全1列向量。

![image-20220930090545374](http://imagebed.krins.cloud/api/image/4TH468F2.png)

![image-20220930090556060](http://imagebed.krins.cloud/api/image/404R0L0T.png)

![image-20220930090616512](http://imagebed.krins.cloud/api/image/86446X4N.png)

#### 梯度计算

![image-20220929212724851](http://imagebed.krins.cloud/api/image/LVRDHJ28.png)

![image-20220929212740213](http://imagebed.krins.cloud/api/image/64JD8J20.png)

![image-20220929212752156](http://imagebed.krins.cloud/api/image/00022R4R.png)

---

可以看到，参数估计部分对$\beta$求导的结果与梯度计算的部分差了个系数“-2”，因为其只需计算=0的结果，系数可以不管。

---

### 验证代码

```python
import numpy as np
import matplotlib.pyplot as plt

# 支持中文
plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号
# 测试数据
x1 = np.arange(0,10,0.2)
x2 = np.arange(-10,0,0.2)
y = 10*x1 + 3*x2 + 5 + np.random.random((len(x1)))*20

# 初始化参数
W = np.mat(np.random.random(3)*2-1)
X = np.mat(np.column_stack((np.ones(len(x1)),x1,x2)))  # 按列组合
Y = np.mat(y).T

# 梯度下降
lr = 0.0001
th = 1000000
while(True):
    # 更新梯度
    w = -2 * (Y - X @ W.T).T @ X  # @代表矩阵相乘
    W = W - lr * w
    # 绘图
    Y_Test = X @ W.T
    e = (Y - Y_Test).T @ (Y - Y_Test)    
    x = np.arange(len(Y)) + 1
    plt.clf()
    plt.scatter(x,list(Y), s=10)
    plt.plot(x, Y, 'b')
    plt.plot(x, Y_Test, 'r')
    plt.pause(0.01)
    if (th - e) < 0.01:
        plt.show()  # 保持绘图窗口，否则程序直接退出，窗口会关闭
        break
    if e < th:
        th = e

```

### 参考链接

[回归分析|笔记整理（6）——多元线性回归（上）](https://zhuanlan.zhihu.com/p/48541799)

[多元线性回归之矩阵求导推导与python实现](https://blog.csdn.net/qq_39545674/article/details/109630314)

[3分钟带你掌握标量对矩阵求导方法](https://mp.weixin.qq.com/s/txRNKUXMVKv3nm0jftqjRg)

