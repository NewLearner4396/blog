---
title: 基于最小秩估计的红外小目标检测
date: 2022-10-20
tags:
 - RemoteSensing
categories:
 -  Search
---

## 基于最小化联合l2,1范数的非凸秩估计的红外小目标检测

### IPI模型

**IPI模型：**

![image-20221021155105726](http://imagebed.krins.cloud/api/image/0064JB6X.png)

原图像D由背景B、目标T、噪声N组成。

IPI模型基于两个假设，**背景图像是一个低秩矩阵，目标图像是一个稀疏矩阵**。论文提到该假设较为符合物理实际，并且现在有很多高效的低秩矩阵恢复的方法，所以这个模型效率和泛用性极高。

该模型通过滑动窗将原图像进行提取，将得到的每个面片（Patch）拉伸成一维列向量，n个列向量组合成新的矩阵，即公式中的D。

T是一个稀疏矩阵，即![image-20221021155358366](http://imagebed.krins.cloud/api/image/806T6280.png)

T的非零元个数小于k，k远小于T矩阵的元素个数

B是一个低秩矩阵，即

![image-20221021155706114](http://imagebed.krins.cloud/api/image/40Z08HFF.png)

r是一个常数，对于越高复杂度的背景，r越高。实验中，背景图像的奇异值总是迅速收敛到0，印证了该假设的正确性。

由于一张图像较远像素也往往有较高相关性，提取出的D通常可以使用现有的许多非局部自相似性的方法。

N假设为一个i.i.d(独立同分布白噪声)

![image-20221021160520947](http://imagebed.krins.cloud/api/image/06T4R6L2.png)

在该模型中的k,r,$\delta$,对不同图像不同，但好消息是我们不需要直接计算出这些值。

**通过该模型小目标检测实际上是从数据矩阵中恢复低秩分量和稀疏分量的问题**

即：

![image-20221021161136496](http://imagebed.krins.cloud/api/image/D4FPTXPP.png)

可转换为对应问题

![image-20221021161216174](http://imagebed.krins.cloud/api/image/64BJL0H0.png)

因为该问题是一个凸问题，可以使用 Accelerated Proximal Gradient (APG)求解

![image-20221021161435605](http://imagebed.krins.cloud/api/image/8H8FH222.png)

其中

![image-20221021161459558](http://imagebed.krins.cloud/api/image/6B0LV62P.png)

该模型完整求解过程

![image-20221021161712075](http://imagebed.krins.cloud/api/image/2NPDVH82.png)

首先，根据从图像序列获得的原始红外图像fD构建补丁图像D。
其次，将算法1应用于斑块图像D以同时估计低秩背景斑块图像B和稀疏目标斑块图像T。
第三，我们分别从补丁图像B和T重建背景图像fB和目标图像fT。
第四，我们使用一种简单的分割方法来自适应地分割目标图像fT，因为它包含一些小值的误差。最后，通过后处理，对分割结果进行细化，得到最终的检测结果。

在算法1中，选择$\lambda = 1 / {\sqrt{max(m,n)}}$, $\eta = 0.99$, $\mu_0 = s_2$, $\bar{\mu} = 0.05 s_4$, $s_2, s_4$是D的第二和第四奇异值。

第三步中重叠部分的像素使用中值滤波器，比均值滤波器鲁棒性更好。

第四步中设置阈值确定目标：

![image-20221021162522338](http://imagebed.krins.cloud/api/image/86DV6F60.png)

可按需要选择双边阈值：

![](http://imagebed.krins.cloud/api/image/X82Z046T.png)

![image-20221021162600732](http://imagebed.krins.cloud/api/image/48TL2TT0.png)

$v_{max}、v_{min}、k$为经验确定的常数，$\mu、\sigma$为$f_T$的均值和标准差

最后一步的后处理中可使用区域分析方法去删除错误检测目标，可使用形态学方法去提炼目标区域。并且使用统计技术估计目标在重建背景图像中的对应局部区域的复杂度，然后利用估计结果评估器可靠性。

参考链接：[Infrared Patch-Image Model for Small Target
Detection in a Single Image](https://ieeexplore.ieee.org/document/6595533)

然而由于核范数和1范数平等对待所有奇异值，算出来的秩与真秩有些许偏差，所以迭代结果可能只是局部最优解，也就是说，不能精确分离复杂图像的背景和目标。

后人通过 non-convex rank approximation 来改进 principal component analysis（PCA），同时新提出的 alternating direction method of multipliers（ADMM）比 accelerated proximal gradient（APG）收敛更快更精确，可以进一步优化算法。

### ReWIPI模型

传统IPI模型由于l1范数不能完全描述稀疏性的缺陷，会过于缩小小目标或在目标图像中留下背景成分。并且由于强边缘也有可能是稀疏的，无法简单地与小目标进行区分。

通过结合结构先验信息，为每个patch自适应权重，提出了名为加权IPI weighted IPI（WIPI）的方法，然而每个patch都要进行计算，十分费时。并且仅能分离某些特定类型的强边缘。

WIPI的作者分析，其性能不令人满意的原因是**缺少相似的边缘样本**。虽然在奇异值部分和最小化partial sum minimisation of singular values（PSSV）方法的帮助下，可以保留较大的奇异值。然而，该方法仍需准确估计目标的秩，这实际上很难实现。

而且现有的基于低秩的方法没有考虑到亮度较低的非目标稀疏点的存在，很容易误认成为目标。

进一步分析，基于强边缘是否属于核范数最小化假设的相似边缘样本，可以将强边缘划分为强势的强边缘与弱势的强边缘。这两种强边缘都是全局稀疏的，但是只有弱势的强边缘是面片patch之间仍具有稀疏性。通过最后分离的结果来看，只有弱势的强边缘留在了目标图像中，也就是说，**面片之间的稀疏性比面片内部的稀疏性更容易使得目标留在目标图像**。所以**IPI模型性能不足的真实原因是存在具有面片间稀疏性的弱势强边缘同小目标进行混淆**。

所以我们急需一种方法可以抑制目标图像中的非目标稀疏点的同时保持背景强边缘。

基于**加权核范数最小化weighted  nuclear  norm  minimisation  (WNNM)可以通过较小的权重惩罚较大的奇异值**的特点，可以用来得到更为准确的背景图像。并且此方法并不需要准确计算出背景图像的秩。还可以**使用加权l1范数weighted l1 norm，通过较大的权重惩罚非目标图像**，得到更为准确的目标图像。根据这两种想法，可以提出一种新的IPI模型，reweighted IPI。

加权核范数定义为：

![image-20221023224745792](http://imagebed.krins.cloud/api/image/8LN42FFX.png)

加权1范数定义为：

![image-20221023224902789](http://imagebed.krins.cloud/api/image/0JJXD446.png)

对于噪声图像，我们假设其符合高斯分布，所以有：

![image-20221023225118819](http://imagebed.krins.cloud/api/image/JBN2DJRX.png)

于是ReWIPI可表示成：

![image-20221023225151555](http://imagebed.krins.cloud/api/image/6J820686.png)

该问题可以用拉格朗日乘子法等多种方法求解，见下文

参考：[Small target detection based on reweighted
infrared patch-image model](https://ietresearch.onlinelibrary.wiley.com/doi/full/10.1049/iet-ipr.2017.0353)

### Robust PCA via Nonconvex Rank Approximation

主成分分析principal component analysis(PCA)是一种很好的将原始高维数据投影到低维空间的降维技术。然而，一旦存在一个严重偏离实际的数据，PCA的结果将会不尽人意。

为了增强对异常值或观测时损坏的数据的鲁棒性，我们需要一种算法进行Robust PCA（RPCA），并尽可能保证算法复杂度较低。

通常来说，问题可以建模成：

![image-20221021191620601](http://imagebed.krins.cloud/api/image/DHXD20H4.png)

找到实际低秩矩阵的秩和实际稀疏矩阵的非零元个数，也就是最小化所认定为低秩矩阵的秩以及所认定的稀疏矩阵的非零元个数。

以上问题是一个NP-Hard问题。但可以通过将非凸的秩函数放松成核函数，将l0范数放松成l1范数进行简化成凸函数:

![image-20221023141809913](http://imagebed.krins.cloud/api/image/NDXR46LB.png)

在不相干假设下，低秩矩阵和稀疏分量可以以压倒性的概率准确恢复。参考：[Robust principal
component analysis?](https://ieeexplore.ieee.org/document/889420)

遇到的问题：

1. 不是所有矩阵都能有一致性保证（满足不相干假设），数据可能会严重损坏，这样求出的最优解会明显偏离真值。
2. 核函数本质上是矩阵奇异值的l1范数，然而l1范数本身就有收缩效应，这会导致得到的估计是有偏的。也就是说，RPCA将所有奇异值平均加权实际上过度惩罚了大的奇异值，导致结果偏离了较多。

虽然我们可以利用对l1范数的非凸惩罚，如截断的l1范数进行修正。但是这些方法只适用于特殊场景。

于是提出利用一种新的非凸函数进行对秩的逼近，通过增强的拉格朗日乘子法 Augmented Lagrange
Multiplier (ALM) 求解此非凸函数。

定义的新$\gamma$范数:

![image-20221023143918447](http://imagebed.krins.cloud/api/image/V2BJ0R6X.png)

问题变成:

![image-20221023154909795](http://imagebed.krins.cloud/api/image/08J6Z680.png)

ALM：

![image-20221023153952105](http://imagebed.krins.cloud/api/image/N0TB40JN.png)

Y是拉格朗日乘子，用于消除等式约束，$\mu$是一个正参数，用来稍加约束误差，引入Frobenius 范数计算误差作为二次惩罚项。<·, ·>是两个矩阵的内积，也可以表示成$tr(A^T B)$.

通过以下方程更新L，Y，$\mu$直至收敛：

![image-20221023154604521](http://imagebed.krins.cloud/api/image/2ZFBB4X6.png)

![image-20221023155545407](http://imagebed.krins.cloud/api/image/468L062N.png)

![image-20221023155507969](http://imagebed.krins.cloud/api/image/060H42Z2.png)

L的迭代求解：

因为对于优化问题：$\min\limits_Z F(Z) + \frac{\mu}{2}||Z-A||^2_F$的最优解$Z^*$可SVD成$U\sum^*_ZV^T$,$\sum^*_Z=diag(\sigma^*)$,$\sigma*$是优化问题$arg\min\limits_{\sigma \geq 0}f(\sigma)+\frac{\mu}{2}\Vert\sigma-\sigma_A\Vert^2_F$的最优解。

而上述问题又是凹函数和凸函数的联合，可以用差分凸规划 difference of convex (DC)
programing迭代优化,直至收敛：

![image-20221023164609814](http://imagebed.krins.cloud/api/image/T60HN6F8.png)

其中$w_k$是$f(\sigma_k)$的梯度

最后$L^{t+1}=Udiag(\sigma^*)V^T$

S的迭代求解：

若方程13用的是S的联合2,1范数，则解可以表示成：

![image-20221023155840951](http://imagebed.krins.cloud/api/image/88X4XNVB.png)

其中：$Q = X - L^{t+1} - \frac{Y^t}{\mu^t}$,$[S^{t+1}]_{:,i}$ 是$S^{t+1}$的第i列,$||S||_{2,1} = \sum\limits_i\sqrt{\sum\limits_j{S^2_{ij}}}$

若用的S的1范数，则解可以表示成：

![image-20221023160452582](http://imagebed.krins.cloud/api/image/R026BD62.png)

参数设置

1. $\lambda$

   $\lambda$太大会导致S迭代成0，最后L仍为一个高秩矩阵，$\lambda$太小会导致L最后为0，可以将$\lambda$设置成$1/\sqrt{\max(m,n)}$邻域的任意值，实验证明$\lambda$在相当范围内不敏感，可以设置成10e-3

2. $\rho$

   $\rho>1$，若$\rho$较大，则收敛更快，若$\rho$较小，则结果更精确。通常取1.1。

3. $\mu$

   可分别取1e-4，3e-3，0.5,4进行实验确定效果

参考论文：[Robust PCA via Nonconvex Rank Approximation](https://ieeexplore.ieee.org/document/7373325)

---

**根据以上工作，提出以下方法**

### Infrared Small Target Detection via Non-Convex Rank Approximation Minimization Joint l2,1 Norm

#### 算法原理

![image-20221017140935731](http://imagebed.krins.cloud/api/image/X08D4268.png)

引用一种 $\gamma$ norm 

![image-20221017140923454](http://imagebed.krins.cloud/api/image/40PPTD8R.png)

$\gamma$趋近0是B的秩，趋于无穷是B的核范数。

显然，$\gamma$范数几乎与真秩一致（此处使用$\gamma$=0.002），解决了传统凸核范数中不同奇异值的不平衡惩罚

 weighted nuclear norm（WNN）的逼近效果也很好，但每次都要重新计算权重时都要重新进行奇异值分解，增加了计算量。总体性能并不能比上$\gamma$范数。

![image-20221021174453131](http://imagebed.krins.cloud/api/image/PB26X848.png)

加权1范数

![image-20221017140951106](http://imagebed.krins.cloud/api/image/N88B22XN.png)

联合2,1范数

![image-20221017141000213](http://imagebed.krins.cloud/api/image/HRXDPZBJ.png)

于是目标问题就变成

![image-20221017141013452](http://imagebed.krins.cloud/api/image/6HRHLPL0.png)

引入拉格朗日乘子项和二次惩罚项将问题简化

![image-20221017141130929](http://imagebed.krins.cloud/api/image/2TZD6JJ6.png)

问题进一步转换成一下子问题：

![image-20221017141240575](http://imagebed.krins.cloud/api/image/NBL84BZ4.png)

可以通过最小化加权核范数逐渐求得B

![image-20221017142344020](http://imagebed.krins.cloud/api/image/J80604LV.png)

对于联合2,1范数，T的迭代解可以表示成：

![image-20221017142409602](http://imagebed.krins.cloud/api/image/D2P4R0XB.png)

![image-20221017142434618](http://imagebed.krins.cloud/api/image/62LRL06Z.png)

![image-20221017142445556](http://imagebed.krins.cloud/api/image/JH62J6NJ.png)

![image-20221017142456163](http://imagebed.krins.cloud/api/image/BRB820H0.png)

算法流程如下：

![image-20221017173929903](http://imagebed.krins.cloud/api/image/PT6NRBNL.png)

![image-20221017173939217](http://imagebed.krins.cloud/api/image/2PHH66D2.png)



#### 自己的疑问

为什么平均对待奇异值会导致无法区分出背景与目标

为什么会这么计算先验权重图
