const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getFilesRecursiveByExtension = require("./getFilesRecursiveByExtension");

function createHtml(page_path){
	let htmlArr = [];

	defaultPageInfoJson = JSON.parse(fs.readFileSync(`./src/defaultPageInfo.json`,"utf-8"));

	getFilesRecursiveByExtension(page_path, ".js").map((item)=>{
		let infoJson ={},infoData={};
		try{
			infoJson = fs.readFileSync(`${page_path}/${item}-pageinfo.json`,"utf-8");
			infoData = JSON.parse(infoJson);
		}catch(err){
			infoData = {};
		}
		htmlArr.push(new HtmlWebpackPlugin({
			title:infoData.title ? infoData.title : defaultPageInfoJson.title,
			meta:{
				keywords: infoData.keywords ? infoData.keywords : defaultPageInfoJson.keywords || '',
				description:infoData.description ? infoData.description : defaultPageInfoJson.description || ''
			},
			chunks:[`${item}`],
			template: "./src/template.html",
			filename : item == "index" ? "index.html" : `${item}/index.html`,
			minify:{
				collapseWhitespace: true,
				preserveLineBreaks: true
			},
		}));
	});
	return htmlArr;
}


module.exports = createHtml;
