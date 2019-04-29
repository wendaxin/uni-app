Component({
  properties: {
    list: {
      type: Array,
      value: [],
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
		skip(e){
			let {clr,id} = e.target.dataset
			wx.navigateTo({
				url: `/pages/shopdetails/shopdetails?id=${id}&clr=${clr}`
			})
		}
  }
})