// webpack的配置文件。
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode : 'development',
    entry : "./src/app.js", //入口文件
    // js文件
    output : {//出口文件名
        path : path.resolve(__dirname,"../dev"),  //地址 __dirname表示当前物理的物理路径(也就是父级文件夹)
        filename : "app.js"   //文件名
    },

    devServer : {
        contentBase: path.join(__dirname, "../dev"),
        compress: true,
        port: 8000
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : "./index.html",
            filename : "index.html",
        })
    ]
}