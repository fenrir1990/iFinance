import path from 'path';
import webpack from 'webpack';

let config = {
    entry: path.join(__dirname, 'webpack', 'index.js'),
    output: {
	path: path.join(__dirname, 'public'),
	filename: 'bundle.js'
    },
    module: {
	loaders: [
	    {
		test: /\.js$/,
		loaders: ['babel-loader']
	    },
	    {
		test: /\.css$/,
		loaders: ['style', 'css']
	    },
	    {
		test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
		loaders: ['file-loader']
	    }
	]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
	new webpack.ProvidePlugin({
	    $: "jquery",
	    jQuery: "jquery"
	})
    ]
};

export default config;
