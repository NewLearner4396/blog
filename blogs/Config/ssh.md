---
title: Windows中使用ssh遇到的问题
date: 2024-12-20
tags:
 - ssh
categories:
- Config
---

## Windows开启ssh指南

### 启用ssh

在Windows系统设置`管理可选服务`中安装`ssh服务端`与`ssh客户端`

确保ssh使用的是Windows官方的而不是git等自带的，由于一些系统命令不一样，这两种ssh客户端不可以当成一种来设置，请务必确保和我配置的是Windows服务中的ssh.exe

可以通过`get-command sshd`确认，如果不是，请把Windows的ssh的路径移动到环境变量比较靠上的地方

Powershell中启用sshd

```powershell
# Start the sshd service
Start-Service sshd
# set sshd auto startup
Set-Service -Name sshd -StartupType 'Automatic'
# verify the filrewall rule
if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object Name, Enabled)) {
    Write-Output "Firewall Rule 'OpenSSH-Server-In-TCP' does not exist, creating it..."
    New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
} else {
    Write-Output "Firewall rule 'OpenSSH-Server-In-TCP' has been created and exists."
}
```

然后配置`C:\ProgramData\ssh\sshd_config`

```
# 确保这几项没被注释
# 允许以root用户登录
PermitRootLogin yes
# 允许使用公钥登录
PubkeyAuthentication yes
# 公钥保存文件路径
AuthorizedKeysFile	.ssh/authorized_keys
# 允许使用密码登录
PasswordAuthentication yes
# 允许使用空密码(可选)
PermitEmptyPasswords yes

# 确保这两项被注释了
#Match Group administrators
#       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

每次修改完`sshd_config`都要重启服务

```powershell
Restart-Service sshd
```

若需使用空密码，还需保证`本地安全策略`中`本地策略 ` - `安全选项`的`账户：使用空密码的本地账户只允许进行控制台登录`一项是禁用状态

基本到这就可以在客户端的终端使用`ssh user@ip`然后输入密码连接。

为了方便，我们可以设置别名使用`ssh 别名`进行连接

配置`C:\Users\Administrator\.ssh`

```host
Host PC-LI4396 #别名
	HostName 10.4.151.86 #IP
	User Administrator #登录账户名
	IdentityFile C:\Users\Administrator\.ssh\id_ecdsa #不使用公钥的话不需要这一行
```

### 配置密钥免密登录

参考：[Windows 官方OpenSSH教程](https://learn.microsoft.com/zh-cn/windows-server/administration/openssh/openssh_keymanagement)

在客户端建立钥对

```powershell
ssh-keygen -t ecdsa
```

可选`-c '描述信息'`

最方便的是输入三次回车接受默认值

现在在`C:\Users\username/.ssh/`中有`id_ecdsa`（私钥）和`id_ecdsa.pub`（公钥）

可选：使用`ssh-agent`服务将密钥保存在Windows安全上下文中，不明文暴露在文件下。

```powershell
# By default the ssh-agent service is disabled. Configure it to start automatically.
# Make sure you're running as an Administrator.
Get-Service ssh-agent | Set-Service -StartupType Automatic

# Start the service
Start-Service ssh-agent

# This should return a status of Running
Get-Service ssh-agent

# Now load your key files into ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ecdsa
```

添加之后备份好私钥文件就可以在本地删除它了。

开动脑瓜将`id_ecdsa.pub`中的内容加到服务端的`AuthorizedKeysFile`中，首次的话要自己在`./.ssh`文件夹中新建一个`authorized_keys`，同时注意这个文件的读写权限应限制为用户本人，不能有`Everyone`等出现。私钥的权限也一样要注意。

### 结

以上就是最简单的ssh配置和我配置ssh踩过的坑的避雷点，希望看到这篇的人都能一次通过，打开目录！

如果还有其他问题，可能这些博客会有帮助：
[【入门排坑】Windows之间使用OpenSSH的ssh免密登录，排坑](https://www.cnblogs.com/robinbin/p/16162608.html)

[【Windows】允许空密码连接Windows的OpenSSH Server](https://www.jianshu.com/p/1ec72a019bd9)

[vscode通过ssh连接服务器实现免密登录+删除（吐血总结）](https://blog.csdn.net/Oxford1151/article/details/137228119)

