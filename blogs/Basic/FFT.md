---
title: FFT代码实现
date: 2023-03-15
tags:
 - Math
categories:
-  Basic
---

## FFT学习

由于个人对FFT一直半生不熟，只知其意，不得其神，故想通过代码实现加深理解😆

### FFT原理

FFT作为DFT的快速算法，我们应先了解何为DFT

#### DFT

DFT即离散傅立叶变换，它的产生是为了解决DTFT（离散时间傅立叶变换）在频域上连续的问题。众所周知，计算机所能处理的只有离散、有限长的序列，这样就首先排除了我们在信号与系统中所熟知的FS、FT、DTFT的应用，但着眼于DTFT时我们又发现虽然它在时域上满足离散、有限长的条件，但他在频域上却是连续且周期的，所以我们应当对其在频域上的值进行截断和离散化。

### Python

```python
import numpy as np
from numpy import pi, exp


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
        pos = 0
        self.m = int(np.log2(self.N))
        for i in range(self.m):
            pos = pos << 1
            pos |= (num >> i) & 1
        return pos    
    
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
    a = My_FFT().fft_iteration(test_list, 16)
    b = My_FFT().fft_recursive(test_list, 16)
    c = np.fft.fft(test_list, 16)
    d = np.fft.ifft(c, 16)
    e = My_FFT().ifft(a, 16)
    f = My_FFT().ifft_iteration(c, 16)
    print(a)
    print(b)
    print(c)
    print(d)
    print(e)
    print(f)

```

当然，Python中numpy和scipy库中都集成了fft函数，可直接调用

```python
import numpy as np
import scipy as sci

fft_res = np.fft.fft(sequence, N)
seq = np.fft.ifft(fft_res, N)

fft_res = sci.fft.fft(sequence, N)
seq = sci.fft.ifft(fft_res, N)
```

### 参考资料

1. FFT介绍及python源码编写[https://blog.csdn.net/Dr_maker/article/details/107841986]
