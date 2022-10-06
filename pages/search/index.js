// pages/search/index.js
import { areaList } from '@vant/area-data';
import {get,post} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    showContent:"area",
    areaList,
    rentValue:[800,4500],
    targetArea:"",
    targetPrice:"",
    ListData:[],
    picroot:"http://localhost:3001/img/",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

onChange(event){
  this.setData({
    show:true
  })
  this.showPopup(event.detail.name)
},
onShowPop(e){
  this.setData({
    show:true
  })
  this.showPopup(this.data.showContent)
},
// 控制弹窗组件
  showPopup(e){
    if (e=='area') {
      this.setData({
        showContent:"area"
      })
    }
    else if (e=='rent') {
      this.setData({
        showContent:"rent"
      })
    }
    else {
      this.setData({
        showContent:"more"
      })
    }
  },
  onClose() {
    this.setData({show:false})
  },
  handleArea(e){
    let arr =[];
    e.detail.values.forEach(e => {
      if (e.name!== undefined &&e.name!=="") {
        arr.push(e.name);
      }
    });
    let target = arr.pop()
    get(`/estate/search?searchV=${target}`).then(res=>{
      console.log(res);
      let ListData = res.data;
      this.setData({
        ListData,
      })
    })
    this.setData({
      targetArea:target
    })
    this.onClose()
  },
  onReset() {
    this.setData({
      rentValue:[800,4500],
      targetPrice:""
    })
    this.onClose()
  },
  handleRent(){
    let targetPrice = (this.data.rentValue[0]+this.data.rentValue[1])/2
    this.setData({
      targetPrice,
    })
    this.onClose()
  },
  onSliderChange(event) {
    this.setData({
      rentValue:event.detail
    })
  },
})