
  var QQMapWX = require("../../utils/qqmap/qqmap-wx-jssdk.js")
  var qqmapsdk = new QQMapWX({
    key:'MO5BZ-ER464-2OQUE-DHT6M-KP6YJ-FZBKF'
  });
Component({
  behaviors: [],

  properties: {
   
  },

  data: {
    _mode:"",
    _location:wx.getStorageSync('location'),
    _markers:""
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () {
      this. _nearbySearch("公交,地铁")
     },
    moved: function () { },
    detached: function () { },
  },
  methods: {
    onLoad: function () {
      //包含事件处理函数 自定义方法
      // _ 自定义方法 

    },
    // 内部函数
    _onChangeKeyWord:function (event) {
      // 转变keyword
      this.setData({
        _mode:event.detail.title
      })
      let keyword ="";
      switch (event.detail.title) {
        case "交通":
          keyword="公交,地铁"
          break;
          case "商超":
          keyword="商超"
            break;
          case "教育":
          keyword="教育"
            break;
          case "餐饮":
          keyword="餐饮"
            break;
          case "医疗":
          keyword="医院"
             break;
        default:
          break;
      }
      this._nearbySearch(keyword)
    },
    _nearbySearch:function (keyword) {
      var _this=this;
      var location = this.data._location;
      var iconPath=""
      //#region 图标转换
      switch (keyword) {
        case "公交,地铁":
          iconPath="../../icon/map/交通出行.png"
          break;
          case "商超":
            iconPath="../../icon/map/商超.png"
            break;
          case "教育":
            iconPath="../../icon/map/教育.png"
            break;
          case "餐饮":
            iconPath="../../icon/map/餐饮.png"
            break;
          case "医院":
            iconPath="../../icon/map/医疗.png"
             break;
        default:
          break;
      }
      // //#endregion
      qqmapsdk.search({
        keyword:keyword,
        location:location,
        success:function (res) {
          // console.log(res);
          var mks=[];
          for (var i = 0; i < res.data.length; i++) {
            mks.push({
              title:res.data[i].title,
              id:res.data[i].id,
              latitude:res.data[i].location.lat,
              longitude:res.data[i].location.lng,
              iconPath:iconPath,
              distance:res.data[i]._distance,
              width:27,
              height:27
            })
          }
          // 放入房屋坐标
          // //#region 
          mks.push({
              id:1,
              latitude:location.latitude,
              longitude:location.longitude,
              iconPath:"../../icon/map/-s-房屋.png",
              width:30,
              height:30
          })
          //#endregion
          _this.setData({
            _markers:mks
          })
        }
      })
    }
  },
});
