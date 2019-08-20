//专门链接数据库
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/lagou');  //本地数据库的地址。lagou => 数据库的名字
module.exports = mongoose;