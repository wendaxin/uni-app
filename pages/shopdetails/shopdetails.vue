<template>
	<mybody :showbk="true">
		<swiper class="swiper" :circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(i,index) in showswiper" :key="index">
				<image class="swiper-item" :src="i"></image>
			</swiper-item>
		</swiper>

		<view class="textinfo">
			<view class="top">
				<view class="a">￥{{textinfo.price_1}}</view>
				<view class="b">￥{{textinfo.price_2}}</view>
				<view class="c">{{textinfo.price_3}}折</view>
			</view>
			<view class="bottom">{{textinfo.text}}</view>
		</view>

		<view class="color" v-if="oldclr !== '' ">
			<view class="top">颜色</view>
			<view class="bottom">
				<view @click="changeClr(i.clr)" class="item" :class="i.clr === oldclr ? 'active' : '' " v-for="(i,index) in color"
				 :key="index">{{i.text}}</view>
			</view>
		</view>

		<view class="region" @click="showpopup">
			<view class="top">配送至</view>
			<view class="bottom">
				<view class="text">{{location}}</view>
				<view class="img"></view>
			</view>
		</view>

		<view v-show="showcp">
			<view class="cloth" @click="hidepopup"></view>
			<view class="popup">
				<view class="top">
					<view class="back_img" @click="hidepopup"></view>
					<view class="text">修改收货地址</view>
				</view>
				<view class="option">
					<view class="title" @click="changeOp(i.id)" :class="{'active':opnum === i.id}" v-for="(i,index) in optionText"
					 :key="index">{{i.text}}</view>
				</view>
				<scroll-view class="height" scroll-y>
					<view class="scroll">
						<view class="item" :class="{'active': opinfo[opnum].label === i.label}" @click="nextop(i.label,i.value)" v-for="(i,index) in oparr"
						 :key="index">{{i.value}}</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="exhibition">
			<image class="img" mode="widthFix" :src="i" v-for="(i,index) in img" :key="index"></image>
		</view>

		<view class="fiexd">
			<view class="left" @click="inshop">
				<view class="img"></view>
				<view class="qiu" v-show="num">{{num}}</view>
			</view>
			<view class="right" @click="addshop(showswiper[0],id,textinfo)">加入购物车</view>
		</view>
	</mybody>
</template>

<script>
	import cache from '../../static/storage.js'
	export default {
		data() {
			return {
				optionText: [{
					id: 0,
					text: '省'
				}, {
					id: 1,
					text: '市'
				}, {
					id: 2,
					text: '区'
				}],
				location: '',
				opnum: 0,
				opinfo: [],
				oparr: [],
				oparrA: [],
				oparrB: [],
				oparrC: [],
				region: [],
				showcp: false,
				id: '',
				swiper: [],
				showswiper: [],
				color: [],
				img: [],
				textinfo: {},
				oldclr: '',
				num: 0
			};
		},
		methods: {
			inshop() {
				uni.switchTab({
					url: '/pages/shopcart/shopcart'
				});
			},
			addshop(img, id, obj) {
				let bool = Boolean(cache.getlocation()),
					data = {
						...obj,
						img,
						id
					}
				
				if (bool) {
					cache.addshop(data)
					this.num++
				} else {
					uni.showToast({
						title: "请设置地址",
						duration: 3000,
						icon: "none"
					});
				}
			},
			changeOp(id) {
				this.opnum = id
				switch (id) {
					case 0:
						this.oparr = this.oparrA
						break;
					case 1:
						this.oparr = this.oparrB
						break;
					case 2:
						this.oparr = this.oparrC
						break;
					default:
						break;
				}
			},
			changeClr(clr) {
				uni.redirectTo({
					url: `/pages/shopdetails/shopdetails?id=${this.id}&clr=${clr}`
				});
			},
			showpopup() {
				this.showcp = true
				if (!this.opinfo.length) {
					this.oparr = this.region.map(i => {
						return {
							value: i.value,
							label: i.label
						}
					})
					this.oparrA = this.oparr
				}
			},
			nextop(la, va) {
				switch (this.opnum) {
					case 0:
						this.opnum++
						this.opinfo = [{
							label: la,
							value: va
						}]
						this.oparr = this.region.filter(i => {
							return i.label === la
						})[0].children.map(i => {
							return {
								label: i.label,
								value: i.value
							}
						})
						this.oparrB = this.oparr
						this.oparrC = []
						break;
					case 1:
						this.opnum++
						this.opinfo.splice(1)
						this.opinfo.push({
							label: la,
							value: va
						})
						this.oparr = this.region.filter(i => {
							return i.label === this.opinfo[0].label
						})[0].children.filter(i => {
							return i.label === la
						})[0].children
						this.oparrC = this.oparr
						break;
					case 2:
						this.opinfo.splice(2)
						this.opinfo.push({
							label: la,
							value: va
						})
						this.location = this.opinfo[0].value + this.opinfo[1].value + this.opinfo[2].value
						this.showcp = false
						cache.setlocation(this.opinfo)
						break;
					default:
						break;
				}
			},
			hidepopup() {
				this.showcp = false

			}
		},
		onLoad(e) {
			let {
				clr,
				id
			} = e,
			loca = cache.getlocation()
			let shopcar = cache.getshop() || []
			
			uni.request({
				url: `https://www.easy-mock.com/mock/5cb03f83f593356878131486/wph/shopinfo/${id}`,
				success: res => {
					let {
						viewpager,
						color,
						img,
						price_1,
						price_2,
						price_3,
						text
					} = res.data.info
					this.id = id
					this.oldclr = clr
					this.swiper = viewpager
					this.color = color
					this.img = img
					this.textinfo = {
						price_1,
						price_2,
						price_3,
						text
					}
					this.showswiper = this.oldclr === '' ? this.swiper[0].arr : this.swiper.filter(i => {
						return i.clr === this.oldclr
					})[0].arr
				}
			});
			new Promise((resolve, reject)=>{
				uni.request({
					url: `https://www.easy-mock.com/mock/5cb03f83f593356878131486/region`,
					success: res => {
						this.region = res.data.data
						resolve()
					}
				})
			}).then(()=>{
				if (loca) {
					this.opnum = 2
					this.opinfo = loca
					this.oparrA = this.region.map(i => {
						return {
							value: i.value,
							label: i.label
						}
					})
					this.oparrB = this.region.filter(i => {
						return i.label === this.opinfo[0].label
					})[0].children.map(i => {
						return {
							label: i.label,
							value: i.value
						}
					})
					
					this.oparrC = this.region.filter(i => {
						return i.label === this.opinfo[0].label
					})[0].children.filter(i => {
						return i.label === this.opinfo[1].label
					})[0].children
					this.oparr = this.oparrC
					this.location = this.opinfo[0].value + this.opinfo[1].value + this.opinfo[2].value

				}
			})
			
			shopcar.length !== 0 ? this.num = shopcar.reduce((acc,i)=>{return acc + i.num},0) : this.num = 0
		},
		onShow(){
			let shopcar = cache.getshop() || []
			shopcar.length !== 0 ? this.num = shopcar.reduce((acc,i)=>{return acc + i.num},0) : this.num = 0
		}
	}
</script>

<style lang="less">
	.swiper {
		height: 590upx;

		.swiper-item {
			width: 100%;
			height: 100%;
		}
	}

	.textinfo {
		padding-bottom: 30upx;
		display: flex;
		flex-flow: column nowrap;
		padding: 20upx;

		.top {
			height: 90upx;
			display: flex;
			flex-flow: row nowrap;
			align-items: baseline;

			.a {
				font-size: 46upx;
				font-weight: 600;
				line-height: 90upx;
				padding-right: 10upx;
			}

			.b {
				font-size: 28upx;
				color: #98989F;
				text-decoration: line-through;
				padding-right: 10upx;
			}

			.c {
				font-size: 28upx;
				color: #98989F;
			}
		}

		.bottom {
			font-size: 28upx;
			font-weight: 600;
			line-height: 36upx;
		}
	}

	.color {
		padding-top: 20upx;
		padding-bottom: 20upx;
		border-top: 24upx solid #F3F4F5;
		border-bottom: 24upx solid #F3F4F5;

		.top {
			line-height: 60upx;
			font-size: 28upx;
			font-weight: 600;
			padding-left: 20upx;
		}

		.bottom {
			display: flex;
			flex-flow: row wrap;
			padding: 0 30upx;

			.item {
				min-width: 30%;
				margin: 10upx;
				font-size: 24upx;
				border: 2upx solid #000;
				border-radius: 10upx;
				line-height: 60upx;
				text-align: center;
			}

			.active {
				color: #E4007F;
				border: 2upx solid #E4007F;
				background: #FDF2F8;
			}
		}
	}

	.region {
		padding: 20upx;

		.top {
			line-height: 70upx;
			font-size: 28upx;
			font-weight: 600;
		}

		.bottom {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;

			.text {
				font-size: 26upx;
				color: rgb(88, 92, 100)
			}

			.img {
				width: 26upx;
				height: 26upx;
				background: url(../../static/shopdetails/icon_1.png) no-repeat;
				background-size: 100%;
			}
		}
	}

	.cloth {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: #000;
		opacity: 0.6;
	}

	.popup {
		z-index: 100;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		width: 100%;
		height: 60vh;
		display: flex;
		flex-flow: column nowrap;

		.top {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;

			.back_img {
				width: 40upx;
				height: 50upx;
				margin: 0 20upx;
				background: url(../../static/back.png) no-repeat;
				background-size: 100%;
			}

			.text {
				line-height: 100upx;
				font-size: 36upx;
				text-align: center;
				flex-grow: 1;
				margin-right: 80upx;
			}
		}

		.option {
			display: flex;
			flex-flow: row nowrap;

			.title {
				line-height: 60upx;
				min-width: 30%;
				text-align: center;
				font-size: 30upx;
				flex: 1;
				border-bottom: 1upx solid rgb(204, 204, 204);
			}

			.active {
				color: rgb(181, 0, 100);
				border-bottom-color: rgb(181, 0, 100);
			}
		}

		.height {
			height: 48vh;

			.scroll {
				display: flex;
				box-sizing: border-box;
				flex-flow: row wrap;

				.item {
					width: 200upx;
					line-height: 70upx;
					font-size: 30upx;
					padding: 0 6upx;
					text-align: center;
					border: 2upx solid rgb(204, 204, 204);
					border-radius: 10upx;
					margin: 10upx 16upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.active {
					color: #E4007F;
					border: 2upx solid #E4007F;
				}
			}
		}

		::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
		}
	}

	.exhibition {
		display: flex;
		flex-flow: column nowrap;

		.img {
			width: 100%;
		}
	}

	.fiexd {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120upx;
		background: #fff;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;

		.left {
			border: 1upx solid rgb(225, 225, 225);
			border-radius: 8upx;
			width: 200upx;
			height: 80upx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			.img{
				width: 140upx;
				height: 56upx;
				background: url(../../static/shopdetails/icon_2.png) no-repeat;
				background-size: 100%;
			}
			.qiu{
				position: absolute;
				left: 200upx;
				top: 10upx;
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
				background: #E4007F;
				font-size: 28upx;
				color: #fff;
				text-align: center;
			}
		}

		.right {
			border: 1upx solid rgb(225, 225, 225);
			border-radius: 8upx;
			width: 480upx;
			height: 80upx;
			background: rgb(220, 60, 150);
			color: #fff;
			font-size: 36upx;
			text-align: center;
			line-height: 80upx;
		}
	}
</style>
