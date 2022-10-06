// pages/showSpect/index.js
import {get,post} from "../../request/index.js"
import Notify from '@vant/weapp/notify/notify';
const app =getApp();
// import {socket} from "../../utils/socket.js"
const socket = require("../../utils/socket.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HouseData:"",
    house_id:"",
    date:"",
    showID:false,
    address:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      house_id:options.id,
      date:options.date,
      address:options.address,
      UserInfo:wx.getStorageSync('userInfo')
    })
  },
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
  // 提交订单
  handleSpect() {
    let data={
      user_id:this.data.UserInfo.user_id,
      house_id:this.data.house_id,
      seeTime:this.data.date,
      address:this.data.address,
      estate_id:wx.getStorageSync('estate_id')
    }
    // 提示服务端 有信息
    socket.connect((status,ws)=>{
      if (status) {
        ws.emit('addSpect',{mes:"发送订单"});
      }
    })
    post ("/spect/add",data).then(res=>{
        wx.switchTab({
          url: `../my/index?status=${res.status}`,
        })
    })
  }
})