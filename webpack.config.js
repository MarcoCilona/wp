// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
    devServer: {
        // The path you want webpack-dev-server to use for serving files
        publicPath: '/dist/',
        // For static assets
        contentBase: path.resolve('public'),
        // Reload for code changes to static assets.
        watchContentBase: true
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
            'vue$': 'vue/dist/vue.esm.js',
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
                test: /\.(png|jpg|gif)$/,
                use: [
                    'url-loader'
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ]
}