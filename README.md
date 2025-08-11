# Gemorion 个人网站

一个现代化、响应式的个人网站，包含随笔、学术分享、作品集和个人简介四个主要模块。

## 功能特点

### 🎨 现代化设计
- 响应式布局，支持各种设备
- 炫酷的动画效果和交互
- 渐变色彩和现代化UI设计
- 优雅的打字机效果和粒子背景

### 📝 内容模块
- **个人简介**: 展示个人信息、技能和联系方式
- **随笔心得**: 记录生活感悟和思考
- **学术分享**: 展示研究论文、演讲和文献综述
- **作品集**: 展示项目作品，支持分类筛选

### ⚡ 技术特性
- 纯HTML/CSS/JavaScript实现
- 平滑滚动和导航高亮
- 筛选和搜索功能
- 懒加载和性能优化
- SEO友好的结构

## 文件结构

```
Gemorion.github.io/
├── index.html              # 主页
├── _config.yml             # Jekyll配置
├── README.md               # 说明文档
├── assets/                 # 静态资源
│   ├── css/
│   │   └── style.css       # 主要样式文件
│   ├── js/
│   │   └── script.js       # 主要脚本文件
│   └── images/             # 图片资源
└── essays/                 # 随笔文章
    ├── index.html          # 随笔列表页
    └── learning-thoughts.html # 示例文章
```

## 快速开始

### 1. 本地预览
```bash
# 使用Python启动本地服务器
python -m http.server 8000

# 或使用Node.js
npx serve

# 然后访问 http://localhost:8000
```

### 2. GitHub Pages部署
1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择main分支作为源
4. 网站将在 `https://your-username.github.io` 上线

### 3. 自定义内容

#### 修改个人信息
编辑 `index.html` 中的以下部分：
- 导航栏标题
- Hero区域的姓名和介绍
- 关于我部分的个人信息
- 联系方式和社交链接

#### 添加随笔文章
1. 在 `essays/` 目录下创建新的HTML文件
2. 参考 `learning-thoughts.html` 的格式
3. 在 `index.html` 和 `essays/index.html` 中添加文章链接

#### 更新作品集
修改 `index.html` 中的作品集部分：
- 更换项目图片
- 修改项目标题和描述
- 添加项目链接

#### 自定义样式
编辑 `assets/css/style.css`：
- 修改颜色主题变量
- 调整字体和字号
- 自定义动画效果

## 特色功能

### 🎯 交互效果
- 打字机效果的标题动画
- 粒子背景动画
- 卡片悬停效果
- 平滑滚动导航

### 🔍 筛选功能
- 学术分享按类型筛选
- 作品集按分类筛选
- 动画过渡效果

### 📱 响应式设计
- 移动端优化
- 汉堡菜单
- 触摸友好的交互

### ⚡ 性能优化
- 图片懒加载
- CSS和JS优化
- 滚动节流处理

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 自定义指南

### 颜色主题
在 `style.css` 中修改CSS变量：
```css
:root {
    --primary-color: #6366f1;      /* 主色调 */
    --secondary-color: #8b5cf6;    /* 次要色调 */
    --accent-color: #06b6d4;       /* 强调色 */
}
```

### 字体设置
更改字体可以修改：
```css
body {
    font-family: 'Inter', 'Noto Sans SC', sans-serif;
}
```

### 添加新页面
1. 创建新的HTML文件
2. 包含导航栏和页脚
3. 添加到主导航菜单中

## 许可条款

代码和随笔转载需注明出处，商业用途需联系，艺术作品严禁转载。详见 LICENSE 文件。

## 联系方式

- 邮箱: your-email@example.com
- GitHub: [@Gemorion](https://github.com/Gemorion)

---

⭐ 如果这个项目对你有帮助，请给它一个Star！