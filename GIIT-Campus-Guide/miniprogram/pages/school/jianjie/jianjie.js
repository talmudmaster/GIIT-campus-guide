// miniprogram/pages/school/jianjie/jianjie.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'https://cdnjson.com/images/2023/04/07/scenery_1.jpg',
            'https://cdnjson.com/images/2023/04/07/scenery_2.jpg',
            'https://cdnjson.com/images/2023/04/07/scenery_3.jpg',
            'https://cdnjson.com/images/2023/04/07/scenery_4.jpg'
        ],
        indicatorDots: true,
        indicatorColor: "white", //指示点颜色
        activeColor: "#2adce2", //当前选中的指示点颜色
        vertical: false,
        autoplay: true,
        circular: true,
        interval: 4000,
        duration: 500,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //用户点击右上角分享
    onShareAppMessage() {},
    // 用户点击右上角分享到朋友圈
    onShareTimeline: function (res) {},
    //图片比例
    imgHeight: function (e) {
        var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
        var imgh = e.detail.height; //图片高度
        var imgw = e.detail.width; //图片宽度
        var swiperH = winWid * imgh / imgw + "px" //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
        this.setData({
            Height: swiperH //设置高度
        })
    },
})