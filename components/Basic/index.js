Component({
  behaviors: [],

  properties: {
    HouseType: {
      //渲染目标
      type: Object,
      value: {},
      observer: function (newVal) {
        // 这里可以发现 第一次值是空 第二次才有值。说明进行了值变化的操作。验证了刚才的场景说法。
        // 在这里进行对值的处理，直接渲染在页面上
        if (!newVal) { //跳过第一次
          return
        }
        var contList = this.data._contentList;

      function compare() {
          return contList.filter((v) => {
            // console.log(v.value);
            return newVal.indexOf(v.value) !== -1;
          });
        }
        const haveList = compare()
        // console.log(haveList);
        this.setData({
          haveList
        });
      },
    },
  },

  data: {
    haveList:[],
    _iconList: [],
    _contentList:[
      {
      value:"电视",
      ImgUrl:"../../icon/fundal/电视机.png"
      ,
      check_ImgUrl:"../../icon/fundal/01电视机.png"
    },
    {
      value:"宽带",
      ImgUrl:"../../icon/fundal/宽带.png"
      ,
      check_ImgUrl:"../../icon/fundal/02宽带.png"
    },
    {
      value:"床铺",
      ImgUrl:"../../icon/fundal/床.png"
      ,
      check_ImgUrl:"../../icon/fundal/03床.png"
    },
    {
      value:"冰箱",
      ImgUrl:"../../icon/fundal/冰箱.png"
      ,
      check_ImgUrl:"../../icon/fundal/04冰箱.png"
    },
    {
      value:"独立卫生间",
      ImgUrl:"../../icon/fundal/独立卫生间.png"
      ,
      check_ImgUrl:"../../icon/fundal/05独立卫生间.png"
    },
    {
      value:"空调",
      ImgUrl:"../../icon/fundal/空调.png"
      ,
      check_ImgUrl:"../../icon/fundal/06空调.png"
    },
    {
      value:"洗衣机",
      ImgUrl:"../../icon/fundal/洗衣机.png"

      ,
      check_ImgUrl:"../../icon/fundal/07洗衣机.png"
    },
    {
      value:"油烟机",
      ImgUrl:"../../icon/fundal/油烟机.png"
      ,
      check_ImgUrl:"../../icon/fundal/08油烟机.png"
    },
    {
      value:"衣柜",
      ImgUrl:"../../icon/fundal/衣柜.png"
      ,
      check_ImgUrl:"../../icon/fundal/09衣柜.png"
    },
    {
      value:"阳台",
      ImgUrl:"../../icon/fundal/阳台-1.png"
      ,
      check_ImgUrl:"../../icon/fundal/10阳台-1.png"
    },
    {
      value:"沙发",
      ImgUrl:"../../icon/fundal/沙发.png"
      ,
      check_ImgUrl:"../../icon/fundal/11沙发.png"
    },{
      value:"智能门锁",
      ImgUrl:"../../icon/fundal/锁.png"
      ,
      check_ImgUrl:"../../icon/fundal/12锁.png"
    }
  ],
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    attached:function () {
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  methods: {
    onLoad: function () {
      console.log(this.data._houseType);
    },
  },
});
