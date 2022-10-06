// 全局数据代理
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {store} from "../../store/store"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad() {
    // 挂载Store
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['starHouse'],
      actions:['OpStarHouse','hasStarHouse']
    })
  },
})