// miniprogram/pages/root/newsroot/newsroot-1/newsroot-1.js
var id = ""
var title = ''
var jpg = ''
var news = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    onLoad(options) {
        console.log("值", options)
        id = options.id
        this.getshuju()
    },
    getshuju() {
        wx.cloud.database().collection("news")
            .doc(id)
            .get()
            .then(res => {
                console.log("res", res)
                this.setData({
                    number: res.data.munber,
                    title: res.data.title,
                    jpg: res.data.jpg,
                    time: res.data.time,
                    news: res.data.news
                })
                title = res.data.title,
                    jpg = res.data.jpg,
                    news = res.data.news
            })
    },
    gettitle(e) {

        title = e.detail.value
    },
    getjpg(e) {

        jpg = e.detail.value
    },
    getnew(e) {

        news = e.detail.value
    },
    title(e) {

        this.setData({
            title: ''
        })
    },
    jpg(e) {

        this.setData({
            jpg: ''
        })
    },
    new(e) {

        this.setData({
            news: ''
        })
    },
    onUpdate() {
        //获取当前时间戳  
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        var number = timestamp
        //获取当前时间  
        var n = timestamp * 1000;
        var date = new Date(n);
        //年  
        var Y = date.getFullYear();
        //月  
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //日  
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        //时  
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        //分  
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        //秒  
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        var time = +Y + "年" + M + "月" + D + "日" + "" + h + ":" + m + ":" + s
        console.log(time);
        if (title == '' || jpg == '' || news == '') {
            wx.showToast({
                icon: 'none',
                title: '请填写数据'
            })
        } else {
            wx.cloud.callFunction({
                    name: 'upnew',
                    data: {
                        id: id,
                        title: title,
                        jpg: jpg,
                        number: parseInt(number),
                        time: time,
                        news: news
                    }
                })
                .then(res => {
                    console.log('成功', res)
                    this.getshuju()
                    wx.showToast({
                        title: '更新成功'
                    })

                })
                .catch(res => {
                    console.log('失败', res)
                })
        }
    },

    onDel() {
        wx.showModal({
            title: "是否确认删除",
            content: "你将从数据库删除一条新闻，确认是否删除！",
            success(res) {
                console.log(res)
                if (res.confirm == true) {
                    console.log('确认', id)
                    wx.cloud.callFunction({
                            name: 'delnew',
                            data: {
                                id: id
                            }
                        })
                        .then(res => {
                            wx.showToast({
                                title: '已删除成功',
                                duration: 900,
                                success: function () {
                                    setTimeout(function () {
                                        wx.navigateBack({
                                            url: '../newsroot',
                                        })
                                    }, 900)
                                }
                            })
                        })
                        .catch(res => {
                            console.log('删除失败', res)
                        })
                } else if (res.cancel == true) {
                    console.log('取消')
                }
            }
        })
    },
    copy(e) {
        console.log("复制成功", e.currentTarget.dataset.connet)
        wx.setClipboardData({
            data: e.currentTarget.dataset.connet,
            success(res) {
                wx.getClipboardData({
                    success(res) {}
                })
            }
        })
    }
})