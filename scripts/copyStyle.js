var fs = require('fs-extra')

var path = require('path')

// console.log(process.argv)

function findFiles(startPath, filter, cb) {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var ext = path.extname(filename)
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            findFiles(filename, filter, cb); //recurse
        } else if (filter.test(filename)) {
            cb(filename)
        };
    };
};

function copyStyle(sourceDir, targetDir) {
    var len = sourceDir.length
    var styleFiles = []
    findFiles(sourceDir, /\.(less|css|png|jpg)$/ , function(fileName){
        styleFiles.push(fileName)
    });

    for (var i = 0; i < styleFiles.length; i++) {
        var source = styleFiles[i]
        var target = targetDir + source.substr(len)
        fs.copySync(source, target)
        console.log(source + ' -> ' + target)
    }
}

copyStyle("src/components", 'lib')




