var formatNumber = function (n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

/** 
* 时间戳转化为年 月 日 时 分 秒 
* number: 传入时间戳 
* format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatDate(date, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var newDate = new Date(date);
  var timeArr = [
    newDate.getFullYear(),
    formatNumber(newDate.getMonth() + 1),
    formatNumber(newDate.getDate()),
    formatNumber(newDate.getHours()),
    formatNumber(newDate.getMinutes()),
    formatNumber(newDate.getSeconds())
  ];
  for (var i = 0; i < timeArr.length; i++) {
    format = format.replace(formateArr[i], timeArr[i]);
  }
  return format;
}

module.exports = {
  formatDate: formatDate,
};