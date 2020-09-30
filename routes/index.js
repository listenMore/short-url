// 引入 express
const express = require('express');

// 创建路由实例
const router = express.Router();
const UrlModel = require('../models/url')

router.get('/:code', async (req, res) => {
  
  // 获取 url 对象
  const url = await UrlModel.findOne({ urlCode: req.params.code });

  if (url) {
    res.redirect(url.longUrl)
  } else {
    res.status(404).json('Server err')
  }

})

module.exports = router;