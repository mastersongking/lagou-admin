import userView from "../view/user.art";
let _url = "";
export default {
    render(){
        // 未登录和已登录的navbar是不同的
        //做是否登录的逻辑处理，以及页面渲染。
        // userView是loader返回的函数
        // 此函数既可以用于路由的模板渲染(在res.render(userView,data))
        // 有可以用于直返回字符串userView({data})
        let html = userView({ //art-template 模板的应用。
            // true => 已登录  false => 未登录
            isSigin : false
        })
        $(".user-menu").html(html);
        this.bindEventBtn();
    },
    bindEventBtn(){
        // 登录注册按钮的事件绑定。
        $(".dropdown-toggle .btn-sign").on("click",function(){
            // 由于登录注册最后提交表单数据均是同一个按钮，
            // 需要设置一个_url作为标示，来请求不同的接口
            _url = $(this).index() === 0 ? '/api/users/signinL' : '/api/users/signupL';
        })
        $("#btn-submit").on("click",()=>{
            let data = $("#user-form").serialize() //序列表表格内容为字符串，用于 Ajax 请求。
            // 获取用户名、密码两个字段的内容，然后直接提交。
            $.ajax({
                url : _url,
                data,
                type : "POST",
                success(res){
                    console.log(res);
                }
            })
        })
    }
}