---
title: openCV库的学习笔记
date: 2022-09-03
tags:
 - openCV
categories:
 -  Python
---
## openCV-python库的使用

#### 库的导入

```python
# 库的导入
import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
```

#### 数据类型宏定义

```python
# 数据类型宏定义
S = 有符号整型 U = 无符号整型 F = 浮点型

CV_8U - 8位无符号整数（0…255）
CV_8S - 8位有符号整数（-128…127）
CV_16U - 16位无符号整数（0…65535）
CV_16S - 16位有符号整数（-32768…32767）
CV_32S - 32位有符号整数（-2147483648…2147483647）
CV_32F - 32位浮点数（-FLT_MAX…FLT_MAX，INF，NAN）
CV_64F - 64位浮点数（-DBL_MAX…DBL_MAX，INF，NAN）

而C1、C2、C3是什么意思呢？
这里的1、2、3代表的是通道数，比如RGB就是3通道，颜色表示最大为255,所以可以用CV_8UC3这个数据类型来表示;灰度图就是C1，只有一个通道；而带alpha通道的PNG图像就是C4，是4通道图片。
参考：<https://blog.csdn.net/ai_faker/article/details/118183702>
```

#### 图片读取

```python
# 读取图片，以BGR格式存储
cv.imread(path，[0/cv.IMREAD_GRAYSCALE]) # 为0则读取为灰度图
```

#### 图片保存

```python
# 写入图片
cv.imwrite(path,obj)
```

#### 图片显示

```python
# 显示图片
cv.imshow('windowsname',obj)
cv.waitKey(0) #等待按键响应，为0则一直等待,否则该窗口会很快关掉
cv.destroyAllWindows()/cv.destroyWindow('windowsname') # 关闭图像窗口
```

#### 视频读取

```python
# 读取视频
vedio = cv.VideoCapture(‘path’)

#检查是否打开正确
if vedio.isOpened():
    open,frame = vedio.read() 
    #vedio.read()返回是否正常打开以及当前帧，循环执行可一直读取后面的帧 
else:
    open = False

while open:
    ret,frame = vedio.read()
    if frame is None:
        break
    if ret == True:
        # 以灰度图显示
        video_gray = cv.cvtColor(frame,cv.COLOR_BGR2GRAY)
        cv.imshow('img_gray',video_gray)
        # 设置1s播放25帧
        cv.waitKey(40)
        if 0xFF == 27:# 按下Esc键则退出
            break
vedio.release() # 释放vedio的内存
cv.destroyAllWindows()# 关闭所有窗口
```

#### 图片边界填充

```python
#边界填充

# 填充多少区域
top_size,bottom_size,left_size,right_size = (50,50,50,50)  

# 最后一个入口参数为填充方式

# 方式一：复制法，复制最边缘像素
replicate = cv.copyMakeBorder(img,top_size,bottom_size,left_size,right_size,cv.BORDER_REPLICATE) 
# 方式二：反射法，对感兴趣的图像中的像素在两边进行复制例如：fedcba|abcdefgh|hgfedcb
reflect = cv.copyMakeBorder(img,top_size,bottom_size,left_size,right_size,cv.BORDER_REFLECT)
# 方式三：反射法，也就是以最边缘像素为轴，对称，gfedcb|abcdefgh|gfedcba
reflect101 = cv.copyMakeBorder(img,top_size,bottom_size,left_size,right_size,cv.BORDER_REFLECT_101)      
# 方式四：外包装法cdefgh|abcdefgh|abcdefg
wrap = cv.copyMakeBorder(img,top_size,bottom_size,left_size,right_size,cv.BORDER_WRAP)
# 方式五：常量法，常数值填充
constant = cv.copyMakeBorder(img,top_size,bottom_size,left_size,right_size,cv.BORDER_CONSTANT,value=0)
```

![各填充法对比](http://imagebed.krins.cloud/api/image/D0T2B28R.png#pic_center)

#### 修改图片大小

```python
# 修改图片大小
cv.resize(img,(width,height),fx,fy,interpolation) # 注意先输入列数再输入行数
cv.resize(img,(0,0),fx=alpha,fy=beta) # 横向拉伸alpha倍，纵向拉伸beta倍
"interpolation":
    "INTER_NEAREST":最近邻插值
    "INTER_LINEAR":双线性插值（默认）
    "INTER_AREA":使用像素区域关系重采样
    "INTER_CUBIC":4*4邻域的双三次插值
    "INTER_LANCZOS4":8*8邻域的Lanczos插值
```

#### 图像二值化

```python
# 设置图像阈值
# ret, dst = cv.threshold(src, thresh, maxval, type)

# src： 输入图，只能输入单通道图像，通常来说为灰度图
# thresh： 阈值
# dst： 输出图
# ret： 设置阈值
# maxval： 当像素值超过了阈值 ( 或者小于阈值，根据 type 来决定 )，所赋予的值
# type：二值化操作的类型，包含以下5种类型：
# cv2.THRESH_BINARY          超过阈值部分取maxval ( 最大值 )，否则取0
# cv2.THRESH_BINARY_INV      THRESH_BINARY的反转
# cv2.THRESH_TRUNC           大于阈值部分设为阈值，否则不变
# cv2.THRESH_TOZERO          大于阈值部分不改变，否则设为0
# cv2.THRESH_TOZERO_INV      THRESH_TOZERO的反转
```

![image-20220904095126260](http://imagebed.krins.cloud/api/image/8HNP8ND8.png#pic_center)

#### 图像滤波

```python
# 图像滤波

# 均值滤波
# 简单的平均卷积操作，方框中的值相加，取平均
blur = cv2.blur(img,(3,3)) # (3,3) 为核的大小，通常情况核都是奇数 3、5、7

# 方框滤波
# 选择归一化后基本和均值滤波一样。不归一化则卷积完不做平均，越界则强设为255，容易过曝
# 在 Python 中 -1 表示自适应填充对应的值，这里的 -1 表示与颜色通道数自适应一样
box = cv2.boxFilter(img,-1,(3,3),normalize=True) 
# 方框滤波如果做归一化，得到的结果和均值滤波一模一样

# 高斯滤波
# 用满足高斯分布的值作为卷积核的数
# 离中心值越近的，它的权重越大，离中心值越远的，它的权重越小。
# 1指卷积核数值高斯分布的标准差取1
aussian = cv2.GaussianBlur(img,(5,5),1)

# 中值滤波
# 取当前像素点机周围像素点排序后拿中值替代中间元素值的大小
median = cv2.medianBlur(img,5) # ksize为卷积核大小，必须为比1大的奇数
```

#### 形态学处理

```python
# 形态学处理

# 图像腐蚀
# 通常是拿二值图像做腐蚀操作，去掉一些小毛刺
# 只要框里有黑色，中心点的值就变为黑色，即原来的白色被黑色腐蚀掉
# kernel是卷积核，iteration是迭代次数
kernel = np.ones((5,5),np.uint8)
erosion = cv.erode(img,kernel,iterations=1)

# 图像膨胀
# 图像腐蚀的逆操作
# 先腐蚀 后膨胀，简单修复腐蚀造成的损害
kernel = np.ones((5,5),np.uint8)
erosion = cv.dilate(img,kernel,iterations=1)

# 开运算：先腐蚀再膨胀
kernel = np.ones((5,5),np.uint8)
opening = cv.morphologyEx(img,cv.MORPH_OPEN,kernel)

# 闭运算：先膨胀后腐蚀
kernel = np.ones((5,5),np.unit8)
closing = cv.morphologyEx(img,cv.MORPH_CLOSE,kernel)

# 梯度运算：膨胀-腐蚀
# 获取图像的边界信息
kernel = np.ones((5,5),np.unit8)
gradient = cv.morphologyEx(img,cv.MORPH_GRADIENT,kernel)

# 礼帽：原始输入-开运算结果
# 获取毛刺部分
kernel = np.ones((5,5),np.unit8)
tophat = cv.morphologyEx(img,cv.MORPH_TOPHAT,kernel)

# 黑帽：闭运算-原始输入
# 获取图像轮廓
kernel = np.ones((5,5),np.unit8)
blackhat = cv.morphologyEx(img,cv.MORPH_BLACKHAT,kernel)
```

#### 图像梯度

```python
# Sobel算子
cv2.Sobel(src, ddepth, dx, dy, ksize)
# 返回Sobel算子处理后的图像
# ddepth：图像的深度
# dx 和 dy 分别表示水平和竖直方向
# ksize 是 Sobel 算子的大小

sobelx = cv.Sobel(img,cv.CV_64F,1,0,ksize=3) 
# 1,0 表示只算水平方向梯度
# 用cv.CV_64F表示图像深度为1的同时，将图像转为浮点数，避免返回值将负数截断为0
# 白到黑是正数，黑到白是负数了，所有的负数不作处理会被截断成 0，所以要取绝对值
sobelx = cv.convertScaleAbs(sobelx) 

# 不建议一起计算dx、dy,容易出现重影
sobelxy = cv2.Sobel(img,cv2.CV_64F,1,1,ksize=3)
sobelxy = cv2.convertScaleAbs(sobelxy)

# 可以分别计算dx和dy后，再求和
sobelxy = cv2.addWeighted(sobelx,0.5,sobely,0.5,0)

# Scharr算子
cv.Scharr(src, ddepth, dx, dy, ksize)
# 加大了边缘的权重，对纹理的识别更敏感一些
# 整体使用和Sobel算子差不多，没有ksize这个参数

# Laplacian算子
cv.Laplacian(img,ddepth)
# 直接与邻近值比较，没有dx，dy的选项
# 对噪音点更敏感，与其他方法配合使用
# 如果中心点是边界，它与周围像素点差异的幅度会较大，Laplacian算子根据此特点可以把边界识别出来
```

Sobel算子

![尺寸为3的Sobel算子](http://imagebed.krins.cloud/api/image/ND4XBDR8.png#pic_center)

Scharr算子

![Scharr算子](http://imagebed.krins.cloud/api/image/2PTTP0T2.png)

Laplacian算子

![Laplacian算子](http://imagebed.krins.cloud/api/image/TN8X4ZH2.png#pic_center)

各算子效果对比

![三种算子边缘识别效果对比](http://imagebed.krins.cloud/api/image/HPXZ0BD0.png#pic_center)

#### canny边缘检测

```python
# canny边缘检测
cv.Canny(img,minVal,maxVal)
# 阈值整体设的小，检测出的边缘更细致
# 阈值整体设的大，检测出的边缘更干净
```

#### 图像重采样

```python
# 上采样
# 尺寸变大但分辨率不会提升
cv.pyrUp(img, dstsize=None, borderType=None)
# dstsize：表示输出图像的大小
# borderType：表示图像边界的处理方式

# 下采样
# 操作一次一个 MxN 的图像就变成了一个 M/2xN/2 的图像
cv.pyrDown(img, dstsize=None, borderType=None)
```

#### 轮廓检测

```python
# 轮廓检测

cv.findContours(img,mode,method)
# mode：轮廓检索模式
# RETR_EXTERNAL ：只检索最外面的轮廓。
# RETR_LIST：检索所有的轮廓，并将其保存到一条链表当中。
# RETR_CCOMP：检索所有的轮廓，并将他们组织为两层：顶层是各部分的外部边界，第二层是空洞的边界。
# RETR_TREE：检索所有的轮廓，并重构嵌套轮廓的整个层次。( 最常用 )

#method：轮廓逼近方法
# CHAIN_APPROX_NONE：以Freeman链码的方式输出整个轮廓
# CHAIN_APPROX_SIMPLE：只保留每条线的终点部分

#为了更高的准确度，把图像转为二值图
img = cv.imread('PATH')
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
ret, thresh = cv.threshold(gray, 127, 255, cv.THRESH_BINARY)

# 检测轮廓
contours, hierarchy = cv.findContours(thresh,cv.RETR_TREE, cv.CHAIN_APPOX_NONE)
# contours返回轮廓点信息
# hierarchy返回轮廓层级结构

# 绘制轮廓
# 若不用拷贝后的，而是用原图画轮廓，则画轮廓图绘把原始的输入图像重写，覆盖掉
# 传入参数：绘制图像、轮廓信息、轮廓索引(-1则自适应，画所有轮廓)，线条颜色(BGR模式)，线条厚度
draw_img = img.copy()
res = cv.drawContours(draw_img, contours, -1, (0,0,255), 2)

# 轮廓特征提取
cnt = contours[0] # 通过轮廓索引，拿到该索引对应的轮廓特征
print(cv.contourArea(cnt)) # 打印该轮廓的面积
print(cv.arcLength(cnt,True)) # 打印该轮廓的周长，True表示闭合的

# 轮廓近似
# 正常轮廓展示是最右边的图，但是当我们需要轮廓没有那么不规则，而是想要轮廓近似成规则的形状，这就叫轮廓近似，近似成下图中中间图像的轮廓。
# 一条呈抛物线的曲线的端点为 A、B 两点，取曲线上到直线 AB 距离最大的点，该点为 C 点，若 C 点到直线的距离小于设置的阈值，则可以把直线 AB 当做曲线的近似，若 C 点到直线的距离大于设置的阈值，那么曲线不能用直线 AB 来近似，而 AC 曲线可能用 AC 直线来代替、BC曲线可能用 BC 直线来代替。再通过阈值来判断是否可以代替。
epsilon = 0.1 * cv.arcLength(cnt,True) # 周长的百分比，这里用 0.1 的周长作阈值
approx = cv.approxPolyDP(cnt,epsilon,True) # 第二个参数为阈值
draw_img = img.copy()
res = cv.drawContours(draw_img,[approx],-1,(0,0,255),2)

# 绘制轮廓外接矩形
x,y,w,h = cv.boundingRect(cnt) # 得到矩形四个坐标点的相关信息
img = cv.rectangle(img,(x,y),(x+w,y+h),(0,255),2)# 用对角坐标绘制矩形

# 绘制轮廓外接圆
draw_img = img.copy()
(x,y),redius = cv.minEnclosingCircle(cnt) # 得到外接圆圆心和半径
# 将数据转为整数
center = (int(x),int(y))
redius = int(redius)
img = cv.circle(draw_img,center,redius,(0,255,0),2)# 绘制圆
```

轮廓是否近似对比

![轮廓近似示意](http://imagebed.krins.cloud/api/image/N20LLPJ8.png#pic_center)

轮廓近似示意图

![轮廓近似阈值示意](http://imagebed.krins.cloud/api/image/0RRB0V6X.png#pic_center)

#### 图像匹配

```python
# 模板匹配
dct = cv.matchTemplate(img,template,methods)
# 计算A图每个区域与B图(模板)的相关性
# 模板在原图像上从原点开始滑动，计算模板与（图像被模板覆盖的地方）的差别程度(例如值127与值190的区别)，这个差别程度的计算方法在opencv里有6种，然后将每次计算的结果放入一个矩阵里，作为结果输出。
# 假如原图形是AxB大小，而模板是axb大小，则输出结果的矩阵是(A-a+1)x(B-b+1)。

# 模板匹配计算方式6种方式 ( 用归一化后的方式更好一些 )：

# TM_SQDIFF：计算平方不同，计算出来的值越小，越相关。
# TM_CCORR：计算相关性，计算出来的值越大，越相关。
# TM_CCOEFF：计算相关系数，计算出来的值越大，越相关。
# TM_SQDIFF_NORMED：计算归一化平方不同，计算出来的值越接近0，越相关。
# TM_CCORR_NORMED：计算归一化相关性，计算出来的值越接近1，越相关。
# TM_CCOEFF_NORMED：计算归一化相关系数，计算出来的值越接近1，越相关。
# 具体公式链接：https://docs.opencv.org/3.3.1/df/dfb/group__imgproc__object.html#ga3a7850640f1fe1f58fe91a2d7583695d

min_val, max_val, min_loc, max_loc = cv.minMaxLoc(img)
# 寻找图像最大最小值及其坐标

h, w = template.shape[:2] # 获得模板的宽和高
methods = ['cv.TM_CCOEFF','cv.TM_CCOEFF_NORMED','cv.TM_CCORR',      'cv.TM_CCORR_NORMED','cv.TM_SQDIFF','cv.TM_SQDIFF_NORMED']
#匹配单个对象
for meth in methods:
    img2 = img.copy()
    # 匹配方法的真值
    method = eval(meth) # 提取字符串中的内容，不能用字符串的形式
    print(method)
    res = cv.matchTemplate(img,template,method)
    min_val, max_val, min_loc, max_loc = cv.minMaxLoc(res)
    
    # 如果是平方差匹配 TM_SQDIFF 或归一化平方差匹配 TM_SQDIFF_NORMED,取最小值
    if method in [cv.TM_SQDIFF,cv.TM_SQDIFF_NORMED]:
        top_left = min_loc
    else:
        top_left = max_loc
    bottom_right = (top_left[0]+w,top_left[1]+h)
    
    # 画矩形
    cv2.rectangle(img2,top_left,bottom_right,(0,0,255),2)
    
    plt.subplot(121), plt.imshow(res, cmap='gray')
    plt.xticks([]), plt.yticks([]) # 隐藏坐标轴
    plt.subplot(122),plt.imshow(img2,cmap='gray')
    plt.xticks([]),plt.yticks([])
    plt.suptitle(meth)
    plt.show()
    
# 匹配多个对象
res = cv.matchTemplate(img_gray, template, cv.TM_CCOEFF_NORMED) # res 是返回每一个小块窗口得到的结果值,选用相关系数方式进行匹配
threshold = 0.8 #设置匹配度阈值为0.8，大于0.8的认为匹配成功
# 取匹配程度大于 80% 的坐标
loc = np.where(res >= threshold) # np.where 使得返回 res 矩阵中值大于 0.8 的索引，即坐标
img_rgb = img.copy()
i = 0
# zip函数为打包为元组的列表，例 a = [1,2,3] b = [4,5,6] zip(a,b) 为 [(1, 4), (2, 5), (3, 6)]    
for pt in zip(*loc[::-1]): # 当用 *b 作为传入参数时, b 可以为列表、元组、集合，zip使得元组中两个 numpy.array 进行配对   
    bottom_right = (pt[0] + w, pt[1] + h)
    cv.rectangle(img_rgb, pt, bottom_right, (0,0,255),2)
    i = i + 1

cv.imshow('img_rgb',img_rgb)
cv.waitKey(0)
```

各匹配方法对比

![各方法单个对象匹配效果](http://imagebed.krins.cloud/api/image/608N0B20.png)

单图匹配多个模板效果

![匹配多个对象效果](http://imagebed.krins.cloud/api/image/8DLN6080.png)

#### 图像直方图

``` python
# 图像直方图
cv.calcHist(img,channels,mask,histSize,ranges)
# images：原图像的图像格式为 uint8 或 ﬂoat32。当传入函数时应该用中括号 [] 括来传入，例如[img]
# channels：同样用中括号来传入，它会告诉函数统幅的哪幅灰度图的直方图。如果传入的图像是灰度图它的值就是 [0]，如果是彩色图像，那么传入的参数可以是 [0]、[1]、[2]，它们分别对应着 B、G、R 通道，每个通道的图像都是灰度图。
# mask：掩模图像。统计整幅图像的直方图时就把它设为 None。但是如果你想统计图像的某一部分区域的直方图的，你就制作一个掩模图像并使用它。
# histSize：BIN 的数目。也应用中括号括起来。
# ranges: 统计的像素值范围，常为 [0-256]。

# 对于灰度图可以直接用pyplot的hist函数
img = cv.imread('PATH',0) # 0 表示灰度图
plt.hist(img.ravel(),bins=256) # img.ravel()将 img 拉成一维数组
plt.show()

# 查看彩色图像各通道的直方图
img = cv.imread('PATH')
color = ['b','g','r']
for i,col in enumerate(color):
    # enumerate() 函数用于将一个可遍历的数据对象(如列表、元组或字符串)组合为一个索引序列，同时列出数据和数据下标，一般用在 for 循环当中。
    histr = cv.calcHist([img],[i],None,[256],[0,256])
    plt.plot(histr,color=col)
    plt.xlim([0,256])
    
# 创建掩膜
mask = np.zeros(img.shape[:2],np.uint8)
mask[100:300,100:400] = 255
# 掩膜与原图进行与操作
masked_img = cv.bitwise_and(img,img,mask = mask)
hist_mask = cv.calcHist([img],mask,[256],[0,256])

# 直方图均衡化
# 直方图均衡化：一般可以用来提升图片的色彩和亮度
# 直方图均衡前是一个瘦高的统计图，直方图均衡后是一个矮胖的统计图
equ = cv.equalizeHist(img)

# 自适应直方图均衡化
# 可能由于直方图均衡导致丢失一些细节。所以可能切分成几个小块，局部做直方图均衡化，会比较好。
# 切分成几个小块之后，可能会导致一个现象，每个格子都会产生一个边界，opencv是对每个格子的边界进行线性插值处理。
cv.createCLAHE(clipLimit,tileGridSize)
# clipLimit 颜色对比度的阈值。
# titleGridSize 进行像素均衡化的网格大小，即在多少网格下进行直方图的均衡化操作。
clahe = cv.createCLAHE(clipLimit=2.0,tileGridSize=(8,8))# 生成自适应均衡化方法
img_clahe = clahe.apply(img)# 将方法应用到图像
# 该函数一次只能处理一个通道，要处理彩色图像需先拆开分别处理再合并
```

![灰度图的直方图](http://imagebed.krins.cloud/api/image/BF0D02TD.png)

![彩色图的直方图](http://imagebed.krins.cloud/api/image/644XLJD2.png)

![直方图均衡化](http://imagebed.krins.cloud/api/image/NTD6B0X8.png)

#### 图像傅里叶变换

```python
# 图像傅里叶变换

# 频谱图上的点和原图像上的点并不是一一对应的关系，频谱图上的每个点都代表了原图像的全局信息，频谱图上的点反映的是原图像中具有该灰度变化快慢规律的图像区域(可能不止一个)及其灰度峰值（亮暗）信息。

# 高频：变化剧烈的分量，增强高频使细节更明显
# 低频：变化缓慢的分量，增强低频使边界模糊

# opencv 中主要就是 cv2.dft() 执行傅里叶变换到频域中 和 cv2.idft() 执行逆傅里叶变换，输入图像需要先转换成 np.float32 格式。
# 得到的结果中频率为 0 的部分会在左上角，通常要转换到中心位置，可以通过 shift 变换来实现。
# cv2.dft() 返回的结果是双通道的 ( 实部，虚部 )，通常还需要转换成图像格式才能展示(0,255)像素值。

img_float = np.float32(img)
dft = cv.dft(img_float, flags = cv.DFT_COMPLEX_OUTPUT)# 输出两个通道，分别为实部和虚部
dft_shift = np.fft.fftshift(dft)
magnitude_spectrum = 20 * np.log(cv.magnitude(dft_shift[:,:,0],dft_shift[:,:,1]))
#cv.magnitude用来计算二维矢量的幅值，相当于求模，取20倍log进行缩小

rows,cols = img.shape
crow,ccol = int(rows/2),int(cols/2) # 获得图像中心位置方便制作滤波器

# 高通滤波
mask = np.ones((rows,cols,2),np.uint8)
mask[crow-30:crow+30,ccol-30:ccol+30] = 0 #低频部分置0，去除掉

# IDFT 
# 滤波后将频谱移回原来的位置后逆傅里叶变换，得到的还是实部和虚部，再次求模
hp_shift = dft_shift * mask
hp_ishift = np.fft.ifftshift(hp_shift)
img_back = cv.idft(hp_ishift)
img_back = cv.magnitude(img_back[:,:,0],[:,:,1])

# 高通滤波后也能获得轮廓信息
```

![高通滤波](http://imagebed.krins.cloud/api/image/JPH2468F.png#pic_center)

#### 图像透视变换

```python
M = cv.getPerspectiveTransform(coordinate_origin, coordinate_new)
# 获得变换矩阵
# coordinate_origin：原图坐标
# coordinate_new：新图坐标
img_new = cv.warpPerspective(src,M,dsize=(width,height),flags=INTER_LINEAR,borderMode=BORDER_CONSTANT,borderValue=None)
# dsize为必要项，若设置的比转换后的图小，会从转换后的图左上角开始裁切
```



#### 项目1：简单数字识别

```python
# 简单数字OCR
# 需要提前准备好数字匹配的模板
template = cv.imread('PATH',0)
template_binary = cv.threshold(template,0,255,cv.THRESH_BINARY_INV)[1] # 将模板转为二值图像

# 将模板中的数字抠出来
refCnts,hierarchy = cv.findContours(template_binary.copy(),cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE) # 边缘检测，只检测外边缘，只保留边缘终点值
boundingBoxes = [cv.boundingRect(c) for c in refCnts] 
(refCnts,boundingBoxes) = zip(*sorted(zip(refCnts,boundingBoxes),key=lambda b:b[1][0]))
# 将每个轮廓从左到右编上序号

# 将数字与序号对应上
dict_num={}
for (i,c) in enumerate(boundingBoxes):
    (x,y,w,h) = cv.boundingRect(c) # 获得各轮廓的起点以及宽高
    roi = ref[y:y+h,x:x+w]
    roi = cv.resize(roi,(58,88)) # 将图像调整到合适大小
    dict_num[i] = roi

# 设置卷积核
rectKernel = cv.getStructuringElement(cv.MORPH_RECT,(9,3))
sqKernel = cv.getStructuringElement(cv.MORPH_RECT,(5,5))
# cv.getStructuringElement还可以生成椭圆形(cv.MORPH_ELLIPSE)或十字形(cv.MORPH_CROSS)的卷积核

img = cv.imread('PATH',0) # 读取OCR图像

tophat = cv.morphologyEx(img,cv.MORPH_TOPHAT,rectKernal)# 用礼帽操作突出图像更亮的区域
#计算图像梯度并归一化进行边缘检测
gradX = cv.Sobel(tophat,ddepth=cv.CV_32F,dx=1,dy=0,ksize=3)
gradX = np.absolute(gradX)
minVal,maxVal = np.min(gradX),np.max(gradX)
gradX = 255 * ((gradX - minVal) / (maxVal - minVal))
gradY = cv.Sobel(tophat,ddepth=cv.CV_32F,dx=0,dy=1,ksize=3)
gradY = np.absolute(gradY)
minVal,maxVal = np.min(gradY),np.max(gradY)
gradY = 255 * ((gradY - minVal) / (maxVal - minVal))
gradXY = cv.addWeighted(gradX,0.5,gradY,0.5,0)
gradXY = np.uint8(gradXY)
# 闭操作（先膨胀，再腐蚀），将要识别的数字区域连在一起
img_close = cv.morphologyEx(gradXY,cv.MORPH_CLOSE,rectKernel)
# THRESH_OTSU会自动寻找合适的阈值，适合双峰型图像，需把阈值参数设为0
gradXY_thresh = cv.threshold(gradXY,0,255,cv.THRESH_OTSU)[1]
# 再做一次闭操作把区域内的东西涂掉
img_close = cv.morpholohyEx(gradXY_thresh,cv.MORPH_CLOSE,rectKernel)
# 计算轮廓
imgCnts,hierarchy = cv.findContours(img_close.copy(),cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE)

cur_img = img.copy()
cv.drawContours(cur_img,imgCnts,-1,(0,0,255),2)

# 遍历轮廓，把无关轮廓清掉
locs=[]
for (i,c) in enumerate(imgCnts):
    (x,y,w,h) = cv.boundingRect(c)
    r = w / h
    if r > 2.5 and r < 4:
        if (w > 40 and w <55) and (h > 10 and h < 20)
        	locs.append((x,y,w,h)) # 符合条件的留下
locs = sorted(locs,key=lambda x:x[0]) # 将轮廓从左到右排序

# 开始OCR
output = []
# 提取每个框
for (i,(Gx,Gy,Gw,Gh)) in enumerate(locs):
    groupOutput = []
    detect = img[Gy-5：Gy+Gh+5,Gx-5:Gx+Gw+5] # 提取每组数据
    detect = cv.threshold(detect,0,255,cv.THRESH_OTSU)[1]
    detectCnts,hierarchy = cv.findContours(detect.copy(),cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE)
    boundingBoxes_detect = [cv.boundingRect(c) for c in detectCnts]
    (detectCnts,boundingBoxes_detect) = zip(*sorted(zip(detectCnts,boundingBoxes_detect),key = lambda x :x[1][0]))
    # 匹配每个框内的数字
    for c in detectCnts:
        (x,y,w,h) = cv.boundingRect(c)
        roi = detect[y:y+h,x:x+w]
        roi = cv.resize(roi,(57,88))
        # 将数字与模板一一匹配找到匹配度最高的
        scores = []
        for(num,num_ROI) in dict_num.item():
            res = cv.matchTemplate(roi,num_ROI,cv.TM_CCOEFF_NORMED)
            # scores[num] = max(res)
            (_,score,_,_) = cv.minMaxLoc(res)
            scores.append(score)
        groupOutput.append[str(np.argmax(scores))]
    
    cv.rectangle(img,(Gx-5,Gy-5),(Gx+Gw+5,Gy+Gh+5),(0,0,255),2)
    cv.putText(img,"".join(groupOutput),(Gx,Gy-15),cv.FONT_HERSHEY_SIMPLEX,0.65,(0,0,255),2)
    # cv.putText(img,text,origin(leftBottomCorner),fontFace,fontScale,color,thickness[,lineType=None])
    output.extend(groupOutput)#用extend将结果合并到output的末尾
```

读取模板图像

![模板](http://imagebed.krins.cloud/api/image/6J22D28L.png)

图像二值化

![模板二值化方便轮廓检测](http://imagebed.krins.cloud/api/image/NB46404L.png)

检测轮廓

![模板外轮廓](http://imagebed.krins.cloud/api/image/2HL42BN0.png)

读取识别图像

![检测图像](http://imagebed.krins.cloud/api/image/VFTNL682.png)

将灰度图用礼帽操作简单提亮一下数字

![礼帽操作提亮](http://imagebed.krins.cloud/api/image/RDZ8T648.png)

计算梯度（图片是只算了X梯度）

![计算梯度检测边缘](http://imagebed.krins.cloud/api/image/40PPRLNF.png)

闭操作将数字连在一起

![闭操作使数字连在一起](http://imagebed.krins.cloud/api/image/DVDD6026.png)

二值化后再次闭操作将区域内的黑点涂掉

![二值化后再次闭操作把区域内东西涂掉](http://imagebed.krins.cloud/api/image/N08D222H.png)

检测图像的轮廓

![检测到的轮廓](http://imagebed.krins.cloud/api/image/LTB6B68D.png)

剃掉不识别的区域后逐个识别

![OCR结果](http://imagebed.krins.cloud/api/image/FVVX0BB4.png)

#### 项目2：复杂OCR

1. 图像预处理
2. 边缘检测
3. 轮廓检测
4. 轮廓近似
5. 透视变换
6. OCR识别
7. 展示结果

```python
import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
import pytesseract


def plt_show(image):
    if image.ndim == 2:
        plt.imshow(image, cmap='gray')
    else:
        plt.imshow(cv.cvtColor(image, cv.COLOR_BGR2RGB))
    plt.show()


def cv_show(image):
    cv.imshow("img", image)
    cv.waitKey(0)
    cv.destroyAllWindows()


# 将页面四个点从左上顺时针排序
# 每个坐标求和，最小为左上，最大为右下
# 每个坐标求差，最小为右上，最大为左下
def orderPoints(cnts):
    rect = np.zeros((4, 2), np.float32)
    s = (screenCnt.sum(axis=1)).sum(axis=1)
    rect[0] = cnts[np.argmin(s)]
    rect[2] = cnts[np.argmax(s)]
    d = np.diff(cnts)
    rect[1] = cnts[np.argmin(d)]
    rect[3] = cnts[np.argmax(d)]
    return rect


# 透视变换函数
def perspectiveTransform(img, cnts):
    # 获取要变换的坐标
    (tl, tr, br, bl) = cnts

    # 计算输入的w和h
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))

    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))

    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]
    ], dtype='float32')

    # 计算变换矩阵
    M = cv.getPerspectiveTransform(cnts, dst)
    warped = cv.warpPerspective(img, M, (maxWidth, maxHeight))

    return warped


img = cv.imread('./test.jpg')

# 变形
origin = img.copy()
h, w = img.shape[0], img.shape[1]
height = 500
ratio = h / height
img_re = cv.resize(origin, (int(w / ratio), height), interpolation=cv.INTER_AREA)  # 等比例放缩
cv_show(img_re)

# 计算梯度方便检测边缘
img_gray = cv.cvtColor(img_re, cv.COLOR_BGR2GRAY)
b, g, r = cv.split(img_re)
img_gray = b  # 经过测试，灰度图纸张边缘梯度不明显，换成蓝色通道效果最好

# 经过测试，在梯度不明显情况下，Scharr比Sobel捕捉边缘效果更好
scharrX = cv.Scharr(img_gray, cv.CV_64F, 1, 0)
scharrX = cv.convertScaleAbs(scharrX)
scharrY = cv.Scharr(img_gray, cv.CV_64F, 0, 1)
scharrY = cv.convertScaleAbs(scharrY)
img_gray = cv.addWeighted(scharrX, 0.5, scharrY, 0.5, 0)
cv_show(img_gray)

# 滤波，将一些细碎的梯度滤掉，中值滤波比box效果好
img_gray = cv.medianBlur(img_gray, 3)
cv_show(img_gray)

# 检测边缘
img_edged = cv.Canny(img_gray, 150, 250)
cv_show(img_edged)

# 检测轮廓
imgCnts, hierarchy = cv.findContours(img_edged, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE)
# 将轮廓按面积排序，方便定位要OCR的页面
imgCnts = sorted(imgCnts, key=cv.contourArea, reverse=True)[:10]
img_re_cp = img_re.copy()
cv.drawContours(img_re_cp, imgCnts, -1, (0, 0, 255), 2)
cv_show(img_re_cp)

# 将轮廓近似，能近似成四点的即为要定位的页面
for (i, c) in enumerate(imgCnts):
    # area = cv.contourArea(c)
    # print(i,area)
    peri = cv.arcLength(c, False)
    # print(i,peri)
    approx = cv.approxPolyDP(c, 0.02 * peri, True)
    if len(approx) == 4:
        screenCnt = approx
        break
    else:
        screenCnt = imgCnts[0]
# print("screenCnt:",screenCnt,"\r\n","shape:",screenCnt.shape)

# 绘制找到的轮廓
# 之前找轮廓只保留了边角点，用[]括起来可以使轮廓按顺序连接
cv.drawContours(img_re, [screenCnt], -1, (0, 0, 255), 2)
cv_show(img_re)

# 透视变换
screenCnt = orderPoints(screenCnt)
warped = perspectiveTransform(origin, screenCnt * ratio)
plt_show(warped)

# # 二值处理
warped = cv.cvtColor(warped, cv.COLOR_BGR2GRAY)
warped = cv.threshold(warped, 100, 255, cv.THRESH_BINARY)[1]

# OCR识别
text = pytesseract.image_to_string(warped)
print(text)

```

放缩后图像

![放缩后图像](http://imagebed.krins.cloud/api/image/N8FHDZ28.png)

Scharr算子计算梯度

![计算梯度](http://imagebed.krins.cloud/api/image/8600XZ00.png)

检测边缘

![检测边缘](http://imagebed.krins.cloud/api/image/L8TXT48Z.png)

![绘制面积前10大的轮廓](http://imagebed.krins.cloud/api/image/JX4BZ62Z.png)

检测要识别的区域

![要识别的区域](http://imagebed.krins.cloud/api/image/0XXDJPPV.png)

透视变换效果

![透视变换](http://imagebed.krins.cloud/api/image/JJJ60F02.png)

文字识别效果部分展示

```text
1-7281-6212-6/20/$3 1.06 ©2020 [EFF | DOF 10.1199/1ROS45743 2020.9341117
2020 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) | 978
2020 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)
October 25-29, 2020, Las Vegas, NV, USA (Virtual)
An Approach to Reduce Communication for Multi-agent Mapping
Applications
Michael E. Kepler! and Daniel J. Stilwell?
Abstract— In the context of a multi-agent system that uses a
Gaussian process to estimate a spatial field of interest, we pro-
pose an approach that enables an agent to reduce the amount of
data it shares with other agents. The main idea of the strategy
is to rigorously assign a novelty metric to each measurement
as it is collected, and only measurements that are sufficiently
novel are communicated. We consider the ideal scenario where
an agent can instantly share novel measurements, and we also
consider the more practical scenario in which communication
suffers from low bandwidth and is range-limited. For this
scenario, an agent can only broadcast an informative subset
of the novel measurements when the agent encounters other
agents. We explore three different informative criteria for
subset selection, namely entropy, mutual information, and a new
criterion that reflects the value of a measurement. We apply
our approach to three real-world datasets relevant to robotic
mapping. The empirical findings show that an agent can reduce
the amount of communicated measurements by two orders of
magnitude and that the new criterion for subset selection yields
superior predictive performance relative to entropy and mutual
information.
```



### 参考资料

1. [【2022B站最好的OpenCV课程推荐】OpenCV从入门到实战 全套课程（附带课程课件资料+课件笔记）图像处理|深度学习人工智能计算机视觉python+AI](https://www.bilibili.com/video/BV1PV411774y?p=9&spm_id_from=pageDriver&vd_source=f7fc0a964268b45e70067d58c7c397fc)

2. [最全面的 OpenCV 笔记](https://github.com/AccumulateMore/OpenCV)
