---
title: 学生评教控制台脚本
date: 2022-12-17
tags:
 - Tips
categories:
-  Others
publish:false
---

## 使用脚本快速评教

评教选项太多，一个一个点过于麻烦，有人写了浏览器控制台脚本快速勾选，记录一下。

**教材评教**：

```console
Array(0, 5, 10, 15, 20).forEach(function(v) {$('input:radio').eq(v).prop('checked', 'true');});
document.querySelector("#sub").click();
```

教材评教的忘记截图了，但操作流程还教师评教是一样的，看下面步骤就好了。

**教师评教**:

```console
$("input[type=checkbox]").each(function() {    $(this).prop("checked", true);});
document.querySelector("#evaText").innerText = "我对老师感到很满意。";
document.querySelector("#main > form > table > tbody > tr:nth-child(20) > td > input[type=button]:nth-child(2)").click();
```

进入教师评教页面按`F12`，在弹出的窗口的上方点击控制台，在指示符后面粘贴上`教师评教代码`，按回车即可发现可选框都已被勾上啦😄

![0](https://imagebed.krins.cloud/api/image/860086ZH.png)

![1](https://imagebed.krins.cloud/api/image/XPPXRT2H.png)



**注意**！！！

- 代码为旧版本，新版评教系统更新了`推荐星级`，要自己手动打星。
- 新版系统还更新了`评语检测`，不能有重复的评语，需要自己更改一下。
