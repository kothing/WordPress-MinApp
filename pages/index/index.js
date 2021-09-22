/**
 * Author: NiceBoy
 * Github 地址: https://github.com/kothing/Wordress-MiniProgram
 */
const app = getApp();
const API = require('../../utils/api');

Page({
  data: {
    siteInfo: '',
    user: app.globalData.user,
    stickyLoading: false,
    listLoading: false,
    stickyPost: [],
    posts: [],
    page: 1,
    category: [],
    indicatorDots: !1,
    autoplay: !0,
    interval: 3e3,
    currentSwiper: 0,
    navBarHeight: wx.getSystemInfoSync().statusBarHeight,
    placeHolder: '搜索、文章、图片、视频',
    autoFocus: false,
    inputEnable: true,
    isLastPage: false,
    tabsLoading: false,
    tabs: [],
    tabsPaneData: [],
    activeTab: 0,
  },

  onLoad: function () {
    let _this = this;
    wx.getSystemInfo({
      success: function (a) {
        _this.setData({
          isIphoneX: a.model.match(/iPhone X/gi)
        });
      }
    });
    this.getSiteInfo();
    this.getStickyPosts();
    this.getCategories();
    this.getPostsList();
    this.getAdvert();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 热门日志
  bindHotPosts: function () {
    wx.navigateTo({
      url: `/pages/postsList/posts?type=mostViews`,
    });
  },

  // 打开小程序
  toMiniProgram: function () {
    wx.navigateToMiniProgram({
      appId: 'wxa01e1baa46426a94',
      path: '',
      extraData: {

      },
      success(res) {
        // 打开成功
      }
    })
  },

  // 打开页面
  bindPageLists: function () {
    wx.navigateTo({
      url: '/pages/pagesList/pages',
    });
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
      isLastPage: false
    });
    this.getStickyPosts();
    this.getPostsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.isLastPage) {
      this.setData({
        isBottom: true
      });
      this.getPostsList({
        page: this.data.page + 1
      });
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

  /**
   * 获取小程序信息
   */
  getSiteInfo: function () {
    API.getSiteInfo().then(res => {
      this.setData({
        siteInfo: res
      })
    })
      .catch(err => {
        console.log(err)
      });
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
    this.setData({
      stickyLoading: true
    });
    API.getStickyPosts().then(res => {
      this.setData({
        stickyLoading: false,
        stickyPost: res || []
      });
    })
      .catch(err => {
        this.setData({
          stickyLoading: false,
        });
        console.log(err)
      })
  },

  getCategories: function (args) {
    API.getCategories(args).then(res => {
      this.setData({
        category: res,
        tabs: res.map((item, index) => ({
          ...item,
          title: item.name,
          index
        }))
      }, () => {
        this.getPostsListById(res[0].id);
      });
    })
      .catch(err => {
        console.log(err)
      });
  },

  getPostsList: function (data) {
    this.setData({
      listLoading: true,
    });
    API.getPostsList(data).then(res => {
      let args = {};
      if (res.length < 10) {
        this.setData({
          isLastPage: true,
          loadtext: '到底啦',
          showloadmore: false
        });
      }
      if (this.data.isBottom) {
        args.posts = [].concat(this.data.posts, res);
        args.page = this.data.page + 1;
      } else {
        args.posts = res || [];
        args.page = 1;
      }
      this.setData({
        ...args,
        listLoading: false
      });
      wx.stopPullDownRefresh();
    })
      .catch(err => {
        this.setData({
          listLoading: false
        });
        console.log(err);
        wx.stopPullDownRefresh();
      });
  },

  getPostsListById: function(id) {
    this.setData({
      tabsLoading: true,
    });
    API.getPostsList({
      categories: id
    }).then(res => {
      this.setData({
        tabsPaneData: res || [],
        tabsLoading: false
      });
    })
      .catch(err => {
        this.setData({
          tabsLoading: false
        });
        console.log(err);
      });
  },

  onTabClick: function(e) {
    const { index, item } = e.detail;
    this.setData({ 
      activeTab: index
    });
    this.getPostsListById(item.id);
  },

  onTabChange: function(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },

  getAdvert: function () {
    API.indexAdsense().then(res => {
      if (res.status === 200) {
        this.setData({
          advert: res.data
        });
      }
    })
      .catch(err => {
        console.log(err)
      });
  },

  bindCateByID: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/postsList/posts?id=' + id,
    });
  },

  bindCateList: function () {
    wx.switchTab({
      url: '/pages/category/category',
    });
  },

  bindDetail: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/post/post?id=' + id,
    });
  },

  onConfirm: function (e) {
    let s = e.detail.value;
    wx.navigateTo({
      url: '/pages/postsList/posts?s=' + s,
    });
  },
})
