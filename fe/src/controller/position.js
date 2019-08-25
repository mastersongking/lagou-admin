import positionListView from "../view/position-list.art";
// positionView是一个函数，只有调用后，才返回一个字符串
import positionAdd from "../view/position-add.art";
import positionEdit from "../view/position-edit.art";
const _ = require("loadsh");
const COUNT = 5;//每页显示的数量
function loaddata(pageNo,res){//页面渲染，(职位列表s)
    let start = pageNo * COUNT;
    $.ajax({
        url : "/api/position/list",
        dataType : "json",
        data :{
            start,
            count:COUNT
        },
        success(result){    
            if(result.state){
                res.render(positionListView({
                    ...result.data,
                    pageNo,
                    pageCount: _.range(Math.ceil(result.data.total / COUNT))
                }));
            }
            else{
                res.go('/')//go(url,body) => 更改路由，url
            }
        }
    })
}
function reWrite(res,id){
    $.ajax({
        url : "/api/position/edit_list",
        dataType : "json",
        type : "POST",
        data : id,
        success(result){
            if(result.state){
                res.render(positionEdit({
                    list : result.data.result
                }));
            }
            else{
                alert(result.data.msg)
            }
        }
    })
}
function dataDel(res,id){
    $.ajax({
        url : "/api/position/data_del",
        dataType : "json",
        type : "delete",
        data : {
            id
        },
        success(result){
            if(result.state){
                res.go("/position?_="+ new Date().getTime())
            }
            else{
                alert(result.data.msg)
            }
        }
    })
}
export default {
    render(req,res,next){
        loaddata(0,res);
        $("#router-view").on("click","#addbtn",()=>{
            res.go('/position_add');
        })
        $("#router-view").on("click",".btn-update",function(){
            res.go('/position_edit',{  //路由进行传参
                id :$(this).attr("data-id")
            });
        })
        $("#router-view").on("click",".btn-delete",function(){
            dataDel(res,$(this).attr("data-id"));
        })
        // 分页
        $("#router-view").on("click",".pagination li[data-index]",function(){
            loaddata($(this).attr("data-index"),res);
        })
    },
    add(req,res,next){ //添加
        res.render(positionAdd());
        $("#router-view").unbind("click").on("click","#possubmit",()=>{ //提交 每次页渲染都绑定事件，越来越多。
            let data = $("#possave").serialize();
            $.ajax({
                url : "/api/position/save" ,
                type : "POST",
                data,
                success(result){
                    if(result.state){
                        res.go('/position');
                    }
                    else{
                        alert(result.data.msg);
                    }
                }
            })
        })
        $("#router-view").on("click","#posback",()=>{  //返回
            res.back();
        })
    },
    edit(req,res,next){ //修改
        // 通过req来获取路由上传过来的参数。
        reWrite(res,req.body.id);

        $(".content-wrapper").unbind("click").on("click","#possubmit_1",()=>{ //提交
            let data = $("#posedit").serialize() + "&id=" + req.body.id;
            $.ajax({
                url : '/api/position/updata',
                type : "PATCH",
                data,
                dataType :"json",
                success(result){
                    if(result.state){
                        res.go('/position');
                    }
                    else{
                        alert(result.data.msg);
                    }
                }
            })
        })

        $("#router-view").unbind("click").on("click","#posback_1",()=>{ //返回
            res.back();
        })
    }
}