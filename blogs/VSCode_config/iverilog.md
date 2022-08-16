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
3. Vivado、Quartus的编辑器没VSCode好用。

### 二、配置所需的VSCode插件😉

`以下插件在VSCode插件市场可直接安装，按Ctrl+Shift+X可直接呼出，搜Verilog即可看到以下三个插件`

1. Verilog-HDL/SystemVerilog/Bluespec SystemVerilog
   这个插件可以实现语法高亮、自动补齐、列出端口，配合iVerilog可以实现查找语法错误（只能查找语法错误，逻辑错误还需要自己写的时候细心:upside_down_face:）

   ![Verilog-HDL/SystemVerilog/Bluespec SystemVerilog](http://imagebed.krins.cloud/api/image/R2X0L20N.png)

2. Verilog_Testbench
   自动帮助例化和写Testbench的插件，十分好用，很省心。

   ![Verilog_Testbench](http://imagebed.krins.cloud/api/image/0Z4T4VD8.png)

   使用这个插件依赖chardet库，需要Python，请提前下载好Python并将其加入环境变量（在安装时有`add to PATH`这个选项直接勾上就好）

   Python下载地址：<https://mirrors.huaweicloud.com/python/>（下载3.7以上版本就好）

   安装好Python后在cmd（命令行）中写下`python --version`，能正确显示安装版本号即为安装正常。

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

`安装以下组件时安装路径请不要有空格和英文，会导致无法正常使用`

1. Ctags

   下载地址：<https://github.com/universal-ctags/ctags-win32/tags>

2. iVerilog（安装iVerilog时可以一起把GtkWave一起安装）

   下载地址：<http://bleyer.org/icarus/>
