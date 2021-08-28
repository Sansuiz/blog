---
layout: post
title: "扩展Mac Book Air的存储"
categories: 折腾
tags:
- Mac

---

2011年买的Air只有128G的存储空间一直是我的痛。随着使用年限的增长，硬盘很快就爆满了。于是我把iTunes Library和照片这两个大头移到了外置硬盘上。

一开始是移到Time Capsule的，但是基于网络的传输还是太不靠谱了，用iPhoto、iTunes的时候程序响应都非常慢，于是又把它们移到了移动硬盘上。出门如果不带移动硬盘就不能听歌，也是很傻x的一件事。

源自Twitter上的一则消息，发现原来现在给Air扩展存储的方案已经比一年前改善很多了，至少有了这四种选择吧：


## 选择

### Nifty
![Nifty](/images/20140928_nifty.jpg)

这是曾经Kickstarter上的当红项目。做一个转接套，套子里可以塞MicroSD，套子不象普通SD那么大，专为Air量身定做，短1厘米左右，放在SD卡槽内不会有露出来的部分，而且颜色也做成Air的金属色。

[Apple Store](http://store.apple.com/cn/search/nifty)上已经有卖了。RMB298. 一共有3种型号，适配各种MacBook。 这个套子都298，普通SD卡都能买一打了，我于心不忍，于是搜搜淘宝，又搜搜其他解决方案，最终把它放下了。

Nifty除了贵，还有一个很重要的问题，就是MicroSD卡经过了两次转接，可靠性呈平方增长。SD卡本来就不是很靠谱的接口，丢失数据可不是好玩的事儿。

### PNY StorEDGE
[PNY StorEDGE](http://www.pny.eu/product/s-24-222/Accessories-for-Apple/StorEDGE-/) 不是一个转接卡，而是一款短版的SD卡。少了一层转接，可靠性比较高。

![](http://www.pny.eu/data/sitedynamic/Image/storedge-assortment.jpg)

这款出来不少时间了，在网上有些测评，看上去传输速度还是不错的。有64G和128G两种容量。由于MacBook的SD卡槽深度不一样，因此插在一些本子上时，还会有一小部分露在外面。如果不是看到最新出的JetDrive Lite，估计我就买它了。

### Transcend JetDrive Lite
Transcend专为Mac Book准备的存储扩展方案-[JetDrive Lite](http://www.transcend-info.com/apple/jetdrivelite/)。一样也不是转接卡，内置Flash，可靠性比较高。存储大小有64G和128G两个版本。但是外观有4个版本，分别对应Mac Book Air (JetDrive Lite 130)， Mac Book Pro Retina 13” (JetDrive Lite 330) 和各时期的15” (JetDrive Lite 350和360). 专门定做那么多版本，可以说是用心到家了 （怀疑他家老板是不是苹果爱好者）。

![](http://www.transcend-info.com/Products/images/Solution/10/banner04.png)

从我用的130版本来看，塞到SD卡槽里正好贴合Air，边缘宽出来的部分可以用来拔出SD卡，又不影响使用。

### 直接更换内部的SSD硬盘
调研后发现，Transcend除了JetDrive Lite，还有整条Apple产品线，包括大容量内存[JetMemory](http://www.transcend-info.com/apple/jetmemory/) (up to 128GB), 给MacBook Air和MacBook Pro用的大容量 SSD 硬盘[JetDrive](http://www.transcend-info.com/apple/jetdrive/) (up to 960GB)，给Mac用的大容量SSD [JetDrive 420](http://www.transcend-info.com/apple/jetdrive420) (up to 960GB). 给MacBook Air用的240GB的SSD，美国亚马逊售价200刀，淘宝售价1400. 480GB和960GB分别是350刀和600刀。换下来的硬盘还可以装在它的盒子里做移动硬盘用，想得颇为周到。

![](http://www.transcend-info.com/products/images/Modelpic/624/JD-500_Spec.jpg)

不过这是后来了解到的，我在了解到JetDrive Lite的时候就迫不及待下手了。米袋充足的朋友不妨选择JetDrive，毕竟可靠性高很多很多，传输速度也高很多很多 (标称读570MB/s, 写460MB/s)


## 使用
SD卡拿到手就是Format过的，插进SD卡槽直接能用。文件系统是ExFat. 如果需要更改文件系统，可以用Mac OS X自带的Disk Utility工具把它重新Format成其他格式。下面就比较了JetDrive Lite在ExFat和Journal格式下的性能。

## 性能
JetDrive Lite 130包装盒上标称 Up to 95MB/s Read, 60MB/s Write.

测了一下性能，没有达到这个最大值，不知道是因为我的电脑比较老，SD卡接口本身限制，还是SD卡的限制。但是网上是有人说能达到标称值的。

以下是我的测试样本：
- 198张照片，总大小466.6 MB
- 1个MP4文件，大小857.2 MB

我的电脑的参数
- MacBook Air 13-inch, Mid 2011
- Processor 1.7GHz Intel Core i5
- Memory 4GB 1333MHz DDR3

测试方法
- 写：从本地硬盘拷贝样本到目标盘
- 读：从目标盘拷贝样本到本地硬盘
- 按Cmd+v的同时开始计时
- 拷贝对话框消失停止计时

由于手动计时，计时误差在1s内。

### ExFat
- 857M 单个文件 写：29s => 29M/s
- 857M 单个文件 读：21s => 40.8M/s
- 466M 198个文件 写：27s => 17.2M/s

### Mac OS Extended (Journaled)
- 857M 单个文件 写：29s => 29M/s
- 857M 单个文件 读：20s => 42.8M/s
- 466M 198个文件 写：21s => 22.2M/s

### WD Elements 移动硬盘 NTFS
- 857M 单个文件 写：44s =>19.5M/s
- 857M 单个文件 读：58s => 14.8M/s
- 466M 198个文件 写：34s => 13.7M/s

普通移动硬盘由于内圈外圈速度差异大，只是用来做参考对比，不表示准确结果。总的看来，在我的电脑上格式化成Mac OS Extended (Journaled) 在多个小文件读写速度上略好于 ExFat，同时大文件的速度也没有损失。网上的信息表示在ExFat时写速度可以达到标称的60MB/s，但Journaled只有它的一半，也就是和我一致。

## 总结
JetDrive Lite 很好地满足了我的要求，价格也不贵。iTunes Library已入驻。虚拟机镜像一会儿也准备搬进去，主硬盘就能空一些了。

## 参考
[What are the advantages of formatting an external disk as journaled HFS+?](http://apple.stackexchange.com/questions/47105/what-are-the-advantages-of-formatting-an-external-disk-as-journaled-hfs)

[某人的速度测试](http://apple.stackexchange.com/questions/135753/crazy-memory-usage-on-transcend-128gb-jetdrive-130-expansion-card-for-mba)
