'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const vueLoaderConfig = require('./vue-loader.conf')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}


const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    sauBase: ['vue', 'uikit'],
    sauApp: './src/main.js',    
    register: './src/register.js',    
    library: './src/library.js',   
    celebrates: './src/celebrates.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],  
    splitChunks: {
      cacheGroups: {
        commons: {
          test: "/[\\/]node_modules[\\/]/",
          name: "vendor",
          chunks: "initial",
        },
        // sauBaseStyles: {
        //   test: (m,c,entry = 'sauBase') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        //   name: "sauBase",
        //   chunks: "initial",
        // },
        // sauAppStyles: {
        //   test: (m,c,entry = 'sauApp') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        //   name: "sauApp",
        //   chunks: "all",
        // },
        // celebratesStyles: {
        //   name: 'celebrates',
        //   test: (m,c,entry = 'celebrates') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        //   chunks: 'all',          
        // },
        // celebratesStyles: {
        //   name: 'celebrates',
        //   test: (m,c,entry = 'celebrates') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        //   chunks: 'all',
        //   enforce: true
        // },
        // libraryStyles: {
        //   name: 'celebrates',
        //   test: (m,c,entry = 'library') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        //   chunks: 'all',
        //   enforce: true
        // },
        // registerStyles: {
        //   name: 'register',
        //   test: (m,c,entry = 'register') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        //   chunks: 'all',
        //   enforce: true
        // },
       }
    }
  }, 
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pages/index.html',
      inject: true,
      chunks: ['vendor','sauApp'],
      chunksSortMode: 'manual'
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'register.html',
    //   template: 'src/pages/register.html',
    //   inject: true,     
    //   chunks: ['vendor','register','sauapp'], 
    //   chunksSortMode: 'manual'
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'library.html',
    //   template: 'src/pages/library.html',
    //   inject: true,     
    //   chunks: ['vendor','library','sauapp'], 
    //   chunksSortMode: 'manual'
    // }),
    new HtmlWebpackPlugin({
      filename: 'celebrates.html',
      template: 'src/pages/celebrates.html',
      inject: true,     
      chunks: ['sauBase','celebrates','sauApp'], 
      chunksSortMode: 'manual'
    }),
  ],
  module: {

    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),      
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },      
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },      
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
