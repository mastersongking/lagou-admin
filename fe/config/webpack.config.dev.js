// webpack的配置文件。
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    mode : 'development', //开发环境
    entry : "./src/app.js", //入口文件
    // js文件
    output : {//出口文件名
        path : path.resolve(__dirname,"../dev"),  //该目录下的所有文件。 (使用的是绝对路径)
        filename : "app.js"   //输出文件的文件名
    },
    // 开启服务器
    devServer : {
        contentBase: path.join(__dirname, "../dev"),
        compress: true,
        port: 8000,
        host : "10.60.15.64",
        //服务器代理
        proxy: {
            "/api": {
                target: "http://10.60.15.64:3000",
            }
        }
    },
    
    // loaders对.art和.css或.scss文件进行解析
    module : {
        rules :[
            {
                test : /\.art$/,
                loader : "art-template-loader" 
            },
            {
                test: /\.(scss|css)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    // 插件
    plugins : [
        // 生成html文件，并在html文件中引入css+js。
        new HtmlWebpackPlugin({
            template : "src/index.html",
            filename : "index.html",
        }),
        // 拷贝public文件
        new copyWebpackPlugin([{
            from: 'public',
            to: 'public'
        }])
    ]
}