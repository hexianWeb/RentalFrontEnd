// pages/spect/index.js
import {get,post} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HouseData:"",
    house_id:"",
    address:"",
    show:false,
    date:"",
    UserInfo:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      house_id:options.id,
      address:options.address,
      UserInfo:wx.getStorageSync('userInfo')
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getHouseInfo()
  },

  getHouseInfo() {
    get(`/house/getInfoByHouse_id?house_id=${this.data.house_id}`).then(res=>{
      this.setData({
        HouseData:res.data[0],
      })
    })
  },
  // 选择看房日期
  chooseDate() {
    console.log("11");
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  // 选择日期
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
  // 跳转路由
  handleSpect(){
    wx.navigateTo({
      url: `../showSpect/index?id=${this.data.house_id}&date=${this.data.date}&address=${this.data.address}`,
    })
  }
})