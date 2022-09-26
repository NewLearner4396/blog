---
title: openpyxl库的学习笔记
date: 2022-09-10
tags:
 - Python
categories:
 -  Lang
---

## openpyxl库的使用

### Python下的Excel库

Python 中有大量的原生和第三方 Excel 操作包，各有所长，不过对于刚使用 Python 与 Excel 交互的同学来说，可能有点目不暇接，所以先简单梳理一下常见的一些 Excel 包

- **OpenPyXL** 是个读写 Excel 2010 xlsx/xlsm/xltx/xltm 的 Python 库，简单易用，功能广泛，单元格格式/图片/表格/公式/筛选/批注/文件保护等等功能应有尽有，图表功能是其一大亮点
- **xlwings** 是一个基于 BSD 授权协议的 Python 库，可以轻松的使用 Python 操作 Excel，也可以在 Excel 中调用 Python，以接近 VBA 语法的实现 Excel 编程，支持 Excel 宏，并且可以作为 Web 服务器，提供 REST API 接口
- **pandas** 数据处理是 pandas 的立身之本，Excel 作为 pandas 输入/输出数据的容器
- **win32com** 从命名上就可以看出，这是一个处理 windows 应用的扩展，Excel 只是该库能实现的一小部分功能。该库还支持 office 的众多操作。需要注意的是，该库不单独存在，可通过安装 pypiwin32 或者 pywin32 获取
- **Xlsxwriter** 拥有丰富的特性，支持图片/表格/图表/筛选/格式/公式等，功能与 openpyxl 相似，优点是相比 openpyxl 还支持 VBA 文件导入，迷你图等功能，缺点是不能打开/修改已有文件，意味着使用 xlsxwriter 需要从零开始
- **DataNitro** 一个 Excel 的付费插件，内嵌到 Excel 中，可完全替代 VBA，在 Excel 中使用 python 脚本。既然被称为 Excel 中的 python，同时可以与其他 python 库协同。
- **xlutils** 基于 xlrd/xlwt，老牌 python 包，算是该领域的先驱，功能特点中规中矩，比较大的缺点是仅支持 xls 文件。

### 操作Excel文件

```python
import openpyxl as xl
# 创建一个 workbook
wb = xl.Workbook()
# 或打开一个 workbook
wb = xl.load_workbook("path")
# 获取被激活的 worksheet
ws = wb.active
wb.save("sample.xlsx")
```

需要注意的是：

- 新创建的 workbook 对象，会自带一个名为 Sheet 的表单，Office Excel 新建会创建 3 个
- 创建的 workbook 会将第一个 `表单` 激活，通过 wb.active 获取引用
- 像 python-docx work 库一样，save 方法会立即保存，不会有任何提示，建议选择不同文件名来保存

load_workbook 除了参数 filename外为还有一些有用的参数：

- read_only：是否为只读模式，对于超大型文件，要提升效率有帮助
- keep_vba ：是否保留 vba 代码，即打开 Excel 文件时，开启并保留宏
- guess_types：是否做在读取单元格数据类型时，做类型判断
- data_only：是否将公式转换为结果，即包含公式的单元格，是否显示最近的计算结果
- keep_links：是否保留外部链接

### 操作Sheet

```python
ws1 = wb.create_sheet("sheet")  #创建一个 sheet 名为 sheet
ws1.title = "新表单"  # 设置 sheet 标题
ws2 = wb.create_sheet("mysheet", 0) # 创建一个 sheet，插入到最前面 默认插在后面
ws2.title = u"你好"  # 设置 sheet 标题

ws1.sheet_properties.tabColor = "1072BA"  # 设置 sheet 标签背景色

# 获取 sheet
ws3 = wb.get_sheet_by_name(u"你好")
# ws4 = wb['New Title']

# 复制 sheet
ws1_copy = wb.copy_worksheet(ws1)

# 删除 sheet
wb.remove(ws1)
```

- 每个 Workbook 中都有一个被激活的 sheet，一般都是第一个，可以通过 active 直接获取
- 可以通过 sheet 名来获取 sheet 对象
- 创建 sheet时需要提供 sheet 名称参数，如果该名称的 sheet 已经存在，则会在名称后添加 1，再有重复添加 2，以此类推
- 获得 sheet 对象后，可以设置 名称（title），背景色等属性
- 同一个 Workbook 对象中，可以复制 sheet，需要将源 sheet 对象作为参数，复制的新 sheet 会在最末尾
- 可以删除一个 sheet，参数是目标 sheet 对象



### 参考链接

[Python的Excel 神器 —— OpenPyXl](https://zhuanlan.zhihu.com/p/351998173)