
const path = require('path');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(relativePath) {
    return path.resolve(__dirname, relativePath)
}

module.exports = {
    entry: {
        index: [resolve("src/index.js")],
    },
    output: {
        path: resolve("dist"),//打包后的文件存放的地方
        pathinfo: true,
        filename: "[name].js",//打包后输出文件的文件名
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    resolveLoader: {
      root: [resolve("node_modules")],
      moduleTemplates: ['*-loader'],
    },
    devtool: 'source-map', // 便于调试
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: resolve("src"),
                loader: 'babel'
            },
            {
                test: /\.css$/,
                include: [resolve("src"), resolve("node_modules")],
                loader: 'style!css?importLoaders=1!postcss',
                //loader: ExtractTextPlugin.extract('style-loader','css-loader?importLoaders=1!postcss-loader')//添加对样式表的处理
            },
            {   
                test: /\.less$/, 
                include: [resolve("src"), resolve("node_modules")],
                loader: 'style!css?importLoaders=1!postcss!less',
                //loader: ExtractTextPlugin.extract('style-loader','css-loader?importLoaders=1!postcss-loader!less-loader')
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
        plugins: [
            new HtmlwebpackPlugin({
                title: 'lib-ibos',
                template: 'src/index.html',
            }),
            new webpack.HotModuleReplacementPlugin(),
            //new ExtractTextPlugin('style.css'),
        ]
    },
    babel: {
      babelrc: false,
      presets: [
        require.resolve('babel-preset-es2015'),
        require.resolve('babel-preset-react'),
        require.resolve('babel-preset-stage-0'),
      ],
      plugins: [
        require.resolve('babel-plugin-add-module-exports'),
        require.resolve('babel-plugin-transform-runtime'),
        [require.resolve('babel-plugin-import'), {"libraryName": "antd", style: 'css'}],
      ],
      cacheDirectory: true,
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