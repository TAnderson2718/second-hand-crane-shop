import { Component } from 'react'
import { View, Text, Input, Textarea, Button, Picker, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { chinaLocations, equipmentData, emissionOptions } from '../../services/data'
import { showToast, showLoading, hideLoading, chooseImage, navigateBack } from '../../utils'
import './post.scss'

export default class Post extends Component {
  state = {
    formData: {
      title: '',
      type: '',
      brand: '',
      tonnage: '',
      manufacture_date: '',
      province: '',
      city: '',
      price: '',
      phone: '',
      contact_person: '',
      work_hours: '',
      mileage: '',
      emission: '',
      description: ''
    },
    images: [],
    
    provinces: ['请选择省份'],
    cities: ['请选择城市'],
    types: ['请选择类型'],
    brands: ['请选择品牌'],
    emissions: emissionOptions,
    
    provinceIndex: 0,
    cityIndex: 0,
    typeIndex: 0,
    brandIndex: 0,
    emissionIndex: 0,
    
    errors: {},
    submitting: false
  }

  componentDidMount() {
    this.initData()
  }

  initData = () => {
    const provinces = ['请选择省份', ...Object.keys(chinaLocations)]
    const types = ['请选择类型', ...Object.keys(equipmentData)]
    
    this.setState({
      provinces,
      types
    })
  }

  validateForm = () => {
    const { formData } = this.state
    const errors = {}

    if (!formData.title.trim()) {
      errors.title = '请输入商品标题'
    }

    if (!formData.type || formData.type === '请选择类型') {
      errors.type = '请选择设备类型'
    }

    if (!formData.brand || formData.brand === '请选择品牌') {
      errors.brand = '请选择品牌'
    }

    if (!formData.tonnage.trim()) {
      errors.tonnage = '请输入规格'
    } else if (isNaN(parseFloat(formData.tonnage))) {
      errors.tonnage = '规格必须是数字'
    }

    if (!formData.price.trim()) {
      errors.price = '请输入价格'
    } else if (isNaN(parseFloat(formData.price))) {
      errors.price = '价格必须是数字'
    }

    if (!formData.phone.trim()) {
      errors.phone = '请输入联系电话'
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      errors.phone = '请输入正确的手机号码'
    }

    if (!formData.contact_person.trim()) {
      errors.contact_person = '请输入联系人姓名'
    }

    if (!formData.province || formData.province === '请选择省份') {
      errors.province = '请选择省份'
    }

    if (!formData.city || formData.city === '请选择城市') {
      errors.city = '请选择城市'
    }

    this.setState({ errors })
    return Object.keys(errors).length === 0
  }

  handleInputChange = (field, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [field]: value
      },
      errors: {
        ...this.state.errors,
        [field]: ''
      }
    })
  }

  onProvinceChange = (e) => {
    const provinceIndex = e.detail.value
    const province = this.state.provinces[provinceIndex]
    const cities = province === '请选择省份' ? ['请选择城市'] : ['请选择城市', ...chinaLocations[province]]
    
    this.setState({
      provinceIndex,
      cityIndex: 0,
      cities,
      formData: {
        ...this.state.formData,
        province,
        city: '请选择城市'
      }
    })
  }

  onCityChange = (e) => {
    const cityIndex = e.detail.value
    const city = this.state.cities[cityIndex]
    
    this.setState({
      cityIndex,
      formData: {
        ...this.state.formData,
        city
      }
    })
  }

  onTypeChange = (e) => {
    const typeIndex = e.detail.value
    const type = this.state.types[typeIndex]
    const typeData = equipmentData[type]
    const brands = typeData ? ['请选择品牌', ...typeData.brands] : ['请选择品牌']
    
    this.setState({
      typeIndex,
      brandIndex: 0,
      brands,
      formData: {
        ...this.state.formData,
        type,
        brand: '请选择品牌'
      }
    })
  }

  onBrandChange = (e) => {
    const brandIndex = e.detail.value
    const brand = this.state.brands[brandIndex]
    
    this.setState({
      brandIndex,
      formData: {
        ...this.state.formData,
        brand
      }
    })
  }

  onEmissionChange = (e) => {
    const emissionIndex = e.detail.value
    const emission = this.state.emissions[emissionIndex]
    
    this.setState({
      emissionIndex,
      formData: {
        ...this.state.formData,
        emission
      }
    })
  }

  handleChooseImage = async () => {
    try {
      const res = await chooseImage(9 - this.state.images.length)
      this.setState({
        images: [...this.state.images, ...res.tempFilePaths]
      })
    } catch (error) {
      console.error('选择图片失败:', error)
      showToast('选择图片失败', 'error')
    }
  }

  handleRemoveImage = (index) => {
    const images = [...this.state.images]
    images.splice(index, 1)
    this.setState({ images })
  }

  handleSubmit = async () => {
    if (!this.validateForm()) {
      showToast('请完善表单信息', 'error')
      return
    }

    this.setState({ submitting: true })
    showLoading('发布中...')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showToast('发布成功')
      setTimeout(() => {
        navigateBack()
      }, 1500)
    } catch (error) {
      console.error('发布失败:', error)
      showToast('发布失败，请稍后重试', 'error')
    } finally {
      this.setState({ submitting: false })
      hideLoading()
    }
  }

  render() {
    const {
      formData,
      images,
      provinces,
      cities,
      types,
      brands,
      emissions,
      provinceIndex,
      cityIndex,
      typeIndex,
      brandIndex,
      emissionIndex,
      errors,
      submitting
    } = this.state

    return (
      <View className='post'>
        <View className='post-form'>
          <View className='form-group'>
            <Text className='label'>商品标题 *</Text>
            <Input
              className={`input ${errors.title ? 'error' : ''}`}
              placeholder='请输入商品标题'
              value={formData.title}
              onInput={(e) => this.handleInputChange('title', e.detail.value)}
            />
            {errors.title && <Text className='error-text'>{errors.title}</Text>}
          </View>

          <View className='form-group'>
            <Text className='label'>设备类型 *</Text>
            <Picker
              mode='selector'
              range={types}
              value={typeIndex}
              onChange={this.onTypeChange}
              className={`picker ${errors.type ? 'error' : ''}`}
            >
              <View className='picker-display'>{types[typeIndex]}</View>
            </Picker>
            {errors.type && <Text className='error-text'>{errors.type}</Text>}
          </View>

          <View className='form-group'>
            <Text className='label'>品牌 *</Text>
            <Picker
              mode='selector'
              range={brands}
              value={brandIndex}
              onChange={this.onBrandChange}
              className={`picker ${errors.brand ? 'error' : ''}`}
            >
              <View className='picker-display'>{brands[brandIndex]}</View>
            </Picker>
            {errors.brand && <Text className='error-text'>{errors.brand}</Text>}
          </View>

          <View className='form-group'>
            <Text className='label'>规格 *</Text>
            <Input
              className={`input ${errors.tonnage ? 'error' : ''}`}
              placeholder='请输入规格（吨）'
              value={formData.tonnage}
              type='digit'
              onInput={(e) => this.handleInputChange('tonnage', e.detail.value)}
            />
            {errors.tonnage && <Text className='error-text'>{errors.tonnage}</Text>}
          </View>

          <View className='form-group'>
            <Text className='label'>出厂日期</Text>
            <Input
              className='input'
              placeholder='请输入出厂日期（如：2023-06）'
              value={formData.manufacture_date}
              onInput={(e) => this.handleInputChange('manufacture_date', e.detail.value)}
            />
          </View>

          <View className='form-group'>
            <Text className='label'>所在地区 *</Text>
            <View className='picker-row'>
              <Picker
                mode='selector'
                range={provinces}
                value={provinceIndex}
                onChange={this.onProvinceChange}
                className={`picker ${errors.province ? 'error' : ''}`}
              >
                <View className='picker-display'>{provinces[provinceIndex]}</View>
              </Picker>
              <Picker
                mode='selector'
                range={cities}
                value={cityIndex}
                onChange={this.onCityChange}
                className={`picker ${errors.city ? 'error' : ''}`}
              >
                <View className='picker-display'>{cities[cityIndex]}</View>
              </Picker>
            </View>
            {(errors.province || errors.city) && (
              <Text className='error-text'>{errors.province || errors.city}</Text>
            )}
          </View>

          <View className='form-group'>
            <Text className='label'>价格 *</Text>
            <Input
              className={`input ${errors.price ? 'error' : ''}`}
              placeholder='请输入价格（万元）'
              value={formData.price}
              type='digit'
              onInput={(e) => this.handleInputChange('price', e.detail.value)}
            />
            {errors.price && <Text className='error-text'>{errors.price}</Text>}
          </View>

          <View className='form-group'>
            <Text className='label'>工作小时</Text>
            <Input
              className='input'
              placeholder='请输入工作小时数'
              value={formData.work_hours}
              type='number'
              onInput={(e) => this.handleInputChange('work_hours', e.detail.value)}
            />
          </View>

          <View className='form-group'>
            <Text className='label'>行驶里程</Text>
            <Input
              className='input'
              placeholder='请输入行驶里程（公里）'
              value={formData.mileage}
              type='number'
              onInput={(e) => this.handleInputChange('mileage', e.detail.value)}
            />
          </View>

          <View className='form-group'>
            <Text className='label'>排放标准</Text>
            <Picker
              mode='selector'
              range={emissions}
              value={emissionIndex}
              onChange={this.onEmissionChange}
              className='picker'
            >
              <View className='picker-display'>{emissions[emissionIndex]}</View>
            </Picker>
          </View>

          <View className='form-group'>
            <Text className='label'>联系人 *</Text>
            <Input
              className={`input ${errors.contact_person ? 'error' : ''}`}
              placeholder='请输入联系人姓名'
              value={formData.contact_person}
              onInput={(e) => this.handleInputChange('contact_person', e.detail.value)}
            />
            {errors.contact_person && <Text className='error-text'>{errors.contact_person}</Text>}
          </View>

          <View className='form-group'>
            <Text className='label'>联系电话 *</Text>
            <Input
              className={`input ${errors.phone ? 'error' : ''}`}
              placeholder='请输入联系电话'
              value={formData.phone}
              type='number'
              onInput={(e) => this.handleInputChange('phone', e.detail.value)}
            />
            {errors.phone && <Text className='error-text'>{errors.phone}</Text>}
          </View>

          <View className='form-group'>
            <Text className='label'>商品描述</Text>
            <Textarea
              className='textarea'
              placeholder='请输入商品描述'
              value={formData.description}
              onInput={(e) => this.handleInputChange('description', e.detail.value)}
            />
          </View>

          <View className='form-group'>
            <Text className='label'>商品图片</Text>
            <View className='image-upload'>
              {images.map((image, index) => (
                <View key={index} className='image-item'>
                  <Image className='upload-image' src={image} mode='aspectFill' />
                  <View className='image-remove' onClick={() => this.handleRemoveImage(index)}>
                    ×
                  </View>
                </View>
              ))}
              {images.length < 9 && (
                <View className='image-add' onClick={this.handleChooseImage}>
                  <Text className='add-icon'>+</Text>
                  <Text className='add-text'>添加图片</Text>
                </View>
              )}
            </View>
          </View>

          <View className='form-actions'>
            <Button
              className='btn btn-primary btn-large'
              onClick={this.handleSubmit}
              disabled={submitting}
            >
              {submitting ? '发布中...' : '发布商品'}
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
