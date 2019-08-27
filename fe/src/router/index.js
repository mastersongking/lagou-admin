// 根据路由的变换来改变页面的渲染。
// 在html文件中使用 a 标签来实现路由的切换。
import SMERouter from "sme-router"
const router = new SMERouter('router-view','hash')//所需要渲染的标签的 id 名

import Home from "../controller/home.js";
import Position from "../controller/position.js";
import userView from "../controller/user.js";

//sem-router中间件，做按钮高亮
router.route("*",(req,res,next)=>{    //路由切换时，事件发生
    $(`.sidebar-menu li a[href="/#${req.url}"]`) //req.url 为/ 和 /position
    .parent()
    .addClass("active")
    .siblings()
    .removeClass("active");
})

// router.route('/',(req,res,next)=>{
//     res.render(Home);
// })
// 将res.render这个方法拆分成一个模块,引过来后，不需要执行函数。
router.route('/',Home.render)
router.route('/position',Position.render)
router.route('/position_add',Position.add)
router.route('/position_edit',Position.edit);

router.redirect('/') //重定向  (需要修改)
userView.render();
export default router;