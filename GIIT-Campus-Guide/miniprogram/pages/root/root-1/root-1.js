// miniprogram/pages/root/root-1/root-1.js
var id = ''
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
    onLoad(options) {
        console.log("值", options)
        id = options.id
        this.getDetail()
    },
    //获取新数据
    getDetail() {
        wx.cloud.database().collection("markers")
            .doc(id)
            .get()
            .then(res => {
                console.log("ok", res)
                this.setData({
                    the: res.data,
                    latitude: res.data.latitude,
                    longitude: res.data.longitude,
                    address: res.data.address,
                    images: res.data.images,
                    Photos: res.data.Photos,
                    Text: res.data.Text,
                })
                latitude = res.data.latitude;
                longitude = res.data.longitude;
                address = res.data.address;
                mptype = res.data.mptype;
                images = res.data.images,
                    Photos = res.data.Photos,
                    Text = res.data.Text
            })
            .catch(res => {
                wx.showToast({
                    icon: 'none',
                    title: '数据已被删除'
                })
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
    getLa(e) {
        latitude = e.detail.value

    },
    getLo(e) {
        longitude = e.detail.value

    },
    getAd(e) {
        address = e.detail.value
    },
    getType(e) {
        mptype = e.detail.value
    },
    getIm(e) {
        images = e.detail.value
    },
    getPh(e) {
        Photos = e.detail.value
    },
    getTe(e) {
        Text = e.detail.value
    },
    q() {
        this.setData({
            latitude: ''
        })
    },
    w() {
        this.setData({
            longitude: ''
        })
    },
    e() {
        this.setData({
            address: ''
        })
    },
    r() {
        this.setData({
            images: ''
        })
    },
    t() {
        this.setData({
            Photos: ''
        })
    },
    y() {
        this.setData({
            Text: ''
        })
    },
    onUpdate() {

        if (latitude == '' || longitude == '' || address == '' || Photos == '' || Text == "") {
            wx.showToast({
                icon: 'none',
                title: '请填写数据'
            })
        } else {
            wx.cloud.callFunction({
                    name: 'upData',
                    data: {
                        id: id,
                        latitude: latitude,
                        longitude: longitude,
                        address: address,
                        mptype: mptype,
                        images: images,
                        Photos: Photos,
                        Text: Text
                    }
                })
                .then(res => {
                    console.log('成功', res)
                    this.getDetail()
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
            content: "你将从数据库删除一条位置信息，确认是否删除！",
            success(res) {
                console.log(res)
                if (res.confirm == true) {
                    console.log('确认')
                    wx.cloud.callFunction({
                            name: 'doDel',
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
                                            url: '../../root/root',
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
    }
})