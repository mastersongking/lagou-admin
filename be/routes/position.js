const PositionList = require("../controller/position");
const authMiddleWare = require("../middlewares/auth");
var express = require("express");
var router  = express.Router();

router.get('/list' , authMiddleWare.auth , PositionList.render);  //前端进行访问时，进行拦截。中间栈方式。
router.post('/save' , authMiddleWare.auth , PositionList.save); 
router.patch('/updata' , authMiddleWare.auth , PositionList.updata); 
router.post('/edit_list' , authMiddleWare.auth , PositionList.find);
router.delete('/data_del' , authMiddleWare.auth , PositionList.remove);

module.exports = router;