// 对数据进行操作。
// 路由操作。
const bcrypt = require('bcrypt');
const UserModel = require("../models/users");
module.exports =  {
    // 登录
    async signIn(req,res,next){
        // 密码加密  =>  返回的是个promise对象。 可以放在工具类的包内
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            });
        });


        let result = await UserModel.save(req.body);  //返回的是一个promise对象，异步进行取值。
        // 由于在model中的users.js中数据加入到数据库中，参数进行了结构，故可以直接传req.body整个url
        console.log(result);
        res.send("succ");
    },

    //注册 
    async signUp(req,res,next){
        let result = await UserModel.save(req.body);
        res.send("246");
    }
}