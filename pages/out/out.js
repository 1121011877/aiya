const util = require("../../utils/util.js")
const app = getApp()
//录音管理
var voice = "";
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

var tempFilePath;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    music: "music",
    img: "img",
    word: "word",
    picture: "picture",
    choose: " ",
    w:"w",
    //日期
    date: '',
    //图片提交
    photos: "",

    flag: "false",
    account: "true",
    // 医生id
    doctorId:null
  },
  
  //选择日期
  bindDateChange: function (e) {
    console.log('date改变', e.detail.value)
    this.setData({
      date: e.detail.value
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //使用util.js获取当前日期
    var DATE = util.formatDate(new Date());
    //将当前日期赋值给date
    this.setData({
      date: DATE,
      //doctorId:options.docId
    })
    //console.log("out:doctorId: "+this.data.doctorId);
  },

  onShow: function () {
    var that = this
    that.setData({
      flag: "false",
      form_info: ""
    })

  },


  //切换任务类型
  job_type_choose: function (e) {
    var that = this
    if (e.detail.value == "music")
      that.setData({
        choose: "music"
      })
    if (e.detail.value == "img")
      that.setData({
        choose: "img"
      })
    if (e.detail.value == "word")
      that.setData({
        choose: "word"
      })

  },
  submit:function(){
    wx.navigateTo({
      url: '../../Dmy/Dmy'
    })
  },
  //表单提交

  formSubmit: function (e) {
    var title = e.detail.value.jobTitle;
    var describe = e.detail.value.jodDescribe;
    var type = e.detail.value.jobType;
    var id = app.globalData.doctorId;
    var jobFrequency = "每天5次，每次20分钟";
    var file = "../../img/open.png";
    console.log(describe,title,id,type);
    console.log("lalalal");
    wx.request({
      url: app.globalData.localpath +'/aiya/job/save',
      method: 'POST',
      // filePath: "../../img/open.png",
      // name: 'file',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        describe: e.detail.value.jodDescribe,
        title: e.detail.value.jobTitle,
        id: app.globalData.doctorId-0,
        type: e.detail.value.jobType
      },
      success: function (res) {
        console.log(res);
        wx.navigateTo({
          url: '../Dmy/Dmy'
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../Dmy/Dmy'
        })
      },
    })
  },
  /** 
   * 弹出框蒙层截断touchmove事件 
   */
  preventTouchMove: function () { },
  /** 
   * 隐藏模态对话框 
   */
  hideModal() {
    var that = this;
    that.setData({
      showModal: true,
    })
  },
  showModalBtn() {
    var that = this;
    that.setData({
      showModal: false
    })
  }
})