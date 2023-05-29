// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'bishe-2gzem6jbbfcfaed5'
})

// 云函数入口函数
exports.main = async (event, context) => {
 return cloud.database().collection("news").orderBy('number','desc').get()
}