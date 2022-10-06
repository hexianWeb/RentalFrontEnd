// pages/showDetail/index.js
import {get,post} from "../../request/index.js"
import Notify from "@vant/weapp/notify/notify";
// 全局数据代理
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {store} from "../../store/store"
const socket = require("../../utils/socket.js")
Page({
  data: {
    house_id:"",
    HouseDetail:"",
    HouseType:"",
    address:"",
    picRoot:"http://localhost:3001/img/",
    isStar:false,
  },
  onLoad(options) {
    // 挂载Store
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['starHouse'],
      actions:['OpStarHouse','hasStarHouse']
    })
    this.setData({
      address:options.address,
      house_id:options.id,
    })
    this.getHouseDetail()
    this.hasStar()
  },

  // 收藏房屋并给store托管数据
  handleStarHouse(){
   let index =  this.OpStarHouse(this.data.house_id,this.data.address,this.data.HouseDetail)
   if (index ===-1) {
    this.setData({
      isStar:true
    })
    Notify({ type: 'danger', message: '成功收藏！' });
  }else {
    this.setData({
      isStar:false
    })
    Notify({ type: 'primary', message: '成功取消收藏！' });
  }
  },
  // 获取房屋的详细信息
  getHouseDetail() {
    get(`/house/getInfoByHouse_id?house_id=${this.data.house_id}`).then(res=>{
      this.setData({
        HouseDetail:res.data[0],
        HouseType:res.data[0].housetype
      })
    })
  },
  // 收藏
  hasStar() {
   let flag = this.hasStarHouse(this.data.house_id)
    if (flag) {
      this.setData({
        isStar:true
      })
    }
  },
  // 发送客户信息
  emitUserInfo() {
    let userInfo = wx.getStorageSync("userInfo");
    let data= {
      id:userInfo._id,
      name:userInfo.user_name,
      img:userInfo.avatar
    };
    socket.connect((status,ws)=>{
      if (status) {
        ws.emit("addUser",data);
        wx.switchTab({
          url: '../chat/index',
        })
      }
    })
  },
  // 生成订单
  getSpect(){
   wx.navigateTo({
     url: `../spect/index?id=${this.data.house_id}&address=${this.data.address}`,
   })
  }
})