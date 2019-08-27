import positionListView from "../view/position-list.art";
// positionView是一个函数，只有调用后，才返回一个字符串
import positionAdd from "../view/position-add.art";
import positionEdit from "../view/position-edit.art";
const _ = require("loadsh");
const COUNT = 5;//每页显示的数量
function loaddata(pageNo,res){//页面渲染，(职位列表s)
    let start = pageNo * COUNT;
    res.pageNo = pageNo;
    $.ajax({
        url : "/api/position/list",
        dataType : "json",
        data :{
            start,
            count:COUNT
        },
        success(result){    
            if(result.state){
                if(result.data.list.length === 0 && pageNo !== 0){ //当当前页没有数据，且不为第一页时
                    pageNo--;
                    loaddata(pageNo,res);
                }
                res.render(positionListView({
                    ...result.data,
                    pageNo,
                    pageCount: _.range(Math.ceil(result.data.total / COUNT)),
                    showPagination : true
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
                    list : result.data.result,
                    id : id
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
                loaddata(res.pageNo,res); //不再是完成删除操作后，跳转回第一页。而是留在当前页。
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
        // 添加
        $("#router-view").on("click","#addbtn",()=>{
            res.go('/position_add');
        })
        // 编辑
        $("#router-view").on("click",".btn-update",function(){
            res.go('/position_edit',{  //路由进行传参
                id :$(this).attr("data-id")
            });
        })
        $("#router-view").on("click",".btn-delete",function(){ //删除数据
            dataDel(res,$(this).attr("data-id"));
        })
        // 分页
        $("#router-view").on("click",".pagination li[data-index]",function(){
            loaddata($(this).attr("data-index"),res);
        })
        //上一页
        $("#router-view").on("click","#prev",function(){
            let currentPageNo = $("#page li[class='active']").attr("data-index");
            if((~~currentPageNo - 1) > -1){
                loaddata(~~currentPageNo - 1 , res);  //防止类型错误。装换为数字类型，进行计算。
            }
        })
        // 下一页 
        $("#router-view").on("click","#next",function(){
            let currentPageNo = $("#page li[class='active']").attr("data-index");
            if(~~currentPageNo + 1 < $(this).parent().attr("data-count") ){
                loaddata(~~currentPageNo + 1 , res);  //防止类型错误。装换为数字类型，进行计算。
            }
        })
        // 搜索
        $("#router-view").on("click","#possearch",()=>{
            let searchValue = $("#keywords").val();
            $.ajax({
                url : "/api/position/search",
                type : "POST",
                dataType : "json",
                data : {
                    searchValue 
                },
                success(result){
                    if(result.state){
                        let total = result.data.result.length;
                        res.render(positionListView({
                            list : result.data.result,
                            showPagination : false,
                            total
                        }));
                    }
                }
            })
        })
    },
    add(req,res,next){ //添加
        res.render(positionAdd());
        $("#router-view").unbind("click").on("click","#possubmit",()=>{ //提交 每次页渲染都绑定事件，越来越多。
            $("#possave").ajaxSubmit({
                url : "/api/position/save" ,
                type : "POST",  
                dataType : "json",
                success(result){
                    // console.log(result);
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
            // 改写后，缺少id的发送
            $("#posedit").ajaxSubmit({
                url : '/api/position/updata',
                type : "PATCH",
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