const app = getApp()

Page({

    data: {
        fileID: '',
        cloudPath: '',
        imagePath: '',
    },

    onLoad: function (options) {
        const {
            fileID,
            cloudPath,
            imagePath,
        } = app.globalData

        this.setData({
            fileID,
            cloudPath,
            imagePath,
        })


    },
    coppyText: function (e) {

        console.log("复制成功", e.currentTarget.dataset.connet)
        wx.setClipboardData({
            data: e.currentTarget.dataset.connet,
            success(res) {
                // wx.getClipboardData({
                //   success (res) {
                //   }
                // })
            }
        })
    }
})