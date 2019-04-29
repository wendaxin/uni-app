let obj = {}

obj.set = function(key, data) {
	let _data = JSON.stringify(data)
	uni.setStorage({
		key,
		data: _data
	})
}

obj.get = function(key) {
	var abc

	try {
		abc = uni.getStorageSync(key);
		if (abc) {
			abc = JSON.parse(abc)
		}
	} catch (e) {}
	return abc
}

// 保存地址信息
obj.setlocation = function(opinfo) {
	this.set('loca', opinfo)
}

// 获取地址信息
obj.getlocation = function() {
	return this.get('loca')
}

// 保存购物车信息
obj.setshop = function(data) {
	this.set('shop', data)
}

// 添加购物车信息
obj.addshop = function(data) {
	var arr = this.getshop() || [],
		Bool = arr.some(i => {
			return i.id === data.id
		})

	if (Bool) {
		arr = arr.map(i => {
			i.id === data.id ? i.num++ : "不相等"
			return i
		})
	} else {
		data.num = 1
		arr.push(data)
	}
	this.setshop(arr)
}

// 获取购物车信息
obj.getshop = function() {
	return this.get('shop')
}

export default obj
