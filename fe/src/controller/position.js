import positionView from "../view/position.art";
// positionView是一个函数，只有调用后，才返回一个字符串
export default {
    render(req,res,next){
        $.ajax({
            url : "/api/position/list",
            success(result){
                if(result.state){
                    res.render(positionView({
                        list : result.data
                    }));
                }
                else{
                    if(confirm("您尚未登录")){
                        res.go('/')//go(url,body) => 更改路由，url
                    }
                }
            }
        })
    }
}