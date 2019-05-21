const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const userData={
  userID:"",
  userType:'',
  userStatus:'',
  driver:0,
  repeatPosition:'', //任务路径经纬度上报信息定时ID
  singlePosition:'', //司机空闲中的经纬度上报定时ID
  longitude:0,
  latitude: 0,
  openid:'',
  requestUrl:'http://127.0.0.1/mfunhcu/l1mainentry/cloud_callback_wechart_xcx_lsg.php',  //本地请求地址
  uploadFile: 'http://127.0.0.1/upload/xcxUploadFile.php',                                //本地请求地址  
  filePath: 'http://127.0.0.1/upload',                                //本地请求地址  

  // requestUrl: 'http://47.101.139.189/mfunhcu/l1mainentry/cloud_callback_wechart_xcx_lsg.php', //小慧HOME
  // uploadFile: 'http://47.101.139.189/upload/xcxUploadFile.php',                               //小慧HOME
  // filePath: 'http://47.101.139.189/upload',                                //小慧HOME

  // requestUrl: 'https://ngrok2.hkrob.com/mfunhcu/l1mainentry/cloud_callback_wechart_xcx_lsg.php', //小慧TEST
  // uploadFile: 'https://ngrok2.hkrob.com/upload/xcxUploadFile.php',                               //小慧TEST
  // filePath: 'https://ngrok2.hkrob.com/upload',                                                    //小慧TEST
};

module.exports = {
  formatTime: formatTime,
  userData:userData
}
