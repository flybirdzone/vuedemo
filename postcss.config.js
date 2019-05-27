module.exports = {
  'plugins': [
    require('postcss-pxtorem')({
      rootValue: 38,
      minPixelValue: 2,
      propWhiteList: []
    }),
    require('autoprefixer')
  ]
}
