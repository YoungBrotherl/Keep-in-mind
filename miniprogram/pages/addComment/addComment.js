// miniprogram/pages/addComment/addComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
    comment: '',
  },

  // 上传图片
  onUploadImg: function () {
    let _this = this,
    img = _this.data.img;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          img: res.tempFilePaths[0]
        })
      }
    })

  },

  // 输入评论
  changeText: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },

  // 保存
  onSave: function() {
    wx.showLoading();
    let _this = this,
        img = _this.data.img,
        comment = _this.data.comment;
    if (!img) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none',
      })
      return;
    }
    if (!comment) {
      wx.showToast({
        title: '请填写内容',
        icon: 'none',
      })
      return;
    }
    let cloudPath = Date.now() + img.match(/\.[^.]+?$/)[0];
    
    wx.cloud.uploadFile({
      cloudPath: cloudPath, // 上传至云端的路径
      filePath: img, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        _this.addToDB(res.fileID)
      },
      fail: console.error
    })
  },

  // 数据存到数据库
  addToDB: function (fileID) {
    let _this = this;

    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: 'add',
        img: fileID,
        comment: _this.data.comment,
        saveType: 'comment',
      },
      success(res) {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
          icon: 'success',
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      },
      fail: console.error
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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