// miniprogram/pages/school/information/information.js
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

  },
  copy(e){
    wx.showModal({
      title: '提示',
      content: '由于版本限制，请点击确认并复制网址到浏览器浏览！',
      success: (res => {
        var data= e.currentTarget.dataset.connet
        if(res.confirm==true){
          console.log(data)
          wx.setClipboardData({
            data: data,
            // success (res) {
            //   wx.getClipboardData({
            //     success (res) {
            //       console.log(res.data) 
            //     }
            //   })
            // }
          })
        }
      
      }),
      fail(res) {
        wx.setClipboardData({
          data: null,
          // success (res) {
          //   wx.getClipboardData({
          //     success (res) {
          //       console.log(res.data) 
          //     }
          //   })
          // }
        })
      }
    })
  },
  a(e) {
  this.copy(e)
  },
  b(e) {
    this.copy(e)
  },
  c(e) {
    this.copy(e)
  },
  d(e) {
    this.copy(e)
  },
  aa(e) {
    this.copy(e)
  },
  bb(e) {
    this.copy(e)
  },
  cc(e) {
    this.copy(e)
  },
  dd(e) {
    this.copy(e)
  },
})