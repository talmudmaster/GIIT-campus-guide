/* miniprogram/pages/map/map.js */
let db = wx.cloud.database();
let markersDb = db.collection('markers');
var mptype = "";
let name = ''
let latitude = ''
let longitude = ''
Page({
    mapCtx: null,
    message: "请输入",

    /**
     * 页面的初始数据
     */
    data: {
        kik: '11',
        inputShowed: false,
        isPopping: false,
        animPlus: {},
        animCollect: {},
        animTranspond: {},
        aninWrite: {},
        enable_poi: true,
        show_compass: true,
        show_location: false,
        dialogShow: false,
        title: "",
        windowHeight: 400,
        polyline: [{
            points: [],
            color: "#ff6600",
            width: 2,
            dottedLine: false,
            arrowLine: true,
            borderColor: "#000",
            borderWidth: 5
        }],
        buttons: [{
            text: '取消'
        }, {
            text: '确定'
        }],
        markers: [{
            id: 1,
            latitude: "25.305781",
            longitude: "110.415774",
            scale: "16",
            mptype: "",
            iconPath: "../../images/map/location.png",
            Text: "",
            callout: {
                content: "桂林信科院",
                color: '#ffffff',
                fontSize: 13,
                borderRadius: 6,
                bgColor: '#1296db',
                padding: 5,
                display: 'ALWAYS',
                textAlign: 'center'
            },
            width: 38,
            height: 38,
        }],
        location: {
            name: '学校的前门',
            latitude: 25.304893,
            longitude: 110.416455,
        },

        endPoint: {
            name: '',
            latitude: '',
            longitude: ''
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onShowPosition()
        this.setData({
            search: this.search.bind(this)
        })
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                // console.log(res.windowHeight)
                that.setData({
                    windowHeight: res.windowHeight,
                })
            }
        })
    },
    //刷新
    onPullDownRefresh() {
        this.newdress()
        wx.showNavigationBarLoading()
        wx.showLoading({
                title: '加载中 请稍等',
            }),
            setTimeout(function () {
                wx.hideLoading()
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh()
            }, 1500)
    },
    //用户点击右上角分享
    onShareAppMessage() {},
    // 用户点击右上角分享到朋友圈
    onShareTimeline: function (res) {},
    dingwei() {
        this.newdress()
    },
    newdress() {
        wx.getLocation({
            type: 'gcj02',
            success: (res) => {
                const {
                    latitude,
                    longitude
                } = res;

                this.setData({
                    location: {
                        name: '当前位置',
                        latitude,
                        longitude
                    }
                });
            },
            fail: (res) => {
                wx.showToast({
                    title: '请稍等片刻\n再进行定位操作',
                    icon: 'none',
                    duration: 2000
                })
            }
        });
        this.setData({
            show_location: true,
            isHighAccuracy: true
        });
    },
    //搜索查询
    search: function (value) {
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        return new Promise((resolve, reject) => {
            console.log('输入的值', value)
            wx.cloud.callFunction({
                    name: 'search',
                    data: {
                        value: value
                    }
                })
                .then(res => {
                    console.log("查询", res)
                    if (res.result.data.length < 50) {
                        wx.showToast({
                            icon: 'none',
                            title: '找到了' + res.result.data.length + "结果"
                        })
                        this.setData({
                            markers: res.result.data
                        })
                    }
                })
        })

    },
    //导览菜单
    //点击弹出
    plus: function () {
        if (this.data.isPopping) {
            //缩回动画
            this.popp();
            this.setData({
                isPopping: false
            })
        } else if (!this.data.isPopping) {
            //弹出动画
            this.takeback();
            this.setData({
                isPopping: true
            })
        }
    },
    //游览路线规划
    //北
    transpond: function () {
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var new1 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let point = result[i].point;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (point == "0" || point == "1") {

                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                iconPath,
                                scale: 16,
                                width: 31,
                                height: 31
                            },
                            polyline: [{
                                points: [{
                                    longitude: 110.416455,
                                    latitude: 25.304893
                                }, {
                                    longitude: 110.415774,
                                    latitude: 25.305781
                                }, {
                                    longitude: 110.415612,
                                    latitude: 25.306465
                                }, {
                                    longitude: 110.415021,
                                    latitude: 25.306543
                                }, {
                                    longitude: 110.414209,
                                    latitude: 25.306679
                                }, {
                                    longitude: 110.4141,
                                    latitude: 25.306351
                                }, {
                                    longitude: 110.413438,
                                    latitude: 25.306428
                                }, {
                                    longitude: 110.41257,
                                    latitude: 25.306507
                                }],
                                color: "#ff6600",
                                width: 2,
                                dottedLine: false,
                                arrowLine: true,
                                borderColor: "#000",
                                borderWidth: 5
                            }]

                        })
                        //存入新数组
                        new1.push(res.result.data[i]);
                        console.log("1991", new1);
                        wx.createMapContext('map', this).includePoints({
                            points: new1,
                            padding: [45, 36, 10, 36]
                        })

                    } else {
                        this.setData({
                            [markers]: null,

                        })
                    }
                }
            })

    },
    //中
    collect: function () {
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var new2 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let point = result[i].point;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (point == "0" || point == "2") {

                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                iconPath,
                                scale: 16,
                                width: 31,
                                height: 31
                            },
                            polyline: [{
                                points: [{
                                    longitude: 110.416455,
                                    latitude: 25.304893
                                }, {
                                    longitude: 110.41588,
                                    latitude: 25.307312
                                }, {
                                    longitude: 110.414538,
                                    latitude: 25.307958
                                }, {
                                    longitude: 110.41384,
                                    latitude: 25.307408
                                }, {
                                    longitude: 110.413877,
                                    latitude: 25.306895
                                }, {
                                    longitude: 110.412902,
                                    latitude: 25.307217
                                }, {
                                    longitude: 110.412395,
                                    latitude: 25.307665
                                }, {
                                    longitude: 110.413283,
                                    latitude: 25.307976
                                }, {
                                    longitude: 110.413746,
                                    latitude: 25.30883
                                }],

                                color: "#ff6600",
                                width: 2,
                                dottedLine: false,
                                arrowLine: true,
                                borderColor: "#000",
                                borderWidth: 5
                            }]
                        })
                        //存入新数组
                        new2.push(res.result.data[i]);
                        console.log("22", res)
                        console.log("11", new2)
                        wx.createMapContext('map', this).includePoints({
                            points: new2,
                            padding: [65, 36, 10, 36]
                        })
                    } else {
                        this.setData({
                            [markers]: null
                        })
                    }
                }
            })

    },
    //南
    write: function () {
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var new3 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let point = result[i].point;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (point == "0" || point == "3") {

                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                iconPath,
                                scale: 16,
                                width: 31,
                                height: 31
                            },
                            polyline: [{
                                points: [{
                                    longitude: 110.416455,
                                    latitude: 25.304893
                                }, {
                                    longitude: 110.41680466184005,
                                    latitude: 25.305657569974258
                                }, {
                                    longitude: 110.417695,
                                    latitude: 25.30629
                                }, {
                                    longitude: 110.418379,
                                    latitude: 25.305568
                                }, {
                                    longitude: 110.418804,
                                    latitude: 25.306927
                                }, {
                                    longitude: 110.418765,
                                    latitude: 25.307882
                                }, {
                                    longitude: 110.417863,
                                    latitude: 25.307377
                                }, {
                                    longitude: 110.416686,
                                    latitude: 25.307003
                                }, {
                                    longitude: 110.416916,
                                    latitude: 25.307871
                                }],
                                color: "#ff6600",
                                width: 2,
                                dottedLine: false,
                                arrowLine: true,
                                borderColor: "#000",
                                borderWidth: 5
                            }]

                        })
                        //存入新数组
                        new3.push(res.result.data[i]);
                        console.log("22", res)
                        console.log("11", new3)
                        wx.createMapContext('map', this).includePoints({
                            points: new3,
                            padding: [60, 36, 10, 36]
                        })
                    } else {
                        this.setData({
                            [markers]: null

                        })
                    }
                }
            })

    },
    //弹出动画
    popp: function () {
        //plus顺时针旋转
        var animationPlus = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease-out'
        })
        var animationcollect = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease-out'
        })
        var animationTranspond = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease-out'
        })
        var animationWrite = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease-out'
        })

        animationPlus.translate(5, 0).rotateZ(180).step();
        animationcollect.translate(-110, 5).rotateZ(180).opacity(1).step();
        animationTranspond.translate(-175, 5).rotateZ(180).opacity(1).step();
        animationWrite.translate(-60, 5).rotateZ(180).opacity(1).step();
        this.setData({
            animPlus: animationPlus.export(),
            animCollect: animationcollect.export(),
            animTranspond: animationTranspond.export(),
            animWrite: animationWrite.export(),
        })
    },
    //收回动画
    takeback: function () {
        //plus逆时针旋转
        var animationPlus = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease-out'
        })
        var animationcollect = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease-out'
        })
        var animationTranspond = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease-out'
        })
        var animationWrite = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease-out'
        })
        animationPlus.rotateZ(0).step();
        animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
        animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
        animationWrite.translate(0, 0).rotateZ(0).opacity(0).step();
        this.setData({
            animPlus: animationPlus.export(),
            animCollect: animationcollect.export(),
            animTranspond: animationTranspond.export(),
            animWrite: animationWrite.export(),
        })
    },

    //获取定位
    onShowPosition(event) {
        wx.getLocation({
            type: 'gcj02',
            success: (res) => {
                const {
                    latitude,
                    longitude
                } = res;
                if (25.304174 < res.latitude < 25.309554 && 110.411723 < res.longitude < 110.419492) {
                    this.setData({
                        location: {
                            name: '当前位置',
                            latitude,
                            longitude
                        }
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '当前位置不在校区，是否切换到校区？',
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                this.setData({
                                    latitude: "25.305781",
                                    longitude: "110.415774",
                                    title: "桂林信科院",

                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                                this.setData({
                                    location: {
                                        latitude,
                                        longitude
                                    }
                                });
                            }

                        }
                    })
                }
            },
            fail(err) {
                wx.showModal({
                    title: '获取定位信息失败',
                    content: '为了获得更好的体验，请检查手机定位是否开启，小程序设置中是否授权【位置信息】！',
                    success(aaa) {
                        console.log(aaa)
                        if (aaa.confirm) {
                            wx.openSetting({
                                success: function (data) {
                                    if (data.authSetting["scope.userLocation"] === true) {
                                        wx.showToast({
                                            title: '授权成功',
                                            icon: 'success',
                                            duration: 600
                                        })
                                        that.getLocation()
                                    } else {

                                        wx.showToast({
                                            title: '授权失败',
                                            icon: 'none',
                                            duration: 600
                                        })
                                    }
                                },
                                fail(err) {
                                    console.log(err)
                                    wx.showToast({
                                        title: '唤起设置页失败，请手动打开',
                                        icon: 'none',
                                        duration: 600
                                    })

                                }
                            })
                        }
                    }
                })
            }
        });
        this.setData({
            show_location: true,
            isHighAccuracy: true
        });
    },
    //设置markers
    a() {
        this.takeback();

        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var newmark1 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let mptype = result[i].mptype;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (mptype == "校门") {

                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                address,
                                iconPath,
                                scale: 16,
                                width: 31,
                                height: 31
                            },
                            polyline: null
                        })
                        //存入新数组newmark()
                        newmark1.push(res.result.data[i]);
                        console.log("22", res)
                        console.log("11", newmark1)
                        wx.createMapContext('map', this).includePoints({
                            points: newmark1,
                            padding: [36, 36, 10, 36]
                        })
                    } else {
                        this.setData({
                            [markers]: null
                        })

                    }

                }
            })
            .catch(res => {
                console.log("no", res)
            })

    },
    b() {
        this.takeback();

        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var newmark2 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let mptype = result[i].mptype;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (mptype == "小景点") {
                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                address,
                                iconPath,
                                scale: 16,
                                width: 31,
                                height: 31
                            },
                            polyline: null
                        })
                        console.log("22", longitude)
                        //存入新数组newmark()
                        newmark2.push(res.result.data[i]);
                        wx.createMapContext('map', this).includePoints({
                            points: newmark2,
                            padding: [36, 36, 10, 36]
                        })
                    } else {
                        this.setData({
                            [markers]: null
                        })
                    }
                }

            })
            .catch(res => {
                console.log("no", res)
            })

    },
    c() {
        this.takeback();
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var newmark3 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let mptype = result[i].mptype;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (mptype == "食堂") {
                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                address,
                                iconPath,
                                width: 31,
                                height: 31
                            },
                            polyline: null
                        })
                        console.log("22", longitude)
                        //存入新数组newmark()
                        newmark3.push(res.result.data[i]);
                        wx.createMapContext('map', this).includePoints({
                            points: newmark3,
                            padding: [60, 36, 10, 36]
                        })
                    } else {
                        this.setData({
                            [markers]: null
                        })
                    }


                }

            })
            .catch(res => {
                console.log("no", res)
            })

    },
    d() {
        this.takeback();
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var newmark4 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let mptype = result[i].mptype;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (mptype == "奶茶小吃") {
                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                address,
                                iconPath,
                                width: 31,
                                height: 31
                            },
                            polyline: null
                        })
                        console.log("22", longitude)
                        //存入新数组newmark()
                        newmark4.push(res.result.data[i]);
                        wx.createMapContext('map', this).includePoints({
                            points: newmark4,
                            padding: [36, 36, 10, 36]
                        })
                    } else {
                        this.setData({
                            [markers]: null
                        })
                    }
                }
            })
            .catch(res => {
                console.log("no", res)
            })

    },
    e() {
        this.takeback();
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var newmark5 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let mptype = result[i].mptype;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (mptype == "学生公寓") {
                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                address,
                                joinCluster: true,
                                iconPath,
                                width: 31,
                                height: 31
                            },
                            polyline: null
                        })
                        console.log("22", address)
                        //存入新数组newmark()
                        newmark5.push(res.result.data[i]);
                        let mapCtx = wx.createMapContext('map', this);
                        mapCtx.includePoints({
                                points: newmark5,
                                padding: [60, 36, 10, 36]
                            }),
                            mapCtx.initMarkerCluster({
                                enableDefaultStyle: true,

                                zoomOnClick: true,
                                gridSize: 35,

                            })
                    } else {
                        this.setData({
                            [markers]: null
                        })

                    }
                }
            })
            .catch(res => {
                console.log("no", res)
            })

    },
    f() {
        this.takeback();
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var newmark6 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let mptype = result[i].mptype;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (mptype == "教学楼") {
                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                address,
                                iconPath,
                                width: 31,
                                height: 31
                            },
                            polyline: null
                        })
                        console.log("22", longitude)
                        //存入新数组newmark()
                        newmark6.push(res.result.data[i]);
                        let mapCtx = wx.createMapContext('map', this);
                        mapCtx.includePoints({
                            points: newmark6,
                            padding: [36, 36, 10, 36]
                        })
                    } else {
                        this.setData({
                            [markers]: null
                        })
                    }

                }
            })
            .catch(res => {
                console.log("no", res)
            })

    },
    g() {
        this.takeback();
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var newmark7 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let mptype = result[i].mptype;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (mptype == "行政楼") {
                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                iconPath,
                                width: 31,
                                height: 31
                            },
                            polyline: null
                        })
                        console.log("22", longitude)
                        //存入新数组newmark()
                        newmark7.push(res.result.data[i]);
                        wx.createMapContext('map', this).includePoints({
                            points: newmark7,
                            padding: [36, 36, 10, 36]
                        })
                    } else {
                        this.setData({
                            [markers]: null
                        })
                    }
                }
            })
            .catch(res => {
                console.log("no", res)
            })

    },
    h() {
        this.takeback();
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var newmark8 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let mptype = result[i].mptype;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (mptype == "生活服务") {
                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                address,
                                iconPath,
                                width: 31,
                                height: 31
                            },
                            polyline: null
                        })
                        console.log("22", longitude)
                        //存入新数组newmark()
                        newmark8.push(res.result.data[i]);
                        wx.createMapContext('map', this).includePoints({
                            points: newmark8,
                            padding: [60, 36, 10, 36]
                        })
                    } else {
                        this.setData({
                            [markers]: null
                        })
                    }
                }
            })
            .catch(res => {
                console.log("no", res)
            })

    },
    i() {
        this.takeback();
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var newmark9 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let mptype = result[i].mptype;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (mptype == "运动场所") {
                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                address,
                                iconPath,
                                width: 31,
                                height: 31
                            },
                            polyline: null
                        })
                        console.log("22", longitude)
                        //存入新数组newmark()
                        newmark9.push(res.result.data[i]);
                        wx.createMapContext('map', this).includePoints({
                            points: newmark9,
                            padding: [36, 36, 10, 55]
                        })
                    } else {
                        this.setData({
                            [markers]: null
                        })
                    }
                }
            })
            .catch(res => {
                console.log("no", res)
            })

    },
    j() {
        this.takeback();
        this.setData({
            markers: [{
                id: '',
                latitude: "",
                longitude: "",
                scale: "",
                mptype: "",
                iconPath: "",
                Text: "",
                callout: {

                },
                width: 38,
                height: 38,
            }],
            polyline: null
        })
        wx.cloud.callFunction({
                name: 'getData'
            })

            .then(res => {
                console.log("ok!", res)
                var result = res.result.data;
                var newmark10 = [];
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].id;
                    let latitude = result[i].latitude;
                    let longitude = result[i].longitude;
                    let address = result[i].address;
                    let mptype = result[i].mptype;
                    let iconPath = result[i].images;
                    var markers = "markers[" + (i + 1) + "]";
                    if (mptype == "其他") {
                        this.setData({
                            [markers]: {
                                id,
                                latitude,
                                longitude,
                                callout: {
                                    content: address,
                                    color: '#ffffff',
                                    fontSize: 13,
                                    borderRadius: 6,
                                    bgColor: '#1296db',
                                    padding: 5,
                                    display: 'ALWAYS',
                                    textAlign: 'center'
                                },
                                address,
                                iconPath,
                                width: 31,
                                height: 31
                            },
                            polyline: null
                        })
                        console.log("22", address)
                        //存入新数组newmark()
                        newmark10.push(res.result.data[i]);
                        wx.createMapContext('map', this).includePoints({
                            points: newmark10,
                            padding: [36, 36, 10, 36]
                        })
                    } else {
                        this.setData({
                            [markers]: null
                        })
                    }
                }
            })
            .catch(res => {
                console.log("no", res)
            })

    },
    //自定义弹窗
    mapmarker(e) {
        this.setData({
            dialogShow: false,
        })
        console.log("0000000000", e)
        var yes = e.detail.item.text
        var Id = e.currentTarget.id
        if (yes == "确定") {
            this.onShowPosition()
            wx.cloud.callFunction({
                    name: 'getData'
                })
                .then(res => {
                    var data = res.result.data
                    var number = res.result.data.length
                    this.setData({
                        endPoint: {
                            name: data[number - Id].address,
                            latitude: data[number - Id].latitude,
                            longitude: data[number - Id].longitude,
                        }
                    })
                    console.log("9911111", this.data)
                    let key = 'LBYBZ-CZKCF-VC6J5-JWUDZ-Y6OOK-KYF2F'; //使用在腾讯位置服务申请的key
                    let referer = '信科导览'; //调用插件的app的名称
                    const endPoint = JSON.stringify(this.data.endPoint);
                    const startPoint = JSON.stringify(this.data.location);
                    const navigation = 1
                    setTimeout(function () {
                        wx.navigateTo({
                            url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&startPoint=' + startPoint + '&endPoint=' + endPoint + '&navigation=' + navigation
                        });

                    }, 500)
                })
        }
    },
    markertap(e) {
        this.setData({
            dialogShow: true
        })
        console.log("ddd", e.detail.markerId)
        var Id = e.detail.markerId
        wx.cloud.callFunction({
                name: 'getData'
            })
            .then(res => {
                var data = res.result.data
                var number = res.result.data.length
                this.setData({
                    id: data[number - Id].id,
                    title: data[number - Id].address,
                    Photos: data[number - Id].Photos,
                    Text: data[number - Id].Text
                })
                console.log("aaa", data[number - Id].id)
            })
    },
    //点击图片可查看
    lookPhoto(e) {
        console.log("点击了图片", e.target.dataset.src)
        var url = e.target.dataset.src
        wx.previewImage({
            current: 'url', // 当前显示图片的http链接
            urls: [url] // 需要预览的图片http链接列表
        })

    }


})