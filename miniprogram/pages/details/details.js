// miniprogram/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {}
  },

  // 获取数据
  getDetails: function (id) {
    wx.showLoading();
    let _this = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: 'getDetails',
        id: id
      },
      success(res) {
        console.log(res.result.data)
        _this.setData({
          details: res.result.data
        })
        wx.hideLoading();
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetails(options.id)
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
    let details = this.data.details;
    if (details.saveType == 'comment') {
      return {
        title: details.comment
      }
    } else {
      return {
        title: '读书心得'
      }
    }
    
  }
})