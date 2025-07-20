import Taro from '@tarojs/taro'

// 工具函数 - 复用原有HTML项目的逻辑

// 解析发布时间文本为数字（天数），用于排序
export function parsePostDate(postDate) {
  const match = postDate.match(/(\d+)(天|月)前发布/);
  if (!match) return 0;
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  // 转换为天数，月份按30天计算
  return unit === '天' ? value : value * 30;
}

// 排序函数
export function sortListings(listings, sortType = '发布时间-新到旧') {
  return [...listings].sort((a, b) => {
    switch (sortType) {
      case '发布时间-新到旧':
        const aDays = parsePostDate(a.post_date);
        const bDays = parsePostDate(b.post_date);
        return aDays - bDays;
      
      case '发布时间-旧到新':
        const aDaysOld = parsePostDate(a.post_date);
        const bDaysOld = parsePostDate(b.post_date);
        return bDaysOld - aDaysOld;
      
      case '价格-低到高':
        return parseFloat(a.price) - parseFloat(b.price);
      
      case '价格-高到低':
        return parseFloat(b.price) - parseFloat(a.price);
      
      default:
        return 0;
    }
  });
}

// 保持向后兼容的排序函数
export function sortListingsByPostDate(listings) {
  return sortListings(listings, '发布时间-新到旧');
}

// 格式化价格
export function formatPrice(price) {
  return `${price}万`;
}

// 生成序列号
export function generateSerialNumber(id) {
  return String(id).padStart(5, '0');
}

// 显示通知
export function showToast(title, icon = 'success') {
  try {
    return new Promise((resolve) => {
      Taro.showToast({
        title,
        icon,
        duration: 2000,
        success: resolve,
        fail: (error) => {
          console.error('显示Toast失败:', error)
          resolve()
        }
      });
    });
  } catch (error) {
    console.error('显示Toast失败:', error)
    return Promise.resolve()
  }
}

// 显示加载中
export function showLoading(title = '加载中...') {
  try {
    return Taro.showLoading({
      title,
      mask: true
    });
  } catch (error) {
    console.error('显示Loading失败:', error)
  }
}

// 隐藏加载中
export function hideLoading() {
  try {
    return Taro.hideLoading();
  } catch (error) {
    console.error('隐藏Loading失败:', error)
  }
}

// 显示确认对话框
export function showModal(title, content) {
  try {
    return new Promise((resolve) => {
      Taro.showModal({
        title,
        content,
        success: (res) => {
          resolve(res.confirm);
        },
        fail: (error) => {
          console.error('显示对话框失败:', error)
          resolve(false)
        }
      });
    });
  } catch (error) {
    console.error('显示对话框失败:', error)
    return Promise.resolve(false)
  }
}

// 拨打电话
export function makePhoneCall(phoneNumber) {
  if (!phoneNumber) {
    return Promise.reject(new Error('电话号码不能为空'))
  }
  
  try {
    return new Promise((resolve, reject) => {
      Taro.makePhoneCall({
        phoneNumber,
        success: resolve,
        fail: (error) => {
          console.error('拨打电话失败:', error)
          reject(error)
        }
      });
    });
  } catch (error) {
    console.error('拨打电话失败:', error)
    return Promise.reject(error)
  }
}

// 预览图片
export function previewImage(current, urls) {
  if (!urls || urls.length === 0) {
    throw new Error('图片列表不能为空')
  }
  
  try {
    return Taro.previewImage({
      current,
      urls
    });
  } catch (error) {
    console.error('预览图片失败:', error)
    throw error
  }
}

// 选择图片
export function chooseImage(count = 9) {
  if (count <= 0) {
    return Promise.reject(new Error('选择图片数量必须大于0'))
  }
  
  try {
    return new Promise((resolve, reject) => {
      Taro.chooseImage({
        count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: resolve,
        fail: (error) => {
          console.error('选择图片失败:', error)
          reject(error)
        }
      });
    });
  } catch (error) {
    console.error('选择图片失败:', error)
    return Promise.reject(error)
  }
}

// 获取用户位置
export function getLocation() {
  try {
    return new Promise((resolve, reject) => {
      Taro.getLocation({
        type: 'wgs84',
        success: resolve,
        fail: (error) => {
          console.error('获取用户位置失败:', error)
          reject(error)
        }
      });
    });
  } catch (error) {
    console.error('获取用户位置失败:', error)
    return Promise.reject(error)
  }
}

// 选择位置
export function chooseLocation() {
  try {
    return new Promise((resolve, reject) => {
      Taro.chooseLocation({
        success: resolve,
        fail: (error) => {
          console.error('选择位置失败:', error)
          reject(error)
        }
      });
    });
  } catch (error) {
    console.error('选择位置失败:', error)
    return Promise.reject(error)
  }
}

// 存储数据
export function setStorage(key, data) {
  if (!key) {
    return Promise.reject(new Error('存储key不能为空'))
  }
  
  try {
    return new Promise((resolve, reject) => {
      Taro.setStorage({
        key,
        data,
        success: resolve,
        fail: (error) => {
          console.error('存储数据失败:', error)
          reject(error)
        }
      });
    });
  } catch (error) {
    console.error('存储数据失败:', error)
    return Promise.reject(error)
  }
}

// 获取存储数据
export function getStorage(key) {
  if (!key) {
    return Promise.reject(new Error('存储key不能为空'))
  }
  
  try {
    return new Promise((resolve, reject) => {
      Taro.getStorage({
        key,
        success: (res) => resolve(res.data),
        fail: (error) => {
          console.error('获取存储数据失败:', error)
          reject(error)
        }
      });
    });
  } catch (error) {
    console.error('获取存储数据失败:', error)
    return Promise.reject(error)
  }
}

// 删除存储数据
export function removeStorage(key) {
  if (!key) {
    return Promise.reject(new Error('存储key不能为空'))
  }
  
  try {
    return new Promise((resolve, reject) => {
      Taro.removeStorage({
        key,
        success: resolve,
        fail: (error) => {
          console.error('删除存储数据失败:', error)
          reject(error)
        }
      });
    });
  } catch (error) {
    console.error('删除存储数据失败:', error)
    return Promise.reject(error)
  }
}

// 防抖函数
export function debounce(func, wait) {
  if (typeof func !== 'function') {
    throw new Error('第一个参数必须是函数')
  }
  if (typeof wait !== 'number' || wait < 0) {
    throw new Error('等待时间必须是非负数')
  }
  
  let timeout;
  const debouncedFunction = function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
  
  debouncedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  return debouncedFunction;
}

// 节流函数
export function throttle(func, limit) {
  if (typeof func !== 'function') {
    throw new Error('第一个参数必须是函数')
  }
  if (typeof limit !== 'number' || limit < 0) {
    throw new Error('限制时间必须是非负数')
  }
  
  let inThrottle;
  let lastResult;
  
  const throttledFunction = function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      lastResult = func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
    return lastResult;
  };
  
  throttledFunction.cancel = () => {
    inThrottle = false;
  };
  
  return throttledFunction;
}

// 深拷贝
export function deepClone(obj) {
  try {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  } catch (error) {
    console.error('深拷贝失败:', error)
    return obj
  }
}

// 获取网络状态
export function getNetworkType() {
  try {
    return new Promise((resolve, reject) => {
      Taro.getNetworkType({
        success: resolve,
        fail: (error) => {
          console.error('获取网络状态失败:', error)
          reject(error)
        }
      });
    });
  } catch (error) {
    console.error('获取网络状态失败:', error)
    return Promise.reject(error)
  }
}

// 页面跳转
export function navigateTo(url) {
  try {
    return Taro.navigateTo({ url });
  } catch (error) {
    console.error('页面跳转失败:', error)
    throw error
  }
}

export function redirectTo(url) {
  try {
    return Taro.redirectTo({ url });
  } catch (error) {
    console.error('页面重定向失败:', error)
    throw error
  }
}

export function switchTab(url) {
  try {
    return Taro.switchTab({ url });
  } catch (error) {
    console.error('切换Tab失败:', error)
    throw error
  }
}

export function navigateBack(delta = 1) {
  try {
    return Taro.navigateBack({ delta });
  } catch (error) {
    console.error('返回上一页失败:', error)
    throw error
  }
}       