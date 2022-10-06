// index.js
import {get,post} from "../../request/index.js"
// 获取应用实例
const app = getApp()
Page({
  data: {
    swiperList:[],
    ListData:[],
    picroot:"http://localhost:3001/img/",
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动播放
    interval: 3000, //停留时间间隔
    duration: 1000, //播放时长
    previousMargin: '25rpx', //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    nextMargin: '25rpx', //后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    circular: true, //是否采用衔接滑动
    currentSwiperIndex: 0, //swiper当前索引
  },
  onLoad() {
    this.getSwiperList();
    this.getAllHouse()
  },

  getSwiperList() {
    let swiperList =
     ["http://localhost:3001/img/ad_house2.png","http://localhost:3001/img/ad_house4.png","http://localhost:3001/img/ad_house.png",]
    this.setData({
      swiperList
    })
  },
  getAllHouse() {
    get("/estate/search?searchV=江西").then(res=>{
      console.log(res);
      let ListData = res.data;
      this.setData({
        ListData,
      })
    })
  },
  // 跳转至
  handleShowList(e){
    console.log(e);
  },
  // 特效
  swiperBindchange(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },
})
