const mongoose = require("../util/db");

const Users =  mongoose.model("Users",{  //mongoose.model("集合名"，域名(也就是字段名)) 可以自动建库
    username : String,
    password : String
})//定义数据库
module.exports = {
    save({username,password}){ //结构传值
        const users = new Users({
            username,
            password
        })
        return users.save();  //返回的是一个promise对象  ？？ 数据的添加数据的方法。
    }
}