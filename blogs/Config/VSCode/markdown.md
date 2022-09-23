---
title: VSCode编写markdown相关配置
date: 2022-08-18
tags:
 - markdown
 - VSCode
categories:
 -  Config
---

## 在VSCode用markdown愉快地记录笔记:blush:

### 需要的插件

#### 1. Markdown All in One

![Markdown All in One](http://imagebed.krins.cloud/api/image/TRZ48R86.png)

书写Markdown最基础的插件，装上它其实就能书写Markdown了。

**快捷键**

|       Key        |          Function          |
| :--------------: | :------------------------: |
|     Ctrl + B     |        Toggle bold         |
|     Ctrl + I     |       Toggle italic        |
|     Ctrl + M     |  Toggle math environment   |
|     Alt + S      |    Toggle strikethrough    |
|     Alt + C      |   Toggle task list item    |
| Ctrl + Shift + [ | Toggle heading (downlevel) |
| Ctrl + Shift + ] |  Toggle heading (uplevel)  |
| Ctrl + Shift + V |       Toggle preview       |
|   Ctrl + K, V    |   Toggle preview to side   |

**如果预览无法加载图片**，则在VSCode编辑页面，按快捷键`Ctrl + Shift + P`，搜索`markdown 更改预览安全设置`， 选择`允许不安全内容`，即可预览图片啦:face_with_thermometer:

**常用命令**

在VSCode命令行`Ctrl + Shift + P`

- Markdown All in One: Create Table of Contents

  （在光标处创建一个目录，实际上是根据标题层次创建引用)

- Markdown All in One: Update Table of Contents

- Markdown All in One: Add/Update section numbers

  增加章节数字层次，如2变为2.1

- Markdown All in One: Remove section numbers

- Markdown All in One: Toggle list

  - It will cycle through list markers (`-`, `*`, `+`, `1.` and `1)`)

#### 支持渲染的语言

- [CommonMark](https://spec.commonmark.org/)
- [Tables](https://help.github.com/articles/organizing-information-with-tables/), [strikethrough](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) and [task lists](https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax#task-lists) (from GitHub Flavored Markdown)
- [Math support](https://github.com/waylonflinn/markdown-it-katex#syntax) (from KaTeX)
- [Front matter](https://github.com/ParkSB/markdown-it-front-matter#valid-front-matter)

​	其他的Markdown语法需要安装其他的插件，如： [Mermaid diagram](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid), [emoji](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji), [footnotes](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-footnotes) and [superscript](https://marketplace.visualstudio.com/items?itemName=DevHawk.markdown-sup)

或者**直接安装`Markdown Preview Enhanced`**:metal:

#### 2. Markdown Preview Enhanced

![Markdown Preview Enhanced](http://imagebed.krins.cloud/api/image/H048VTR6.png)

一个支持自动同步滚动，各种拓展Markdown语法的插件

因为只是个增强插件，没什么需要配置的

**快捷键**

|       Key        |          Function          |
| :--------------: | :------------------------: |
|   Ctrl + K, V    |  Open preview to the side  |
| Ctrl + shift + V |        Open preview        |
| Ctrl + Shift + S | Sync preview / Sync source |
|     Ctrl + =     |      preview zoom in       |
|     Ctrl + -     |      preview zoom out      |
|     Ctrl + 0     |     preview zoom reset     |
|       esc        |     Toggle sidebar TOC     |

**该插件支持直接渲染代码块运行结果**:running:，快捷键为`Shift + Enter`

![直接运行代码块](http://imagebed.krins.cloud/api/image/R2BPV6LT.png)

具体请查看官方文档:<https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/code-chunk>

#### 3. Markdown PDF

![Markdown PDF](http://imagebed.krins.cloud/api/image/XTJB28NT.png)

支持将Markdown导出为PDF，PNG，JPEG，HTML的插件

该插件可以自定义的部分蛮多，比如：

页边距，渲染样式，语法高亮样式等等

**可以根据说明自己在设置里调整**

![我的自定义内容](http://imagebed.krins.cloud/api/image/ZBP82B42.png)

该插件模认在右键菜单中设置了6个命令，我觉得我用不到这么多命令，而且太占空间，于是我修改了该插件的JSON文件，路径为：`C:\Users\Administrator\.vscode\extensions\yzane.markdown-pdf-1.4.4\package.json`

只留下这两个大括号就好了，记得把`group`的序号改一下

![修改右键目录](http://imagebed.krins.cloud/api/image/B2B4TJ0N.png)

如果不自定义style的话，渲染出来的很朴素

![不带Style渲染](http://imagebed.krins.cloud/api/image/466BZ2T8.png)

使用`whitey.css`样式后，标题、字体等都有了变化

![使用Style后](http://imagebed.krins.cloud/api/image/P0J26N46.png)

可以从网上下载好看的CSS样式

typora官网主题的CSS：<https://theme.typora.io/>

（上面那个网站打不开可以试试typora中文网：<https://www.typora.net/themes/>，但是主题比那个少）

注意设置的时候要输入`.css`文件的绝对路径哦，并且`\`要更改为`\\`

#### 4. markdownlint

一个检查Markdown文件书写规范的插件，并且可格式化文件去除违规问题(在编辑器右键即可看到)。

该规范意使Markdown源文件简洁易读，如不喜欢可以不用。

规范文档：[官方Rules](https://github.com/DavidAnson/markdownlint/blob/v0.26.2/doc/Rules.md)

### Markdown常用语法

![标题](http://imagebed.krins.cloud/api/image/0XXZX68B.png)

![强调](http://imagebed.krins.cloud/api/image/24284BVF.png)

![列表](http://imagebed.krins.cloud/api/image/PVBVBBNP.png)

![添加图片](http://imagebed.krins.cloud/api/image/D840L046.png)

![引用](http://imagebed.krins.cloud/api/image/04T0N0N8.png)

![引用](http://imagebed.krins.cloud/api/image/XR822Z02.png)

![代码](http://imagebed.krins.cloud/api/image/44XB4Z6B.png)

![语法高亮](http://imagebed.krins.cloud/api/image/66X02F82.png)

![表格](http://imagebed.krins.cloud/api/image/N2RH2284.png)

想要**分割线**，可用`–--`、`***`、`___`表示

可以使用**任务列表**达到复选框的效果`- [ ]`

写文字少不了用各种表情调剂气氛，可用`:emoji:`表示，如`:blush:`就是:blush:

该网站收录了各emoji表达方式:<https://www.webfx.com/tools/emoji-cheat-sheet/>

还可以用`Win + .`调出系统的表情工具。

还可以用markdown写流程图，但有可视化工具，用代码写有点不方便。

### 参考链接

[Markdown基本要素](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/markdown-basics)

[Markdown 教程](https://www.runoob.com/markdown/md-tutorial.html)
