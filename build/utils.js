var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var fs = require("fs-extra")
var chalk = require('chalk')
var babel = require('babel-core')

exports.assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    var cssLoader = {
        loader: 'css',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }

    let loaders = 'css!postcss!less';

    if (options.extract) {
        return ExtractTextPlugin.extract('style', loaders)
    }else{
        return 'style!'+loaders
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    var loaders = exports.cssLoaders(options)

    var output = [{
        test: config.common.cssExtension,
        loader: loaders
    }]

    return output
}

//处理对应的文件
exports.dealFiles = function (sourceDir,fileType,cb) {

    if (!fs.existsSync(sourceDir)) {
        console.log(chalk.red("Can't find this directory : " + chalk.yellow(sourceDir)));
        return;
    }

    fs.readdir(sourceDir,function (err, files) {
        if(err){
            console.log(chalk.red(err))
            return;
        }

        files.forEach(file => {
            const filePath = path.join(sourceDir,file);
            fs.stat(filePath,(err,stats) => {
                if(err) throw err;

                //是文件就执行对应的方法
                if(stats.isFile()){
                    if(fileType.test(file)){
                        //filePath 为文件的全路径 , file为去掉来源目录后的路劲，以便后续的更改发布目录
                        cb && cb(filePath)
                        // console.log(file+ '：我被执行啦')
                    }
                    // console.log(chalk.blue("我是文件: "+file))
                    // 如果是目录就继续遍历文件
                }else if(stats.isDirectory()){
                    exports.dealFiles(filePath,fileType,cb)
                    // console.log(chalk.yellow("我是目录 "+fileDir))
                }
            })
        })
    })
}


exports.babelCompile = function (sourceDir,outputDir,option) {

    const len = sourceDir.length;
    exports.dealFiles(sourceDir,/\.(js|jsx)$/,function (file) {

        // babel 编译
        babel.transformFile(file, option, function (err, result) {
            if (err) throw err
            // console.log(result.options.sourceFileName)

            const outputFile =outputDir + file.substr(len)
            // console.log(outputFile)

            // 把编译完的结果输出到对应目录
            fs.outputFile(outputFile, result.code, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log(chalk.magenta(file) + " -> "+ chalk.green("Build complete!"));
            });
        })
    })
}

//复制文件
exports.copyFiles = function (sourceDir, outputDir, fileType) {
    const len = sourceDir.length;
    exports.dealFiles(sourceDir,fileType,function (file) {
        const outputFile =outputDir + file.substr(len)
        fs.copy(file, outputFile,function (err) {
            if(err){
                return console.log(chalk.bgRed(err))
            }

            console.log(chalk.magenta(file) + " -> "+ chalk.green("Build complete!"));
        })
    })

}