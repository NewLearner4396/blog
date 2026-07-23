---
title: ADC 与 DAC 入门地图
date: 2026-07-21
tags:
  - EE
  - ADC
  - DAC
categories:
  - Analog
---

## ADC 与 DAC：从模拟世界到数字系统的接口总览

这篇笔记原本同时介绍 ADC 和 DAC。为了让概念边界更清楚，现在将详细内容拆成两篇专门笔记：

- [[ADC_Selection_and_Application|ADC 选型与应用]]：重点讨论采样、量化、架构、ENOB、噪声、抖动、参考源、驱动和抗混叠。
- [[DAC_Selection_and_Application|DAC 选型与应用]]：重点讨论输出架构、建立时间、毛刺、线性度、输出缓冲、重建滤波和控制应用。

二者的共同任务，是在连续模拟世界和离散数字系统之间建立可控对应关系。ADC 把模拟量转换成数字码，DAC 把数字码转换成模拟电压或电流。它们都离不开 [[Voltage_Reference|电压基准源]]、[[Op_Amp_Classic_Circuits|运算放大器经典电路]]、[[Single_Point_Ground|单点接地]] 和 [[Passive_Components-C|认识无源器件：电容]]。

### ADC 和 DAC 的关系

| 项目 | ADC | DAC |
|---|---|---|
| 方向 | 模拟量到数字码 | 数字码到模拟量 |
| 核心问题 | 采样、量化、比较、编码 | 解码、加权、输出建立 |
| 关键误差 | 量化噪声、采样抖动、参考噪声、INL/DNL | INL/DNL、毛刺、建立时间、输出噪声 |
| 外围重点 | 输入驱动、抗混叠、参考源、同步采样 | 输出缓冲、重建滤波、负载稳定性 |
| 常见场景 | 传感器采集、电流电压测量、音频输入、控制反馈 | 控制电压、波形输出、音频输出、校准源 |

一个完整混合信号系统通常两者都会出现：

```text
真实世界 -> 传感器/调理 -> ADC -> 数字处理 -> DAC/PWM -> 执行器/模拟输出
```

### 为什么不能只看“多少位”

ADC 和 DAC 的标称位数只说明数字码宽，不等于真实精度。理想 LSB 为：

$$
LSB=\frac{V_{FS}}{2^N}.
$$

但真实系统还会受到噪声、失调、增益误差、线性度、参考源、时钟、布局和软件处理影响。16 bit 器件如果参考源噪声很大、输入驱动建立不足或地回流混乱，可能只得到 12 bit 甚至更低的有效精度。

### 学习顺序

1. 先读 [[ADC_Selection_and_Application|ADC 选型与应用]]，理解采样、量化和 ENOB。
2. 再读 [[DAC_Selection_and_Application|DAC 选型与应用]]，理解数字码如何变成真实输出。
3. 回到 [[Voltage_Reference|电压基准源]]，理解“尺子”的精度。
4. 结合 [[Op_Amp_Classic_Circuits|运算放大器经典电路]]，理解输入缓冲、滤波和输出驱动。
5. 最后用 [[Single_Point_Ground|单点接地]] 检查回流路径和公共阻抗耦合。

### 关联笔记

- [[ADC_Selection_and_Application|ADC 选型与应用]]
- [[DAC_Selection_and_Application|DAC 选型与应用]]
- [[Voltage_Reference|电压基准源]]
- [[Op_Amp_Classic_Circuits|运算放大器经典电路]]
- [[Current_Sensing_and_Power_Measurement|电流检测与功率测量]]
- [[Single_Point_Ground|单点接地]]
- [[Impedance_Matching|阻抗匹配]]

### 参考链接

- [第二十六课：ADC/DAC选型及应用](https://www.bilibili.com/video/BV19r9tBiEgM/)
