"use strict";
const path = require("path");

function resolve(dir) {
	return path.join(__dirname, dir);
}

const webpack = require("webpack");

const name = "智能情报分析系统"; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9529; // dev port
// const port = null

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
	/**
	 * You will need to set publicPath if you plan to deploy your site under a sub path,
	 * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
	 * then publicPath should be set to "/bar/".
	 * In most cases please use '/' !!!
	 * Detail: https://cli.vuejs.org/config/#publicpath
	 */
	publicPath: "./",
	outputDir: "dist",
	assetsDir: "static",
	lintOnSave: false,
	// lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
		port: port,
		open: false,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			"/": {
				// target: "http://11.0.0.186:8888/",//小猪
				// target: "http://11.0.0.111:8888/", // 炎
				target: "http://11.0.0.124:8888/", // 炎
				// target: "http://11.0.0.102:8888/", // 予以
				changeOrigin: true,
				pathRewrite: {
					"^/": ""
				}
			}
		}
	},
	pwa: {
		iconPaths: {
			favicon32: "favicon.ico",
			favicon16: "favicon.ico",
			appleTouchIcon: "favicon.ico",
			maskIcon: "favicon.ico",
			msTileImage: "favicon.ico"
		}
	},
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"windows.jQuery": "jquery"
			}),
			new webpack.ProvidePlugin({
				BaiduMap: "BMap"
			})
		],
		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		name: name,
		resolve: {
			alias: {
				"@": resolve("src"),
				config: resolve("config"),
				api: resolve("src/api"),
				assets: resolve("src/assets"),
				components: resolve("src/components"),
				styles: resolve("src/styles"),
				utils: resolve("src/utils"),
				views: resolve("src/views")
			}
		}
	},
	chainWebpack(config) {
		const oneOfsMap = config.module.rule("scss").oneOfs.store;
		oneOfsMap.forEach(item => {
			item.use("sass-resources-loader")
				.loader("sass-resources-loader")
				.options({
					// Provide path to the file with resources
					// resources: './src/styles/index.scss',

					// Or array of paths
					resources: ["./src/styles/index.scss", "./config/base.scss"]
				})
				.end();
		});

		// set preserveWhitespace
		config.module
			.rule("vue")
			.use("vue-loader")
			.loader("vue-loader")
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true;
				return options;
			})
			.end();

		config
			// https://webpack.js.org/configuration/devtool/#development
			.when(process.env.NODE_ENV === "development", config => config.devtool("cheap-source-map"));

		config.when(process.env.NODE_ENV !== "development", config => {
			config
				.plugin("ScriptExtHtmlWebpackPlugin")
				.after("html")
				.use("script-ext-html-webpack-plugin", [
					{
						// `runtime` must same as runtimeChunk name. default is `runtime`
						inline: /runtime\..*\.js$/
					}
				])
				.end();
			config.optimization.splitChunks({
				chunks: "all",
				cacheGroups: {
					libs: {
						name: "chunk-libs",
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: "initial" // only package third parties that are initially dependent
					},
					elementUI: {
						name: "chunk-elementUI", // split elementUI into a single package
						priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
						test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
					},
					commons: {
						name: "chunk-commons",
						test: resolve("src/components"), // can customize your rules
						minChunks: 3, //  minimum common number
						priority: 5,
						reuseExistingChunk: true
					}
				}
			});
			config.optimization.runtimeChunk("single");
		});
	}
};
