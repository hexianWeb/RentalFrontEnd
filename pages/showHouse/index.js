// pages/showHouse/index.js
import {get,post} from '../../request/index.js'
Page({

  data: {
    address:"",
    HouseList:[],
    show: false,
    showContent:"rent",
    rentValue:[800,4500],
    targetPrice:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      address:options.address
    })
    get(`/house/getAllInfoByEstate_id?estate_id=${options.id}`).then(res=>{
      console.log(res.data[0].house);
      this.setData({
        HouseList:res.data[0].house
      })
    })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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