const PositionList = require("../controller/position");
const Users   = require("../controller/users")
var express = require("express");
var router  = express.Router();

router.get('/list',Users.isSign,PositionList.render);  //前端进行访问时，进行拦截。中间栈方式。

module.exports = router;