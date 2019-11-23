var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    VerificationCode: '',
    Code: '',
    NewChanges: '',
    NewChangesAgain: '',
    success: false,
    state: ''
  },
  onUnload: function () {
    wx.navigateTo({
      url: '../pages/in/in',//指定界面
    })
  },
  /**
    * 获取验证码
    */
    tijiao: function(){
      wx.redirectTo({
        url: '../Dmy/Dmy',
      })

    },
  return_home: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })

  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handleVerificationCode: function (e) {
    console.log(e);
    this.setData({
      Code: e.detail.value
    })
  },
  handleNewChanges: function (e) {
    console.log(e);
    this.setData({
      NewChanges: e.detail.value
    })
  },
  handleNewChangesAgain: function (e) {
    console.log(e);
    this.setData({
      NewChangesAgain: e.detail.value
    })

  },
  doGetCode: function () {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    wx.request({
      url: '', //后端判断是否已被注册， 已被注册返回1 ，未被注册返回0
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          state: res.data
        })
        if (phone == '') {
          warn = "号码不能为空";
        } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
          warn = "手机号格式不正确";
        } //手机号已被注册提示信息
        else if (that.data.state == 1) {  //判断是否被注册
          warn = "手机号已被注册";

        }
        else {
          wx.request({
            url: '', //填写发送验证码接口
            method: "POST",
            data: {
              coachid: that.data.phone
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                VerificationCode: res.data.verifycode
              })


              //当手机号正确的时候提示用户短信验证码已经发送
              wx.showToast({
                title: '短信验证码已发送',
                icon: 'none',
                duration: 2000
              });
              //设置一分钟的倒计时
              var interval = setInterval(function () {
                currentTime--; //每执行一次让倒计时秒数减一
                that.setData({
                  text: currentTime + 's', //按钮文字变成倒计时对应秒数

                })
                //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
                if (currentTime <= 0) {
                  clearInterval(interval)
                  that.setData({
                    text: '重新发送',
                    currentTime: 61,
                    disabled: false,
                    color: '#33FF99'
                  })
                }
              }, 100);
            }
          })
        };
        //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
        if (warn != null) {
          wx.showModal({
            title: '提示',
            content: warn
          })
          that.setData({
            disabled: false,
            color: '#33FF99'
          })
          return;
        }
      }

    })

  },
  // 提交表单
  submit: function(e){
    // 判断文字内容
    if (e.detail.value.dName.length == 0 || e.detail.value.dName.length>=8){
      wx.showToast({
        title: '姓名不能为空或过长！',
        icon: 'none',
        duration: 1500
      })
    }else if(e.detail.value.dPhone.length == 0){
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        duration: 1500
      })
    }else if(e.detail.value.dMail.length == 0){
      wx.showToast({
        title: '邮箱不能为空！',
        icon: 'none',
        duration: 1500
      })
    }else if(e.detail.value.dHospital.length == 0){
      wx.showToast({
        title: '医院不能为空！',
        icon: 'none',
        duration: 1500
      })
    }else if (e.detail.value.dOffice.length == 0) {
      wx.showToast({
        title: '科室不能为空！',
        icon: 'none',
        duration: 1500
      })
    }else{
      var doctor=e.detail.value;
      console.log(doctor);
      wx.request({
        url: 'http://47.100.248.211:7230/aiya/doctor/save',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: doctor,
        success: function(res){
          console.log(res.data);
          if(res.data.code == 0){
            wx.showToast({
              title: '提交失败！',
              icon: 'loading',
              duration: 1500
            })
          }else {
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1000
            }),
            //跳转到医生个人中心
            wx.redirectTo({
              url: '../Dmy/Dmy',
            })
          }
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})