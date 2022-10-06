// pages/register/index.js
import lottie from 'lottie-miniprogram'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    path:"http://localhost:3001/json/101191-submit-application-successfully.json",
    pathList:["http://localhost:3001/json/101191-submit-application-successfully.json",
    "http://localhost:3001/json/95247-email.json" ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onReady(){
  this.getPainc()
  },
//    clearCanvas()  
// {  
//   console.log("1");
//   wx.createSelectorQuery().select(`#canvas`).node(res => {
//     const canvas = res.node
//     const context = canvas.getContext('2d')
//     context.width =0
//     context.height = 0
//     lottie.setup(canvas)
//     lottie.loadAnimation({
//       path:,
//       loop: true,
//       autoplay: true, 
//       rendererSettings: {
//         context: context,
//         clearCanvas: true,
//        },
//     })
//   }).exec()
// }  ,
  getPainc() {
    // lottie图像渲染
    wx.createSelectorQuery().select(`#canvas`).node(res => {
      const canvas = res.node
      const context = canvas.getContext('2d')
      // console.log(context);
      canvas.width = 200
      canvas.height = 200
      lottie.setup(canvas)
      lottie.loadAnimation({
        // animationData: require('../../Lottie/11067-registration-animation.js'),
        path:this.data.path,
        loop: false,
        autoplay: true, 
        rendererSettings: {
          context: context,
          clearCanvas: true,
         },
      })
    }).exec()
  },
  OnChange() {
    let active = this.data.active;
   this.setData({
     active:++active,
     path:this.data.pathList[active]
   });
  //  this.clearCanvas()
   this.getPainc()
  }
})