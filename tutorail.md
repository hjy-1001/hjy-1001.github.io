# Gemorion 个人网站使用与更新教程（Sci‑Fi 主题，Markdown 驱动）

本教程面向站点所有者 Gemorion，目标是让你“只需上传新的 Markdown 文件即可更新”四大模块页面：
- 随笔（Essays）
- 知识分享（Knowledge）
- 作品集（Gallery）
- 个人简介（About）

并保持统一的科幻风格（霓虹色、高对比、星空/粒子背景）。

---

## 许可与所有权
- 所有者：Gemorion
- 代码与随笔：转载需注明出处（作者与原文链接），商业用途需提前联系授权
- 艺术作品（图片、插画、摄影、设计等）：禁止转载及商业用途
- 详见项目根目录的 `LICENSE`

---

## 目录结构说明

当前主要结构（简化）：
```
根目录/
├─ _config.yml           # Jekyll 配置（标题、作者、插件、社交信息等）
├─ index.html            # 主页（当前为静态 HTML）
├─ README.md             # 项目说明
├─ LICENSE               # 自定义许可
├─ assets/               # 静态资源
│  ├─ css/style.css      # 全站样式（含粒子/动画/配色等）
│  ├─ js/script.js       # 全站交互（打字机、粒子、筛选等）
│  └─ images/            # 图片资源与占位说明
└─ essays/               # 随笔静态页面（示例）
   ├─ index.html
   └─ learning-thoughts.html
```

为了实现“上传 Markdown 自动更新”，推荐改造成 Jekyll 的集合（Collections）结构：
```
根目录/
├─ _config.yml
├─ index.html 或 index.md           # 首页（使用布局渲染）
├─ _layouts/                        # 页面/文章布局
│  ├─ default.html
│  ├─ list.html                     # 列表页（自动列出集合项）
│  └─ item.html                     # 集合项详情页
├─ _includes/                       # 可复用片段（头部、脚注、导航、SEO、星空背景等）
│  ├─ head.html
│  ├─ header.html
│  ├─ footer.html
│  └─ seo.html
├─ _sass/（可选）                   # 样式模块化
├─ assets/
│  ├─ css/style.css
│  ├─ js/script.js
│  └─ images/
├─ _essays/                         # 随笔 Markdown（集合）
│  └─ 2025-08-12-sample.md
├─ _knowledge/                      # 知识分享 Markdown（集合）
│  └─ 2025-08-12-ml-notes.md
├─ _gallery/                        # 作品集 Markdown（集合）
│  └─ project-nebula.md
├─ about.md                         # 个人简介 Markdown（普通页面）
├─ essays.md                        # 列表页：随笔
├─ knowledge.md                     # 列表页：知识分享
└─ gallery.md                       # 列表页：作品集
```

> 说明：创建 `_essays`、`_knowledge`、`_gallery` 后，将在 `_config.yml` 中开启集合并配置 `output: true`，使它们的 Markdown 自动生成详情页；`essays.md`/`knowledge.md`/`gallery.md` 列表页会自动遍历集合项呈现目录。

---

## 本地预览方式（macOS）

你可以选择“纯静态预览”（无需 Ruby）或“Jekyll 预览”（支持集合渲染）。

### 1) 纯静态预览
- 适用于当前静态 HTML 结构
- 命令：
```
python -m http.server 8000
# 打开 http://localhost:8000
```

### 2) Jekyll 预览（推荐，支持集合与 Markdown 渲染）
1. 安装 Ruby（macOS 可使用 `rbenv` 或 `brew` 安装）
2. 在仓库根目录创建 `Gemfile`，内容示例：
```
source 'https://rubygems.org'

gem 'github-pages', group: :jekyll_plugins
```
3. 安装依赖并启动：
```
bundle install
bundle exec jekyll serve
# 打开 http://127.0.0.1:4000
```

> GitHub Pages 推荐使用 `github-pages` 统一版本管理，避免本地与线上版本不一致。

---

## 将站点改造成 Markdown 驱动（一步步）

### 1) 配置集合（_config.yml）
在 `_config.yml` 中添加：
```
collections:
  essays:
    output: true
    permalink: /essays/:name/
  knowledge:
    output: true
    permalink: /knowledge/:name/
  gallery:
    output: true
    permalink: /gallery/:name/
```
并确保启用插件：
```
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
```

### 2) 新建布局与包含
- `_layouts/default.html`：HTML 基础骨架，包含 `head`、导航、页脚
- `_layouts/item.html`：渲染单篇 Markdown（随笔/知识/作品详情）
- `_layouts/list.html`：渲染集合列表（分页可选）
- `_includes/head.html`：`jekyll-seo-tag`、Sci‑Fi 字体/配色、Open Graph、favicon
- `_includes/header.html`/`footer.html`：统一导航与版权（Owner: Gemorion）
- `_includes/hero-stars.html`：星空/粒子背景片段（可复用）

> 小贴士：可将当前 `index.html` 的导航、页脚、粒子背景拆分成 `_includes/`，便于各页面复用。

### 3) 创建集合目录
- `_essays/`、`_knowledge/`、`_gallery/`（名称与 `_config.yml` 一致）
- 每个集合内新增 Markdown 文件即可自动生成详情页

### 4) 列表页（入口导航页）
- `essays.md`、`knowledge.md`、`gallery.md`：使用 `layout: list`，在模板中循环对应集合并显示摘要、日期、标签、封面等
- `about.md`：使用 `layout: item` 或 `layout: page` 展示个人简介

---

## 内容编写规范（Front Matter 模板）

### A. 随笔 `_essays/*.md`
```
---
layout: item
title: 深度学习的学习路径
date: 2025-08-12
categories: [随笔]
tags: [思考, 学习方法]
summary: 从目标、素材、实践、复盘四个角度，构建可落地的深度学习路径。
cover: /assets/images/essays/deeplearning-path.jpg
---

正文使用 Markdown 书写。
```

### B. 知识分享 `_knowledge/*.md`
```
---
layout: item
title: Transformer 直观理解
date: 2025-08-12
categories: [知识分享]
tags: [NLP, Transformer]
summary: 从注意力出发，解释 Transformer 的核心机制与常见变体。
cover: /assets/images/knowledge/transformer.jpg
---

正文使用 Markdown 书写。
```

### C. 作品集 `_gallery/*.md`
```
---
layout: item
title: Project Nebula
date: 2025-08-12
category: Web
summary: 一个科幻主题的交互式可视化站点。
cover: /assets/images/gallery/nebula-cover.jpg
links:
  demo: https://example.com/nebula
  repo: https://github.com/Gemorion/nebula
---

项目亮点、技术栈、截图说明等。
```

### D. 个人简介 `about.md`
```
---
layout: item
title: 关于我
permalink: /about/
---

简述个人背景、研究兴趣、联系方式（邮箱、GitHub、LinkedIn）等。
```

---

## Sci‑Fi 科幻主题建议
- 颜色：霓虹紫（#8b5cf6）、电光蓝（#06b6d4/#3b82f6）、星耀金（#f59e0b）
- 背景：线性渐变 + 星空粒子（CSS 动画 + JS 生成）
- 字体：半几何无衬线（如 Inter）、数字风等
- UI：发光边框、卡片悬停、扫描线、流明按钮
- 在 `assets/css/style.css` 中集中定义 CSS 变量，页面只改变量即可换肤

---

## 图片与媒体
- 放在 `assets/images/` 下的对应子目录（`essays/`、`knowledge/`、`gallery/`）
- 在 Front Matter 用 `cover` 引用封面，正文用 Markdown `![]()` 嵌入其它图片
- 文件名建议使用英文与短横线，避免空格与中文空格

---

## SEO 与站点地图
- 在 `<head>` 中引入 `{% seo %}`（`_includes/head.html` 中），自动生成基础 SEO 标签
- 开启 `jekyll-sitemap` 后会生成 `sitemap.xml`
- 为每篇内容添加清晰的 `title`、`summary`、`cover`，提高分享与收录质量

---

## 部署到 GitHub Pages
1. 代码推到 GitHub 仓库（`main` 分支）
2. 仓库 Settings → Pages → Branch 选择 `main`（或 `gh-pages`），保存
3. 等待构建完成，访问 GitHub Pages 域名

> 若使用集合与自定义插件，推荐本地使用 `github-pages` 版本构建以保证一致性。

---

## 常见问题排查
- 页面不更新：清浏览器缓存，或确认 GitHub Pages 已重新构建
- Markdown 不渲染：确认 Front Matter 三短横线 `---` 正确且编码为 UTF‑8
- 图片不显示：检查路径是否以 `/assets/images/...` 开头，文件是否已提交
- 中文链接问题：尽量使用英文 slug（文件名），通过 `title` 呈现中文标题
- 日期排序：集合会按照 `date` 排序；确保 Front Matter 中 `date` 合法

---

## 推荐工作流
1. 在对应集合目录新增一个 `.md` 文件，补齐 Front Matter
2. 将图片放到 `assets/images/{集合名}/`，并在 Front Matter/正文中引用
3. 本地 `bundle exec jekyll serve` 预览无误后推送到 GitHub

---

## 后续重构计划（由静态页 → Markdown 驱动）
- 拆分 `index.html` 的头部/尾部到 `_includes/`
- 新增 `_layouts` 与 `list.html`/`item.html` 布局
- 将 `essays/` 里的静态 HTML 迁移为 `_essays/` 下的 Markdown
- 新建 `essays.md`、`knowledge.md`、`gallery.md` 列表页
- `about.md` 作为个人简介页

如需，我可以一次性提交上述结构和基础模板，之后你只需放 Markdown 即可自动更新全站。
