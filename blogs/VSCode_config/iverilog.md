---
title: 使用VSCode搭建Verilog环境
date: 2022-8-15
tags:
 - VSCode
 - Verilog
categories:
 -  VSCode配置
---
## Vscode中关于Verilog的全部配置，打造一个顺手的编辑器

### 使用VSCode进行编写Verilog的原因

1. VSCode打开很快，比起Vivado、Quartus等IDE迅速的多，简单查看个文件要方便的多；
2. 写个小模块查看仿真波形不需要大费周章建一个工程，利用iVerilog+GtkWave即可；
3. Vivado、Quartus的内置编辑器没有VSCode好用。

### 所用到的VSCode插件

1. Verilog-HDL/SystemVerilog/Bluespec SystemVerilog
  <!-- TODO:图床插件还要找ljgg修 -->
2. Verilog_Testbench