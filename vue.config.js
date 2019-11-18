var path = require("path");
var webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./", //配置相对路径 / 默认是绝对路径
  devServer: {
    host: "localhost",
    port: 8899,
    proxy: {
      "/apis": {
        target: "http://m.bestcake.com",
        changeOrigin: true,
        pathRewrite: {
          "^/apis": ""
        }
      }
    }
  },
  chainWebpack: config => { //配置路径别名
    config.resolve.alias.set("@", resolve("src"));
  },
  configureWebpack: { //配置全局jquery
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  },
  css: { //配置全局sass库
    loaderOptions: {
      sass: {
        prependData: `
        @import "~@/assets/css/index.scss";	
       `
      }
    }
  }
};