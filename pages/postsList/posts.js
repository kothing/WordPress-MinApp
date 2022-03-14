/**
 * Author: NiceBoy
 * Github 地址: https://github.com/kothing/Wordress-MiniProgram
 */
// pages/postsList/posts.js
import API from '../../utils/api';

const requestType = {
  all: {
    title: '列表',
    api: 'getPostsList'
  },
  id: {
    title: '',
    api: 'getPostsList'
  },
  search: {
    title: '',
    api: 'getPostsList'
  },
  sticky: {
    title: '置顶文章',
    api: 'getStickyPosts'
  },
  rand: {
    title: '随机文章',
    api: 'getRandPosts'
  },
  related: {
    title: '相关文章',
    api: 'getRelatedPosts'
  },
  mostViews: {
    title: '热门阅读',
    api: 'getMostViewsPosts'
  },
  mostFav: {
    title: '热门收藏',
    api: 'getMostFavPosts'
  },
  mostLike: {
    title: '热门点赞',
    api: 'getMostLikePosts'
  },
  mostComment: {
    title: '热门评论',
    api: 'getMostCommentPosts'
  },
  recentComment: {
    title: '最新评论',
    api: 'getRecentCommentPosts'
  },
  userFav: {
    title: '我的收藏',
    api: 'getUserFavPosts'
  },
  userLike: {
    title: '我的点赞',
    api: 'getUserLikePosts'
  },
  userComments: {
    title: '我的评论',
    api: 'getUserCommentsPosts'
  }
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    siteInfo: '',
    title: '',
    page: 1,
    posts: [],
    isLoadAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    });
    this.getSiteInfo();
    this.getAdvert();
    // 类目文章列表
    if (options.id) {
      this.getPostsList('id', {
        categories: options.id,
        page: this.data.page
      });
      this.setData({
        title: '类目'
      });
      this.getCategoryByID(options.id);
    }
    // 搜索文章列表
    if (options.s) {
      this.getPostsList('search', {
        search: options.s,
        page: this.data.page
      });
      this.setData({
        title: '关键词“' + options.s + '”的结果'
      });
      wx.setNavigationBarTitle({
        title: '关键词:' + options.s
      });
    }
    // 类型(置顶文章 | 随机文章 | 相关文章 | 热门阅读文章 | 热门收藏文章 | 热门点赞文章 | 热门评论文章 | 最新评论文章)
    if (options.type) {
      const title = (requestType[options.type] && requestType[options.type].title) || '';
      this.getPostsList(options.type);
      this.setData({
        title
      });
      wx.setNavigationBarTitle({
        title
      });
    }
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
      page: 1,
    });
    if (this.data.options.id) {
      this.getPostsList('id', {
        categories: this.data.options.id
      });
    }
    if (this.data.options.s) {
      this.getPostsList('search', {
        search: this.data.options.s
      });
    }
    if (this.data.options.type) {
      this.getPostsList(this.options.type);
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.isLastPage) {
      this.setData({
        isBottom: true
      });
      if (this.data.options.id) {
        this.getPostsList('id', {
          categories: this.data.options.id,
          page: this.data.page + 1
        });
      }
      if (this.data.options.s) {
        this.getPostsList('search', {
          search: this.data.options.s,
          page: this.data.page + 1
        });
      }
      if (this.data.options.type) {
        this.getPostsList(this.options.type, {
          page: this.data.page + 1
        });
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取小程序信息
   */
  getSiteInfo: function () {
    API.getSiteInfo().then(res => {
      this.setData({
        siteInfo: res
      });
    })
      .catch(err => {
        console.log(err)
      });
  },

  /**
   * 获取分类信息
   */
  getCategoryByID: function (id) {
    API.getCategoryByID(id).then(res => {
      this.setData({
        title: res.name
      });
      wx.setNavigationBarTitle({
        title: res.name
      });
    })
      .catch(err => {
        console.log(err)
      });
  },

  // 文章列表
  getPostsList: function (type, data) {
    const requestApi = type && requestType[type] && requestType[type].api ? requestType[type].api : requestType.all.api;
    this.setData({
      loading: true
    });
    setTimeout(() => {
      wx.showLoading({
        title: 'Loading'
      });
    }, 100);
    API[requestApi](data).then(res => {
      wx.hideLoading();
      let args = {};
      if (res.length < 10) {
        this.setData({
          isLastPage: true,
          loadtext: '到底啦',
          showloadmore: false
        })
      }
      if (this.data.isBottom) {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1;
      } else {
        args.posts = res || [];
        args.page = 1;
      }
      this.setData({
        ...args,
        loading: false
      });
      wx.stopPullDownRefresh();
    })
      .catch(err => {
        wx.hideLoading();
        this.setData({
          loading: false
        });
        wx.stopPullDownRefresh();
        console.log(err);
      })
  },

  getAdvert: function () {
    API.listAdsense().then(res => {
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

  bindDetail: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/post/post?id=' + id,
    })
  }

})
