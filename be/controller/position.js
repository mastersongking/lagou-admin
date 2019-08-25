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
        let result = await positionModel.updata({
            ...req.body,
            createTime : moment().format('YYYY-MM-DD hh:mm:ss a')
        });
        if(result){
            res.render('success', {
                data: JSON.stringify({
                    msg: "数据修改成功",
                    req:req.body
                }),
            })
        }
        else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: "数据修改失败",
                }),
            })
        }
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
        res.render('success', {
            data: JSON.stringify({
                msg: "数据查找成功",
            }),
        })
    }
}