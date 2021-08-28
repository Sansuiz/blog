---
layout: post
title: "学习Ruby的第一阶段"
categories: 总结
tags:
- 学习总结
- Ruby
---

断断续续前后花了一个礼拜的时间，终于写好了一个给自己用的小工具。它实现的功能是我事先写好一个我关注的美剧的列表，这个工具就帮我查看Kickass上有没有更新的剧集，返回一组磁力链接。可以说它的功能很简单，但对我来说这可以算得上是一个里程碑式的小程序：*它是一个我在电脑上写了为了方便我日常生活的软件小程序*。

我平时在ARM上写C，在FPGA上写HDL，在服务器上写HTML，为Jekyll改改模版，但真的从头构建一个能在日常生活中使用，能让我的生活更便利，这是第一回，让我小满足了一把。（#吐槽 平时工作我都是靠帮助别人获得满足感，这次终于能帮助自己了）

## 我是怎么开始学Ruby的 ##

注：如果不愿意看故事可以直接跳到下一章

作为一个自我感觉还算对产品有些见解的人，从 Web2.0 时代开始的时候就感觉，各种Web/App充满了可以改进的地方，自己心里会有很多想法，但苦于学的不是软件工程，手里的工具最软的也就是C，无法对生活做一些改变。所以可以说是很早我就有了掌握除硬件语言、抽象程度较低的高级语言(嗯我说的是C)之外，再学一种面向对象的、能用少量代码实现较多功能的语言的想法。

最开始我学的是Python。但当时没有一个项目让我迫切地想把它应用到某个实际的工程中去，于是学了又忘，忘了又学，来来回回好几遍，几年都过去了，以至于后来出了Python2和Python3的分歧，出了一堆我看不懂的Python包管理工具和版本管理工具，把我一个没人领进门的门外汉给搞迷糊了。曾经也想学过Django，也不说原因了反正是还没学就放弃了。

后来是通过Ruby on Rails知道Ruby的。那是2014年，当时完全不知道RoR是一个Web框架，Ruby是一种语言什么的。（但是其实早就就看过了DHH写的[《重来》](http://book.douban.com/subject/5320866/)，也知道37Signals云云，它在这本书里提到Rails了吗？）当时只是在听Teahour的Podcast，主持人和嘉宾大都是Rails从业者，于是终于耳濡目染知道这是什么了。

后来六月份学了一阵Rails，看了[《Ruby元编程》](http://book.douban.com/subject/7056800/)的开头几张，但随着出差和公司事情变多就又把Rails搁置了。所有能轻易被搁置和遗忘的，都是它们没有达到足够有趣的程度。在这段时间里，我体会到Rails可以很快搭建出网站原型的特点，但是无论是看Tree House的视频、看Railscasts的视频，还是看文字的教程，都让我感觉知识点太多，黑魔法太多，顾不过来。知识点太多事因为我就没有软件基础知识，SQL，CSS，JS都是半吊子，看得懂写不来的程度，要拼凑出一个网站一个页面需要现场查很多资料。就像一篇外文文章中如果生词太多了，就很难顺畅理解全篇文章的意思，这种情况下知识点太多了，我就无法应付做网站这种项目了。有点烦躁，又碰到公司事情忙，顺理成章就搁置下来。

这一停就是半年，到了年底该总结的时候，才想起来我年初给自己下的目标“做一两个个人Project”完全就没有进展，于是决定先把Ruby抓起来，实现一些功能简单的小程序，下一步再扩展到Rails。同一段时间里开始了几个项目，比如在我没有发现aqicn里仍然有美领馆的空气质量信息时，我做了用Twitter API抓取[@CGShanghaiAir](http://twitter.com/cgshanghaiair)信息的小工具（咦，我为啥说仍然？）；比如我做了抓取Bing壁纸然后自动给Mac OSX换壁纸的小工具。由于发现了其他更好的solution或者一些其它之前没考虑到的因素，其它项目暂时处在暂停状态，现在这个 TV Episode Checker就是我的第一个小作品了。

## 哪些东西对我最有用 ##
网上Ruby和Ruby on Rails的资料一搜一大把，其实很多都不错，只是没有时间把所有的都读一遍。以下是我读过觉得不错的。

- [Learn X in Y minutes Where X=ruby](http://learnxinyminutes.com/docs/zh-cn/ruby-cn/) 是我在读过了一些Ruby Tutorial以后才发现的简短小介绍，但这篇真的是很好的入门材料
- [Ruby Core Document](http://ruby-doc.org/core-2.2.0/) 刚开始学，很多基本类自带的方法都不够熟悉，Ruby自带的文档是最好的参考资料。我经常参考下面这些类的说明，因为它们自带的方法实在太多了，靠脑子记不清楚:
    - Array: 数组有好几十个方法，最常用的比如添加数据，排序，确认元素是否存在，返回数组长度等等
    - Hash: key-value对，方法比数组少一些，但也有三十多个
    - String: 字符串类，五十多个方法
    - Time: 作为时间对象对时间操作
    - File: 文件操作比如打开文件，查询文件是否存在，列出文件名等等
    - Dir: 文件夹操作比如列文件内容
    - Kernel: 由Object类引入的Kernel Module有很多实用的方法，所有Object的子类都继承了这些方法。比如声明数据类型，数据输入输出等。
- [Ruby Stdlib Document](http://ruby-doc.org/stdlib-2.2.0/) Ruby自带的库里有用的功能也很多，我只用过其中的一小部分
  - json: 解析json文件
  - yaml: 解析yaml文件；将Hash和Array存成文件（也叫做用文本格式做序列化）
  - uri: 打开网上的文件
  - fileutils: 拷贝文件
  - pp: Pretty Print 把Hash和Array打印得好看一些
  - rubygems: 用bundler做导入的时候需要
  - time: 注意和Core内自带的不一样。这个lib里的parse()方法可以把String转成Time类型
- [《Ruby元编程》](http://book.douban.com/subject/7056800/) 这本书把我带到了Ruby的内部世界，把以上这些从表面上的语法无法理解的内容由浅入深地讲解清楚。[这里](http://www.infoq.com/cn/articles/ruby-white-magic-book)是我看到过的一份书评，大致讲述了它的内容和好处，很是赞同。

## 我还试过哪些玩具 ##
- [Nokogiri](http://www.nokogiri.org/): 这是一个html parser，内置CSS选择器和XPATH选择器，很容易就能把HTML中需要的内容找出来。TV Episode Checker的主要采集功能就是靠它。[这里](http://ruby.bastardsbook.com/chapters/html-parsing/)有一份不错的教程。
- [Shoes](http://shoesrb.com/): 这是一个Ruby的图形库。曾经想做一个显示图片的小工具，就试用了一下Shoes。这个图形库很简单就能上手，写很少的代码就能实现在Tk/Qt上写很多代码才能实现的功能。但是缺点让我有点不能忍：它是一个独立的工具，由它来launch你的Ruby代码，而不是由用户的代码来调用这个库。如果说这点可以由它的一个分支[Green Shoes](https://ashbb.github.io/green_shoes/Introducing.html)来缓解，它的另一个缺点也很严重：虽然它内置了很多Example，但文档还是令人捉急，连全部参数都没有一份完整的文档，这导致我最后还是放弃了它。
- [Tumblr Gem](https://github.com/tumblr/tumblr_client): 把[Tumber的API](https://github.com/tumblr/tumblr_client)包装成一个类，用起来很方便。
- [Twitter Gem](https://github.com/sferik/twitter): 把[Twitter的API](https://dev.twitter.com/overview/api)包装成Ruby类。不过Twitter支持的方法实在太多了，看文档对我来说都有点累，不如Tumblr清晰。

## 关于包管理和Ruby版本管理 ##
Ruby世界中主要使用RVM和Bundler来做包管理。下面总结一下RVM和Bundler的优势和劣势。

RVM

- 可以方便地在系统中安装和选择使用多个版本的Ruby
- 每个Ruby版本又可以带多个专用的Gem环境互不影响
- 每次使用和切换都要用命令
- 在每个隔离的区域中仍然可以使用Bundler安装Gem

Bundle

- 为一个版本的Ruby管理Gem，可以自动处理dependency
- 可以将Gem安装到系统目录(默认)或者本地工程目录(--path 选项)
- 通过Bundler启动没有安装在系统目录的Ruby工具(比如Rails, Jekyll等可以不安装在系统目录)，使用`bundle exec <app name>`启动

我的喜好

- Rails程序使用RVM。因为Rails开发的时候需要不断运行命令行，比如`rails g model`等，每次在rails命令前加上`bundle exec`太麻烦了，还不如一次性指定好环境。
- 手工写的Ruby程序，如果系统版本的Ruby可以使用，就只用Bundler将Gem装在工程目录下。启动程序不需要特殊操作。工程下的Gem也不会污染系统目录。






P.S. [《内核恐慌》Podcast 第7集](http://ipn.li/kernelpanic/7/)讲了软件包管理，对大多数开发环境的包管理都吐槽了一遍，有兴趣的可以去听。