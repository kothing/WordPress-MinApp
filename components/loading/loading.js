// components/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {             // 属性名
      type: String,     // 类型（必填）
      value: 'Loading'  // 属性初始值（可选）
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 弹窗显示控制
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //展示
    showLoading() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //隐藏
    hideLoading() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
