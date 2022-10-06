import Notify from '@vant/weapp/notify/notify';
import {get,post} from "../../request/index.js"
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    active:"",
    SpectList:"",
    steps: [
      {
        text: '订单生成',
        desc: '等待管理人员受理',
        inactiveIcon: 'location-o',
        activeIcon: 'success',
      },
      {
        text: '已经受理',
        desc: '请前往看房',
        inactiveIcon: 'like-o',
        activeIcon: 'plus',
      },
      {
        text: '完成看房',
        desc: '已经完成看房',
        inactiveIcon: 'star-o',
        activeIcon: 'cross',
      },
    ],
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    get("/spect/searchSpect").then(res=>{
      console.log(res);
      this.setData({
        SpectList:res.data.Data
      })
    })
  },
  
  
  onReady() {
    
  },
  
  onyuekan(e) {
    console.log(e);
    let flag = e.currentTarget.dataset.status;
    if (flag == 0) {
      Notify({ type: 'danger', message: '还没有被受理哦' });
    }
    else {

      let plugin = requirePlugin('routePlan');
      let key = 'ES6BZ-WRC6W-SKSRV-R6TE6-EKPKE-ZIFDN';  //使用在腾讯位置服务申请的key
      let referer = 'getmap_lng';   //调用插件的app的名称
      console.log(e.currentTarget.dataset);
      let endPoint = JSON.stringify({  //终点
        'name': e.currentTarget.dataset.address.address,
        'latitude': e.currentTarget.dataset.address.map_lat,
        'longitude':  e.currentTarget.dataset.address.map_lng,
      });
      wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
      })
    }
  }

})