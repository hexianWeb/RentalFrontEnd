const io = require('./lib/weapp.socket.io.js')

const App = getApp();

let wsStatus = false;
let onSocket = null;
onSocket = io("http://localhost:8082", { transports: ['websocket'] })// 连接 socket

export const connect = function (callback) { 
  if (!onSocket) {
    onSocket.on('connect', function (res) { // 监听socket 是否连接成功
      callback(true, onSocket)
      wsStatus = true
    })
  
    setTimeout(function () { // 超时10秒，返回false
      if (!wsStatus) {
        callback(false, onSocket)
      }
    }, 10000)
    
  } else {
    callback(true, onSocket)
  }
}
