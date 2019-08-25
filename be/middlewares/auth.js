module.exports = {
    auth(req,res,next){
        let username = req.session.username;
        if(username){ //判断是否为登录状态
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