// pages/find/index.js
import {get,post} from '../../request/index.js'
import Notify from "@vant/weapp/notify/notify";
Page({

  data: {
    isShow:false,
    input: '',
    ListData:[],
  },
  
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    this.getAllHouse(this.data.input)
  },
  onCancel(){
    this.setData({
      value:""
    })
  },
  getAllHouse(value) {
    get(`/estate/search?searchV=${value}`).then(res=>{
     let ListData = res.data;
     if (ListData.length == 0) {
      Notify({ type: 'danger', message: '无匹配内容' });
       this.setData({
         ListData:[],
         isShow:false
       })
       return;
     } else {  
       this.setData({
         ListData,
         isShow:true
       })
     }
    })
  },
  onLoad(options) {

  },

 
})