const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const entry = require("./config/get-entry")("./src/pages");
const htmlArr = require("./config/create-html")("./src/pages");

module.exports = (env, argv) => ({
    entry: entry,
    plugins: [
        ...htmlArr,
        new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
        }),
    ],
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].[hash:4].js"
    },
    devtool: argv.mode === 'production' ? false : 'eval-source-maps',
    resolve:{
        alias:{
            src: path.resolve(__dirname, "src"),
            components: path.resolve(__dirname, "src/components")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:"babel-loader",
                    options:{
                        presets: [
							"@babel/preset-env",
							"@babel/preset-react",
                            {"plugins": [
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-transform-runtime",
                            ]}
                        ],
                    }
                },
            },
            {
				test: /\.(scss|css)$/,
				use: [
					argv.mode == "development" ? { loader: "style-loader"} :MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: { url: false, sourceMap: true } },
					{ loader: "sass-loader", options: { sourceMap: true } }
				],
				exclude: /node_modules/,
			},
            {
                test: /\.(svg|jpg|gif|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: (url, resourcePath, context) => {
                                if(argv.mode === 'development') {
                                    const relativePath = path.relative(context, resourcePath);
                                    return `/${relativePath}`;
                                }
                                return `/assets/images/${path.basename(resourcePath)}`;
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader', 
                        options: {
                            outputPath: (url, resourcePath, context) => {
                                if(argv.mode === 'development') {
                                    const relativePath = path.relative(context, resourcePath);
                                    return `/${relativePath}`;
                                }
                                return `/assets/fonts/${path.basename(resourcePath)}`;
                            }
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimize: argv.mode === 'production' ? true : false,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        },
        minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			}),
			new OptimizeCSSAssetsPlugin({})
		],
		splitChunks: {
			cacheGroups: {
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true
				}
			}
		}
    },
    /*ignore node_modules to watch only the essential. you can remove this */
    watchOptions: {
        ignored: [/node_modules/,/build/]
    }
});