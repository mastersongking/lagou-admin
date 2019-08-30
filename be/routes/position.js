const PositionList = require("../controller/position");
const authMiddleWare = require("../middlewares/auth");
const multerMiddleware = require("../middlewares/multer");
var express = require("express");
var router  = express.Router();

router.get('/list' , authMiddleWare.auth , PositionList.render);  //前端进行访问时，进行拦截。中间栈方式。

router.get('/findAll', PositionList.findAll)
router.post('/save' , authMiddleWare.auth , multerMiddleware , PositionList.save); //多加一个中间件，解析二进制图片

router.patch('/updata' , authMiddleWare.auth ,multerMiddleware, PositionList.updata); 

router.post('/edit_list' , authMiddleWare.auth , PositionList.find);
router.delete('/data_del' , authMiddleWare.auth , PositionList.remove);
router.post('/search' , authMiddleWare.auth , PositionList.search);//关键字搜索

module.exports = router;