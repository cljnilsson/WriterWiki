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
		},
		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract(
				{
					fallback: "style-loader",
					use: ["css-loader"]
				}
			)
		},
		{
			test: /\.(png|jpg|gif|webm)$/,
			use: [
				{
					loader: "file-loader",
					options: {
						name: "/imgs/[name].[ext]"
					}
				}
			]
		}
	]
};

const plugins = [
	new HtmlWebPackPlugin({
		hash: false,
		filename: "./index.html",  //target html
		template: "./client/index.html" //source html
	}),
	new ExtractTextPlugin({ filename: "./css/main.css" })
];

module.exports = {
	devtool: "source-map",
	entry: "./client/index.js",
	performance: { hints: false },
	resolve: {
		extensions: [".jsx", ".js"]
	},
	output: {
		path: path.join(__dirname, "/public"),
		filename: "index_bundle.js"
	},
	watch: true,
	stats: "minimal",
	module: fileSettings,
	plugins
};