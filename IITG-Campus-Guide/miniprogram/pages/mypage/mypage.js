//index.js
const app = getApp()
Page({
    data: {
        userappid: '',
        useropenid: '',
        avatarUrl: '../../images/hat.png',
        userInfo: {},
        hasUserInfo: false,
        userid: {},
    },

    onLoad: function () {

        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true,
            })
        }

    },
    //用户点击右上角分享
    onShareAppMessage() {},
    // 用户点击右上角分享到朋友圈
    onShareTimeline: function (res) {},
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log('[云函数] [login] user openid: ', res)
                this.data.userappid = res.result.event.userInfo.appId
                this.data.useropenid = res.result.event.userInfo.openId

            }
        })
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                this.setData({
                    avatarUrl: res.userInfo.avatarUrl,
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                })
                this.data.avatarUrl = res.userInfo.avatarUrl;
                this.data.city = res.userInfo.city;
                this.data.gender = res.userInfo.gender;
                this.data.country = res.userInfo.country;
                this.data.language = res.userInfo.language;
                this.data.nickName = res.userInfo.nickName;

                console.log("用户数据", this.data)
                //把登陆记录存起来
                wx.cloud.database().collection("user")
                    .add({
                        data: {
                            avatarUrl: this.data.avatarUrl,
                            city: this.data.city,
                            gender: this.data.gender,
                            country: this.data.country,
                            language: this.data.language,
                            nickName: this.data.nickName,
                            userappid: this.data.userappid,
                            useropenid: this.data.useropenid,
                        }

                    })
            }
        })
    },

    a() {
        wx.showModal({
            title: '软件声明',
            content: '该软件版权归桂林信息科技学院个人开发者所有！若需源码支持，请点击确认查看',
            success: (res => {
                if (res.confirm == true) {
                    wx.previewImage({
                        current: 'https://cdnjson.com/images/2023/04/11/kaiyuan30265fb7bd047210.png', // 当前显示图片的http链接
                        urls: ["https://cdnjson.com/images/2023/04/11/kaiyuan30265fb7bd047210.png"] // 需要预览的图片http链接列表
                    })
                }
            }),
            fail(res) {
                console.log('fail')
            }
        })
    },
    b() {
        wx.showModal({
            title: '1751400203|校园导览毕设',
            content: '指导老师：郝扬',
        })
    },
    c() {
        wx.showModal({
            title: '联系作者',
            content: '如果遇到什么问题\n请点击确认与我联系',
            success: (res => {
                if (res.confirm == true) {
                    wx.previewImage({
                        current: 'https://cdnjson.com/images/2023/04/07/wechat.png', // 当前显示图片的http链接
                        urls: ["https://cdnjson.com/images/2023/04/07/wechat.png"] // 需要预览的图片http链接列表
                    })
                }
            }),
            fail(res) {
                console.log('fail')
            }
        })
    },
    d() {
        var user = this.data.useropenid
        if (user == "od68R5XXzYofUo7ZO9Dsd6mGQxWE" || user == "od68R5bcU_0stzsr2Co2bg_X5Tw0123") {
            wx.navigateTo({
                url: '../root/root',
            })
        } else {
            wx.showToast({
                icon: 'none',
                title: '您还不是管理员'
            })
        }
    },
})