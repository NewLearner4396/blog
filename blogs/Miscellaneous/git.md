---
title: git的常见用法
date: 2025-01-06
tags:
 - Git
categories:
- Miscellaneous  
---

## git的常见用法

### 基本常见指令

```cmd
git add . # 添加所有文件进暂存区
git add -a # 添加所有修改的文件进暂存区
git commit -m "commit message"
git push origin Branch_name
git fetch #命令从远程仓库获取最新的提交和更新，但不会自动合并这些更改到你的本地分支。它只是更新你的本地远程跟踪分支（例如 origin/main），你需要手动合并这些更改。
git pull # git fetch 和 git merge 的组合。它从远程仓库获取最新的提交和更新，然后自动将这些更改合并到你的当前分支。
```

### 新建远程仓库

可在网页端操作，也可用`GitHub.cli`工具在命令行操作

```cmd
# 安装GitHub.cli
winget install --id GitHub.cli
```

重启终端

```cmd
# 登录账号
gh auth login

# 创建仓库
gh repo create <repository_name> --private(or --public) --source=. --remote=origin
# 也可使用 gh repo create以迭代交互的形式创建仓库

# 列出账号下所有远程仓库
gh repo list <你的GitHub用户名>
```

### 初始化本地文件夹

```cmd
git init
git add .
git commit -m "initial commit"
git push -u origin master
# -u 选项用于设置默认的上游分支。这样在后续的 git pull 和 git push 操作中，你可以省略远程分支的名称。即，直接使用git push/pull即可。
```

### Large File Storage

一般建议仓库保持较小，理想情况下小于 1 GB，强烈建议小于 5 GB。

github对上传大于50MB的文件会发出警告并禁止直接上传超过100MB大小的文件，注意如果通过浏览器将文件添加到存储库，该文件不得大于 25 MB。

对个人用户，LFS用于在仓库之外上传并存储不超过2GB的文件，以及拒绝处理5GB以上的文件

LFS会生成一个text pointer用于被仓库跟踪，这样避免每次pull或push都要处理大文件耗时太长

```cmd
# 安装Git LFS
winget install --id Git.LFS
# 验证安装
git lfs --version

# 在仓库本地文件夹内初始化lfs
git lfs install
# 跟踪大文件并生成.gitattributes
git lfs track "path_to_largefile"
# 将文件添加到 Git
git add .gitattributes
git add path_to_largefile
```

### 从仓库的历史记录中删除文件

#### 删除在未推送的提交中添加的文件

```cmd
# Stage our giant file for removal, but leave it on disk
git rm --cached GIANT_FILE
git rm --cached -r GIANT_Dir

# Amend the previous commit with your change
# Simply making a new commit won't work, as you need
# to remove the file from the unpushed history as well
git commit --amend -CHEAD
git push
```

#### 删除之前提交中添加的文件

如果不想安装其他工具，可以使用交互式变基删除有问题的提交。 要执行此操作：

- 必须知道是哪些提交添加或修改了相关文件。
- 这些提交必须只属于一个分支。
- 这些提交所在的这个分支自应用提交以来不得进行任何合并。

或者使用`git filter-repo`:[从存储库中删除敏感数据](https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

### git rm

`git rm` 命令用于从 Git 仓库中删除文件。它不仅会从工作目录中删除文件，还会将删除操作记录到暂存区，以便在下一次提交时生效。

```cmd
# 删除文件
git rm file1 file2 file3
# 删除文件夹
git rm -r directory
# 如果希望从 Git 仓库中删除文件，但保留工作目录中的文件，则使用 --cached 选项
git rm --cached filename
# 如果文件已经被修改且未提交，Git 默认不会删除这些文件。你可以使用 -f 或 --force 选项强制删除这些文件
git rm -f filename
```

### git merge

将一个或多个分支的更改合并到当前分支`git merge <branch-name>`

[官方介绍](https://git-scm.com/docs/git-merge/zh_HANS-CN)

### 合并策略

1. **快速前进合并（Fast-forward merge）**： 如果当前分支是目标分支的直接祖先，Git 会简单地将当前分支指向目标分支。这是默认行为。
2. **非快速前进合并（Non-fast-forward merge）**： 如果当前分支不是目标分支的直接祖先，Git 会创建一个新的合并提交。
3. **强制非快速前进合并**： 即使可以进行快速前进合并，也强制创建一个新的合并提交：`git merge --no-ff <branch-name>`

### git rebase

`git rebase` 命令用于轻松更改一系列提交，修改存储库的历史记录。 您可以重新排序、编辑提交或将提交压缩到一起。

使用git rebase Git将启动默认文本编辑器并且打开一个文件，其中详细说明了所选范围的提交信息。

​	您选择要变基的提交按最早更改（顶部）到最新更改（底部）的顺序存储。

​	每行列出一个命令（默认为 `pick`）、提交 SHA 和提交消息。 整个 `git rebase` 过程以这三列的操作为中心。 做出的更改将变基到存储库。

```cmd
# 对另一个分支与当前分支状态之间的所有提交变基
git rebase --interactive OTHER-BRANCH-NAME
# 变基当前分支中最近的几个提交
git rebase --interactive HEAD~7
```

可用命令

- *pick*  `pick` 只表示包含提交。 在变基进行时重新排列 `pick` 命令的顺序会更改提交的顺序。 如果选择不包含提交，应删除整行。

- *reword*  `reword` 命令类似于 `pick`，但在使用后，变基过程就会暂停，让你有机会改变**提交消息**。 提交所做的任何更改都不受影响。

- *edit*  如果选择 `edit` 提交，你将有机会修订提交，也就是说，可以完全添加或更改提交。 您也可以创建更多提交后再继续变基。 这样您可以将大提交拆分为小提交，或者删除在提交中执行错误更改。 当git执行到这一步时会停止并显示

```shell
  You can amend the commit now, with
  
          git commit --amend
  
  Once you are satisfied with your changes, run
  
          git rebase --continue
```

此时您可以编辑项目中的任何文件以进行任何额外的更改。 对于你所做的每项更改，都需要执行新的提交，可以通过输入 `git commit --amend` 命令来执行此操作。 完成所有更改后，即可运行 `git rebase --continue`。

- *squash*  此命令可用于将两个或以上的提交合并为一个。 下面的提交压缩到其上面的提交。 Git 让您有机会编写描述两次更改的新提交消息。

- *fixup* 这类似于 `squash`，但要合并的提交丢弃了其消息。 提交只是合并到其上面的提交，之前提交的消息用于描述两次更改。

- *exec* 这可让您对提交运行任意 shell 命令。 

[在命令行中使用 Git rebase的简短教程](https://docs.github.com/zh/get-started/using-git/using-git-rebase-on-the-command-line)

[解决 Git 变基后的合并冲突](https://docs.github.com/zh/get-started/using-git/resolving-merge-conflicts-after-a-git-rebase) 解决完成后记得 `git rebase --continue`

[竞争行更改合并冲突](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line#competing-line-change-merge-conflicts)以及[删除的文件合并冲突](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line#removed-file-merge-conflicts)