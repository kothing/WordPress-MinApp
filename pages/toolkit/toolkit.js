// pages/toolkit/toolkit.js
/**
 * Author: NiceBoy
 * Github 地址: https://github.com/kothing/Wordress-MiniProgram
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    this.loading = this.selectComponent("#loading");
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
   *  展示弹框
   * ===================================
   */
  showDialog() {
    this.dialog.showDialog();
  },

  // 弹框取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },

  // 弹框确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  },



  /**
   *  展示Loading
   * ===================================
   */
  showLoading() {
    const _this = this;
    this.loading.showLoading();
    setTimeout(() => {
      _this.loading.hideLoading();
    }, 1500);
  },

})