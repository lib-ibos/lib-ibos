require('./check-versions')()

process.env.NODE_ENV = 'build'

var ora = require('ora')
var fs = require('fs-extra')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var babel = require('babel-core')
var utils = require('./utils')

// 由于 babelrc 中的key是加了引号的，直接用require 会报错
var babelOption = fs.readJsonSync('../.babelrc')

// var spinner = ora('building ...')
// spinner.start()

console.log(__dirname)
console.log(("../src/components/index.js").split(path.sep))


// 先删除生成目录  fs.remove() 等同于 rimraf 模块
// fs.remove(config.build.assetsRoot, err => {
//     if (err) throw err
//
//
//     utils.dealFiles(config.build.sourceRoot,/\.(js|jsx)$/,function (file) {
//         utils.babelCompile(file,config.build.assetsRoot,babelOption)
//     })
//
// })
