---
layout: post
title:  "换服务器IP地址导致PPTPD工作不正常的解决记录"
categories: 折腾
tags:
- Web
---

最早用的[Diahosting的一键安装包](http://blog.diahosting.com/linux-tutorial/pptpd/)，挺方便的，就没在意到底怎么设置的。

后来由于服务器换IP地址，其他Web服务都正常使用，唯独VPN只能连接，但不能上网。从现象来看，PPTPD验证时正常的，估计包转发出问题了，于是就研究一下PPTP设置的流程吧，主要是这几个步骤：

- 安装PPTPD，设置PPTP使用的内部IP和外部IP（连接Client被分配的IP地址段），设置PPP使用的DNS服务器，设置VPN用户名密码
- 设置允许 IP Forward
- 设置iptables包转发规则，PPTP网卡的流量转发到主机外网IP
- 保存各种设置并开机启动

怀疑是iptables包转发规则出错了。先又照着流程手动做了一遍iptables的设置，不起作用。然后就搜了一下怎样能列出来所有iptables规则，看看前面的设置是否正确。

`iptables -t nat -L`

```
[root@vps ~]# iptables -t nat -L
Chain PREROUTING (policy ACCEPT)
target     prot opt source               destination         

Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination         
SNAT       all  --  172.16.36.0/24       anywhere            to:<My Old IP>
SNAT       all  --  172.16.36.0/24       anywhere            to:<My New IP> 
SNAT       all  --  172.16.36.0/24       anywhere            to:<My New IP> 

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         
```

现在看出来了转发规则中第一条是说满足要求的包通过旧IP地址转发出去。但是旧IP地址已经不存在了，所以要把这条地址删掉。新IP地址的转发规则由于我手动做了多次尝试，这里有两条一样的规则，也要删掉一条重复的。

删除iptables规则的命令就是将iptables命令中的 `-A` 改为 `-D`。尝试后保存，everything works fine。