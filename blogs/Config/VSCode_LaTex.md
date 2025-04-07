---
title: VSCode编写LaTeX的相关配置
date: 2022-08-18
tags:
 - LaTeX
 - VSCode
categories:
 -  Config
---

## 在VSCode用LaTeX愉快地书写文章

### Tex环境安装

可选TeX Live或MikTeX。MiKTeX的安装包较小，且需要的宏包可以在需要用到的时候再下载，相对不占磁盘空间，我个人使用的是MiKTex。关于两者更多的区别可以查看此篇文章：[（译）在Windows上使用TeX：TeX Live与MiKTeX的对比](https://www.cnblogs.com/liuliang1999/p/12656706.html)，根据自己实际需求选用。

TeX Live安装可自行阅读此篇教程：[Visual Studio Code (vscode)配置LaTeX](https://zhuanlan.zhihu.com/p/166523064)

下面介绍MIKTeX安装

参考：[MiKTeX安装](https://blog.csdn.net/hengjiu_123/article/details/110390092)

下载地址：<https://miktex.org/download>

打开安装程序后选择安装对象（我选择为所有人安装）、安装路径后一直下一步即可。

在cmd输入`tex --version`可确认是否安装成功

### 安装VSCode插件：LaTeX Workshop

[安装LaTeX Workshop]**此处本是拓展的截图**

### 修改插件设置

在VSCode中按`F1`或`Ctrl + Shift + P`，搜索`打开用户设置（JSON）`

在括号内输入以下指令

```JSON
	// 选择保存后自动编译，想手动编译可调整为"never"
	"latex-workshop.latex.autoBuild.run": "onSave",
	// 使能菜单，在左侧栏
    "latex-workshop.showContextMenu": true,
	// 使能自动补全命令
    "latex-workshop.intellisense.package.enabled": true,
    // 编译出错时弹出气泡提醒出错，警告信息不要
	"latex-workshop.message.error.show": true,
    "latex-workshop.message.warning.show": false,
    // 设置编译工具，“%DOCFILE%”使得支持编译中文名称文件
	// "-output-directory=%OUTDIR%"设置输出位置
	"latex-workshop.latex.tools": [
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-output-directory=%OUTDIR%",
                "%DOCFILE%"
            ]
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ]
        },
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "-outdir=%OUTDIR%",
                "%DOCFILE%"
            ]
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
                "%DOCFILE%"
            ]
        },
        {
            "name": "biber",// 用于biblatex宏包的编译
              "command": "biber",
              "args": [
                "--input-directory=%OUTDIR%",
                "--output-directory=%OUTDIR%",
                  "%DOCFILE%"
              ]
        }
    ],
	// 设置编译链
    "latex-workshop.latex.recipes": [
        {
            "name": "XeLaTeX",
            "tools": [
                "xelatex"
            ]
        },
        {
            "name": "PDFLaTeX",
            "tools": [
                "pdflatex"
            ]
        },
        {
            "name": "BibTeX",
            "tools": [
                "bibtex"
            ]
        },
        {
            "name": "LaTeXmk",
            "tools": [
                "latexmk"
            ]
        },
        {
            "name": "xelatex -> bibtex -> xelatex*2",
            "tools": [
                "xelatex",
                "bibtex",
                "xelatex",
                "xelatex"
            ]
        },
        {
            "name": "pdflatex -> bibtex -> pdflatex*2",
            "tools": [
                "pdflatex",
                "bibtex",
                "pdflatex",
                "pdflatex"
            ]
        },
        {
            "name": "pdflatex -> biber -> pdflatex*2",
            "tools": [
                "pdflatex",
                "biber",
                "pdflatex",
                "pdflatex"
            ]
        },
    ],
	// 设置编译失败后清除文件
    "latex-workshop.latex.clean.fileTypes": [
        "*.aux",
        "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.ist",
        "*.fls",
        "*.log",
        "*.fdb_latexmk"
    ],
    "latex-workshop.latex.autoClean.run": "onFailed",
	// 默认选择上一次使用的编译链
    "latex-workshop.latex.recipe.default": "lastUsed",
	// Ctrl+点击进行预览与文本的双向定位
    "latex-workshop.view.pdf.internal.synctex.keybinding": "ctrl-click",
    // 不使用外部PDF编辑器进行预览，这一项选择"tab"，如需外部的选择"external"
	"latex-workshop.view.pdf.viewer": "tab",
	// 设置输出目录为当前文件夹以编译文件命名的输出目录
	"latex-workshop.latex.outDir": "%DIR%/%DOCFILE%_out",
```

如需使用外部PDF编辑器添加以下代码(先将上文提到的`"latex-workshop.view.pdf.viewer": "tab",`指令删除)：

```json
    // 使用外部编辑器
	"latex-workshop.view.pdf.viewer": "external",
	// 外部编辑器打开路径
    "latex-workshop.view.pdf.external.viewer.command": "C:/.../SumatraPDF.exe",
    "latex-workshop.view.pdf.external.viewer.args": [
        "-forward-search",
        "%TEX%",
        "%LINE%",
        "-reuse-instance",
        "-inverse-search",
        // VSCode打开路径
        "\"C:/.../Microsoft VS Code/Code.exe\" \"C:/.../Microsoft VS Code/resources/app/out/cli.js\" -gr \"%f\":\"%l\"",
        "%PDF%"
    ],
```

**不要清理生成的名字中带 synctex 的文件，否则就不能进行正向和反向搜索；**

- 正向同步（tex → pdf）：`Ctrl + Alt + j`
- 反向同步（pdf → tex）：`double click`

### 测试

首先新建一个`.tex`文件

```latex
\documentclass{article}
\usepackage{lipsum}
\begin{document}
    \centering
    Hello!World!
\end{document}
```

点击右上角绿色三角形进行编译，再点击旁边的按钮进行预览

![测试](http://imagebed.krins.cloud/api/image/BPR6ZBN4.png)

![具体效果](http://imagebed.krins.cloud/api/image/66402242.png)

---

**关于该插件更多用法请查看官方文档：**<https://github.com/James-Yu/LaTeX-Workshop/wiki>

---

### 参考链接

[使用VSCode编写LaTeX](https://zhuanlan.zhihu.com/p/38178015)

[Visual Studio Code (vscode)配置LaTeX](https://zhuanlan.zhihu.com/p/166523064)
