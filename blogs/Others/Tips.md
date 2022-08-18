---
title: 记录折腾过程中遇到的坑
date: 2022-8-19
tags:
 - Tips
categories:
- Others  
---

## 遇到的小问题的可能原因与解决方案😅

### 1. markdown的用户代码配置

因为博客的Markdown需要一个`yawl`格式的头部代码，于是想做成`代码块`，这样就不用每次都复制粘贴。

写的效果如下：

```JavaScript
    "博客开头":{
        "prefix": "blog_start",
        "body": [
            "---",
            "title: $1",
            "date: $2",
            "tags:",
            " - $3",
            "categories:",
            "-  $4",
            "---",
        ],
        "description": "博客开头的yaml标签"
    }
```

但是在`.md`文件中却不能调用:upside_down_face:，查了一下是因为`VSCode`默认没开`Markdown`的用户代码片段，要在`VSCode`的`settings.json`中加入这么一段话：

```JavaScript
    "[markdown]":{
        "editor.quickSuggestions": {
            "other": "on", //是否在除了注释和字符串内启用快速建议
            "comments": "off",//是否在注释内启用快速建议
            "strings": "off" //是否在字符串内启用快速建议
        },
    },
```

这样，在`Markdown`文件中就可以调用我在`markdown.json`中写的代码块了。

参考资料链接：[VS Code中markdown文件内为什么用户代码片段无法生效？](https://www.zhihu.com/question/370485701)

### 2. git bash的代理设置

之前要将本地仓库的更改push到github的话，我是用的`github desktop`这款软件，图形化界面，打开代理后简单点两下就完成了。但后来想尝试一下用VSCode的`gitlens`来直接push，这样就不用再开一个软件了。但因为我是host代理，我又不想全局代理，那样会很麻烦，于是导致gitlens一直用不了我的代理，所以我只能在VSCode里开一个`git bash`终端，用`git指令`手动上传。在git里我`push`的时候一直报错:upside_down_face:，原因是我设置代理一直用的是`https`的协议接口，换成`http`协议就好了。

不设置代理的报错如下：

```git
fatal: unable to access 'https://github.com/NewLearner4396/blogs/': Failed to connect to github.com port 443: Timed out
```

代理设置如下：

```git
git config https.proxy https://127.0.0.1:4780
```

设置完代理报错如下：

```git
fatal: unable to access 'https://github.com/NewLearner4396/blogs/': schannel: failed to receive handshake, SSL/TLS connection failed
```

后来取消了原来的代理，改成了：

```git
git config http.proxy http://127.0.0.1:4780
```

就能正常push了。

参考资料链接：[git clone出现 fatal: unable to access 'https://github.com/...'的解决办法(亲测有效)](https://blog.csdn.net/dashi_lu/article/details/89641778)
