// 引入 express 模块
const express = require('express');

// 引入 config
const config = require('config');
// 引入 connectDB
const connectDB = require('./config/db');


// 创建 app 实例对象
const app = express();

// connect mongodb database
connectDB()

// 解析 json 数据
app.use(express.json());

// 配置路由
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


// 监听端口号
const PORT = config.get('port');

app.listen(PORT, () => console.log('Server listening ' + PORT));