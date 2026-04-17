const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { remove } = require('rembg');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 配置文件上传（内存存储）
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('不支持的文件格式，请上传 JPG/PNG/WebP/BMP 图片'));
    }
  }
});

// 首页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 抠图 API
app.post('/api/remove-bg', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请选择要上传的图片' });
    }

    console.log(`📷 处理图片: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)}KB)`);

    // 调用 rembg AI 去除背景
    const outputBuffer = await remove(req.file.buffer, {
      alphaMatting: true,
      alphaMattingForegroundThreshold: 240,
      alphaMattingBackgroundThreshold: 10,
      alphaMattingErodeSize: 10,
    });

    console.log(`✅ 处理完成，输出大小: ${(outputBuffer.length / 1024).toFixed(1)}KB`);

    // 返回 PNG 图片（带透明通道）
    res.set('Content-Type', 'image/png');
    res.send(outputBuffer);

  } catch (error) {
    console.error('❌ 处理失败:', error);
    res.status(500).json({ error: `处理失败: ${error.message}` });
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║   🎨 AI 智能抠图工具已启动          ║
║   📍 http://localhost:${PORT}          ║
╚══════════════════════════════════════╝
  `);
});
