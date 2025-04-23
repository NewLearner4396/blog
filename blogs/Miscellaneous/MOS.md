---
title: MOS常见电路
date: 2025-04-07
tags:
 - MOS
 - Semiconductor
categories:
 - Miscellaneous
---

## MOS管应用的核心知识

### MOS的辨别

### 开关电路

#### 电机驱动电路

##### 单三极管

##### 推挽

#### 供电切换电路

![二极管加三极管](https://image.krins.cloud/45787c03a7a2a3fd2eee6a0a24973205.png)

缺点：VUSB要大于VBAT

![NMOS+2PMOS](https://image.krins.cloud/dfe07796bb04b552fe4ad64cd89638bc.png)

主电源存在时使用主电源，主电源为0V时切换到外部电源

优点：主电源和副电源电压可以很相近

[非常精妙的主副电源自动切换电路，并且“零”压降，客官你GET到精髓了吗？](https://blog.csdn.net/karaxiaoyu/article/details/110021989)

#### 理想二极管

背对背MOS，可控导通方向，低压差

![image-20250421200935137](https://image.krins.cloud/8aef8d5ad59c34613066f60ed4b8844b.png)

[两个PMOS管背靠背用法详解](https://zhuanlan.zhihu.com/p/270632308)

#### 防倒灌电路

防止电机发电电流倒灌进电池

![image-20250421201141050](https://image.krins.cloud/d7249f1d3623b3a7376e1dca48ae54bc.png)

[防倒灌电路【理想二极管】](https://blog.csdn.net/zjb6668/article/details/143837226)

#### 高、低边开关

##### 驱动电路

![image-20250421201544268](https://image.krins.cloud/47fda8fce682c07d789f14366dd02833.png)

[【Hardware】【手机震动马达】](https://blog.csdn.net/syjie19900426/article/details/88135368)
