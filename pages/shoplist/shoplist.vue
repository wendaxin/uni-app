<template>
	<mybody :showbk="true" title="苹果">
		<view class="top">
			<view class="option" :style="optionH">
				<view class="item" v-for="(i,index) in options" :key="index" @click="action(i.action,index)">
					<text :class="[showOption === index&&i.changeNum%3 !== 0 ? 'red' : '',i.textclass]">{{i.text}}</text>
					<view class="icon" :class="i.classname"></view>
				</view>
			</view>
		
			<mylist :list="showlist"></mylist>
		
			<btntop :showbtntop="showbtntop"></btntop>
		</view>
	</mybody>
</template>

<script>
	export default {
		data() {
			return {
				optionH: 0,
				showbtntop: false,
				list: [],
				showlist: [],
				showOption: -1,
				options: [{
						text: "价格",
						textclass: '',
						classname: "a",
						action: 'changePrice',
						changeNum: 0
					},
					{
						text: "折扣",
						textclass: '',
						classname: "b",
						action: 'changeHaircut',
						changeNum: 0
					},
					{
						text: "品牌",
						classname: "c",
						textclass: 'td',
						action: '',
						changeNum: 0
					},
					{
						text: "筛选",
						classname: "d",
						textclass: 'td',
						action: '',
						changeNum: 0
					},
				]
			};
		},
		methods: {
			action(action, index) {
				uni.showLoading({
					title: ''
				});
				
				uni.pageScrollTo({
					scrollTop: 0
				});
				
				switch (action) {
					case 'changePrice':
						this.action_logic(action, index,'price_1')
						break;
					case 'changeHaircut':
						this.action_logic(action, index,'price_3')
						break;
					default:
						break;
				}
				setTimeout( ()=> {
					uni.hideLoading();
				}, 100);
				
			},
			action_logic(action,index,price){
				this.showOption = index
				this.options = this.options.map(i => {
					i.action === action ? i.changeNum++ : i.changeNum = 0
					return i
				})
				let num = this.options[index].changeNum % 3
				switch (num) {
					case 0:
						this.onrequest()
					break;
					case 1:
						this.list = this.list.sort((a,b)=>{
							return Number(a[price])-Number(b[price])
						})
					break;
					case 2:
						this.list = this.list.sort((a,b)=>{
							return Number(b[price])-Number(a[price])
						})
					break;
					default:
						break;
				}
				this.showlist = this.list.slice(0, 6)
			},
			onrequest(){
				uni.request({
					url: 'https://www.easy-mock.com/mock/5cb03f83f593356878131486/wph/shop',
					success: (res) => {
						this.list = res.data.list
						this.showlist = this.list.slice(0, 6)
					}
				})
			}
		},
		onPageScroll(obj) {
			if (obj.scrollTop > 420) {
				this.showbtntop = true
			} else {
				this.showbtntop = false
			}
		},
		onReachBottom() {
			let bl = this.list.length > this.showlist.length
			if (bl) {
				uni.showLoading({
					title: ''
				});

				setTimeout(() => {
					this.showlist = this.list.slice(0, 8)
					uni.hideLoading();
				}, 100);
			} else {
				uni.showToast({
					title: "没有了",
					duration: 1000,
					icon: "none"
				});
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					console.log(res.statusBarHeight);
					this.optionH = `top: ${res.statusBarHeight + 46 + 60}rpx`
				}
			})
			this.onrequest()
		}
	}
</script>

<style lang="less">
	.top {
		padding-top: 81upx;
	}
	
	.option {
		height: 81upx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		border-bottom: 1upx solid #DDDDDD;
		position: fixed;
		left: 0;
		z-index:1;
		width:100%;
		background: #FFFFFF;

		.item {
			flex: 1;
			height: 30upx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			font-size: 30upx;
			border-right: 1upx solid #E5E5E5;
		}

		.icon {
			margin-left: 10upx;
			width: 24upx;
			height: 30upx;
		}

		.red {
			color: rgb(232, 85, 181;
			);
		}

		.a,
		.b {
			background: url(../../static/shoplist/icon_1.png) no-repeat;
			background-size: 100%;
		}

		.c {
			background: url(../../static/shoplist/icon_2.png) no-repeat;
			background-size: 100%;
		}

		.d {
			background: url(../../static/shoplist/icon_3.png) no-repeat;
			background-size: 100%;
		}
		.td {
			text-decoration: line-through;
			color: rgb(200, 200, 200)
		}
	}
</style>
