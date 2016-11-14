
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
// let ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:  __dirname + "/src/index.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    module: {//在配置文件里添加JSON loader
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel'//在webpack的module部分的loaders里进行配置即可
            },
            {
                test: /\.css$/,
                loader: 'style!css'//添加对样式表的处理
            },
            {test: /\.less$/, loader: 'style!css!less!postcss'}
        ],
        postLoaders: [
            {
                test: /\.js[x]?$/,
                loaders: ['es3ify-loader'],
            },
        ],
        plugins: [
            new HtmlwebpackPlugin({
                title: 'Webpack-demos',
                filename:'/index.html',
                alwaysWriteToDisk: true
            }),
            new HtmlWebpackHarddiskPlugin(),
            new OpenBrowserPlugin({
                url: 'http://localhost:8080'
            })
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
    }
}