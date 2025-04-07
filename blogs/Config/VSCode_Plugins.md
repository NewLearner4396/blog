---
title: VSCode好用的插件
date: 2022-08-15
tags:
 - plug
 - VSCode
categories:
 -  Config
---

## 我正使用的VSCode通用插件，亲测好用

注意：排名不分先后！！！

### 1. Chinese(Simplified)

![VSCode中文插件](http://imagebed.krins.cloud/api/image/JJZ0082D.png)

适用于 VS Code 的中文（简体）语言包，将编辑器英文部分翻译成中文，插件的英文就不适配了。

英文不好同学必备插件。

### 2. ~~Rainbow Brackets~~

![彩虹括号](http://imagebed.krins.cloud/api/image/D6N8P6T4.png)

用不同颜色将不同对括号分开。

![不同颜色括号](http://imagebed.krins.cloud/api/image/0ZXFRJ08.png)

由于该插件功能被VSCode内置，该插件已不再单独更新维护

VScode也有内置类似的插件：`Bracket Pair Colorizer 2`

在`settings.json`插入以下代码使能此插件：

```json
{
    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs":"active"
}
```

有一说一，内置插件这个默认括号对比配色真不好看

### 3.1 carbon-now-sh

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

有时会遇到bug，代码过长粘贴出来会换行，和复制前设置的不一样，不知道怎么回事

### 3.2 CodeSnap

![CodeSnap](https://imagebed.krins.cloud/api/image/H020B88B.png)

也可将代码转为图片

优点是不用跳转到网页操作

缺点是没有carbon-now-sh可选项那么多

### 4. Code Runner

![代码运行插件](http://imagebed.krins.cloud/api/image/8060PHV0.png)

代码运行插件

不同于调试，不需要配置`launch`、`task`文件就能运行代码进行测试，方便快捷，支持多种语言。

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

以及可用graph形式展示每次commit。

还有可视化操作rebase功能。

它还可以在编辑文件时显示何人何时修改过文件

还有plus会员服务，但我不需要，可以在`settings.json`中输入以下代码来取消此服务的推广：

```json
    "gitlens.plusFeatures.enabled": false,
```



### 6. Todo Tree

![TODO](http://imagebed.krins.cloud/api/image/J08RP42P.png)

记录代办的插件

搜索注释中的`TODO`等tag，单列出个列表方便查找。

码代码时有什么代办事项可以记录下来，避免忘记。

![TODO查找](http://imagebed.krins.cloud/api/image/0RXRJ64L.png)

我的配置如下：

```JSON
"todo-tree.highlights.defaultHighlight": {
        "type": "text-and-comment",
        "foreground": "#59ff00",
        "gutterIcon": true,
    },
    "todo-tree.highlights.customHighlight": {
        "TODO": {
            "icon": "pin",
            "foreground": "#fa903a",
        },
        "FIXME": {
            "icon": "tools",
            "foreground": "#ff3c00",
        },
        "HACK": {
            "icon": "bell",
            "foreground": "#ff00ee",
        },
        "NOTE": {
            "icon": "note",
            "foreground": "#00b7e4",
        },
        "BUG": {
            "icon": "stop",
            "foreground": "#ff0000",
        },
    },
    "todo-tree.general.tags": [
        "TODO",
        "NOTE",
        "HACK",
        "BUG",
        "FIXME",
        "FLAG",
        "XXX",
        "[ ]",
        "[x]",
    ],
```

### 7. ~~Setting Sync~~

![配置同步](http://imagebed.krins.cloud/api/image/R48VVX0P.png)

配置同步插件

登录到Github后可以将VSCode个人配置保存到Github中，方便多设备同步。

快捷键：

上传：`Shift + Alt + U`

下载：`Shift + Alt + D`

该插件功能也已被VSCode内置，将VSCode账户绑定自己github账户即可同步

### 8. Draw.io Integration

![DrawIO](http://imagebed.krins.cloud/api/image/N860VV8H.png)

在VSCode绘制流程图的插件

先新建一个后缀为`.drawio`的文件保存后打开即可使用此插件开始绘制流程图。

### 9.IntelliCode

![image-20221004193749413](http://imagebed.krins.cloud/api/image/2L08DLF6.png)

自动补全插件

比很多拓展内置的代码补全好用的多，尤其是Python的，功能强大！

### 10.GitHub Copilot

![GitHub Copilot](https://imagebed.krins.cloud/api/image/N2P4F226.png)

AI代码机器人，实时提供代码建议，用起来挺方便的

### 11. Error Lens

将Problem展示在有问题的那一行，方便查看。

### 12. Better Comments

使用标识符将注释渲染成不同的颜色方便查看。

### 13. commentTanslate

当光标悬浮在英文注释上时，可以将其翻译成中文悬浮显示。

搭配`tecentCloundTranslate`和`baiduTranslate`这两个插件，可以使用他们的API key获得翻译服务。
