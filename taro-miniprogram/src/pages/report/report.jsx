import { Component } from 'react'
import { View, Text, Input, Textarea, Button, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { showToast, showLoading, hideLoading, navigateBack } from '../../utils'
import './report.scss'

export default class Report extends Component {
  state = {
    formData: {
      type: '',
      target_id: '',
      reason: '',
      description: '',
      contact: ''
    },
    
    reportTypes: ['请选择举报类型', '虚假信息', '价格欺诈', '重复发布', '违法违规', '其他'],
    typeIndex: 0,
    
    errors: {},
    submitting: false
  }

  componentDidMount() {
    const { type, id } = this.$router.params
    if (type && id) {
      this.setState({
        formData: {
          ...this.state.formData,
          target_id: id
        }
      })
    }
  }

  validateForm = () => {
    const { formData, reportTypes, typeIndex } = this.state
    const errors = {}

    if (typeIndex === 0 || !reportTypes[typeIndex] || reportTypes[typeIndex] === '请选择举报类型') {
      errors.type = '请选择举报类型'
    }

    if (!formData.reason.trim()) {
      errors.reason = '请输入举报原因'
    }

    if (!formData.description.trim()) {
      errors.description = '请详细描述举报内容'
    } else if (formData.description.trim().length < 10) {
      errors.description = '描述内容至少需要10个字符'
    }

    if (formData.contact.trim() && !/^1[3-9]\d{9}$/.test(formData.contact)) {
      errors.contact = '请输入正确的手机号码'
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

  onTypeChange = (e) => {
    const typeIndex = e.detail.value
    const type = this.state.reportTypes[typeIndex]
    
    this.setState({
      typeIndex,
      formData: {
        ...this.state.formData,
        type
      },
      errors: {
        ...this.state.errors,
        type: ''
      }
    })
  }

  handleSubmit = async () => {
    if (!this.validateForm()) {
      showToast('请完善举报信息', 'error')
      return
    }

    this.setState({ submitting: true })
    showLoading('提交中...')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showToast('举报提交成功，我们会尽快处理')
      setTimeout(() => {
        navigateBack()
      }, 1500)
    } catch (error) {
      console.error('提交举报失败:', error)
      showToast('提交失败，请稍后重试', 'error')
    } finally {
      this.setState({ submitting: false })
      hideLoading()
    }
  }

  render() {
    const {
      formData,
      reportTypes,
      typeIndex,
      errors,
      submitting
    } = this.state

    return (
      <View className='report'>
        <View className='report-form'>
          <View className='form-header'>
            <Text className='form-title'>举报投诉</Text>
            <Text className='form-subtitle'>请详细填写举报信息，我们会认真处理每一个举报</Text>
          </View>

          <View className='form-group'>
            <Text className='label'>举报类型 *</Text>
            <Picker
              mode='selector'
              range={reportTypes}
              value={typeIndex}
              onChange={this.onTypeChange}
              className={`picker ${errors.type ? 'error' : ''}`}
            >
              <View className='picker-display'>{reportTypes[typeIndex]}</View>
            </Picker>
            {errors.type && <Text className='error-text'>{errors.type}</Text>}
          </View>

          <View className='form-group'>
            <Text className='label'>举报原因 *</Text>
            <Input
              className={`input ${errors.reason ? 'error' : ''}`}
              placeholder='请简要说明举报原因'
              value={formData.reason}
              onInput={(e) => this.handleInputChange('reason', e.detail.value)}
            />
            {errors.reason && <Text className='error-text'>{errors.reason}</Text>}
          </View>

          <View className='form-group'>
            <Text className='label'>详细描述 *</Text>
            <Textarea
              className={`textarea ${errors.description ? 'error' : ''}`}
              placeholder='请详细描述举报内容，包括具体的违规行为、时间、地点等信息'
              value={formData.description}
              onInput={(e) => this.handleInputChange('description', e.detail.value)}
              maxlength={500}
            />
            <View className='char-count'>
              {formData.description.length}/500
            </View>
            {errors.description && <Text className='error-text'>{errors.description}</Text>}
          </View>

          <View className='form-group'>
            <Text className='label'>联系方式</Text>
            <Input
              className={`input ${errors.contact ? 'error' : ''}`}
              placeholder='请输入您的手机号码（选填）'
              value={formData.contact}
              type='number'
              onInput={(e) => this.handleInputChange('contact', e.detail.value)}
            />
            <Text className='input-hint'>提供联系方式有助于我们更好地处理您的举报</Text>
            {errors.contact && <Text className='error-text'>{errors.contact}</Text>}
          </View>

          <View className='form-notice'>
            <Text className='notice-title'>举报须知:</Text>
            <Text className='notice-text'>• 请确保举报内容真实有效</Text>
            <Text className='notice-text'>• 恶意举报将承担相应责任</Text>
            <Text className='notice-text'>• 我们会在3个工作日内处理您的举报</Text>
          </View>

          <View className='form-actions'>
            <Button
              className='btn btn-primary btn-large'
              onClick={this.handleSubmit}
              disabled={submitting}
            >
              {submitting ? '提交中...' : '提交举报'}
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
