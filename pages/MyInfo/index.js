// pages/MyInfo/index.js
import {get,post} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    picRoot:"http://localhost:3001/img/",
    show:false,
    fileList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo:wx.getStorageSync('userInfo')
    })
  },
  uploadImg(){
    this.setData({
      show:true
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    const _that = this;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: `http://localhost:3001/api/user/upload/avatar/${this.data.userInfo.user_id}`, // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      header:{
        "content-type":"multipart/form-data"
      },
      success(res) {
        // 上传完成需要更新 fileList
        let ImgUrl = JSON.parse(res.data).img_path
       let fileList = [];
       fileList.push({
           name:"头像",
           thumb:_that.data.picRoot+ImgUrl,
           type:"image",
           isImage:true
          });
        _that.setData({ fileList });

      },
    });
    get("/user/getInfo").then(res=>{
      //  console.log(res);
        wx.setStorageSync('userInfo',res.data);
     })
  },
  onClose() {
    this.setData({
      show:false
    })
  }
})