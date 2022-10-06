const request = (url, options) => {
  let ajaxTime = 0;
  wx.showLoading({
    title: "正在加载哦",
    mask: true,
  });
  // 定义公共的url
  const baseUrl = "http://localhost:3001/api";
  return new Promise((resolve, reject) => {
    ajaxTime++,
      wx.request(
        {
          header: options.header,
          url:baseUrl + url,
          method: options.method,
          // data:
          //   options.method == "GET"
          //     ? options.data
          //     : JSON.stringify(options.data),
          data:options.data,
          success: (result) => {
            // console.log(result);
            resolve(result.data);
          },
          fail: (err) => {
            reject(err);
          },
          complete: () => {
            //    关闭图表
            ajaxTime--;
            if (ajaxTime === 0) {
              wx.hideLoading();
            }
          },
        },
      );
  });
};
module.exports = {
  // 封装get方法
  get(url, data) {
    return request(url, {
      header:{'content-type': 'application/json',
      'cookie': wx.getStorageSync("cookie") },
      method: "GET",
      data,
    });
  },
  // 分装post方法
  post(url, data) {
    return request(url, {
      method: "POST",
      header:{'content-type': 'application/x-www-form-urlencoded',
      'Cookie': wx.getStorageSync('cookie') },
      data,
    });
  },
};
