// miniprogram/pages/root/root.js
// const db=wx.cloud.database().collection("makers")
const app = getApp()
let id = ''
let latitude = ''
let longitude = ''
let address = ''
let mptype = ''
let images = ''
let Photos = ''
let Text = ''
Page({
    data: {
        getmptype: ['校门', '教学楼', '行政楼', '食堂', '奶茶小吃', '学生公寓', '生活服务', '小景点', '运动场所', '其他'],
        casIndex: 0,
        cqh: ""
    },

    onLoad: function () {

    },

    onData() {
        wx.cloud.callFunction({
                name: 'getData'
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
            url: '../../pages/root/root-1/root-1?id=' + e.currentTarget.dataset.id
        })
    },
    doType: function (e) {
        console.log('picker发送选择改变，携带值为', e)


        this.setData({
            casIndex: e.detail.value,

        })
        this.setData({

            mptype: this.data.getmptype[this.data.casIndex]
        })
        console.log(this.data.mptype)

        mptype = this.data.mptype

    },

    getId(e) {
        id = e.detail.value
        // console.log(id)
    },
    getLatitude(e) {
        latitude = e.detail.value
        // console.log(latitude)
    },
    getLongitude(e) {
        longitude = e.detail.value
        // console.log(longitude)
    },
    getAddress(e) {
        address = e.detail.value
        console.log(address)
    },

    getImages(e) {
        images = e.detail.value
    },
    getPhotos(e) {
        Photos = e.detail.value
    },
    getText(e) {
        Text = e.detail.value
    },
    onAdddate() {
        console.log('ok', id)
        if (id == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入id'
            })
        } else if (latitude == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入latitude'
            })
        } else if (longitude == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入longitude'
            })
        } else if (address == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入地址'
            })
        } else if (images == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入marker图标地址'
            })
        } else if (Photos == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入图片地址'
            })
        } else if (Text == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入地点描述'
            })
        } else {
            wx.cloud.database().collection("markers")
                .add({
                    data: {
                        id: parseInt(id),
                        latitude: latitude,
                        longitude: longitude,
                        mptype: mptype,
                        address: address,
                        mptype: mptype,
                        images: images,
                        Photos: Photos,
                        Text: Text
                    }

                })
                .then(res => {
                    console.log('ok', res)

                    wx.showToast({
                        title: '录入成功'
                    })
                    this.setData({
                        a: "",
                        b: "",
                        c: "",
                        d: "",
                        e: "",
                        f: "",
                        g: ""
                    })

                })
                .catch(res => {
                    console.log('fail', res)
                })
        }
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
                const cloudPath = "images/markers/" + new Date().getTime() + `${filePath.match(/\.[^.]+?$/)[0]}`
                wx.cloud.uploadFile({
                    cloudPath,
                    filePath,
                    success: res => {
                        console.log('[上传文件] 成功：', res)

                        app.globalData.fileID = res.fileID
                        app.globalData.cloudPath = cloudPath
                        app.globalData.imagePath = filePath

                        wx.navigateTo({
                            url: '../root/look/look'
                        })
                    }
                })
            }
        })
    },
    donews() {
        wx.navigateTo({
            url: '../root/newsroot/newsroot',
        })
    },
    music() {
        wx.navigateTo({
            url: '../root/music/music',
        })
    }
})
// .tcb.qcloud.la jia
// bishe-2gzem6jbbfcfaed5.shan
// https://6269-bishe-2gzem6jbbfcfaed5-1300452344.tcb.qcloud.la/music/cishengbuhuan.mp3
// cloud://6269-bishe-2gzem6jbbfcfaed5-1300452344.tcb.qcloud.la/music/cishengbuhuan.mp3
//  cloud://6269-bishe-2gzem6jbbfcfaed5-1300452344/music/cishengbuhuan.mp3