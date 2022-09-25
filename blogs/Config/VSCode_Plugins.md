---
title: VSCode好用的插件
date: 2022-08-15
tags:
 - plug
 - VSCode
categories:
 -  Config
---

## 我正使用的VSCode插件，亲测好用

### 1. Chinese(Simplified)

![VSCode中文插件](http://imagebed.krins.cloud/api/image/JJZ0082D.png)

适用于 VS Code 的中文（简体）语言包，将编辑器英文部分翻译成中文，插件的英文就不适配了。

英文不好同学必备插件。

### 2. Rainbow Brackets

![彩虹括号](http://imagebed.krins.cloud/api/image/D6N8P6T4.png)

用不同颜色将不同对括号分开。

![不同颜色括号](http://imagebed.krins.cloud/api/image/0ZXFRJ08.png)

VScode也有内置类似的插件：`Bracket Pair Colorizer 2`

在`settings.json`插入以下代码使能此插件：

```json
{
    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs":"active"
}
```

### 3. carbon-now-sh

![代码截图工具](http://imagebed.krins.cloud/api/image/L66ZFTRN.png)

一个方便将代码渲染成好看的图片的插件

此插件其实是方便的将代码引导到一个在线小工具上:<https://carbon.now.sh/>，在VSCode选中代码后按`Alt + Win + A`或者按`Shift + P`后输入`carbon`即可进入此网站。

![carbon使用](http://imagebed.krins.cloud/api/image/RN004D4B.png)

1. 文本框内可编辑代码
2. 选择代码显示主题
3. 选择代码语言
4. 设置窗口样式
5. 可复制到剪贴板中方便插入
6. 可导出为文件保存

### 4. Code Runner

![代码运行插件](http://imagebed.krins.cloud/api/image/8060PHV0.png)

代码运行插件

不需要调试，不想配置`launch`、`task`文件就能运行代码进行测试，方便快捷，支持多种语言。

快捷键:

运行:`Ctrl + Alt + N`

停止:`Ctrl + Alt + M`

### 5. Github Theme

![Github代码主题](http://imagebed.krins.cloud/api/image/R2N2PL86.png)

Github代码主题，我很喜欢`Github Dark Dimmed`。

整体界面与代码渲染效果如下：

![代码渲染效果](http://imagebed.krins.cloud/api/image/ZRD6X268.png)

### 5. GitLens

![Git工具](http://imagebed.krins.cloud/api/image/XZ8BHZ66.png)

方便使用Git的插件

可能需要提前安装`Git Bash`

在VSCode直接与Github仓库连接，进行commit和push等操作。

![Git操作](http://imagebed.krins.cloud/api/image/V46L46LF.png)

注意commit后会弹出一个文件用来输入本次commit的描述，如果不写内容直接关掉的话会停止commit，请填写描述后保存再关闭文件。

它还可以在编辑文件时显示何人何时修改过文件

还有plus会员服务，但我不需要，可以在`settings.json`中输入以下代码来取消此服务的推广：

```json
    "gitlens.plusFeatures.enabled": false,
```



### 6. Todo Tree

![TODO](http://imagebed.krins.cloud/api/image/J08RP42P.png)

记录代办的插件

搜索注释中的`TODO:，单列出个列表方便查找。

码代码时有什么代办事项可以记录下来，避免忘记。

![TODO查找](http://imagebed.krins.cloud/api/image/0RXRJ64L.png)

### 7. Setting Sync

![配置同步](http://imagebed.krins.cloud/api/image/R48VVX0P.png)

配置同步插件

登录到Github后可以将VSCode个人配置保存到Github中，方便多设备同步。

快捷键：

上传：`Shift + Alt + U`

下载：`Shift + Alt + D`

### 8. Draw.io Integration

![DrawIO](http://imagebed.krins.cloud/api/image/N860VV8H.png)

在VSCode绘制流程图的插件

先新建一个后缀为`.drawio`的文件保存后打开即可使用此插件开始绘制流程图。

