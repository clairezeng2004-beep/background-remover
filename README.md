# 🎨 AI 智能抠图工具

纯前端 AI 抠图网站，调用 **remove.bg API** 一键去除图片背景，支持透明 PNG 导出。

## ✨ 功能特性

- 🧠 **AI 智能识别** — 调用 remove.bg 云端深度学习模型，精准抠图
- 📤 **拖拽上传** — 支持点击或拖拽上传图片（JPG/PNG/WebP/BMP）
- 🔑 **API Key 管理** — 本地存储 Key，安全便捷
- ⬇️ **高清导出** — 透明背景 PNG 图片直接下载
- 🌐 **纯前端** — 静态部署即可运行，无需后端服务器

## 使用方式

1. 打开网页后输入 **remove.bg API Key**（[免费获取](https://www.remove.bg/api#pricing)，每月 50 张）
2. 拖拽或点击上传图片
3. 点击「开始抠图」等待处理完成
4. 预览并下载结果

## 本地预览

```bash
# 直接在浏览器打开 index.html 即可
open index.html

# 或用任意静态服务器
npx serve .
```

## 部署

本项目为纯静态前端，可部署到任何平台：

- **Vercel**: 连接 GitHub 仓库后自动部署 ✅
- **GitHub Pages**: 推送到 `gh-pages` 分支
- **Netlify / Cloudflare Pages**: 拖拽文件夹即可

## 免责声明

本工具使用 [remove.bg](https://www.remove.bg/) 提供的 API 服务。用户需要自行注册并获取 API Key。

## License

MIT
