import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {store} from "../../store/store"
Page({
  data: {

  },
  onLoad() {
    // this 
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['numA','numB','sum'],
      actions:['updateNum1']
    })
  },
  btnHandler1(e) {
    console.log(e);
    this.updateNum1(e.currentTarget.dataset.step)
  },
onUnload:function () {
  // 销毁Store实例
  this.storeBindings.destroyStoreBindings()
}
})