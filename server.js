var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const chalk = require('chalk');
const historyApiFallback = require('connect-history-api-fallback');

var config = require('./webpack.config.js');

let compiler;

const isInteractive = process.stdout.isTTY;

function setupCompiler(host, port, protocol) {

  config.entry.unshift(require.resolve('react-dev-utils/webpackHotDevClient'));
  
  compiler = webpack(config);

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
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
      console.log();
      console.log('Note that the development build is not optimized.');
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
  const host = process.env.HOST || 'localhost';
  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
}

run(8080);


