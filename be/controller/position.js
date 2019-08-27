// 数据库操作
const moment = require('moment')
const positionModel = require("../models/position");
const _  = require("lodash");
module.exports =  {
    async render(req,res,next){
        let {list,total} = positionModel.find(req.query);
        if(await list){
            res.render('success',{
                data : JSON.stringify({
                    list : await list,
                    total : await total
                }),
            })
        }
        else{
            res.render('success', {
                data: JSON.stringify({
                    msg: "数据查找失败"
                }),
            })
        }
    },
    async save(req,res,next){
        res.set("content-type","application/json;charset=utf-8");
        let result = await positionModel.save({
            ...req.body,
            companyLogo : req.filename,
            createTime : moment().format('YYYY-MM-DD hh:mm:ss a')
        });
        if (result) {
            res.render('success', {
                data: JSON.stringify({
                    msg: "数据添加成功" ,
                    id : result._id
                }),
            })
        }
        else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: "数据添加失败"
                }),
            })
        }
    },
    async updata(req,res,next){
        let data = {
            ...req.body,
            createTime : moment().format('YYYY-MM-DD hh:mm:ss a')
        };
        // 判断请求中是否存在上一个中间件，传下来的filename属性，若有则添加其域名。
        if (req.filename) {
            data['companyLogo'] = req.filename
        }

        let result = await positionModel.updata(data)
        res.render('success', {
            data: JSON.stringify({
                msg: "数据修改成功",
            }),
        })
    },
    async find(req,res,next){
        let result = await positionModel.findById(Object.keys(req.body)[0]);
        if(result){
            res.render('success', {
                data: JSON.stringify({
                    msg: "数据查找成功",
                    result
                }),
            })
        }
        else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: "数据查找失败",
                }),
            })
        }
    },
    async remove(req,res,next){
        let result = await positionModel.remove(req.body.id);
        if(result){
            res.render('success', {
                data: JSON.stringify({
                    msg: "数据删除成功",
                }),
            })
        }
        else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: "数据删除失败",
                }),
            })
        }
    },
    async search(req,res,next){
        let result = await positionModel.search(req.body.searchValue)
        if(result){
            let total = result.length;
            res.render('success', {
                data: JSON.stringify({
                    msg: "数据搜索成功",
                    result,
                    total
                }),
            })
        }
        else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: "数据搜索失败",
                }),
            })
        }
    }
}