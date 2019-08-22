//由于Node.js不支持ES6的模块暴露方式，故选择COMMONJS的模块化规范。
var express = require('express');
var router = express.Router();
const UserC  = require( "../controller/users");
/* GET users listing. */
router.post('/signinL', UserC.signIn);//登录时，请求的接口
// 对接口的相应，数据的回应 => 写成一个模块。
router.post('/signupL', UserC.signUp);//注册时，请求的接口

router.get('/isSign',UserC.isSign); //验证是否登录

router.get('/signoutL',UserC.signOut);//退出登录

module.exports = router;
