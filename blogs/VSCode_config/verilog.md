---
title: VSCode里Verilog的插件配置
date: 2022-8-15
tags:
 - Verilog
categories:
 -  VSCode配置
---


## 记录如何配置Vscode从而方便地写Verilog

- [记录如何配置Vscode从而方便地写Verilog](#记录如何配置vscode从而方便地写verilog)
  - [零、写在开头🤣](#零写在开头)
  - [一、用VSCode写Verilog的原因🧐](#一用vscode写verilog的原因)
  - [二、配置所需的VSCode插件😉](#二配置所需的vscode插件)
  - [三、将vivado文本编辑器修改为VSCode😋](#三将vivado文本编辑器修改为vscode)
  - [四、使用Iverilog+GtkWave进行简单的波形仿真🤗](#四使用iveriloggtkwave进行简单的波形仿真)
  - [五、参考资料🤪](#五参考资料)

### 零、写在开头🤣

VSCode是一个用着十分舒心的编辑器，搭配上各种插件，可以帮助我们跳过许多繁琐的操作。之前为了避开vivado难用的编辑器，配置我的VSCode折腾了好久，踩了不少坑。于是整理此文档供后人使用。

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

### 三、将vivado文本编辑器修改为VSCode😋

打开vivado，点击左上角的`Tools`，再点击`Settings...`

![打开vivado_Settings](http://imagebed.krins.cloud/api/image/4FR8NF40.png)

选择`Text Editor`，下拉框选择`Customer Editor...`，点击旁边的三个点，在文本框中输入`VSCode.exe的绝对路径 [file name]:[line number]`

![调整编辑器到VSCode](http://imagebed.krins.cloud/api/image/0TZ8Z004.png)

注意不要直接在vivado里选中文件打开，会导致vivado所有相关文件都用vscode打开，会特别卡，出现这种情况就用任务管理器终止掉VSCode这个进程，然后手动打开VSCode，再通过vivado打开要查看和修改的文件就可以了。也就是，不能不打开VSCode，就直接用vivado打开文件。

### 四、使用Iverilog+GtkWave进行简单的波形仿真🤗

1. Icarus Verilog编译器介绍

   1. iverilog：用于编译verilog和vhdl文件，进行语法检查，生成可执行文件；
   2. vvp：根据可执行文件，生成仿真波形文件；
   3. gtkwave：用于打开仿真波形文件，图形化显示波形。

2. iverilog常用参数介绍

   在终端输入iverilog回车，可以看到常用参数使用方法的简单介绍：

   ```LUA
   Usage: iverilog [-EiSuvV] [-B base] [-c cmdfile|-f cmdfile]
                  [-g1995|-g2001|-g2005|-g2005-sv|-g2009|-g2012] [-g<feature>]
                  [-D macro[=defn]] [-I includedir]
                  [-M [mode=]depfile] [-m module]
                  [-N file] [-o filename] [-p flag=value]
                  [-s topmodule] [-t target] [-T min|typ|max]
                  [-W class] [-y dir] [-Y suf] [-l file] source_file(s)

   See the man page for details.
   ```

   1. -o
      用于指定生成文件的名称。如：`iverilog -o test test.v`。如果不指定，默认生成文件名为a.out。

   2. -y
      用于指定包含文件夹，如果top.v中调用了其他的的.v模块，top.v直接编译会提示。

      比如直接编译led_demo_tb.v，会报以下错误：

      ```LUA
      led_demo_tb.v:38: error: Unknown module type: led_demo
      2 error(s) during elaboration.
      *** These modules were missing:
            led_demo referenced 1 times.
      ***
      ```

      找不到调用的模块，那么就需要指定调用模块所在文件夹的路径，支持相对路径和绝对路径。

      如：`iverilog -y D:/test/demo led_demo_tb.v`

      如果是同一目录下：`iverilog -y ./ led_demo_tb.v`

      另外，iverilog还支持Xilinx、Altera、Lattice等FPGA厂商的仿真库，需要在编译时通过-y参数指定库文件的路径，详细的使用方法可以查看官方用户指南：<https://iverilog.fandom.com/wiki/User_Guide>

   3. -tvhdl

      iverilog还支持把verilog文件转换为VHDL文件，如`iverilog -tvhdl -o out_file.vhd in_file.v`

3. 操作流程示例

   1. 首先创建要编译的文件

      `led_demo.v`   每10个时钟，LED翻转一次

      ```Verilog
      module led_demo(
         input clk,
         input rst_n,

         output reg led
      );

         reg [7:0] cnt;

         always @ (posedge clk)
         begin
            if(!rst_n)
               cnt <= 0;
            else if(cnt >= 10)
               cnt <= 0;
            else 
               cnt <= cnt + 1;
         end

         always @ (posedge clk)
         begin
            if(!rst_n)
               led <= 0;
            else if(cnt == 10)
               led <= !led;
         end

      endmodule 
      ```

      `led_demo_tb.v`   仿真激励文件

      ```verilog
      `timescale 1ns/100ps
      module led_demo_tb;

         parameter SYSCLK_PERIOD = 10;

         reg SYSCLK;
         reg NSYSRESET;

         led_demo led_demo_ut0 (
            // Inputs
            .rst_n(NSYSRESET),
            .clk(SYSCLK),

            // Outputs
            .led( led)
         );

         initial
         begin
            SYSCLK = 1'b0;
            NSYSRESET = 1'b0;
         end

         initial
         begin
            #(SYSCLK_PERIOD * 10 )
               NSYSRESET = 1'b1;
            #1000
               $stop;
         end

         always @(SYSCLK)
            #(SYSCLK_PERIOD / 2.0) SYSCLK <= !SYSCLK;

         /*iverilog */
         initial
         begin            
            $dumpfile("wave.vcd");        //生成的vcd文件名称,仿真信息将记录到此文件
            $dumpvars(0, led_demo_tb);    //指定层次数为0，则led_demo_tb模块及其下面各层次的所有信号将被记录
         end
         /*iverilog */

      endmodule
      ```

      注意仿真文件中的这一段是必须的，否则不能生成.vcd文件。

      ```verilog
      initial
            begin            
               $dumpfile("wave.vcd");        //生成的vcd文件名称,仿真信息将记录到此文件
               $dumpvars(0, led_demo_tb);    //指定层次数为0，则led_demo_tb模块及其下面各层次的所有信号将被记录
            end
      ```

   2. 编译

      将命令行cd到上述文件所在目录。

      通过`iverilog -o wave led_demo_tb.v led_demo.v`命令，对源文件和仿真文件，进行语法规则检查和编译。

      由于本示例比较简单，只有1个文件，如果调用了多个.v的模块，可以通过前面介绍的`-y`参数指定源文件的路径，否则编译报错。

      如果源文件都在同同一个目录，可以直接通过./绝对路径的方式来指定。
      例如，led_demo_tb.v中调用了led_demo.v模块，就可以直接使用`iverilog -o wave -y ./ led_demo.v led_demo_tb.v`来进行编译。

      如果编译成功，会在当前目录下生成名称为`wave.out`的文件。

   3. 生成波形文件

      使用`vvp -n wave -lxt2`命令生成vcd波形文件，运行之后，会在当前目录下生成.vcd文件。

      其中`-n`命令是为了结束之前的仿真避免数据出错。`wave`是执行我们之前编译之后生成的`wave.out`文件。

      `-lxt2`是以lxt2形式生成`.vcd`文件，可以不加。

   4. 打开波形文件

      使用命令`gtkwave wave.vcd`，即可在图形化界面中查看仿真的波形图。

4. Verilog转换为VHDL

   虽然VHDL和Verilog都诞生于20世纪80年代，而且都属于硬件描述语言（HDL），但是二者的语法特性却不一样。Icarus Verilog 还有一个小功能就是支持把使用Verilog语言编写的.v文件转换为VHDL语言的.vhd文件。

   如把`led_demo.v`文件转换为VHDL文件`led_demo.vhd`，使用命令`iverilog -tvhdl -o led_demo.vhd led_demo.v`。

   因为Verilog和VHDL是不同的语法规则，不能直接使用Verilog的标准来检查VHDL文件的语法。需要添加`-g2012`参数来对VHDL文件进行编译，如`iverilog -g2012 led_demo.vhd`，和Verilog一样，同样也支持Testbech文件的编译和仿真，当然需要编写对应的VHDL Testbench文件。

5. 小tips

   结合自动生成testbench插件和用户代码，我们可以在写完`.v`文件后快速写完激励文件。

   用户代码配置如下：

   1. 在VSCode中选择`文件-首选项-配置用户代码片段`

      ![配置用户代码片段](http://imagebed.krins.cloud/api/image/LVZ8Z2J4.png)

   2. 在弹出的文本框中输入`verilog`，配置`.v`文件专用代码片段。

      ![配置verilog专用片段](http://imagebed.krins.cloud/api/image/8ZLZJ82F.png)

   3. 在大括号内输入以下代码：

      ```verilog
      "波形文件":{
         "prefix": "vcd",
         "body": [
            "/*生成仿真所需的vcd文件*/",
            "initial begin",
            "    $$dumpfile(\"wave.vcd\"); //指定生成的vcd文件名称为wave.vcd,仿真信息将记录到此文件",
            "    $$dumpvars(0, tb_$1 ); //指定层次数为0,则tb模块及其下面各层次的所有信号将被记录",
            "end",
         ],
         "description": "生成波形文件"
      }
      ```

   保存之后在`.v`文件中输入`vcd`就可选择替换成此代码块。

### 五、参考资料🤪

1. [Vivado加上VsCode让你的生活更美好](https://blog.csdn.net/qq_39498701/article/details/84668833)
2. [用VSCode编辑verilog代码、iverilog编译、自动例化、自动补全、自动格式化等常用插件](https://zhuanlan.zhihu.com/p/338497672)
3. [全平台轻量开源verilog仿真工具iverilog+GTKWave使用教程](https://www.cnblogs.com/whik/p/11980103.html)
