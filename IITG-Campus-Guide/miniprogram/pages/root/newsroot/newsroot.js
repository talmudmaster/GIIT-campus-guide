// miniprogram/pages/root/newsroot/newsroot.js
const app = getApp()
var id = ""
var number = ''
var title = ''
var jpg = ''
var news = ''
Page({
    data: {

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
    onAdddate() {
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
        if (title == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入标题'
            })
        } else if (jpg == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入图片地址'
            })
        } else if (news == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入正文'
            })
        } else {
            wx.cloud.database().collection("news")
                .add({
                    data: {
                        title: title,
                        jpg: jpg,
                        number: parseInt(number),
                        time: time,
                        news: news
                    }

                })
                .then(res => {
                    console.log('ok', res)

                    wx.showToast({
                        title: '录入成功'
                    })
                    this.setData({
                        title: "",
                        jpg: "",
                        news: "",

                    })
                })
                .catch(res => {
                    console.log('fail', res)
                })
        }
    },
    getnews() {
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
    //跳转
    goBack(e) {
        console.log("ok", e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '../newsroot/newsroot-1/newsroot-1?id=' + e.currentTarget.dataset.id
        })
    },
    // 上传图片
    doUpload: function () {
        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                const filePath = res.tempFilePaths[0]

                // 上传图片
                const cloudPath = "newphotos/" + new Date().getTime() + `${filePath.match(/\.[^.]+?$/)[0]}`
                wx.cloud.uploadFile({
                    cloudPath,
                    filePath,
                    success: res => {
                        console.log('[上传文件] 成功：', res)

                        app.globalData.fileID = res.fileID
                        app.globalData.cloudPath = cloudPath
                        app.globalData.imagePath = filePath

                        wx.navigateTo({
                            url: '../look/look'
                        })
                    }
                })
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