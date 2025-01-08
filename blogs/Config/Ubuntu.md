---
title: 使用Ubuntu遇到的问题
date: 2022-11-23
tags:
 - Linux
categories:
 -  Config
---

## 使用Ubuntu的那些事

### Ubuntu换源

**原来的源能用就不要换！**

Ubuntu大多软件可以通过apt命令在其服务器中下载并安装，但为了避免连接不上其服务器，我们可以更换到国内的镜像源。

方法一：图形界面

1. 进入 系统设置
2. 打开 软件和更新
3. 设置 下载自… 其他站点
4. 通过 选择最佳服务器 选择速度最快的 镜像源

![镜像源设置](http://imagebed.krins.cloud/api/image/JN44BNDR.png)

![选择源](http://imagebed.krins.cloud/api/image/TZD88TP8.png)

确定后会重新更新一下相关索引，需要一段时间，请耐心等待

方法二：命令行

```bash
#备份源设置文件
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
#编辑镜像源设置文件
sudo vim /etc/apt/sources.list
```

将原来的deb源注释掉后再最后加入下面的源，选一个添加

```bash
#  阿里源
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

```bash
# 清华源
 deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
 deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
 deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
 deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
 deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
 deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
 deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
 deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
 deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
 deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

 ```bash
 #  中科大源
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
 ```

之后再更新一下相关索引

```bash
sudo apt update
```

更新过程中可能会报以下错误：

![image-20221123191457145](http://imagebed.krins.cloud/api/image/D04VPHD4.png)

原因是没有将分发的公钥加入到设置中
使用以下命令解决：

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 公钥
```

公钥为NO_PUBKEY后面一段数字

再次更新apt索引即可！

若是出现以下警告：
![keywarning](http://imagebed.krins.cloud/api/image/06D0TPLF.png)
需要将相关key导出至 /etc/apt/trusted.gpg.d/ 目录中, 然后删除 /etc/apt/trusted.gpg 中的该 keyring

1. 输入`apt-key list`找出该key的值(后8位即可)
![keylist](http://imagebed.krins.cloud/api/image/XF664N4D.png)
2. 导出keyring至trusted.gpg.d
`sudo apt-key export C0B21F32 | sudo gpg --dearmour -o /etc/apt/trusted.gpg.d/Ubuntu.gpg`
3. 删除 /etc/apt/trusted.gpg 中的 keyring
`sudo apt-key --keyring /etc/apt/trusted.gpg del C0B21F32`

参考链接：

1. [Ubuntu换镜像源](https://blog.csdn.net/frighting_ing/article/details/122688413)
2. [W: GPG 错误：http://mirrors.aliyun.com xenial/mongodb-org/3.2 Release: 由于没有公钥，无法验证下列签名：](https://www.cnblogs.com/flw0322/p/12284898.html)
3. [ubuntu 22.04 修复 key is stored in legacy trusted.gpg keyring](https://blog.csdn.net/jiang_huixin/article/details/127186567)

### 查看系统相关信息

```bash
# 查看系统架构
uname --m 
# 查看系统版本号
cat /etc/issue
# 查看系统版本库信息
lsb_release -cdir
# 显示Linux内核名字
sudo uname --s 
# 显示内核版本 
sudo uname --r 
# 显示网络主机名
sudo uname --n 
# 显示cpu类型
sudo uname --p 
```

参考链接：

1. [怎么查看ubuntu是32位还是64位以及版本信息](https://blog.csdn.net/zhengxiangwen/article/details/60324802)

### 通过deb安装软件

先通过`uname --m`或`arch`确定系统架构以免下错包无法安装

![arch](http://imagebed.krins.cloud/api/image/4X806R8F.png)

也可以使用`sudo dpkg  --print-architecture`

安装命令为`sudo dpkg -i package-file`
卸载命令为`sudo dpkg -r package`，此时是不清除配置文件的
若需卸载并清除配置则使用命令`sudo dpkg -P package`
查找已安装的包名命令为`dpkg -l ..`，系统会进行正则匹配查找相关包名，无该选项则显示所有已安装包名。

若是安装过程中出现
`package architecture (amd64) does not match system (arm64)`
则为包的架构不正确，请下载与系统架构匹配的安装包，其中`amd64`有时会为`x86_64`，两者是通用的
不建议使用`sudo dpkg --add-architecture amd64`进行强行安装，会引发其他问题。

若是安装过程时出现
`N: 鉴于仓库 '...' 不支持 'amd64' 体系结构，跳过配置文件...`
则为架构不正确，此时需使用命令

```bash
sudo dpkg --remove-architecture amd64
sudo apt-get update
```

若是arm64则同理！

更详细用法可查看下文`命令详解`

参考链接：

1. [Ubuntu 系统 dpkg 命令使用详解](https://cloud.tencent.com/developer/article/1484940)
2. [Ubuntu使用dpkg查看与修改architecture的用法](https://blog.csdn.net/qiuchangyong/article/details/97505379)
3. [N: 鉴于仓库 ‘..‘不支持 ‘amd64‘ 体系结构，跳过配置文件 ‘..‘ 的获取。](https://blog.csdn.net/weixin_42756198/article/details/121310112)

### 设置中文环境

在图形界面中

1. 打开 系统设置——区域和语言——管理已安装的语言——在“语言”tab下——点击“添加或删除语言”
2. 弹出“已安装语言”窗口，勾选中文（简体），点击应用
3. 点击“应用到整个系统”

或用命令行

```bash
# 查看当前系统语言环境
locale
# 安装语言
sudo locale-gen en_US.UTF-8 zh_CN zh_CN.GBK zh_CN.UTF-8 zh_TW zh_TW.UTF-8
# 选择系统默认语言
## 找到所选语言enter进入后再选择一次，我选的是zh_CN.UTF-8 UTF-8
sudo dpkg-reconfigure locales
# 安装中文支持
sudo apt-get install language-pack-zh-hans
# 安装语言包（前两个中文简体，后面是中文繁体）
sudo apt-get install fonts-arphic-bsmi00lp fonts-arphic-gbsn00lp fonts-arphic-gkai00mp
# 查看已安装字体
fc-list :lang=zh
# 安装其他字体
sudo apt-get install ttf-wqy-microhei  #文泉驿-微米黑
sudo apt-get install ttf-wqy-zenhei  #文泉驿-正黑
sudo apt-get install xfonts-wqy #文泉驿-点阵宋体
##还可以通过xfonts安装其他字体
```

![选择语言](http://imagebed.krins.cloud/api/image/0NDX84Z0.png)
![再次选择语言](http://imagebed.krins.cloud/api/image/8P2VPNT6.png)

重启后则切换到中文

### 安装搜狗输入法输入中文

1. 先安装fcitx框架`sudo apt-get install fcitx fcitx-frontend-gtk2 fcitx-frontend-gtk3 fcitx-configtool`
2. 在搜狗官网下载输入法安装包，一般选择`amd64`版本
3. `cd ~/Downloads`后`ls`查看安装包名，`sudo dpkg -i 搜狗输入法安装包名`进行安装
4. 若过程中缺少依赖，使用`sudo apt -f install`

```bash
# 安装输入法依赖
sudo apt install libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2
sudo apt install libgsettings-qt1

# 设置fcitx开机自启动
sudo cp /usr/share/applications/fcitx.desktop /etc/xdg/autostart/

# 配置切换到中文
## 打开配置文件
sudo vim ~/.xprofile
## 添加以下命令
### 按i开始编辑，esc后:wq保存
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx" 
```

重启

在右上角可以看到一个键盘图标，不然就手动打开`fcitx`，点击键盘可以看到搜狗字样，不能的话就点击`configure`在左下角添加搜狗输入法，按`Ctrl + Space`切换中英文输入

参考链接

1. [Ubuntu搜狗输入法安装指南](https://shurufa.sogou.com/linux/guide)

### 安装VSCode

用图形界面的话可以直接在软件中心搜索并下载！

用命令行则需按以下步骤进行

```bash
# 安装证书
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
# 添加VSCode源
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
# 更新apt源
sudo apt update
# 安装VSCode
sudo apt install code
```

参考链接：

1. [Ubuntu16/18.04纯命令行安装vscode](https://blog.csdn.net/qq_33976344/article/details/115282033)

### 安装谷歌浏览器

```bash
# 下载安装包
cd ~/Downloads
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# 安装
sudo apt install ./google-chrome-stable_current_amd64.deb
```

参考链接：

1. [如何在Ubuntu 20.04上安装Google Chrome浏览器](https://www.cnblogs.com/livelab/p/12801344.html)

### 卸载软件

`apt-get purge / apt-get --purge remove packagename`
删除已安装包（不保留配置文件）。
如软件包a，依赖软件包b，则执行该命令会删除a，而且不保留配置文件

`apt-get autoremove`
删除为了满足依赖而安装的，但现在不再需要的软件包（包括已安装包），保留配置文件。

`apt-get remove packagename`
删除已安装的软件包（保留配置文件），不会删除依赖软件包，且保留配置文件。

`apt-get autoclean`
APT的底层包是dpkg, 而dpkg 安装Package时, 会将 *.deb 放在 /var/cache/apt/archives/中，apt-get autoclean 只会删除 /var/cache/apt/archives/ 已经过期的deb。

`apt-get clean`
使用 apt-get clean 会将 /var/cache/apt/archives/ 的 所有 deb 删掉，可以理解为 rm /var/cache/apt/archives/*.deb。

参考链接：

1. [Ubuntu apt-get彻底卸载软件包](https://blog.csdn.net/get_set/article/details/51276609)

### Linux文件权限规则

- 一个文件有三种权限属性
  - 读（r-read）
  - 写（w-write）
  - 执行(x-excute)
- 一个文件又有三种归属
  - 所有者(owner)
  - 同组者(group)
  - 其他(other)
  在Linux命令行中执行 `ls -l` ，就可以看到一个文件的三种属者对该文件所拥有的权限
  执行`ls-l`命令后，可以看到最前有10个字符

- 第1个字符，d-代表该文件是一个目录，-表示普通文件
- 第2-4个字符，代表文件所有者owner的权限
- 第5-7个字符，代表文件同组者group的权限
- 第9-10个字符，代表其他人other的权限

`chmod`命令可以对文件权限进行修改
`chmod [-cfvR] [--help] [--version] mode file...`
mode : `[ugoa...][[+-=][rwxX]...][,...]`

![文件权限](http://imagebed.krins.cloud/api/image/40J0J8D0.png)

使用符号模式可以设置多个项目：who（用户类型），operator（操作符）和 permission（权限），每个项目的设置可以用逗号隔开。 命令 chmod 将修改 who 指定的用户类型对文件的访问权限，用户类型由一个或者多个字母在 who 的位置来说明，如 who 的符号模式表所示:
|who|用户类型|说明|
| --- | --- | --- |
|u|user|文件所有者|
|g|group|文件所有者所在组|
|o|others|所有其他用户|
|a|all|所有用户, 相当于 ugo|
operator 的符号模式表:

|Operator|说明|
|---|---|
|+|为指定的用户类型增加权限|
|-|去除指定用户类型的权限|
|=|设置指定用户权限的设置，即将用户类型的所有权限重新设置|
permission 的符号模式表:

|模式|名字|说明|
|---|---|---|
|r|读|设置为可读权限|
|w|写|设置为可写权限|
|x|执行权限|设置为可执行权限|
|X|特殊执行权限|只有当文件为目录文件，或者其他类型的用户有可执行权限时，才将文件权限设置可执行|
|s|setuid/gid|当文件被执行时，根据who参数指定的用户类型设置文件的setuid或者setgid权限|
|t|粘贴位|设置粘贴位，只有超级用户可以设置该位，只有文件所有者u可以使用该位|

八进制语法
chmod命令可以使用八进制数来指定权限。文件或目录的权限位是由9个权限位来控制，每三位为一组，它们分别是文件所有者（User）的读、写、执行，用户组（Group）的读、写、执行以及其它用户（Other）的读、写、执行。历史上，文件权限被放在一个比特掩码中，掩码中指定的比特位设为1，用来说明一个类具有相应的优先级。
|#|权限|rwx|二进制|
|---|---|---|---|
|7|读 + 写 + 执行|rwx|111|
|6|读 + 写|rw-|110|
|5|读 + 执行|r-x|101|
|4|只读|r--|100|
|3|写 + 执行|-wx|011|
|2|只写|-w-|010|
|1|只执行|--x|001|
|0|无|---|000|
例如， 765 将这样解释：

- 所有者的权限用数字表达：属主的那三个权限位的数字加起来的总和。如 rwx ，也就是 4+2+1 ，应该是 7。
- 用户组的权限用数字表达：属组的那个权限位数字的相加的总和。如 rw- ，也就是 4+2+0 ，应该是 6。
- 其它用户的权限数字表达：其它用户权限位的数字相加的总和。如 r-x ，也就是 4+0+1 ，应该是 5。

参考链接：

1. [Linux默认以root或管理员权限启动程序的三种方式](https://blog.csdn.net/shihoongbo/article/details/122290472)
2. [Linux chmod命令](https://www.runoob.com/linux/linux-comm-chmod.html)

### LINUX中在系统启动时自动执行一个执行脚本

1. 如果是开机马上执行的脚本，可以将脚本写到rc.local中；

2. 如果是用户登录后自动执行脚本，可以将脚本写到相应的用户目录下“～/.bash_profile”，若脚本“～/.bash_profile”不存在，可以直接拷贝“/etc/profile”命名为“～/.bash_profile”；

3. 如果是要任一用户登录后自动执行脚本，可以将脚本写到“/etc/profile”中。

参考链接：

1. [如何在linux中执行一个脚本](https://www.cnblogs.com/domestique/p/6682995.html#:~:text=%E5%A6%82%E6%9E%9C%E6%98%AF,%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%20%E5%90%8E%E8%87%AA%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%84%9A%E6%9C%AC%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%B0%86%E8%84%9A%E6%9C%AC%E5%86%99%E5%88%B0%E7%9B%B8%E5%BA%94%E7%9A%84%E7%94%A8%E6%88%B7%E7%9B%AE%E5%BD%95%E4%B8%8B%E2%80%9C%EF%BD%9E%2F.bash_profile%E2%80%9D%EF%BC%8C%E8%8B%A5%E8%84%9A%E6%9C%AC%E2%80%9C%EF%BD%9E%2F.bash_profile%E2%80%9D%E4%B8%8D%E5%AD%98%E5%9C%A8%EF%BC%8C%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E6%8B%B7%E8%B4%9D%E2%80%9C%2Fetc%2Fprofile%E2%80%9D%E5%91%BD%E5%90%8D%E4%B8%BA%E2%80%9C%EF%BD%9E%2F.bash_profile%E2%80%9D%EF%BC%9B)

   
