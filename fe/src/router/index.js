// 根据路由的变换来改变页面的渲染。
// 在html文件中使用a标签来实现路由的切换。
import SMERouter from "sme-router"
const router = new SMERouter('router-view','hash')//所需要渲染的标签的 id 名

import Home from "../controller/home.js";
import Position from "../controller/position.js";
// router.route('/',(req,res,next)=>{
//     res.render(Home);
// })
// 将res.render这个方法拆分成一个模块,引过来后，不需要执行函数。

router.route('/',Home.render)
router.route('/position',Position.render)
router.redirect('/')

export default router;