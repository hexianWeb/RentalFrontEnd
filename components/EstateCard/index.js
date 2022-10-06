Component({
  behaviors: [],

  properties: {
    EstateData: Object, //渲染目标
  },

  data: {
    picRoot: "http://localhost:3001/img/",
  }, // 私有数据，可用于模板渲染

  methods: {
    onLoad: function () {},
    // 跳转至该地区房屋列表展示页面
    // 
    HandleShowList() {
      // console.log(this.data.EstateData.estate_id);
      let estate_id=this.data.EstateData.estate_id;
      wx.setStorageSync('estate_id', estate_id)
      let address= this.data.EstateData.address;
      let location = {
        latitude:this.data.EstateData.map_lat,
        longitude:this.data.EstateData.map_lng,
      }
      wx.setStorageSync('location', location)
      wx.navigateTo({
        url: `../showHouse/index?id=${estate_id}&address=${address}`,
      })
    }
  },
});
