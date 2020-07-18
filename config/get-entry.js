const getFilesRecursiveByExtension = require("./getFilesRecursiveByExtension");
/**
 * @param {String} path 
 * @returns {Object} 返回的entry { "contact":"./src/contact.js", "product/ajax":"./src/product/ajax.js", ...}
 */
module.exports = getEnty = dir => {
	return getFilesRecursiveByExtension(dir, ".js").reduce((acc, item)=> ({
			...acc,
			[`${item}`]: `${dir}/${item}.js`
	}), []);
};
