// pages/page/page.js
const API = require('../../utils/api');
const WxParse = require('../../wxParse/wxParse');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    detail: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageByID(options.id);
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

  getPageByID: function (id) {
    let _this = this;
    API.getPageByID(id).then(res => {
      _this.setData({
        id: id,
        detail: res
      });
      WxParse.wxParse('page', 'html', res.content.rendered, _this, 5);
    })
      .catch(err => {
        console.log(err);
      });
  },
})