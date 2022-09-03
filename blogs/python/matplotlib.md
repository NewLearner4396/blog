---
title: Matplotlib库的学习笔记
date: 2022-09-02
tags:
 - matplotlib
categories:
 -  Python
---

## Matplotlib库的使用

[TOC]

### 简介

Matplotlib 是 Python 的绘图库，它能让使用者很轻松地将数据图形化，可以用来绘制各种静态，动态，交互式的图表，并且提供多样化的输出格式。

### Matplotlib应用

Matplotlib 通常与 NumPy 和 SciPy（Scientific Python）一起使用， 这种组合广泛用于替代 MatLab，是一个强大的科学计算环境，有助于我们通过 Python 学习数据科学或者机器学习。

SciPy 是一个开源的 Python 算法库和数学工具包。

SciPy 包含的模块有最优化、线性代数、积分、插值、特殊函数、快速傅里叶变换、信号处理和图像处理、常微分方程求解和其他科学与工程中常用的计算。

### 相关链接

* NumPy 官网： <http://www.numpy.org/>
* NumPy 源代码：<https://github.com/numpy/numpy>
* SciPy 官网：<https://www.scipy.org/>
* SciPy 源代码：<https://github.com/scipy/scipy>
* Matplotlib 官网：<https://matplotlib.org/>
* Matplotlib 源代码：<https://github.com/matplotlib/matplotlib>
* pandas visualization官方文档：<https://pandas.pydata.org/docs/user_guide/visualization.html>

### Pyplot

Pyplot 是 Matplotlib 的子库，提供了和 MATLAB 类似的绘图 API。

Pyplot 是常用的绘图模块，能很方便让用户绘制 2D 图表。

Pyplot 包含一系列绘图函数的相关函数，每个函数会对当前的图像进行一些修改，例如：给图像加上标记，生新的图像，在图像中产生新的绘图区域等等。

使用的时候，我们可以使用 import 导入 pyplot 库，并设置一个别名 `plt`：

```python
import  matplotlib.pyplot as plt
```

常用函数：

1. plt.show() # 显示图像窗口

2. plt.plot([x],y,[format],[x2],y2,[format]…) # 绘制二维图像

   **颜色字符：**'b' 蓝色，'m' 洋红色，'g' 绿色，'y' 黄色，'r' 红色，'k' 黑色，'w' 白色，'c' 青绿色，'#008000' RGB 颜色符串。多条曲线不指定颜色时，会自动选择不同颜色。

   **线型参数：**'‐' 实线，'‐‐' 破折线，'‐.' 点划线，':' 虚线。

   **标记字符：**'.' 点标记，',' 像素标记(极小点)，'o' 实心圈标记，'v' 倒三角标记，'^' 上三角标记，'>' 右三角标记，'<' 左三角标记...等等。

   plt.xlabel(‘xlabel’) # 设置横轴标签

   plt.ylabel(‘ylabel’) # 设置纵轴标签

   plt.legend() # 显示图例

   plt.grid() # 显示网格

   plt.xlim([start,end]) # 设置横轴范围

   plt.ylim([start,end]) # 设置纵轴范围

   **和matlab的函数差不多**

3. plt.hist(array[,bins,rwidth,color]) # 绘制直方图

   该函数统计array在bins的每个区间的元素个数，rwidth设置显示宽度

4. 
