import userView from "../view/user.art";
let _url = "";
let _type = "";
export default {
    async render(){
        // 未登录和已登录的navbar是不同的
        //做是否登录的逻辑处理，以及页面渲染。
        // userView是loader返回的函数
        // 此函数既可以用于路由的模板渲染(在res.render(userView,data))
        // 有可以用于直返回字符串userView({data})
        let result = await this.cookie();
        let html = userView({ //art-template 模板的应用。
            // true => 已登录  false => 未登录
            isSigin : result.state,
            username : result.data.username
        })
        $(".user-menu").html(html);

        this.bindEventBtn();
    },
    cookie(){
        let _url = "/api/users/isSign";
        return $.ajax({
            url : _url ,
            dataType : "json",
            success(res){
                return res;
            }
        })
    },
    bindEventBtn(){
        // 登录注册按钮的事件绑定。
        $(".user-menu").on("click",".hidden-xs",function(){
            // 由于登录注册最后提交表单数据均是同一个按钮，
            // 需要设置一个_url作为标示，来请求不同的接口
            // let index = $(this).index();
            _type = $(this).attr("id"); //=>根据type判定用户点击的是登录还是注册
            _url = _type === "btn-signIn" ? '/api/users/signinL' : '/api/users/signupL';
            $('input').val("");
        })
        $(".user-footer").on("click","#btn-submit",()=>{
            let data = $("#user-form").serialize() //序列表表格内容为字符串，用于 Ajax 请求。
            // 获取用户名、密码两个字段的内容，然后直接提交。
            $.ajax({
                url : _url,
                data,
                type : "POST",
                success : $.proxy(this.successMsg,this),
            })
        })
        $(".user-menu").on("click","#btn-signout",()=>{
            $.ajax({
                url : "/api/users/signoutL",
                dataType :"json",
                success : $.proxy(this.successMsg,this),
            })
        })
    },
    successMsg(res){
        if(_type === "btn-signUp" ){ //注册
            alert(res.data.msg)
        }
        else if(_type === "btn-signIn")//登录
        { 
            if(res.state){
                let html = userView({
                    isSigin : res.state,
                    username : res.data.username
                })
                $(".user-menu").html(html);
            }
            else{
                alert(res.data.msg);
            }
        }
        else{
            location.reload();
        }
    }
}