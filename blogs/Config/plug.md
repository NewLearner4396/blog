---
title: VSCode好用的插件
date: 2022-08-23
tags:
 - plug
 - VSCode
categories:
 -  Config
---

## VSCode正使用的插件，亲测好用

### 1.Rainbow Brackets

用不同颜色将不同对括号分开

![不同颜色括号](http://imagebed.krins.cloud/api/image/0ZXFRJ08.png)

VScode也有内置类似的插件：`Bracket Pair Colorizer 2`

在`settings.json`插入以下代码使能此插件：

```json
{
    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs":"active"
}
```

