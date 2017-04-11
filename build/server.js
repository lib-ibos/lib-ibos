var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var opn = require('opn')

const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const chalk = require('chalk');
const historyApiFallback = require('connect-history-api-fallback');

// var webpackConfig = require('../webpack.config.js');
var webpackConfig = process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf')

let compiler;

const isInteractive = process.stdout.isTTY;

const hotUpdate =  process.argv.indexOf('--ie8') === -1

function setupCompiler(host, port, protocol) {

  if (hotUpdate) {
    const entry = webpackConfig.entry
    Object.keys(entry).forEach(function(key){
      entry[key].unshift(require.resolve('react-dev-utils/webpackHotDevClient'));
    })
  } else {
    // ie8 不使用热加载, 但需配置es3ify
      webpackConfig.module.postLoaders = [
      {
        test: /\.(js|jsx)$/,
        include: [/node_modules/,/src/,/samples/],
        loaders: ['es3ify'],
      },
    ]
  }

  compiler = webpack(webpackConfig);

  compiler.plugin('invalid', function() {
    if (isInteractive) {
      clearConsole();
    }
    console.log('Compiling...');
  });

  let isFirstCompile = true;
  compiler.plugin('done', function(stats) {
    if (isInteractive) {
      clearConsole();
    }

    const messages = formatWebpackMessages(stats.toJson({}, true));
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    const showInstructions = isSuccessful && (isInteractive || isFirstCompile);

    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
    }

        if (showInstructions) {
            const add = protocol + '://' + host + ':' + port + '/';
            console.log();
            console.log('The app is running at:');
            console.log();
            console.log('  ' + chalk.cyan(add));
            console.log();
            console.log('Note that the development build is not optimized.');
            opn(add)
            //  console.log(`To create a production build, use ${chalk.cyan('npm run build')}.`);
            console.log();
            isFirstCompile = false;
        }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.');
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
    }
  });
}

function runDevServer(host, port, protocol) {

  var server = new WebpackDevServer(compiler, {
      compress: true,
      clientLogLevel: 'none',
      contentBase: "./dist",//本地服务器所加载的页面所在的目录
      publicPath: '/',
      hot: true,
      quiet: true,
      watchOptions: {
          ignored: /node_modules/,
      },
  });

  server.use(historyApiFallback({
    disableDotRule: true,
    htmlAcceptHeaders: ['text/html', '*/*']
  }));

  server.listen(port, function(err) {
    if(err) {
      return console.log(err);
    }
    if (isInteractive) {
      clearConsole();
    }
    console.log(chalk.cyan('Starting the development server...'));
    console.log();
  });
}

function run(port) {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = require('quick-local-ip').getLocalIP4();
  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
}

run(8088);


