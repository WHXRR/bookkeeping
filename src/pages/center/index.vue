<template>
	<view class="person-center">
		<view class="person-info">
			<image class="avatar" src="/static/images/4.jpg" mode="widthFix"></image>
			<view class="p-t-10">测试007</view>
			<view class="p-t-10">
				已坚持记账999天啦~
			</view>
		</view>
		<view class="person-center-container">
			<view class="nav">
				<view class="flex flex-column a-center p-10 nav-item">
					<uni-icons type="wallet-filled" size="30" color="#fba8a4"></uni-icons>
					<text class="small-size p-t-5">我的钱包</text>
				</view>
				<view class="flex flex-column a-center p-10 nav-item">
					<uni-icons type="color-filled" size="30" color="#fba8a4"></uni-icons>
					<text class="small-size p-t-5">我的钱包</text>
				</view>
				<view class="flex flex-column a-center p-10 nav-item">
					<uni-icons type="tune-filled" size="30" color="#fba8a4"></uni-icons>
					<text class="small-size p-t-5">我的钱包</text>
				</view>
				<view class="flex flex-column a-center p-10 nav-item">
					<uni-icons type="calendar-filled" size="30" color="#fba8a4"></uni-icons>
					<text class="small-size p-t-5">我的钱包</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { systemInfo } from '@/store/system_info';
	const { barHeight } = systemInfo();
</script>

<style lang="scss">
	.person-center {
		min-height: 100vh;
		background-color: #f7f7f7;

		.person-info {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 25vh;
			padding: 50px 20px 40px 20px;
			color: #fff;
			text-align: center;
			background-image: $linear-color;
			border-bottom-left-radius: 20% 20%;
			border-bottom-right-radius: 20% 20%;

			.avatar {
				width: 70px;
				height: 70px;
				border-radius: 50%;
			}
		}

		.person-center-container {
			padding: 0 20px;

			.nav {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				margin-top: -50px;
				border-radius: 6px;
				background-color: #fff;
				.nav-item {
					color: $primary-color;
				}
			}
		}
	}
</style>