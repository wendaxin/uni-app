Component({
  properties: {
    list: {
      type: Object,
      value: {},
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    tapskip(event) {
			if(event.target.dataset.hi === '苹果'){
				wx.redirectTo({
					url: '../shoplist/shoplist'
				})
			}
		}
  }
	
})