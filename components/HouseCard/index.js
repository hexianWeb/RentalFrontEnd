Component({
  behaviors: [],

  properties: {
    HouseData: Object, //渲染目标
    address:String,
  },

  data: {
    picRoot: "http://localhost:3001/img/",
  }, // 私有数据，可用于模板渲染

  methods: {
    onLoad: function () {

    },
    handleHouseDetail(){
      let house_id = this.data.HouseData.house_id 
      console.log(this.data.address);
      wx.navigateTo({
        url: `../showDetail/index?id=${house_id}&address=${this.data.address}`,
      })
    },

    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      });
    },
  },
});
