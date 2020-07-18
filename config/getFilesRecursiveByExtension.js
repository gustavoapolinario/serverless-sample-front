const fs = require("fs");
const path = require("path");

/**
 * @param {String} path
 * @returns {Array} [ 'contact', 'index', 'product/ajax' ]
 */
getFilesRecursiveByExtension = (dir, ext) => {

    let arr = fs.readdirSync(dir).reduce((acc, item) => {
        let currentPath = dir + "/" + item;
        if (fs.statSync(currentPath).isFile() && ext.indexOf(path.extname(currentPath)) != -1) {
            acc.push(item.substr(0, item.lastIndexOf('.')));
        }
        else
        if (fs.statSync(currentPath).isDirectory()) {
            getFilesRecursiveByExtension(currentPath, ext).map(item2 => acc.push(`${item}/${item2}`))
        }
        return acc
    }, []);
    return arr;
};
module.exports = getFilesRecursiveByExtension
