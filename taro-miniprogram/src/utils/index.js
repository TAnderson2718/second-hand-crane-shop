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
  return new Promise((resolve) => {
    wx.showToast({
      title,
      icon,
      duration: 2000,
      success: resolve
    });
  });
}

// 显示加载中
export function showLoading(title = '加载中...') {
  return wx.showLoading({
    title,
    mask: true
  });
}

// 隐藏加载中
export function hideLoading() {
  return wx.hideLoading();
}

// 显示确认对话框
export function showModal(title, content) {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      success: (res) => {
        resolve(res.confirm);
      }
    });
  });
}

// 拨打电话
export function makePhoneCall(phoneNumber) {
  return new Promise((resolve, reject) => {
    wx.makePhoneCall({
      phoneNumber,
      success: resolve,
      fail: reject
    });
  });
}

// 预览图片
export function previewImage(current, urls) {
  return wx.previewImage({
    current,
    urls
  });
}

// 选择图片
export function chooseImage(count = 9) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: resolve,
      fail: reject
    });
  });
}

// 获取用户位置
export function getLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      success: resolve,
      fail: reject
    });
  });
}

// 选择位置
export function chooseLocation() {
  return new Promise((resolve, reject) => {
    wx.chooseLocation({
      success: resolve,
      fail: reject
    });
  });
}

// 存储数据
export function setStorage(key, data) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: resolve,
      fail: reject
    });
  });
}

// 获取存储数据
export function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: (res) => resolve(res.data),
      fail: reject
    });
  });
}

// 删除存储数据
export function removeStorage(key) {
  return new Promise((resolve, reject) => {
    wx.removeStorage({
      key,
      success: resolve,
      fail: reject
    });
  });
}

// 防抖函数
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流函数
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 深拷贝
export function deepClone(obj) {
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
}

// 获取网络状态
export function getNetworkType() {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success: resolve,
      fail: reject
    });
  });
}

// 页面跳转
export function navigateTo(url) {
  return wx.navigateTo({ url });
}

export function redirectTo(url) {
  return wx.redirectTo({ url });
}

export function switchTab(url) {
  return wx.switchTab({ url });
}

export function navigateBack(delta = 1) {
  return wx.navigateBack({ delta });
} 