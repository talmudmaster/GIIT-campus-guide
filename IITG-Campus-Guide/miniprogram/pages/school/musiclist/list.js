// miniprogram/pages/school/musiclist/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lok: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
                name: 'mp3'
            })
            .then(res => {
                console.log('data', res)
                this.setData({
                    list: res.result.data,
                    number: res.result.data.length
                })
            })
    },

    look() {
        wx.navigateTo({
            url: '../musiclist/tuijian/tuijian',
        })
    },
    copy(e) {
        console.log(e.currentTarget.dataset)
        wx.showModal({
            title: '提示',
            content: '由于版本限制，请点击确认并复制网址到浏览器可下载！',
            success: (res => {
                var data = e.currentTarget.dataset.url
                if (res.confirm == true) {
                    console.log(data)
                    wx.setClipboardData({
                        data: data,
                    })
                }
            }),
            fail(res) {
                wx.setClipboardData({
                    data: null,
                })
            }
        })
    },
    play(e) {
        var id = e.currentTarget.dataset.id
        wx.cloud.callFunction({
                name: 'mp3'
            })
            .then(res => {
                let data = res.result.data
                console.log(data)
                var x = []
                for (var i = 0; i < data.length; i++) {
                    let number = data[i]._id;
                    if (number == id) {
                        x.push(data[i]);
                    }

                }
                var a = x[0].songname
                var b = x[0].url
                console.log("78888", b)
                const backgroundAudioManager = wx.getBackgroundAudioManager();
                backgroundAudioManager.title = a;
                backgroundAudioManager.src = b;
            })
    },
})