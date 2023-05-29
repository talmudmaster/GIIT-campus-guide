// miniprogram/pages/root/music/csthis/csthis.js
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
                name: 'getsongname'
            })
            .then(res => {

                console.log('data', res)
                // var s = []
                // for (var i = 0; i < res.result.data.length; i++) {
                //   var songname = res.result.data[i].songname
                //   s.push(songname)
                // }
                this.setData({

                    list: res.result.data
                })
                // console.log("11", s)
            })
    },
    a(e) {
        wx.showModal({
            title: "是否确认删除",
            content: "你将从数据库删除一组推荐歌曲，确认是否删除！",
            success(res) {
                console.log(res)
                if (res.confirm == true) {
                    console.log('确认', e.currentTarget.dataset.id)
                    wx.cloud.callFunction({
                            name: 'deltuijian',
                            data: {
                                id: e.currentTarget.dataset.id
                            }
                        })
                        .then(res => {
                            wx.showToast({
                                title: '已删除成功',
                                duration: 900,
                            })
                            wx.navigateTo({
                                url: '../music',
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



})