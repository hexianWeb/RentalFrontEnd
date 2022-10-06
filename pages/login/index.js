// pages/login/index.js
// 引入lottie动画组件
import lottie from 'lottie-miniprogram'
// 自己封装的组件库
import {get,post} from "../../request/index.js"
// 用来提示请求错误
// index.js
import Notify from '@vant/weapp/notify/notify';
const app=getApp()
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    // 用户名 密码获取
    username:"",
    password:""
  },
  // 登录主要逻辑
  registerUser(){
    wx.navigateTo({
      url: '../register/index',
    })
  },
  // 登录主要逻辑
  submit() {
    // 是否需要登陆
    // 数据判断
    if (!this.data.username.trim()) {
      Notify({ type: 'danger', message: '账号不能为空' });
      return
    }
    const data = {
      user_name:this.data.username,
      user_password:this.data.password
    }
    // 请求数据
    wx.request({
      url: 'http://localhost:3001/api/user/login',
      header:{'content-type': 'application/x-www-form-urlencoded' },
      method:"POST",
      data:data,
      success:(result)=>{
        // console.log(result);
        wx.setStorageSync('cookie', result.header['Set-Cookie'])
        get("/user/getInfo").then(res=>{
         //  console.log(res);
           wx.setStorageSync('userInfo',res.data);
        })
      },
      fail:(err)=>{
        Notify({ type: 'danger', message: "出错了用户密码" })
        return;
      }
    },)
    //   // 跳转至主页并存储用户数据进
      wx.switchTab({
        url: '../index/index'
      })
  },
  // lottie渲染
  onReady() {
    if (wx.getStorageSync('cookie')) {
      wx.switchTab({
        url: '../index/index'
      })
    }
    // lottie图像渲染
    wx.createSelectorQuery().select('#canvas').node(res => {
      const canvas = res.node
      const context = canvas.getContext('2d')
      canvas.width = 800
      canvas.height = 800

      lottie.setup(canvas)
      lottie.loadAnimation({
        animationData: require('../../Lottie/89968-house'),
        loop: true,
        autoplay: true, 
        rendererSettings: {
          context: context,
          clearCanvas: true,
         },
      })
    }).exec()
  },

})