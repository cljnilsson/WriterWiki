const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fileSettings =
{
	rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					plugins: [
						"@babel/plugin-transform-runtime"
					]
				}
			}
		}
	]
};

module.exports = {
	devtool: "source-map",
	entry: "./client/index.js",
	performance: { hints: false },
	resolve: {
		extensions: [".jsx", ".js"]
	},
	output: {
		path: path.join(__dirname, "/client"),
		filename: "bundle.js"
	},
	watch: true,
	stats: "minimal",
	module: fileSettings
};