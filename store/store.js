// 在这个JS文件中 专门创建store的实例对象
import {observable,action} from 'mobx-miniprogram'

export const store = observable({
  // 挂载需要共享的数据
  // 收藏的房源信息
  starHouse:[],
  // 聊天记录
  chatMessageList:[],
  // 更新聊天记录
  updateMessage:action(function (data) {
    console.log(data);
    this.chatMessageList.push(data)
    return this.chatMessageList;
  }),
  // 方法收藏房屋
  OpStarHouse:action(function (id,address,HouseData) {
    let data={
      id,
      address,
      HouseData
    }
    let index = this.starHouse.findIndex(v=>v.id === id)
    if (index === -1) {
      this.starHouse.push(data)
      console.log("收藏")
    }else {
      this.starHouse.splice(index,1)
      console.log("取消收藏");
    }
    return index;
  }),
  hasStarHouse:action(function (id) {
    let index = this.starHouse.findIndex(v=>v.id===id)
    if (index === -1) {
      return false;
    }else {
      return true
    }
  }),
  // 计算属性
  // get sum() {
  //   return this.numA + this.numB
  // },
  // updateNum1:action(function (step) {
  //   this.numA +=step
  // }),
  // updateNum2:action(function (step) {
  //   this.numB +=step
  // })
})