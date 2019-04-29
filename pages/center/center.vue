<template>
	<mybody title="个人中心">
		<view class="vip">
			<view class="headPortrait"></view>
			<view class="content">
				<text class="big">会员</text>
				<view class="icon"></view>
				<text class="small">银卡会员</text>
			</view>
			<view class="switch">
				<view class="icon"></view>
				<text class="text">切换账号</text>
			</view>
		</view>

		<myul>
			<myli class="list_a" v-for="(i,index) in collect" :key="index">
				<view class="icon" :class="i.icon"></view>
				<view class="text">{{i.text}}</view>
			</myli>
		</myul>

		<view class="notice">
			<view class="icon_l"></view>
			<swiper class="sw" :vertical="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item>
					<view class="swiper-item">1111</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">22222</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">333333</view>
				</swiper-item>
			</swiper>
			<view class="icon_r"></view>
		</view>

		<view class="await">
			<myul>
				<myli class="item" v-for="(i,index) in wait_a" :key="index">
					<view class="icon" :class="i.icon"></view>
					<view class="text">{{i.text}}</view>
				</myli>
			</myul>
		</view>
		
		<view class="harvest">
			<myul>
				<myli class="item" v-for="(i,index) in harvest" :key="index">
					<view class="icon" :class="i.icon"></view>
					<view class="text">{{i.text}}</view>
				</myli>
			</myul>
		</view>
		
		<view class="my">
			<myul>
				<myli class="item" v-for="(i,index) in my" :key="index">
					<view class="icon" :class="i.icon"></view>
					<view class="text">{{i.text}}</view>
				</myli>
			</myul>
		</view>
		
		<view class="advertising"></view>
	</mybody>
</template>

<script>
	export default {
		data() {
			return {
				my: [{
						icon: 'a',
						text: '硬币'
					},
					{
						icon: 'b',
						text: '我的拼团'
					},
					{
						icon: 'c',
						text: '关于唯品'
					}
				],
				harvest: [{
						icon: 'a',
						text: '收获地址'
					},
					{
						icon: 'b',
						text: '会员俱乐部'
					},
					{
						icon: 'c',
						text: '唯品客服'
					},
					{
						icon: 'd',
						text: '优惠卷'
					}
				],
				wait_a: [{
						icon: 'a',
						text: '待付款'
					},
					{
						icon: 'b',
						text: '待收货'
					},
					{
						icon: 'c',
						text: '退换/售后'
					},
					{
						icon: 'd',
						text: '全部订单'
					}
				],
				collect: [{
						icon: 'a',
						text: '商品收藏'
					},
					{
						icon: 'b',
						text: '品牌收藏'
					},
					{
						icon: 'c',
						text: '店铺收藏'
					},
					{
						icon: 'd',
						text: '浏览足迹'
					}
				]
			};
		}
	}
</script>

<style lang="less">
	.vip {
		height: 162upx;
		border-bottom: 1upx solid #F2F2F2;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;

		.headPortrait {
			margin: 0 28upx;
			width: 110upx;
			height: 110upx;
			background: url(../../static/center_img/cencer_1.png) no-repeat;
			background-size: 100%;
		}

		.content {
			flex-grow: 1;
			display: flex;
			height: 110upx;
			align-items: center;
			flex-flow: row wrap;

			.big {
				width: 100%;
				line-height: 56upx;
				font-size: 44upx;
				color: #222222;
			}

			.icon {
				width: 32upx;
				height: 32upx;
				background: url(../../static/center_img/cencer_2.png) no-repeat;
				background-size: 100%;
				margin-right: 10upx;
			}

			.small {
				line-height: 32upx;
				font-size: 30upx;
				color: #9999A0;
			}
		}

		.switch {
			width: 142upx;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;

			.icon {
				width: 22upx;
				height: 22upx;
				background: url(../../static/center_img/cencer_3.png) no-repeat;
				background-size: 100%;
				margin-right: 10upx;
			}

			.text {
				font-size: 22upx;
				color: #222222;
			}
		}
	}

	.list_a {
		width: 25%;

		.icon {
			width: 44upx;
			height: 44upx;
			margin: 35upx 0 14upx;
		}

		.a {
			background: url(../../static/center_img/cencer_4.png) no-repeat;
			background-size: 100%;
		}

		.b {
			background: url(../../static/center_img/cencer_5.png) no-repeat;
			background-size: 100%;
		}

		.c {
			background: url(../../static/center_img/cencer_6.png) no-repeat;
			background-size: 100%;
		}

		.d {
			background: url(../../static/center_img/cencer_7.png) no-repeat;
			background-size: 100%;
		}

		.text {
			color: #98989F;
			font-size: 26upx;
		}
	}

	.notice {
		height: 60upx;
		border-bottom: 20upx solid #F2F2F2;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;

		.icon_l {
			width: 62upx;
			height: 36upx;
			background: url(../../static/center_img/cencer_8.png) no-repeat;
			background-size: 100%;
			margin: 0 28upx;
		}

		.sw {
			height: 60upx;
			font-size: 20upx;
			line-height: 60upx;
			color: #3E3E3E;
			flex-grow: 1;
		}

		.icon_r {
			width: 18upx;
			height: 20upx;
			margin-right: 40upx;
			background: url(../../static/center_img/cencer_9.png) no-repeat;
			background-size: 100%;
		}
	}

	.await {
		border-bottom: 20upx solid #F2F2F2;

		.item {
			width: 25%;

			.icon {
				width: 44upx;
				height: 44upx;
				margin: 35upx 0 14upx;
			}

			.a {
				background: url(../../static/center_img/cencer_10.png) no-repeat;
				background-size: 100%;
			}

			.b {
				background: url(../../static/center_img/cencer_11.png) no-repeat;
				background-size: 100%;
			}

			.c {
				background: url(../../static/center_img/cencer_12.png) no-repeat;
				background-size: 100%;
			}

			.d {
				background: url(../../static/center_img/cencer_13.png) no-repeat;
				background-size: 100%;
			}

			.text {
				color: #98989F;
				font-size: 26upx;
			}
		}
	}
	
	.harvest {
		border-bottom: 1upx solid #F2F2F2;
	
		.item {
			width: 25%;
	
			.icon {
				width: 44upx;
				height: 44upx;
				margin: 35upx 0 14upx;
			}
	
			.a {
				background: url(../../static/center_img/cencer_14.png) no-repeat;
				background-size: 100%;
			}
	
			.b {
				background: url(../../static/center_img/cencer_15.png) no-repeat;
				background-size: 100%;
			}
	
			.c {
				background: url(../../static/center_img/cencer_16.png) no-repeat;
				background-size: 100%;
			}
	
			.d {
				background: url(../../static/center_img/cencer_17.png) no-repeat;
				background-size: 100%;
			}
	
			.text {
				color: #98989F;
				font-size: 26upx;
			}
		}
	}
	
	.my {
		border-bottom: 20upx solid #F2F2F2;
	
		.item {
			width: 25%;
	
			.icon {
				width: 44upx;
				height: 44upx;
				margin: 35upx 0 14upx;
			}
	
			.a {
				background: url(../../static/center_img/cencer_18.png) no-repeat;
				background-size: 100%;
			}
	
			.b {
				background: url(../../static/center_img/cencer_19.png) no-repeat;
				background-size: 100%;
			}
	
			.c {
				background: url(../../static/center_img/cencer_20.png) no-repeat;
				background-size: 100%;
			}
	
			.text {
				color: #98989F;
				font-size: 26upx;
			}
		}
	}
	
	.advertising{
		width: 100%;
		height: 220upx;
		background: url(../../static/center_img/cencer_21.jpg) no-repeat;
		background-size: 100%;
	}
</style>
