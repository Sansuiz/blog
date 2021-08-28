---
layout: post
title:  "从Wordpress转移到Jekyll"
categories: 折腾
tags:
- Web
- Jekyll
---

从Wordpress转到了[Jekyll]。

驱动我转换的主要原因有几个：

- 最近用Git比较多。希望写完之后能直接git push，而不是登录到wordpress后台，粘贴用Markdown写的内容，然后再发布。
- 已经越来越少写Blog，要把Blog养在VPS上，感觉好浪费。再说又买了云梯，VPS就真没太多需求了。
- 希望写Blog的流程能简单再简单，不知道这样我会不会多写几篇。
- 不知道是我升级Wordpress出问题还是遭到攻击，后台怎么也登不进去，后来还是用了[这个方法]才能登录后台。用Github的服务相信出这样的事情的概率小很多。

Jekyll 基本能满足我对Blog的需求。默认样式简洁，又可自定义。可以插代码，可以插图片，可以Source Control.

安装Jekyll没有费太多功夫，主要是他们网站做得还不错，跟着http://jekyllrb.com一步一步做就OK了。

## 简要记录一下流程

- 在github上创建一个repo，名字叫 <username>.github.io，并clone到本地
- sudo gem install jekyll
- 在clone出来文件夹的上层，用`jekyll new <username>.github.io --force`将repo目录设置为jekyll的主目录
- 编辑repo中的_config.yml文件，更新blog名称等信息
- 编辑repo中的_post/xxx.markdown文件（就是本文啦）增加Blog内容
- `jekyll serve -w`生成本地文件，用来预览
- 删除上面生成的_site文件夹，`git add *`，然后commit并push。
- 等几分钟，网站就出现在<username>.github.io上了

## 一些用法

- 如果要添加图片，就在根目录中建一个images目录，引用时使用`/images/xx.png`。如果不是从根目录引用，可以用`{{site.url}}/xx/images/xx.png`的绝对路径方式。
- 如果配置文件出错，可能在本地的jekyll serve 中不会显示错误，但是上传之后，github会发送email过来说哪个文件第几行出错了，对查错非常有用。
- 有看到信息说上传的文件10分钟后才能看到网页上的变化，但其实我看到的情况是上传文件后刷新，新页面瞬间就已经出现在首页上了。

如果后续还要修改样式等等，可以参考Jekyll的官方网站文档。

## 旧内容转移

从Wordpress转移内容到Jekyll没有那么自动化，所有转换后的页面都需要review一遍，以防样式、图片引用出错。

- 在Wordpress中用默认的导出功能导出包含内容和图片信息的XML
- 运行 `jekyll import wordpressdotcom --source wordpress.xml`。它会将所有XML描述的图片下载到assets目录，转换出的文字仍然是html
- 如果愿意折腾的话，用[to-markdown](http://domchristie.github.io/to-markdown/)把html转换为markdown，这样检查所有图片链接时会方便很多。
- 更新图片URL，删除不必要的图片链接
- 用`jekyll server`查看所有样式，确定无误后commit

## 绑定域名
- 查看[github的说明网页](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages)
- 新建CNAME文件
- 在CNAME中写入域名或子域名，commit
- 修改DNS运营商处的DNS CNAME，指向yourname.github.io

[jekyll]:    http://jekyllrb.com
[这个方法]:    http://codex.wordpress.org/Resetting_Your_Password
