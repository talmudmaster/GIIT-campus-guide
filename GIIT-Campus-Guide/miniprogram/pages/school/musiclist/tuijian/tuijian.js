const db = wx.cloud.database()
Page({
    data: {
        songname: [],
        flog: true,
        titl: "",
        jieshao: "",
        currentWordNumber: 0,
        inputValueone: null,
        imgList: [{
                id: 0,
                kzid: 0,
                ipuid: 0,
                ipuname: 'ipuname0',
                inpuid: 0,
                currentWordNumber1: '',
                shuzhi: ''
            },

        ],
    },
    inputs: function (e) { //监控输入框字符长度
        var jiankong = "imgList[" + e.target.id + "].currentWordNumber1";
        var shuju = "imgList[" + e.target.id + "].shuzhi";
        var value = e.detail.value; // 获取输入框的内容  
        var len = parseInt(value.length); // 获取输入框内容的长度
        this.setData({
            [jiankong]: len,
            [shuju]: value
        });
    },
    tianjiaxx: function (e) { //添加投票选项
        let optionList = this.data.imgList;
        let n = this.data.imgList.length
        if (n < 9) {
            optionList.push({
                id: optionList.length,
                kzid: optionList.length,
                ipuid: optionList.length,
                ipuname: 'ipuname' + optionList.length,
                inpuid: optionList.length,
                currentWordNumber1: '',
                shuzhi: ''
            })
            this.setData({
                imgList: optionList
            });
        } else {
            wx.showToast({
                title: '不能再增加了',
                icon: 'none',
                duration: 2000
            })
        }

    },
    delInput: function (e) { //清空输入框
        var iputde = "imgList[" + e.target.id + "].shuzhi";
        var qingkong = "imgList[" + e.target.id + "].currentWordNumber1";
        this.setData({
            [iputde]: '',
            [qingkong]: 0,
        })
    },
    jianquxx: function (e) { //减去选项函数
        var arr = this.data.imgList
        if (e.target.id > 0) {
            arr.splice(e.target.id, 1)
            for (var i = 0; i < arr.length; i++) {
                arr[i].id = i
                arr[i].kzid = i
                arr[i].ipuid = i
                arr[i].ipuname = "ipuname" + i
                arr[i].inpuid = i
            }
        }
        this.setData({
            imgList: arr
        })
    },
    formSubmit: function (e) {
        console.log("thiem", e);
        var that = this
        var flog = that.data.flog
        if (flog) {
            wx.showModal({
                title: '提示',
                content: '你确定要提交吗',
                success: function (res) {
                    console.log("obj", res)
                    if (res.confirm) {
                        that.issueNotice(e);

                        console.log('用户点击确定')
                    } else {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.showToast({
                title: '你已经提交过啦',
                icon: 'none',
                duration: 2000
            })
        }
    },
    issueNotice(e) {
        var that = this;
        var songname = e.detail.value
        //获取当前时间戳  
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        var time = timestamp
        var number = this.data.imgList.length
        console.log("thiem", this.data.imgList.length);
        db.collection("songname").add({
            data: {
                "songname": songname,
                number: number,
                times: time
            },
            success: function (res) {
                console.log(res)
                wx.showToast({
                    title: '提交成功',
                    icon: 'none',
                    duration: 1500
                })
                that.setData({
                    flog: false,
                })
            }
        })
    },


    // chooseImage: function (event) {
    //   var that = this;
    //   wx.chooseImage({
    //     count: 3, // 一次最多可以选择2张图片一起上传
    //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //     success: function (res) {
    //       console.log(res)
    //       var imgeList = that.data.imageList.concat(res.tempFilePaths);
    //       that.setData({
    //         imageList: imgeList
    //       });
    //     }
    //   })
    // },

    // previewImage: function (e) {
    //   var that = this;
    //   var dataid = e.currentTarget.dataset.id;
    //   var imageList = that.data.imageList;
    //   wx.previewImage({
    //     current: imageList[dataid],
    //     urls: this.data.imageList
    //   });
    // },
})