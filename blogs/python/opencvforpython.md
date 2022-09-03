---
title: openCV库的学习笔记
date: 2022-09-03
tags:
 - openCV
categories:
 -  Python
---
## openCV-python库的使用

```python
# 库的导入
import cv2 as cv
```

```python
# 读取图片，以BGR格式存储
cv.imread(path，[0/cv.IMREAD_GRAYSCALE]) # 为0则读取为灰度图
```

```python
# 写入图片
cv.imwrite(path,obj)
```

```python
# 显示图片
cv.imshow('windowsname',obj)
cv.waitKey(0) #等待按键响应，为0则一直等待,否则该窗口会很快关掉
cv.destroyAllWindows()/cv.destroyWindow('windowsname') # 关闭图像窗口
```

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

```python
# 修改图片大小
cv.resize(img,(n,m)) # 注意先输入列数再输入行数
cv.resize(img,(0,0),fx=alpha,fy=beta) # 横向拉伸alpha倍，纵向拉伸beta倍
```

### 参考资料

1. [【2022B站最好的OpenCV课程推荐】OpenCV从入门到实战 全套课程（附带课程课件资料+课件笔记）图像处理|深度学习人工智能计算机视觉python+AI](https://www.bilibili.com/video/BV1PV411774y?p=9&spm_id_from=pageDriver&vd_source=f7fc0a964268b45e70067d58c7c397fc)

2. [最全面的 OpenCV 笔记](https://github.com/AccumulateMore/OpenCV)
