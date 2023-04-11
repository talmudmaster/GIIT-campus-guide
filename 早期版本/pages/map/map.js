// src/pages/index/index.js
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
    isShowPosition: false,
    dialogShow: false,
    title: "",
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
      iconPath: "cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/markers/1619681434312.png",
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
  },
  //刷新
  onPullDownRefresh() {
    this.newdress()
    wx.showNavigationBarLoading()
    wx.showLoading({
        title: 'loading...',
      }),
      setTimeout(function () {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }, 1500)
  },
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
        wx.showModal({
          title: '定位提示',
          content: '由于组件版本原因，30s内不能重复定位，请稍后再试！',
        
        });
      }
    });
    this.setData({
      isshowPosition: true,
      isHighAccuracy:true
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
      polyline:null
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
      isshowPosition: true,
      isHighAccuracy:true
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
      polyline:null
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