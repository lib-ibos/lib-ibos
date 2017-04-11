/**
 * Created by liguangyao on 2017/4/7.
 */
const getit = require('getit')
const download = require('download')
const fs = require('fs-extra')
const chalk = require('chalk')

// getit('https://at.alicdn.com/t/font_1463992151_360388.eot', function(err, data) {
//     fs.outputFile('../download/foo.eot', data);
// });

// download('https://at.alicdn.com/t/font_1463992151_360388.eot','../download').then(
//     console.log(chalk.green("done!"))
// )

Promise.all(['https://at.alicdn.com/t/font_1463992151_360388.eot', 'https://at.alicdn.com/t/font_1463992151_360388.woff'].map(x => download(x, '../download'))).then(() => {
    console.log(chalk.green('files downloaded!'));
});