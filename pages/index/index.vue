<template>
	<mybody title="首页">
		<myseek></myseek>
		
		<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item>
				<image class="item" src="/static/img/swiper-item1.jpg" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image class="item" src="/static/img/swiper-item2.jpg" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image class="item" src="/static/img/swiper-item3.jpg" mode=""></image>
			</swiper-item>
		</swiper>
		
		<ul class="list">
			<li
				class="item" 
				v-for='(i,index) in list'
				:key="index"
			>
				<view class="img" :class="i.classname"></view>
				<text class="text">{{i.text}}</text>
			</li>
		</ul>
		
		<ul class="info">
			<li class="item" v-for="(i,index) in showinfo" :key="index">
				<view class="img" :class="i.classname"></view>
				<view class="text">
					<text class="title">{{i.title}}</text>
					<text class="discount">{{i.discount}}</text>
				</view>
			</li>
		</ul>
		
		<btntop :showbtntop="showbtntop"></btntop>
	</mybody>
</template>

<script>
	export default {
		data() {
			return {
				showbtntop: false,
				list: [
					{
						text: '女装',
						classname: 'nvz'
					},
					{
						text: '男装',
						classname: 'nanz'
					},
					{
						text: '鞋包',
						classname: 'xieb'
					},
					{
						text: '手表配饰',
						classname: 'shoub'
					},
					{
						text: '内衣',
						classname: 'neiy'
					},
					{
						text: '运动户外',
						classname: 'yund'
					},
					{
						text: '童装童鞋',
						classname: 'tongz'
					},
					{
						text: '面部护肤',
						classname: 'mianb'
					},
					{
						text: '国际品牌',
						classname: 'guoj'
					},
					{
						text: '品牌馆',
						classname: 'pinp'
					}
				],
				info: [
					{
						classname: 'a',
						title: '荣耀HONOR手机专场',
						discount: '5.4折起'
					},
					{
						classname: 'b',
						title: '美的Midea厨电专场',
						discount: '1.7折起'
					},
					{
						classname: 'c',
						title: '小米手机专场',
						discount: '5折起'
					},
					{
						classname: 'd',
						title: 'vivo手机套餐专场',
						discount: '7.2折起'
					},
					{
						classname: 'e',
						title: '飞利浦Philios小家电精选推荐专场',
						discount: '1.7折起'
					},
					{
						classname: 'f',
						title: '苹果APPLE手机套餐专场',
						discount: '4.8折起'
					},
					{
						classname: 'g',
						title: '早春尚新 潮男先型',
						discount: '0.7折起'
					},
					{
						classname: 'h',
						title: 'BEATS时尚耳机专场',
						discount: '4.7折起'
					},
					{
						classname: 'i',
						title: '奢布士男女装闪降专场-今日大牌',
						discount: '1.4折起'
					}
				],
				showinfo: [],
				num: 0
			}
		},
		onReachBottom(){
			this.num += 1
			if(this.num < 4){
				uni.showLoading({
					title: '加载中'
				});
				
				setTimeout( ()=> {
					this.showinfo = this.info.slice(0,3*this.num)
					uni.hideLoading();
				}, 800);
			}else{
				uni.showToast({
					title: "u_u没有了啦",
					duration: 1000,
					icon: "none"
				});
			}
		},
		onPageScroll (obj){
			if(obj.scrollTop>420){
				this.showbtntop = true
			}else{
				this.showbtntop = false
			}
		},
		onLoad(){
			this.num += 1
			this.showinfo = this.info.slice(0,3*this.num)
		},
		methods:{
			scrollTop(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		}
	}
</script>

<style lang="less">
.swiper{
	height: 360upx;
	.item{
		width: 100%;
		height: 100%;
	}
}
.list{
	width: 100%;
	display: flex;
	flex-flow: row wrap;
	.item{
		width: 20%;
		height: 168upx;
		padding-top: 18px;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		.img{
			width: 98upx;
			height: 98upx;
		}
		.text{
			font-size: 24upx;
			color: #2F2F2F;
			flex-grow: 1;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
		}
		.nvz{
			background: url(../../static/img/classify_1.png) no-repeat;
			background-size: 98upx 98upx;
		}
		.nanz{
			background: url(../../static/img/classify_2.png) no-repeat;
			background-size: 98upx 98upx;
		}
		.xieb{
			background: url(../../static/img/classify_3.png) no-repeat;
			background-size: 98upx 98upx;
		}
		.shoub{
			background: url(../../static/img/classify_4.png) no-repeat;
			background-size: 98upx 98upx;
		}
		.neiy{
			background: url(../../static/img/classify_5.png) no-repeat;
			background-size: 98upx 98upx;
		}
		.yund{
			background: url(../../static/img/classify_6.png) no-repeat;
			background-size: 98upx 98upx;
		}
		.tongz{
			background: url(../../static/img/classify_7.png) no-repeat;
			background-size: 98upx 98upx;
		}
		.mianb{
			background: url(../../static/img/classify_8.png) no-repeat;
			background-size: 98upx 98upx;
		}
		.guoj{
			background: url(../../static/img/classify_9.png) no-repeat;
			background-size: 98upx 98upx;
		}
		.pinp{
			background: url(../../static/img/classify_10.png) no-repeat;
			background-size: 98upx 98upx;
		}
	}
}
.info{
	background: #F3F4F5;
	padding: 0 24upx;
	display: flex;
	flex-flow: column nowrap;
	padding-bottom: 22upx;
	.item{
		margin-top: 22upx;
		width: 100%;
		height: 468upx;
		border-radius: 30upx;
		display: flex;
		flex-flow: column nowrap;
		z-index: 100;
		overflow: hidden;
		.img{
			height: 336upx;
		}
		.a{
			background: url(../../static/img/info_1.jpg) no-repeat;
			background-size: 100%;
		}
		.b{
			background: url(../../static/img/info_2.jpg) no-repeat;
			background-size: 100%;
		}
		.c{
			background: url(../../static/img/info_3.jpg) no-repeat;
			background-size: 100%;
		}
		.d{
			background: url(../../static/img/info_4.jpg) no-repeat;
			background-size: 100%;
		}
		.e{
			background: url(../../static/img/info_5.jpg) no-repeat;
			background-size: 100%;
		}
		.f{
			background: url(../../static/img/info_6.jpg) no-repeat;
			background-size: 100%;
		}
		.g{
			background: url(../../static/img/info_7.jpg) no-repeat;
			background-size: 100%;
		}
		.h{
			background: url(../../static/img/info_8.jpg) no-repeat;
			background-size: 100%;
		}
		.i{
			background: url(../../static/img/info_9.jpg) no-repeat;
			background-size: 100%;
		}
		.text{
			background: #FFFFFF;
			padding-left: 10upx;
			display: flex;
			flex-grow: 1;
			flex-flow: column nowrap;
			justify-content: space-around;
			.title{
				font-size: 28upx;
				color: #222222;
			}
			.discount{
				font-size: 22upx;
				color: #DF4198;
			}
		}
	}
}


</style>
