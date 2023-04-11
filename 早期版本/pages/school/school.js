// miniprogram/pages/school/school.js
var list = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{
        link: '../school/swiperimg/swiperimg',
        url: 'cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/photos/1.jpg'
        //  url:'../school/111/1.jpg'
      }, {
        link: '../school/swiperimg/swiperimg',
        url: 'cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/photos/2.jpg'
        // url:'../school/111/2.jpg'
      }, {
        link: '../school/swiperimg/swiperimg',
        url: 'cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/photos/3.jpg'
        // url:'../school/111/3.jpg'
      },
      {
        link: '../school/swiperimg/swiperimg',
        url: 'cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/images/photos/4.jpg'
        // url:'../school/111/4.jpg'
      }
    ],
    list: "",
    msgList: [{
      url: " ",
      title: " "
    }],
    music: [{

    }],
    isplay: false,
    indicatorDots: true, //小点
    indicatorColor: "white", //指示点颜色
    activeColor: "#2adce2", //当前选中的指示点颜色
    autoplay: true, //是否自动轮播
    interval: 3500, //间隔时间
    duration: 2000, //滑动时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
        name: 'getnews'
      })
      .then(res => {

        this.setData({
          new1: res.result.data[0],
          new2: res.result.data[1],
          new3: res.result.data[2],
        })
        console.log("ok!", res)
      })
      .catch(res => {
        console.log("no", res)
      })

    this.setData({
      msgList: [{
          url: "/pages/school/gonggao/gong1/gong1",

          title: "公告：欢迎萌新入校，请查阅入学报道流程！！"
        },

        {
          url: "/pages/school/gonggao/gong2/gong2",

          title: "公告：一秒钟带你了解食堂美食以及宿舍环境！！！"
        }

      ]
    });

  },
  copy(e) {
    wx.showModal({
      title: '提示',
      content: '由于版本限制，请点击确认并复制网址到浏览器浏览！',
      success: (res => {
        var data = e.currentTarget.dataset.connet
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
  },
  mp3(e) {
    wx.cloud.callFunction({
        name: 'mp3'
      })
      .then(res => {
        console.log('data', res)
        var a = []
        var b = []
        var n = null
        var x=parseInt(res.result.data.length/5)
        console.log('倍数', x)
        n = parseInt(Math.random() * 10*x);
        if (n >= res.result.data.length) {
          n = n - res.result.data.length
        } 
        for (var i = 0; i < res.result.data.length; i++) {
          var title = res.result.data[i].songname
          var src = res.result.data[i].url
          a.push(title);
          b.push(src);
          this.data.title = title
          this.data.src = src
        }
        console.log('随机数', n)
        let c = a[n]
        let d = b[n]
        console.log('歌名', c)
        console.log('地址', d)
        const backgroundAudioManager = wx.getBackgroundAudioManager();
        backgroundAudioManager.title = c;
        // https://6269-bishe-2gzem6jbbfcfaed5-1300452344.tcb.qcloud.la/music/cishengbuhuan.mp3
        // cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/music/cishengbuhuan.mp3
        backgroundAudioManager.src = d;
        // 播放
        // if (!this.data.isplay) {

        console.log("music playing !");
        // 结束时停止
        backgroundAudioManager.onEnded(() => {
          console.log("music end !");

        });
        // }
        // 暂停
        // else {
        //   this.setData({
        //     isplay: !this.data.isplay,
        //   });
        //   backgroundAudioManager.pause();
        //   backgroundAudioManager.onPause(() => {
        //     console.log("music stop !");
        //   });
        // }

      })

  },

  //图片比例
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width; //图片宽度
    var swiperH = winWid * imgh / imgw + "px" //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH //设置高度
    })
  },
  //图片链接
  changeURL: function (e) {
    console.log("11111", e)
    var url = e.currentTarget.dataset.link
    wx.navigateTo({
      url: url,

    })
  },
  //公告链接
  changeGonggao(e) {
    console.log("22222", e)
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,

    })
  },
  //学校简介
  a() {
    wx.navigateTo({
      url: "../school/jianjie/jianjie",
    })
  },
  //学校简介
  b() {
    wx.navigateTo({
      url: "../school/information/information",
    })
  },
  c() {
    wx.navigateTo({
      url: "../school/bus/bus",
    })
  },
  d(e) {
    wx.showModal({
      title: '意见反馈',
      content: '如果有什么意见反馈，请点击确认与我取得联系！',
      success: (res => {
        if (res.confirm == true) {
        wx.previewImage({
          current: 'cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/photo/38EE202376962825C5AD8DD3FF591F69.jpg', // 当前显示图片的http链接
          urls: ["cloud://bishe-2gzem6jbbfcfaed5.6269-bishe-2gzem6jbbfcfaed5-1300452344/photo/38EE202376962825C5AD8DD3FF591F69.jpg"] // 需要预览的图片http链接列表
        })
}
      }),
      fail(res) {
        wx.setClipboardData({
          data: null,
         
        })
      }
    })
  },
  e() {
    wx.navigateTo({
      url: "../school/musiclist/list",
    })
  },
  news(e) {
    console.log("ok", e)
    wx.navigateTo({
      url: '../school/news/news?id=' + e.currentTarget.dataset.id
    })
  },
  lishi() {
    wx.navigateTo({
      url: '../school/news/lishi/lishi',
    })
  },
})