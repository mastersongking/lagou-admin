var multer = require('multer')
var path   = require("path");
var random = require("string-random");
let filename = ''
var storage = multer.diskStorage({
    destination: function (req, file, cb) { //设置文件的存储目录
        cb(null, path.resolve(__dirname,"../public/uploads"))
    },
    filename: function (req, file, cb) { //设置文件名
        filename = random(8) + "-" + Date.now() + file.originalname.substr(file.originalname.lastIndexOf("."));
        cb(null,filename);
    }
})//file是上传文件的基本信息。包括域名(input的name值)、图片源名等

// 自定义过滤函数。设置那些文件可以上传，那些不能上传。
function fileFilter (req, file, cb) {    
    // console.log(file);  //{ fieldname: 'companyLogo',
    //                     originalname: 'logo-3.jpg',
    //                     encoding: '7bit',
    //                     mimetype: 'image/jpeg' }
    let index = ['image/png','image/jpg','image/gif','image/jpeg'].indexOf(file.mimetype);
    if(index === -1){
        cb(new Error('文件类型必须是.jpg, .png, .gif, .jpeg'))
    }
    else{
        cb(null, true)
    }
  }
// 文件过滤的方法只能是判断当有文件上传时，进行格式类型的过滤
// 若没有文件上传，则直接执行next()，执行下一个中间件。
var upload = multer({ storage , fileFilter}).single("companyLogo"); //调用multer方法，传入两个参数。以及上传文件的域名。告诉它那一个input是上传的文件。
module.exports = (req,res,next)=>{
    upload(req, res, function (err){
        if(err){ //与fileFilter中的Error构造函数相对应。
            res.render("fail",{
                data : JSON.stringify({
                    msg : err.message
                })
            })
        }
        else{
            req.filename = filename  //请求头中附加上文件且经过处理的文件名。
            next();
        } 
    })
}