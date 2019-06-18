// miniprogram/pages/addDigest/addDigest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanResult: {
      charSet: 'UTF-8',
      errMsg: 'scanCode:ok',
      rawData: 'OTc4NzExNTQyNzg2Mq==',
      result: '9787115427861', // ISBN
      sacnType: 'EAN_13',
    },
    bookInfo: {},
    comment: '',
  },

  // 调取二维码
  code:function () {
    let _this = this;
    // 允许从相机和相册扫码
    setTimeout(function(){
      wx.scanCode({
        success(res) {
          console.log(res)
          _this.getBookInfo(res.scanResult.result)
        },
        fail(err) {
          wx.navigateTo({
            url: '/pages/list/list',
          })
        }
      })
    }, 500)
  },

  // 输入评论
  changeText: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },

  // 保存
  onSave: function () {
    let _this = this,
      comment = _this.data.comment;
    if (!comment) {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
      })
      return;
    }
    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: 'add',
        bookInfo: _this.data.bookInfo,
        comment: _this.data.comment,
        saveType: 'digest',
      },
      success(res) {
        _this.setData({
          comment: ''
        })
        wx.showToast({
          title: '保存成功',
          icon: 'success',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      },
      fail: console.error
    })
  },

  // 获取图书信息
  getBookInfo: function (ISBN) {
    let _this = this;
    wx.showLoading();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getBookInfo',
      // 传给云函数的参数
      data: {
        ISBN: ISBN
      },
      success(res) {
        console.log(JSON.parse(res.result))
        let data = _this.dealData(JSON.parse(res.result));
        _this.setData({
          bookInfo: data
        })
        wx.hideLoading();
      },
      fail: console.error
    })
  },

  // 处理作者数组
  dealData: function (data) {
    data.author = data.author.join(' / ');
    return data;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.code()
    // this.getBookInfo(this.data.scanResult.result)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})