var path = require('path')
var utils = require('./utils')
var config = require('../config')
const autoprefixer = require('autoprefixer');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')

// const remote-assets-loader = require('./remote-assets-loader')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        vendor: ['react', 'react-dom',resolve('src/reactRouter.js')],
        index: [resolve('samples/main.jsx')]
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.prod.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    resolveLoader: {
        root: [resolve("node_modules")],
        moduleTemplates: ['*-loader'],
    },
    module: {
        loaders: [
            // {
            //   test: /\.(js|jsx)$/,
            //   loader: 'eslint-loader',
            //   enforce: "pre",
            //   include: [resolve('src'),resolve('samples'), resolve('test')],
            //   options: {
            //     formatter: require('eslint-friendly-formatter')
            //   }
            // },

            {
                test: /\.(js|jsx)$/,
                loader: 'react-hot!babel',
                include: [resolve('samples'), resolve('src'), resolve('test')]
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
                loader: 'url!remote-assets',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },

        ],

    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
    ],
    plugins: [
        new WatchMissingNodeModulesPlugin(path.resolve(__dirname, '../node_modules')),
        // 复制无需编译的静态资源到dist/static/目录中
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
}
