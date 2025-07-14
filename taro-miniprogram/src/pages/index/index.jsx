import { Component } from 'react'
import { View, Text, Image, ScrollView, Picker, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { 
  getListings, 
  chinaLocations, 
  equipmentData, 
  emissionOptions, 
  addToFavorites, 
  removeFromFavorites, 
  mockFavorites 
} from '../../services/data'
import { 
  sortListings, 
  formatPrice, 
  showToast, 
  showLoading, 
  hideLoading, 
  makePhoneCall,
  navigateTo 
} from '../../utils'
import './index.scss'

export default class Index extends Component {
  state = {
    listings: [],
    filteredListings: [],
    showFilter: false,
    loading: false,
    
    // 筛选条件
    filters: {
      province: '不限',
      city: '不限', 
      type: '不限',
      brand: '不限',
      source: '不限',
      tonnage: '',
      emission: '不限',
      sortType: '发布时间-新到旧'
    },
    
    // 选择器数据
    provinces: ['不限'],
    cities: ['不限'],
    types: ['不限'],
    brands: ['不限'],
    sources: ['不限', '车主直卖', '中介信息', '二手车商'],
    emissions: emissionOptions,
    sortTypes: ['发布时间-新到旧', '发布时间-旧到新', '价格-低到高', '价格-高到低'],
    
    // 选择器索引
    provinceIndex: 0,
    cityIndex: 0,
    typeIndex: 0,
    brandIndex: 0,
    sourceIndex: 0,
    emissionIndex: 0,
    sortIndex: 0
  }

  componentDidMount() {
    this.initData()
    this.loadListings()
  }

  // 下拉刷新
  onPullDownRefresh() {
    this.loadListings()
  }

  // 上拉加载更多
  onReachBottom() {
    console.log('到达底部，可以加载更多数据')
  }

  // 初始化数据
  initData = () => {
    const provinces = ['不限', ...Object.keys(chinaLocations)]
    const types = ['不限', ...Object.keys(equipmentData)]
    const allBrands = ['不限', ...new Set(Object.values(equipmentData).flatMap(type => type.brands))]
    
    this.setState({
      provinces,
      types,
      brands: allBrands
    })
  }

  // 加载商品列表
  loadListings = async () => {
    this.setState({ loading: true })
    showLoading('加载中...')
    
    try {
      const listings = await getListings()
      const sortedListings = sortListings(listings, this.state.filters.sortType)
      
      this.setState({
        listings: sortedListings,
        filteredListings: sortedListings
      })
    } catch (error) {
      console.error('加载商品失败:', error)
      showToast('加载失败，请重试', 'error')
    } finally {
      this.setState({ loading: false })
      hideLoading()
      Taro.stopPullDownRefresh()
    }
  }

  // 应用筛选
  applyFilters = async () => {
    const { filters } = this.state
    showLoading('筛选中...')
    
    try {
      const listings = await getListings(filters)
      const sortedListings = sortListings(listings, filters.sortType)
      
      this.setState({
        filteredListings: sortedListings,
        showFilter: false
      })
      
      showToast(`找到 ${sortedListings.length} 条结果`)
    } catch (error) {
      console.error('筛选失败:', error)
      showToast('筛选失败，请重试', 'error')
    } finally {
      hideLoading()
    }
  }

  // 重置筛选
  resetFilters = () => {
    const defaultFilters = {
      province: '不限',
      city: '不限',
      type: '不限', 
      brand: '不限',
      source: '不限',
      tonnage: '',
      emission: '不限',
      sortType: '发布时间-新到旧'
    }
    
    this.setState({
      filters: defaultFilters,
      provinceIndex: 0,
      cityIndex: 0,
      typeIndex: 0,
      brandIndex: 0,
      sourceIndex: 0,
      emissionIndex: 0,
      sortIndex: 0,
      cities: ['不限']
    })
    
    // 重新加载数据
    this.loadListings()
  }

  // 省份选择变化
  onProvinceChange = (e) => {
    const provinceIndex = e.detail.value
    const province = this.state.provinces[provinceIndex]
    const cities = province === '不限' ? ['不限'] : ['不限', ...chinaLocations[province]]
    
    this.setState({
      provinceIndex,
      cityIndex: 0,
      cities,
      filters: {
        ...this.state.filters,
        province,
        city: '不限'
      }
    })
  }

  // 城市选择变化
  onCityChange = (e) => {
    const cityIndex = e.detail.value
    const city = this.state.cities[cityIndex]
    
    this.setState({
      cityIndex,
      filters: {
        ...this.state.filters,
        city
      }
    })
  }

  // 类型选择变化
  onTypeChange = (e) => {
    const typeIndex = e.detail.value
    const type = this.state.types[typeIndex]
    const typeData = equipmentData[type]
    const brands = typeData ? ['不限', ...typeData.brands] : this.state.brands
    
    this.setState({
      typeIndex,
      brandIndex: 0,
      brands,
      filters: {
        ...this.state.filters,
        type,
        brand: '不限'
      }
    })
  }

  // 品牌选择变化
  onBrandChange = (e) => {
    const brandIndex = e.detail.value
    const brand = this.state.brands[brandIndex]
    
    this.setState({
      brandIndex,
      filters: {
        ...this.state.filters,
        brand
      }
    })
  }

  // 来源选择变化
  onSourceChange = (e) => {
    const sourceIndex = e.detail.value
    const source = this.state.sources[sourceIndex]
    
    this.setState({
      sourceIndex,
      filters: {
        ...this.state.filters,
        source
      }
    })
  }

  // 排放选择变化
  onEmissionChange = (e) => {
    const emissionIndex = e.detail.value
    const emission = this.state.emissions[emissionIndex]
    
    this.setState({
      emissionIndex,
      filters: {
        ...this.state.filters,
        emission
      }
    })
  }

  // 排序选择变化
  onSortChange = (e) => {
    const sortIndex = e.detail.value
    const sortType = this.state.sortTypes[sortIndex]
    
    this.setState({
      sortIndex,
      filters: {
        ...this.state.filters,
        sortType
      }
    })
    
    // 立即应用排序
    this.applyFilters()
  }

  // 吨位输入变化
  onTonnageChange = (e) => {
    this.setState({
      filters: {
        ...this.state.filters,
        tonnage: e.detail.value
      }
    })
  }

  // 切换筛选显示
  toggleFilter = () => {
    this.setState({
      showFilter: !this.state.showFilter
    })
  }

  // 拨打电话
  handleCall = async (phone) => {
    try {
      await makePhoneCall(phone)
    } catch (error) {
      console.error('拨打电话失败:', error)
    }
  }

  // 收藏/取消收藏
  handleFavorite = (id) => {
    const isFavorited = mockFavorites.includes(id)
    
    if (isFavorited) {
      removeFromFavorites(id)
      showToast('已取消收藏')
    } else {
      addToFavorites(id)
      showToast('收藏成功')
    }
    
    this.forceUpdate() // 强制更新以显示收藏状态变化
  }

  // 跳转到详情页
  goToDetail = (id) => {
    navigateTo(`/pages/detail/detail?id=${id}`)
  }

  render() {
    const { 
      filteredListings, 
      showFilter, 
      loading,
      provinces,
      cities, 
      types,
      brands,
      sources,
      emissions,
      sortTypes,
      provinceIndex,
      cityIndex,
      typeIndex,
      brandIndex,
      sourceIndex,
      emissionIndex,
      sortIndex,
      filters
    } = this.state

    return (
      <View className='index'>
        {/* 筛选区域 */}
        <View className='filter-section'>
          <View className='filter-toggle' onClick={this.toggleFilter}>
            <Text className='filter-text'>
              {showFilter ? '收起筛选' : '展开筛选'}
            </Text>
            <Text className={`filter-arrow ${showFilter ? 'up' : ''}`}>▼</Text>
          </View>
          
          {showFilter && (
            <View className='filter-content'>
              {/* 地区筛选 */}
              <View className='filter-row'>
                <Text className='filter-label'>地区:</Text>
                <Picker
                  mode='selector'
                  range={provinces}
                  value={provinceIndex}
                  onChange={this.onProvinceChange}
                  className='filter-picker'
                >
                  <View className='picker-display'>{provinces[provinceIndex]}</View>
                </Picker>
                <Picker
                  mode='selector'
                  range={cities}
                  value={cityIndex}
                  onChange={this.onCityChange}
                  className='filter-picker'
                >
                  <View className='picker-display'>{cities[cityIndex]}</View>
                </Picker>
              </View>

              {/* 来源筛选 */}
              <View className='filter-row'>
                <Text className='filter-label'>来源:</Text>
                <Picker
                  mode='selector'
                  range={sources}
                  value={sourceIndex}
                  onChange={this.onSourceChange}
                  className='filter-picker-full'
                >
                  <View className='picker-display'>{sources[sourceIndex]}</View>
                </Picker>
              </View>

              {/* 类型筛选 */}
              <View className='filter-row'>
                <Text className='filter-label'>类型:</Text>
                <Picker
                  mode='selector'
                  range={types}
                  value={typeIndex}
                  onChange={this.onTypeChange}
                  className='filter-picker-full'
                >
                  <View className='picker-display'>{types[typeIndex]}</View>
                </Picker>
              </View>

              {/* 品牌筛选 */}
              <View className='filter-row'>
                <Text className='filter-label'>品牌:</Text>
                <Picker
                  mode='selector'
                  range={brands}
                  value={brandIndex}
                  onChange={this.onBrandChange}
                  className='filter-picker-full'
                >
                  <View className='picker-display'>{brands[brandIndex]}</View>
                </Picker>
              </View>

              {/* 规格筛选 */}
              <View className='filter-row'>
                <Text className='filter-label'>规格:</Text>
                <Input
                  className='filter-input'
                  placeholder='请输入规格'
                  value={filters.tonnage}
                  onInput={this.onTonnageChange}
                />
              </View>

              {/* 排放筛选 */}
              <View className='filter-row'>
                <Text className='filter-label'>排放:</Text>
                <Picker
                  mode='selector'
                  range={emissions}
                  value={emissionIndex}
                  onChange={this.onEmissionChange}
                  className='filter-picker-full'
                >
                  <View className='picker-display'>{emissions[emissionIndex]}</View>
                </Picker>
              </View>

              {/* 排序筛选 */}
              <View className='filter-row'>
                <Text className='filter-label'>排序:</Text>
                <Picker
                  mode='selector'
                  range={sortTypes}
                  value={sortIndex}
                  onChange={this.onSortChange}
                  className='filter-picker-full'
                >
                  <View className='picker-display'>{sortTypes[sortIndex]}</View>
                </Picker>
              </View>

              {/* 筛选按钮 */}
              <View className='filter-buttons'>
                <Button className='btn btn-secondary' onClick={this.resetFilters}>
                  重置
                </Button>
                <Button className='btn btn-primary' onClick={this.applyFilters}>
                  筛选
                </Button>
              </View>
            </View>
          )}
        </View>

        {/* 商品列表 */}
        <ScrollView
          className='listings-scroll'
          scrollY
          enableBackToTop
          refresherEnabled
          refresherTriggered={loading}
          onRefresherRefresh={this.onPullDownRefresh}
        >
          <View className='listings-container'>
            {filteredListings.length === 0 ? (
              <View className='empty-state'>
                <Text className='empty-icon'>📦</Text>
                <Text className='empty-text'>没有找到符合条件的车辆</Text>
              </View>
            ) : (
              filteredListings.map(item => (
                <View key={item.id} className='listing-card card'>
                  <View className='listing-header' onClick={() => this.goToDetail(item.id)}>
                    <View className='source-tag'>{item.tags[0]}</View>
                    <Image
                      className='listing-image image image-cover'
                      src={item.images[0]}
                      mode='aspectFill'
                      lazyLoad
                    />
                  </View>
                  
                  <View className='listing-content' onClick={() => this.goToDetail(item.id)}>
                    <Text className='listing-title'>{item.title}</Text>
                    
                    <View className='listing-tags'>
                      <Text className='tag tag-primary'>{item.type}</Text>
                      <Text className='tag tag-primary'>{item.tags[2]}</Text>
                    </View>
                    
                    <View className='listing-meta text-muted'>
                      <Text className='meta-item'>出厂日期: {item.manufacture_date}</Text>
                      <Text className='meta-item'>发布时间: {item.post_date}</Text>
                      <Text className='meta-item'>所在地区: {item.location}</Text>
                    </View>
                  </View>
                  
                  <View className='listing-footer flex flex-between'>
                    <Text className='price price-large'>{formatPrice(item.price)}</Text>
                    <View className='listing-actions flex'>
                      <Button
                        className='btn btn-small btn-secondary mr-16'
                        onClick={() => this.handleFavorite(item.id)}
                      >
                        {mockFavorites.includes(item.id) ? '已收藏' : '收藏'}
                      </Button>
                      <Button
                        className='btn btn-small btn-primary'
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