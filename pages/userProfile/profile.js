/**
 * Author: NiceBoy
 * Github 地址: https://github.com/kothing/Wordress-MiniProgram
 */
const app = getApp();
import API from '../../utils/api';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
    let user = app.globalData.user;
    if (!user) {
      user = '';
    }
    this.setData({
      user: user,
    });
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

  /**
   * 登录|登出
   */
  getUserProfile: function (e) {
    wx.showLoading({
      title: '正在登录...',
    });
    API.getUserProfile().then(res => {
      this.setData({
        user: res
      });
      wx.hideLoading();
    })
      .catch(err => {
        console.log(err);
        wx.hideLoading();
      });
  },

  loginOut: function () {
    API.Loginout();
    wx.clearStorageSync();
    wx.showToast({
      title: '清除完毕',
    })
  },

  /**
   * 跳转
   */
  bindHandler: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    });
  },

  /**
   * 订阅
   */
  subscribeMessage: function (template, status) {
    let args = {}
    args.openid = this.data.user.openId
    args.template = template
    args.status = status
    args.pages = getCurrentPages()[0].route
    args.platform = wx.getSystemInfoSync().platform
    args.program = 'WeChat'
    API.subscribeMessage(args).then(res => {
      wx.showToast({
        title: res.message,
        icon: 'success',
        duration: 1000
      });
    })
      .catch(err => {
        wx.showToast({
          title: err.message,
          icon: 'error',
          duration: 1000
        })
      })
  },

  bindSubscribe: function () {
    let _this = this
    let templates = API.template().subscribe
    wx.requestSubscribeMessage({
      tmplIds: templates,
      success(res) {
        if (res.errMsg == "requestSubscribeMessage:ok") {
          for (let i = 0; i < templates.length; i++) {
            let template = templates[i]
            _this.subscribeMessage(template, "accept")
          }
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  // Tooltik
  bindTooltik: function (e) {
    wx.navigateTo({
      url: '/pages/toolkit/toolkit',
    })
  },
})