// webpack的配置文件。
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    mode : 'development', //开发环境
    entry : "./src/app.js", //入口文件
    // js文件
    output : {//出口文件名
        path : path.resolve(__dirname,"../dev"),  //地址 __dirname表示当前物理的物理路径(也就是父级文件夹)
        filename : "app.js"   //文件名
    },
    // 开启服务器
    devServer : {
        contentBase: path.join(__dirname, "../dev"),
        compress: true,
        port: 8000
    },
    // loaders对.art和.css或.scss文件进行解析
    module : {
        rules :[
            {
                test : /\.art$/,
                loader : "art-template-loader" 
            },
            {
                test : /\.(scss||css)$/,
                loader : ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    // 插件
    plugins : [
        // 打包html+css+js文件。
        new HtmlWebpackPlugin({
            template : "./index.html",
            filename : "index.html",
        }),
        // 拷贝public文件
        new copyWebpackPlugin([{
            from: './public',
            to: './public'
        }])
    ]
}