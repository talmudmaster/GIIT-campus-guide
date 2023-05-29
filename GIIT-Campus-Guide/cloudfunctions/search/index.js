// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log("123456", event)
  //输入框的值
  let key = event.value;
  const _ = db.command
  return db.collection('markers').where(_.or([{
      text: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      address: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      mptype: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    }
  ])).get()

}