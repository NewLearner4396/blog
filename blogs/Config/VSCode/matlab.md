---
title: VSCode编写Matlab相关配置
date: 2022-08-18
tags:
 - Matlab
 - VSCode
categories:
 -  Config
---

## 在VSCode中愉快地编写Matlab代码

**使用前请预先安装好Matlab、Python3.7（或3.8）**

### VSCode插件

1. matlab

![MATLAB for VSCode](http://imagebed.krins.cloud/api/image/2BNN4B6N.png)

提供相关代码高亮、补全和报错的插件

在`setting.JSON`中键入以下代码：

```json
    // 指定Matlab路径，请将...替换成你的安装路径
    "matlab.mlintpath": "...\\Matlab\\2021b\\bin\\win64\\mlint.exe",
    "matlab.matlabpath": "...\\Matlab\\2021b\\bin\\matlab.exe",
    // 避免报错信息显示乱码，指定成utf-8
    "matlab.linterEncoding" : "utf-8",
    // 将文件后缀与程序关联起来，以便启动正确的插件
    "files.associations": {
        "*.m": "matlab",
        "*.md": "markdown"
    },
    // matlab程序默认使用的是gbk编码，为了避免中文乱码，VSCode也指定一下
    "[matlab]": {
        "files.encoding": "gbk"
    },
```



2. Matlab Interactive Terminal

![Matlab Interactive Termial](http://imagebed.krins.cloud/api/image/0F4F2X6V.png)

在VSCode启动Matlab终端的插件，这样就可以直接运行matlab脚本了。

注意不同的Matlab版本兼容的Python版本并不完全相同，请为你的Matlab安装合适的Python版本，多版本的话请在环境变量中将合适版本的路径提前，因为系统调用是从上往下的。

![Matlab与Python版本兼容](http://imagebed.krins.cloud/api/image/0DX0NJJ8.png)

然后用打开你的工作区后，按`F1`，输入`open a Matlab Termianl `, 然后就能像matlab的命令行一样输入命令啦

![Matlab终端](http://imagebed.krins.cloud/api/image/640J6F0R.png)

如果要运行脚本，直接在终端中键入脚本命名即可

若要查看某函数的文档，键入`doc function_name`，如：

![调出函数文档](http://imagebed.krins.cloud/api/image/L604N6N2.png)

可选：

3. Matlab Snippets

![Matlab Snippets](http://imagebed.krins.cloud/api/image/D062JT42.png)

安装完后在`settings.JSON`中键入`"editor.snippetSuggestions": "bottom",`，不然自动补全总是先出来代码块，要不停找要补全的地方，很烦，把它扔到底下去。

像常见的`close all;clc;clear;`，输入`clc`后即可选择：

![clc;](http://imagebed.krins.cloud/api/image/4JFD4F4P.png)

4. matlab-formatter

   ![matlab-formatter](http://imagebed.krins.cloud/api/image/FHN40224.png)

一个格式化插件，不需要可以不装。

使用默认设置即可，没啥好改的。

右键编辑区-`格式化文档`或按下`Shift + Alt + F`即可自动格式化。

**安装完以上插件就可以一定程度上将VSCode当Matlab用啦**:happy:

### 参考链接

[VScode+MATLAB](https://zhuanlan.zhihu.com/p/166873048)

[使用vscode编辑并运行matlab脚本](https://zhuanlan.zhihu.com/p/395486395)
