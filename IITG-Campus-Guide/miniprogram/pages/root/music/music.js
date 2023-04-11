// miniprogram/pages/root/music/music.js
var Name = ''
var Address = ''
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

    },
    getmusic() {
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
    // 上传地址到数据库
    name(e) {
        Name = e.detail.value
    },
    address(e) {
        Address = e.detail.value
    },
    a() {
        this.setData({
            Name: ''
        })
    },
    b() {
        this.setData({
            Address: ''
        })
    },
    upmusic() {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        var time = timestamp
        if (Name == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入歌曲名'
            })
        } else if (Address == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入歌曲地址'
            })
        } else {
            wx.cloud.database().collection("mp3")
                .add({
                    data: {
                        time: time,
                        songname: Name,
                        url: Address
                    }
                })
                .then(res => {
                    console.log('ok', res)
                    this.getmusic()
                    wx.showToast({
                        title: '录入成功'
                    })
                    this.setData({
                        Name: "",
                        Address: "",

                    })
                })
                .catch(res => {
                    console.log('fail', res)
                })
        }
    },
    z() {
        wx.navigateTo({
            url: '../music/csthis/csthis',
        })
    },
    doDel(e) {
        wx.showModal({
            title: "是否确认删除",
            content: "你将从数据库删除一首歌曲信息，确认是否删除！",
            success(res) {
                console.log(res)
                if (res.confirm == true) {
                    console.log('确认', e.currentTarget.dataset.id)
                    wx.cloud.callFunction({
                            name: 'delmusic',
                            data: {
                                id: e.currentTarget.dataset.id
                            }
                        })
                        .then(res => {
                            wx.showToast({
                                title: '已删除成功',
                                duration: 900,
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
    //选择文件
    chooseFile() {
        wx.chooseMessageFile({
            count: 1,
            type: "file",
            success: res => {
                console.log('选择成功', res)
                const tempFilePaths = res.tempFiles
                let temFile = res.tempFiles[0]
                this.uploadFile(temFile.name, temFile.path)
            }
        })

    },
    uploadFile(name, tempUrl) {
        wx.cloud.uploadFile({
            cloudPath: "music/" + name,
            filePath: tempUrl,
            success: res => {
                // 字符串处理
                var fileID = res.fileID
                console.log('上传成功', res)
                var a = fileID.length
                console.log('数据长度', a)
                var b = fileID.substring(31, a)
                console.log('截取数据', b)
                var fileIDLen = 'https://' + b.slice(0, 38) + '.tcb.qcloud.la' + b.slice(38)
                console.log('上传1111111', fileIDLen)
                wx.showModal({
                    title: '提示',
                    content: "音乐已上传，请点击确认后复制！！",
                    success: (res => {
                        var data = fileIDLen

                        if (res.confirm == true) {
                            console.log(data)
                            wx.setClipboardData({
                                data: data,
                                // success (res) {
                                //   wx.getClipboardData({
                                //     success (res) {
                                //       console.log(res.data) 
                                //     }
                                //   })
                                // }
                            })
                        }

                    }),
                    fail(res) {
                        wx.setClipboardData({
                            data: null,
                            // success (res) {
                            //   wx.getClipboardData({
                            //     success (res) {
                            //       console.log(res.data) 
                            //     }
                            //   })
                            // }
                        })
                    }
                })

            }
        })

    },
})