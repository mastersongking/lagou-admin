const jwt  = require("jsonwebtoken");
const fs   = require("fs");
const path = require("path");
// 使用非对称方式，生成token
module.exports = {
    sign(payload){ //payload是需要进行加密的内容
        let privateKey = fs.readFileSync(path.resolve(__dirname,"./key/rsa_private_key.pem"));
        let token = jwt.sign(payload,privateKey,{ algorithm:'RS256'});
        return token
    },
    verify(token){ //解密
        return new Promise((resolve,reject)=>{
            let publicKey = fs.readFileSync(path.resolve(__dirname,"./key/rsa_public_key.pem"));
            jwt.verify(token , publicKey ,(err,decoded)=>{
                if(err){
                    resolve(false)
                }
                else{
                    resolve(decoded)
                }
            })
        })
        
    }
}
