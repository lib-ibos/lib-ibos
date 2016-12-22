
const path = require('path');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlwebpackPlugin = require('html-webpack-plugin');
// let ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: [__dirname + "/src/index.js"], //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        pathinfo: true,
        filename: "bundle.js"//打包后输出文件的文件名
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    devtool: 'cheap-module-source-map', // 便于调试
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: /src/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                include: [/node_modules/,/src/],
                loader: 'style!css!postcss'//添加对样式表的处理
            },
            {   
                test: /\.less$/, 
                include: [/node_modules/,/src/],
                loader: 'style!css!postcss!less'
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]',
            },
            {
                test: /\.json$/,
                loader: "json"
            },
        ],
        postLoaders: [
            {
                test: /\.(js|jsx)$/,
                include: [/node_modules/,/src/],
                loaders: ['es3ify-loader'],
            },
        ],
        plugins: [
            new HtmlwebpackPlugin({
                title: 'lib-ibos',
                template: 'src/index.html',
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    },
    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 8'
                ],
            }),
        ];
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    }
}