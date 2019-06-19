// miniprogram/pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    active: false,
    btnShow: false,
    isGet: true,
  },

  // 点击按钮跳转
  onBtn: function (e) {
    let type = e.currentTarget.dataset.type,
        url = [
          '/pages/addDigest/addDigest',
          '/pages/addComment/addComment',
          ''
        ],
        _this = this;
    if (type == '2' || type == '0') {
      wx.showToast({
        title: '该功能还未完成哦',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: url[type],
    })

    setTimeout(function() {
      _this.setData({
        active: false
      })
    }, 0)
  },

  // 显示/隐藏按钮
  onToggle: function () {
    this.setData({
      active: !this.data.active
    })
  },

  // 跳转详情页
  goDetails: function (e) {
    let index = e.currentTarget.dataset.index,
        _this = this,
        list = _this.data.list,
        id = list[index]._id;
    wx.navigateTo({
      url: '/pages/details/details?id=' + id+'',
    })
  },

  // 云文件 ID 换取真实链接
  dealData: function (data, callback) {
    let len = data.length,
        fileList = [];
    // 获取ID数组
    for(let i = 0; i < len; i ++) {
      // 时间戳转换日期
      let timestamp = data[i].time,
        date = new Date(timestamp);

      data[i].timeInfo = {
        year: date.getFullYear(),
        month: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
        date: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        hour: date.getHours(),
        min: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
      }

      // if (data[i].saveType == 'digest') {
      //   console.log(data[i].bookInfo)
      //   data[i].bookInfo = JSON.stringify(data[i].bookInfo)
      // }

      fileList.push(data[i].img ? data[i].img : '')
    }
    wx.cloud.getTempFileURL({
      fileList: fileList,
      success: res => {
        // 获取返回真实链接数组
        let fileList = res.fileList;
        // 数据ID替换为真实链接
        for(let i = 0; i < len; i ++) {
          data[i].img = fileList[i].tempFileURL
        }
        console.log(data)
        callback(data);
      },
      fail: err => {
      }
    })
  },

  // 获取数据
  getData: function () {
    wx.showLoading();
    let _this = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: 'get'
      },
      success(res) {
        wx.hideLoading();
        _this.dealData(res.result.data, function(data) {
          _this.setData({
            btnShow: true,
            list: data
          })
        })
      },
      fail: console.error
    })
  },

  // 查看图片
  seeImg: function(e) {
    let url = e.currentTarget.dataset.url;
    this.setData({
      isGet: false
    })
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },

  // 获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log(res)
        wx.setStorage({
          key: 'openId',
          data: res.result.openid,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getOpenid()
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
    if(this.data.isGet) {
      this.getData();
    } else {
      this.setData({
        isGet: true
      })
    }
    
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