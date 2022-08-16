---
title: VSCode里Verilog的插件配置
date: 2022-8-15
tags:
 - Verilog
categories:
 -  VSCode配置
---
## 记录如何配置Vscode从而方便地写Verilog

### 一、用VSCode写Verilog的原因🧐

1. VSCode打开迅速，比起Vivado、Quartus等IDE，简单查看或修改文件要方便的多；
2. 有时不需要大费周章建立工程，VSCode+iVerilog+GtkWave可以轻量化进行波形仿真（但还不能综合出RTL电路）；
3. Vivado、Quartus的编辑器没VSCode好用，而且VSCode有很多很方便的插件可以用。

### 二、配置所需的VSCode插件😉

`以下插件在VSCode插件市场可直接安装，按Ctrl+Shift+X可直接呼出，搜Verilog即可看到以下三个插件`

1. Verilog-HDL/SystemVerilog/Bluespec SystemVerilog
   这个插件可以实现语法高亮、自动补齐、列出端口，配合iVerilog可以实现查找语法错误（只能查找语法错误，逻辑错误还需要自己写的时候细心:upside_down_face:）

   ![Verilog-HDL/SystemVerilog/Bluespec SystemVerilog](http://imagebed.krins.cloud/api/image/R2X0L20N.png)

2. Verilog_Testbench
   自动帮助例化和写Testbench的插件，十分好用，很省心。

   ![Verilog_Testbench](http://imagebed.krins.cloud/api/image/0Z4T4VD8.png)

   这个插件依赖chardet库，需要Python，请提前下载好Python并将其加入环境变量（在安装时有`add Python to PATH`这个选项直接勾上就好）

   Python下载地址：<https://mirrors.huaweicloud.com/python/>（下载3.7以上版本就好）

   安装好Python后在cmd（命令行）中写下`python --version`，能正确显示安装版本号即为安装正常。

   如果命令行出现`‘python’不是内部或外部命令`,则说明`python.exe`的路径没有加入到环境变量，我们在手动添加一下。

   首先我们要检查一下python是否成功安装：开始菜单中有python相关程序即为成功。
   ![Python相关程序](http://imagebed.krins.cloud/api/image/644B2H2V.png)

   点击这个黑色的编辑器，分别输入`import sys`,`sys.path`,即可找到Python安装路径（一般倒数第二个就是要找的路径），复制一下。

   ![Python安装路径](http://imagebed.krins.cloud/api/image/BX0D602L.png)

   按`Win+s`呼出系统搜索，搜索“系统变量”，打开。

   ![搜索系统变量](http://imagebed.krins.cloud/api/image/NH82R26Z.png)

   选择环境变量。

   任选一个`Path`,双击，新建，粘贴上刚复制的路径，注意把每个双斜线删成单斜线。
   ![新增系统变量](http://imagebed.krins.cloud/api/image/40RX0X0N.png)
   之后在cmd中输入`pip install chardet`，安装chardet。

   如果下载过慢或出错，可以使用国内镜像站下载，使用命令如下：

   `pip install chardet -i https://pypi.tuna.tsinghua.edu.cn/simple`
  
   如若清华这个的镜像站挂了，可以试试以下几个镜像站

   `http://mirrors.aliyun.com/pypi/simple/`

   `https://pypi.mirrors.ustc.edu.cn/simple/`

   `http://pypi.douban.com/simple/`

   使用`pip list`这个命令可以查看已安装的库，输出列表中有chardet即可。
   因为`Verilog_Testbench`这个插件是将生成的testbench输出在VSCode的命令行内，还需要自己手动生成文件并把它复制过去，有点麻烦，所以我们可以写一个脚本，每次使用这个插件的时候就调用它。
   具体步骤如下：

   1. 用管理员身份打开PowerShell；
   2. 分别输入`echo $profile`，`code $profile`
   3. 输入

   ```Bash
   function createtb_function{
    param(
        [Parameter(ValueFromPipeline=$true)]
        $InputObject
    )
    $FileName = $InputObject
    $tbFileName = "tb_" + $FileName.split("\")[-1]
    echo $tbFileName
    python $env:TestBenchPath $FileName >> $tbFileName}

   set-alias ll Get-ChildItemColor  

   $env:TestBenchPath="C:\Users\22306\.vscode\extensions\truecrab.verilog-testbench-instance-0.0.5\out\vTbgenerator.py"

   set-alias createtb createtb_function
   ```

   注意要把`$env:TestBenchPath="C:\Users\22306\.vscode\extensions\truecrab.verilog-testbench-instance-0.0.5\out\vTbgenerator.py"`改成自己的路径，一般把`22306`改成自己的用户名就好了。

   还有一件事，Windows系统下默认是不允许用户自己的没有数字签名的脚本的，所以我们还要多一步。

   用管理员身份打开Powershell，输入`set-executionpolicy remotesigned`，后按`Y`，即可成功设置。

   可以用`get-executionpolicy`命令查看当前策略，如果显示`RemoteSigned`，就代表设置成功了。

   以上我们就把`Verilog_Testbench`这个插件配置好了。写完一个.v文件想生成它的testbench的话，在终端（按Ctrl+~可呼出）输入createtb xxx.v(xxx为你的文件名)就可以看到在同目录下新建了一个tb_xx.v文件，这就是自动生成的Testbench。该插件会自动生成时钟并例化好模块，自己再按需求修改一下就可以直接仿真啦。

   但要注意它的默认编码不是`UTF_8`，仿真时会出错，要在VSCode右下角修改编码。点击右下角的当前编码，选择`通过编码重新保存`，选择`UTF_8`（推荐）或者`gbk`。
   ![修改编码并保存](http://imagebed.krins.cloud/api/image/08T028P0.png)
3. Verilog Format
   （可选）:blush:快速将代码格式化，排列的更好看一点，习惯自己排版的可以不用。

   ![Verilog Format](http://imagebed.krins.cloud/api/image/VH4ZJHX2.png)

`以下组件需要额外下载和安装`

1. Ctags

   下载地址：<https://github.com/universal-ctags/ctags-win32/tags>
   选择不带日期的版本号点进去，一般选择x64版本安装。
   ![Ctags下载](http://imagebed.krins.cloud/api/image/4T02084Z.png)
   下载完后解压，尤其注意路径不能有中文和空格。之后把`Ctags.exe`，这个文件所在路径复制，按照上文提到的方法添加进环境变量里。

   可以在命令行输入`Ctags --version`确认是否成功添加。

2. iVerilog

   下载地址：<http://bleyer.org/icarus/>

   安装iVerilog注意事项：

      1. 安装路径不能有空格和中文，不然不能正常工作。

      2. 安装iVerilog时选择把GtkWave一起安装。

      3. 安装时勾选`Add to PATH`,不然要自己手动添加路径到环境变量。

      4. 在命令行输入`iverilog`确认是否正确安装。

Ctags和iVerilog安装完我们就要配置插件`Verilog-HDL/SystemVerilog/Bluespec SystemVerilog`了。
`Ctrl+Shift+X`呼出拓展菜单，找到`Verilog-HDL/SystemVerilog/Bluespec SystemVerilog`,点击右下角的齿轮，选择拓展设置。
![找到Verilog-HDL/SystemVerilog/Bluespec SystemVerilog拓展设置](http://imagebed.krins.cloud/api/image/40X0220V.png)
具体设置如下：

1. 在`Ctags：path`这一栏填写`Ctags.exe路径`或只写`Ctags`即可。
   ![Ctags路径设置](http://imagebed.krins.cloud/api/image/NP4FP2DT.png)

2. 在`linting>Iverilog:Arguments`中填写`-i`,避免Iverilog报`Unknown Type`类型错误。
   ![Iverilog参数修正](http://imagebed.krins.cloud/api/image/V600V2X2.png)

3. `Linting:linter`选择`iverilog`

配置完之后重启VSCode，打开一个.v文件就可以跳转定义和自动纠错啦。
将鼠标放在一个变量名上可以看到它的定义，按住`Ctrl`再点击变量可以直接跳转到定义。
![跳转定义](http://imagebed.krins.cloud/api/image/B0BV24B2.png)

自动纠错也能正常运行，语法错误部分有红色波浪线标注。但要注意iverilog检查的是已保存的文件，每次修改完保存一下才能看到正确的检查结果。按`Ctrl+Shift+M`，可以在VSCode下方看到当前文件所以问题，单击问题即可跳转到问题所在行。
![错误检查](http://imagebed.krins.cloud/api/image/XN6JBR8X.png)

### 将vivado文本编辑器修改为VSCode

打开vivado，点击左上角的`Tools`，再点击`Settings...`
![打开vivado_Settings](http://imagebed.krins.cloud/api/image/4FR8NF40.png)

选择`Text Editor`，下拉框选择`Customer Editor...`，点击旁边的三个点，在文本框中输入`VSCode.exe的绝对路径 [file name]:[line number]`
![调整编辑器到VSCode](http://imagebed.krins.cloud/api/image/0TZ8Z004.png)

注意不要先打开vivado之后，在vivado里选中文件打开，会导致vivado所有相关文件都用vscode打开，会特别卡，出现这种情况就用任务管理器终止掉VSCode这个进程，然后手动打开VSCode，再通过vivado打开要查看和修改的文件就可以了。也就是，不能不打开VSCode，就直接用vivado打开文件。
