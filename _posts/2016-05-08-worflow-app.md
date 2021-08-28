---
layout: post
title: "iOS Workflow App"
categories: 折腾
tags:
- App
---

Workflow App 可以说是 iOS 里的 Automator。它能连接各个App的API，实现一系列比较复杂的动作。

这个 App 在 AppStore 中国商店的价格是18元。这里有一些介绍文章

- [PinApps: 扔掉难用的微信收藏，用Workflow自己弄](https://zhuanlan.zhihu.com/p/20589491)
- [PinApps: 使用Workflow划词搜索提升手机操作效率](https://zhuanlan.zhihu.com/p/20472027?refer=pinapps)
- [知乎: Workflow 有哪些有趣的或能提升生活效率的玩法？](https://www.zhihu.com/question/27029837/answer/71748121)

## 微信长文发送到 Evernote 和 Instapaper ##

想买它是因为我想实现在微信里比较长的文章的时候，把它同时发送到 Instapaper 和 Evernote。因为Evernote阅读体验不佳，Instapaper阅读时心情比较好。有时候想搜资料全文搜索，Evernote又会比较方便一些。由于微信里不能直接进行 Evernote 和 Instapaper 的分享操作，要么把文章发送给 Evernote 的公众号，要么用 Safari 打开后分别发送到 Evernote 和Instapaper，都是比较麻烦的。

用 Workflow 进行一系列动作的组合之后，就能实现两步完成以上操作：在微信中复制链接，然后下拉今日快捷菜单后让 Workflow 发送到 Evernote 和 Instapaper。

[这个流程的下载链接](https://workflow.is/workflows/a5cde2440e67417393f0968bc5779d51)

## 在 Evernote 里快捷记账 ##

熟悉了一阵 Workflow 之后，发现要发挥这款软件的作用，只怕想不到，不怕做不到。于是再小试牛刀。

有些琐碎的资料，是不停地在一篇文档里反复添加内容，比如记账，记体重等等。由于记录软件里文章比较多，总是要先找到那篇文章，进入编辑模式，再进行编辑，也不是那么方便。记在哪里我其实不是那么关心，iOS 自带的备忘录也好，Evernote 也可以。看到 Workflow 里有 Evernote 的 `Append to Note` 功能，于是就在 Evernote 里试验了。

最后实现的功能就是，点开 App 图标后，工具主动询问花了多少钱，做了什么，然后根据现在输入的日期时间，自动添加到 Evernote 中文档的末尾，文档名称是这个月的年＋月命名，一个月一份文档。

[这个流程的下载链接](https://workflow.is/workflows/3d3162a293464e17851945d905a0bebb)

## Workflow 经验 ##

### 如何判断一个操作是否成功 ###
比如想知道查询从 Evernote 里 `Get Note` 是否成功，`If` 功能只能判断是否大于，等于或小于某个数值，而如果 `Get Note` 成功了，返回的是 Note 的内容，这两者就不匹配，无法直接用 `If` 判断。

Workaround：用 `Count` 功能对返回的 `Item` 计数，如果大于0，则 Get Note 成功。

### Workflow 对 App 的 API ###
Workflow 对很多 App 的 API 都是基于网络的，而不是基于本机的（比如 Evernote 和 Instapaper），所以它会比 App 原生的分享扩展慢一些，而且一定要有网络才能成功。
