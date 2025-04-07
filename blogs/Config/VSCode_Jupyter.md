---
title: VSCode使用JupyterNotebook相关配置
date: 2022-08-19
tags:
 - Jyputer
 - VSCode
categories:
 -  Config
---

## 在VSCode使用Jupyter Notebook

### 所需工具

1. python

   安装完后下载相关库`pip intall jupyter`

2. VSCode

### VSCode插件

![image-20221004194337227](http://imagebed.krins.cloud/api/image/Z4L8F04Z.png)

在扩展中搜索这个插件并下载，这是一个扩展包，会自动下载另外两个插件：

![image-20221004194523844](http://imagebed.krins.cloud/api/image/LTJ2VFT4.png)

使编辑器支持Jupyter Notebook相关快捷键

![image-20221004194541291](http://imagebed.krins.cloud/api/image/VL00HJRR.png)

使编辑器支持渲染多种格式图片

### 开始使用

新建一个`.ipnb`文件或在VSCode命令面板中输入：`Create:New Jupyter Notebook`

即可在本地使用Jupyter了

接下来，使用右上角的内核拾取器选择内核。

![内核拾取器](http://imagebed.krins.cloud/api/image/66084V22.png)

选择内核后，位于每个代码单元右下角的语言选择器将自动更新到内核支持的语言。

#### 运行单元格[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_running-cells)

一旦您拥有了Notebooks，就可以使用单元格左侧的**Run**图标运行代码单元格，输出将直接显示在代码单元格的正下方。

您还可以使用键盘快捷方式运行代码。在命令或编辑模式下，使用`Ctrl+Enter运行当前单元格或`Shift+ Enter`来运行当前单元格并推进到下一个单元格。

![运行Jupyter代码单元格](http://imagebed.krins.cloud/api/image/V2P04X48.png)

您可以使用**Run All**, **Run All Above**, or **Run All Below**"来运行多个单元格。

![运行Jupyter代码单元格](http://imagebed.krins.cloud/api/image/DFB8X062.png)

#### 保存您的Jupyter Notebooks[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_save-your-jupyter-notebook)

您可以使用键盘快捷方式 `Ctrl+S`or **File** > **Save**保存您的 Jupyter Notebooks。

#### 导出您的Jupyter Notebooks[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_export-your-jupyter-notebook)

您可以导出一个Jupyter Notebooks作为Python文件，PDF，或HTML文件。要导出，请选择主工具栏上的**导出**操作。然后，您将收到文件格式下拉列表选项。`.py`

![将Jupyter Notebooks转换为 Python 文件](http://imagebed.krins.cloud/api/image/XZ4D8Z0X.png)

> **注：**对于PDF导出，您必须[安装TeX。](https://nbconvert.readthedocs.io/en/latest/install.html#installing-tex)如果没有，将通知您在选择 PDF 选项时需要安装它。此外，请注意，如果您的Notebooks中只有 SVG 输出，则不会在 PDF 中显示它们。要将 SVG 图形放在 PDF 中，请确保输出包含非 SVG 图像格式，或者您可以首先导出到 HTML，然后使用浏览器保存为 PDF。

#### 与Notebooks编辑器中的代码单元格配合使用[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_work-with-code-cells-in-the-notebook-editor)

Notebooks编辑器使创建、编辑和运行Jupyter Notebooks中的代码单元格变得容易。

##### Create a code cell[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_create-a-code-cell)

By default, a blank Notebook will have an empty code cell for you to start with.

```
msg = "Hello world"
print(msg)
12
```

![简单的Jupyter代码单元格](http://imagebed.krins.cloud/api/image/RH24N8VT.png)

##### 代码单元格模式[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_code-cell-modes)

在处理代码单元时，单元格可以处于三种状态：未选定、命令模式和编辑模式。单元格的当前状态由代码单元和编辑器边框左侧的垂直条表示。当看不到栏时，单元格是未选择的。

![未选中Jupyter代码单元格](http://imagebed.krins.cloud/api/image/ZP82D60F.png)

选择单元格时，它可以处于两种不同的模式。它可以处于命令模式或编辑模式。当单元格处于命令模式时，可以操作并接受键盘命令。当单元格处于编辑模式时，可以修改单元格的内容（代码或标记）。

当单元格处于命令模式时，单元格左侧会出现一个实心垂直条。

![命令模式下的代码单元格](http://imagebed.krins.cloud/api/image/RH24N8VT.png)

当您处于编辑模式时，实体垂直条由单元格编辑器周围的边框连接。

![编辑模式下的代码单元格](http://imagebed.krins.cloud/api/image/Z2PFXNL8.png)

要从编辑模式移动到命令模式，请按`Esc`。要从命令模式移动到编辑模式，请按`enter`。您还可以通过鼠标单击单元格左侧的垂直条或代码单元中的代码/标记区域外部来**更改**模式。

##### 添加其他代码单元格[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_add-additional-code-cells)

代码单元可以使用主工具栏、单元格工具栏（悬停可见）的添加单元格和键盘命令添加到Notebooks上。

![添加代码单元](http://imagebed.krins.cloud/api/image/FRL224N8.png)

使用主工具栏中的加号图标和单元的悬停工具栏将在当前选定的单元格正下方添加一个新单元格。

当代码单元处于命令模式时，A键可用于在所选单元格上面添加单元格，B可用于在所选单元格下方添加单元格。

##### 选择代码单元[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_select-a-code-cell)

所选代码单元可以使用鼠标、键盘上的上下箭头键以及J（向下）和K（向上）键进行更改。要使用键盘，单元格必须处于命令模式。

##### 选择多个代码单元[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_select-multiple-code-cells)

要选择多个单元格，请从一个处于选定模式的单元格开始。如果您要选择连续的单元格，请按住Shift并单击要选择的最后一个单元格。如果您要选择任何组单元格，请按住Ctrl并单击您希望添加到所选单元中的单元格。

选定的单元格将填充背景。

![多选单元格](http://imagebed.krins.cloud/api/image/2TZ88NV8.png)

##### 运行单个代码单元[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_run-a-single-code-cell)

添加代码后，您可以使用单元格左侧的**Run**图标运行单元格，输出将显示在代码单元格下方。

![运行Jupyter代码单元格](http://imagebed.krins.cloud/api/image/VDH06248.png)

您还可以使用键盘快捷方式运行选定的代码单元。`Ctrl+Enter`运行当前选定的单元格，`Shift+Enter`运行当前选定的单元格并在下方插入新单元格（焦点移动到新单元格），`Alt+Enter`运行当前选定的单元格并立即插入下面的新单元格（焦点仍停留在当前单元格上）。这些键盘快捷方式可用于命令和编辑模式。

##### 运行多个代码单元[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_run-multiple-code-cells)

运行多个代码单元可以通过多种方式完成。您可以使用Notebooks编辑器主工具栏中的双箭头运行Notebooks或**运行**图标中的所有单元格，在单元格工具栏中使用定向箭头运行当前代码单元上方或下方的所有单元格。

![运行多个代码单元](http://imagebed.krins.cloud/api/image/DFB8X062.png)

##### 移动代码单元[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_move-a-code-cell)

通过拖放，可以在Notebooks内上下移动单元格。对于代码单元，拖放区域位于下图所示的单元格编辑器的左侧。对于渲染的Markdown单元，您可以单击任意位置来拖放单元格。

![移动代码单元](http://imagebed.krins.cloud/api/image/RB42BFFP.png)

要移动多个单元格，您可以在选择包含的任何单元格中使用相同的拖放区域。

您还可以使用键盘快捷方式`Alt+Arrow`移动一个或多个选定的单元格。

##### 删除代码单元格[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_delete-a-code-cell)

删除代码单元可以通过在代码单元工具栏中使用**“删除”**图标或在所选代码单元处于命令模式时通过键盘快捷方式`dd`来完成。

![删除代码单元格](http://imagebed.krins.cloud/api/image/DBNJRBFR.png)

##### 撤消您上次更改[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_undo-your-last-change)

您可以使用`z`键撤消以前的更改，例如，如果您进行了意外编辑，则可以将其撤至以前的正确状态，或者如果您意外删除了单元格，则可以恢复它。

##### 代码和Markdown之间的切换[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_switch-between-code-and-markdown)

Notebooks编辑器允许您轻松地在Markdown和代码之间更改代码单元。单击单元格右下角的语言选择器将允许您在 Markdown 和（如果适用）所选内核支持的任何其他语言之间切换。

![更改语言](http://imagebed.krins.cloud/api/image/FF2X8628.png)

您也可以使用键盘更改单元格类型。当选择单元格并在命令模式下时，`M`键将单元格类型切换到标记，`Y`键将单元格类型切换到代码。

设置Markdown标记后，您可以将Markdown标记格式内容输入代码单元格。

![代码单元中显示的原始标记](http://imagebed.krins.cloud/api/image/62JB8DX2.png)

要渲染标记单元，您可以在单元格工具栏中选择复选标记，或使用`Ctrl+enter`和`shift+enter`键盘快捷方式。

![如何渲染标记](http://imagebed.krins.cloud/api/image/V8R226L4.png)

##### 清除输出或重新启动/中断内核[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_clear-output-or-restartinterrupt-the-kernel)

如果您要清除所有代码单元格输出或重新启动/中断内核，您可以使用Notebooks编辑器主工具栏完成该任务。

![Notebooks工具栏](http://imagebed.krins.cloud/api/image/JL4V6B8P.png)

![](http://imagebed.krins.cloud/api/image/24X42NR0.png)

##### 启用/禁用行号[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_enabledisable-line-numbers)

当您处于命令模式时，您可以使用`L`键启用或禁用单个代码单元内的行编号。

![在代码单元中启用行号](http://imagebed.krins.cloud/api/image/P8FX48VV.png)

要切换整个Notebooks的行编号，请在任何单元格上处于命令模式时使用`Shift+L`。

![为Notebooks启用行号](http://imagebed.krins.cloud/api/image/80LNLL4X.png)

#### 内容表[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_table-of-contents)

要浏览Notebooks，请在活动栏中打开文件资源管理器。然后在侧栏中打开**大纲**选项卡。

![内容表](http://imagebed.krins.cloud/api/image/L0J8DZ0X.png)

> **注：**默认情况下，大纲只会显示Markdown。要显示代码单元，启用以下设置：***\*Notebook > Outline: Show Code Cells\****。

#### Jupyter Notebooks编辑器中的智能感应支持[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_intellisense-support-in-the-jupyter-notebook-editor)

Python JupyterNotebooks编辑器窗口有完整的InterelliSense：代码完成、成员列表、方法的快速信息和参数提示。您可以在Notebooks编辑器窗口中进行与在代码编辑器中一样高效的键入。

![内泰利感支持](http://imagebed.krins.cloud/api/image/2V6P804D.png)

#### 变量管理器和数据查看器[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_variable-explorer-and-data-viewer)

在 Python Notebooks中，可以查看、检查、排序和过滤当前 Jupyter 会话中的变量。通过在运行代码和单元之后在主工具栏中选择**变量**图标，您将看到当前变量的列表，该列表将随着变量在代码中使用而自动更新。变量窗格将在Notebooks底部打开。

![可变资源管理器](http://imagebed.krins.cloud/api/image/F66002J0.png)

有关变量的其他信息，您还可以双击行或在变量旁边的**数据查看器按钮中使用 Show 变量**，以便更详细地查看数据查看器中的变量。打开后，您可以通过搜索行来过滤值。

![数据查看器](http://imagebed.krins.cloud/api/image/204J28L4.png)

#### 保存plots[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_saving-plots)

要从Notebooks上保存绘图，只需将鼠标悬停在输出上，然后选择右上角的**“保存”**图标。

![保存输出](http://imagebed.krins.cloud/api/image/Z086VZ48.png)

> **注：**支持用[matplotlib](https://matplotlib.org/)和[Altair](https://altair-viz.github.io/index.html)制作的渲染图。

#### 调试Jupyter Notebooks[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_debug-a-jupyter-notebook)

如果您需要额外的调试支持才能诊断代码单元中的问题，您可以将其导出为 Python 文件。一旦作为 Python 文件导出，VS 代码调试器可让您浏览代码、设置断点、检查状态和分析问题。使用调试器是查找和纠正Notebooks代码问题的有用方法。要调试您的 Python 文件：

1. 在 VS 代码中，如果您尚未激活安装 Jupyter 的 Python 环境。

2. 从您的JupyterNotebooks，选择主工具栏中的**导出**按钮。`.ipynb`

   ![将Jupyter Notebooks转换为 Python 文件](http://imagebed.krins.cloud/api/image/NL44ZH4T.png)

   导出后，您将有一个带有代码的文件，可用于调试。`.py`

3. 保存文件后，要启动调试器，请使用以下选项之一：`.py`

   - 对于整个Notebooks，打开命令面板（`Ctrl+Shift+P`），并运行**Python： Python 交互窗口命令中的调试当前文件**。
   - 对于单个单元格，使用显示在单元格上方的**调试单元格**操作。调试器从该单元格中的代码开始。默认情况下，**调试单元格**会步入用户代码。如果您想进入非用户代码，则需要取消选中数据科学：在 Python 扩展设置（`Ctrl+，`）中**Data Science: Debug Just My Code**"。

4. 要熟悉 VS 代码的一般调试功能，如检查变量、设置断点和其他活动，可以查看[VS 代码调试](https://code.visualstudio.com/docs/editor/debugging)。

5. 当您发现问题时，停止调试器、更正代码、保存文件并再次启动调试器。

6. 当您确信所有代码都正确时，请使用 Python 交互窗口将 Python 文件导出为 Jupyter Notebooks。`.ipynb`

#### 连接到远程Jupyter服务器[#](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_connect-to-a-remote-jupyter-server)

您可以通过连接到远程 Jupyter 服务器将 Jupyter Notebooks中的密集计算连接到其他计算机。连接后，代码单元在远程服务器上运行，而不是在本地计算机上运行。

要连接到远程Jupyter服务器：

1. 在状态工具栏中选择**Jupyter Server: local**按钮或运行命令面板（Ctrl+Shift+P）的 **Jupyter: Specify local or remote Jupyter server for connections**连接命令。

   ![指定远程Jupyter服务器](http://imagebed.krins.cloud/api/image/04VZVP68.png)

2. 当提示**选择如何连接到Jupyter**时，选择**现有：指定现有服务器的URI。**

   ![选择连接到现有服务器](http://imagebed.krins.cloud/api/image/HH48620X.png)

3. 当提示**输入 Jupyter 服务器的 URI**时，请向服务器的 URI（主机名）提供包含 URL 参数的认证令牌。（如果您在启用身份验证令牌的情况下在 VS 代码终端中启动服务器，则带有令牌的 URL 通常会显示在终端输出中，您可以从该输出中复制它。或者，在提供 URI 后，您还可以指定用户名和密码。`?token=`

   ![提示提供Jupyter服务器URI](http://imagebed.krins.cloud/api/image/R28Z6JH8.png)

> **注：**为了增加安全性，Microsoft 建议配置您的 Jupyter 服务器，并配备安全防范措施，如 SSL 和令牌支持。这有助于确保发送到 Jupyter 服务器的请求经过身份验证，并加密到远程服务器的连接。有关保护Notebooks电脑服务器的指导，请参阅[Jupyter 文档](https://jupyter-notebook.readthedocs.io/en/stable/public_server.html#securing-a-notebook-server)。

### 快捷键

#### Cell命令模式目前支持的Jupyter Notebook快捷

- Enter : 转入编辑模式
- Shift-Enter : 运行本单元，选中或插入（最后一个Cell的时候）下个单元
- Ctrl-Enter : 运行本单元
- Alt-Enter : 运行本单元，在其下插入新单元
- Y : 单元转入代码状态
- M :单元转入markdown状态 （目前尚不支持R 原生状态）
- Up : 选中上方单元
- K : 选中上方单元
- Down : 选中下方单元
- J : 选中下方单元
- A : 在上方插入新单元
- B : 在下方插入新单元
- D,D : 删除选中的单元
- L : 转换行号
- Shift-Space : 向上滚动
- Space : 向下滚动

#### Cell编辑模式下支持的Vscode快捷键（只描述与编辑相关的那些快捷键）

- Ctrl + X ：剪切/剪切行（空选定）
- Ctrl + C : 复制/复制行（空选定）
- Ctrl + Delete / Backspace :删除右边、左边的字
- Alt + ↑ / ↓ :向上/向下移动行
- Shift + Alt + ↓ / ↑ : 向上/向下复制行
- Ctrl + Shift + K : 删除行
- Ctrl + Shift + \ : 跳到匹配的括号
- Ctrl + ] / [ : 缩进/突出行
- Ctrl + ← / → : 光标到字首/字尾
- Ctrl + / : 切换行注释
- Shift + Alt + A : 切换块注释
- Ctrl + H : 查找/替换
  Vscode的查找快捷键 Ctrl + F 目前在Cell里不能用，但是替换快捷键可以使用，因此可以替代原本的查找功能

### 参考链接

[在VS Code 中使用Jupyter Notebooks](https://blog.csdn.net/acktomas/article/details/119616895)

[Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_intellisense-support-in-the-jupyter-notebook-editor)

[VSCode - Jupyter快捷键 ](https://www.cnblogs.com/gwzz/p/13385076.html)