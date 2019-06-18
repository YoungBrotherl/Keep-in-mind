// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 添加神评论
function addComment(event, context) {
  let data = {
    comment: event.comment,
    time: Date.now(),
    openid: event.userInfo.openId,
    saveType: event.saveType,
  }
  if (event.saveType == 'comment') {
    data.img = event.img;
  } else {
    data.bookInfo = event.bookInfo;
  }
  return new Promise(function (resolve, reject) {
    db.collection('comment').add({
      data: data,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 获取评论列表
function getData(event, context) {
  return db.collection('comment').where({
    openid: event.userInfo.openId
  }).get()
}

// 获取详情
function getDetails(event, context) {
  return db.collection('comment').doc(event.id).get()
}

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.type == 'get') {
    return getData(event, context)
  } else if (event.type == 'add') {
    return addComment(event, context)
  } else if (event.type == 'getDetails') {
    return getDetails(event, context)
  }
}