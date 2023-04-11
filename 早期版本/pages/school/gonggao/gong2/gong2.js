// miniprogram/pages/school/gonggao/gong2/gong2.js
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
  lookPhoto(e) {
    wx.previewImage({
      current: '"cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/photos/食堂.jpg"', // 当前显示图片的http链接
      urls: ["cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/photos/食堂.jpg"] // 需要预览的图片http链接列表
    })

  },
  lookPhoto1(e) {
    wx.previewImage({
      current: '"cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/photos/准备.jpg"', // 当前显示图片的http链接
      urls: ["cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/photos/准备.jpg"] // 需要预览的图片http链接列表
    })

  },
  lookPhoto2(e) {
     wx.previewImage({
      current: 'cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/photos/宿舍.jpg', // 当前显示图片的http链接
      urls: ['cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/photos/宿舍.jpg'] // 需要预览的图片http链接列表
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})