---
title: Matplotlib库的学习笔记
date: 2022-09-02
tags:
 - Python
categories:
 -  Lang
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

#### 常用函数

1. plt.show() # 显示图像窗口

   

2. plt.plot([x],y,[format],[x2],y2,[format]…) # 绘制二维图像

   **颜色字符：**'b' 蓝色，'m' 洋红色，'g' 绿色，'y' 黄色，'r' 红色，'k' 黑色，'w' 白色，'c' 青绿色，'#008000' RGB 颜色符串。多条曲线不指定颜色时，会自动选择不同颜色。

   **线型参数：**'‐' 实线，'‐‐' 破折线，'‐.' 点划线，':' 虚线。

   **标记字符：**'.' 点标记，',' 像素标记(极小点)，'o' 实心圈标记，'v' 倒三角标记，'^' 上三角标记，'>' 右三角标记，'<' 左三角标记...等等。

   plt.title(“”) # 设置图片标题

   plt.xlabel(”xlabel“) # 设置横轴标签

   plt.ylabel(“ylabel”) # 设置纵轴标签

   plt.legend() # 显示图例

   plt.grid() # 显示网格

   plt.xlim([start,end]) # 设置横轴范围

   plt.ylim([start,end]) # 设置纵轴范围

   **和matlab的函数差不多**

   

3. plt.scatter(x, y, s=None, c=None, marker=None, cmap=None, norm=None, vmin=None, vmax=None, alpha=None, linewidths=None, *, edgecolors=None, plotnonfinite=False, data=None) # 绘制散点图

   **x，y**：长度相同的数组，也就是我们即将绘制散点图的数据点，输入数据。

   **s**：点的大小，默认 20，也可以是个数组，数组每个参数为对应点的大小。

   **c**：点的颜色，默认蓝色 'b'，也可以是个 RGB 或 RGBA 二维行数组。

   **marker**：点的样式，默认小圆圈 'o'。

   **cmap**：Colormap，默认 None，标量或者是一个 colormap 的名字，只有 c 是一个浮点数数组的时才使用。如果没有申明就是 image.cmap。

   **norm**：Normalize，默认 None，数据亮度在 0-1 之间，只有 c 是一个浮点数的数组的时才使用。

   **vmin，vmax：**：亮度设置，在 norm 参数存在时会忽略。

   **alpha：**：透明度设置，0-1 之间，默认 None，即不透明。

   **linewidths：**：标记点的长度。

   **edgecolors：**：颜色或颜色序列，默认为 'face'，可选值有 'face', 'none', None。

   **plotnonfinite：**：布尔值，设置是否使用非限定的 c ( inf, -inf 或 nan) 绘制点。

   

4. plt.bar(x, height, width=0.8, bottom=None, *, align='center', data=None) # 绘制条形图

   **x**：浮点型数组，柱形图的 x 轴数据。

   **height**：浮点型数组，柱形图的高度。

   **width**：浮点型数组，柱形图的宽度。

   **bottom**：浮点型数组，底座的 y 坐标，默认 0。

   **align**：柱形图与 x 坐标的对齐方式，'center' 以 x 位置为中心，这是默认值。 'edge'：将柱形图的左边缘与 x 位置对齐。要对齐右边缘的条形，可以传递负数的宽度值及 align='edge'。

   **垂直方向的柱形图可以使用 barh() 方法来设置**

   

5. plt.pie(x, explode=None, labels=None, colors=None, autopct=None, pctdistance=0.6, shadow=False, labeldistance=1.1, startangle=0, radius=1, counterclock=True, wedgeprops=None, textprops=None, center=0, 0, frame=False, rotatelabels=False, *, normalize=None, data=None) # 绘制饼图

   **x**：浮点型数组，表示每个扇形的面积。

   **explode**：数组，表示各个扇形之间的间隔，默认值为0。

   **labels**：列表，各个扇形的标签，默认值为 None。

   **colors**：数组，表示各个扇形的颜色，默认值为 None。

   **autopct**：设置饼图内各个扇形百分比显示格式，**%d%%** 整数百分比，**%0.1f** 一位小数， **%0.1f%%** 一位小数百分比， **%0.2f%%** 两位小数百分比。

   **labeldistance**：标签标记的绘制位置，相对于半径的比例，默认值为 1.1，如 **<1**则绘制在饼图内侧。

   **pctdistance：**：类似于 labeldistance，指定 autopct 的位置刻度，默认值为 0.6。

   **shadow：**：布尔值 True 或 False，设置饼图的阴影，默认为 False，不设置阴影。

   **radius：**：设置饼图的半径，默认为 1。

   **startangle：**：起始绘制饼图的角度，默认为从 x 轴正方向逆时针画起，如设定 =90 则从 y 轴正方向画起。

   **counterclock**：布尔值，设置指针方向，默认为 True，即逆时针，False 为顺时针。

   **wedgeprops** ：字典类型，默认值 None。参数字典传递给 wedge 对象用来画一个饼图。例如：wedgeprops={'linewidth':5} 设置 wedge 线宽为5。

   **textprops** ：字典类型，默认值为：None。传递给 text 对象的字典参数，用于设置标签（labels）和比例文字的格式。

   **center** ：浮点类型的列表，默认值：(0,0)。用于设置图标中心位置。

   **frame** ：布尔类型，默认值：False。如果是 True，绘制带有表的轴框架。

   **rotatelabels** ：布尔类型，默认为 False。如果为 True，旋转每个 label 到指定的角度。

   

6. plt.hist(array[,bins,rwidth,color]) # 绘制直方图

   该函数统计array在bins的每个区间的元素个数，rwidth设置显示宽度

   

7. plt.figure(num=“”, figsise=(), dpi=, facecolor=, edgecolor=, clear=False)  # 设置窗口参数

   - `num`:如果此参数没有提供，则一个新的figure对象将被创建，同时增加figure的计数数值，此数值被保存在figure对象的一个数字属性当中。如果有此参数，且存在对应id的figure对象，则激活对于id的figure对象。如果对应id的figur对象不存在，则创建它并返回它。如果num的值是字符串，则将窗口标题设置为此字符串。
   - `figsize`:以英寸为单位的宽高，以元组的形式输入(1英寸等于2.54厘米)
   - `dpi`:图形分辨率
   - `facecolor`:背景色
   - `edgecolor`:边框颜色
   - `clear`:重建figure实例

   1. plt.ion() # 进入交互模式

      python可视化库matplotlib的显示模式默认为阻塞（block）模式。plt.show()之后，程序会暂停到那儿，并不会继续执行下去。如果需要继续执行程序，就要关闭图片。进入交互模式后，即使在脚本中遇到plt.show()，代码还是会继续执行。而且，在交互模式下，plt.plot(x)或plt.imshow(x)是直接出图像，不需要plt.show()。

   2. plt.ioff() # 退出交互模式

   3. plt.cla() # 清空当前子图

   4. plt.clf() # 清空当前图形窗口，删除所有子图

   5. plt.pause(internal) # 时间单位为s，运行GUI事件循环若干秒

      如果当前有活动的图形，在`pause`函数运行前，图形将会更新并显示，在等待期间事件循环会一直运行，直到暂停时间`interval`秒后结束。
      如果没有当前有活动的图形，将会调用`time.sleep`函数，休眠`interval`秒。

   6. plt.close() # 关闭图形窗口

      

8. plt.savefig(figure, “”)  # 保存图像，输入figure对象及保存路径

   

9. plt.rcParams[‘font.sans-serif’] = [‘SimHei’]  # 指定默认字体避免中文乱码

10. plt.rcParams[‘axes.unicode_minus’] = False  # 解决保存图像时负号‘-’显示成方块的问题

    

#### 配合seaborn库绘制热力图

```python
import seaborn as sns
import matplotlib.pyplot as plt

fig = sns.heatmap(DataFrame, vmax=1, vmin=-1, center=0, annot=True, square=True, fmt='.2g')
# annot=True 显示数据在块上
# square=True 画出方块
# fmt 格式化数据
# cmap 色卡
```

#### 单独修改标签等字体

```python
my_font = font_manager.FontProperties(fname="FZXH1JW.TTF")  # 导入方正细黑简体
plt.xlabel(“时间”,fontproperties = my_font)  # 在中文标题的地方加
```

#### 绘制三维图像

```python
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

ax = Axes3D(fig, auto_add_to_figure=False)
fig.add_axes(ax)
ax.plot(x,y,z)  # x,y,z的class可以是narray、list、Series，但不能是matrix
```

可参考链接:[python （matplotlib）画三维图像](https://blog.csdn.net/Mr_Cat123/article/details/100054757)

#### 绘制gif

gif的实质是先画出每个线条的完整图片，再将这些图片保存成一个数组，将这个数组的图片依次保存到gif的文件中，并在每张图片之间加入延时。

```python
import gif  # 该库依托与PIL，pip安装此库之前请先install pillow


# @gif.frame是GIF库用来创建帧序列的装饰器，紧接着的def gm(n)函数的输出就是一个PIL类
# 如果不定义装饰器将无法调用gif.save()
@gif.frame  
def plott(x,y):
    plt.plot(x,y)
   

frames = []
x1 = np.linspace(0, 20, 100)  # 创建数组
for i in range(20):
    plt.clf()  # 清空画布上的所有内容
    y1 = np.sin(x1*i/100.0)
    frame = plott(x1,y1)  # 将每个线条的完整图片分别画出来
	frames.append(frame)  # 将每个线条的完整图片存入一个列表中
gif.save(frames,'gif.gif',duration=100)  # 将列表中的图片依次存入gif文件中，并在每个图片之间加入延时。
```

可参考链接：[python 输出plot函数的动图，并保存为gif文件](https://blog.csdn.net/luzi0206/article/details/125866610)

### Animation

```python
import matplotlib.animation as ani
```

