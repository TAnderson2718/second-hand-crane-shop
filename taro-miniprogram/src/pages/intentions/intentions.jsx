import { Component } from 'react'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { mockIntentions } from '../../services/data'
import { showToast, navigateTo } from '../../utils'
import './intentions.scss'

export default class Intentions extends Component {
  state = {
    intentions: [],
    loading: true,
    error: null
  }

  componentDidMount() {
    this.loadIntentions()
  }

  componentDidShow() {
    this.loadIntentions()
  }

  loadIntentions = async () => {
    try {
      this.setState({ loading: true, error: null })
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      this.setState({
        intentions: mockIntentions,
        loading: false
      })
    } catch (error) {
      console.error('加载求购意向失败:', error)
      this.setState({
        error: '加载失败，请稍后重试',
        loading: false
      })
      showToast('加载失败，请稍后重试', 'error')
    }
  }

  handleEdit = (id) => {
    showToast('编辑功能开发中', 'none')
  }

  handleDelete = (id) => {
    showToast('删除功能开发中', 'none')
  }

  goToPost = () => {
    showToast('发布求购功能开发中', 'none')
  }

  onPullDownRefresh = () => {
    this.loadIntentions().finally(() => {
      Taro.stopPullDownRefresh()
    })
  }

  render() {
    const { intentions, loading, error } = this.state

    if (loading) {
      return (
        <View className='intentions'>
          <View className='loading-container'>
            <Text>加载中...</Text>
          </View>
        </View>
      )
    }

    if (error) {
      return (
        <View className='intentions'>
          <View className='error-container'>
            <Text className='error-text'>{error}</Text>
            <Button className='btn btn-primary' onClick={this.loadIntentions}>
              重新加载
            </Button>
          </View>
        </View>
      )
    }

    return (
      <View className='intentions'>
        <ScrollView
          className='intentions-scroll'
          scrollY
          enableBackToTop
          refresherEnabled
          refresherTriggered={loading}
          onRefresherRefresh={this.onPullDownRefresh}
        >
          <View className='intentions-container'>
            {intentions.length === 0 ? (
              <View className='empty-state'>
                <Text className='empty-icon'>🔍</Text>
                <Text className='empty-text'>还没有发布任何求购意向</Text>
                <Text className='empty-hint'>发布您的求购需求，让卖家主动联系您</Text>
                <Button 
                  className='btn btn-primary mt-32'
                  onClick={this.goToPost}
                >
                  发布求购
                </Button>
              </View>
            ) : (
              intentions.map(item => (
                <View key={item.id} className='intention-card card'>
                  <View className='intention-content'>
                    <View className='intention-header'>
                      <Text className='intention-title'>{item.title}</Text>
                      <View className='intention-status'>
                        <Text className={`status-tag ${item.status === 'active' ? 'tag-success' : 'tag-gray'}`}>
                          {item.status === 'active' ? '求购中' : '已关闭'}
                        </Text>
                      </View>
                    </View>

                    <View className='intention-details'>
                      <View className='detail-row'>
                        <Text className='detail-label'>设备类型:</Text>
                        <Text className='detail-value'>{item.type}</Text>
                      </View>
                      <View className='detail-row'>
                        <Text className='detail-label'>品牌要求:</Text>
                        <Text className='detail-value'>{item.brand || '不限'}</Text>
                      </View>
                      <View className='detail-row'>
                        <Text className='detail-label'>规格要求:</Text>
                        <Text className='detail-value'>{item.tonnage}吨</Text>
                      </View>
                      <View className='detail-row'>
                        <Text className='detail-label'>预算范围:</Text>
                        <Text className='detail-value'>{item.budget}万元</Text>
                      </View>
                      <View className='detail-row'>
                        <Text className='detail-label'>期望地区:</Text>
                        <Text className='detail-value'>{item.location}</Text>
                      </View>
                      <View className='detail-row'>
                        <Text className='detail-label'>发布时间:</Text>
                        <Text className='detail-value'>{item.post_date}</Text>
                      </View>
                    </View>

                    {item.description && (
                      <View className='intention-description'>
                        <Text className='description-label'>详细需求:</Text>
                        <Text className='description-text'>{item.description}</Text>
                      </View>
                    )}
                  </View>

                  <View className='intention-footer'>
                    <View className='intention-actions flex'>
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
