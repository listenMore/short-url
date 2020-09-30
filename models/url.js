// 引入 mongoose
const mongoose = require('mongoose');

// 创建数据 结构
const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: { type: String, default: Date.now() }
})

module.exports = mongoose.model('url', urlSchema)