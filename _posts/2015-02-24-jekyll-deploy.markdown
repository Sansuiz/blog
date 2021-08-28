---
layout: post
title:  "Jekyll 同时使用 Github Page 和阿里云"
categories: 折腾
tags:
- Jekyll
- 阿里云
---
我的Blog是host在Github Page的，每次Commit后自动Build，一秒钟后就能看到更新的页面了，而且Github本来就有CDN，从美国、欧洲、澳洲访问速度都很不错，Ping响应时间 < 10 毫秒，一切看上去都挺完美的。可是折腾君还是打算折腾一下，一来因为Github到中国的连接不是很稳定，有些地区有时会连不上，Ping响应时间也在50-150毫秒之间；二来几个月前买的阿里云到现在还是空放着，还是想找点东西放在上面别浪费了。看到[SJW同学前两天搞了分国内外线路](http://www.cnsjw.cn/2015/01/use-aws-and-cloudfront/)，就也学来折腾一下。

## 目标 ##
- 用户访问blog.rickysu.com的时候，DNS服务器根据访问者的地区自动返回阿里云和Github Page的IP，浏览器根据IP访问离自己更近的网站获得更快的访问速度。
- 写Blog的流程保持原来的不变：可以在本地写完后commit到github，也可以在github上直接编写markdown。也不增加任何手工步骤。

## 实现 ##
### 自动编译 ###
由于Github Page是可以自动编译Jekyll的，静态网站并不包含在我commit的git repo中，因此部署在阿里云上的环境需要做到以下两点：
- 在我Commit到Github后能够自动发现内容更新，然后抓取更新的数据
- 能在阿里云本地编译出静态页面，然后发布

所幸的是，由于Jekyll使用广泛，上面这些看似复杂的任务，Github和Jekyll的第三方代码都已经实现得很好了。
- Github 能根据各种 event 推送信息，这个功能叫做 [Web Hook](https://developer.github.com/webhooks/)，可配置性很高，在这里只需要使用最基本的功能：收到push后推送event到目标URL
- 在阿里云上监听 Github 的推送，收到推送后抓取 Repo，然后在本地编译、发布的功能由 [Jekyll-Hook](https://github.com/developmentseed/jekyll-hook) 完成。这个工具主要是Nodejs写的。

整个流程按照 Jekyll-Hook 的 [Readme](https://github.com/developmentseed/jekyll-hook/blob/master/readme.md) 很容易就完成了。



### 测试和调试 ###
部署的时候不能直接把域名指到阿里云去，否则还没调试好的时候有人访问就会出现错误页面。所以测试时在自己电脑的/etc/hosts文件里把阿里云的IP加进去，这样用域名访问网站的时候，没有经过远程的DNS Server，而是在本机翻译出了IP地址直接就去访问阿里云了。

Jekyll-Hook 的调试比较容易，因为它打印出了所有关键信息，目录配置不正确、权限有问题之类的小错误很容易被发现。

Nginx的配置碰到一点小问题。新装的Nginx照着default依样画葫芦来配置server，总是出莫名的404或者500错误。甚至打开[debug](http://nginx.org/en/docs/debugging_log.html)开关查看error report也只是看到不停地找不到文件，虽然文件就在那里。Nginx的[Pitfalls](http://wiki.nginx.org/Pitfalls)指导让我灵光一现：不要从复杂的文件开始改，从头做一个干净的，我自己理解所有内容的配置文件会更容易查错。结果新的配置文件中只加上`server_name`和`root`两个参数，网站就工作了。最后完整起见加上了`error_page`指令完成404重定向。

环境导致的问题：由于国内通往Github的链路不是这么通畅，有时进行`git pull`或`git clone`的时候失败。于是就希望能对github的操作如果遇到失败，能重试几次。有一种Solution是使用`git retry`命令。但这个命令不在标准的git指令列表中，还需要[安装其他dependency](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/git-retry.html)。由于这只是一个很简单的功能，为了减少依赖，尝试在`build.sh`中加入重试机制。详情请看我的 [Jekyll-Hook Fork](https://github.com/imrickysu/jekyll-hook)


### 域名备案 ###
通过阿里备案速度还是比较快的，这次总共花了5天时间，阿里还有“备几天送几天”的活动，感觉挺不错。备案的流程就是填写各种信息，上传身份证等等。除了身份证，还需要一张有阿里云背景的照片，可以去指定地点拍摄，也可以让阿里邮寄背景到家里。邮寄是免费的，背景也不需要退还。各个步骤等待阿里处理的时间也在一个工作日内。

### 域名分线设置 ###
[阿里云解析](http://www.net.cn/core/domain/tclist)在万网而不是在阿里云页面内，但是可以用阿里账号登陆，不需要新注册为万网用户。

在云解析的设置中，每一条记录都可以根据 默认、海外、电信、联通、教育网 等等 线路设置不同的解析地址。在设置的时候还有中文提示每一种记录每一个空格都应该填入什么信息，还是挺容易使用的。

云解析设置完毕后，到原域名服务商把NS服务器换成阿里的DNS服务器就OK了。

## 结果 ##
使用 [ping.chinaz.com](http://ping.chinaz.com/) 测试ping延时，国内ping访问地址从澳大利亚改为了阿里云，延时从50-150ms降到大多30ms以下，浙江为8ms，但是还有部分国内省使用了国外线路，导致ping时间没有改善；国外仍然使用github的CDN，ping延时保持在10ms以下。


## 总结 ##
- Github 很开放，想得很周到。正是有了Web Hook，这样的Solution才能实现。
- 站在巨人的肩膀上，Jekyll-Hook 很好地解决了我的问题
- 阿里云解析分线功能有用，但还没做到完美。
