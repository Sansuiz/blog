---
layout: post
title:  "My Git Notes"
categories: 总结
tags:
- Git
---
现在虽然有很多好的git书籍和资料，但是对于没接触过版本管理的小白用户来说，git还是比较难以理解。我想尝试一下用我的大白话，用问答的形式，来向小白用户(我会多照顾一些平时不使用版本管理工具的Vivado/ISE/SDK的用户)解释一下什么是git，怎么在日常工作中使用git。

## 问答 ##
### 什么是git？ ###
git是一个版本管理工具。

### 什么是版本管理工具？###
版本管理工具就是帮助用户管理文件或者工程项目的版本的工具。把`论文.doc`存为`论文-20150226.doc`就是版本管理的一种行为，只是它没有用工具。同样，把一个项目打包生成`项目20150226.zip`也是版本管理的行为，这个过程中用了压缩工具作为一个中间工具完成了打包这个过程，但是版本管理还是靠命名来完成。版本管理工具帮助我们标记某个版本，方便我们在需要的时候找到相应的文件，用来参考查阅，或者全部或是部分地回退到当时的这个版本。版本管理工具有好多，git只是其中的一个。

### 我们为什么要学git不学别的？git相比其他的工具有什么优点？ ###
很多优点在没有用过其他工具没有对比的情况下感觉不出来。总结一些比较容易感知的优点有：

- 这是流行与趋势。Github是现在最流行的开源社区。曾经流行的开源社区sourceforge用的是CVS, google code用SVN，后来他们相继都支持了git, svn, mercurial 等工具，特别是将git写在网页的最前面。基本上，现在git大多数场合下都是被默认支持的版本管理工具。会用git就能与更多的人交流。
- 天生支持大型程序、多人协作、复杂的管理流程。当然不是说用户的使用会很复杂，只是它足够强大支持复杂的需求。git是为管理Linux Kernel源代码而诞生的，它天生就可以处理像Linux Kernel以及它的众多driver这样复杂的程序，而且由于Linux是一个多人协作社区，很多人会向Linux Kernel提交代码，因此git天生就支持大型程序和多人协作。
- 版本的控制并不一定需要网络。有些版本管理工具为了解决冲突，规定使用的时候必须联网，或者说一个文件有人编辑的时候别人就不能编辑(通常被称为 check out 和 check in)。但git没有这些限制。碰到冲突的时候解决冲突就好了，没必要限制别人。

### git这么好，要怎么试用呢？ ###
git本身是一个提供源代码的命令行工具，用户可以从源代码开始编译。要使用预编译好的工具，在Windows上可以下载[git-scm.com提供的工具](在Windows上可以下载git-scm.com提供的)，在大多数Linux上都可以用包管理工具安装，比如`yum install git`, `apt-get install git`；在Mac OSX上自带了git，如果要用更新的版本，可以用Homebrew安装一个新版本。

除此之外，还有各种图形化工具来方便用户上手和使用，比如Atlassian公司开发的[SourceTree](http://www.sourcetreeapp.com/)是一个好用的免费工具，Atlassian还提供了Bitbucket这个可以免费host私有库的网站。

### 我们通常会用git做些什么操作呢？ ###

- 在本地如果已经有一个工程，想把它用版本管理工具管理起来，就可以在这个工程的基础上`新建一个 git repository`
- 如果远程服务器有一个git工程要`下载`到本地，这个过程叫做`clone`
- 对于新建的工程来说，要指定git来管理哪些文件。也可以往Clone回来的工程里`添加(add)`要管理的文件
- 被git管理的这些文件中如果有文件被修改了，我们要`确认(add)`这些修改，并`提交(commit)`生成确认这个版本
- 提交一个或多个可被追踪的版本后，可以把它们｀推送(push)｀到远程服务器，这样别人也能看到这些修改了。
- 如果需要同步别人提交到服务器的修改，我们可以从服务器`抓取(pull)`更新

如果没有冲突的话，以上就是所需要掌握的最基本的命令。其余的都可以在碰到问题的时候慢慢学，包括但不限于：

- 在本地修改文件的时候，别人也同时修改了这个文件，而且在你之前提交到服务器了。这时候如果你想把你的修改提交到服务器，必须先`合并(merge)`别人的修改，如果修改有冲突的地方，还需要解决冲突
- 如果在开发的时候，需要同时解决一个bug，或者需要添加一个新功能，但这些操作都需要比较长的时间来完成，一方面不希望把开发了一半的代码提交到服务器，一方面又想在开发这些功能的时候也能用上版本管理工具记录中间状态，那么我们可以给这些分支任务建立一个`分支(branch)`，开发完成后再合并到主分支(master)
- 在开发分支的功能和主分支的功能的时候，我们可能需要不断`跳转(checkout)`到其它分支进行工作
- 某个时候觉得现在写的东西都不对，想放弃修改`退回(reset)`到上一次提交时的状态。
- 某个时候发现提交错了，想`修改(amend)`一些东西再重新提交
- 让git使用proxy
- 设定自己的名字，让别人知道是谁提交的代码

当清楚了我们需要用git来做什么之后，再去了解怎样用git来完成这些任务，就会觉得思路清晰很多。

### Vivado工程怎么用git管理 ###

## 具体操作 ##

### 基本操作 ###
[Git Document 第二章 - Basics](http://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository) 有详细的操作步骤解说一些基本命令。

- [2.1](http://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository) 通过 `git init` 和 `git clone` 获得一个git repo
- [2.2](http://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) 记录git repo的改变: `git add` `git diff` `git status` `git rm` `git mv` `git commit` `.gitignore` 
- [2.3](http://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History) 查看版本历史 `git log`的各种用法
- [2.4](http://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History) 撤销修改 `git commit --amend` `git checkout` `git reset`
- [2.5](http://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) 远程服务器 `git remote` `git fetch` `git pull`
- [2.6](http://git-scm.com/book/en/v2/Git-Basics-Tagging) 打标签 `git tag`

有了图形界面工具 SourceTree 之后，以上的大多数本来需要命令行完成的工作都可以在图形界面点击按钮完成

### 配置参数 ###
以下是我常用的配置参数的命令

- 列出现在的全局参数 `git config -global -l`
- 设置名字 `git config --global user.name <username>`
- 设置Email `git config --global user.email <email>`
- 设置Proxy `git config --global http.proxy <http_proxy>:<port>`
- 取消某个参数 `git config --global --unset <param name>`
