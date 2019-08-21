const bcrypt = require("bcrypt");
module.exports = {
    crypt(myPlaintextPassword){  //密码加密
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
                    resolve(hash);
                })
            });
        });
    },
    compare(myPlaintextPassword,hash){ //密码比对
        return new Promise((resolve,reject)=>{
            bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
                resolve(res);
            });
        })
    }
}

//密码加密的使用：对其进行改造，让加密过程返回一个promise对象。
// var bcrypt = require('bcryptjs');
// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
//     });
// });