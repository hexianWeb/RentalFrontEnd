// index.js
import Notify from "@vant/weapp/notify/notify";
// 获取应用实例
const app = getApp();

Page({
  data: {
    user_name:"",
    avatar:"",
    activeNames:['1'],
    fileList:"",
    show:false,
  },
  onReady() {

  },
  onLoad(options) {
    if (options.status==1) {
      Notify({ type: 'success', message: '订单创建成功，点击约看前往吧' });
    }
    let userInfo = wx.getStorageSync('userInfo')
    let user_name = userInfo.user_name;
    let avatar = encodeURI(`http://localhost:3001/img/${userInfo.avatar}`);
    this.setData({
      user_name,
      avatar
    })
  },
  // 收藏展示
  showHouseStar(){
    wx.navigateTo({
      url: '../star/index',
    })
  },
  // 
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onClose(){
  this.setData({
    show:false
  })
  },
  // 展示用户信息
  onShowMyInfo(){
    wx.navigateTo({
      url: '../MyInfo/index',
    })
  },
// 注销登录
signOut() {
  // 清除所有
  wx.clearStorageSync()
  wx.navigateTo({
    url: '../login/index',
  })
},
  // 订单详情
  showSpect() {
    wx.navigateTo({
      url: '../SpectList/index',
    })
  }
});

