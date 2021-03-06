const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.tsx",
    resolve: {
        extensions:[".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                use: { loader: "url-loader", options: { limit: 65536, esModule: false } }
            },
            {
                test: /\.html$/,
                use: { loader: "html-loader" }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({template: "./src/index.html", filename: "./index.html" })
    ],
    performance: { hints: false },
    watch: false,
    devtool: "source-map",
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};