/**
 * Author: NiceBoy
 * Github 地址: https://github.com/kothing/Wordress-MiniProgram
 */
const API = require('../../utils/api')

Page({

  data: {
    posts: [],
    page: 1,
    siteInfo: '',
    category: '',
    indicatorDots: !1,
    autoplay: !0,
    interval: 3e3,
    currentSwiper: 0,
    navBarHeight: wx.getSystemInfoSync().statusBarHeight,
    placeHolder: '搜索、文章、图片、视频',
    autoFocus: false,
    inputEnable: true,
    isLastPage: false
  },

  onLoad: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (a) {
        that.setData({
          isIphoneX: a.model.match(/iPhone X/gi)
        });
      }
    });
    this.getSiteInfo();
    this.getStickyPosts();
    this.getCategories();
    this.getAdvert();
    this.getPostList();
    this.getMostViewsPosts()
    // this.getCategoryByID({per_page:'id'})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 小程序跳转
  onJump: function () {
    wx.navigateTo({
      url: '/pages/mostpost/index',
    })
  },
  onJumps: function () {
    wx.navigateToMiniProgram({
      appId: '',
      path: '',
      extraData: {

      },
      success(res) {
        // 打开成功
      }
    })
  },
  // 打开栏目
  bindCateLists: function () {
    wx.navigateToMiniProgram({
      appId: '',
      path: '',
      extraData: {

      },
      success(res) {
        // 打开成功
      }
    })
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

  onClear: function () {
    this.setData({
      searchKey: '',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      posts: [],
      isLastPage: false
    })
    this.getPostList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.isLastPage) {
      this.getPostList({
        page: this.data.page
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.siteInfo.name,
      path: '/pages/index/index'
    }
  },

  getSiteInfo: function () {
    API.getSiteInfo().then(res => {
      this.setData({
        siteInfo: res
      })
    })
      .catch(err => {
        console.log(err)
      })
  },

  onInput: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
  },

  currentChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  },

  getStickyPosts: function () {
    API.getStickyPosts().then(res => {
      this.setData({
        stickyPost: res
      })
    })
      .catch(err => {
        console.log(err)
      })
  },

  getCategories: function (args) {
    API.getCategories(args).then(res => {
      this.setData({
        category: res
      })
    })
      .catch(err => {
        console.log(err)
      })
  },
  // 热门文章
  getMostViewsPosts: function (args) {
    API.getMostViewsPosts(args).then(res => {
      this.setData({
        mostviewsposts: res
      })
    })
      .catch(err => {
        console.log(err)
      })
  },
  // 页面
  getPageByID: function (id) {
    API.getPageByID(id).then(res => {
      this.setData({
        pagebyid: res
      })
    })
      .catch(err => {
        console.log(err)
      })
  },
  getPostList: function (data) {
    API.getPostsList(data).then(res => {
      let args = {}
      if (res.length < 10) {
        this.setData({
          isLastPage: true,
          loadtext: '到底啦',
          showloadmore: false
        })
      }
      if (this.data.isBottom) {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      } else {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      }
      this.setData(args)
      wx.stopPullDownRefresh()
    })
      .catch(err => {
        console.log(err)
        wx.stopPullDownRefresh()
      })
  },

  getAdvert: function () {
    API.indexAdsense().then(res => {
      console.log(res)
      if (res.status === 200) {
        this.setData({
          advert: res.data
        })
      }
    })
      .catch(err => {
        console.log(err)
      })
  },

  bindCateByID: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/list/list?id=' + id,
    })
  },

  bindCateList: function () {
    wx.switchTab({
      url: '/pages/category/category',
    })
  },

  bindDetail: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  onConfirm: function (e) {
    let s = e.detail.value;
    wx.navigateTo({
      url: '/pages/list/list?s=' + s,
    })
  }

})
