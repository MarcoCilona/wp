// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('vue-html-webpack-plugin')
const path = require('path')

module.exports = {
    devServer: {
        // For static assets
        contentBase: path.resolve('dist'),
        // Reload for code changes to static assets.
        watchContentBase: true,
        hot: true
    },
    mode: 'development',
    entry: {
        index: path.resolve('./src/main.ts')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    'eslint-loader'
                ],
                exclude: file => (
                    /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
                )
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                use: [
                    'url-loader'
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            vue: true,
            title: 'Test',
            template: './public/index.html',
            filename: 'index.html'
        })
    ]
}
