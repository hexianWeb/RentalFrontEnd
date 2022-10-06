// my-behavior.js

module.exports = Behavior({
  behaviors: [],
  properties: {
    // 外部传入的属性
    // myBehaviorProperty: {
    //   type: String
    // }
  },
  data: {
    // 定义需要存储的属性
    userInfo:"",
  },
  created: function () {
    console.log('[my-behavior] created')
  },
  attached: function () {
    console.log('[my-behavior] attached')
  },
  ready: function () {
    console.log('[my-behavior] ready')
  },

  methods: {
    myBehaviorMethod: function () {
      console.log('[my-behavior] log by myBehaviorMehtod')
    },
  }
})