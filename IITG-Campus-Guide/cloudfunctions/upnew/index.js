// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("news")
  .doc(event.id)
  .update({
    data: {
      title:event.title,
      jpg:event.jpg,
      number:event.number,
      time:event.time,
      news:event.news
    }

  })
}