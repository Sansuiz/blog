---
layout: post
title:  "WebEx录制屏幕和转换格式"
date:   2013-10-22 22:13:50
categories: 折腾
tags:
- App
---

对录制屏幕要求不是很高的情况下，WebEx是一套比较合适的工具。

### 录制工具 ###
WebEx 的 Recorder 分为 Local Record 和 Online Record. 一般录制会议选择 Online Record；录制屏幕选择 Local Record。Online Record 如果需要录制音频，需要电话接入会议；本地录制就不需要电话，可以直接使用声卡录制音频。

WebEx Recorder 和编辑工具 Editor 是一个包，下载地址：<https://webexhelp.webex.com/client/T27LB/ateditor.msi>

善用佳软有一篇介绍文章：<http://xbeta.info/webex-recorder.htm>

录制屏幕的时候，如果不希望控制菜单被一起录制进去，可以在Preference中选择在录制时隐藏菜单，而是用快捷键来控制。快捷键很容易记忆，暂停是 Ctrl+Alt+P；停止是 Ctrl+Alt+S；设置时间点是 Ctrl+Alt+M.

### 编辑工具 ###
WebEx Recording Editor 有一些初级的编辑功能，可以剪切、插入视频。这样就可以在有稍许错误的时候不必从头再录，在相关的地方设置一个时间点标记，然后继续重新录制正确的内容，在录制完成后用编辑工具剪切掉错误的部分就可以了。

WebEx 录制出来的标准格式是 wrf，必须使用 WebEx Player 播放。

Wrf 格式录制出来的视频体积很小，视频质量也不错。如果转换成其他格式，可能会导致视频质量下降，而且同时体积增大。

### 转换工具 ###
为了方便传播，我们有时不得不将视频转换为其他格式。这个时候可以使用WebEx Recording Editor 的 Export 功能转换成 wmv。但是 WebEx Recording Editor 的 Export 功能有些缺陷，比如有时候导出的视频没有声音，有时候导出的视频面积大小和原始录制的不一致等。

因此为了转换，使用 WebEx Converter 更为合适。 Converter 下载地址：<http://supportbeta.webex.com/supportutilities/atwrf2wmv.zip>

在 Converter 的使用过程中，发现使用 Windows Media Video 9 Advanced Profile 编码器转换出的视频颜色效果，会比默认的 Windows Media Video 9 Screen 编码器更贴近原始颜色。

当转换成 WMV 之后，就可以用其他格式转换工具转换成目标格式。比如用 Any Video Converter 转换成 MP4 等等。
