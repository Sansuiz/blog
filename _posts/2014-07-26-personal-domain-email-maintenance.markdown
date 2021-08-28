---
layout: post
title: "用QQMail和Google托管个人域名邮箱"
categories: 折腾
tags:
- Web
- E-Mail
- App
---
突然意识到我收不到发到i@rickysu.com的邮件了。

i@rickysu.com 的邮件是用Gmail托管的。这是很久以前申请的免费账号。自从2012年开始，Google就停止免费账号的申请了，但是老用户的免费账号是可以延用的，每个域名最多绑定10个邮箱。

看了一下域名商的设置，MX记录并没有被修改。为什么邮件就收不到了呢？尝试用这个账户登录Google，Google说这个账户不存在。多奇妙！是设置出问题了吗？我现在要看是不是设置出问题了也看不到。

#### 于是办了第二件很蠢的事情（第一件稍后再说）：我又注册了一下Google私有域名托管服务，也就是www.google.com/a 。

注册的时候，我是想验证一下我的账户是不是没有了，因为如果已经注册过，就不能重复注册同一个域名吧？况且注册页面写着试用30天，反正不会收费吧？结果果然是可以注册。进了控制面板看到了Billing信息，才想起来，原来现在这服务是$5每用户每月的。

后来四处询问，才发现有人遇到跟我同样的问题。在4/19Google发过来Google发来过邮件，说

    We noticed that you haven’t used your Google Apps account for the domain rickysu.com in over a year. Please let us know if you’d like to keep this account.
    If we don’t hear from you in 30 days, your rickysu.com Google Apps account will be automatically closed.

5/17号账户被关闭，但是可以导出数据；6/17账户永久关闭。

#### 这就是第一件蠢事：当时看到说要关闭Google Apps的邮件，我以为是GAE，完全没有联想到是Gmail Account，就没有在意。

接下去是处理第二件蠢事的后遗症：为了验证我收到过Google的提醒邮件，我想到Gmail里搜一下。可是此时我登录不进自己的Gmail账户了。这一点是Google做的很蠢的事了：用gmail用户名登录后，网页强行跳转到rickysu.com的管理页面。手机端的Gmail还是可以用的。

我感觉到要正常使用我的Gmail账户，必须把Google Apps的账户删掉，完全解除关联才可以。Google Apps的设置也超级麻烦，看看它的[帮助说明](https://support.google.com/a/answer/1257646), 总是互相递归引用，步骤也很多，花了大半小时没搞定。最后总结出来如果是我这样还没进行过设置的账户，需要先删除Billing信息，然后在`Company profile -> Profile -> Account Deletion` 里删除。

这下世界总算清净了。在QQ Mail里设置好域名邮件，Forward所有邮件到原始的Gmail邮箱。基本和原来的体验一样了。

### 关于为什么要使用Gmail而不直接用QQ邮箱
QQ邮箱速度快，Gmail在国内连不上，这点有点是显而易见的。但是为什么我还是执着地要用Gmail作为主邮箱呢？主要是因为Gmail的Smart Filter做得太好了，让我已经欲罢不能。

由于注册过很多网站和服务，他们都会发提醒邮件，加上正常沟通所使用的邮件，一天收到的邮件数量达到50封以上。如果全都一条一条罗列下来看，估计要看疯了。Gmail自动将他们分类好，可以减少Distraction，减少看邮件的压力。