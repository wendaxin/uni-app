<template>
	<mybody title="分类">
		<view class="body">
			<myseek></myseek>
		
			<view class="wrap">
				<scroll-view class="left" scroll-y>
					<view class="item" v-for="(i,index) in classify" :key="index" :class="isactive === i.id ? 'active' : ''" @click="showshop(i.id)">{{i.text}}</view>
				</scroll-view>
		
				<scroll-view class="right" scroll-y>
					<myshoplist :list="i" v-for="(i,index) in shoplist" :key="index"></myshoplist>
				</scroll-view>
			</view>
		</view>
	</mybody>
</template>

<script>
	export default {
		data() {
			return {
				shoplist: [],
				isactive: 0,
				classify: [{
						id: 0,
						text: '为你推荐'
					},
					{
						id: 1,
						text: '女装'
					},
					{
						id: 2,
						text: '男装'
					},
					{
						id: 3,
						text: '男女内衣'
					},
					{
						id: 4,
						text: '女鞋'
					},
					{
						id: 5,
						text: '男鞋'
					},
					{
						id: 6,
						text: '箱包皮具'
					},
					{
						id: 7,
						text: '手表配饰'
					},
					{
						id: 8,
						text: '护肤彩妆'
					},
					{
						id: 9,
						text: '个人护理'
					},
					{
						id: 10,
						text: '母婴'
					},
					{
						id: 11,
						text: '运动户外'
					},
					{
						id: 12,
						text: '手机数码'
					},
					{
						id: 13,
						text: '家用电器'
					},
					{
						id: 14,
						text: '家居家纺'
					},
					{
						id: 15,
						text: '家具家装'
					},
					{
						id: 16,
						text: '生活超市'
					}
				]
			};
		},
		methods: {
			showshop(id) {
				this.isactive = id
				let num = id === 0 ? 0 : 1;
				uni.request({
					url: `https://www.easy-mock.com/mock/5cb03f83f593356878131486/wph/shoplist/${num}`,
					method: 'GET',
					success: res => {
						this.shoplist = res.data.data
					}
				});
			}
		},
		onLoad() {
			uni.request({
				url: 'https://www.easy-mock.com/mock/5cb03f83f593356878131486/wph/shoplist/0',
				method: 'GET',
				success: res => {
					this.shoplist = res.data.data
				}
			});
		}
	}
</script>

<style lang="less">
	.body {
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-flow: column nowrap;
	}

	.wrap {
		flex-grow: 1;
		display: flex;
		flex-flow: row nowrap;

		.left {
			flex-shrink: 0;
			width: 172upx;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			background: #F6F6F7;

			view {
				text-align: center;
				line-height: 94upx;
				margin: 0 26upx;
				height: 94upx;
				border-bottom: 2upx solid #E8EAEC;
				font-size: 28upx;
				color: #585C64;
			}

			.active {
				background: #FFFFFF;
				margin: 0;
				border-left: 8upx solid #DE3D96;
				border-right: 8upx solid transparent;
				border-bottom: 2upx solid transparent;
			}

			::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
			}


		}

		.right {
			background: #FFFFFF;

			::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
			}

		}
	}
</style>
