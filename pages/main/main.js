var subjectUtil = require('../../utils/subjectUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "../../images/001.jpg",
      "../../images/002.jpg",
      "../../images/003.jpg"
    ],
    movies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovie();
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
    var page = this;
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters',
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
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMovie();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  loadMovie:function(){
    var page = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters',
      header:{
        "content-Type":"application/json"
      },
      success:function(res){
        wx.hideLoading()
        var subjects = res.data.subjects;
        subjectUtil.processSubjects(subjects);

        var array_list = page.data.movies;
        for (var i = 0; i < subjects.length; i++) {
          array_list.push(subjects[i]);
        }
        page.setData({
          movies: page.data.movies
        })
        console.log(array_list, page.data.movies)
        // page.setData({
        //   movies: subjects
        // })
      }
    })
  },
  detail: function (e) {
    getApp().detail(e)
  }
})