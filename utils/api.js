/**
 * Author: NiceBoy
 * Github 地址: https://github.com/kothing/Wordress-MiniProgram
 */

const API = require('./base')

// 小程序基本信息
const getSiteInfo = function (data) {
	return API.get('/wp-json/mp/v1/setting', data);
}

/**
 * 文章 API
 * ==================
 */

// 文章列表
const getPostsList = function (data) {
	return API.get('/wp-json/wp/v2/posts', data, { token: true });
}

// 置顶文章
const getStickyPosts = function (data) {
	return API.get('/wp-json/mp/v1/posts/sticky', data);
}

// 随机文章
const getRandPosts = function (data) {
	return API.get('/wp-json/mp/v1/posts/rand', data);
}

// 相关文章
const getRelatedPosts = function (data) {
	return API.get('/wp-json/mp/v1/posts/relate', data);
}

// 热门阅读（文章）
const getMostViewsPosts = function (data) {
	return API.get('/wp-json/mp/v1/posts/most?meta=views', data);
}

// 热门收藏（文章）
const getMostFavPosts = function (data) {
	return API.get('/wp-json/mp/v2/posts/most?meta=favs', data);
}

// 热门点赞（文章）
const getMostLikePosts = function (data) {
	return API.get('/wp-json/mp/v2/posts/most?meta=likes', data);
}

// 热门评论（文章）
const getMostCommentPosts = function (data) {
	return API.get('/wp-json/mp/v2/posts/most?meta=comments', data);
}

// 最新评论（文章）
const getRecentCommentPosts = function (data) {
	return API.get('/wp-json/mp/v1/posts/comment', data);
}


/**
 * 文章详情 API
 */
const getPostsByID = function (id) {
	return API.get('/wp-json/wp/v2/posts/' + id, {}, { token: true });
}


/**
 * 页面 API
 */
// 页面列表
const getPagesList = function (data) {
	return API.get('/wp-json/wp/v2/pages', data);
}

// 页面详情
const getPageByID = function (id) {
	return API.get('/wp-json/wp/v2/pages/' + id);
}


/**
 * 类目 API
 * ==================
 */

// 分类列表
const getCategories = function (data) {
	return API.get('/wp-json/wp/v2/categories?orderby=id&order=asc', data);
}

// 分类信息
const getCategoryByID = function (id) {
	return API.get('/wp-json/wp/v2/categories/' + id);
}


/**
 * 标签 API
 * ==================
 */
// 标签列表
const getTags = function (data) {
	return API.get('/wp-json/wp/v2/tags?orderby=id&order=asc', data);
}

// 标签信息
const getTagByID = function (id) {
	return API.get('/wp-json/wp/v2/tags/' + id);
}


/**
 * 评论 API
 * ==================
 */
// 评论
const getComments = function (data) {
	return API.get('/wp-json/mp/v1/comments', data);
}

// 收藏评论
const getFavComments = function (data) {
	return API.post('/wp-json/mp/v1/comments?type=fav', data, { token: true });
}

// 点赞评论
const getLikeComments = function (data) {
	return API.post('/wp-json/mp/v1/comments?type=like', data, { token: true });
}

// 发布评论
const addComment = function (data) {
	return API.post('/wp-json/mp/v1/comments?type=comment', data, { token: true });
}


/**
 * User评论文章 API
 * ==================
 */

// 收藏列表
const getUserFavPosts = function (data) {
	return API.get('/wp-json/mp/v1/posts/comment?type=fav', data, { token: true });
}

// 点赞列表
const getUserLikePosts = function (data) {
	return API.get('/wp-json/mp/v1/posts/comment?type=like', data, { token: true });
}

// 评论列表
const getUserCommentsPosts = function (data) {
	return API.get('/wp-json/mp/v1/posts/comment?type=comment', data, { token: true });
}


/**
 * 订阅消息 API
 * ==================
 */

const subscribeMessage = function (data) {
	return API.post('/wp-json/mp/v1/subscribe', data, { token: true });
}


/**
 * 二维码 API
 * ==================
 */
const getCodeImg = function (data) {
	return API.post('/wp-json/mp/v1/qrcode', data, { token: false });
}


/**
 * 导航菜单 API
 * ==================
 */
const getMenuSetting = function (data) {
	return API.get('/wp-json/mp/v1/menu', data);
}


/**
 * 广告 API
 * ==================
 */
// 首页广告
const indexAdsense = function (data) {
	return API.get('/wp-json/mp/v1/advert/wechat?type=index', data);
}

// 列表广告
const listAdsense = function (data) {
	return API.get('/wp-json/mp/v1/advert/wechat?type=list', data);
}

// 详情广告
const detailAdsense = function (data) {
	return API.get('/wp-json/mp/v1/advert/wechat?type=detail', data);
}

// 页面广告
const pageAdsense = function (data) {
	return API.get('/wp-json/mp/v1/advert/wechat?type=page', data);
}



/**
 * 推文 API
 * ==================
 */
// 推文列表(需要安装插件)
const getTwitterPosts = function (data) {
	return API.get('/wp-json/wp/v2/tweets', data);
}

// 推文详情(需要安装插件)
const getTwitterDetail = function (id) {
	return API.get('/wp-json/wp/v2/tweets/' + id, {}, {
		token: true
	});
}


/**
 * 评论点赞 API
 * ==================
 */
const markComment = function (args) {
	return API.post('/wp-json/mp/v1/comments/mark', args, {
		token: true,
	});
}

// 注销登录
const Loginout = function () {
	return API.logout();
}

API.getSiteInfo = getSiteInfo;
API.getStickyPosts = getStickyPosts;
API.getPostsList = getPostsList;
API.getPostsByID = getPostsByID;
API.getPagesList = getPagesList;
API.getPageByID = getPageByID;
API.getCategories = getCategories;
API.getCategoryByID = getCategoryByID;
API.getTags = getTags;
API.getTagByID = getTagByID;
API.getRandPosts = getRandPosts;
API.getRelatedPosts = getRelatedPosts;
API.getMostViewsPosts = getMostViewsPosts;
API.getMostFavPosts = getMostFavPosts;
API.getMostLikePosts = getMostLikePosts;
API.getMostCommentPosts = getMostCommentPosts;
API.getRecentCommentPosts = getRecentCommentPosts;
API.getComments = getComments;
API.getFavComments = API.guard(getFavComments);
API.getLikeComments = API.guard(getLikeComments);
API.getUserFavPosts = API.guard(getUserFavPosts);
API.getUserLikePosts = API.guard(getUserLikePosts);
API.getUserCommentsPosts = API.guard(getUserCommentsPosts);
API.addComment = API.guard(addComment);
API.subscribeMessage = API.guard(subscribeMessage);
API.getCodeImg = getCodeImg;
API.Loginout = Loginout;
API.getMenuSetting = getMenuSetting;
API.indexAdsense = indexAdsense;
API.listAdsense = listAdsense;
API.detailAdsense = detailAdsense;
API.pageAdsense = pageAdsense;
API.getTwitterPosts = getTwitterPosts;
API.getTwitterDetail = getTwitterDetail;
API.markComment = API.guard(markComment);

module.exports = API;