var subjectUtil = require('../../utils/subjectUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:"",
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  bindKeyInput:function(res) {
    this.setData({
      inputVal:res.detail.value
    })
  },
  search:function(res){
    var page = this;
    if (page.data.inputVal == ""){
      wx.showModal({
        title: '提示',
        content: '请输入内容',
      })
      return
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://t.yushu.im/v2/movie/search?q=' + page.data.inputVal,
      header: {
        "content-Type": "application/json"
      },
      success: function (res) {
        wx.hideLoading()
        var subjects = res.data.subjects;
        subjectUtil.processSubjects(subjects);
        page.setData({
          movies: subjects
        })
      }
    })
  },
  detail:function(e){
    getApp().detail(e)
  }
})