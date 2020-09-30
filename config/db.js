// 引入 mongoose
const mongoose = require('mongoose');

// 引入 config
const config = require('config');

const mongodbUrl = config.get('mongodbUrl');

// 链接数据库
module.exports = async () => {
  try {
    
    await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Server connected. ' + mongodbUrl);

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}