---
layout: post
title: "我的Jekyll模版修改记录(2015.02)"
categories: 折腾
tags:
- Jekyll
---
## 2014.05 ##
- 换上[Scribble模版](https://github.com/chloerei/scribble) [\[Github Commit\]](https://github.com/imrickysu/imrickysu.github.io/commit/8d8695fac34e63051b20af183d4b13190e2bb204)

## 2015.02 ##
- 参考[Freshman21](https://github.com/yulijia/freshman21)主题增加文章主题列表和Tags列表 [\[Github Commit\]](https://github.com/imrickysu/imrickysu.github.io/commit/8f52b8cd26fb851ca1fed2a23986a23170b05b4c)，并提交两个Issue [\[1\]](https://github.com/yulijia/freshman21/issues/2) [\[2\]](https://github.com/yulijia/freshman21/issues/3)
- 让Tags页面在某种程度上成为专题列表，省略内容数量为1的Tag，使页面更简洁。[\[Github Commit\]](https://github.com/imrickysu/imrickysu.github.io/commit/ee7f2639c9bf18c531f32b118780b0520bfa0e2b)
- 在Post和Page页面去除导航栏，让页面更简洁。[\[Github Commit\]](https://github.com/imrickysu/imrickysu.github.io/commit/70741babbcf2a1e055dffe1bf2111af3d3d04a04)
- 调整Blog名字的字体大小和位置，增加文章主题字体大小，更突出文章主题 [\[Github Commit\]](https://github.com/imrickysu/imrickysu.github.io/commit/70741babbcf2a1e055dffe1bf2111af3d3d04a04)
- 加大正文字体，更容易阅读 [\[Github Commit\]](https://github.com/imrickysu/imrickysu.github.io/commit/38ce80ee700df33ad95b5597541fd89f77717cc0)
- 增加对`<code>` block的CSS定义，让代码显示更明显 [\[Github Commit\]](https://github.com/imrickysu/imrickysu.github.io/commit/89a69985b37cd9538959b66fafa706c31318adf4)
- 删除Disqus评论的支持。评论有两个作用：读者传递信息给作者、读者之间互相沟通。不提供评论通道，有用的信息还是能传递到我的；我没有那么多读者，他们之间也不需要沟通。所以就把评论关闭了。[\[Github Commit\]](https://github.com/imrickysu/imrickysu.github.io/commit/35e8ce9b7ddb6b6f47ee47c161096d2a3e80edcf)
- 修改permalink样式。使用`/year/month/title`样式，去掉URL中的Category，因为我很有可能将一篇文章重新分类，重新分类就导致URL改变，这就不是permalink的初衷了。 [\[Github Commit\]](https://github.com/imrickysu/imrickysu.github.io/commit/9772f0105b6a183776fbefabb0619d2e23f8cd39) 