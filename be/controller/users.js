// 对数据进行操作。
// 路由操作。
const UserModel = require("../models/users");
const CryptTool = require("../util/bcrypt");
module.exports =  {
    // 注册
    async signUp(req,res,next){
        let {username,password} = req.body;
        // 密码加密  =>  返回的是个promise对象。 可以放在工具类的包内
        res.set("content-type","application/json;charset=utf-8");
        // 数据比对
        if(username === "" || password=== ""){
            res.render('fail',{
                data : JSON.stringify({
                    msg : "账号或密码不能为空"
                }),
            })
        }
        else if( await UserModel.findOne(username)){
            res.render('fail',{
                data : JSON.stringify({
                    msg : "该用户已存在，请重新注册"
                }),
            })
        }
        else{
            let cryptPwd = await CryptTool.crypt(password);
            await UserModel.save({
                username,
                password: cryptPwd
            });
            res.render('success',{
                data : JSON.stringify({
                    msg : "注册成功"
                }),
            })
        }
          
        //返回的是一个promise对象，异步进行取值。 
        // 由于在model中的users.js中数据加入到数据库中，参数进行了结构，故可以直接传req.body整个url

        // 返回成功信息
    },

    //登录 
    async signIn(req,res,next){
        let {username,password} = req.body;
        // 进行数据库比对,寻找相同用户名的数据
        let result = await UserModel.findOne(username)  //返回的额Boolean值
        // 比对用户名，存在则继续比对密码。
        res.set("content-type","application/json;charset=utf-8");
        if(username === "" || password === ""){
            res.render('fail',{
                data : JSON.stringify({
                    msg : "账号或密码不能为空"
                }),
            })
        }
        else if(result){
            if(await CryptTool.compare(password,result.password)){
                req.session.username = username; //埋下一个cookie的种子
                res.render('success',{
                    data : JSON.stringify({
                        msg : "用户登录成功",
                        username
                    }),
                })
            }
            else{
                res.render('fail',{
                    data : JSON.stringify({
                        msg : "账号或密码错误"
                    }),
                })
            }
        }
        else{
            res.render('fail',{
                data : JSON.stringify({
                    msg : "该用户不存在"
                }),
            })
        }
    },

    // 验证是否曾登录,就是验证是否有cookie
    async isSign(req,res,next){
        let username = req.session.username;
        res.set("content-type","application/json;charset=utf-8");
        if(username){
            next();
            res.render('success',{
                data : JSON.stringify({
                    msg : "曾经登录过",
                    username
                }),
            })
        }
        else{
            res.render('fail',{
                data : JSON.stringify({
                    msg : "未曾登录过"
                }),
            })
        }
    },

    // 退出登录，清空cookie
    async signOut(req,res,next){
        // res.set("content-type","application/json;charset=utf-8");
        req.session = null;
        res.render('fail',{
            data : JSON.stringify({
                msg : "是否退出",
            })
        })
    }
}