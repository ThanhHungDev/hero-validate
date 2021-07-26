const { resolve } = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: resolve(__dirname, 'src/index.js'),

    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'hero-validate.min.js',
        library: 'HeroValidate',
        libraryTarget: 'umd'
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
}