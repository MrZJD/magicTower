var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
  pixi = path.join(phaserModule, 'build/custom/pixi.js'),
  p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry : {
        main : './src/index.ts',
        vendor : ['pixi.js', 'p2', 'phaser']
    },
    output : {
        path : path.resolve(__dirname, './build'),
        filename : 'js/[name].js'
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi.js': pixi,
            'p2': p2,
        },
        extensions: ['.ts', '.tsx', '.js']
    },
    module : {
        loaders : [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello Phaser',
            template: './index.html',
            filename: 'index.html',
            chunks: ['main']
        })
    ]
}