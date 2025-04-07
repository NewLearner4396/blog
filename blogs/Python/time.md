---
title: Datatime库的学习笔记
date: 2023-03-16
tags:
 - Python
categories:
 -  Lang
---

## time库

用time库计算函数执行时间

用两个时间戳做减法

1. time.time()

   time.time() 函数的精度不是特别高，没法统计执行时间极短的函数耗时

   ```python
   t0 = time.time()
   func
   t1 = time.time()
   print(f'cost:{t1 - t0:.8f}s')
   ```

   

2. time.perf_counter()

   perf_counter() 函数甚至可以统计出 print 函数的执行耗时，并且统计精度要比 time.time() 函数要高，比较推荐作为计时器来使用

   ```PYTHON
   t0 = time.perf_counter()
   func
   t1 = time.perf_counter()
   print(f'cost:{t1 - t0:.8f}s')
   ```

   

参考链接：[Python计算函数执行时间（五种案例）](https://blog.csdn.net/weixin_38924500/article/details/111679503)