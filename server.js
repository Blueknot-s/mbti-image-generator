// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('undici');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: '프롬프트가 없습니다.' });

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) throw new Error('API 요청 실패');
    const buffer = await response.buffer();
    const base64 = buffer.toString('base64');
    const imageUrl = `data:image/png;base64,${base64}`;

    res.json({ url: imageUrl });
  } catch (error) {
    console.error('❌ 이미지 생성 에러:', error);
    res.status(500).json({ error: '이미지 생성 실패' });
  }
});

app.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});
