Component({
	properties: {
		showbk: {
			type: Boolean,
			value: false
		},
		title: String
	},
	data: {
		navH: 0
	},
	methods: {
		// 这里是一个自定义方法
		navBack: function () {
        wx.navigateBack({
          delta: 1
        })      
    }
	},
	lifetimes: {
		attached() {
			wx.getSystemInfo({
				success: res => {
					this.setData({
						navH: res.statusBarHeight + 46
					})
				}
			})
		}
	}
})
