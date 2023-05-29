// miniprogram/pages/school/news/news.js
var id = ""
var number = ''
var title = ''
var jpg = ''
var news = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log("值", options)
        id = options.id
        this.getdata()
    },
    getdata() {
        wx.cloud.database().collection("news")
            .doc(id)
            .get()
            .then(res => {
                console.log("xinwne", res)
                this.setData({
                    title: res.data.title,
                    time: res.data.time,
                    jpg: res.data.jpg,
                    news: res.data.news
                })
            })
            .catch(res => {
                wx.showToast({
                    icon: 'none',
                    title: '数据已被删除'
                })
            })
    }

})