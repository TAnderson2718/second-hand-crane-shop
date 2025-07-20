import { Component } from 'react'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getFavorites, removeFromFavorites } from '../../services/data'
import { formatPrice, showToast, makePhoneCall, navigateTo } from '../../utils'
import './favorites.scss'

export default class Favorites extends Component {
  state = {
    favorites: [],
    loading: true,
    error: null
  }

  componentDidMount() {
    this.loadFavorites()
  }

  componentDidShow() {
    this.loadFavorites()
  }

  loadFavorites = async () => {
    try {
      this.setState({ loading: true, error: null })
      
      const favorites = getFavorites()
      
      this.setState({
        favorites,
        loading: false
      })
    } catch (error) {
      console.error('加载收藏列表失败:', error)
      this.setState({
        error: '加载失败，请稍后重试',
        loading: false
      })
      showToast('加载失败，请稍后重试', 'error')
    }
  }

  handleRemoveFavorite = async (id) => {
    if (!id) return

    try {
      removeFromFavorites(id)
      showToast('已取消收藏')
      
      this.loadFavorites()
    } catch (error) {
      console.error('取消收藏失败:', error)
      showToast('操作失败，请稍后重试', 'error')
    }
  }

  handleCall = async (phone) => {
    if (!phone) {
      showToast('联系电话不可用', 'error')
      return
    }

    try {
      await makePhoneCall(phone)
    } catch (error) {
      console.error('拨打电话失败:', error)
      showToast('拨打电话失败，请稍后重试', 'error')
    }
  }

  goToDetail = (id) => {
    if (!id) return

    try {
      navigateTo(`/pages/detail/detail?id=${id}`)
    } catch (error) {
      console.error('页面跳转失败:', error)
      showToast('页面跳转失败', 'error')
    }
  }

  onPullDownRefresh = () => {
    this.loadFavorites().finally(() => {
      Taro.stopPullDownRefresh()
    })
  }

  render() {
    const { favorites, loading, error } = this.state

    if (loading) {
      return (
        <View className='favorites'>
          <View className='loading-container'>
            <Text>加载中...</Text>
          </View>
        </View>
      )
    }

    if (error) {
      return (
        <View className='favorites'>
          <View className='error-container'>
            <Text className='error-text'>{error}</Text>
            <Button className='btn btn-primary' onClick={this.loadFavorites}>
              重新加载
            </Button>
          </View>
        </View>
      )
    }

    return (
      <View className='favorites'>
        <ScrollView
          className='favorites-scroll'
          scrollY
          enableBackToTop
          refresherEnabled
          refresherTriggered={loading}
          onRefresherRefresh={this.onPullDownRefresh}
        >
          <View className='favorites-container'>
            {favorites.length === 0 ? (
              <View className='empty-state'>
                <Text className='empty-icon'>❤️</Text>
                <Text className='empty-text'>还没有收藏任何商品</Text>
                <Text className='empty-hint'>去首页看看有什么好货吧</Text>
                <Button 
                  className='btn btn-primary mt-32'
                  onClick={() => Taro.switchTab({ url: '/pages/index/index' })}
                >
                  去逛逛
                </Button>
              </View>
            ) : (
              favorites.map(item => (
                <View key={item.id} className='listing-card card'>
                  <View className='listing-header' onClick={() => this.goToDetail(item.id)}>
                    {item.tags && item.tags[0] && (
                      <View className='source-tag'>{item.tags[0]}</View>
                    )}
                    <Image
                      className='listing-image'
                      src={item.images && item.images[0] ? item.images[0] : 'https://picsum.photos/seed/crane/400/300'}
                      mode='aspectFill'
                      lazyLoad
                    />
                  </View>

                  <View className='listing-content' onClick={() => this.goToDetail(item.id)}>
                    <Text className='listing-title'>{item.title}</Text>
                    
                    <View className='listing-tags'>
                      {item.tags && item.tags.slice(1).map((tag, index) => (
                        <Text key={index} className='tag tag-gray'>{tag}</Text>
                      ))}
                    </View>

                    <View className='listing-meta text-muted'>
                      <Text className='meta-item'>
                        {item.type} · {item.brand} · {item.tonnage}吨
                      </Text>
                      <Text className='meta-item'>
                        📍 {item.location} · {item.post_date}
                      </Text>
                    </View>
                  </View>

                  <View className='listing-footer flex flex-between'>
                    <Text className='price price-large'>{formatPrice(item.price)}</Text>
                    <View className='listing-actions flex'>
                      <Button
                        className='btn btn-secondary btn-small'
                        onClick={() => this.handleRemoveFavorite(item.id)}
                      >
                        取消收藏
                      </Button>
                      <Button
                        className='btn btn-primary btn-small'
                        onClick={() => this.handleCall(item.phone)}
                      >
                        拨打电话
                      </Button>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
}
