---
title: FFT代码实现
date: "2023-03-15"
tags: 
 - FFT
categories: 
 - Math
---

## FFT学习

由于个人对FFT一直半生不熟，只知其意，不得其神，故想通过代码实现加深理解😆

从理论上看，它承接了 [《信号与系统》的简单梳理](../Signal/Signal_and_System.md) 里“离散、有限长、频域采样”的思路；从实现上看，它又几乎离不开 [NumPy库的学习笔记](../Python/numpy.md) 里的数组运算。

### FFT原理

FFT作为DFT的快速算法，我们应先了解何为DFT

#### DFT与IDFT

DFT即离散傅立叶变换，它的产生是为了解决DTFT（离散时间傅立叶变换）在频域上连续的问题。众所周知，计算机所能处理的只有离散、有限长的序列，这样就首先排除了我们在信号与系统中所熟知的FS、FT、DTFT的应用，但着眼于DTFT时我们又发现虽然它在时域上满足离散、有限长的条件，但他在频域上却是连续且周期的，所以我们应当对其在频域上的值进行截断和离散化。

我们通过将一个时限信号的频域序列与频域冲激信号相乘进行频域采样，再由卷积定理反变换得到时域图像，发现时域序列进行了周期延拓，判断时域序列不混叠的条件从而得到频域采样定理。

**频域采样定理**：进行频域采样之后能保证理想重构时域序列的条件是频域采样点数N大于时域序列长度M

如果想把这里的离散化、周期延拓和采样条件放回课程脉络，可先补 [《信号与系统》的简单梳理](../Signal/Signal_and_System.md)。

定义上DFT是DTFT的采样，那么DFT表达则为
$$
X[k]=X(e^{jw})|_{w=\frac{2k\pi}{N}}=\sum\limits_{n=0}^{N-1}x[n]e^{-j\frac{2\pi}{N}kn}  \nonumber
$$
又有DFS公式为$X[k]=1/N\sum\limits_{k=0}^{N-1}x[n]e^{-j\frac{2\pi}{N}kn}$

且已知IDFS公式为$x[n]=\sum\limits_NX[k]e^{j\frac{2\pi}{N}kn}$

那么，我们可以将DFT乘以系数1/N转为DFS，进而进行IDFS得到时域信号的周期延拓，取主值即可

即IDFT可表达为
$$
x[n]=\frac{1}{N}\sum\limits_{k=0}^{N-1}X[k]e^{j\frac{2\pi}{N}kn} \nonumber
$$

如果按公式直接计算N点DFT需要$N^2$次复数乘法和$N(N-1)$复数加法

#### FFT

考虑N=2^m，不足可补零填充

$$
\begin{equation}
\begin{aligned}
X[k] &= \sum\limits_{n=0}^{N-1}x[n]e^{-j \frac{2\pi}{N}kn}\\
&= \sum\limits_{n=0}^{N/2-1}x[2n]e^{-j \frac{2\pi}{N}k(2n)} + \sum\limits_{n=0}^{N/2-1}x[2n+1]e^{-j \frac{2\pi}{N}k(2n+1)}\\
&= \sum\limits_{n=0}^{N/2-1}x[2n]e^{-j \frac{2\pi}{N}k(2n)} + e^{-j \frac{2\pi}{N}k} \sum\limits_{n=0}^{N/2-1}x[2n+1]e^{-j \frac{2\pi}{N}k(2n)}\\
\end{aligned}\nonumber
\end{equation}
$$
又
$$
\begin{align*}
e^{-j \frac{2\pi}{N}(k+N/2)} = -e^{-j \frac{2\pi}{N}k},k \in [0, N/2-1]
\end{align*}
$$
所以
$$
\begin{equation*}
X[k]=\left\{
\begin{aligned}
&\sum\limits_{n=0}^{N/2-1}x[2n]e^{-j \frac{2\pi}{N}k(2n)} + e^{-j \frac{2\pi}{N}k} \sum\limits_{n=0}^{N/2-1}x[2n+1]e^{-j \frac{2\pi}{N}k(2n)},k\in[0,N/2-1] \\
&\sum\limits_{n=0}^{N/2-1}x[2n]e^{-j \frac{2\pi}{N}(k-\frac N2)(2n)} - e^{-j \frac{2\pi}{N}k} \sum\limits_{n=0}^{N/2-1}x[2n+1]e^{-j \frac{2\pi}{N}(k-\frac N2)(2n)},k\in(N/2-1,N-1] \\
\end{aligned}
\right.
\end{equation*}
$$

这样，我们可以将序列分成偶部和奇部，频域后半部分点不用重新与原序列每个点相乘计算，可以用前半周期对应点的相乘结果，也就是说计算一次k的乘加，我们可以轻松算出频域的两个点，减少计算量。这个算法的优点是原序列的偶部或奇部仍可以继续拆分，直至只需要算两点DFT，然后递归回来。由于两点DFT的系数为1可以直接蝶形运算，然后可以快速蝶形运算向上递推。换句话说，我们只需要算出蝶形运算需要的系数，然后蝶形运算即可快速DFT，不需要逐点累乘。

如此计算，N点DFT只需要$log_2N$级蝶形，每级都有$\frac N2$个蝶形运算，而每个蝶形都有1次复乘、2次复加，因此，共需要$\frac N2 log_2N$次复乘和$Nlog_2N$次复加。

举个8点FFT例子。

![8点FFT](https://imagebed.krins.cloud/api/image/4ZZH0D2L.png)

![8点蝶形FFT图](https://imagebed.krins.cloud/api/image/P6RZ8H0F.png)

#### IFFT

由于IDFT与DFT的只有系数上的区别以及最后要除以N，将FFT的代码中的系数修改一下即可，最后的结果除以N（也可以在每次迭代的结果上都除以2）。

或者利用系数的共轭关系直接复用FFT的代码。
$$
\begin{align*}
&x[n]=\mathcal{F^{-1}}(X[k])=\frac{1}{N}\sum\limits_{k=0}^{N-1}X[k]e^{j\frac{2\pi}{N}kn}\\
&\mathcal{F}(x^*[n])=X^*[k]=\sum\limits_{n=0}^{N-1}x^*[n]e^{j\frac{2\pi}{N}kn}\\
&\frac 1N \mathcal{F}(X^*[k])=\frac 1N\sum\limits_{n=0}^{N-1}X^*[k]e^{j\frac{2\pi}{N}kn}=x^*[n]\\
&x[n]=\mathcal{F^{-1}}(X[k])=\frac 1N (\mathcal{F}(X^*[k]))^*
\end{align*}
$$
也就是说，IFFT的结果是输入的共轭FFT之后再共轭除以N

### Python

```python
import numpy as np
from numpy import pi, exp
import time


class My_FFT():
    
    def __init__(self, _list=[], N=0):
        self.list = _list
        self.N = N
        self.m = 0  # m = log2(N),代表FFT层数
        self.reverse_list = []  # 位倒序列表
        self.output = []  # 输出列表
        self.W = [exp(-pi * 2j * _ / N) for _ in range(N)]  # 旋转因子列表
        self.reverse_list = [self.list[self.reverse_pos(_)] for _ in range(len(self.list))]
        self.output = self.reverse_list.copy()
        
    def reverse_pos(self, num) -> int:
        # 位倒序
        self.m = int(np.log2(self.N))  
        num=bin(num)  #转二进制
        num=num[2:]  #去掉0b
        num=num[::-1]  #倒序
        num=num.ljust(self.m,'0')  #补零
        return int(num,2)  #转十进制   
    
    def fft_iteration(self, _list, N) -> list:
        # 蝶形FFT
        self.__init__(_list, N)
        for m in range(self.m):
            _split = self.N // 2 ** (m + 1)
            num_each = self.N // _split
            for _ in range(_split):
                for __ in range(num_each // 2):
                    temp = self.output[_ * num_each + __]
                    temp2 = self.output[_ * num_each + __ + num_each // 2] * self.W[__ * 2 ** (self.m - m - 1)]
                    self.output[_ * num_each + __] = (temp + temp2)
                    self.output[_ * num_each + __ + num_each // 2] = (temp - temp2)
        return self.output[:N]
    
    def fft_recursive(self, _list, N) -> list:
        # 递归FFT
        self.__init__(_list, N)
        if self.N == 1:
            self.output = [self.list[0]]
            return self.output
        else:
            _split = N // 2
            _list1 = []
            _list2 = []
            for _ in range(_split):
                _list1.append(self.list[_ * 2])
                _list2.append(self.list[_ * 2 + 1])
            _list1 = self.fft_recursive(_list1, _split)
            _list2 = self.fft_recursive(_list2, _split)
            self.output = []
            for _ in range(_split):
                self.output.append(_list1[_] + _list2[_] * exp(-pi * 2j * _))
                self.output.append(_list1[_] - _list2[_] * exp(-pi * 2j * _))
            return self.output

    def ifft_iteration(self, _list, N) -> list:  # 计算给定序列的傅里叶逆变换结果，返回一个列表
        self.__init__(_list, N)
        _W = [exp(pi * 2j * _ / N) for _ in range(N)]
        for m in range(self.m):
            _split = self.N // 2 ** (m + 1)
            num_each = self.N // _split
            for _ in range(_split):
                for __ in range(num_each // 2):
                    temp = self.output[_ * num_each + __]
                    temp2 = self.output[_ * num_each + __ + num_each // 2] * _W[__ * 2 ** (self.m - m - 1)]
                    self.output[_ * num_each + __] = (temp + temp2) / 2
                    self.output[_ * num_each + __ + num_each // 2] = (temp - temp2) / 2
        return self.output

    def ifft(self, _list, N) -> list:
        self.fft_iteration(np.conj(_list), N)
        self.output = np.conj(self.output)
        return self.output[:N]/N    
                
        
if __name__ == '__main__':
    test_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    # test_list = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
    t0 = time.perf_counter()
    a = My_FFT().fft_iteration(test_list, 16)
    t1 = time.perf_counter()
    b = My_FFT().dft(test_list, 16)
    t2 = time.perf_counter()
    c = np.fft.fft(test_list, 16)
    t3 = time.perf_counter()
    d = My_FFT().fft_recursive(test_list, 16)
    e = np.fft.ifft(c, 16)
    f = My_FFT().ifft(c, 16)
    g = My_FFT().ifft_iteration(c, 16)
    print(a)
    print("%f" % (t1 - t0))
    print(b)
    print("%f" % (t2 - t1))
    print(c)
    print("%f" % (t3 - t2))
    print(d)
    print(e)
    print(f)
    print(g)

```

自己写的和官方库函数的精度差了一些，并且只能作2的整数幂个点且点数不能超过序列长度，不想修复了😑

当然，Python中numpy和scipy库中都集成了fft函数，可直接调用

实际工程里，频谱结果通常还会配合 [Matplotlib库的学习笔记](../Python/matplotlib.md) 做可视化，并继续进入 [《数字信号处理》的简单梳理](../Signal/Digitial_Signal_Processing.md) 里的滤波、窗函数和谱分析问题。

```python
import numpy as np
import scipy as sci

fft_res = np.fft.fft(sequence, N)
seq = np.fft.ifft(fft_res, N)

fft_res = sci.fft.fft(sequence, N)
seq = sci.fft.ifft(fft_res, N)
```

### 参考资料

1. [FFT介绍及python源码编写](https://blog.csdn.net/Dr_maker/article/details/107841986)
2. [FFT和IFFT的Python语言实现源代码](https://www.jianshu.com/p/0bd1ddae41c4)
3. [使用FFT来计算IFFT](https://blog.csdn.net/mimiduck/article/details/120311113)
