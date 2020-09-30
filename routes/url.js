// 引入 express
const express = require('express');
// 引入 valid-url
const validUrl = require('valid-url');
// 引入 shortid
const shortid = require('shortid');

// 创建路由实例
const router = express.Router();
const config = require('config');
const UrlModel = require('../models/url');

router.post('/shorten', async (req, res) => {

  // 1. 获取长链接
  const { longUrl } = req.body;

  // 2. 验证长链接
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json('Invalid long url')
  }
  try {
    
    // 3. 检测 longUrl 是否已经存在于数据库
    let url = await UrlModel.findOne({ longUrl })
    if (url) {
      return res.json(url)
    }

    // 4. 生成 url code
    const urlCode = shortid.generate();

    // 5. 生成短链接
    const shortUrl = config.get('baseUrl') + urlCode;

    // 6. 保存信息
    url = await new UrlModel({
      urlCode, longUrl, shortUrl
    })

    url.save()

    // 7. 响应
    res.json(url)
  } catch (error) {
    
    console.log(error)
    res.status(500).json('Server error .')

  }

})

module.exports = router;