---
title: NumPy库的学习笔记
date: 2022-09-01
tags:
 - numpy
categories:
 -  Python
---

## NumPy库的使用

### 简介

NumPy(Numerical Python) 是 Python 语言的一个扩展程序库，支持大量的维度数组与矩阵运算，此外也针对数组运算提供大量的数学函数库。NumPy提供了一系列快速高效的方法来创建数组并操作数组中的数值数据。与数组可以在单个列表中包含不同的数据类型不同，NumPy数组中的所以元素都是同类型的。

### 应用

NumPy 通常与 SciPy（Scientific Python）和 Matplotlib（绘图库）一起使用， 这种组合广泛用于替代 MatLab，是一个强大的科学计算环境，有助于我们通过 Python 学习数据科学或者机器学习。

SciPy 是一个开源的 Python 算法库和数学工具包。

SciPy 包含的模块有最优化、线性代数、积分、插值、特殊函数、快速傅里叶变换、信号处理和图像处理、常微分方程求解和其他科学与工程中常用的计算。

Matplotlib 是 Python 编程语言及其数值数学扩展包 NumPy 的可视化操作界面。它为利用通用的图形用户界面工具包，如 Tkinter, wxPython, Qt 或 GTK+ 向应用程序嵌入式绘图提供了应用程序接口（API）。

#### 相关链接

* NumPy 官网： <http://www.numpy.org/>
* NumPy 源代码：<https://github.com/numpy/numpy>
* SciPy 官网：<https://www.scipy.org/>
* SciPy 源代码：<https://github.com/scipy/scipy>
* Matplotlib 官网：<https://matplotlib.org/>
* Matplotlib 源代码：<https://github.com/matplotlib/matplotlib>

### Ndarray对象

NumPy 最重要的一个特点是其 N 维数组对象 ndarray，它是一系列同类型数据的集合，以 0 下标为开始进行集合中元素的索引。

ndarray 对象是用于存放同类型元素的多维数组。

ndarray 中的每个元素在内存中都有相同存储大小的区域。

ndarray 内部由以下内容组成：

- 一个指向数据（内存或内存映射文件中的一块数据）的指针。
- 数据类型或 dtype，描述在数组中的固定大小值的格子。
- 一个表示数组形状（shape）的元组，表示各维度大小的元组。
- 一个跨度元组（stride），其中的整数指的是为了前进到当前维度下一个元素需要"跨过"的字节数。

ndarray 的内部结构:

![nadrray](http://imagebed.krins.cloud/api/image/BT6NTH8P.png)

创建ndarray对象：

```python
numpy.array(object, dtype = None, copy = True, order = None, subok = False, ndmin = 0)
```

参数说明：

| 名称   | 描述                                                      |
| ------ | --------------------------------------------------------- |
| object | 数组或嵌套的数列                                          |
| dtype  | 数组语速的数据类型，可选                                  |
| copy   | 对象是否需要复制，可选                                    |
| order  | 创建数组的样式，C为行方向，F为列方向，A为任意方向（默认） |
| subok  | 默认返回一个与基类类型一致的数组                          |
| ndmin  | 指定生成数组的最小维度                                    |

dtype 为数组元素的数据类型（默认为int32）

常用的有：
      1. float(float32、float64)
      2. int(int8、int16、int32)、uint 
      3. complex

数据类型转换：

1. np.dtype(obj)
2. obj.astype(np.dtype)

### 常用函数

1. 矩阵创建

   1. np.array([1,2,3])
      
      创建1维行向量
      
   2. np.uint8([1,2,3])
      
      创建1维行向量，但数据类型是八位无符号数

   3. np.arange(start，stop，[step])
      
      左闭右开，步进可以为小数

   4. np.linspace(start,stop,num)
      
      左闭右闭，num设置生成多少个元素

   5. np.zeros(dim/(m,n))
      
      n维或n行m列0矩阵

   6. np.ones(dim/(m,n))
      
      n维或n行m列1矩阵

   7. np.eye(n,[m,k,dtype,order])
      
      n行m列单位阵，k为对脚线平移列数（正数左移），order为数组输出形式（默认为行优先）

   8. np.identity(n,[dtype])
      
      创建n维单位方阵

   9. np.random
      1. np.random.rand(m,n) 
         
         生成指定维度的的**[0,1)范围**之间的随机数

      2. np.random.randn(m,n)
         
         生成指定维度的的**[0,1)范围**之间服从正态分布的随机数
         
      3. np.random.randint(low,high,(m,n),[dtype])
         
         生成指定维度的的**[low,high)范围**之间服从正态分布的随机数
         
      4. np.random.random_integers(low,high,(m,n))
         
         生成指定维度的的**[low,high]范围**之间服从正态分布的随机数
         
      5. np.random.choice(a, size = None, replace = True, p = None) 
         
         从给定数组a中随机选择,p可以指定a中每个元素被选择的概率，p的size应与a一致，replace=True则返回的数可以有重复的
         
      6. np.random.seed()
         
         设置随机数种子

2. 矩阵转换

   1. a.reshape(m,n)/np.reshape(a,（m,n）,order) 
      
      新的尺寸不能使元素数量改变，m为-1时，系统会根据n自动计算m应为多少

   2. a.flatten() 
      
      将数组一行行的移到数组末尾变为1维

   3. a.ravel()
      
      功能与flatten一样，但返回的是a矩阵的变形，没有生成一个新矩阵，与a会相互影响

   4. a.T/a.transpose 
      
      矩阵转置

   5. np.hstack([A,B])
      
      将A,B两矩阵水平并在一起

   6. np.vstack([A,B])
      
      将A,B两矩阵竖直并在一起

3. 矩阵统计值

   1. a.max() 最大值

   2. a.min() 最小值

   3. a.mean() 平均值

      可设置参数axis，=0,则按列返回，=1则按行返回

4. 数学运算

   1. np.power(A,2) 幂函数，A的每个元素平方

   2. np.sqrt() 开根号

   3. np.log() 以e为底

   4. np.log2() 以2为底

   5. np.log10() 以10为底

   6. A.dot(B)/ A @ B A,B两矩阵内积，对应元素相乘再相加，A*B为对应元素相乘

5. 切片

   A[m:,n:]从第m行n列切到末尾

6. 设域

   np.clip(a,min,max)

   a中元素小于min的设为min，大于max的设为max

### 参考资料

1. [菜鸟教程-NumPy教程](https://www.runoob.com/numpy/numpy-tutorial.html)
2. [NumPy用户指南](https://numpy.org/doc/stable/user/index.html#user)
3. [极棒的数字图像处理入门到进阶教程：Python OpenCV实战数图](https://www.bilibili.com/video/BV1YA411K7pp?p=4&vd_source=f7fc0a964268b45e70067d58c7c397fc)