require('./check-versions')()

process.env.NODE_ENV = 'build'

var ora = require('ora')
var fs = require('fs-extra')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var utils = require('./utils')

// 由于 babelrc 中的key是加了引号的，直接用require 会报错
var babelOption = fs.readJsonSync(path.resolve(__dirname,'../.babelrc'))

// 先删除生成目录  fs.remove() 等同于 rimraf 模块
fs.remove(config.build.assetsRoot, err => {
    if (err) throw err

    //babel 编译
     utils.babelCompile(config.build.sourceRoot,config.build.assetsRoot,babelOption)
    //copy 不需要编辑的文件
     utils.copyFiles(config.build.sourceRoot,config.build.assetsRoot,/\.(png|less|css|jpg|gif)$/)

})
