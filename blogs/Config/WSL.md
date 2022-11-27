---
title: Windows内运行Linux-WSL2
date: 2022-11-22
tags:
 - Linux
categories:
 -  Config
---

## Windows Subsystem for Linux——WSL2

### 前世今身

微软开发WSL使开发人员能在Windows环境下运行Linux环境，而不会产生传统虚拟机或双系统设置的烦恼。原本WSL希望在Windows下解释Linux，但发现成本太高，难以维继🤔，选择了使用虚拟化直接调用Linux内核推出了WSL2。

### 优缺点

在Windows窗口下运行Linux环境，可以直接使用Docker等，而不需要Win去转换，虽然类似虚拟机，但Win与Linux共享设备资源，动态调度，可以直接使用GPU进行机器学习等的加速，损耗比传统虚拟机小，且Linux可以直接访问Windows下的文件，但是WSL2的访问速度比WSL1的差了许多。

目前WSL2若需要直接访问USB设备，需要使用USBIPD-WIN工具提供支持，具体参阅[连接USB设备](https://learn.microsoft.com/zh-cn/windows/wsl/connect-usb)，且还不支持串行端口。

目前在关闭WSL2实例前，WSL2不会自动将之前用的内存的缓存释放，若长时间运行容易耗尽Windows内存，而WSL1会在进程结束后直接释放，这个区别需要注意

WSL2作为hyper-v虚拟机运行，使用网络地址转换 (NAT) 服务作为其虚拟网络，而不是将其桥接到主机网络接口卡 (NIC)，在重启时将更改IP地址，若需固定IP则需要设置替代方法。

### 安装条件

1. win10系统版本为 Version 1903 or later, with Build 18362 or later，终端中输入`ver`查看。win11直接支持。
2. 计算机支持支持 Hyper-V 虚拟化

[检查安装WSL2条件](https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-2---check-requirements-for-running-wsl-2)

### 启用

**以下命令都在管理员身份运行！**

1. 启用WSL
   `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`
2. 启用“虚拟机平台”
   `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`

    或是手动启用，win+R 输入 appwiz.cpl，打开启用或关闭 Windows 功能
    启用以下三个功能：
    ![启用wsl](http://imagebed.krins.cloud/api/image/X6422F0R.png)

3. 设置默认使用WSL2
   下载WSL2内核更新包[适用于 x64 计算机的 WSL2 Linux 内核更新包](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)，以管理员身份运行
   之后在终端中输入
   `wsl --set-default-version 2`

4. 安装一个Linux发行版
    为了不将Linux系统安装在C盘，需要麻烦一点，手动下载安装包进行安装
    在官网中下载Linux发行版：[Linux发行版](https://learn.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions)

    以管理员身份运行终端，输入`netsh winsock reset`，之后不要重启，继续往下

    将安装包放在想安装Linux的路径，后缀改为`.zip`，解压后若无`Ubuntu.exe`，则将`Ubuntu_2204.0.10.0_x64.appx`后缀再次修改为`.zip`解压运行`Ubuntu.exe`，否则直接运行`Ubuntu.exe`

    等待一会，安装窗口会要求输入用户名和密码，输入完毕则安装完成

5. 避免使用WSL2时出现`参考的对象类型不支持尝试`
   下载[NoLsp.exe](https://github.com/dyingsu/nolsp)，解压后放置在`C:\windows\system32`文件夹中，以管理员身份运行终端输入`NoLsp.exe C:\windows\system32\wsl.exe`

### 图形界面

Win11 22000或更高版本已支持WSL的GUI😏

安装与显卡匹配的驱动：

- [适用于 WSL 的 Intel GPU 驱动程序](https://www.intel.com/content/www/us/en/download/19344/intel-graphics-windows-dch-drivers.html)
- [适用于 WSL 的 AMD GPU 驱动程序](https://www.amd.com/en/support/kb/release-notes/rn-rad-win-wsl-support)
- [适用于 WSL 的 NVIDIA GPU 驱动程序](https://developer.nvidia.com/cuda/wsl)

更新WSL后重启即可使用图形化界面了
`wsl --update`

若win10想使用图形化界面可以通过远程桌面曲线救国😆

在wsl环境下输入

```bash
# 安装远程桌面协议xrdp与轻量级桌面xfce
sudo apt update && apt upgrade
sudo apt install xrdp
sudo apt install xfce4 xfce4-goodies
# 编辑xrdp配置文件
sudo vim /etc/xrdp/xrdp.ini
##修改以下参数后保存
max_bpp=128
xserverbpp=128 # 这个原本是注释着的，不改也行

#在bash下直接输入
sudo echo xfce4-session > ~/.xsession

#编辑/etc/xrdp/startwm.sh文件
sudo vim /etc/xrdp/startwm.sh
##注释掉最后两行并添加一句startxfce4，然后保存
```

每次要使用桌面时

```bash
# 开启远程桌面
sudo /etc/init.d/xrdp start
# 确定ip
ip a
## 找到eth0的inet
```

![查找ip](http://imagebed.krins.cloud/api/image/TBH4H480.png)

win+R 输入mstsc打开微软的远程桌面连接工具
输入上面的ip
![输入ip](http://imagebed.krins.cloud/api/image/000X0VPN.png)
输入用户名密码连接
![连接远程桌面](http://imagebed.krins.cloud/api/image/FJ6P6RFJ.png)

喜欢折腾可以美化桌面教程：[美化你的Xfce桌面](https://blog.csdn.net/alfiy/article/details/126859106)

### Windows Terminal

[什么是 Windows 终端？](https://learn.microsoft.com/zh-cn/windows/terminal/)
[Windows Terminal完整指南](https://zhuanlan.zhihu.com/p/272082726#:~:text=Windows%20Terminal%E5%AE%8C%E6%95%B4%E6%8C%87%E5%8D%97%201%20%E5%8D%95%E5%87%BB%E5%85%B6%E5%BC%80%E5%A7%8B%E8%8F%9C%E5%8D%95%E5%9B%BE%E6%A0%87%202%20%E5%9C%A8Powershell%E6%88%96%E5%91%BD%E4%BB%A4%E6%8F%90%E7%A4%BA%E7%AC%A6%E4%B8%8B%E8%BE%93%E5%85%A5%20wsl%20%E6%88%96,Terminal%3A%20Select%20Default%20Shell%20%EF%BC%8C%E7%84%B6%E5%90%8E%E9%80%89%E6%8B%A9%20WSL%20Bash%20%E3%80%82)
[美化 Windows Terminal(iTerm2-Color-Schemes)](https://blog.csdn.net/Jioho_chen/article/details/100624029)

### 固定ip

因为WSL2每次启动都要虚拟化一张网卡，所以ip不会固定，需要其他的方法固定ip方便登录

我设置的ip为
Windows端静态IP 192.168.99.1
WSL Linux端静态IP 192.168.99.2
可按照个人需求进行设定

在powershell中输入`vim $profile`

```bash
$getIP = netsh.exe interface ip show addresses "vEthernet (WSL)" | findstr.exe /C:"192.168.99.1"
if(!$getIP)
{
    netsh interface ip add address "vEthernet (WSL)" address=192.168.99.1/24
}
```

刚开机打开powershell时会显示`文件名、目录名或卷标语法不正确。`
因为wsl未启动，还未给其分配虚拟网卡，启动wsl后shell会自动给"vEthernet (WSL)"添加ip地址。
所以不用担心这个报错。

为避免wsl每次启动生成的ip将我们设置的ip覆盖掉，停用其服务

```bash
# 终端中输入
sudo vim /etc/wsl.conf
# 在文件内输入以下内容
[network]
generateResolvConf = false
# 保存后退出
# 将已经生成的ip配置文件删除
sudo rm -f /etc/resolv.conf
```

创建一个脚本文件`sudo vim ~/Public/static-ip.sh`

```bash
#!/bin/bash
# ip设置为192.168.99.2
ip addr show eth0 | grep -s "192.168.99.2/24" > /dev/null
if [ $? == 1 ]; then
  ip addr add 192.168.99.2/24 broadcast 192.168.99.255 dev eth0 label eth0:1
fi
```

为保证有运行权限终端输入`sudo chmod 777 ~/Public/static-ip.sh`

因为Ubuntu默认的sh是连接到dash的，为了避免不能运行bash脚本，将dash禁用
`sudo dpkg-reconfigure dash`
选择`no`
参考:[解决Linux下编译.sh文件报错 “[: unexpected operator]”](https://blog.csdn.net/dpl12/article/details/105484684)

之后在`~/.bashrc`文件中添加使用该脚本的命令，就可以每次加载shell都启动一遍脚本

```bash
# 编辑配置文件
sudo vim ~/.bashrc
# 在文件末尾添加以下部分
## 如果ip未修改的话运行脚本进行修改并顺便启动远程桌面
if [ `hostname -I` != "192.168.99.2" ]; then
    echo Ubuntu | sudo -S sh ~/Public/static-ip.sh
    sudo /etc/init.d/xrdp start
fi
```

这种方法**会将你的用户密码暴露在文件中**，有些危险，但我目前暂时没有更好的解决办法，又不想直接进入就是root用户。以后有更好的办法再更新。

![添加网络互通](http://imagebed.krins.cloud/api/image/ZJ84JFFT.png)

- 新建防火墙入站规则
  - 打开控制面板\系统和安全\Windows Defender 防火墙
  - 点击入站规则->新建规则
  - 规则类型：自定义
  - 程序：所有程序
  - 协议和端口：默认即可
  - 作用域：
    - 本地ip处选择“任何IP地址”
    - 远程ip处选择“下列IP地址”，并将wsl2的IP添加进去。（请根据自己wsl2的ip进行计算，我这里添加了172.22.176.0/20）（掩码一般是20位）
  - 操作：允许连接
  - 配置文件：三个全选
  - 名称描述：请自定义
注意：这一步完成后，从wsl2 ping主机的ip应该可以ping通了。
即`ping 192.168.99.1`
这个`192.168.99.1`是之前设置的Windows端静态IP

将Windows代理软件的`允许局域网`选项启用，在Linux设置代理
`export ALL_PROXY="http://192.168.99.1:7890"`注意端口号要根据代理软件进行设置
就可以通过Windows进行代理啦🤩
之后要git之类的就能很方便

[wsl2能否固定ip地址?](https://www.zhihu.com/question/387747506/answer/2579596278)
[用 echo 管道命令给sudo自动输入密码](https://blog.csdn.net/xushx_bigbear/article/details/12966625)
[Linux默认以root或管理员权限启动程序的三种方式](https://blog.csdn.net/shihoongbo/article/details/122290472)
[WSL2-CentOS7固定IP](https://www.1024sou.com/article/977402.html#:~:text=WSL2%20%E9%87%87%E7%94%A8%20Hyper-V%20%E7%9A%84%20Internal%20Virtual,Switch%EF%BC%8C%E8%BF%99%E4%B8%AA%E8%99%9A%E6%8B%9F%E4%BA%A4%E6%8D%A2%E6%9C%BA%E6%9C%AC%E8%BA%AB%E6%98%AF%E5%8F%AF%E4%BB%A5%E8%AE%BE%E7%BD%AE%E9%9D%99%E6%80%81%20IP%20%E5%9C%B0%E5%9D%80%E7%9A%84%EF%BC%8C%E4%BD%86%E6%98%AF%20WSL2%20%E5%8D%B4%E8%87%AA%E4%BD%9C%E8%81%AA%E6%98%8E%EF%BC%8C%E5%9C%A8%E6%AF%8F%E6%AC%A1%E5%85%A8%E6%96%B0%E5%90%AF%E5%8A%A8%E7%9A%84%E6%97%B6%E5%80%99%E5%B0%86%E7%BD%91%E7%BB%9C%E9%85%8D%E7%BD%AE%E6%81%A2%E5%A4%8D%E6%88%90%20DHCP%EF%BC%8C%E8%BF%99%E5%B0%B1%E5%AF%BC%E8%87%B4WSL2%E6%AF%8F%E6%AC%A1%E5%85%A8%E6%96%B0%E5%90%AF%E5%8A%A8%E5%90%8E%E7%9A%84IP%E9%83%BD%E4%B8%8D%E5%9B%BA%E5%AE%9A%EF%BC%8C%E5%A6%82%E6%9E%9C%E9%9C%80%E8%A6%81%E4%B8%80%E4%B8%AA%E5%9B%BA%E5%AE%9A%E7%9A%84IP%EF%BC%8C%E9%9C%80%E8%A6%81%E5%81%9A%E4%B8%80%E4%BA%9B%E8%AE%BE%E7%BD%AE%E3%80%82)
[wsl2配置使用windows网络代理](https://blog.csdn.net/nick_young_qu/article/details/113709768)

### 使用CUDA

[官方教程-GPU加速](https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/gpu-compute)

### WSL命令

可列出已安装的 Linux 发行版，并通过在 PowerShell 或 Windows 命令提示符中输入以下命令来检查每个发行版的 WSL 版本：wsl -l -v。

要在安装新的 Linux 发行版时将默认版本设置为 WSL 1 或 WSL 2，请使用命令 wsl --set-default-version <Version#>，将 <Version#> 替换为 1 或 2。

要设置与 wsl 命令一起使用的默认 Linux 发行版，请输入 wsl -s <DistributionName> 或 wsl --setdefault <DistributionName>，将 <DistributionName> 替换为要使用的 Linux 发行版的名称。 例如，从 PowerShell/CMD 输入 wsl -s Debian，将默认发行版设置为 Debian

要在 PowerShell 或 Windows 命令提示符下运行特定的 WSL 发行版而不更改默认发行版，请使用命令 wsl -d <DistributionName>，将 <DistributionName> 替换为要使用的发行版的名称。

wsl --set-version <DistributionName> version(1/2)命令可用于从 WSL 2 降级到 WSL 1，或将以前安装的 Linux 发行版从 WSL 1 更新到 WSL 2。

wsl --shutdown 命令用于将关闭wsl服务，释放其内存缓存。普通的exit只是注销，要过几分钟系统才会关闭其服务。

[WSL 的基本命令](https://learn.microsoft.com/zh-cn/windows/wsl/basic-commands)
[安装WSL](https://learn.microsoft.com/zh-cn/windows/wsl/install#upgrade-version-from-wsl-1-to-wsl-2)

参考链接：

1. [如何在Windows 10上安装WSL2](https://www.cnblogs.com/ittranslator/p/14128570.html)
2. [win11 安装 WSL2 在非 C 盘及配置（图形界面+代理）](https://blog.csdn.net/weixin_45840825/article/details/127138564)
3. [Win10通过wsl2使用Ubuntu以及GUI的安装](https://blog.csdn.net/qq_43613793/article/details/119774825)
4. [官方文档](https://learn.microsoft.com/zh-cn/windows/wsl/)
5. [WSL使用官方教程](https://learn.microsoft.com/zh-cn/windows/wsl/setup/environment)
