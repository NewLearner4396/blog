---
title: 图像处理的基本操作
date: 2022-09-03
tags:
 - image_basic
categories:
 -  imageProcessing
---

## 图像处理的基础知识

### 零、前言

记录一下学习到的关于图像的知识

#### 前置代码

1. 库的导入

   ```python
   import matplotlib.pylot as plt
   import numpy as np
   import cv2 as cv
   ```

2. 画图函数

   ```python
   def show(img):
       if img.ndim = 2: 
           # 判断为灰度图
           plt.imshow(img,cmap='gray')
       else: 
           # 认为是RGB图
           #cv.imread()读图默认是BGR排序转换成RBG
           plt.imshow(cv.cvtColor(img,cv.COLOR_BGR2RGB))
       plt.show()
   ```

### 一、图像分类

1. 二值图

   只有两种取值

   ![二值图](http://imagebed.krins.cloud/api/image/84D2LPVL.png#pic_center)

2. 灰度图

   对8位灰度图，有256种取值

   在数值上是个2维的矩阵，记录每个位置的灰度

   ![灰度图](http://imagebed.krins.cloud/api/image/TLRTDJT6.png#pic_center)

   ![灰度图的数值与图像的对应](http://imagebed.krins.cloud/api/image/ZN66DPJ4.png)

3. RGB图像

   有R,G,B三个通道，类似灰度，每个通道各有8位表示颜色深度

   在数值上是个三维矩阵

   ![RGB图](http://imagebed.krins.cloud/api/image/VFVF80RN.png#pic_center)

![RGB图数值与图像对应](http://imagebed.krins.cloud/api/image/B04644PH.png)

### 二、图像变换

1. 通道的分离与合并

    b,g,r = cv.split(img)

    img_merge = cv.merge([b,g,r])

    ```python
    # 只保留G通道
    img = cv.imread('PATH')
    cp_img = img.copy()
    cp_img[:,:,1] = 0
    cp_img[:,:,2] = 0
    ```

    

 2. 彩色图转灰度图

    img_gray = cv.cvtColor(img,cv.COLOR_BGR2GRAY)

 3. 图像二值化

    __,img_bin = cv.threshold(img_gray,th1,th2,cv.THRESH_BINARY)

    将img_gray中大于th1的值设为th2，小于设为0

    cv.THRESH_BINARY可替换为0

 4. 图像运算

    1. img = cv.add(img1,img2)

       两图像相加，大于255的值设为255

       可用来混合图像、添加噪声

    2. img = cv.addweighted(img1,alpha,img2,beta,gamma)

       img = np.uint8(img1 * alpha + img2 * beta +gamma)

    3. img = cv.subtract(img1,img2)

       两图像相减

       可用来消除背景、比较差异、运动跟踪

    4. img = cv.multiply(img1,img2)

       图像相乘，两图像的数据类型需保持一样

       可用来增加蒙版

    5. img = cv.divide(img1,img2)

       图像相除

       可用来比较差异、校正设备

    6. img = cv.convertScaleAbs(img, alpha=,beta=)

       线性变换

       img = beta + np.uint8(img * alpha)

       且元素小于0会自动设为0，大于255会自动设为255

    7. img = alpha + np.log(img.astype(np.float64) + 1) / b

       对数变换

       先将img的dtype设为float64保证+1后不会由255变为0

    8. img = np.power((img / 255), gamma) * 255

       指数变换 

 5. 边界填充

    0. 设置填充多少区域

       top_size,bottom_size,left_size,right_size = (50,50,50,50)  

    1. replicate = cv.copyMakeBorder(img,top_size,bottom_size,left_size,right_size,cv.BORDER_REPLICATE) 

       复制法，复制最边缘像素

    2. reflect = cv.copyMakeBorder(img,top_size,bottom_size,left_size,right_size,cv.BORDER_REFLECT)

       反射法，对感兴趣的图像中的像素在两边进行复制例如：fedcba|abcdefgh|hgfedcb

    3. reflect101 = cv.copyMakeBorder(img,top_size,bottom_size,left_size,right_size,cv.BORDER_REFLECT_101)      

       反射法二，也就是以最边缘像素为轴，对称，不复制轴这个像素gfedcb|abcdefgh|gfedcba

    4. wrap = cv.copyMakeBorder(img,top_size,bottom_size,left_size,right_size,cv.BORDER_WRAP)

       外包装法，从对侧开始填充cdefgh|abcdefgh|abcdefg

    5. constant = cv.copyMakeBorder(img,top_size,bottom_size,left_size,right_size,cv.BORDER_CONSTANT,value=0)

       常量法，常数值填充
       
       ![各填充法对比](http://imagebed.krins.cloud/api/image/0622464T.png)

6. 图像平滑

    1. cv.blur(img,(m,n))

       均值滤波，(m,n)代表滑动卷积核的大小

       相当于平均池化

    2. cv.boxFilter(img,-1,(m,n),normalize=True)

       方框滤波，基本和均值滤波一样

       当normalize=False时，就只卷积不平均，大于255则强设为255，容易过曝

    3. cv.GaussianBlur(img,(5,5),1)

       高斯滤波

       用满足高斯分布的值作为卷积核的数

       1指高斯分布的标准差为1

    4. cv.medianBlur(img,5)

       中值滤波

       取当前像素点机周围像素点排序后拿中值替代中间元素值的大小

        ksize为卷积核大小，必须为比1大的奇数

7. Canny边缘检测

    1. 使用高斯滤波器，以平滑图像，滤除噪声

       ![使用的高斯滤波器](http://imagebed.krins.cloud/api/image/0V8T4FJ6.png)

    2. 计算图像中每个像素点的梯度强度和方向

       ![梯度和方向](http://imagebed.krins.cloud/api/image/6T62NZ86.png)

    3. 非极大值抑制，消除杂散边缘

       ![判断是否为极大值](http://imagebed.krins.cloud/api/image/2B00820P.png)
       
       ![改进的判断方法](http://imagebed.krins.cloud/api/image/0PTL8JHF.png)

    4. 双阈值检测确定真实的边缘

       ![双阈值检测](http://imagebed.krins.cloud/api/image/24666XXF.png)

​        **上述流程被封装成了一个函数：**`cv.Canny(img,minVal,maxVal)`,输入自己设置的阈值即可使用

8. 图像金字塔

   每卷积一次就能获得新的层，并且新层的尺寸会缩小，不断卷积直到层最小，垒起来就能成为图像金字塔

   做特征提取时有时可能不光对原始输入做特征提取，可能还会对好几层图像金字塔做特征提取。可能每一层特征提取的结果是不一样的，再把特征提取的结果总结在一起

   常见有高斯金字塔、拉普拉斯金字塔

   ![高斯金字塔和拉普拉斯金字塔](http://imagebed.krins.cloud/api/image/6JT28V8P.png)

   1. 高斯金字塔

      1. 下采样（缩小）

         1. 将原图与高斯内核卷积进行平滑

            ![使用的高斯核](http://imagebed.krins.cloud/api/image/R0PP6220.png)

         2. 将所有偶数行和列去除

            **使用代码为：**`down = cv.pyrDown(img)`

      2. 上采样（放大）

         1. 将图像在每个方向扩大为原来的两倍，以0填充

         2. 用同样规模的高斯核卷积进行平滑

            **使用代码为：**`up = cv.pyrUp(img)`

   2. 拉普拉斯金字塔

      1. 拉普拉斯金字塔每层尺寸都一样

      2. 拉普拉斯金字塔每层都是基于上一层，上一层作为输入减去该输入缩小放大后的图像作为该层输出

         $L_i$ = $G_i$ - cv.pyrUp(cv.pyrDown($G_i$))

         ![拉普拉斯金字塔处理过程](http://imagebed.krins.cloud/api/image/040R8V8P.png)

9. 图像轮廓

   有些线条纹理也可以被当作边缘，但轮廓是一系列可作为整体的边缘

   cv.findContours(img,mode,method)

   为了更高的准确率，图像一般选择二值图像

   mode：轮廓检索模式

   - RETR_EXTERNAL ：只检索最外面的轮廓。
   - RETR_LIST：检索所有的轮廓，并将其保存到一条链表当中。
   - RETR_CCOMP：检索所有的轮廓，并将他们组织为两层：顶层是各部分的外部边界，第二层是空洞的边界。
   - RETR_TREE：检索所有的轮廓，并重构嵌套轮廓的整个层次。( 最常用 )

   method：轮廓逼近方法

   - CHAIN_APPROX_NONE：以Freeman链码的方式输出轮廓，如下图左所示。所有其他方法输出多边形 ( 顶点的序列 )，如下图右所示。

   - CHAIN_APPROX_SIMPLE：压缩水平的、垂直的和斜的部分，也就是，函数只保留他们的终点部分，如下图右所示。

     ![不同轮廓逼近方法](http://imagebed.krins.cloud/api/image/408220ZR.png)

10. 模板匹配

       - 计算A图每个区域与B图(模板)的相关性

       - 模板在原图像上从原点开始滑动，计算模板与（图像被模板覆盖的地方）的差别程度(例如值127与值190的区别)，这个差别程度的计算方法在opencv里有6种，然后将每次计算的结果放入一个矩阵里，作为结果输出。

       - 假如原图形是AxB大小，而模板是axb大小，则输出结果的矩阵是(A-a+1)x(B-b+1)

         dct = cv.matchTemplate(img,template,methods)

         模板匹配计算方式6种方式 ( 用归一化后的方式更好一些 )：

         - TM_SQDIFF：计算平方不同，计算出来的值越小，越相关。

         - TM_CCORR：计算相关性，计算出来的值越大，越相关。

         - TM_CCOEFF：计算相关系数，计算出来的值越大，越相关。

         - TM_SQDIFF_NORMED：计算归一化平方不同，计算出来的值越接近0，越相关。

         - TM_CCORR_NORMED：计算归一化相关性，计算出来的值越接近1，越相关。

         - TM_CCOEFF_NORMED：计算归一化相关系数，计算出来的值越接近1，越相关。

           各方式计算公式链接：<https://docs.opencv.org/3.3.1/df/dfb/group__imgproc__object.html#ga3a7850640f1fe1f58fe91a2d7583695d>


11. 图像直方图

    直方图可以看各种亮度的点有多少

    cv.calcHist([img],[channels],[mask],[histSize],[ranges])

    输入参数都用中括号括起来

    histr = cv.calcHist([img],[i],None,[256],[0,256]) 该函数常用用法

    ![灰度图的直方图](http://imagebed.krins.cloud/api/image/R6228NH2.png)

12. 图像傅里叶变换

    频谱图上的点和原图像上的点并不是一一对应的关系，频谱图上的每个点都代表了原图像的全局信息，频谱图上的点反映的是原图像中具有该灰度变化快慢规律的图像区域(可能不止一个)及其灰度峰值（亮暗）信息。

    高频：变化剧烈的分量，增强高频使细节更明显

    低频：变化缓慢的分量，增强低频使边界模糊

    cv2.dft() 执行傅里叶变换到频域中  

    cv2.idft() 执行逆傅里叶变换

    输入图像需要先转换成 np.float32 格式

    得到的结果中频率为 0 的部分会在左上角，通常要转换到中心位置，可以通过 np.fft.shift 变换来实现

    返回的结果是双通道的 ( 实部，虚部 )，通常还需要用20 * np.log(cv.magnitude(dft_shift[:,:,0],dft_shift[:,:,1]))转换成图像格式才能展示(0,255)像素值

    

    ![图像傅里叶变换](http://imagebed.krins.cloud/api/image/BJN8LR64.png)

13. 图像透视变换

    1. 获得变换矩阵

       M = cv.getPerspectiveTransform(coordinate_origin, coordinate_new)
       coordinate_origin：原图坐标
       coordinate_new：新图坐标

    2. 透视变换

       img_new = cv.warpPerspective(src,M,dsize=(width,height),flags=INTER_LINEAR,borderMode=BORDER_CONSTANT,borderValue=None)

       透视前
       ![透视前](http://imagebed.krins.cloud/api/image/B64V8H88.png)

       透视后
       ![透视后](http://imagebed.krins.cloud/api/image/2L8LZR28.png)

14. 角点检测

    - x,y方向都有大梯度变化的是角点

    - x或y方向有大梯度变化的是边界

    - 否则是平面

      计算图像平移（dx，dy）后的相似性：$c(x,y;{\Delta}x,{\Delta}y)={\sum\limits_{(u,v) \in W(x,y)}}w(u,v)(I(u,v)-I(u+\Delta x,v+\Delta y))^2$

      ![w](http://imagebed.krins.cloud/api/image/8822H4TF.png)

      基于泰勒展开对$I(u+\Delta x,v+\Delta y)$进行一阶近似：
      $$
      I(u+\Delta x,v+\Delta y)=I(u,v)+I_x(u,v)\Delta x+I_y(u,v)\Delta y+O(\Delta x^2,\Delta y^2)\approx I(u,v)+I_x(u,v)\Delta x+I_y(u,v)\Delta y \nonumber
      $$
      其中，$I_x$、$I_y$是$I(x,y)$的偏导数

      于是$c(x,y;\Delta x,\Delta y)$可近似为：
      $$
      \sum\limits_w(I_x(u,v) \Delta x + I_y(u,v) \Delta y)^2 = \begin{bmatrix}\Delta x , \Delta y \end{bmatrix} M(x,y) \begin{bmatrix}\Delta x \\ \Delta y \end{bmatrix}\nonumber
      $$
      其中$M(x,y)$为:
      $$
      M(x,y)=\begin{bmatrix}{\sum\limits_w I_x(x,y)^2} \quad {\sum\limits_w I_x(x,y)I_y(x,y)} \\ {\sum\limits_w I_x(x,y)I_y(x,y)} \quad {\sum\limits_w I_y(x,y)^2}\end{bmatrix} = \begin{bmatrix}A \quad C \\ C  \quad B\end{bmatrix}
      $$
      计算$M(x,y)$的特征值$\lambda_1,\lambda_2$,并且计算R值($R=\lambda_1\lambda_2-k(\lambda_1+\lambda_2)^2$)判断是否为角点：

      - R>0 ——> 角点

      - R≈0 ——> 平面

      - R<0 ——> 边界

        ![特征值的含义](http://imagebed.krins.cloud/api/image/T2J4282R.png)

    	函数：cv.cornerHarris(img,blockSize,ksize,k)

        - img：数据类型为 ﬂoat32 的入图像。
      - blockSize：角点检测中指定区域的大小。
      - ksize：Sobel求导中使用的窗口大小。常用 3。
      - k：取值参数为 [0.04,0.06]。常用 0.04。
      

15. SIFT尺度不变特征转换

    

### 参考资料

1. [【2022B站最好的OpenCV课程推荐】OpenCV从入门到实战 全套课程（附带课程课件资料+课件笔记）图像处理|深度学习人工智能计算机视觉python+AI](https://www.bilibili.com/video/BV1PV411774y?p=9&spm_id_from=pageDriver&vd_source=f7fc0a964268b45e70067d58c7c397fc)

2. [极棒的数字图像处理入门到进阶教程：Python OpenCV实战数图](https://www.bilibili.com/video/BV1YA411K7pp?spm_id_from=333.337.search-card.all.click&vd_source=f7fc0a964268b45e70067d58c7c397fc)
3. [最全面的 OpenCV 笔记](https://github.com/AccumulateMore/OpenCV)