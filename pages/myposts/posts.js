// pages/myposts/posts.js
/**
 * Author: NiceBoy
 * Github 地址: https://github.com/kothing/Wordress-MiniProgram
 */
const API = require('../../utils/api')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    page: 1,
    posts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })
    if (options.id == 1) {
      this.setData({
        category: '我的点赞'
      })
      wx.setNavigationBarTitle({
        title: '我的点赞'
      })
      this.getLikePosts();
    } else if (options.id == 2) {
      this.setData({
        category: '我的收藏'
      })
      wx.setNavigationBarTitle({
        title: '我的收藏'
      })
      this.getFavPosts();
    } else if (options.id == 3) {
      this.setData({
        category: '我的评论'
      })
      wx.setNavigationBarTitle({
        title: '我的评论'
      })
      this.getCommentsPosts();
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
      isPull: true,
      isLastPage: false,
      isBottom: false
    })
    if (this.data.options.id == 1) {
      this.getLikePosts();
    } else if (this.data.options.id == 2) {
      this.getFavPosts();
    } else if (this.data.options.id == 3) {
      this.getCommentsPosts();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({ 
      isBottom: true
     });
    if (!this.data.isLastPage) {
      if (this.data.options.id == 1) {
        this.getLikePosts({ 
          page: this.data.page + 1
        });
      } else if (this.data.options.id == 2) {
        this.getFavPosts({ 
          page: this.data.page + 1
        });
      } else if (this.data.options.id == 3) {
        this.getCommentsPosts({ 
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

  getLikePosts: function (args) {
    this.setData({
      loading: true,
    });
    API.getLikePosts(args).then(res => {
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
        args.posts = res || [];
        args.page = 1
      }
      this.setData({
        ...args,
        loading: false
      });
    })
    .catch(err => {
      this.setData({
        loading: false
      });
      console.log(err)
      wx.stopPullDownRefresh()
    });
  },

  getFavPosts: function (args) {
    this.setData({
      loading: true,
    });
    API.getFavPosts(args).then(res => {
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
        args.page = this.data.page + 1;
      } else {
        args.posts = res || [];
        args.page = 1;
      }
      this.setData({
        ...args,
        loading: false
      });
    })
    .catch(err => {
      this.setData({
        loading: false
      });
      console.log(err)
      wx.stopPullDownRefresh()
    });
  },

  getCommentsPosts: function (args) {
    this.setData({
      loading: true,
    });
    API.getCommentsPosts(args).then(res => {
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
        args.posts = res || [];
        args.page = 1
      }
      this.setData({
        ...args,
        loading: false
      });
    })
    .catch(err => {
      this.setData({
        loading: false
      });
      console.log(err)
      wx.stopPullDownRefresh()
    });
  },

  bindDetail: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  }
})
