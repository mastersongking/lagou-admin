import positionView from "../view/position.art";
// positionView是一个函数，只有调用后，才放回一个字符串
export default {
    render(req,res,next){
        res.render(positionView());
    }
}