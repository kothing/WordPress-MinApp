// pages/pages/pages.js
const API = require('../../utils/api');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    page: 1,
    pages: [],
    isBottom: false,
    isLastPage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPagesList(options);
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

  getPagesList: function () {
    this.setData({
      loading: true
    });
    setTimeout(() => {
      wx.showLoading({
        title: 'Loading',
      });
    }, 100);
    API.getPagesList().then(res => {
      wx.hideLoading();
      let args = {};
      if (res.length < 10) {
        this.setData({
          isLastPage: true
        });
      }
      if (this.data.isBottom) {
        wx.showToast({
          title: '加载下一页',
          icon: 'loading',
          duration: 1000
        });
        args.pages = [].concat(this.data.pages, res);
        args.page = this.data.page + 1;
      } else {
        args.pages = res || [];
        args.page = 1;
      }
      this.setData({
        ...args,
        loading: false,
      });
      wx.stopPullDownRefresh();
    })
      .catch(err => {
        this.setData({
          loading: false,
        });
        console.log(err)
        wx.stopPullDownRefresh()
      });
  },

  bindPageByID: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/page/page?id=' + id,
    });
  },
})