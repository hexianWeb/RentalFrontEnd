// pages/chat/index.js
const socket = require("../../utils/socket.js")
// 时间
import moment from 'moment';
// 全局数据代理
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {store} from "../../store/store"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useMsg:"",
    userInfo:wx.getStorageSync('userInfo'),
    MsgList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['chatMessageList'],
      actions:['updateMessage']
    })
    socket.connect((status,ws)=>{
      if (status) {
        ws.on("updateMessage",(data)=>{
         const res= this.updateMessage(data);
          this.setData({
            MsgList:res
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  sendMsg() {
    let data ={
      type:"my",
      sender:this.data.userInfo.user_name,
      senderImg:this.data.userInfo.avatar,
      receiver:'admin2',
      msg:this.data.useMsg,
      time:moment().format('MMMM Do YYYY, h:mm:ss a'),
    }
    // socket.emit("privateChat",data);
    socket.connect((status,ws)=>{
      if (status) {
        ws.emit("privateChat",data)
        const res =this.updateMessage(data);
        this.setData({
          MsgList:res
        })
      }
    });
    this.setData({
      useMsg:""
    })
  },
  onUnload() {
    console.log("wechat已经卸载");
  },

})