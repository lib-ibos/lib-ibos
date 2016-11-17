var fs = require('fs-extra')

var path = require('path')

function findFiles(startPath, filter, cb) {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            findFiles(filename, filter, cb); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            cb(filename)
        };
    };
};
var dirPath = "src/components";
var len = dirPath.length
var styleFiles = []
findFiles('src/components', '.less', function(fileName){
    styleFiles.push(fileName)
});

for (var i = 0; i < styleFiles.length; i++) {
    var source = styleFiles[i]
    var target = 'lib' + source.substr(len)
    fs.copySync(source, target)
    console.log(source + ' -> ' + target)
}
