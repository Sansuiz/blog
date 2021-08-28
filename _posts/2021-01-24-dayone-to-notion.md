---
layout: post
title: "把日记从 Dayone 转移到 Notion"
categories: 折腾
tags:
- App
- Web
---

自从 Notion 对个人免费以后，越来越多地使用 Notion，也在 Notion 上记了一阵子日记，感觉体验还行。研究了 Notion 的导出结构后发现 Notion 的导出也做得很好，就没有什么顾虑地把所有的日记从 DayOne 转移到了 Notion。

参考了一些网上的文章，目前看来没有完美解决方案。我综合了各种做法，以下做个简要记录。主要步骤分为，

1. 从 DayOne 导出。DayOne 对导出的支持做得不是很好，遗漏了很多信息，导致后续有不少手工操作的部分。
2. 处理 DayOne 导出数据的格式
3. 导入 Notion
4. 把 Notion 里现有的日记也转移到导入的列表中
5. 在 Notion 进一步处理，以完成和现有日记的整合。

## 从 Notion 导出

在 iOS 端导出带图片的CSV。

主要参考 [https://medium.com/@scottreyes/how-to-import-day-one-entries-into-notion-and-build-an-on-this-day-feature-f1fbf2e74c](https://medium.com/@scottreyes/how-to-import-day-one-entries-into-notion-and-build-an-on-this-day-feature-f1fbf2e74c)

## 处理 DayOne 导出数据的格式

1. 用CSV方式导入到Notion以后，把 CSV 里所有其他的column都删了，只剩 Date 和正文信息。

## 导入 Notion

1. 在 Notion 里 Import
2. 格式为 CSV

## 把 Notion 里现有的日记也转移到导入的列表中

现有的日记只有 Created 时间和正文列。全选后点击 Move，即可转移到 刚刚导入的列表里

## 整合

### 归一化日期

此时，原始的日记时间由Created属性标注，DayOne导入的日记时间由Date属性标注。首先将Date属性改名为dateOverride，然后新建一个属性，类型是Fomular，名字是date，公式为

```jsx
if(empty(prop("dateOverride")), prop("Created"), prop("dateOverride"))
```

出处参考  [https://bitworking.org/news/2020/08/creating-a-date-column-in-notion-that-has-a-default/](https://bitworking.org/news/2020/08/creating-a-date-column-in-notion-that-has-a-default/)

### 曾经今日功能

1. 建一个property OnThisDay, 用公式算出是不是去年今日。

    ```jsx
    if(formatDate(prop("date"), "MMMM D") == formatDate(now(), "MMMM D"), "Yes", "No")
    ```

2. 然后建一个 Gallery View，设置 Filter 为 OnThisDay = Yes

    出处参考 [https://medium.com/@scottreyes/how-to-import-day-one-entries-into-notion-and-build-an-on-this-day-feature-f1fbf2e74c](https://medium.com/@scottreyes/how-to-import-day-one-entries-into-notion-and-build-an-on-this-day-feature-f1fbf2e74c)

### 日历功能

建一个Calendar View，用 date 索引，就可以看到日历视图了。

## 目前缺点

- Notion 加载比较多的数据还是比较慢。

    这个目前好像没办法。如果要找以前的日记，善用搜索。

- DayOne 导出数据里图片的信息都丢失了。虽然图片都在，但是没办法把图片和文章关联起来。大部分图片可以用图片文件的 Modified 时间来判断，但我发现也有不正常显示的。
- 文章内容全在标题。这个可以通过回顾一遍文章，把格式改好。

    以上两条，好像只能手工处理。我现在会在打开 Notion 的时候看看 曾经今日，如果有文章，就顺便手工处理一下，修改格式，再找一下有没有对应时间的图片，可以手工插入。