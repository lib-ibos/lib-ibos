
const path = require('path');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const utils =require('./build/utils')

function resolve(relativePath) {
    return path.resolve(__dirname, relativePath)
}

module.exports = {
    entry: {
        vendor: ['react','react-dom','./src/reactRouter.js','echarts'],
        index: [resolve("samples/main.jsx")],
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
                include: [ resolve('samples'),resolve('src'), resolve('test')],
                loader: 'babel'
            },
            {
                test: /\.css$/,
                include: [resolve("src"),resolve("node_modules")],
                loader: 'style!css?importLoaders=1!postcss',
                //loader: ExtractTextPlugin.extract('style','css?importLoaders=1!postcss')
            },
            {   
                test: /\.less$/, 
                include: [resolve("src"),resolve("samples"), resolve("node_modules")],
                loader: 'style!css!postcss!less',
                //loader: ExtractTextPlugin.extract('style','css?importLoaders=1!postcss!less')
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ],
    },
    babel: {
      babelrc: true,
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
    plugins: [
        new HtmlWebpackPlugin({
            title: "lib-ibos",
            inject: true,
            template: resolve('samples/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new ExtractTextPlugin('style.css'),
        new CaseSensitivePathsPlugin(),
        new WatchMissingNodeModulesPlugin(path.resolve(__dirname,'node_modules')),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: "vendor.js", minChunks: Infinity}),
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    }
}