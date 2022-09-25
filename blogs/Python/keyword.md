---
title: Python特殊关键字
date: 2022-09-22
tags:
 - Python
categories:
 -  Lang
---

## Python特殊方法学习笔记

### yield

普通的return是什么意思，就是在程序中返回某个值，返回之后程序就不再往下运行了

带yield的函数是一个**生成器**，而不是一个函数了

对for循环：return会退出，yield会返回值并继续

生成器有一个函数就是next函数，next就相当于“下一步”生成哪个数，这一次的next开始的地方是接着上一次的next停止的地方执行的，所以调用next的时候，生成器并不会从foo函数的开始执行，只是接着上一步停止的地方开始，然后遇到yield后，return出要生成的数，此步就结束。

send发送一个参数给yield语句，以便继续执行下一步(send方法中包含next()方法)

参考链接：[python中yield的用法详解——最简单，最清晰的解释](https://blog.csdn.net/mieleizhi0522/article/details/82142856)