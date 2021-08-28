---
layout: post
title: "GitHub, Curl 以及 Bash"
categories: 折腾
tags:
- App
---

GitHub付费个人用户可以有unlimited repo，买了，准备把以前不愿意整理、不适合公开的工程备份上去。说来奇怪，打扮GitHub是我比较愿意做的事情，相比在本地整理，把内容传上Web可视的GitHub，更有仪式感和成就感，即使是自己使用的Private Repo。而且同是Private Repo，传到BitBucket的成就感就远不如GitHub。

## 从命令行创建 GitHub Repo ##

因为要经常创建新Repo，每次都到网页上点几下才能新建，显然是不能忍的。于是搜一搜，发现利用curl和Github API，直接从命令行建立GitHub的Repo。

1. 在 [GitHub Settings 页面](https://github.com/settings/tokens)申请 Token
2. 新建一个 bash function

```bash
function github-create-repo {
	if [ "$1" == "" ]; then
		echo "Error: <repo name> is required"
		echo "Usage: github-create-repo <repo name>";
	else
		echo "Creating Private Github Repo: $1"
		curl -u “USERNAME:TOKEN” https://api.github.com/user/repos -d "{\"name\":\"$1\", \"private\":\"true\"}"
	fi
}
```

使用时修改大写的 USERNAME 和 TOKEN 部分，填入自己的信息，把函数存在 .bashrc 里也好，存在其他单独文件中，在 .bashrc 中 source 它也好，总之，就能用 `github-create-repo <repo name>` 的方式新建 GitHub Repo 了。

一开始的时候用了`alias`，但是它没办法接收参数，所以改用 function。

curl 的 -u 后可以加入登录验证信息；-d 表示把后面的内容按 HTTP POST 的方式发送，如果查看 man page，可以发现 -d 有很多变种，甚至可以从文件中读入内容再发送。

查看 [GitHub API - Repo - Create](https://developer.github.com/v3/repos/#create), 发现这个API需要的操作地址是 `/user/repos`，以POST方式发送。输入信息中，只有 `name` 是必须的。以 JSON 的格式输入，前后用大括号，内容以 key -value 形式表示。所以我的 curl 命令中 -d 后的部分就写成了这种格式，其中`\”` 是为了转义引号，让它生成真的引号，以免curl认为这个引号是给它用的。


## 在 Shell Promot 中显示 Git Branch 名字 ##
使用 [get-aware-prompt](https://github.com/jimeh/git-aware-prompt) 还能在shell中显示branch名字，以及这个repo是否clean。用法在它的README中。

## 参考资料 ##

### Bash ###
- [Bash Programming - Introduction HOW-TO](http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html): 这篇很容易搜到，快速查找一些例子
- [SHELL编程之语法基础](http://liwei.life/2016/05/16/69/): 这篇文章不仅讲了怎么做，更着重讲了为什么

### curl ###
- 在 Linux/OS X 中查看 man page
