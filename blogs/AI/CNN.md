---
title: 基于CNN的手写数字识别
date: 2022-9-20
tags:
 - CNN
 - DeepLearning
categories:
 -  AI
---

## 基于CNN的手写数字识别

#### 完整代码

##### CNN.py

```python
import numpy as np
import matplotlib.pyplot as plt


class Conv:
    def __init__(self, measure, num):
        """
        卷积初始化

        :param measure: 卷积核的尺寸
        :param num: 卷积核的个数
        """

        self.measure = measure
        self.num = num
        self.input = None
        self.last_input = None

        # 随机生成(num*measure*measure)的卷积核
        self.filters = np.random.randn(num, measure, measure) / (measure ** 2)

        # 为了保持卷积后的图像大小不变，需要在边缘padding（补0）
        # 计算需要padding的大小
        self.edge = measure // 2

    def sliding(self, image):
        """
        重叠滑动，步进为1，得到需要卷积的部分

        :param image: 输入卷积后的图像
        :returns: iter_image: 要池化的局部图像 i, j: 局部图像左上角坐标
        """

        self.input = image
        h, w = image.shape

        padded_image = np.pad(image, ((self.edge, self.edge), (self.edge, self.edge)),
                              'constant', constant_values=(0, 0))

        for i in range(h):
            for j in range(w):
                iter_image = padded_image[i:(i + self.measure), j:(j + self.measure)]

                yield iter_image, i, j  # 返回需要卷积的图像和左上角坐标

    def conv(self, input_image):
        """
        对全幅图像进行卷积

        :param input_image: 要卷积的图像
        :return: output_image: 卷积完的图像
        """

        self.last_input = input_image  # 保存一份输入图像，方便反馈时使用
        h, w = input_image.shape

        output_image = np.zeros((h, w, self.num))  # 输出不同卷积核卷积后的特征图，大小为h*w*num

        # 卷积运算
        for iter_image, i, j in self.sliding(input_image):
            output_image[i, j] = np.sum(iter_image * self.filters, axis=(1, 2))

        return output_image

    def feedback(self, out, learn_rate):
        """

        :param out:权重
        :param learn_rate:学习率，梯度下降的步进
        """

        filters = np.zeros(self.filters.shape)

        for iter_image, i, j in self.sliding(self.last_input):
            for k in range(self.num):
                # 利用反馈的权重修改卷积核
                filters[k] += out[i, j, k] * iter_image

        self.filters -= learn_rate * filters


class Pooling:

    def __init__(self, pool_size):
        """
        池化，给数据降维

        :param pool_size: 池化的大小
        """

        self.size = pool_size
        self.last_input = None

    def sliding(self, image):
        """
        不重叠滑动，返回要池化的局部图像

        :param image: 输入卷积后的图像
        :return: iter_image: 要池化的局部图像 i, j: 局部图像左上角坐标
        """

        self.last_input = image
        h = image.shape[0] // self.size
        w = image.shape[1] // self.size

        for i in range(h):
            for j in range(w):
                iter_image = image[(i * self.size):(i * self.size + self.size),
                                   (j * self.size):(j * self.size + self.size)]

                yield iter_image, i, j

    def max_pool(self, input_image):
        """
        最大池化

        :param input_image:卷积后的图像
        :return:池化后的图像
        """

        # 输出图像大小为原图像//池化大小
        h = int(input_image.shape[0] // self.size)
        w = int(input_image.shape[1] // self.size)
        n = int(input_image.shape[2])
        output_image = np.zeros((h, w, n))

        for iter_image, i, j in self.sliding(input_image):
            output_image[i, j] = np.amax(iter_image, axis=(0, 1))

        return output_image

    def feedback(self, back_nodes):
        """

        :param back_nodes:
        :return:
        """

        input_nodes = np.zeros(self.last_input.shape)

        # 每个iter_image都是3*3*8的矩阵
        # 修改max
        for iter_image, i, j in self.sliding(self.last_input):
            h, w, n = iter_image.shape
            amax = np.amax(iter_image, axis=(0, 1))

            # 遍历iter_image，将最大值像素改为梯度
            for i2 in range(h):
                for j2 in range(w):
                    for k2 in range(n):
                        if iter_image[i2, j2, k2] == amax[k2]:
                            input_nodes[i * self.size + i2, j * self.size + j2, k2] = back_nodes[i, j, k2]

        return input_nodes


class Softmax:

    def __init__(self, input_size, out_nodes):
        """

        :param input_size:
        :param out_nodes:
        """

        self.weights = np.random.randn(input_size, out_nodes) / input_size
        self.output = np.zeros(out_nodes)
        self.last_input = None
        self.last_input_shape = None
        self.last_totals = None

    def softmax(self, input_image):
        """

        :param input_image:
        :return:
        """

        self.last_input_shape = input_image.shape
        input_image = input_image.flatten()  # 将数据转为一维
        self.last_input = input_image
        # length, nodes = self.weights.shape

        totals = input_image @ self.weights + self.output
        self.last_totals = totals

        out = np.exp(totals)
        out = out / np.sum(out, axis=0)  # 归一化

        return out

    def feedback(self, gradients, learn_rate):
        """

        :param gradients:
        :param learn_rate:
        :return:
        """

        for i, gradient in enumerate(gradients):
            if gradient == 0:
                continue

            # 得到一群1和正确答案对应的非1值
            exp_t = np.exp(self.last_totals)
            exp_t_s = np.sum(exp_t)

            # 反馈的数值
            # TODO:理解公式
            out_back = -exp_t[i] * exp_t / (exp_t_s ** 2)
            out_back[i] = exp_t[i] * (exp_t_s - exp_t[i]) / (exp_t_s ** 2)

            # 反馈输值和概率做乘积，得到结果权重
            out_back = gradient * out_back

            # 输入与权重点乘，获得权重的偏置
            weight_back = self.last_input[np.newaxis].T @ out_back[np.newaxis]
            input_back = self.weights @ out_back

            self.weights -= learn_rate * weight_back
            self.output -= learn_rate * out_back

        input_back = input_back.reshape(self.last_input_shape)  # 将矩阵从1维转回3维
        return input_back


class CNN:
    def __init__(self, conv_size, pool_size, image_size, channel, classes):
        """

        :param conv_size:
        :param pool_size:
        :param image_size:
        :param channel:
        :param classes:
        """

        self.conv = Conv(conv_size, channel)
        self.pool = Pooling(pool_size)
        h_s = image_size[0] // pool_size
        w_s = image_size[1] // pool_size
        self.softmax = Softmax((h_s * w_s * channel), classes)

    def train_forward(self, images, target, wheel, learn_rate):
        """

        :param images:测试图像
        :param target:识别目标
        :param wheel:训练轮数
        :param learn_rate:学习率
        :return:loss:损失
        """

        loss = []  # 记录损失
        item = 0  # 计次
        plt.ion()  # 打开绘图窗口
        for i in range(wheel):
            item_loss = 0  # 记录每轮的损失
            for image in range(len(images)):
                # 数据正向传播
                out = self.conv.conv(images[image])
                out = self.pool.max_pool(out)
                out = self.softmax.softmax(out)

                # 计算损失
                item_loss += -np.log(out[target[image]])

                # 反馈数据
                gradient = np.zeros(10)
                gradient[target[image]] = -1 / out[target[image]]

                gradient = self.softmax.feedback(gradient, learn_rate)
                gradient = self.pool.feedback(gradient)
                self.conv.feedback(gradient, learn_rate)

                item += 1
                if item % 200 == 0:
                    plt.clf()  # 清楚之前画的图
                    loss.append(item_loss / 200)
                    plt.plot(loss)
                    plt.pause(0.001)
                    print("process: %.4f loss: %.7f" % (item / (wheel * len(images)), item_loss / 200))
                    item_loss = 0
                    plt.ioff()

        return loss

    def test(self, image):
        """
        正向传播测试

        :param image:测试图像
        :return:
        """

        out = self.conv.conv(image)
        out = self.pool.max_pool(out)
        out = self.softmax.softmax(out)

        return out, np.argmax(out)

```

##### main.py

```python
import numpy as np
from CNN import CNN


def read_data(path):
    data_file = open(path, 'r')
    data_list = data_file.readlines()
    data_file.close()

    target = []
    data = []

    for i in range(len(data_list)):
        line_ = data_list[i].split(',')  # csv文件每行转列表

        nums = [int(x)/255 for x in line_[1:]]
        nums = np.array(nums).reshape(28, 28)

        target.append(int(line_[0]))
        data.append(nums)

    target = np.array(target)
    data = np.array(data)

    print('加载完成！')

    return data, target


demo = CNN(3, 2, [28, 28], 3, 10)
demo_data, demo_target = read_data("mnist_train.csv")
demo.train_forward(demo_data, demo_target, 1, 0.001)

```



#### 参考链接

[基于CNN的手写数字识别](https://blog.csdn.net/qq_44961028/article/details/118074416)