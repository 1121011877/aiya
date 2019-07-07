const app = getApp();
var job_numb;
var job_numb_flag;
var search_flag = "false";
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  data: {
    pageNumb: 1,
    pageSize: 8,
    mothodtype: "",
    data: "",
    input: " ",
    search_content: "",
    search_type: "",

    


    tabs: [{
        text: "图片采集",
        path: "img"
      },
      {
        text: "音频采集",
        path: "music"
      },
      {
        text: "文字采集",
        path: "word"
      }
    ],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0
  },

  onLoad: function(options) {

    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

  },

  onShow: function() {
    var that = this
    search_flag = "false"
    that.goTop()
    wx.request({
      url: app.globalData.URL + '/job/jobs_numb',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        job_numb = res.data
        that.index_job(1, 8)
        that.setData({
          pageNumb: 1,
          searchValue: "",
          search_content: ""
        })
      }
    })
  },


  onPullDownRefresh: function() {
    var that = this
    that.onShow()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    var pageNumb = ++that.data.pageNumb

    that.setData({
      pageNumb: pageNumb
    })

    var url;


    if (search_flag == "true") {
      url = "/job/jobs_find"

    } else if (search_flag == "type") {
      url = "/job/jobs_type_find"
    } else {
      url = "/job/jobs"
    }

    wx.request({
      url: app.globalData.URL + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        pageNumb: pageNumb,
        pageSize: 8,
        input: that.data.search_content,
        type: that.data.search_type
      },
      success: function(res) {

        job_numb -= that.data.pageSize

        if (job_numb <= 0) {
          that.showPopup();
          return false
        }

        that.setData({
          data: that.data.data.concat(res.data)
        })
      },
      fail: function(res) {
        wx.navigateTo({
          url: '../../pages/error/error'
        })
      },
    })

  },

  //音频
  audioPlay: function() {
    this.setData({
      action: {
        method: 'play'
      }
    });
  },
  audioPause: function() {
    this.setData({
      action: {
        method: 'pause'
      }
    });
  },

  //页面跳转
  jump: function(e) {
    var that = this
    var job_id = e.currentTarget.dataset.text

    wx.navigateTo({
      url: '../../pages/jobs/jobs?job_id=' + job_id,
    })
  },

  //页面渲染
  index_job: function(pageNumb, pageSize) {
    var that = this

    wx.request({
      url: app.globalData.URL + '/job/jobs',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        pageNumb: pageNumb,
        pageSize: pageSize
      },
      success: function(res) {
        that.setData({
          data: res.data
        })

      },
      fail: function(res) {
        wx.navigateTo({
          url: '../../pages/error/error'
        })
      },
    })
  },



  //搜索
  search_content: function(e) {
    var that = this
    that.setData({
      search_content: e.detail.value
    })
  },

  search: function() {
    var that = this
    var input = that.data.search_content
    that.setData({
      pageNumb: 1

    })
    search_flag = "true"

    wx.request({
      url: app.globalData.URL + '/job/jobs_find_numb',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        input: input
      },
      success(res) {
        job_numb = res.data

        wx.request({
          url: app.globalData.URL + '/job/jobs_find',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          data: {
            input: input,
            pageNumb: 1,
            pageSize: 8
          },
          success: function(res) {
            that.setData({
              data: res.data
            })

          },
          fail: function(res) {
            wx.navigateTo({
              url: '../../pages/error/error'
            })
          },
        })
      }
    })
  },


  //弹窗
  showPopup() {
    this.selectComponent("#popup").showPopup();
  },
  //取消事件
  _error() {
    this.selectComponent("#popup").hidePopup();
  },
  //确认事件
  _success() {
    this.selectComponent("#popup").hidePopup();
  },

  //回到顶部，内部调用系统API
  goTop: function(e) { // 一键回到顶部
    if (wx.pageScrollTo) {

      //   //wx.pageScrollTo(OBJECT)
      //   基础库 1.4.0 开始支持，低版本需做兼容处理
      // 将页面滚动到目标位置。
      //   OBJECT参数说明：
      //   参数名	类型	必填	说明
      // scrollTop	Number	是	滚动到页面的目标位置（单位px）
      //   duration	Number	否	滚动动画的时长，默认300ms，单位 ms
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，暂无法使用该功能，请升级后重试。'
      })
    }
  },


  //任务分类
  type_search: function(e) {
    var that = this

    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    var search_type = e.currentTarget.dataset.text
    that.setData({
      search_type: search_type
    })

    var input = that.data.search_content
    that.setData({
      pageNumb: 1

    })
    search_flag = "type"

    wx.request({
      url: app.globalData.URL + '/job/jobs_type_find_numb',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        type: search_type
      },
      success(res) {
        job_numb = res.data

        wx.request({
          url: app.globalData.URL + '/job/jobs_type_find',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          data: {
            type: search_type,
            pageNumb: 1,
            pageSize: 8
          },
          success: function(res) {
            that.setData({
              data: res.data
            })

          },
          fail: function(res) {
            wx.navigateTo({
              url: '../../pages/error/error'
            })
          },
        })
      }
    })
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  
})