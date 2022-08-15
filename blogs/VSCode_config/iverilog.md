---
title: VSCode里Verilog的插件配置
date: 2022-8-15
tags:
 - VSCode
 - Verilog
categories:
 -  VSCode配置
---
## 记录如何配置Vscode从而方便地写Verilog

### 用VSCode写Verilog的原因🧐

1. VSCode打开迅速，比起Vivado、Quartus等IDE，简单查看或修改文件要方便的多；
2. 有时不需要大费周章建立工程，VSCode+iVerilog+GtkWave可以轻量化进行波形仿真（但还不能综合出RTL电路）；
3. Vivado、Quartus的编辑器没VSCode好用。

### 所需的VSCode插件😉

1. Verilog-HDL/SystemVerilog/Bluespec SystemVerilog
   代码高亮，配合iVerilog可以实现查找语法错误（只能查找语法错误，逻辑错误还需要自己写的时候细心:blush:）

   ![Verilog-HDL/SystemVerilog/Bluespec SystemVerilog](http://imagebed.krins.cloud/api/image/R2X0L20N.png)
2. Verilog_Testbench
   自动帮助例化和写Testbench的插件，十分好用，很省心。

   ![Verilog_Testbench](http://imagebed.krins.cloud/api/image/0Z4T4VD8.png)
3. Verilog Format
   （可选）:upside_down_face:快速将代码格式化，排列的更好看一点，习惯自己排版的可以不用。

   ![Verilog Format](http://imagebed.krins.cloud/api/image/VH4ZJHX2.png)
