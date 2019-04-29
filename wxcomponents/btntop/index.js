Component({
  properties: {
    showbtntop: {
      type: Boolean,
      value: true,
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
		scrollTop(){
			wx.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		}
  }
})