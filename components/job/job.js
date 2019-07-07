// components/job/job.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id:{
      type:String,
      value:'id'
    },
    picture:{
      type: String,
      value: '../../img/icon_blank.png'
    },
    title:{
      type: String,
      value: '标题'
    },
    type:{
      type: String,
      value: '类型'
    },
    reward:{
      type: String,
      value: '奖励'
    },
    end:{
      type: String,
      value: '截止时间'
    },
    receive:{
      type: String,
      value: '接取人数'
    }


  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
