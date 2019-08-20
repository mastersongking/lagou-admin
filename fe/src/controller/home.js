import homeView from "../view/home.art";
// homeView是一个函数，只有调用后，才返回一个字符串
export default{
    render(req,res,next){
        res.render(homeView())
    }
}