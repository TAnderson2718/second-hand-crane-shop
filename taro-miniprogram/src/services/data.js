// 数据服务层 - 复用原有HTML项目的数据结构

// 模拟数据
export const mockListings = [
  { 
    id: 1, 
    title: "三一 XCT25L5 - 80吨", 
    tags: ["中介信息", "塔吊", "国五"], 
    type: "汽车吊", 
    brand: "三一", 
    tonnage: 80, 
    manufacture_date: "2025-06", 
    post_date: "6天前发布", 
    location: "江苏 苏州", 
    price: "180.00", 
    phone: "138-0001-0001", 
    images: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=800&h=600&fit=crop", 
      "https://picsum.photos/seed/crane1-2/800/600", 
      "https://picsum.photos/seed/crane1-3/800/600"
    ], 
    work_hours: 1500, 
    mileage: 25000, 
    contact_person: "王经理", 
    status: 'selling'
  },
  { 
    id: 2, 
    title: "中联 XCT25L5 - 50吨", 
    tags: ["二手车商", "塔吊", "国五"], 
    type: "汽车吊", 
    brand: "中联重科", 
    tonnage: 50, 
    manufacture_date: "2025-06", 
    post_date: "6天前发布", 
    location: "山东 济南", 
    price: "80.00", 
    phone: "138-0002-0002", 
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&h=600&fit=crop", 
      "https://picsum.photos/seed/crane2-2/800/600"
    ], 
    work_hours: 2200, 
    mileage: 31000, 
    contact_person: "李老板", 
    status: 'selling'
  },
  { 
    id: 3, 
    title: "徐工 QY25K5 - 25吨", 
    tags: ["车主直卖", "汽车吊", "国六"], 
    type: "汽车吊", 
    brand: "徐工", 
    tonnage: 25, 
    manufacture_date: "2024-01", 
    post_date: "12天前发布", 
    location: "河北 石家庄", 
    price: "65.50", 
    phone: "138-0003-0003", 
    images: [
      "https://picsum.photos/id/1057/800/600", 
      "https://picsum.photos/id/1058/800/600"
    ], 
    work_hours: 800, 
    mileage: 12000, 
    contact_person: "张师傅", 
    status: 'selling'
  },
  { 
    id: 4, 
    title: "三一 STC250 - 25吨", 
    tags: ["车主直卖", "汽车吊", "国五"], 
    type: "汽车吊", 
    brand: "三一", 
    tonnage: 25, 
    manufacture_date: "2023-08", 
    post_date: "20天前发布", 
    location: "广东 广州", 
    price: "55.00", 
    phone: "138-0004-0004", 
    images: ["https://picsum.photos/seed/crane4/600/400"], 
    work_hours: 3500, 
    mileage: 45000, 
    contact_person: "陈先生", 
    status: 'reviewing'
  },
  { 
    id: 5, 
    title: "利勃海尔 LTM 1500 - 500吨", 
    tags: ["中介信息", "履带吊", "国四"], 
    type: "履带吊", 
    brand: "利勃海尔", 
    tonnage: 500, 
    manufacture_date: "2022-01", 
    post_date: "1月前发布", 
    location: "上海 上海市", 
    price: "1200.00", 
    phone: "138-0005-0005", 
    images: ["https://picsum.photos/seed/crane5/600/400"], 
    work_hours: 5000, 
    mileage: 0, 
    contact_person: "赵总", 
    status: 'off' 
  }
];

export const mockUsers = [
  {id: 101, nickname: '吊车大王', avatar: 'https://picsum.photos/seed/avatar1/100/100', phone: '138-0001-0001', registration_date: '2023-05-10', status: 'active'},
  {id: 102, nickname: '起重先锋', avatar: 'https://picsum.photos/seed/avatar2/100/100', phone: '138-0002-0002', registration_date: '2023-08-15', status: 'active'},
  {id: 103, nickname: '工程机械', avatar: 'https://picsum.photos/seed/avatar3/100/100', phone: '138-0003-0003', registration_date: '2024-01-20', status: 'banned'},
  {id: 104, nickname: '吊装小王子', avatar: 'https://picsum.photos/seed/avatar4/100/100', phone: '138-0004-0004', registration_date: '2024-03-11', status: 'active'}
];

export const mockReports = [
  { id: 1, listingId: 4, reason: '虚假信息', status: 'pending' },
  { id: 2, listingId: 1, reason: '车辆已售', status: 'processed' },
  { id: 3, listingId: 5, reason: '价格与描述不符', status: 'pending' }
];

export const mockMyPosts = [
  { id: 3, status: 'selling' },
  { id: 4, status: 'reviewing' },
  { id: 5, status: 'off' }
];

export let mockFavorites = [1, 2];

export const mockIntentions = [
  { id: 1, userId: 101, type: '汽车吊', brand: '徐工', tonnage: '25', emission: '国六', locations: [{ province: '河北省', city: '不限' }]},
  { id: 2, userId: 102, type: '高空车', brand: '不限', tonnage: '20', emission: '不限', locations: [{ province: '山东省', city: '济南市' }, { province: '江苏省', city: '苏州市' }] },
  { id: 3, userId: 101, type: '履带吊', brand: '三一', tonnage: '100', emission: '不限', locations: [{ province: '广东省', city: '不限' }]}
];

// 中国地区数据
export const chinaLocations = {
  "北京市": ["北京市"], 
  "天津市": ["天津市"], 
  "上海市": ["上海市"], 
  "重庆市": ["重庆市"],
  "河北省": ["石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市"], 
  "山西省": ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"], 
  "辽宁省": ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"], 
  "吉林省": ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州"], 
  "黑龙江省": ["哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区"], 
  "江苏省": ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"], 
  "浙江省": ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市"], 
  "安徽省": ["合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "六安市", "亳州市", "池州市", "宣城市"],
  "福建省": ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市"], 
  "江西省": ["南昌市", "景德镇市", "萍乡市", "九江市", "新余市", "鹰潭市", "赣州市", "吉安市", "宜春市", "抚州市", "上饶市"], 
  "山东省": ["济南市", "青岛市", "淄博市", "枣庄市", "东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "临沂市", "德州市", "聊城市", "滨州市", "菏泽市"], 
  "河南省": ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市", "驻马店市"], 
  "湖北省": ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "恩施土家族苗族自治州"], 
  "湖南省": ["长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市", "娄底市", "湘西土家族苗族自治州"], 
  "广东省": ["广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市"], 
  "海南省": ["海口市", "三亚市", "三沙市", "儋州市"], 
  "四川省": ["成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"], 
  "贵州省": ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节市", "铜仁市", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"], 
  "云南省": ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"], 
  "陕西省": ["西安市", "铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"], 
  "甘肃省": ["兰州市", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市", "庆阳市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州"], 
  "青海省": ["西宁市", "海东市", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"], 
  "台湾省": ["台北市", "新北市", "桃园市", "台中市", "台南市", "高雄市", "基隆市", "新竹市", "嘉义市"], 
  "内蒙古自治区": ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟"], 
  "广西壮族自治区": ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"], 
  "西藏自治区": ["拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲市", "阿里地区"], 
  "宁夏回族自治区": ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"], 
  "新疆维吾尔自治区": ["乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密市", "昌吉回族自治州", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州", "塔城地区", "阿勒泰地区"], 
  "香港特别行政区": ["香港岛", "九龙", "新界"], 
  "澳门特别行政区": ["澳门半岛", "氹仔", "路环"]
};

// 设备数据
export const equipmentData = {
  '汽车吊': { brands: ['徐工', '三一', '中联重科', '利勃海尔', '多田野'], unit: '吨' },
  '履带吊': { brands: ['徐工', '三一', '抚挖', '日立住友', '德马格'], unit: '吨' },
  '塔吊': { brands: ['中联重科', '永茂', '马尼托瓦克', '波坦', '科曼萨'], unit: '型号' },
  '高空车': { brands: ['徐工', '吉尼', '星邦', 'JLG', '欧历胜'], unit: '米' },
  '随车吊': { brands: ['石煤', '徐工', '古河', '帕尔菲格', '希尔博'], unit: '吨' }
};

export const emissionOptions = ["不限", "国三", "国四", "国五", "国六"];

// API 函数
export const getListings = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockListings.filter(item => item.status === 'selling');
      
      // 应用筛选条件
      if (filters.province && filters.province !== '不限') {
        const cleanProvince = filters.province.replace(/[省市]$|自治区$|特别行政区$/, '');
        filtered = filtered.filter(item => item.location.startsWith(cleanProvince));
        
        if (filters.city && filters.city !== '不限') {
          const cleanCity = filters.city.replace(/市$/, '');
          filtered = filtered.filter(item => item.location === `${cleanProvince} ${cleanCity}`);
        }
      }
      
      if (filters.type && filters.type !== '不限') {
        filtered = filtered.filter(item => item.type === filters.type);
      }
      
      if (filters.brand && filters.brand !== '不限') {
        filtered = filtered.filter(item => item.brand === filters.brand);
      }
      
      if (filters.source && filters.source !== '不限') {
        filtered = filtered.filter(item => item.tags[0] === filters.source);
      }
      
      if (filters.tonnage) {
        filtered = filtered.filter(item => item.tonnage == filters.tonnage);
      }
      
      if (filters.emission && filters.emission !== '不限') {
        filtered = filtered.filter(item => item.tags.includes(filters.emission));
      }
      
      resolve(filtered);
    }, 300);
  });
};

export const getListingById = (id) => {
  return mockListings.find(item => item.id === id);
};

export const addToFavorites = (id) => {
  if (!mockFavorites.includes(id)) {
    mockFavorites.push(id);
  }
};

export const removeFromFavorites = (id) => {
  const index = mockFavorites.indexOf(id);
  if (index > -1) {
    mockFavorites.splice(index, 1);
  }
};

export const getFavorites = () => {
  return mockListings.filter(item => mockFavorites.includes(item.id));
};

export const getUserPosts = () => {
  return mockListings.filter(listing => mockMyPosts.some(p => p.id === listing.id));
}; 