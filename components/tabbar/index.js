// components/addProps/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbarList: [
      { title: 'first', key: 0 },
      { title: 'second', key: 1 },
      { title: 'third', key: 2 },
    ],
    currentKey: 0,
    currentContent: 'first'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTab(e) {
      const index = e.target.dataset.index
      if(this.data.currentKey === index) {
        return
      }
      this.setData({
        currentKey: index,
        currentContent: this.data.tabbarList[index].title
      })
    }
  }
})
