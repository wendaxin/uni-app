<template>
	<mybody title="购物车">
		<view class="top">配送至{{region}}</view>

		<view class="car" v-show="hascar">
			<image class="img" src="../../static/car.jpg" mode=""></image>
			<view class="text">购物车空空如也</view>
			<view class="btn" @click="rouetr">继续逛逛</view>
		</view>

		<view v-show="hasshop">
			<ul class="list">
				<li class="it" v-for="(i,index) in shop" :key="index">
					<image :src="i.img" mode="widthFix" class="img"></image>
					<view class="left">
						<view class="big">{{i.text}}</view>
						<view class="btn">
							<view class="l" @click="fac(i.id,i.num)">-</view>
							<view class="center">{{i.num}}</view>
							<view class="r" @click="march(i.id)">+</view>
						</view>
					</view>
					<view class="right">
						<text class="money">￥{{i.price_1}}</text>
						<view class="del" @click="changeMask(i.id)">x</view>
					</view>
				</li>
			</ul>
			
			<view class="margin"></view>
			
			<view class="bottom">
				<view class="text">
					总金额:<text class="red">￥{{total}}</text>
				</view>
				<view class="btn" @click="tishi">
					结算
				</view>
			</view>
			
			<view v-show="showMask">
				<view class="mask"></view>
				<view class="pop">
					<view class="top">
						确定要删除么
					</view>
					<view class="left" @click="hideMask">
						先留着
					</view>
					<view class="right" @click="delshow">
						删除
					</view>
				</view>
			</view>
		</view>
	</mybody>
</template>

<script>
	import getinfo from '../../static/storage.js'
	export default {
		data() {
			return {
				region: '',
				shop: [],
				showMask: false,
				delId: 0
			};
		},
		onLoad() {
			let loca = getinfo.getlocation() || []
			
			this.shop = getinfo.getshop() || []
			loca.length !== 0 ? this.region = loca[0].value+loca[1].value+loca[2].value : this.region = ''
		},
		onShow(){
			let loca = getinfo.getlocation() || []
			
			this.shop = getinfo.getshop() || []
			loca.length !== 0 ? this.region = loca[0].value+loca[1].value+loca[2].value : this.region = ''
		},
		methods:{
			rouetr(){
				uni.navigateTo({
					url: '../shoplist/shoplist'
				});
			},
			fac(id,num){
				if(num>1){
					this.shop = this.shop.map(i=>{
						i.id === id ? i.num-- : i.num
						return i
					})
					getinfo.setshop(this.shop)

				}
			},
			march(id){
				this.shop = this.shop.map(i=>{
						i.id === id ? i.num++ : i.num
						return i
				})
				getinfo.setshop(this.shop)
	
			},
			changeMask(id){
				this.delId = id
				this.showMask = true
			},
			hideMask(){
				this.showMask = false
			},
			delshow(){
				this.showMask = false
				this.shop = this.shop.filter(i=>{
					return i.id !== this.delId
				})
				getinfo.setshop(this.shop)

			},
			tishi(){
				uni.showToast({
					title: "没有页面辣！",
					duration: 2000,
					icon: "none"
				});
			}
		},
		computed: {
			total(){
				return this.shop.reduce((acc,i)=>{
					return acc+i.num*i.price_1
				},0)
			},
			hascar(){
				return !Boolean(this.shop.length)
			},
			hasshop(){
				return Boolean(this.shop.length)
			}
		}
	}
</script>

<style lang="less">
	.top {
		line-height: 40upx;
		border-bottom: 26upx solid #F3F4F5;
		font-size: 24upx;
		font-weight: 600;
		color: #000;
		text-align: center;
	}

	.list {
		padding: 0 26upx;

		.it {
			height: 316upx;
			border-top: 1upx solid #F3F4F5;
			border-bottom: 1upx solid #F3F4F5;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-around;
			.img {
				width: 134upx;
				height: 134upx;
				flex-shrink: 1;
			}

			.left {
				padding: 0 10upx;
				width: 60%;
				flex-shrink: 1;

				.big {
					line-height: 38upx;
					font-size: 28upx;
					margin-bottom: 20upx;
				}

				.btn {
					display: flex;
					flex-flow: row nowrap;
					.l,
					.r {
						width: 60upx;
						text-align: center;
						border: 1upx solid #F3F4F5;
						line-height: 50upx;
						font-size: 36upx;
						color: #83878F;
					}

					.center {
						width: 66upx;
						line-height: 50upx;
						font-size: 36upx;
						text-align: center;
						color: #83878F;
					}

					.active {
						color: #DBDBDF;
					}
				}

			}

			.right {
				flex-shrink: 1;
				height: 140upx;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				.money {
					font-size: 28upx;
					font-weight: 600;
					text-align: right;
				}

				.del {
					font-size: 36upx;
					color: #B4B5B9;
					text-align: right;
				}
			}

		}

	}
	.margin{
		width: 100%;
		height: 196upx;
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750upx;
		height: 196upx;
		.text{
			text-align: center;
			line-height: 90upx;
			font-size: 34upx;
			color: #73767D;
			.red{
				color: #E4007F;
				font-weight: 600;
			}
		}
		.btn{
			width: 696upx;
			margin: auto;
			border-radius: 10upx;
			background: #E4007F;
			line-height: 88upx;
			text-align: center;
			color: #fff;
			font-size: 36upx;
		}
	}
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 750upx;
		height: 100vh;
		background: #000;
		opacity: 0.6;
	}
	.pop{
		position: fixed;
		top: 40vh;
		left: 75upx;
		width: 600upx;
		height: 20vh;
		background: #fff;
		border-radius: 10upx;
		display: flex;
		flex-flow: row wrap;
		overflow: hidden;
		.top{
			height: 60%;
			width: 100%;
			border-bottom: 1upx solid #83878F;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
		}
		.left, .right{
			height: 40%;
			width: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24upx;
			color: rgb(66,151,252);
		}
	}
	.car{
		width: 750upx;
		height: 650upx;
		box-sizing: border-box;
		padding: 68upx 188upx 0;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		.img{
			width: 315upx;
			height: 350upx;
		}
		.text{
			font-size: 30upx;
			line-height: 90upx;
		}
		.btn{
			width: 370upx;
			height: 80upx;
			line-height: 80upx;
			border: 2upx solid #E4007F;
			border-radius: 10upx;
			text-align: center;
			font-size: 28upx;
			color: #E4007F;
		}
	}
</style>
