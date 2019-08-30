// 数据库操作，增删查改
const mongoose = require("../util/db");
const Position =  mongoose.model("positions",{  //mongoose.model("集合名"，域名(也就是字段名)) 可以自动建库
    companyLogo : String,
    companyName : String,
    positionName : String,
    city : String,
    createTime :String,
    salary : String
})
module.exports = {
    save(data){  //存储数据
        let position = new Position(data)
        return position.save();  
    },
    find({ start, count }) {
        return {
            list: Position.find({}).sort({ _id: -1 }).limit(~~count).skip(~~start),
            total: Position.count({})
        }
    },
    updata(data){
        return Position.updateOne( {_id : data.id} , data)
    },
    findById(id){
        return Position.findById(id)
    },
    remove(id){
        return Position.deleteOne({_id:id})
    },
    search(keyword){
        return Position.find({
            $or : [
                {
                    companyName : new RegExp(keyword,'gi')
                },
                {
                    positionName : new RegExp(keyword,'gi')
                },{
                    city : new RegExp(keyword,'gi')
                }
            ]
        }).sort({_id : -1})
    },
    findAll(){
        return Position.find({})
    }
}