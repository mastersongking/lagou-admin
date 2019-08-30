const tokenTool = require("../util/token");
module.exports = {
    async auth(req,res,next){
        let token = req.get('x-access-token')// 获取header，首部上的数据
        let result = await tokenTool.verify(token);
        if(result){ //判断是否为登录状态
            next();
        }
        else{
            res.render('fail',{
                data : JSON.stringify({
                    msg : "未曾登录过"
                }),
            })
        }
    }
}