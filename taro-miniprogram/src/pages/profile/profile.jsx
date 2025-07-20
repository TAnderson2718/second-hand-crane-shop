import { Component } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { navigateTo, showToast } from '../../utils'
import './profile.scss'

export default class Profile extends Component {
  state = {
    userInfo: {
      nickname: '用户',
      avatar: 'https://picsum.photos/seed/avatar/100/100',
      phone: '138****0001',
      registration_date: '2024-01-01'
    },
    isLoggedIn: false
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  checkLoginStatus = () => {
    try {
      const userInfo = Taro.getStorageSync('userInfo')
      if (userInfo) {
        this.setState({
          userInfo,
          isLoggedIn: true
        })
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }

  handleLogin = async () => {
    try {
      showToast('登录功能开发中', 'none')
    } catch (error) {
      console.error('登录失败:', error)
      showToast('登录失败，请稍后重试', 'error')
    }
  }

  handleLogout = async () => {
    try {
      Taro.removeStorageSync('userInfo')
      this.setState({
        isLoggedIn: false,
        userInfo: {
          nickname: '用户',
          avatar: 'https://picsum.photos/seed/avatar/100/100',
          phone: '138****0001',
          registration_date: '2024-01-01'
        }
      })
      showToast('已退出登录')
    } catch (error) {
      console.error('退出登录失败:', error)
      showToast('退出登录失败', 'error')
    }
  }

  navigateToPage = (page) => {
    try {
      navigateTo(`/pages/${page}/${page}`)
    } catch (error) {
      console.error('页面跳转失败:', error)
      showToast('页面跳转失败', 'error')
    }
  }

  render() {
    const { userInfo, isLoggedIn } = this.state

    return (
      <View className='profile'>
        <View className='profile-header card'>
          <View className='user-info'>
            <Image className='avatar' src={userInfo.avatar} mode='aspectFill' />
            <View className='user-details'>
              <Text className='nickname'>{userInfo.nickname}</Text>
              <Text className='phone'>{userInfo.phone}</Text>
              {isLoggedIn && (
                <Text className='registration'>注册时间: {userInfo.registration_date}</Text>
              )}
            </View>
          </View>
          <View className='auth-actions'>
            {isLoggedIn ? (
              <Button className='btn btn-secondary btn-small' onClick={this.handleLogout}>
                退出登录
              </Button>
            ) : (
              <Button className='btn btn-primary btn-small' onClick={this.handleLogin}>
                立即登录
              </Button>
            )}
          </View>
        </View>

        <View className='menu-section'>
          <View className='menu-group card'>
            <Text className='group-title'>我的交易</Text>
            <View className='menu-item' onClick={() => this.navigateToPage('favorites')}>
              <View className='item-content'>
                <Text className='item-icon'>❤️</Text>
                <Text className='item-text'>我的收藏</Text>
              </View>
              <Text className='item-arrow'>{'>'}</Text>
            </View>
            <View className='menu-item' onClick={() => this.navigateToPage('posts')}>
              <View className='item-content'>
                <Text className='item-icon'>📝</Text>
                <Text className='item-text'>我的发布</Text>
              </View>
              <Text className='item-arrow'>{'>'}</Text>
            </View>
            <View className='menu-item' onClick={() => this.navigateToPage('intentions')}>
              <View className='item-content'>
                <Text className='item-icon'>🔍</Text>
                <Text className='item-text'>求购意向</Text>
              </View>
              <Text className='item-arrow'>{'>'}</Text>
            </View>
          </View>

          <View className='menu-group card'>
            <Text className='group-title'>帮助与反馈</Text>
            <View className='menu-item' onClick={() => showToast('功能开发中', 'none')}>
              <View className='item-content'>
                <Text className='item-icon'>❓</Text>
                <Text className='item-text'>帮助中心</Text>
              </View>
              <Text className='item-arrow'>{'>'}</Text>
            </View>
            <View className='menu-item' onClick={() => showToast('功能开发中', 'none')}>
              <View className='item-content'>
                <Text className='item-icon'>📞</Text>
                <Text className='item-text'>联系客服</Text>
              </View>
              <Text className='item-arrow'>{'>'}</Text>
            </View>
            <View className='menu-item' onClick={() => this.navigateToPage('report')}>
              <View className='item-content'>
                <Text className='item-icon'>🚨</Text>
                <Text className='item-text'>举报投诉</Text>
              </View>
              <Text className='item-arrow'>{'>'}</Text>
            </View>
          </View>

          <View className='menu-group card'>
            <Text className='group-title'>设置</Text>
            <View className='menu-item' onClick={() => showToast('功能开发中', 'none')}>
              <View className='item-content'>
                <Text className='item-icon'>⚙️</Text>
                <Text className='item-text'>设置</Text>
              </View>
              <Text className='item-arrow'>{'>'}</Text>
            </View>
            <View className='menu-item' onClick={() => showToast('功能开发中', 'none')}>
              <View className='item-content'>
                <Text className='item-icon'>ℹ️</Text>
                <Text className='item-text'>关于我们</Text>
              </View>
              <Text className='item-arrow'>{'>'}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
