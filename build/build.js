require('./check-versions')()

process.env.NODE_ENV = 'build'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var babel = require('babel-core')

var spinner = ora('building ...')
spinner.start()

rm(config.build.assetsRoot, err => {
  if (err) throw err


})
