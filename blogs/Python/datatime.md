---
title: Datatime库的学习笔记
date: 2022-10-07
tags:
 - Python
categories:
 -  Lang
---

## Datatime库

```python
# 获取一段时间的列表
def get_date_list(start_date, end_date):
    date_list = []
    start_date = dt.datetime.strptime(start_date, '%Y-%m-%d')
    end_date = dt.datetime.strptime(end_date, '%Y-%m-%d')
    date_list.append(start_date.strftime('%Y-%m-%d'))
    while start_date < end_date:
        start_date += dt.timedelta(days=1)
        date_list.append(start_date.strftime('%Y-%m-%d'))
    return date_list
```

参考链接：[python获取一段时间的日期](https://www.cnblogs.com/Jaryer/p/13814690.html)