const mongoose = require("../util/db");
const Position =  mongoose.model("positions",{  //mongoose.model("集合名"，域名(也就是字段名)) 可以自动建库
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
    // find(){
    //     return Position.find({}).sort({_id : -1})
    // },
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
    }
}