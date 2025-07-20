import { Component } from 'react'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getListingById, addToFavorites, removeFromFavorites, mockFavorites } from '../../services/data'
import { formatPrice, showToast, makePhoneCall, previewImage, navigateBack } from '../../utils'
import './detail.scss'

export default class Detail extends Component {
  state = {
    listing: null,
    loading: true,
    error: null,
    currentImageIndex: 0
  }

  componentDidMount() {
    this.loadListingDetail()
  }

  loadListingDetail = async () => {
    try {
      const router = Taro.getCurrentInstance().router
      const { id } = router.params
      if (!id) {
        throw new Error('商品ID不能为空')
      }

      const listing = getListingById(parseInt(id))
      if (!listing) {
        throw new Error('商品不存在或已下架')
      }

      this.setState({ 
        listing,
        loading: false 
      })
    } catch (error) {
      console.error('加载商品详情失败:', error)
      this.setState({ 
        error: error.message,
        loading: false 
      })
      showToast(error.message, 'error')
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

  handleFavorite = (id) => {
    if (!id) return

    try {
      const isFavorited = mockFavorites.includes(id)
      
      if (isFavorited) {
        removeFromFavorites(id)
        showToast('已取消收藏')
      } else {
        addToFavorites(id)
        showToast('收藏成功')
      }
      
      this.forceUpdate()
    } catch (error) {
      console.error('收藏操作失败:', error)
      showToast('操作失败，请稍后重试', 'error')
    }
  }

  handleImagePreview = (current, urls) => {
    if (!urls || urls.length === 0) return

    try {
      previewImage(current, urls)
    } catch (error) {
      console.error('预览图片失败:', error)
      showToast('预览图片失败', 'error')
    }
  }

  handleBack = () => {
    navigateBack()
  }

  render() {
    const { listing, loading, error } = this.state

    if (loading) {
      return (
        <View className='detail'>
          <View className='loading-container'>
            <Text>加载中...</Text>
          </View>
        </View>
      )
    }

    if (error || !listing) {
      return (
        <View className='detail'>
          <View className='error-container'>
            <Text className='error-text'>{error || '商品不存在'}</Text>
            <Button className='btn btn-primary' onClick={this.handleBack}>
              返回
            </Button>
          </View>
        </View>
      )
    }

    const isFavorited = mockFavorites.includes(listing.id)

    return (
      <View className='detail'>
        <ScrollView className='detail-scroll' scrollY>
          <View className='detail-images'>
            {listing.images && listing.images.length > 0 && (
              <Image
                className='detail-main-image'
                src={listing.images[0]}
                mode='aspectFill'
                onClick={() => this.handleImagePreview(listing.images[0], listing.images)}
                lazyLoad
              />
            )}
          </View>

          <View className='detail-content card'>
            <View className='detail-header'>
              <Text className='detail-title'>{listing.title}</Text>
              <Text className='detail-price'>{formatPrice(listing.price)}</Text>
            </View>

            <View className='detail-tags'>
              {listing.tags && listing.tags.map((tag, index) => (
                <Text key={index} className='tag tag-primary'>{tag}</Text>
              ))}
            </View>

            <View className='detail-info'>
              <View className='info-row'>
                <Text className='info-label'>设备类型:</Text>
                <Text className='info-value'>{listing.type || '未知'}</Text>
              </View>
              <View className='info-row'>
                <Text className='info-label'>品牌:</Text>
                <Text className='info-value'>{listing.brand || '未知'}</Text>
              </View>
              <View className='info-row'>
                <Text className='info-label'>规格:</Text>
                <Text className='info-value'>{listing.tonnage ? `${listing.tonnage}吨` : '未知'}</Text>
              </View>
              <View className='info-row'>
                <Text className='info-label'>出厂日期:</Text>
                <Text className='info-value'>{listing.manufacture_date || '未知'}</Text>
              </View>
              <View className='info-row'>
                <Text className='info-label'>工作小时:</Text>
                <Text className='info-value'>{listing.work_hours ? `${listing.work_hours}小时` : '未知'}</Text>
              </View>
              <View className='info-row'>
                <Text className='info-label'>行驶里程:</Text>
                <Text className='info-value'>{listing.mileage ? `${listing.mileage}公里` : '未知'}</Text>
              </View>
              <View className='info-row'>
                <Text className='info-label'>所在地区:</Text>
                <Text className='info-value'>{listing.location || '未知'}</Text>
              </View>
              <View className='info-row'>
                <Text className='info-label'>发布时间:</Text>
                <Text className='info-value'>{listing.post_date || '未知'}</Text>
              </View>
            </View>

            <View className='detail-contact'>
              <Text className='contact-title'>联系信息</Text>
              <View className='contact-info'>
                <Text className='contact-person'>{listing.contact_person || '联系人'}</Text>
                <Text className='contact-phone'>{listing.phone || '电话未提供'}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className='detail-actions'>
          <Button
            className='btn btn-secondary'
            onClick={() => this.handleFavorite(listing.id)}
          >
            {isFavorited ? '已收藏' : '收藏'}
          </Button>
          <Button
            className='btn btn-primary'
            onClick={() => this.handleCall(listing.phone)}
          >
            拨打电话
          </Button>
        </View>
      </View>
    )
  }
}
