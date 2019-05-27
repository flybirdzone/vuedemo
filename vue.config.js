// 配置webpack 文档 https://cli.vuejs.org/zh/config 有详细说明
module.exports = {
    productionSourceMap:true,
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : './',
    outputDir: 'www',
    assetsDir:'./',
};
