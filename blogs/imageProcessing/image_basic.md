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

8. 

### 参考资料

1. [【2022B站最好的OpenCV课程推荐】OpenCV从入门到实战 全套课程（附带课程课件资料+课件笔记）图像处理|深度学习人工智能计算机视觉python+AI](https://www.bilibili.com/video/BV1PV411774y?p=9&spm_id_from=pageDriver&vd_source=f7fc0a964268b45e70067d58c7c397fc)

2. [极棒的数字图像处理入门到进阶教程：Python OpenCV实战数图](https://www.bilibili.com/video/BV1YA411K7pp?spm_id_from=333.337.search-card.all.click&vd_source=f7fc0a964268b45e70067d58c7c397fc)
3. [最全面的 OpenCV 笔记](https://github.com/AccumulateMore/OpenCV)