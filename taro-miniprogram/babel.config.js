// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-react',
    ['taro', {
      framework: 'react',
      ts: false // 您的项目是JavaScript，所以这里是false
    }]
  ]
};
