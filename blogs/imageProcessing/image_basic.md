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

    1. 尺度空间
    
       尺度空间就是试图在图像领域中模拟人眼观察物体的概念与方法。例如：观察一棵树，关键在于我们想要观察的是树叶子还是整棵树：如果是一整棵树（相当于大尺度情况下观察），那么就应该去除图像的细节部分。如果是树叶（小尺度情况下观察），那么就应该观察局部细节特征。
    
       - 尺度空间的获取通常使用高斯模糊来实现。
    
       - 不同 σ 的高斯函数决定了对图像的平滑程度，越大的 σ 值对应的图像越模糊，对应的尺度也越大。
    
       ![高斯卷积核](http://imagebed.krins.cloud/api/image/VBJVF88N.png)
    
       ![不同σ的模糊效果](http://imagebed.krins.cloud/api/image/ZL64N0F8.png)

       2. 高斯金字塔
       
          1. 对图像做高斯平滑
          2. 对图像降采样
       
          构建过程中一般先图像扩大一倍，这样滤波后能保留更多信息
       
          每幅图像叫层，同一尺度下的图像一起构成组
       
          ![高斯金字塔](http://imagebed.krins.cloud/api/image/DXD0DDND.png)
       
       3. 高斯差分金字塔
       
          构建尺度空间的目的是为了检测在不同的尺度下都存在的特征点，而检测特征点较好的算子是高斯拉普拉斯 LoG，使用 LoG 虽然能较好的检测到图像中的特征点，但是其运算量过大，通常可使用高斯差分 DoG 来近似 LoG。
       
          对同一个组的两幅相邻图像做差就得到了高斯差分金字塔
       
          ![高斯差分金字塔](http://imagebed.krins.cloud/api/image/4J20RH2D.png)
       
       4. 空间极值点检测
       
          特征点是由 DoG 空间的局部极值点组成的。为了寻找 DoG 函数的极值点，每一个像素点要和其图像域（同一尺度空间）和尺度域（相邻的尺度空间）的相邻点比较，当其大于（或者小于）所有相邻点时，该点就是极值点。特征点是由 DoG 空间的局部极值点组成的。如下图，中间的检测点和它同尺度的 8 个相邻点和上下相邻尺度对应的 9x2 个点共 26 个点比较，以确保在尺度空间和二维图像空间都检测到极值点。
       
          每一个组图像的第一层和最后一层是无法进行比较取得极值的，所以要在每个组求S层点时，就需要在高斯差分金字塔里有S+2层图像，也就需要在高斯金字塔有S+3层图像。并且如果每组图像都求S层点，每组的高斯差分可以连续起来，不会漏掉每个尺度的极值点。
       
       5. 特征点定位
       
          1. 特征点的精确定位
       
             离散空间的极值点并不是真正的极值点，为了提高特征点的稳定性，需要对尺度空间 DoG 函数进行曲线拟合。
       
             ![离散极值点与连续极值点的区别](http://imagebed.krins.cloud/api/image/6Z60J8F8.png)
       
             ![DOG函数](http://imagebed.krins.cloud/api/image/6TVB0404.png)
       
          2. 剔除边缘响应点、
       
             一个定义不好的高斯差分算子的极值在横跨边缘的地方有较大的主曲率，而在垂直边缘的方向有较小的主曲率。DoG 算子会产生较强的边缘响应，需要提出不稳定的边缘响应点。
       
             获取特征点处的 Hessian 矩阵，主曲率通过一个 2x2 的 Hessian 矩阵求出
       
             ![Hessian矩阵](http://imagebed.krins.cloud/api/image/20DH0H04.png)
       
             为了避免求具体的特征值，可以使用 Hessian 特征值的比例。
       
             ![主曲率比值](http://imagebed.krins.cloud/api/image/8P00H828.png)
       
       6. 特征点方向赋值
       
          经过上面的步骤已经找到了在不同尺度下都存在的特征点，为了实现图像旋转不变性，需要给特征点的方向进行赋值。利用特征点邻域像素的梯度分布特性来确定其方向参数，再利用图像的梯度直方图求取特征点局部结构的稳定方向。
       
          计算以特征点为中心，以 3 × 1.5 σ 为半径的区域图像的幅角和幅值。
       
          ![模和角度的计算](http://imagebed.krins.cloud/api/image/48842RH6.png)
       
          计算得到梯度方向后，就是用直方图统计特征点邻域内像素对应的梯度方向和幅值。梯度方向的直方图的横轴是梯度方向的角度（梯度方向的范围是 0 到 360 度，直方图每 36 度一个柱，共 10 个柱），纵轴是梯度方向对应梯度幅值的累加，在直方图的峰值就是特征点的主方向。
       
          在 Lowe 的论文还提到了使用高斯函数对直方图进行平滑以增强特征点近的邻域点对特征点方向的作用，减少突变的影响。
       
          特征点的方向可以由和主峰最近的三个柱值通过抛物线插值得到。在梯度直方图中，当存在一个相当于主峰值 80% 能量的柱值时，则可以将这个方向认为是该特征点的辅助方向。所以，一个特征点可能检测到多个方向（也可以理解为，一个特征点可能产生多个坐标、尺度相同，但是方向不同的特征点）。Lowe 在论文中指出 15% 的特征点具有多方向，而且这些点对匹配的稳定性很关键。
       
          得到特征点的主方向后，对于**每个特征点可以得到三个信息（x , y , σ , θ）即位置、尺度和方向**。由此可以确定一个 SIFT 特征区域，**一个 SIFT 特征区域由三个值表示，中心表示特征点位置，半径表示特征点的尺度，箭头表示主方向。**具有多个方向的特征点可以被复制成多份，然后将方向值分别赋值给复制后的特征点，一个特征点就产生了多个坐标、尺度相等，但是方向不同的特征点。
       
       7. 生成特征描述
       
          为每个特征点建立一个描述，用一组向量将这个特征点描述出来，使其不随各种变化而改变，比如光照变化、视角变化等等。这个描述子不但包括特征点，也包含特征点周围对其有贡献的像素点，并且描述符应该有较高的独特性，以便于提高特征点正确匹配的概率。
       
          特征描述子与特征点所在的尺度有关，因此，对梯度的求取应在特征点对应的高斯图像上进行，将特征点附近的邻域划分为 d * d （Lowe 建议 d=4）个子区域，每个子区域作为一个种子点，每个种子点有 8 个方向。
       
          1. 校正旋转主方向，确保旋转不变性
       
             ![将坐标轴旋转为特征点的主方向](http://imagebed.krins.cloud/api/image/824L6XX2.png)
       
             ![旋转矩阵](http://imagebed.krins.cloud/api/image/06F686L8.png)
       
          2. 生成描述子，最终形成一个 128 维的特征向量
       
             旋转之后的主方向为中心取8x8的窗口，求每个像素的梯度幅值和方向，箭头方向代表梯度方向，长度代表梯度幅值，然后利用高斯窗口对其进行加权运算，最后在每个4x4的小块上绘制8个方向的梯度直方图，计算每个梯度方向的累加值，即可形成一个种子点，即每个特征点由4个种子点组成，每个种子点有8个方向的向量信息，向量共128维。
       
             ![128维特征向量](http://imagebed.krins.cloud/api/image/26644N48.png)
       
          3. 归一化处理，把特征向量长度进行归一化处理，进一步去除光照的影响
       
             为了去除光照对描述子的影响，对梯度直方图进行归一化处理。对于图像灰度值整体漂移，图像各点的梯度是邻域像素相减的，所以也能去除。
       
             非线性光照，相机饱和度变化对造成某些方向的梯度值过大，而对方向的影响微弱。因此设置门限值（向量归一化后，一般取 0.2）截断较大的梯度值。然后，再进行一次归一化处理，提高特征的鉴别性。
       
          4. 按特征点的尺度对特征描述向量进行排序
       
       8. SIFT缺点
       
          1. 实时性不高
          2. 有时特征点较少
          3. 对边缘光滑的目标无法准确提取特征点
       
       9. 函数
       
          ```python
          sift = cv2.xfeatures2d.SIFT_create()  # 将 SIFT 算法实例化出来
          kp = sift.detect(img, None) # 把灰度图传进去，得到特征点、关键点
          kp, des = sift.compute(gray, kp) # 计算特征向量
          # 也可以直接找关键点并计算特征向量
          kp, des = sift.detectAndCompute(gray,img)
          ```

### 参考资料

1. [【2022B站最好的OpenCV课程推荐】OpenCV从入门到实战 全套课程（附带课程课件资料+课件笔记）图像处理|深度学习人工智能计算机视觉python+AI](https://www.bilibili.com/video/BV1PV411774y?p=9&spm_id_from=pageDriver&vd_source=f7fc0a964268b45e70067d58c7c397fc)

2. [极棒的数字图像处理入门到进阶教程：Python OpenCV实战数图](https://www.bilibili.com/video/BV1YA411K7pp?spm_id_from=333.337.search-card.all.click&vd_source=f7fc0a964268b45e70067d58c7c397fc)
3. [最全面的 OpenCV 笔记](https://github.com/AccumulateMore/OpenCV)