import { Component } from 'react'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getUserPosts } from '../../services/data'
import { formatPrice, showToast, navigateTo } from '../../utils'
import './posts.scss'

export default class Posts extends Component {
  state = {
    posts: [],
    loading: true,
    error: null
  }

  componentDidMount() {
    this.loadPosts()
  }

  componentDidShow() {
    this.loadPosts()
  }

  loadPosts = async () => {
    try {
      this.setState({ loading: true, error: null })
      
      const posts = getUserPosts()
      
      this.setState({
        posts,
        loading: false
      })
    } catch (error) {
      console.error('加载发布列表失败:', error)
      this.setState({
        error: '加载失败，请稍后重试',
        loading: false
      })
      showToast('加载失败，请稍后重试', 'error')
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

  goToPost = () => {
    try {
      navigateTo('/pages/post/post')
    } catch (error) {
      console.error('页面跳转失败:', error)
      showToast('页面跳转失败', 'error')
    }
  }

  handleEdit = (id) => {
    showToast('编辑功能开发中', 'none')
  }

  handleDelete = (id) => {
    showToast('删除功能开发中', 'none')
  }

  onPullDownRefresh = () => {
    this.loadPosts().finally(() => {
      Taro.stopPullDownRefresh()
    })
  }

  render() {
    const { posts, loading, error } = this.state

    if (loading) {
      return (
        <View className='posts'>
          <View className='loading-container'>
            <Text>加载中...</Text>
          </View>
        </View>
      )
    }

    if (error) {
      return (
        <View className='posts'>
          <View className='error-container'>
            <Text className='error-text'>{error}</Text>
            <Button className='btn btn-primary' onClick={this.loadPosts}>
              重新加载
            </Button>
          </View>
        </View>
      )
    }

    return (
      <View className='posts'>
        <ScrollView
          className='posts-scroll'
          scrollY
          enableBackToTop
          refresherEnabled
          refresherTriggered={loading}
          onRefresherRefresh={this.onPullDownRefresh}
        >
          <View className='posts-container'>
            {posts.length === 0 ? (
              <View className='empty-state'>
                <Text className='empty-icon'>📝</Text>
                <Text className='empty-text'>还没有发布任何商品</Text>
                <Text className='empty-hint'>发布您的第一个商品吧</Text>
                <Button 
                  className='btn btn-primary mt-32'
                  onClick={this.goToPost}
                >
                  发布商品
                </Button>
              </View>
            ) : (
              posts.map(item => (
                <View key={item.id} className='post-card card'>
                  <View className='post-header' onClick={() => this.goToDetail(item.id)}>
                    {item.tags && item.tags[0] && (
                      <View className='source-tag'>{item.tags[0]}</View>
                    )}
                    <Image
                      className='post-image'
                      src={item.images && item.images[0] ? item.images[0] : 'https://picsum.photos/seed/crane/400/300'}
                      mode='aspectFill'
                      lazyLoad
                    />
                  </View>

                  <View className='post-content' onClick={() => this.goToDetail(item.id)}>
                    <Text className='post-title'>{item.title}</Text>
                    
                    <View className='post-tags'>
                      {item.tags && item.tags.slice(1).map((tag, index) => (
                        <Text key={index} className='tag tag-gray'>{tag}</Text>
                      ))}
                    </View>

                    <View className='post-meta text-muted'>
                      <Text className='meta-item'>
                        {item.type} · {item.brand} · {item.tonnage}吨
                      </Text>
                      <Text className='meta-item'>
                        📍 {item.location} · {item.post_date}
                      </Text>
                      <Text className='meta-item'>
                        状态: {item.status === 'selling' ? '在售' : '已售'}
                      </Text>
                    </View>
                  </View>

                  <View className='post-footer flex flex-between'>
                    <Text className='price price-large'>{formatPrice(item.price)}</Text>
                    <View className='post-actions flex'>
                      <Button
                        className='btn btn-secondary btn-small'
                        onClick={() => this.handleEdit(item.id)}
                      >
                        编辑
                      </Button>
                      <Button
                        className='btn btn-danger btn-small'
                        onClick={() => this.handleDelete(item.id)}
                      >
                        删除
                      </Button>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>

        <View className='floating-action'>
          <Button className='fab-button' onClick={this.goToPost}>
            +
          </Button>
        </View>
      </View>
    )
  }
}
