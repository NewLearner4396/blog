---
title: 了解PID控制
date: 2025-04-15
tags:
 - PID
 - control
categories:
 - Miscellaneous
---

## 迈入控制大门-PID

**控制：给系统正确的输入以获得需要的输出**

### 什么是PID

根据输入与输出的误差反馈控制输入以达到稳态的控制器

举个简单例子：控制无人机飞行到指定高度

无人机靠旋翼转动提供升力进行飞行，此处控制变量为旋翼旋转速度，观测变量为无人机此时高度，目标为指定的无人机高度

一个简单的思路：此时的误差——目标高度-当前高度越大，设置接近速度越大；当两者相等时，速度为0，无人机停止在目标高度。

潜在的问题：无人机悬停时需要转速（稳态误差）去提供升力以克服重力，也就是目标与当前观测相等时，转速不该为0。

可以添加一个固定的偏置，即输出转速 = $k_p*err + bias$，这样error为0时也会有升力。

但很多时候我们并不方便提前预知正确的偏置，此时添加积分项，将误差累积起来，当累积误差等于稳态误差时，无人机可以正确悬停在指定高度。

![了解 PID 控制，第 1 部分：什么是 PID 控制？ - YouTube_10'36.519''](https://image.krins.cloud/7d635e3f370aa5f0f6dc566fc3a0d094.jpeg)

P: proportional - present

I: integral - past

D: derivative - future

稳态误差：

### 非线性系统

**饱和**：控制器件有其物理限制，比如电机有最大转速，电池有最大放电电流



### 参考

[了解 PID 控制](https://www.youtube.com/watch?v=wkfEZmsQqiA)

作者：[Brian Douglas](https://www.youtube.com/channel/UCq0imsn84ShAe9PBOFnoIrg)
