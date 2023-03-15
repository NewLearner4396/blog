---
title: 梳理学习《通信原理》
date: 2022-09-25
tags:
 - Signal
categories:
 -  Book
---

## 根据邵老师讲义梳理《通信原理》

还在学习，慢慢补完！

### 全书框图

![全书框图](https://imagebed.krins.cloud/api/image/HN0LD266.png)

### 信号的载体——电磁波

远场无遮挡平面电磁波表达式：$r(d,t,f)=\frac{A(t,f)cos[2\pi f(t-d/c)]}{d}$

与电磁波发射幅度、发射频率、接收距离、接收时间有关

电磁波的频率与波长：$c=f\lambda=\frac{\lambda}{T}$，其中c为电磁波真空传输速度，近似为$3\times 10^8m/s$

 ![电磁波按波长分类](https://imagebed.krins.cloud/api/image/F462000F.png)

![电磁波按频段分类](https://imagebed.krins.cloud/api/image/2VX4622Z.png)

不同电磁波传播方式

![地波](https://imagebed.krins.cloud/api/image/H6Z466B6.png)

![天波](https://imagebed.krins.cloud/api/image/TFPV4HT8.png)

![视线传播](https://imagebed.krins.cloud/api/image/6ZL02R2N.png)

### 电磁波传播模型

![image-20230314170617065](https://imagebed.krins.cloud/api/image/P604ND06.png)
$$
r(t)=\sqrt{P_{Loss}}h(t)*s(t)+n(t)+I(t) \nonumber
$$
- 接收信号r(t)

- 发射信号s(t)

- 路径传播损耗$P_{Loss}$，代表特定距离和频率下的功率衰减平均值，一般称为“大尺度衰落”

- 信号衰落特性h(t)，代表短距离、短时间内的功率波动，一般称为“小尺度衰落”，通常建模成一个时变滤波器

- 噪声n(t)，包括环境噪声和设备内部噪声

+ 干扰I(t)，包括敌意人为干扰和频谱使用产生的干扰

![信道模型框图](https://imagebed.krins.cloud/api/image/6XRJB2T4.png)

---

---

#### 路径传播损耗

> 通信工程通常涉及数量级的变化，为方便计算使用dBm作为常用单位。
>
> > 一个功率值与 1mW 的参考功率比较，即用 1mW 进行归一化。虽然是相对比较，但是由于参考功率是一个绝对功率值，因此dBm 具有绝对功率含义，单位或量纲十分明确。
> >
> > 定义：功率 P(单位为W) 和 1mW 的比值，用分贝计算：$10lg\frac{P}{1mW}dBm$
> >
> > 手机接收天线收到的信号功率一般是-60dBm ~ -80dBm

自由空间的路径损耗(Friis公式):
$$
P_{Loss} = \frac{P_R}{P_T} =\frac{c^2}{(4\pi)^2 d^2 f^2} = -92.44-20lgd-20lgf

\nonumber
$$
其中，距离 d 的单位为km，频率 f 的单位是GHz。

自由空间一般指真空环境，工程上的无遮挡且大气吸收效应不明显的环境也可以近似为自由空间。

该公式适用于距离 d 较大的情况，即远场区域。

> 自由空间距离增加一倍，空间路径损耗只增加6dB。(惠更斯原理)
>
> 同轴线缆长度增加一倍，传播路径损耗翻倍。

>现实环境中，相同的传输距离和频率下，不同地点测量的平均接收功率有较大差异。
>
>> 原因：不同地点的周围环境千差万别，建筑物、山脉等障碍物对电波路径的阻挡形成电磁场半盲区。
>>
>> 模型：阴影衰落效应，大量测试结果表明，平均功率的统计模型服从对数正态分布。

---

---

#### 加性噪声

主要讨论内部噪声，也叫“热噪声”，产生原因是收发机的电路(放大器、滤波器、混频器、AD/DA等电子元器件)由电子热运动引起的随机扰动效应，在时域和频域普遍存在，一般不可避免。

![常见噪声](https://imagebed.krins.cloud/api/image/46BJ8P8P.png)

大量热噪声的存在，根据大数定律和中心极限定理，数学上建模成**加性的高斯白噪声**，工程实践中也充分验证了这一特性。

![白噪声统计特性](https://imagebed.krins.cloud/api/image/R062B0X2.png)

![白噪声统计特性(续)](https://imagebed.krins.cloud/api/image/6T8024P8.png)

>带通带限情况下，其功率$P_n=N_0B_s$
>
>通信工程中，高斯白噪声的来源主要是电路器件的热噪声，大量的实验和分析结果，表明热噪声的功率谱密度为:$N_0=kT(J)$
>> k 是玻尔兹曼常数,$k=1.23 \times 10^{-23}J/K$；T是系统等效的噪声温度，单位是热力学温标(K) 。
>> 适用条件：信号频率小于1000GHz，地表自然界常规温度。
>
>通信工程中，带宽$B_s$内的热噪声功率计算方法为：$P_n=N_0B_s=kTB_s(W)$
>
>20ºC，带宽为1Hz的热噪声功率为-174dBm

---

---

#### 乘性衰落

信道衰落特性，代表短距离、短时间内的功率波动，一般称为“小尺度衰落”，通常建模成一个时变滤波器。

“衰落”：Fading，产生的两个主要因素：

- 多径效应(Multi-Path) ：信号多条路径叠加；
- 多普勒效应(Doppler) ：环境变化运动。

##### 多径效应

**时域**：同一个传输信号，沿两个或者多个路径传播，以微小的时间差，到达接收机，造成信号互相干涉；接收机收到这些多路径信号合成的一个幅度和相位都急剧变化的信号。

- 时域影响：符号间干扰(ISI：Inter-Symbol Interference)

![多径时域表现](https://imagebed.krins.cloud/api/image/VBLX4X42.png)

- 频域影响：造成信道频域不平坦

![多径频域表现](https://imagebed.krins.cloud/api/image/LNLH6J4L.png)

- 多径可等效为一个时变FIR滤波器

![多径数学等效](https://imagebed.krins.cloud/api/image/VV26N04Z.png)

##### 多普勒效应

收发机的运动或周围环境的运动，都会引起多普勒效应。

多普勒频率变化量为：$f_d=\frac{v}{\lambda}cos\theta$

![多普勒对接收信号的影响](https://imagebed.krins.cloud/api/image/J20N0002.png)

### 调制与解调的数学原理

#### 通信信号的调制

一个物理可实现的信号的数学表达式:
$$
s(t)=A(t)cos(2\pi f_c t+\theta (t)) \nonumber
$$

从**时域**看：

幅度、频率、附加相位将发射信号决定，调制的过程就是将信息**调谐控制**到电磁波上，也可以理解成把一个低频信号搬移到高频载波上

![模拟调制常用框图](C:/Users/Administrator/AppData/Roaming/Typora/typora-user-images/image-20230315130355050.png)

从**频域**看：

从频谱法规、信道环境匹配考虑，一般情况下，发射信号被设计成一个带通信号(带宽为W且W<<$f_c$)

由于 s(t) 是实信号，因此其频谱 S(f) 是共轭对称的，幅度谱是偶函数，相位谱是奇函数。单边谱就决定了信号的全部特征。

![低通等效的推导](https://imagebed.krins.cloud/api/image/0V422XVF.png)

基带信号与带通信号有相同的幅度和相位信息，可以通过分析基带信号从而得到带通信号的等效性质，且基带信号分析的方法和手段相对方便复杂度低。

复基带信号被复载波搬移成实带通信号

![带通与基带信号的频域关系](https://imagebed.krins.cloud/api/image/FJL60N08.png)

![image-20230315133428464](https://imagebed.krins.cloud/api/image/86H8P6F2.png)

![image-20230315133411753](https://imagebed.krins.cloud/api/image/FRVL008H.png)

![坐标表示](https://imagebed.krins.cloud/api/image/XVT68X8B.png)

信号调制就是设计基带坐标值，${A(t),\theta(t)}或{s_I(t),s_Q(t)}$

两种坐标体系，本质是一样的，对应了两种发射机的实现架构,根据设计方便来选择。

工程上，模拟信源更多使用极坐标，数字信源采用直角坐标。

![调制信号框图](https://imagebed.krins.cloud/api/image/6ZVF2JVT.png)

![信息调制框图](https://imagebed.krins.cloud/api/image/NJ6H66VH.png)

![幅度调制](https://imagebed.krins.cloud/api/image/46LR4P86.png)

---

![接收信号数学模型](https://imagebed.krins.cloud/api/image/Z260P462.png)

![image-20230315161557296](https://imagebed.krins.cloud/api/image/J080X28P.png)

![image-20230315161636521](https://imagebed.krins.cloud/api/image/2N688ZP4.png)

**积分器可用低通滤波器等效**

![image-20230315161843524](https://imagebed.krins.cloud/api/image/P22F060F.png)

第一步：下变频(去载波)。出于带通和基带信号等价原理，且基带信号处理方便易实现的优势，首先把接收信号下变频到基带。

第二步：基带解调。根据下变频得到的I和Q路信号，考虑到噪声的影响，需要根据某种优化准则，来解调恢复调制信号 m(t)。解调后的信号与原始发射信号越接近越好，误差越小越好！

**基带解调本质上是一个随机信号的估计优化**

> ![等效基带与带通实信号功率关系](https://imagebed.krins.cloud/api/image/2ZHZ2J4L.png)
>
> ![通过等效低通计算带通信号功率](https://imagebed.krins.cloud/api/image/8BZ8T82R.png)

![实信号与等效低通的对比](https://imagebed.krins.cloud/api/image/F64B6N2Z.png)
