import { Component } from 'react'
import './app.scss'

class App extends Component {

  componentDidMount () {
    // 启动时执行
    console.log('二手吊车小程序启动')
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError (error, errorInfo) {
    console.error('应用错误:', error, errorInfo)
    
    try {
      Taro.showToast({
        title: '应用出现错误，请重启小程序',
        icon: 'none',
        duration: 3000
      })
    } catch (e) {
      console.error('显示错误提示失败:', e)
    }
  }

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App  