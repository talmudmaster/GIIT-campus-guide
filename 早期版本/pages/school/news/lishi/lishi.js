// miniprogram/pages/school/news/lishi/lishi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getnews'
    })

    .then(res => {
      console.log("ok!", res)
      this.setData({
        list: res.result.data,

      })
    })
    .catch(res => {
      console.log("no", res)
    })
  },
  news(e){
    console.log("ok", e)
    wx.navigateTo({
      url: '../news?id=' + e.currentTarget.dataset.id
    })
  },
  
})