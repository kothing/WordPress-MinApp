// pages/category/category.js
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
    user: app.globalData.user,
    loading: false,
    page: 1,
    category: [],
    isBottom: false,
    isLastPage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategories(options);
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
    this.setData({
      loading: true,
      page: 1,
      isBottom: false
    })
    this.getCategories();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      isBottom: true
    });
    if (!this.data.isLastPage) {
      this.getCategories({ 
        page: this.data.page + 1
      });
    }
  },

  /**
   * 登录
   */
  getUserProfile: function () {
    if(this.data.user) {
      wx.showToast({
        title: '已经登录',
        icon: 'success',
        duration: 800
      });
      return;
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getCategories: function () {
    this.setData({
      loading: true
    });
    setTimeout(() => {
      wx.showLoading({
        title: 'Loading'
      });
    }, 100);
    API.getCategories().then(res => {
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
        args.category = [].concat(this.data.category, res);
        args.page = this.data.page + 1;
      } else {
        args.category = res || [];
        args.page = 1;
      }
      this.setData({
        ...args,
        loading: false,
      });
      wx.stopPullDownRefresh();
    })
      .catch(err => {
        wx.hideLoading();
        this.setData({
          loading: false,
        });
        wx.stopPullDownRefresh();
        console.log(err);
      });
  },

  bindCateByID: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/postsList/posts?id=' + id,
    });
  }
})