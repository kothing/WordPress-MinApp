/**
 * Author: NiceBoy
 * Github 地址: https://github.com/kothing/Wordress-MiniProgram
 */

const API_HOST = 'https://works.nice-boy.com'  // https 协议Wordpress网站,
import Auth from './auth';

const templates = {
	comments: ['', ''], // 评论回复与审核模板ID
	subscribe: [''] // 资讯更新提醒模板ID
}

const API = {}

API.getHost = function () {
	return API_HOST;
}

API.template = function () {
	return templates;
}

API.request = function (url, method = "GET", data = {}, args = { token: true }) {

	return new Promise(function (resolve, reject) {

		url = API_HOST + url;

		if (args.token) {
			const token = API.token();
			if (token) {
				if (url.indexOf("?") > 0) {
					url = url + '&access_token=' + token;
				} else {
					url = url + '?access_token=' + token;
				}
			} else {
				console.warn('[提示]', '部分数据需要授权，检测出当前访问用户未授权登录小程序');
			}
		}
		wx.request({
			url: url,
			data: data,
			method: method,
			success: function (res) {
				if (res.statusCode == 200) {
					resolve(res.data);
				} else if (res.data.code === "rest_post_invalid_page_number") {
					wx.showToast({
						title: '没有更多内容',
						mask: false,
						duration: 1000
					});
				} else {
					wx.showToast({
						title: "请求数据出错",
						icon: 'loading',
						duration: 1500
					});
					reject(res.data);
				}
			},
			fail: function (err) {
				console.log(err);
				reject(err);
			}
		})
	});

}

API.get = function (url, data = {}, args = { token: false }) {
	return API.request(url, "GET", data, args);
}

API.post = function (url, data, args = { token: true }) {
	return API.request(url, "POST", data, args);
}

API.getUser = function () {
	if (Auth.check()) {
		return Auth.user();
	} else {
		return false;
	}
}

API.login = function () {
	return new Promise(function (resolve, reject) {
		if (Auth.check()) {
			resolve(Auth.user());
		} else {
			Auth.login().then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			})
		}
	});
}

API.logout = function () {
	if (Auth.logout()) {
		getApp().globalData.user = '';
	} else {
		wx.showToast({
			title: '注销失败!',
			icon: 'loading',
			duration: 1000,
		})
	}
}

API.getUserProfile = function () {
	return new Promise(function (resolve, reject) {
		Auth.getUserInfo().then(data => {
			API.post('/wp-json/mp/v1/user/login', data, { token: false }).then(res => {
				API.storageUser(res);
				resolve(res.user);
			}, err => {
				reject(err);
			});
		})
			.catch(err => {
				reject(err);
			})
	});
}

API.token = function () {
	let token = Auth.token();
	let datetime = Date.now();
	if (token && datetime < wx.getStorageSync('expired_in')) {
		return token;
	} else {
		return false;
	}
}

API.storageUser = function (res) {
	getApp().globalData.user = res.user;
	wx.setStorageSync('user', res.user);
	wx.setStorageSync('openid', res.openid);
	if (res.access_token) {
		wx.setStorageSync('token', res.access_token);
		wx.setStorageSync('expired_in', res.expired_in);
	}
}

API.guard = function (fn) {
	const _this = this
	return function () {
		if (API.getUser()) {
			return fn.apply(_this, arguments);
		} else {
			return API.getUserProfile().then(res => {
				console.log('登录成功', res);
				return fn.apply(_this, arguments);
			}, err => {
				console.log('登录失败', err);
				return err;
			})
		}
	}
}

export default API